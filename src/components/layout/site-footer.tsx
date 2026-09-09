import { Link } from "@tanstack/react-router";
import { useLiveCatalog } from "@/components/catalog-provider";
import { useSiteCopy } from "@/components/site-copy-provider";
import { VirellionMark } from "@/components/mark";
import { SERVICE_GROUPS } from "@/lib/catalog";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  const { offers, departments } = useLiveCatalog();
  const copy = useSiteCopy();
  const deptMap = Object.fromEntries(departments.map((d) => [d.id, d]));
  const studioIds = SERVICE_GROUPS.flatMap((g) => g.ids).filter((id) => deptMap[id]).slice(0, 8);

  return (
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 text-fg">
            <VirellionMark className="size-5" />
            <span className="font-display tracking-[0.14em]">{SITE.wordmark}</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{copy.footer.blurb}</p>
          <p className="mt-3 font-mono text-xs tracking-wide text-subtle">{copy.contact.addressLine || SITE.host}</p>
          {copy.contact.email ? <p className="mt-1 text-sm text-muted">{copy.contact.email}</p> : null}
          {copy.contact.phone ? <p className="mt-1 text-sm text-muted">{copy.contact.phone}</p> : null}
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-subtle">Offers</p>
          <ul className="mt-4 space-y-2">
            {offers.map((o) => (
              <li key={o.slug}>
                <Link to="/offers/$slug" params={{ slug: o.slug }} className="text-sm text-muted hover:text-fg">
                  {o.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/packages" className="text-sm text-muted hover:text-fg">
                Launch packages
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-subtle">Studio</p>
          <ul className="mt-4 space-y-2">
            {studioIds.map((id) => (
                <li key={id}>
                  <Link to="/departments/$id" params={{ id }} className="text-sm text-muted hover:text-fg">
                    {deptMap[id].short}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-subtle">Visit</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/services" className="text-muted hover:text-fg">
                All services
              </Link>
            </li>
            <li>
              <Link to="/work" className="text-muted hover:text-fg">
                Approach
              </Link>
            </li>
            <li>
              <Link to="/start" className="text-muted hover:text-fg">
                Start a project
              </Link>
            </li>
            <li>
              <Link to="/receptionist" className="text-muted hover:text-fg">
                Reception
              </Link>
            </li>
            <li>
              <Link to="/login" search={{ redirect: "/account" }} className="text-muted hover:text-fg">
                Sign in
              </Link>
            </li>
            <li>
              <Link to="/account" className="text-muted hover:text-fg">
                Client account
              </Link>
            </li>
            <li>
              <Link to="/hq" className="text-muted hover:text-fg">
                Studio desk
              </Link>
            </li>
            <li>
              <Link to="/terms" className="text-muted hover:text-fg">
                Terms of Engagement
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="text-muted hover:text-fg">
                Privacy Notice
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-6 text-xs leading-relaxed text-subtle sm:px-6">
          {copy.footer.legalLine}
        </p>
      </div>
    </footer>
  );
}
