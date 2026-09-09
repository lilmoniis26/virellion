import { randomBytes } from "node:crypto";
import { isOperator } from "@/lib/access";
import { getSql } from "@/lib/db";
import { uid } from "@/lib/utils";
import { requireOperator } from "@/lib/staff.server";

export type StaffMember = {
  userId: string;
  name: string;
  email: string;
  role: "operator" | "partner";
  createdAt: string;
};

export type PendingInvite = {
  id: string;
  email: string;
  token: string;
  createdAt: string;
};

function iso(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  return String(value ?? "");
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export async function listTeamFor(userId: string): Promise<{ staff: StaffMember[]; invites: PendingInvite[] }> {
  await requireOperator(userId);
  const sql = await getSql();
  const staff = await sql<{ user_id: string; name: string; email: string; role: string; created_at: unknown }>`
    select user_id, name, email, role, created_at
    from profiles
    where role in ('operator', 'partner')
    order by case when role = 'operator' then 0 else 1 end, created_at asc
  `;
  const invites = await sql<{ id: string; email: string; token: string; created_at: unknown }>`
    select id, email, token, created_at
    from studio_invites
    where accepted_at is null and revoked_at is null
    order by created_at desc
  `;
  return {
    staff: staff.map((row) => ({
      userId: row.user_id,
      name: row.name,
      email: row.email,
      role: row.role === "operator" ? "operator" : "partner",
      createdAt: iso(row.created_at),
    })),
    invites: invites.map((row) => ({
      id: row.id,
      email: row.email,
      token: row.token,
      createdAt: iso(row.created_at),
    })),
  };
}

export async function invitePartnerFor(userId: string, emailRaw: string): Promise<{ staff: StaffMember[]; invites: PendingInvite[]; granted: boolean }> {
  await requireOperator(userId);
  const email = normalizeEmail(emailRaw);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Enter a valid email address.");
  }
  const sql = await getSql();
  const existing = await sql<{ user_id: string; role: string }>`
    select user_id, role from profiles where lower(email) = ${email} limit 1
  `;
  if (existing[0]?.role === "operator") {
    throw new Error("That account is the studio operator and cannot be changed from this desk.");
  }
  if (existing[0]) {
    await sql`update profiles set role = 'partner' where user_id = ${existing[0].user_id}`;
    await sql`
      update studio_invites
      set accepted_at = coalesce(accepted_at, now())
      where lower(email) = ${email} and revoked_at is null
    `;
    return { ...(await listTeamFor(userId)), granted: true };
  }
  const open = await sql<{ id: string }>`
    select id from studio_invites
    where lower(email) = ${email} and accepted_at is null and revoked_at is null
    limit 1
  `;
  if (!open[0]) {
    await sql`
      insert into studio_invites (id, email, role, token, invited_by)
      values (${uid("inv")}, ${email}, 'partner', ${randomBytes(24).toString("hex")}, ${userId})
    `;
  }
  return { ...(await listTeamFor(userId)), granted: false };
}

export async function revokePartnerFor(userId: string, target: { userId?: string; inviteId?: string }) {
  await requireOperator(userId);
  if (target.userId === userId) {
    throw new Error("You cannot remove your own operator access.");
  }
  const sql = await getSql();
  if (target.userId) {
    const rows = await sql<{ role: string; email: string }>`
      select role, email from profiles where user_id = ${target.userId} limit 1
    `;
    const row = rows[0];
    if (!row) throw new Error("Account not found.");
    if (isOperator(row.role)) throw new Error("The operator account cannot be removed.");
    await sql`update profiles set role = 'client' where user_id = ${target.userId}`;
    await sql`
      update studio_invites
      set revoked_at = now()
      where lower(email) = ${row.email.toLowerCase()} and accepted_at is null and revoked_at is null
    `;
  }
  if (target.inviteId) {
    await sql`
      update studio_invites
      set revoked_at = now()
      where id = ${target.inviteId} and accepted_at is null
    `;
  }
  return listTeamFor(userId);
}

export async function acceptInviteFor(userId: string, token: string): Promise<{ role: string }> {
  const sql = await getSql();
  const identity = await sql<{ email: string; name: string }>`
    select email, name from "user" where id = ${userId} limit 1
  `;
  const email = (identity[0]?.email ?? "").toLowerCase();
  const invite = await sql<{ id: string; email: string; revoked_at: unknown; accepted_at: unknown }>`
    select id, email, revoked_at, accepted_at from studio_invites where token = ${token} limit 1
  `;
  const row = invite[0];
  if (!row || row.revoked_at) throw new Error("That invitation is no longer valid.");
  if (row.email.toLowerCase() !== email) {
    throw new Error(`This invitation is for ${row.email}. Sign in with that email.`);
  }
  const profile = await sql<{ role: string }>`select role from profiles where user_id = ${userId} limit 1`;
  if (profile[0]?.role === "operator") {
    throw new Error("The operator account already has full studio access.");
  }
  await sql`update profiles set role = 'partner' where user_id = ${userId}`;
  await sql`update studio_invites set accepted_at = coalesce(accepted_at, now()) where id = ${row.id}`;
  return { role: "partner" };
}

export async function applyOpenInvite(userId: string, email: string): Promise<"partner" | null> {
  const normalized = normalizeEmail(email);
  if (!normalized) return null;
  const sql = await getSql();
  const rows = await sql<{ id: string }>`
    select id from studio_invites
    where lower(email) = ${normalized}
      and accepted_at is null
      and revoked_at is null
    order by created_at desc
    limit 1
  `;
  if (!rows[0]) return null;
  await sql`update studio_invites set accepted_at = now() where id = ${rows[0].id}`;
  return "partner";
}
