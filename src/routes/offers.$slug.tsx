import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CloseCta } from "@/components/close-cta";
import { useLiveCatalog } from "@/components/catalog-provider";
import { Button } from "@/components/ui/button";
import { offerBySlug } from "@/lib/catalog";
import { pageHead } from "@/lib/seo";
import { formatMoney } from "@/lib/utils";

export const Route = createFileRoute("/offers/$slug")({
  component: OfferPage,
  head: ({ params }) => {
    const offer = offerBySlug(params.slug);
    return pageHead(
      offer?.name ?? "Offer",
      offer ? `${offer.outcome} Starting at ${formatMoney(offer.startingPrice)}.` : "A flagship offer from Virellion.",
    );
  },
});

function OfferPage() {
  const { slug } = Route.useParams();
  const { offers, departments } = useLiveCatalog();
  const offer = offers.find((item) => item.slug === slug);
  if (!offer) throw notFound();

  const others = offers.filter((o) => o.slug !== offer.slug);
  const deptMap = Object.fromEntries(departments.map((d) => [d.id, d]));

  return (
    <main>
      <section className="relative isolate min-h-[70dvh] overflow-hidden">
        <img src={offer.image} alt={offer.imageAlt} className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/65 to-bg/30" />
        <div className="relative mx-auto flex min-h-[70dvh] max-w-4xl flex-col justify-end px-4 pb-14 pt-24 sm:px-6">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">{offer.eyebrow}</p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-fg sm:text-6xl">{offer.name}</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-accent sm:text-lg">{offer.outcome}</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <p className="text-base leading-relaxed text-muted">{offer.summary}</p>

        <dl className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-surface p-5">
            <dt className="text-xs uppercase tracking-[0.14em] text-subtle">Starting price</dt>
            <dd className="mt-2 font-display text-2xl text-fg">{formatMoney(offer.startingPrice)}</dd>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5 sm:col-span-2">
            <dt className="text-xs uppercase tracking-[0.14em] text-subtle">Timeline</dt>
            <dd className="mt-2 font-display text-2xl text-fg">{offer.timeline}</dd>
          </div>
        </dl>

        <section className="mt-14">
          <h2 className="font-display text-2xl text-fg">Deliverables</h2>
          <ul className="mt-4 space-y-2">
            {offer.deliverables.map((d) => (
              <li key={d} className="flex gap-3 text-sm leading-relaxed text-muted">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                {d}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-2xl text-fg">Exclusions</h2>
          <ul className="mt-4 space-y-2">
            {offer.exclusions.map((d) => (
              <li key={d} className="flex gap-3 text-sm leading-relaxed text-muted">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-subtle" />
                {d}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-2xl text-fg">Practices involved</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {offer.departments.filter((id) => deptMap[id]).map((id) => (
              <Link
                key={id}
                to="/departments/$id"
                params={{ id }}
                className="inline-flex h-11 items-center rounded-full border border-border px-4 text-sm text-muted hover:text-fg"
              >
                {deptMap[id].short}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-xl border border-border bg-surface p-6">
          <h2 className="font-display text-2xl text-fg">Next step</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">{offer.nextStep}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link to="/checkout" search={{ item: `offer:${offer.slug}` }}>
                Order from {formatMoney(offer.startingPrice)}
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/start">
                Start intake <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </section>

        {others.length > 0 ? (
          <section className="mt-16">
            <h2 className="font-display text-2xl text-fg">Other offers</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  to="/offers/$slug"
                  params={{ slug: o.slug }}
                  className="overflow-hidden rounded-xl border border-border"
                >
                  <img src={o.image} alt={o.imageAlt} className="aspect-photo w-full object-cover" />
                  <p className="p-4 font-display text-lg text-fg">{o.name}</p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </section>

      <CloseCta />
    </main>
  );
}
