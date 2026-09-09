import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useSiteCopy } from "@/components/site-copy-provider";
import { Button } from "@/components/ui/button";

export function CloseCta({
  title,
  body,
}: {
  title?: string;
  body?: string;
}) {
  const copy = useSiteCopy();
  return (
    <section className="border-t border-border bg-paper text-ink">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-16 sm:px-6 sm:py-20 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">Begin</p>
          <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">{title ?? copy.cta.title}</h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">{body ?? copy.cta.body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button variant="ink" size="lg" asChild>
            <Link to="/start">
              {copy.cta.startLabel} <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="border-line text-ink hover:bg-accent" asChild>
            <Link to="/receptionist">{copy.cta.receptionLabel}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
