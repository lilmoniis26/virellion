import { QUALITY_CHECKS } from "./catalog";
import { classifyIntake, emptyIntake } from "./routing";
import type { Inquiry, Project, Proposal } from "./types";

export const DEMO_MARKER = {
  inquiryId: "inq_demo_hearth",
  proposalId: "prop_demo_hearth",
  projectId: "prj_demo_hearth",
};

export function buildDemoState(): { inquiry: Inquiry; proposal: Proposal; project: Project } {
  const intake = {
    ...emptyIntake(),
    name: "Maren Cole",
    email: "maren@hearthandhollow.example",
    phone: "(503) 555-0142",
    desiredOutcome:
      "Form an LLC, get banking-ready, launch a brand, open Shopify, and prepare TikTok Shop for artisan home goods.",
    projectType: "Online reseller",
    location: "Portland, Oregon",
    audience: "Design-conscious homeowners buying small-batch ceramics and textiles",
    currentStage: "Planning",
    services: ["Business formation", "Online reseller / marketplace", "Brand identity", "Website"],
    deadline: "Before holiday market — 8 weeks",
    budget: "3k-8k" as const,
    assets: "Working product photos, draft product names, no logo, no entity",
    channel: "email" as const,
    regulated: [],
    businessName: "Hearth & Hollow",
    businessStatus: "Not yet formed",
    entityType: "Considering LLC",
    addressSituation: "Home-based, needs mailing and registered-agent options",
    marketplace: "Shopify + TikTok Shop",
    productCategory: "Home goods — ceramics and textiles",
    supplierStatus: "Two makers identified, no contracts",
    inventoryStatus: "Pre-order / made-to-order",
    salesChannels: "Own store and TikTok Shop first; Amazon later",
    hasBank: "no" as const,
    hasEin: "no" as const,
    hasInsurance: "no" as const,
    hasLicenses: "no" as const,
    hasComplianceDocs: "no" as const,
  };

  const routing = classifyIntake(intake);
  const now = new Date().toISOString();

  const inquiry: Inquiry = {
    id: DEMO_MARKER.inquiryId,
    createdAt: now,
    updatedAt: now,
    status: "won",
    stage: "follow-up",
    source: "demo",
    intake,
    routing,
    notes:
      "Internal demo only. Fictional client. Used to test reception → intake → routing → proposal → payment record → project → quality → delivery → follow-up.",
    conversation: [
      {
        id: "msg_demo_1",
        role: "assistant",
        content:
          "We offer creative, publishing, business, technology, marketing, media, e-commerce, and administrative services. Tell me what you are trying to create, improve, launch, or accomplish, and I’ll help identify the right service or specialist.",
        createdAt: now,
      },
      {
        id: "msg_demo_2",
        role: "user",
        content: "I want to start Hearth & Hollow and sell ceramics and textiles online. I don’t have an LLC, EIN, or store yet.",
        createdAt: now,
      },
      {
        id: "msg_demo_3",
        role: "assistant",
        content:
          "That’s an end-to-end formation and reseller launch. I’ll collect the rest of the intake, flag identity verification and marketplace approval risk, and prepare a scope — not legal advice, and you will own every account.",
        createdAt: now,
      },
    ],
  };

  const proposal: Proposal = {
    id: DEMO_MARKER.proposalId,
    inquiryId: inquiry.id,
    createdAt: now,
    title: "Hearth & Hollow — Formation and Reseller Launch",
    summary:
      "Administrative formation coordination, banking-readiness, brand starter, Shopify storefront, and TikTok Shop preparation. Virellion does not provide legal or tax advice and will not open accounts in the agency’s name.",
    deliverables: [
      "Startup roadmap and name research notes",
      "LLC filing coordination packet",
      "EIN assistance checklist",
      "Registered-agent and mailbox referrals",
      "License and permit matrix for Portland / Oregon home goods",
      "Banking-readiness packet",
      "Logo, palette, and packaging direction",
      "Shopify store with first collection",
      "TikTok Shop seller-document organization",
      "Handoff archive",
    ],
    exclusions: [
      "Legal or tax advice",
      "Guaranteed marketplace approval",
      "Holding passwords or creating accounts with Virellion identity",
    ],
    timeline: "5 weeks",
    fee: 4200,
    engagement: "end-to-end",
    status: "approved",
  };

  const project: Project = {
    id: DEMO_MARKER.projectId,
    inquiryId: inquiry.id,
    proposalId: proposal.id,
    createdAt: now,
    updatedAt: now,
    name: "Hearth & Hollow launch",
    clientName: "Maren Cole",
    status: "delivered",
    stage: "follow-up",
    specialist: "Business Consultant",
    folders: ["01 Brief", "02 Formation", "03 Brand", "04 Store", "05 Delivery"],
    tasks: proposal.deliverables.map((title, i) => ({
      id: `task_demo_${i}`,
      title,
      done: true,
      owner: i < 6 ? "Business Consultant" : i < 8 ? "Creative Director" : "E-Commerce Operations Specialist",
    })),
    quality: QUALITY_CHECKS.map((c) => ({ ...c, done: true })),
    handoff:
      "Client owns the Gmail, domain, IRS EIN letter, Oregon SOS login, Shopify owner email, and TikTok Shop seller account. Virellion retains no passwords. Next: monthly store desk if desired.",
    followUp:
      "Offer Monthly Business, Store, and Marketing Support. Optional Amazon track after TikTok Shop is healthy. Product photography session if holiday inventory lands.",
  };

  return { inquiry, proposal, project };
}
