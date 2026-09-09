import { createFileRoute, Link, Navigate, Outlet } from "@tanstack/react-router";
import { useStudioProfile } from "@/components/auth-slot";
import { HqNav } from "@/components/layout/hq-nav";
import { isStaff } from "@/lib/access";
import { RedirectToSignIn } from "@/lib/auth/gates";

export const Route = createFileRoute("/hq")({
  component: HqLayout,
});

function HqLayout() {
  const { user, isPending, profile } = useStudioProfile();

  if (isPending) {
    return <main className="min-h-[60dvh]" />;
  }
  if (!user) return <RedirectToSignIn />;
  if (!isStaff(profile?.role)) return <Navigate to="/account" />;

  return (
    <div className="mx-auto flex max-w-7xl gap-0 px-0 sm:px-6 lg:px-8">
      <aside className="sticky top-16 hidden h-[calc(100dvh-4rem)] w-56 shrink-0 border-r border-border py-8 pr-4 md:block">
        <p className="px-3 text-xs font-medium uppercase tracking-[0.16em] text-subtle">
          {profile?.role === "partner" ? "Partner desk" : "Operations"}
        </p>
        <div className="mt-4">
          <HqNav role={profile?.role} />
        </div>
        <p className="mt-8 px-3 text-xs leading-relaxed text-subtle">
          {profile?.role === "partner"
            ? "You can edit the public site and help with client work. PayPal, receipts, and partner invites stay with the operator."
            : "Internal workspace. Client-facing pages remain on the public site."}
        </p>
      </aside>
      <div className="min-w-0 flex-1">
        <div className="border-b border-border px-4 py-3 md:hidden">
          <div className="flex gap-2 overflow-x-auto">
            <Link to="/hq" className="h-9 shrink-0 rounded-full border border-border px-3 text-xs leading-9 text-muted">
              Overview
            </Link>
            <Link
              to="/hq/inbox"
              className="h-9 shrink-0 rounded-full border border-border px-3 text-xs leading-9 text-muted"
            >
              Client work
            </Link>
            <Link
              to="/hq/pages"
              className="h-9 shrink-0 rounded-full border border-border px-3 text-xs leading-9 text-muted"
            >
              Pages
            </Link>
            <Link
              to="/hq/catalog"
              className="h-9 shrink-0 rounded-full border border-border px-3 text-xs leading-9 text-muted"
            >
              Catalog
            </Link>
            {profile?.role === "operator" ? (
              <>
                <Link
                  to="/hq/payments"
                  className="h-9 shrink-0 rounded-full border border-border px-3 text-xs leading-9 text-muted"
                >
                  PayPal
                </Link>
                <Link
                  to="/hq/legal"
                  className="h-9 shrink-0 rounded-full border border-border px-3 text-xs leading-9 text-muted"
                >
                  Terms
                </Link>
                <Link
                  to="/hq/team"
                  className="h-9 shrink-0 rounded-full border border-border px-3 text-xs leading-9 text-muted"
                >
                  Partners
                </Link>
              </>
            ) : null}
            <Link
              to="/hq/clients"
              className="h-9 shrink-0 rounded-full border border-border px-3 text-xs leading-9 text-muted"
            >
              Clients
            </Link>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
