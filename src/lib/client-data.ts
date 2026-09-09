import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";
import { isOperator, isStaff, normalizeRole } from "@/lib/access";
import type { CatalogKind } from "@/lib/commerce";
import { getSql } from "@/lib/db";
import { TERMS_VERSION } from "@/lib/legal";
import { buildPaypalUrl, type PayPalSettings } from "@/lib/paypal";
import { classifyIntake, emptyIntake } from "@/lib/routing";
import type { IntakeRecord } from "@/lib/types";
import { uid } from "@/lib/utils";

export type Profile = {
  userId: string;
  email: string;
  name: string;
  phone: string;
  role: "client" | "partner" | "operator";
  marketingOptIn: boolean;
  termsVersion: string;
  termsAcceptedAt: string | null;
};

export type ClientInquiryRow = {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  desiredOutcome: string;
  source: string;
  status: string;
  routingSummary: string;
  createdAt: string;
};

export type OrderRow = {
  id: string;
  userId: string;
  kind: CatalogKind;
  catalogId: string;
  title: string;
  summary: string;
  amount: number;
  priceSuffix: string;
  billingName: string;
  billingEmail: string;
  notes: string;
  paymentMethod: string;
  status: string;
  createdAt: string;
  termsVersion: string;
  marketingOptIn: boolean;
  receiptNumber: string | null;
  paidAt: string | null;
  paypalUrl: string | null;
};

export type StudioNotification = {
  id: string;
  kind: string;
  title: string;
  body: string;
  href: string;
  orderId: string | null;
  inquiryId: string | null;
  readAt: string | null;
  createdAt: string;
};

export type StudioSettings = PayPalSettings & {
  notifyEmail: string;
};

export type ClientRosterRow = {
  userId: string;
  name: string;
  email: string;
  phone: string;
  marketingOptIn: boolean;
  marketingOptInAt: string | null;
  termsVersion: string;
  termsAcceptedAt: string | null;
  createdAt: string;
  orderCount: number;
  inquiryCount: number;
  lastOrderAt: string | null;
  lastOrderTitle: string | null;
};

function iso(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  return String(value ?? "");
}

function isoOrNull(value: unknown): string | null {
  if (value == null || value === "") return null;
  return iso(value);
}

function asInt(value: unknown): number {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : 0;
}

function asBool(value: unknown): boolean {
  return value === true || value === "t" || value === "true" || value === 1 || value === "1";
}


async function userIdentity(userId: string): Promise<{ email: string; name: string }> {
  const sql = await getSql();
  const rows = await sql<{ email: string; name: string }>`
    select email, name from "user" where id = ${userId} limit 1
  `;
  return { email: rows[0]?.email ?? "", name: rows[0]?.name ?? "" };
}

function mapProfile(row: {
  user_id: string;
  email: string;
  name: string;
  phone?: string;
  role: string;
  marketing_opt_in?: unknown;
  terms_version?: string;
  terms_accepted_at?: unknown;
}): Profile {
  return {
    userId: row.user_id,
    email: row.email,
    name: row.name,
    phone: row.phone ?? "",
    role: normalizeRole(row.role),
    marketingOptIn: asBool(row.marketing_opt_in),
    termsVersion: row.terms_version ?? "",
    termsAcceptedAt: isoOrNull(row.terms_accepted_at),
  };
}

async function ensureProfile(userId: string): Promise<Profile> {
  const sql = await getSql();
  const existing = await sql<{
    user_id: string;
    email: string;
    name: string;
    phone: string;
    role: string;
    marketing_opt_in: unknown;
    terms_version: string;
    terms_accepted_at: unknown;
  }>`
    select user_id, email, name, phone, role, marketing_opt_in, terms_version, terms_accepted_at
    from profiles where user_id = ${userId} limit 1
  `;
  if (existing[0]) {
    const mapped = mapProfile(existing[0]);
    if (mapped.role === "client") {
      const { applyOpenInvite } = await import("@/lib/team-data.server");
      const invited = await applyOpenInvite(userId, existing[0].email || (await userIdentity(userId)).email);
      if (invited) {
        await sql`update profiles set role = 'partner' where user_id = ${userId}`;
        return { ...mapped, role: "partner" };
      }
    }
    return mapped;
  }
  const identity = await userIdentity(userId);
  const operators = await sql<{ user_id: string }>`
    select user_id from profiles where role = 'operator' limit 1
  `;
  let role: "operator" | "partner" | "client" = operators.length === 0 ? "operator" : "client";
  if (role === "client") {
    const { applyOpenInvite } = await import("@/lib/team-data.server");
    const invited = await applyOpenInvite(userId, identity.email);
    if (invited) role = "partner";
  }
  await sql`
    insert into profiles (user_id, email, name, role)
    values (${userId}, ${identity.email}, ${identity.name}, ${role})
    on conflict (user_id) do nothing
  `;
  const created = await sql<{
    user_id: string;
    email: string;
    name: string;
    phone: string;
    role: string;
    marketing_opt_in: unknown;
    terms_version: string;
    terms_accepted_at: unknown;
  }>`
    select user_id, email, name, phone, role, marketing_opt_in, terms_version, terms_accepted_at
    from profiles where user_id = ${userId} limit 1
  `;
  const row = created[0];
  return mapProfile(
    row ?? {
      user_id: userId,
      email: identity.email,
      name: identity.name,
      phone: "",
      role,
      marketing_opt_in: false,
      terms_version: "",
      terms_accepted_at: null,
    },
  );
}

async function requireStaffUser(userId: string): Promise<Profile> {
  const profile = await ensureProfile(userId);
  if (!isStaff(profile.role)) {
    throw new Error("Forbidden");
  }
  return profile;
}

async function requireOperator(userId: string): Promise<Profile> {
  const profile = await ensureProfile(userId);
  if (!isOperator(profile.role)) {
    throw new Error("Forbidden");
  }
  return profile;
}

async function readStudioSettings(): Promise<StudioSettings> {
  const sql = await getSql();
  await sql`insert into studio_settings (id) values ('default') on conflict (id) do nothing`;
  const rows = await sql<{
    paypal_me: string;
    paypal_email: string;
    paypal_link: string;
    notify_email: string;
  }>`
    select paypal_me, paypal_email, paypal_link, notify_email
    from studio_settings where id = 'default' limit 1
  `;
  const row = rows[0];
  return {
    paypalMe: row?.paypal_me ?? "",
    paypalEmail: row?.paypal_email ?? "",
    paypalLink: row?.paypal_link ?? "",
    notifyEmail: row?.notify_email ?? "",
  };
}

async function notify(input: {
  kind: string;
  title: string;
  body: string;
  href?: string;
  orderId?: string;
  inquiryId?: string;
  aboutUserId?: string;
  audience: "operator" | "client";
  audienceUserId?: string;
}) {
  const sql = await getSql();
  await sql`
    insert into studio_notifications (
      id, kind, title, body, href, order_id, inquiry_id, about_user_id, audience, audience_user_id
    ) values (
      ${uid("ntf")},
      ${input.kind},
      ${input.title},
      ${input.body},
      ${input.href ?? ""},
      ${input.orderId ?? null},
      ${input.inquiryId ?? null},
      ${input.aboutUserId ?? null},
      ${input.audience},
      ${input.audienceUserId ?? null}
    )
  `;
}

async function currentTermsVersion(): Promise<string> {
  try {
    const { readTermsVersion } = await import("@/lib/site-copy-data.server");
    return (await readTermsVersion()) || TERMS_VERSION;
  } catch {
    return TERMS_VERSION;
  }
}

async function recordConsent(
  userId: string,
  marketingOptIn: boolean,
): Promise<void> {
  const version = await currentTermsVersion();
  const sql = await getSql();
  await sql`
    update profiles
    set terms_version = ${version},
        terms_accepted_at = now(),
        marketing_opt_in = ${marketingOptIn},
        marketing_opt_in_at = case
          when ${marketingOptIn} then now()
          else marketing_opt_in_at
        end
    where user_id = ${userId}
  `;
}

function mapInquiry(row: {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone: string;
  desired_outcome: string;
  routing: string | null;
  source: string;
  status: string;
  created_at: unknown;
}): ClientInquiryRow {
  let routingSummary = "";
  if (row.routing) {
    try {
      routingSummary = (JSON.parse(row.routing) as { summary?: string }).summary ?? "";
    } catch {
      routingSummary = "";
    }
  }
  return {
    id: row.id,
    userId: row.user_id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    desiredOutcome: row.desired_outcome,
    source: row.source,
    status: row.status,
    routingSummary,
    createdAt: iso(row.created_at),
  };
}

type OrderDbRow = {
  id: string;
  user_id: string;
  kind: string;
  catalog_id: string;
  title: string;
  summary: string;
  amount: unknown;
  price_suffix: string;
  billing_name: string;
  billing_email: string;
  notes: string;
  payment_method: string;
  status: string;
  created_at: unknown;
  terms_version: string | null;
  marketing_opt_in: unknown;
  receipt_number: string | null;
  paid_at: unknown;
};

function mapOrder(row: OrderDbRow, paypalUrl: string | null = null): OrderRow {
  return {
    id: row.id,
    userId: row.user_id,
    kind: row.kind === "offer" ? "offer" : "package",
    catalogId: row.catalog_id,
    title: row.title,
    summary: row.summary,
    amount: asInt(row.amount),
    priceSuffix: row.price_suffix,
    billingName: row.billing_name,
    billingEmail: row.billing_email,
    notes: row.notes,
    paymentMethod: row.payment_method,
    status: row.status,
    createdAt: iso(row.created_at),
    termsVersion: row.terms_version ?? "",
    marketingOptIn: asBool(row.marketing_opt_in),
    receiptNumber: row.receipt_number,
    paidAt: isoOrNull(row.paid_at),
    paypalUrl,
  };
}

function mapNotification(row: {
  id: string;
  kind: string;
  title: string;
  body: string;
  href: string;
  order_id: string | null;
  inquiry_id: string | null;
  read_at: unknown;
  created_at: unknown;
}): StudioNotification {
  return {
    id: row.id,
    kind: row.kind,
    title: row.title,
    body: row.body,
    href: row.href,
    orderId: row.order_id,
    inquiryId: row.inquiry_id,
    readAt: isoOrNull(row.read_at),
    createdAt: iso(row.created_at),
  };
}

export const getMyProfile = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => ensureProfile(context.userId));

export const listMyWork = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await ensureProfile(context.userId);
    const sql = await getSql();
    const inquiries = await sql<Parameters<typeof mapInquiry>[0]>`
      select id, user_id, name, email, phone, desired_outcome, routing, source, status, created_at
      from client_inquiries
      where user_id = ${context.userId}
      order by created_at desc
    `;
    const orders = await sql<OrderDbRow>`
      select id, user_id, kind, catalog_id, title, summary, amount, price_suffix,
        billing_name, billing_email, notes, payment_method, status, created_at,
        terms_version, marketing_opt_in, receipt_number, paid_at
      from orders
      where user_id = ${context.userId}
      order by created_at desc
    `;
    return {
      inquiries: inquiries.map(mapInquiry),
      orders: orders.map((row) => mapOrder(row)),
    };
  });

export const getMyOrder = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator(z.object({ id: z.string().min(1) }))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const profile = await ensureProfile(context.userId);
    const rows = await sql<OrderDbRow>`
      select id, user_id, kind, catalog_id, title, summary, amount, price_suffix,
        billing_name, billing_email, notes, payment_method, status, created_at,
        terms_version, marketing_opt_in, receipt_number, paid_at
      from orders
      where id = ${data.id}
      limit 1
    `;
    const row = rows[0];
    if (!row) return null;
    if (row.user_id !== context.userId && !isStaff(profile.role)) return null;
    const settings = await readStudioSettings();
    const mapped = mapOrder(row);
    const paypalUrl =
      mapped.status === "pending_payment" || mapped.status === "payment_submitted"
        ? buildPaypalUrl(settings, { id: mapped.id, title: mapped.title, amount: mapped.amount })
        : null;
    return { ...mapped, paypalUrl };
  });

const intakeSchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1),
  phone: z.string().optional(),
  desiredOutcome: z.string().min(8),
  projectType: z.string().optional(),
  location: z.string().optional(),
  audience: z.string().optional(),
  currentStage: z.string().optional(),
  services: z.array(z.string()).optional(),
  deadline: z.string().optional(),
  budget: z.string().optional(),
  assets: z.string().optional(),
  channel: z.string().optional(),
  regulated: z.array(z.string()).optional(),
  businessName: z.string().optional(),
  businessStatus: z.string().optional(),
  entityType: z.string().optional(),
  addressSituation: z.string().optional(),
  marketplace: z.string().optional(),
  productCategory: z.string().optional(),
  supplierStatus: z.string().optional(),
  inventoryStatus: z.string().optional(),
  salesChannels: z.string().optional(),
  hasBank: z.string().optional(),
  hasEin: z.string().optional(),
  hasInsurance: z.string().optional(),
  hasLicenses: z.string().optional(),
  hasComplianceDocs: z.string().optional(),
});

export const createInquiry = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      intake: intakeSchema,
      source: z.enum(["form", "receptionist"]),
      termsAccepted: z.literal(true),
      marketingOptIn: z.boolean().optional(),
    }),
  )
  .handler(async ({ context, data }) => {
    const profile = await ensureProfile(context.userId);
    const intake = {
      ...emptyIntake(),
      ...data.intake,
      name: data.intake.name,
      email: data.intake.email,
      desiredOutcome: data.intake.desiredOutcome,
      services: data.intake.services ?? [],
      regulated: data.intake.regulated ?? [],
    } as IntakeRecord;
    const routing = classifyIntake(intake);
    const id = uid("inq");
    const name = intake.name.trim() || profile.name || "Client";
    const email = intake.email.trim() || profile.email;
    const phone = intake.phone ?? "";
    const sql = await getSql();
    await sql`
      insert into client_inquiries (
        id, user_id, name, email, phone, desired_outcome, intake, routing, source, status
      ) values (
        ${id},
        ${context.userId},
        ${name},
        ${email},
        ${phone},
        ${intake.desiredOutcome},
        ${JSON.stringify(intake)},
        ${JSON.stringify(routing)},
        ${data.source},
        ${routing.needsHumanReview ? "review" : "new"}
      )
    `;
    await sql`
      update profiles
      set name = case when ${name} <> '' then ${name} else name end,
          email = case when ${email} <> '' then ${email} else email end,
          phone = case when ${phone} <> '' then ${phone} else phone end
      where user_id = ${context.userId}
    `;
    await recordConsent(context.userId, Boolean(data.marketingOptIn));
    await notify({
      kind: "inquiry_created",
      title: "New inquiry",
      body: `${name} · ${intake.desiredOutcome.slice(0, 140)}`,
      href: "/hq/inbox",
      inquiryId: id,
      aboutUserId: context.userId,
      audience: "operator",
    });
    return { id };
  });

export const placeOrder = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      kind: z.enum(["package", "offer"]),
      id: z.string().min(1),
      billingName: z.string().min(1),
      billingEmail: z.string().email(),
      notes: z.string().optional(),
      termsAccepted: z.literal(true),
      marketingOptIn: z.boolean().optional(),
    }),
  )
  .handler(async ({ context, data }) => {
    await ensureProfile(context.userId);
    const { livePurchasable } = await import("@/lib/catalog-data.server");
    const item = await livePurchasable(data.kind, data.id);
    if (!item || !item.instant) {
      throw new Error("That item is scoped after a conversation, not purchased as a fixed package.");
    }
    const id = uid("ord");
    const marketing = Boolean(data.marketingOptIn);
    const termsVersion = await currentTermsVersion();
    const sql = await getSql();
    await sql`
      insert into orders (
        id, user_id, kind, catalog_id, title, summary, amount, price_suffix,
        billing_name, billing_email, notes, status, terms_version, terms_accepted_at, marketing_opt_in
      ) values (
        ${id},
        ${context.userId},
        ${item.kind},
        ${item.id},
        ${item.title},
        ${item.summary},
        ${item.amount},
        ${item.priceSuffix},
        ${data.billingName.trim()},
        ${data.billingEmail.trim().toLowerCase()},
        ${data.notes?.trim() ?? ""},
        ${"pending_payment"},
        ${termsVersion},
        now(),
        ${marketing}
      )
    `;
    await recordConsent(context.userId, marketing);
    await notify({
      kind: "order_placed",
      title: "New order",
      body: `${data.billingName.trim()} ordered ${item.title} · $${item.amount}`,
      href: "/hq/inbox",
      orderId: id,
      aboutUserId: context.userId,
      audience: "operator",
    });
    return { id };
  });

export const submitPayment = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      orderId: z.string().min(1),
      method: z.enum(["paypal", "card_link", "invoice"]),
    }),
  )
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const rows = await sql<OrderDbRow>`
      update orders
      set payment_method = ${data.method},
          status = 'payment_submitted',
          updated_at = now()
      where id = ${data.orderId}
        and user_id = ${context.userId}
        and status in ('pending_payment', 'payment_submitted')
      returning id, user_id, kind, catalog_id, title, summary, amount, price_suffix,
        billing_name, billing_email, notes, payment_method, status, created_at,
        terms_version, marketing_opt_in, receipt_number, paid_at
    `;
    if (!rows[0]) throw new Error("Order not found.");
    const order = mapOrder(rows[0]);
    const methodLabel = data.method === "paypal" ? "PayPal" : data.method === "invoice" ? "invoice" : "card link";
    await notify({
      kind: "payment_submitted",
      title: data.method === "paypal" ? "PayPal payment submitted" : "Payment method chosen",
      body: `${order.billingName} · ${order.title} · $${order.amount} via ${methodLabel}. Confirm funds, then mark paid.`,
      href: "/hq/inbox",
      orderId: order.id,
      aboutUserId: context.userId,
      audience: "operator",
    });
    const settings = await readStudioSettings();
    const paypalUrl = data.method === "paypal" ? buildPaypalUrl(settings, order) : null;
    return { id: order.id, status: order.status, paypalUrl };
  });

export const listStudioInbox = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireStaffUser(context.userId);
    const sql = await getSql();
    const inquiries = await sql<Parameters<typeof mapInquiry>[0]>`
      select id, user_id, name, email, phone, desired_outcome, routing, source, status, created_at
      from client_inquiries
      order by created_at desc
    `;
    const orders = await sql<OrderDbRow>`
      select id, user_id, kind, catalog_id, title, summary, amount, price_suffix,
        billing_name, billing_email, notes, payment_method, status, created_at,
        terms_version, marketing_opt_in, receipt_number, paid_at
      from orders
      order by created_at desc
    `;
    const notifications = await sql<Parameters<typeof mapNotification>[0]>`
      select id, kind, title, body, href, order_id, inquiry_id, read_at, created_at
      from studio_notifications
      where audience = 'operator'
      order by created_at desc
      limit 40
    `;
    return {
      inquiries: inquiries.map(mapInquiry),
      orders: orders.map((row) => mapOrder(row)),
      notifications: notifications.map(mapNotification),
    };
  });

export const updateStudioOrder = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      orderId: z.string().min(1),
      status: z.enum(["pending_payment", "payment_submitted", "paid", "in_progress", "complete", "cancelled"]),
    }),
  )
  .handler(async ({ context, data }) => {
    const profile = await requireStaffUser(context.userId);
    if (data.status === "paid" && !isOperator(profile.role)) {
      throw new Error("Only the studio operator can confirm payment and issue a receipt.");
    }
    const sql = await getSql();
    const current = await sql<OrderDbRow>`
      select id, user_id, kind, catalog_id, title, summary, amount, price_suffix,
        billing_name, billing_email, notes, payment_method, status, created_at,
        terms_version, marketing_opt_in, receipt_number, paid_at
      from orders where id = ${data.orderId} limit 1
    `;
    const existing = current[0];
    if (!existing) throw new Error("Order not found.");

    let receiptNumber = existing.receipt_number;
    if (data.status === "paid" && !receiptNumber) {
      const seq = await sql<{ n: unknown }>`select nextval('atlas_receipt_seq') as n`;
      receiptNumber = `VIR-${new Date().getFullYear()}-${asInt(seq[0]?.n)}`;
    }

    const rows =
      data.status === "paid"
        ? await sql<{ id: string; status: string; receipt_number: string | null; user_id: string; title: string; amount: unknown }>`
            update orders
            set status = 'paid',
                updated_at = now(),
                paid_at = coalesce(paid_at, now()),
                receipt_number = ${receiptNumber}
            where id = ${data.orderId}
            returning id, status, receipt_number, user_id, title, amount
          `
        : await sql<{ id: string; status: string; receipt_number: string | null; user_id: string; title: string; amount: unknown }>`
            update orders
            set status = ${data.status},
                updated_at = now()
            where id = ${data.orderId}
            returning id, status, receipt_number, user_id, title, amount
          `;
    const row = rows[0];
    if (!row) throw new Error("Order not found.");

    if (data.status === "paid") {
      await notify({
        kind: "receipt_issued",
        title: "Payment confirmed · receipt ready",
        body: `${row.title} · receipt ${row.receipt_number ?? ""}`,
        href: `/account/orders/${row.id}`,
        orderId: row.id,
        aboutUserId: row.user_id,
        audience: "client",
        audienceUserId: row.user_id,
      });
    }
    return { id: row.id, status: row.status, receiptNumber: row.receipt_number };
  });

export const getStudioSettings = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireOperator(context.userId);
    return readStudioSettings();
  });

export const saveStudioSettings = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      paypalMe: z.string().max(80),
      paypalEmail: z.string().max(160),
      paypalLink: z.string().max(400),
      notifyEmail: z.string().max(160),
    }),
  )
  .handler(async ({ context, data }) => {
    await requireOperator(context.userId);
    const sql = await getSql();
    await sql`
      insert into studio_settings (id, paypal_me, paypal_email, paypal_link, notify_email, updated_at)
      values (
        'default',
        ${data.paypalMe.trim()},
        ${data.paypalEmail.trim()},
        ${data.paypalLink.trim()},
        ${data.notifyEmail.trim()},
        now()
      )
      on conflict (id) do update set
        paypal_me = excluded.paypal_me,
        paypal_email = excluded.paypal_email,
        paypal_link = excluded.paypal_link,
        notify_email = excluded.notify_email,
        updated_at = now()
    `;
    return readStudioSettings();
  });

export const listStudioClients = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireStaffUser(context.userId);
    const sql = await getSql();
    const rows = await sql<{
      user_id: string;
      name: string;
      email: string;
      phone: string;
      marketing_opt_in: unknown;
      marketing_opt_in_at: unknown;
      terms_version: string;
      terms_accepted_at: unknown;
      created_at: unknown;
      order_count: unknown;
      inquiry_count: unknown;
      last_order_at: unknown;
      last_order_title: string | null;
    }>`
      select
        p.user_id,
        p.name,
        p.email,
        p.phone,
        p.marketing_opt_in,
        p.marketing_opt_in_at,
        p.terms_version,
        p.terms_accepted_at,
        p.created_at,
        (select count(*) from orders o where o.user_id = p.user_id) as order_count,
        (select count(*) from client_inquiries i where i.user_id = p.user_id) as inquiry_count,
        (select max(o.created_at) from orders o where o.user_id = p.user_id) as last_order_at,
        (select o.title from orders o where o.user_id = p.user_id order by o.created_at desc limit 1) as last_order_title
      from profiles p
      where p.role = 'client'
      order by p.created_at desc
    `;
    return rows.map(
      (row): ClientRosterRow => ({
        userId: row.user_id,
        name: row.name,
        email: row.email,
        phone: row.phone,
        marketingOptIn: asBool(row.marketing_opt_in),
        marketingOptInAt: isoOrNull(row.marketing_opt_in_at),
        termsVersion: row.terms_version,
        termsAcceptedAt: isoOrNull(row.terms_accepted_at),
        createdAt: iso(row.created_at),
        orderCount: asInt(row.order_count),
        inquiryCount: asInt(row.inquiry_count),
        lastOrderAt: isoOrNull(row.last_order_at),
        lastOrderTitle: row.last_order_title,
      }),
    );
  });

export const markStudioNotificationsRead = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireStaffUser(context.userId);
    const sql = await getSql();
    await sql`
      update studio_notifications
      set read_at = now()
      where audience = 'operator' and read_at is null
    `;
    return { ok: true };
  });

export const listMyNotifications = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await ensureProfile(context.userId);
    const sql = await getSql();
    const rows = await sql<Parameters<typeof mapNotification>[0]>`
      select id, kind, title, body, href, order_id, inquiry_id, read_at, created_at
      from studio_notifications
      where audience = 'client' and audience_user_id = ${context.userId}
      order by created_at desc
      limit 20
    `;
    return rows.map(mapNotification);
  });

export const updateMyMarketing = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ marketingOptIn: z.boolean() }))
  .handler(async ({ context, data }) => {
    await ensureProfile(context.userId);
    const sql = await getSql();
    await sql`
      update profiles
      set marketing_opt_in = ${data.marketingOptIn},
          marketing_opt_in_at = case when ${data.marketingOptIn} then now() else marketing_opt_in_at end
      where user_id = ${context.userId}
    `;
    return ensureProfile(context.userId);
  });

export const getStudioAttention = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireStaffUser(context.userId);
    const sql = await getSql();
    const unread = await sql<{ n: unknown }>`
      select count(*) as n from studio_notifications
      where audience = 'operator' and read_at is null
    `;
    const pending = await sql<{ n: unknown }>`
      select count(*) as n from orders
      where status in ('pending_payment', 'payment_submitted')
    `;
    const settings = await readStudioSettings();
    const paypalReady = Boolean(buildPaypalUrl(settings, { id: "probe", title: "probe", amount: 1 }));
    return {
      unread: asInt(unread[0]?.n),
      pendingPayments: asInt(pending[0]?.n),
      paypalReady,
      notifyEmail: settings.notifyEmail,
    };
  });
