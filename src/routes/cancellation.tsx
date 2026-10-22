import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { EngagementNotice } from "@/components/consent-fields";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/cancellation")({
  head: () =>
    pageHead(
      "Cancellation and Rescheduling Policy",
      "How cancellations, rescheduling, and no-shows are handled for Virellion consultations, packages, and retainers.",
    ),
  component: CancellationPage,
});

const SECTIONS = [
  {
    heading: "Consultations and Timed Sessions",
    paragraphs: [
      "Cancellations or rescheduling requests made more than 24 hours before the scheduled start time receive a full credit or free reschedule to a new available slot.",
      "Cancellations or rescheduling requests made less than 24 hours before the scheduled start time retain 50% of the session fee; the balance may be applied as credit toward a future session within 90 days.",
      "No-shows (client does not attend and does not notify) retain the full fee.",
      "Virellion may reschedule a session with at least 24 hours’ notice. If the client cannot accept the new time, a full refund or credit is issued.",
    ],
  },
  {
    heading: "Fixed-Price Packages and Project Work",
    paragraphs: [
      "Before work has begun (no deliverables started and no specialist time allocated): full refund available upon written request.",
      "After work has begun but before any draft deliverable is provided: refund of the unused portion after deducting time already spent (documented at standard internal rates) and any third-party costs incurred.",
      "After a draft or partial deliverable has been delivered: fees for work completed are earned. Remaining unused balance may be credited toward additional scope or a future engagement at Virellion’s discretion.",
      "Once final deliverables have been handed over and accepted (or 7 days have passed without written objection): no refund.",
    ],
  },
  {
    heading: "Monthly Retainers",
    paragraphs: [
      "Month-to-month retainers may be cancelled with written notice at least 7 days before the next billing date.",
      "No partial-month refunds. Services continue through the end of the paid period.",
      "Unused hours or content batches do not roll over unless explicitly agreed in writing.",
    ],
  },
  {
    heading: "How to Request Cancellation or Rescheduling",
    paragraphs: [
      "Submit the request through your client account, by email to the studio desk, or via the original order confirmation thread. Include the order/reference number and preferred outcome (refund, credit, or new date).",
    ],
  },
  {
    heading: "Force Majeure and Studio-Initiated Changes",
    paragraphs: [
      "If Virellion cannot deliver due to circumstances beyond reasonable control, the client will receive a full refund of amounts paid for undelivered work or the option to reschedule at no additional cost.",
    ],
  },
  {
    heading: "Chargebacks",
    paragraphs: [
      "Clients agree to contact Virellion first to resolve any billing concern before initiating a chargeback. Chargebacks filed without prior written contact may be treated as a dispute of the engagement record.",
    ],
  },
];

function CancellationPage() {
  return (
    <main>
      <PageHero
        kicker="Studio policy"
        title="Cancellation and Rescheduling Policy"
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
          <Link to="/refund" className="text-fg underline underline-offset-4">
            Refund Policy
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
