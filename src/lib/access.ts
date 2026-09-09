export type StudioRole = "client" | "partner" | "operator";

export function normalizeRole(role: string | null | undefined): StudioRole {
  if (role === "operator" || role === "partner") return role;
  return "client";
}

export function isStaff(role: string | null | undefined): boolean {
  return role === "operator" || role === "partner";
}

export function isOperator(role: string | null | undefined): boolean {
  return role === "operator";
}

export const OPERATOR_ONLY = [
  "PayPal and payout details",
  "Marking orders paid and issuing receipts",
  "Inviting or removing studio partners",
  "Downloading the marketing list",
  "Editing Terms of Engagement and the Privacy Notice",
] as const;

export const OPERATOR_NEVER_IN_DESK = [
  "Domain, DNS, and hosting records",
  "Bank accounts, tax IDs, and card numbers",
  "Resetting anyone’s password or recovery methods",
] as const;

export const PARTNER_MAY = [
  "Edit public pages, photographs, headlines, and closing copy",
  "Edit catalog names, prices, services, practices, and images",
  "Add new offers, packages, and practices to the public site",
  "Help with inquiries, projects, and the studio inbox",
  "See the client roster (not export it)",
] as const;
