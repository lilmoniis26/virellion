import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";

export const listStudioTeam = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { listTeamFor } = await import("./team-data.server");
    return listTeamFor(context.userId);
  });

export const inviteStudioPartner = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ email: z.string().min(3).max(160) }))
  .handler(async ({ context, data }) => {
    const { invitePartnerFor } = await import("./team-data.server");
    return invitePartnerFor(context.userId, data.email);
  });

export const revokeStudioPartner = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ userId: z.string().max(80).optional(), inviteId: z.string().max(80).optional() }))
  .handler(async ({ context, data }) => {
    const { revokePartnerFor } = await import("./team-data.server");
    return revokePartnerFor(context.userId, data);
  });

export const acceptStudioInvite = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ token: z.string().min(8).max(80) }))
  .handler(async ({ context, data }) => {
    const { acceptInviteFor } = await import("./team-data.server");
    return acceptInviteFor(context.userId, data.token);
  });
