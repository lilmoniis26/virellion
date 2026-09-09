import { createFileRoute } from "@tanstack/react-router";
import { CloseCta } from "@/components/close-cta";
import { PageHero } from "@/components/page-hero";
import { useSiteCopy } from "@/components/site-copy-provider";
import { JOURNEY } from "@/lib/catalog";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/work")({
  component: WorkPage,
  head: () =>
    pageHead(
      "Approach",
      "How Virellion takes an inquiry to a finished handoff. AI receives. A human reviews anything complex. You approve before work begins.",
    ),
});

function WorkPage() {
  const copy = useSiteCopy();
  return (
    <main>
      <PageHero
        src={copy.work.image}
        alt={copy.work.imageAlt}
        kicker={copy.work.kicker}
        title={copy.work.title}
        dek={copy.work.dek}
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">Public path</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl text-fg sm:text-4xl">{copy.work.pathTitle}</h2>
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
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
        <div className="mx-auto grid max-w-6xl items-stretch gap-0 lg:grid-cols-2">
          <img
            src={copy.work.engagementImage}
            alt={copy.work.engagementImageAlt}
            className="h-72 w-full object-cover lg:h-full"
          />
          <div className="flex flex-col justify-center px-4 py-14 sm:px-10">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">Engagement</p>
            <h2 className="mt-3 font-display text-3xl text-fg">{copy.work.engagementTitle}</h2>
            <div className="mt-8 space-y-6">
              {copy.engagements.map((e) => (
                <div key={e.id} className="border-t border-border pt-4">
                  <h3 className="font-display text-xl text-fg">{e.label}</h3>
                  <p className="mt-1 text-sm text-muted">{e.bestFor}</p>
                  <p className="mt-2 text-sm leading-relaxed text-subtle">{e.examples}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">Inside the studio</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl text-fg">The operating sequence we do not skip.</h2>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {JOURNEY.map((step) => (
              <li key={step.id} className="bg-surface p-5">
                <p className="font-mono text-xs tabular-nums text-subtle">{String(step.step).padStart(2, "0")}</p>
                <h3 className="mt-3 font-display text-xl text-fg">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.action}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.14em] text-subtle">Output · {step.output}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">Boundaries</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl text-fg">{copy.work.boundariesTitle}</h2>
          <ul className="mt-10 max-w-3xl space-y-4">
            {copy.boundaries.map((line) => (
              <li key={line} className="border-t border-border pt-4 text-sm leading-relaxed text-muted">
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CloseCta />
    </main>
  );
}
