import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { EngagementNotice } from "@/components/consent-fields";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/refund")({
  head: () =>
    pageHead(
      "Refund Policy",
      "When and how refunds are issued for Virellion services, packages, and retainers.",
    ),
  component: RefundPage,
});

const SECTIONS = [
  {
    heading: "General Principle",
    paragraphs: [
      "Virellion aims for clear scope, transparent pricing, and completed work that matches the approved proposal. Refunds are handled according to the stage of work and the nature of the service.",
    ],
  },
  {
    heading: "Refund Eligibility by Stage",
    paragraphs: [
      "Payment received, work not started → Full refund.",
      "Work started, no draft delivered → Refund of unused portion after documented time and third-party costs.",
      "Draft or partial deliverable provided → Fees for completed work are earned; remaining balance may be credited.",
      "Final deliverables handed over / accepted → No refund.",
      "Consultation / timed session → Per the 24-hour and no-show rules in the Cancellation and Rescheduling Policy.",
      "Monthly retainer → No partial-month refund; cancel before the next billing cycle.",
    ],
  },
  {
    heading: "Non-Refundable Items",
    paragraphs: [
      "Third-party costs already incurred (domain registrations, marketplace fees, stock assets, paid ads spend, etc.) when those costs were approved or necessary for the scoped work.",
      "Work that has been accepted in writing or by continued use of the deliverables.",
      "Custom work that was scoped and approved after consultation when the client later changes direction.",
    ],
  },
  {
    heading: "How Refunds Are Issued",
    paragraphs: [
      "Refunds are returned to the original payment method (PayPal, card processor, or invoice settlement) within 5–10 business days after approval.",
      "Credits (when offered) are valid for 90 days and may be applied to any Virellion service of equal or greater value.",
      "Virellion never stores card numbers. Refund processing follows the rules of the original payment provider.",
    ],
  },
  {
    heading: "Disputes",
    paragraphs: [
      "Contact the studio desk in writing with the order reference and a clear description of the concern. Most issues are resolved by revision, partial credit, or clarification of scope. Formal chargebacks without prior contact may be contested with the engagement record.",
    ],
  },
];

function RefundPage() {
  return (
    <main>
      <PageHero
        kicker="Studio policy"
        title="Refund Policy"
        dek="Version 2026-10-21 · Effective upon publication. This policy forms part of the Terms of Engagement."
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
          <Link to="/cancellation" className="text-fg underline underline-offset-4">
            Cancellation Policy
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
