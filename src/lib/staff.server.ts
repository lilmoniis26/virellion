import { isOperator, isStaff, normalizeRole, type StudioRole } from "@/lib/access";
import { getSql } from "@/lib/db";

export async function readRole(userId: string): Promise<StudioRole | null> {
  const sql = await getSql();
  const rows = await sql<{ role: string }>`select role from profiles where user_id = ${userId} limit 1`;
  if (!rows[0]) return null;
  return normalizeRole(rows[0].role);
}

export async function requireStaff(userId: string): Promise<StudioRole> {
  const role = await readRole(userId);
  if (!role || !isStaff(role)) throw new Error("Forbidden");
  return role;
}

export async function requireOperator(userId: string): Promise<StudioRole> {
  const role = await readRole(userId);
  if (!role || !isOperator(role)) throw new Error("Forbidden");
  return role;
}
