import { createFileRoute, Link } from "@tanstack/react-router";
import { CloseCta } from "@/components/close-cta";
import { useLiveCatalog } from "@/components/catalog-provider";
import { useSiteCopy } from "@/components/site-copy-provider";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { itemParam } from "@/lib/commerce";
import { pageHead } from "@/lib/seo";
import { formatMoney } from "@/lib/utils";

export const Route = createFileRoute("/packages")({
  component: PackagesPage,
  head: () =>
    pageHead(
      "Packages",
      "Five launch packages Virellion can deliver now, plus custom work held until demand and capacity are proven.",
    ),
});

function PackagesPage() {
  const { packages } = useLiveCatalog();
  const copy = useSiteCopy();
  const launch = packages.filter((p) => p.kind === "launch");
  const custom = packages.filter((p) => p.kind === "custom");

  return (
    <main>
      <PageHero
        src={copy.packages.image}
        alt={copy.packages.imageAlt}
        kicker={copy.packages.kicker}
        title={copy.packages.title}
        dek={copy.packages.dek}
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">{copy.packages.sectionDek}</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl text-fg sm:text-4xl">
            {copy.packages.sectionTitle}
          </h2>
          <div className="mt-12 space-y-6">
            {launch.map((p, i) => {
              return (
                <article
                  key={p.id}
                  className="grid overflow-hidden rounded-xl border border-border bg-surface lg:grid-cols-12"
                >
                  <div className="aspect-photo min-h-48 lg:col-span-4 lg:aspect-auto lg:min-h-full">
                    <img src={p.image} alt={p.imageAlt} className="size-full object-cover" />
                  </div>
                  <div className="flex flex-col p-6 sm:p-8 lg:col-span-8">
                    <div className="flex items-start justify-between gap-4">
                      <p className="font-mono text-xs tabular-nums text-subtle">{String(i + 1).padStart(2, "0")}</p>
                      <p className="font-mono text-sm tabular-nums text-fg">
                        {formatMoney(p.price)}
                        {p.priceSuffix ?? ""}
                      </p>
                    </div>
                    <h3 className="mt-3 font-display text-3xl text-fg">{p.name}</h3>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{p.summary}</p>
                    <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                      {p.deliverables.map((d) => (
                        <li key={d} className="flex gap-3 text-sm text-fg/90">
                          <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                          {d}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 flex flex-wrap items-end justify-between gap-3 border-t border-border pt-4">
                      <p className="text-xs uppercase tracking-[0.14em] text-subtle">{p.timeline}</p>
                      <Button asChild>
                        <Link to="/checkout" search={{ item: itemParam("package", p.id) }}>
                          Order {formatMoney(p.price)}
                          {p.priceSuffix ?? ""}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">Custom until proven</p>
          <h2 className="mt-3 font-display text-3xl text-fg">Scoped after a conversation.</h2>
          <ul className="mt-10 divide-y divide-border border-y border-border">
            {custom.map((p) => (
              <li key={p.id} className="grid gap-3 py-8 sm:grid-cols-12 sm:items-baseline">
                <p className="font-display text-2xl text-fg sm:col-span-4">{p.name}</p>
                <div className="sm:col-span-6">
                  <p className="text-sm leading-relaxed text-muted">{p.summary}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.14em] text-subtle">{p.timeline}</p>
                </div>
                <p className="font-mono text-sm tabular-nums text-fg sm:col-span-2 sm:text-right">
                  from {formatMoney(p.price)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CloseCta
        title="Request a package, or describe something else."
        body="Intake classifies the work. You receive a scope with deliverables, exclusions, timeline, and fee before anything starts."
      />
    </main>
  );
}
