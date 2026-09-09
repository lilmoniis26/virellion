import { createFileRoute, Link } from "@tanstack/react-router";
import { CloseCta } from "@/components/close-cta";
import { useLiveCatalog } from "@/components/catalog-provider";
import { useSiteCopy } from "@/components/site-copy-provider";
import { PageHero } from "@/components/page-hero";
import { SERVICE_GROUPS } from "@/lib/catalog";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () =>
    pageHead(
      "Services",
      "Sixteen practices under one roof. Hire one, or describe the outcome and Virellion will assemble the rest.",
    ),
});

function ServicesPage() {
  const { departments } = useLiveCatalog();
  const copy = useSiteCopy();
  const byId = Object.fromEntries(departments.map((d) => [d.id, d]));
  return (
    <main>
      <PageHero
        src={copy.services.image}
        alt={copy.services.imageAlt}
        kicker={copy.services.kicker}
        title={copy.services.title}
        dek={copy.services.dek}
      />

      {SERVICE_GROUPS.map((group) => {
        const ids = group.ids.filter((id) => byId[id]);
        if (ids.length === 0) return null;
        return (
        <section key={group.title} className="border-b border-border">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <p className="text-xs uppercase tracking-[0.18em] text-subtle">{group.title}</p>
            <h2 className="mt-2 font-display text-3xl text-fg">{group.dek}</h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ids.map((id) => {
                const d = byId[id];
                return (
                  <Link
                    key={id}
                    to="/departments/$id"
                    params={{ id }}
                    className="group overflow-hidden rounded-xl border border-border bg-surface"
                  >
                    <div className="aspect-photo overflow-hidden">
                      <img
                        src={d.image}
                        alt={d.imageAlt}
                        className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-2xl text-fg">{d.short}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {d.capabilities.slice(0, 5).join(" · ")}
                      </p>
                      <p className="mt-3 text-xs text-subtle">Typical clients · {d.typicalClients}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
        );
      })}

      <CloseCta title="Not sure which practice?" body="Tell reception the outcome. Classification is the first deliverable." />
    </main>
  );
}
