import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";

const optionalHero = z.object({
  kicker: z.string().max(80),
  title: z.string().max(200),
  dek: z.string().max(800),
  image: z.string().max(1_400_000),
  imageAlt: z.string().max(240),
});

const legalSection = z.object({
  heading: z.string().max(120),
  paragraphs: z.array(z.string().max(2400)).max(8),
});

const saveSchema = z.object({
  home: optionalHero.extend({
    paperQuote: z.string().max(600),
    stats: z.array(z.object({ k: z.string().max(12), v: z.string().max(80) })).max(6),
    offersKicker: z.string().max(80),
    offersTitle: z.string().max(200),
    servicesKicker: z.string().max(80),
    servicesTitle: z.string().max(200),
    servicesDek: z.string().max(600),
    studioKicker: z.string().max(80),
    studioTitle: z.string().max(200),
    studioBody1: z.string().max(800),
    studioBody2: z.string().max(800),
    studioImage: z.string().max(1_400_000),
    studioImageAlt: z.string().max(240),
    engagementKicker: z.string().max(80),
    engagementTitle: z.string().max(200),
    packagesKicker: z.string().max(80),
    packagesTitle: z.string().max(200),
    stepsKicker: z.string().max(80),
    stepsTitle: z.string().max(200),
    faqKicker: z.string().max(80),
    faqTitle: z.string().max(200),
  }),
  services: optionalHero,
  offers: z.object({
    kicker: z.string().max(80),
    title: z.string().max(200),
    dek: z.string().max(800),
  }),
  packages: optionalHero.extend({
    sectionTitle: z.string().max(200),
    sectionDek: z.string().max(80),
  }),
  work: optionalHero.extend({
    pathTitle: z.string().max(200),
    engagementTitle: z.string().max(200),
    engagementImage: z.string().max(1_400_000),
    engagementImageAlt: z.string().max(240),
    boundariesTitle: z.string().max(200),
  }),
  start: optionalHero,
  receptionist: optionalHero,
  login: z.object({
    kicker: z.string().max(80),
    titleSignIn: z.string().max(200),
    titleSignUp: z.string().max(200),
    dek: z.string().max(400),
    body: z.string().max(600),
  }),
  account: optionalHero,
  nav: z.object({
    services: z.string().max(40),
    offers: z.string().max(40),
    packages: z.string().max(40),
    work: z.string().max(40),
    startCta: z.string().max(40),
    receptionCta: z.string().max(40),
  }),
  contact: z.object({
    email: z.string().max(160),
    phone: z.string().max(40),
    addressLine: z.string().max(120),
  }),
  footer: z.object({
    blurb: z.string().max(400),
    legalLine: z.string().max(800),
  }),
  cta: z.object({
    title: z.string().max(200),
    body: z.string().max(400),
    startLabel: z.string().max(40),
    receptionLabel: z.string().max(40),
  }),
  faqs: z.array(z.object({ q: z.string().max(200), a: z.string().max(1200) })).max(20),
  steps: z.array(z.object({ n: z.string().max(8), title: z.string().max(80), body: z.string().max(400) })).max(8),
  engagements: z
    .array(
      z.object({
        id: z.string().max(40),
        label: z.string().max(80),
        bestFor: z.string().max(200),
        examples: z.string().max(400),
      }),
    )
    .max(8),
  boundaries: z.array(z.string().max(400)).max(12),
  legal: z.object({
    version: z.string().max(40),
    effective: z.string().max(80),
    termsKicker: z.string().max(80),
    termsTitle: z.string().max(200),
    termsDek: z.string().max(400),
    termsImage: z.string().max(1_400_000),
    termsImageAlt: z.string().max(240),
    privacyKicker: z.string().max(80),
    privacyTitle: z.string().max(200),
    privacyDek: z.string().max(400),
    privacyImage: z.string().max(1_400_000),
    privacyImageAlt: z.string().max(240),
    terms: z.array(legalSection).max(20),
    privacy: z.array(legalSection).max(20),
    allows: z.array(z.string().max(400)).max(12),
    doesNot: z.array(z.string().max(400)).max(12),
  }),
});

export const getPublicSiteCopy = createServerFn({ method: "GET" }).handler(async () => {
  const { readSiteCopy } = await import("./site-copy-data.server");
  return readSiteCopy();
});

export const getStudioSiteCopy = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { requireStaff } = await import("./staff.server");
    const { readSiteCopy } = await import("./site-copy-data.server");
    await requireStaff(context.userId);
    return readSiteCopy();
  });

export const saveStudioSiteCopy = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(saveSchema)
  .handler(async ({ context, data }) => {
    const { saveSiteCopyFor } = await import("./site-copy-data.server");
    return saveSiteCopyFor(context.userId, data);
  });

export const resetStudioSiteCopy = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { resetSiteCopyFor } = await import("./site-copy-data.server");
    return resetSiteCopyFor(context.userId);
  });
