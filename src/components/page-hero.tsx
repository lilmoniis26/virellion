import { cn } from "@/lib/utils";

export function PageHero({
  src,
  alt,
  kicker,
  title,
  dek,
  compact = false,
}: {
  src: string;
  alt: string;
  kicker: string;
  title: string;
  dek?: string;
  compact?: boolean;
}) {
  return (
    <section className={cn("relative isolate overflow-hidden", compact ? "min-h-[48dvh]" : "min-h-[70dvh]")}>
      <img src={src} alt={alt} className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/25" />
      <div
        className={cn(
          "relative mx-auto flex max-w-6xl flex-col justify-end px-4 sm:px-6",
          compact ? "min-h-[48dvh] pb-12 pt-24" : "min-h-[70dvh] pb-16 pt-28 sm:pb-20",
        )}
      >
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">{kicker}</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight text-fg sm:text-6xl">
          {title}
        </h1>
        {dek ? <p className="mt-5 max-w-xl text-base leading-relaxed text-accent sm:text-lg">{dek}</p> : null}
      </div>
    </section>
  );
}
