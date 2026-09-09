import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { EngagementNotice } from "@/components/consent-fields";
import { useSiteCopy } from "@/components/site-copy-provider";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () =>
    pageHead(
      "Privacy Notice",
      "How Virellion uses the information you provide, what we do not do with it, and how marketing opt-in works.",
    ),
  component: PrivacyPage,
});

function PrivacyPage() {
  const copy = useSiteCopy();
  const legal = copy.legal;
  return (
    <main>
      <PageHero
        src={legal.privacyImage}
        alt={legal.privacyImageAlt}
        kicker={legal.privacyKicker}
        title={legal.privacyTitle}
        dek={legal.privacyDek}
        compact
      />
      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <EngagementNotice />
        <div className="mt-12 space-y-12">
          {legal.privacy.map((section) => (
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
          .
        </p>
      </section>
    </main>
  );
}
