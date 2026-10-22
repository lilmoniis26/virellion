import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { EngagementNotice } from "@/components/consent-fields";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/scope-limitations")({
  head: () =>
    pageHead(
      "Client Service Scope and Limitations",
      "Clear boundaries of what Virellion provides and does not provide.",
    ),
  component: ScopeLimitationsPage,
});

const SECTIONS = [
  {
    heading: "What Virellion Provides",
    paragraphs: [
      "Administrative assistance, research, preparation, coordination, and referral support.",
      "Creative production (branding, design, video, audio, publishing assets, and related work).",
      "Business planning and entrepreneurial guidance within the scopes listed in the service catalog.",
      "Website and storefront configuration assistance.",
      "Project coordination and handoff of completed deliverables.",
    ],
  },
  {
    heading: "What Virellion Does Not Provide",
    paragraphs: [
      "Legal advice or legal representation.",
      "Tax advice or tax preparation.",
      "Accounting or bookkeeping services (beyond organizing client-supplied records for handoff).",
      "Investment, securities, or financial-planning advice.",
      "Immigration advice or services.",
      "Medical, clinical, or therapeutic advice.",
      "Licensed architecture, engineering, or construction services.",
      "Guarantees of marketplace approval, account reinstatement, sales volume, rankings, funding, or revenue.",
      "Opening of bank, marketplace, government, or tax accounts in the client’s name using Virellion identity.",
    ],
  },
  {
    heading: "Client Ownership and Responsibility",
    paragraphs: [
      "The client owns and controls every account, domain, tax identifier, bank account, payment method, marketplace profile, and recovery method.",
      "The client is responsible for completing identity verification, banking setup, marketplace applications, and any legal or tax decisions.",
      "Virellion uses delegated access where possible and does not retain passwords when an invitation-based system is available.",
      "The client is responsible for the accuracy of information supplied and for any content, products, or claims the client provides for use in deliverables.",
    ],
  },
  {
    heading: "Human Review",
    paragraphs: [
      "Sensitive, regulated, complex, or high-value requests are reviewed by a human before production proceeds. AI assists with reception, intake, routing, drafting, and internal coordination; it does not replace professional judgment or licensed advice.",
    ],
  },
  {
    heading: "Scope Changes",
    paragraphs: [
      "Any change to the approved scope, deliverables, timeline, or price requires written agreement (proposal revision or change order) before additional work is performed.",
    ],
  },
];

function ScopeLimitationsPage() {
  return (
    <main>
      <PageHero
        kicker="Studio policy"
        title="Client Service Scope and Limitations"
        dek="Version 2026-10-21 · This document is part of the Terms of Engagement."
        compact
      />
      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <EngagementNotice />
        <div className="mt-12 space-y-12">
          {SECTIONS.map((section) => (
            <article key={section.heading}>
              <h2 className="font-display text-2xl text-fg">{section.heading}</h2>
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 48)} className="mt-4 text-sm leading-relaxed text-muted">
                  {p}
                </p>
              ))}
            </article>
          ))}
        </div>
        <p className="mt-14 text-sm text-subtle">
          Related:{" "}
          <Link to="/terms" className="text-fg underline underline-offset-4">
            Terms of Engagement
          </Link>
          {" · "}
          <Link to="/privacy" className="text-fg underline underline-offset-4">
            Privacy Notice
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
