import { a as uid } from "./utils-BTLGo2_i.mjs";
import { r as createServerFn } from "./ssr.mjs";
import { A as boolean, D as _enum, F as object, M as literal, R as string, k as array } from "../_libs/@better-auth/core+[...].mjs";
import { r as getSql } from "./db-Dx6HJ51b.mjs";
import { t as authMiddleware } from "./middleware-C4156sa6.mjs";
import { n as emptyIntake, t as classifyIntake } from "./routing-kDjt9tDQ.mjs";
import { o as TERMS_VERSION } from "./legal-Ck2GEDxe.mjs";
import { n as buildPaypalUrl } from "./paypal-C4s4REeX.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { a as isStaff, i as isOperator, o as normalizeRole } from "./access-Ty0QsjcV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/client-data-DA81soSZ.js
function iso(value) {
	if (value instanceof Date) return value.toISOString();
	return String(value ?? "");
}
function isoOrNull(value) {
	if (value == null || value === "") return null;
	return iso(value);
}
function asInt(value) {
	const n = typeof value === "number" ? value : Number(value);
	return Number.isFinite(n) ? n : 0;
}
function asBool(value) {
	return value === true || value === "t" || value === "true" || value === 1 || value === "1";
}
async function userIdentity(userId) {
	const rows = await (await getSql())`
    select email, name from "user" where id = ${userId} limit 1
  `;
	return {
		email: rows[0]?.email ?? "",
		name: rows[0]?.name ?? ""
	};
}
function mapProfile(row) {
	return {
		userId: row.user_id,
		email: row.email,
		name: row.name,
		phone: row.phone ?? "",
		role: normalizeRole(row.role),
		marketingOptIn: asBool(row.marketing_opt_in),
		termsVersion: row.terms_version ?? "",
		termsAcceptedAt: isoOrNull(row.terms_accepted_at)
	};
}
async function ensureProfile(userId) {
	const sql = await getSql();
	const existing = await sql`
    select user_id, email, name, phone, role, marketing_opt_in, terms_version, terms_accepted_at
    from profiles where user_id = ${userId} limit 1
  `;
	if (existing[0]) {
		const mapped = mapProfile(existing[0]);
		if (mapped.role === "client") {
			const { applyOpenInvite } = await import("./team-data.server-DlI_R6M8.mjs");
			if (await applyOpenInvite(userId, existing[0].email || (await userIdentity(userId)).email)) {
				await sql`update profiles set role = 'partner' where user_id = ${userId}`;
				return {
					...mapped,
					role: "partner"
				};
			}
		}
		return mapped;
	}
	const identity = await userIdentity(userId);
	let role = (await sql`
    select user_id from profiles where role = 'operator' limit 1
  `).length === 0 ? "operator" : "client";
	if (role === "client") {
		const { applyOpenInvite } = await import("./team-data.server-DlI_R6M8.mjs");
		if (await applyOpenInvite(userId, identity.email)) role = "partner";
	}
	await sql`
    insert into profiles (user_id, email, name, role)
    values (${userId}, ${identity.email}, ${identity.name}, ${role})
    on conflict (user_id) do nothing
  `;
	const row = (await sql`
    select user_id, email, name, phone, role, marketing_opt_in, terms_version, terms_accepted_at
    from profiles where user_id = ${userId} limit 1
  `)[0];
	return mapProfile(row ?? {
		user_id: userId,
		email: identity.email,
		name: identity.name,
		phone: "",
		role,
		marketing_opt_in: false,
		terms_version: "",
		terms_accepted_at: null
	});
}
async function requireStaffUser(userId) {
	const profile = await ensureProfile(userId);
	if (!isStaff(profile.role)) throw new Error("Forbidden");
	return profile;
}
async function requireOperator(userId) {
	const profile = await ensureProfile(userId);
	if (!isOperator(profile.role)) throw new Error("Forbidden");
	return profile;
}
async function readStudioSettings() {
	const sql = await getSql();
	await sql`insert into studio_settings (id) values ('default') on conflict (id) do nothing`;
	const row = (await sql`
    select paypal_me, paypal_email, paypal_link, notify_email
    from studio_settings where id = 'default' limit 1
  `)[0];
	return {
		paypalMe: row?.paypal_me ?? "",
		paypalEmail: row?.paypal_email ?? "",
		paypalLink: row?.paypal_link ?? "",
		notifyEmail: row?.notify_email ?? ""
	};
}
async function notify(input) {
	await (await getSql())`
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
async function currentTermsVersion() {
	try {
		const { readTermsVersion } = await import("./site-copy-data.server-BoUZC8A5.mjs");
		return await readTermsVersion() || "2026-09-08";
	} catch {
		return TERMS_VERSION;
	}
}
async function recordConsent(userId, marketingOptIn) {
	const version = await currentTermsVersion();
	await (await getSql())`
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
function mapInquiry(row) {
	let routingSummary = "";
	if (row.routing) try {
		routingSummary = JSON.parse(row.routing).summary ?? "";
	} catch {
		routingSummary = "";
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
		createdAt: iso(row.created_at)
	};
}
function mapOrder(row, paypalUrl = null) {
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
		paypalUrl
	};
}
function mapNotification(row) {
	return {
		id: row.id,
		kind: row.kind,
		title: row.title,
		body: row.body,
		href: row.href,
		orderId: row.order_id,
		inquiryId: row.inquiry_id,
		readAt: isoOrNull(row.read_at),
		createdAt: iso(row.created_at)
	};
}
var getMyProfile_createServerFn_handler = createServerRpc({
	id: "fb22a123c139e3397e32700027412fb508dc88f8af59ddbcf3333b6266c316b6",
	name: "getMyProfile",
	filename: "src/lib/client-data.ts"
}, (opts) => getMyProfile.__executeServer(opts));
var getMyProfile = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getMyProfile_createServerFn_handler, async ({ context }) => ensureProfile(context.userId));
var listMyWork_createServerFn_handler = createServerRpc({
	id: "6bdfecfcfcdde98648741c52b88c498c1e75abd5a4f444de7d76430174a7f119",
	name: "listMyWork",
	filename: "src/lib/client-data.ts"
}, (opts) => listMyWork.__executeServer(opts));
var listMyWork = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listMyWork_createServerFn_handler, async ({ context }) => {
	await ensureProfile(context.userId);
	const sql = await getSql();
	const inquiries = await sql`
      select id, user_id, name, email, phone, desired_outcome, routing, source, status, created_at
      from client_inquiries
      where user_id = ${context.userId}
      order by created_at desc
    `;
	const orders = await sql`
      select id, user_id, kind, catalog_id, title, summary, amount, price_suffix,
        billing_name, billing_email, notes, payment_method, status, created_at,
        terms_version, marketing_opt_in, receipt_number, paid_at
      from orders
      where user_id = ${context.userId}
      order by created_at desc
    `;
	return {
		inquiries: inquiries.map(mapInquiry),
		orders: orders.map((row) => mapOrder(row))
	};
});
var getMyOrder_createServerFn_handler = createServerRpc({
	id: "40ee2e12d7c8dfb998116e4bea0cf3eb4a1b27368d8e8d02074d1581e3200a6e",
	name: "getMyOrder",
	filename: "src/lib/client-data.ts"
}, (opts) => getMyOrder.__executeServer(opts));
var getMyOrder = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator(object({ id: string().min(1) })).handler(getMyOrder_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const profile = await ensureProfile(context.userId);
	const row = (await sql`
      select id, user_id, kind, catalog_id, title, summary, amount, price_suffix,
        billing_name, billing_email, notes, payment_method, status, created_at,
        terms_version, marketing_opt_in, receipt_number, paid_at
      from orders
      where id = ${data.id}
      limit 1
    `)[0];
	if (!row) return null;
	if (row.user_id !== context.userId && !isStaff(profile.role)) return null;
	const settings = await readStudioSettings();
	const mapped = mapOrder(row);
	const paypalUrl = mapped.status === "pending_payment" || mapped.status === "payment_submitted" ? buildPaypalUrl(settings, {
		id: mapped.id,
		title: mapped.title,
		amount: mapped.amount
	}) : null;
	return {
		...mapped,
		paypalUrl
	};
});
var intakeSchema = object({
	name: string().min(1),
	email: string().min(1),
	phone: string().optional(),
	desiredOutcome: string().min(8),
	projectType: string().optional(),
	location: string().optional(),
	audience: string().optional(),
	currentStage: string().optional(),
	services: array(string()).optional(),
	deadline: string().optional(),
	budget: string().optional(),
	assets: string().optional(),
	channel: string().optional(),
	regulated: array(string()).optional(),
	businessName: string().optional(),
	businessStatus: string().optional(),
	entityType: string().optional(),
	addressSituation: string().optional(),
	marketplace: string().optional(),
	productCategory: string().optional(),
	supplierStatus: string().optional(),
	inventoryStatus: string().optional(),
	salesChannels: string().optional(),
	hasBank: string().optional(),
	hasEin: string().optional(),
	hasInsurance: string().optional(),
	hasLicenses: string().optional(),
	hasComplianceDocs: string().optional()
});
var createInquiry_createServerFn_handler = createServerRpc({
	id: "1e60c32edea6f15dca7a417f4c2c244ed5a15291e0a24ed6b570a7cc816ebf91",
	name: "createInquiry",
	filename: "src/lib/client-data.ts"
}, (opts) => createInquiry.__executeServer(opts));
var createInquiry = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	intake: intakeSchema,
	source: _enum(["form", "receptionist"]),
	termsAccepted: literal(true),
	marketingOptIn: boolean().optional()
})).handler(createInquiry_createServerFn_handler, async ({ context, data }) => {
	const profile = await ensureProfile(context.userId);
	const intake = {
		...emptyIntake(),
		...data.intake,
		name: data.intake.name,
		email: data.intake.email,
		desiredOutcome: data.intake.desiredOutcome,
		services: data.intake.services ?? [],
		regulated: data.intake.regulated ?? []
	};
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
		audience: "operator"
	});
	return { id };
});
var placeOrder_createServerFn_handler = createServerRpc({
	id: "f980a4085d746b5b329cb6b7329ab2c5c3cefe4e8aa3922c00d0a4c58587adad",
	name: "placeOrder",
	filename: "src/lib/client-data.ts"
}, (opts) => placeOrder.__executeServer(opts));
var placeOrder = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	kind: _enum(["package", "offer"]),
	id: string().min(1),
	billingName: string().min(1),
	billingEmail: string().email(),
	notes: string().optional(),
	termsAccepted: literal(true),
	marketingOptIn: boolean().optional()
})).handler(placeOrder_createServerFn_handler, async ({ context, data }) => {
	await ensureProfile(context.userId);
	const { livePurchasable } = await import("./catalog-data.server-Da4YoVsA.mjs");
	const item = await livePurchasable(data.kind, data.id);
	if (!item || !item.instant) throw new Error("That item is scoped after a conversation, not purchased as a fixed package.");
	const id = uid("ord");
	const marketing = Boolean(data.marketingOptIn);
	const termsVersion = await currentTermsVersion();
	await (await getSql())`
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
		audience: "operator"
	});
	return { id };
});
var submitPayment_createServerFn_handler = createServerRpc({
	id: "5ffe2ad4ff285a66acbab6b779bfd488bf26b110aed6d82824f1bdccec8776fb",
	name: "submitPayment",
	filename: "src/lib/client-data.ts"
}, (opts) => submitPayment.__executeServer(opts));
var submitPayment = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	orderId: string().min(1),
	method: _enum([
		"paypal",
		"card_link",
		"invoice"
	])
})).handler(submitPayment_createServerFn_handler, async ({ context, data }) => {
	const rows = await (await getSql())`
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
		audience: "operator"
	});
	const settings = await readStudioSettings();
	const paypalUrl = data.method === "paypal" ? buildPaypalUrl(settings, order) : null;
	return {
		id: order.id,
		status: order.status,
		paypalUrl
	};
});
var listStudioInbox_createServerFn_handler = createServerRpc({
	id: "29d26c6915136bb3da56f8e129b852b1605292391e97ac40970205417d9ac3c6",
	name: "listStudioInbox",
	filename: "src/lib/client-data.ts"
}, (opts) => listStudioInbox.__executeServer(opts));
var listStudioInbox = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listStudioInbox_createServerFn_handler, async ({ context }) => {
	await requireStaffUser(context.userId);
	const sql = await getSql();
	const inquiries = await sql`
      select id, user_id, name, email, phone, desired_outcome, routing, source, status, created_at
      from client_inquiries
      order by created_at desc
    `;
	const orders = await sql`
      select id, user_id, kind, catalog_id, title, summary, amount, price_suffix,
        billing_name, billing_email, notes, payment_method, status, created_at,
        terms_version, marketing_opt_in, receipt_number, paid_at
      from orders
      order by created_at desc
    `;
	const notifications = await sql`
      select id, kind, title, body, href, order_id, inquiry_id, read_at, created_at
      from studio_notifications
      where audience = 'operator'
      order by created_at desc
      limit 40
    `;
	return {
		inquiries: inquiries.map(mapInquiry),
		orders: orders.map((row) => mapOrder(row)),
		notifications: notifications.map(mapNotification)
	};
});
var updateStudioOrder_createServerFn_handler = createServerRpc({
	id: "62a440125c066ab9fd56806696ce306d51982529308bb2481333cd445409183c",
	name: "updateStudioOrder",
	filename: "src/lib/client-data.ts"
}, (opts) => updateStudioOrder.__executeServer(opts));
var updateStudioOrder = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	orderId: string().min(1),
	status: _enum([
		"pending_payment",
		"payment_submitted",
		"paid",
		"in_progress",
		"complete",
		"cancelled"
	])
})).handler(updateStudioOrder_createServerFn_handler, async ({ context, data }) => {
	const profile = await requireStaffUser(context.userId);
	if (data.status === "paid" && !isOperator(profile.role)) throw new Error("Only the studio operator can confirm payment and issue a receipt.");
	const sql = await getSql();
	const existing = (await sql`
      select id, user_id, kind, catalog_id, title, summary, amount, price_suffix,
        billing_name, billing_email, notes, payment_method, status, created_at,
        terms_version, marketing_opt_in, receipt_number, paid_at
      from orders where id = ${data.orderId} limit 1
    `)[0];
	if (!existing) throw new Error("Order not found.");
	let receiptNumber = existing.receipt_number;
	if (data.status === "paid" && !receiptNumber) {
		const seq = await sql`select nextval('atlas_receipt_seq') as n`;
		receiptNumber = `VIR-${(/* @__PURE__ */ new Date()).getFullYear()}-${asInt(seq[0]?.n)}`;
	}
	const row = (data.status === "paid" ? await sql`
            update orders
            set status = 'paid',
                updated_at = now(),
                paid_at = coalesce(paid_at, now()),
                receipt_number = ${receiptNumber}
            where id = ${data.orderId}
            returning id, status, receipt_number, user_id, title, amount
          ` : await sql`
            update orders
            set status = ${data.status},
                updated_at = now()
            where id = ${data.orderId}
            returning id, status, receipt_number, user_id, title, amount
          `)[0];
	if (!row) throw new Error("Order not found.");
	if (data.status === "paid") await notify({
		kind: "receipt_issued",
		title: "Payment confirmed · receipt ready",
		body: `${row.title} · receipt ${row.receipt_number ?? ""}`,
		href: `/account/orders/${row.id}`,
		orderId: row.id,
		aboutUserId: row.user_id,
		audience: "client",
		audienceUserId: row.user_id
	});
	return {
		id: row.id,
		status: row.status,
		receiptNumber: row.receipt_number
	};
});
var getStudioSettings_createServerFn_handler = createServerRpc({
	id: "7e9752cf08799b91adbaa991885222471c86037dbc5be382a4ed797a792cce13",
	name: "getStudioSettings",
	filename: "src/lib/client-data.ts"
}, (opts) => getStudioSettings.__executeServer(opts));
var getStudioSettings = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getStudioSettings_createServerFn_handler, async ({ context }) => {
	await requireOperator(context.userId);
	return readStudioSettings();
});
var saveStudioSettings_createServerFn_handler = createServerRpc({
	id: "a120636969e5a241dc38109e1866afddef3ec545e7b4fdb57b664692840cb431",
	name: "saveStudioSettings",
	filename: "src/lib/client-data.ts"
}, (opts) => saveStudioSettings.__executeServer(opts));
var saveStudioSettings = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	paypalMe: string().max(80),
	paypalEmail: string().max(160),
	paypalLink: string().max(400),
	notifyEmail: string().max(160)
})).handler(saveStudioSettings_createServerFn_handler, async ({ context, data }) => {
	await requireOperator(context.userId);
	await (await getSql())`
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
var listStudioClients_createServerFn_handler = createServerRpc({
	id: "3b1acfeea986cbc8a4d5ddd3f2455563fb7d20e1337a9d1411a976258e641c64",
	name: "listStudioClients",
	filename: "src/lib/client-data.ts"
}, (opts) => listStudioClients.__executeServer(opts));
var listStudioClients = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listStudioClients_createServerFn_handler, async ({ context }) => {
	await requireStaffUser(context.userId);
	return (await (await getSql())`
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
    `).map((row) => ({
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
		lastOrderTitle: row.last_order_title
	}));
});
var markStudioNotificationsRead_createServerFn_handler = createServerRpc({
	id: "379d89d2eecedec70de498151a2c1beb92c3e1dcd604091d739d4ae2459095b9",
	name: "markStudioNotificationsRead",
	filename: "src/lib/client-data.ts"
}, (opts) => markStudioNotificationsRead.__executeServer(opts));
var markStudioNotificationsRead = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(markStudioNotificationsRead_createServerFn_handler, async ({ context }) => {
	await requireStaffUser(context.userId);
	await (await getSql())`
      update studio_notifications
      set read_at = now()
      where audience = 'operator' and read_at is null
    `;
	return { ok: true };
});
var listMyNotifications_createServerFn_handler = createServerRpc({
	id: "86c1065e90fa4f53d6f2cd049c0d27e4bbc0215497642bb7e2337f3d546e5dc1",
	name: "listMyNotifications",
	filename: "src/lib/client-data.ts"
}, (opts) => listMyNotifications.__executeServer(opts));
var listMyNotifications = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listMyNotifications_createServerFn_handler, async ({ context }) => {
	await ensureProfile(context.userId);
	return (await (await getSql())`
      select id, kind, title, body, href, order_id, inquiry_id, read_at, created_at
      from studio_notifications
      where audience = 'client' and audience_user_id = ${context.userId}
      order by created_at desc
      limit 20
    `).map(mapNotification);
});
var updateMyMarketing_createServerFn_handler = createServerRpc({
	id: "d8a5bc7a7995f9a61cb07ae2a004298e6db6720770d44e57695dc3eff8b06055",
	name: "updateMyMarketing",
	filename: "src/lib/client-data.ts"
}, (opts) => updateMyMarketing.__executeServer(opts));
var updateMyMarketing = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ marketingOptIn: boolean() })).handler(updateMyMarketing_createServerFn_handler, async ({ context, data }) => {
	await ensureProfile(context.userId);
	await (await getSql())`
      update profiles
      set marketing_opt_in = ${data.marketingOptIn},
          marketing_opt_in_at = case when ${data.marketingOptIn} then now() else marketing_opt_in_at end
      where user_id = ${context.userId}
    `;
	return ensureProfile(context.userId);
});
var getStudioAttention_createServerFn_handler = createServerRpc({
	id: "2ff2f9d87643efe362fbbadbf0956d4f562306e66b1535497ee9a7f208f34ba5",
	name: "getStudioAttention",
	filename: "src/lib/client-data.ts"
}, (opts) => getStudioAttention.__executeServer(opts));
var getStudioAttention = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getStudioAttention_createServerFn_handler, async ({ context }) => {
	await requireStaffUser(context.userId);
	const sql = await getSql();
	const unread = await sql`
      select count(*) as n from studio_notifications
      where audience = 'operator' and read_at is null
    `;
	const pending = await sql`
      select count(*) as n from orders
      where status in ('pending_payment', 'payment_submitted')
    `;
	const settings = await readStudioSettings();
	const paypalReady = Boolean(buildPaypalUrl(settings, {
		id: "probe",
		title: "probe",
		amount: 1
	}));
	return {
		unread: asInt(unread[0]?.n),
		pendingPayments: asInt(pending[0]?.n),
		paypalReady,
		notifyEmail: settings.notifyEmail
	};
});
//#endregion
export { createInquiry_createServerFn_handler, getMyOrder_createServerFn_handler, getMyProfile_createServerFn_handler, getStudioAttention_createServerFn_handler, getStudioSettings_createServerFn_handler, listMyNotifications_createServerFn_handler, listMyWork_createServerFn_handler, listStudioClients_createServerFn_handler, listStudioInbox_createServerFn_handler, markStudioNotificationsRead_createServerFn_handler, placeOrder_createServerFn_handler, saveStudioSettings_createServerFn_handler, submitPayment_createServerFn_handler, updateMyMarketing_createServerFn_handler, updateStudioOrder_createServerFn_handler };
