import { createFileRoute, Link } from "@tanstack/react-router";
import { CloseCta } from "@/components/close-cta";
import { useLiveCatalog } from "@/components/catalog-provider";
import { useSiteCopy } from "@/components/site-copy-provider";
import { pageHead } from "@/lib/seo";
import { formatMoney } from "@/lib/utils";

export const Route = createFileRoute("/offers/")({
  component: OffersIndex,
  head: () =>
    pageHead(
      "Offers",
      "Three public offers from Virellion: formation and reseller readiness, brand and website launch, and book development.",
    ),
});

function OffersIndex() {
  const { offers } = useLiveCatalog();
  const copy = useSiteCopy();
  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">{copy.offers.kicker}</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl text-fg sm:text-6xl">{copy.offers.title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">{copy.offers.dek}</p>
      </section>

      <section className="mx-auto max-w-6xl space-y-16 px-4 pb-16 sm:px-6">
        {offers.map((o, i) => (
          <article
            key={o.slug}
            className="grid items-center gap-8 border-t border-border pt-12 lg:grid-cols-2 lg:gap-12"
          >
            <Link
              to="/offers/$slug"
              params={{ slug: o.slug }}
              className={`overflow-hidden rounded-xl ${i % 2 === 1 ? "lg:order-2" : ""}`}
            >
              <img src={o.image} alt={o.imageAlt} className="aspect-photo w-full object-cover" />
            </Link>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-subtle">{o.eyebrow}</p>
              <h2 className="mt-3 font-display text-3xl text-fg sm:text-4xl">{o.name}</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{o.outcome}</p>
              <p className="mt-6 font-display text-2xl text-fg">From {formatMoney(o.startingPrice)}</p>
              <p className="mt-1 text-sm text-subtle">{o.timeline}</p>
              <Link
                to="/offers/$slug"
                params={{ slug: o.slug }}
                className="mt-6 inline-flex h-11 items-center text-sm text-fg underline decoration-border underline-offset-4"
              >
                Outcome, deliverables, and exclusions
              </Link>
            </div>
          </article>
        ))}
      </section>

      <CloseCta />
    </main>
  );
}
