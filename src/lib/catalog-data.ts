import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";

const MAX_IMAGE = 1_400_000;

const saveSchema = z.object({
  kind: z.enum(["offer", "package", "department"]),
  id: z.string().min(1).max(80),
  published: z.boolean(),
  name: z.string().min(1).max(160),
  shortName: z.string().max(80).optional(),
  eyebrow: z.string().max(80).optional(),
  summary: z.string().max(1200).optional(),
  outcome: z.string().max(1200).optional(),
  timeline: z.string().max(200).optional(),
  nextStep: z.string().max(400).optional(),
  typicalClients: z.string().max(240).optional(),
  price: z.number().int().min(0).max(1_000_000).optional(),
  priceSuffix: z.string().max(20).optional(),
  image: z.string().max(MAX_IMAGE).optional(),
  imageAlt: z.string().max(240).optional(),
  deliverablesText: z.string().max(8000).optional(),
  exclusionsText: z.string().max(4000).optional(),
  capabilitiesText: z.string().max(4000).optional(),
  departmentsText: z.string().max(400).optional(),
  packageKind: z.enum(["launch", "custom", ""]).optional(),
});

/** Public marketing catalog. Intentionally unauthenticated. */
export const getPublicCatalog = createServerFn({ method: "GET" }).handler(async () => {
  const { readMerged } = await import("./catalog-data.server");
  return readMerged(false);
});

export const getStudioCatalog = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { getStudioCatalogFor } = await import("./catalog-data.server");
    return getStudioCatalogFor(context.userId);
  });

export const saveCatalogItem = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(saveSchema)
  .handler(async ({ context, data }) => {
    const { saveCatalogItemFor } = await import("./catalog-data.server");
    return saveCatalogItemFor(context.userId, data);
  });

export const resetCatalogItem = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ kind: z.enum(["offer", "package", "department"]), id: z.string().min(1).max(80) }))
  .handler(async ({ context, data }) => {
    const { resetCatalogItemFor } = await import("./catalog-data.server");
    return resetCatalogItemFor(context.userId, data.kind, data.id);
  });

export const createCatalogItem = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      kind: z.enum(["offer", "package", "department"]),
      name: z.string().min(2).max(160),
      packageKind: z.enum(["launch", "custom"]).optional(),
    }),
  )
  .handler(async ({ context, data }) => {
    const { createCatalogItemFor } = await import("./catalog-data.server");
    return createCatalogItemFor(context.userId, data);
  });
