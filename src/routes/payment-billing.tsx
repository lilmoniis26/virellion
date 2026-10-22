import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { EngagementNotice } from "@/components/consent-fields";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/payment-billing")({
  head: () =>
    pageHead(
      "Payment and Billing Information",
      "Accepted payment methods, when payment is due, receipts, and billing practices at Virellion.",
    ),
  component: PaymentBillingPage,
});

const SECTIONS = [
  {
    heading: "Accepted Payment Methods",
    paragraphs: [
      "PayPal (studio’s existing business checkout).",
      "Secure card payment link (issued by the studio after scope approval).",
      "Invoice (for approved clients or larger engagements).",
      "Virellion never collects or stores raw card numbers, card security codes, or PayPal passwords on its systems.",
    ],
  },
  {
    heading: "When Payment Is Due",
    paragraphs: [
      "Fixed-price packages and catalog services: payment is due at the time of order (or per the deposit schedule shown on the order).",
      "Custom proposals: payment is due after the client approves the scope and amount. Production begins only after verified payment or an explicitly agreed written deposit plan.",
      "Monthly retainers: billed in advance on the agreed cycle.",
      "Consultations: payment is collected at booking or immediately before the session.",
    ],
  },
  {
    heading: "Receipts",
    paragraphs: [
      "After the studio confirms funds, a numbered studio receipt is issued to the client account. The receipt records amount, method, date, and order reference. It is a professional services receipt and is not a substitute for the client’s own bookkeeping or tax records.",
    ],
  },
  {
    heading: "Pricing Accuracy",
    paragraphs: [
      "All prices shown on the public site and in proposals are starting or fixed prices for the listed deliverables. Custom work is priced only after scoping. Browser-submitted totals are never authoritative; the server recalculates from the approved catalog or proposal.",
    ],
  },
  {
    heading: "Taxes",
    paragraphs: [
      "Prices are quoted in USD. Applicable sales tax, if any, will be calculated and shown at checkout or on the invoice according to the client’s location and the nature of the service.",
    ],
  },
  {
    heading: "Failed Payments and Invoices",
    paragraphs: [
      "If a payment fails, the client is notified and given a reasonable opportunity to update the method. Work does not proceed on failed payments.",
      "Authorized staff may issue an invoice or secure payment link for an approved order. An invoice is not marked paid until the provider confirms receipt of funds or an authorized manual reconciliation is recorded.",
    ],
  },
  {
    heading: "Recurring Billing",
    paragraphs: [
      "Monthly retainers and any future subscriptions are billed only after the client has accepted the recurring terms. Cancellation follows the Cancellation and Rescheduling Policy.",
    ],
  },
];

function PaymentBillingPage() {
  return (
    <main>
      <PageHero
        kicker="Studio policy"
        title="Payment and Billing Information"
        dek="Version 2026-10-21 · Effective upon publication."
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
          <Link to="/cancellation" className="text-fg underline underline-offset-4">
            Cancellation Policy
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
