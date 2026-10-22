import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/accessibility")({
  head: () =>
    pageHead(
      "Accessibility Statement",
      "Virellion’s commitment to making the website and client tools usable by as many people as possible.",
    ),
  component: AccessibilityPage,
});

const SECTIONS = [
  {
    heading: "Current Efforts",
    paragraphs: [
      "Semantic HTML structure and proper heading hierarchy.",
      "Keyboard-navigable forms, buttons, and navigation.",
      "Visible focus indicators.",
      "Sufficient color contrast for text and interactive elements.",
      "Alternative text for meaningful images.",
      "Clear form labels and error messages.",
      "Responsive layouts that function on mobile, tablet, and desktop.",
      "Reduced-motion support where the platform allows.",
    ],
  },
  {
    heading: "Known Limitations",
    paragraphs: [
      "Some third-party integrations (payment providers, AI reception widgets, file uploaders) may have their own accessibility constraints. We select providers that offer reasonable accessibility support and continue to improve our own interfaces.",
    ],
  },
  {
    heading: "Feedback",
    paragraphs: [
      "If you encounter an accessibility barrier on virellion.online or within a client account, please contact the studio desk with a description of the issue and the page or feature involved. We will review and respond within a reasonable time and prioritize fixes that improve access for all users.",
    ],
  },
  {
    heading: "Ongoing Commitment",
    paragraphs: [
      "Accessibility is treated as an ongoing requirement of the platform, not a one-time checkbox. New features are designed with keyboard use, screen-reader compatibility, and clear language in mind.",
    ],
  },
];

function AccessibilityPage() {
  return (
    <main>
      <PageHero
        kicker="Studio policy"
        title="Accessibility Statement"
        dek="Version 2026-10-21"
        compact
      />
      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <div className="mt-4 space-y-12">
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
