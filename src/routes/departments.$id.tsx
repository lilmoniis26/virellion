import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CloseCta } from "@/components/close-cta";
import { useLiveCatalog } from "@/components/catalog-provider";
import { PageHero } from "@/components/page-hero";
import { DEPARTMENTS, SPECIALISTS } from "@/lib/catalog";
import { pageHead } from "@/lib/seo";
import { formatMoney } from "@/lib/utils";

export const Route = createFileRoute("/departments/$id")({
  component: DepartmentPage,
  head: ({ params }) => {
    const dept = DEPARTMENTS.find((d) => d.id === params.id);
    return pageHead(
      dept?.label ?? "Practice",
      dept
        ? `${dept.label} at Virellion. Typical clients: ${dept.typicalClients}.`
        : "A practice at Virellion.",
    );
  },
});

function DepartmentPage() {
  const { id } = Route.useParams();
  const { departments, offers, packages } = useLiveCatalog();
  const dept = departments.find((d) => d.id === id);
  if (!dept) throw notFound();

  const relatedOffers = offers.filter((o) => o.departments.includes(dept.id));
  const relatedPackages = packages.filter((p) => p.departments.includes(dept.id));
  const specialists = SPECIALISTS.filter((s) => s.department === dept.id);

  return (
    <main>
      <PageHero src={dept.image} alt={dept.imageAlt} kicker="Practice" title={dept.label} dek={dept.typicalClients} />

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">Capabilities</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl text-fg">
            What this practice finishes.
          </h2>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {dept.capabilities.map((c, i) => (
              <li key={c} className="bg-surface px-5 py-4">
                <p className="font-mono text-xs tabular-nums text-subtle">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-2 text-sm text-fg">{c}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {specialists.length > 0 ? (
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">Studio roles</p>
            <h2 className="mt-3 font-display text-3xl text-fg">Who owns the work.</h2>
            <ul className="mt-10 divide-y divide-border border-y border-border">
              {specialists.map((s) => (
                <li key={s.role} className="grid gap-2 py-5 sm:grid-cols-12 sm:items-baseline">
                  <p className="font-display text-xl text-fg sm:col-span-4">{s.role}</p>
                  <p className="text-sm leading-relaxed text-muted sm:col-span-8">{s.responsibility}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {relatedOffers.length > 0 ? (
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">Flagship offers</p>
            <h2 className="mt-3 font-display text-3xl text-fg">Where this practice appears.</h2>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {relatedOffers.map((o) => (
                <Link
                  key={o.slug}
                  to="/offers/$slug"
                  params={{ slug: o.slug }}
                  className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface"
                >
                  <div className="aspect-photo overflow-hidden">
                    <img
                      src={o.image}
                      alt={o.imageAlt}
                      className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-xs uppercase tracking-[0.16em] text-subtle">{o.eyebrow}</p>
                    <h3 className="mt-2 font-display text-2xl leading-tight text-fg">{o.name}</h3>
                    <p className="mt-5 text-sm text-fg">From {formatMoney(o.startingPrice)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {relatedPackages.length > 0 ? (
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">Packages</p>
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {relatedPackages.map((p) => (
                <li key={p.id} className="grid gap-2 py-5 sm:grid-cols-12 sm:items-baseline">
                  <p className="font-display text-lg text-fg sm:col-span-5">{p.name}</p>
                  <p className="text-sm text-muted sm:col-span-5">{p.summary}</p>
                  <p className="font-mono text-sm tabular-nums text-fg sm:col-span-2 sm:text-right">
                    {formatMoney(p.price)}
                    {p.priceSuffix ?? ""}
                  </p>
                </li>
              ))}
            </ul>
            <Link
              to="/packages"
              className="mt-6 inline-flex h-11 items-center text-sm text-fg underline decoration-border underline-offset-4"
            >
              All packages
            </Link>
          </div>
        </section>
      ) : null}

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">All practices</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {DEPARTMENTS.map((d) => (
              <Link
                key={d.id}
                to="/departments/$id"
                params={{ id: d.id }}
                className={`inline-flex h-11 items-center rounded-full border px-4 text-sm ${
                  d.id === dept.id ? "border-accent bg-accent text-accent-fg" : "border-border text-muted hover:text-fg"
                }`}
              >
                {d.short}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CloseCta
        title={`Start with ${dept.short.toLowerCase()}, or describe the whole outcome.`}
        body="Reception will identify the practices involved. You approve scope before work begins."
      />
    </main>
  );
}
