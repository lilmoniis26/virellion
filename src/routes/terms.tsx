import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { EngagementNotice } from "@/components/consent-fields";
import { useSiteCopy } from "@/components/site-copy-provider";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () =>
    pageHead(
      "Terms of Engagement",
      "What you agree to when you hire Virellion, how payment works, and the professional boundaries of the studio.",
    ),
  component: TermsPage,
});

function TermsPage() {
  const copy = useSiteCopy();
  const legal = copy.legal;
  return (
    <main>
      <PageHero
        src={legal.termsImage}
        alt={legal.termsImageAlt}
        kicker={legal.termsKicker}
        title={legal.termsTitle}
        dek={legal.termsDek}
        compact
      />
      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <EngagementNotice />
        <div className="mt-12 space-y-12">
          {legal.terms.map((section) => (
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
          <Link to="/privacy" className="text-fg underline underline-offset-4">
            Privacy Notice
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
