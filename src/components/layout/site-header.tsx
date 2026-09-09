import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { AuthSlot } from "@/components/auth-slot";
import { VirellionMark } from "@/components/mark";
import { Button } from "@/components/ui/button";
import { useSiteCopy } from "@/components/site-copy-provider";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const copy = useSiteCopy();
  const nav = [
    { to: "/services", label: copy.nav.services, match: "/services" },
    { to: "/offers", label: copy.nav.offers, match: "/offers" },
    { to: "/packages", label: copy.nav.packages },
    { to: "/work", label: copy.nav.work },
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-md" data-print-hide>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex shrink-0 items-center gap-2 text-fg" onClick={() => setOpen(false)}>
          <VirellionMark className="size-6 shrink-0" />
          <span className="font-display text-[13px] tracking-[0.1em] sm:text-base sm:tracking-[0.16em]">
            {SITE.wordmark}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => {
            const active = "match" in item && item.match ? pathname.startsWith(item.match) : pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "text-sm transition-colors",
                  active ? "text-fg" : "text-muted hover:text-fg",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <AuthSlot />
          <Button size="sm" asChild>
            <Link to="/start">{copy.nav.startCta}</Link>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-md text-fg md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-border bg-bg px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex h-11 items-center text-sm text-fg"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/receptionist" className="flex h-11 items-center text-sm text-fg" onClick={() => setOpen(false)}>
              {copy.nav.receptionCta}
            </Link>
            <Link to="/start" className="flex h-11 items-center text-sm text-fg" onClick={() => setOpen(false)}>
              {copy.nav.startCta}
            </Link>
            <div className="mt-2">
              <AuthSlot onNavigate={() => setOpen(false)} />
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
