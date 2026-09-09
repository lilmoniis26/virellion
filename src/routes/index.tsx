import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CloseCta } from "@/components/close-cta";
import { useLiveCatalog } from "@/components/catalog-provider";
import { useSiteCopy } from "@/components/site-copy-provider";
import { Button } from "@/components/ui/button";
import { pageHead } from "@/lib/seo";
import { formatMoney } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: Home,
  head: () =>
    pageHead(
      "One team. Multiple specialties. Complete solutions.",
      "A multidisciplinary studio for authors, founders, creators, and online sellers. Formation, brands, books, film, and systems — described in ordinary language, delivered as one piece of work.",
    ),
});

function Home() {
  const { offers, packages, departments } = useLiveCatalog();
  const copy = useSiteCopy();
  const engagements = copy.engagements.filter((e) => ["individual", "package", "end-to-end"].includes(e.id));
  return (
    <main>
      <section className="relative isolate min-h-dvh overflow-hidden">
        <img src={copy.home.image} alt={copy.home.imageAlt} className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/25" />
        <div className="relative mx-auto flex min-h-dvh max-w-6xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-20">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">{copy.home.kicker}</p>
          <h1 className="mt-5 max-w-4xl font-display text-4xl leading-[1.05] tracking-tight text-fg sm:text-6xl lg:text-7xl">
            {copy.home.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-accent sm:text-lg">{copy.home.dek}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link to="/start">
                {copy.nav.startCta} <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-accent/40 text-fg hover:bg-raised/80" asChild>
              <Link to="/services">{copy.nav.services}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-paper text-ink">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <p className="max-w-3xl font-display text-2xl leading-snug text-ink sm:text-3xl">{copy.home.paperQuote}</p>
          <div className="mt-12 grid gap-8 border-t border-line pt-10 sm:grid-cols-3">
            {copy.home.stats.map((stat) => (
              <Stat key={stat.v} k={stat.k} v={stat.v} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">{copy.home.offersKicker}</p>
              <h2 className="mt-3 max-w-xl font-display text-3xl text-fg sm:text-4xl">{copy.home.offersTitle}</h2>
            </div>
            <Button variant="outline" asChild>
              <Link to="/offers">All offers</Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {offers.map((o) => (
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
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{o.outcome}</p>
                  <p className="mt-5 text-sm text-fg">
                    From {formatMoney(o.startingPrice)}
                    <span className="text-muted"> · {o.timeline.split("·")[0]}</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">{copy.home.servicesKicker}</p>
          <h2 className="mt-3 font-display text-3xl text-fg sm:text-4xl">{copy.home.servicesTitle}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">{copy.home.servicesDek}</p>
          <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {departments.map((d, i) => (
              <Link
                key={d.id}
                to="/departments/$id"
                params={{ id: d.id }}
                className="group bg-surface p-5 transition-colors hover:bg-raised"
              >
                <p className="font-mono text-xs tabular-nums text-subtle">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-3 font-display text-xl text-fg">{d.short}</p>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                  {d.capabilities.slice(0, 3).join(" · ")}
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <Button variant="outline" asChild>
              <Link to="/services">Explore the catalog</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl items-stretch gap-0 lg:grid-cols-2">
          <img src={copy.home.studioImage} alt={copy.home.studioImageAlt} className="h-72 w-full object-cover lg:h-full" />
          <div className="flex flex-col justify-center px-4 py-14 sm:px-10">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">{copy.home.studioKicker}</p>
            <h2 className="mt-3 font-display text-3xl text-fg sm:text-4xl">{copy.home.studioTitle}</h2>
            <p className="mt-5 text-sm leading-relaxed text-muted sm:text-base">{copy.home.studioBody1}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{copy.home.studioBody2}</p>
            <div className="mt-8">
              <Button variant="outline" asChild>
                <Link to="/work">Read the approach</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">{copy.home.engagementKicker}</p>
          <h2 className="mt-3 font-display text-3xl text-fg">{copy.home.engagementTitle}</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {engagements.map((e) => (
              <div key={e.id} className="border-t border-border pt-5">
                <h3 className="font-display text-xl text-fg">{e.label}</h3>
                <p className="mt-2 text-sm text-muted">{e.bestFor}</p>
                <p className="mt-3 text-sm leading-relaxed text-subtle">{e.examples}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">{copy.home.packagesKicker}</p>
              <h2 className="mt-3 font-display text-3xl text-fg">{copy.home.packagesTitle}</h2>
            </div>
            <Button variant="outline" asChild>
              <Link to="/packages">Package details</Link>
            </Button>
          </div>
          <ul className="mt-10 divide-y divide-border border-y border-border">
            {packages.filter((p) => p.kind === "launch").map((p) => (
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
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">{copy.home.stepsKicker}</p>
          <h2 className="mt-3 font-display text-3xl text-fg">{copy.home.stepsTitle}</h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {copy.steps.map((step) => (
              <li key={step.n} className="border-t border-border pt-5">
                <p className="font-mono text-xs text-subtle">{step.n}</p>
                <h3 className="mt-3 font-display text-xl text-fg">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">{copy.home.faqKicker}</p>
          <h2 className="mt-3 font-display text-3xl text-fg">{copy.home.faqTitle}</h2>
          <div className="mt-8">
            {copy.faqs.map((f) => (
              <details key={f.q} className="border-t border-border py-5">
                <summary className="cursor-pointer font-display text-xl text-fg">{f.q}</summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CloseCta />
    </main>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <p className="font-display text-4xl tabular-nums text-ink">{k}</p>
      <p className="mt-2 text-sm text-ink-soft">{v}</p>
    </div>
  );
}
