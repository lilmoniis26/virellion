import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHero } from "@/components/page-hero";
import { useSiteCopy } from "@/components/site-copy-provider";
import { Button } from "@/components/ui/button";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import {
  getMyProfile,
  listMyNotifications,
  listMyWork,
  updateMyMarketing,
  type ClientInquiryRow,
  type OrderRow,
  type Profile,
  type StudioNotification,
} from "@/lib/client-data";
import { INQUIRY_STATUS_LABEL, ORDER_STATUS_LABEL } from "@/lib/commerce";
import { pageHead } from "@/lib/seo";
import { formatDate, formatMoney } from "@/lib/utils";

export const Route = createFileRoute("/account/")({
  head: () => pageHead("Account", "Your Virellion inquiries, orders, receipts, and marketing preference."),
  component: AccountPage,
});

function AccountPage() {
  const copy = useSiteCopy();
  const { user, isPending } = useCurrentUserState();
  const [inquiries, setInquiries] = useState<ClientInquiryRow[]>([]);
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [notes, setNotes] = useState<StudioNotification[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isPending || !user) return;
    let cancelled = false;
    Promise.all([listMyWork(), listMyNotifications(), getMyProfile()])
      .then(([work, notifications, me]) => {
        if (cancelled) return;
        setInquiries(work.inquiries);
        setOrders(work.orders);
        setNotes(notifications);
        setProfile(me);
        setLoaded(true);
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        const message = e instanceof Error ? e.message : "Could not load the account.";
        if (message === "Unauthorized") setError("signin");
        else setError(message);
        setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, [user?.id, isPending]);

  if (isPending) return <main className="min-h-[60dvh]" />;
  if (!user || error === "signin") return <RedirectToSignIn />;

  const toggleMarketing = async (next: boolean) => {
    setSaving(true);
    try {
      const updated = await updateMyMarketing({ data: { marketingOptIn: next } });
      setProfile(updated);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not update preference.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main>
      <PageHero
        src={copy.account.image}
        alt={copy.account.imageAlt}
        kicker={copy.account.kicker}
        title={user.displayName ? `Hello, ${user.displayName}.` : copy.account.title}
        dek={copy.account.dek}
        compact
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {error && error !== "signin" ? <p className="mb-6 text-sm text-danger">{error}</p> : null}

        {notes.length > 0 ? (
          <div className="mb-12 rounded-xl border border-border bg-surface p-5">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">From the studio</p>
            <ul className="mt-4 space-y-3">
              {notes.slice(0, 5).map((n) => (
                <li key={n.id} className="text-sm">
                  <p className="text-fg">{n.title}</p>
                  <p className="mt-1 text-muted">{n.body}</p>
                  {n.orderId ? (
                    <Link
                      to="/account/orders/$id"
                      params={{ id: n.orderId }}
                      className="mt-1 inline-block text-xs text-fg underline underline-offset-4"
                    >
                      Open order
                    </Link>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">Orders</p>
            <h2 className="mt-2 font-display text-3xl text-fg">Packages and offers</h2>
          </div>
          <Button variant="outline" asChild>
            <Link to="/packages">Order a package</Link>
          </Button>
        </div>

        {!loaded ? (
          <p className="mt-8 text-sm text-muted">Loading…</p>
        ) : orders.length === 0 ? (
          <p className="mt-8 text-sm text-muted">No orders yet. Launch packages can be purchased from the catalog.</p>
        ) : (
          <ul className="mt-8 divide-y divide-border border-y border-border">
            {orders.map((o) => (
              <li key={o.id} className="grid gap-2 py-5 sm:grid-cols-12 sm:items-baseline">
                <p className="font-display text-lg text-fg sm:col-span-5">{o.title}</p>
                <p className="text-sm text-muted sm:col-span-3">
                  {ORDER_STATUS_LABEL[o.status] ?? o.status}
                  {o.receiptNumber ? ` · ${o.receiptNumber}` : ""}
                </p>
                <p className="font-mono text-sm tabular-nums text-fg sm:col-span-2">
                  {formatMoney(o.amount)}
                  {o.priceSuffix}
                </p>
                <p className="sm:col-span-2 sm:text-right">
                  <Link
                    to="/account/orders/$id"
                    params={{ id: o.id }}
                    className="text-sm text-fg underline decoration-border underline-offset-4"
                  >
                    {o.status === "pending_payment"
                      ? "Pay"
                      : o.receiptNumber
                        ? "Receipt"
                        : "View"}
                  </Link>
                </p>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-16">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">Inquiries</p>
          <h2 className="mt-2 font-display text-3xl text-fg">Work you described</h2>
        </div>
        {!loaded ? null : inquiries.length === 0 ? (
          <p className="mt-8 text-sm text-muted">
            No inquiries yet.{" "}
            <Link to="/start" className="text-fg underline underline-offset-4">
              Start a project
            </Link>{" "}
            or talk to reception.
          </p>
        ) : (
          <ul className="mt-8 divide-y divide-border border-y border-border">
            {inquiries.map((i) => (
              <li key={i.id} className="grid gap-2 py-5 sm:grid-cols-12">
                <div className="sm:col-span-7">
                  <p className="text-sm text-fg">{i.desiredOutcome}</p>
                  <p className="mt-1 text-xs text-subtle">{i.routingSummary}</p>
                </div>
                <p className="text-sm text-muted sm:col-span-3">{INQUIRY_STATUS_LABEL[i.status] ?? i.status}</p>
                <p className="text-sm text-subtle sm:col-span-2 sm:text-right">{formatDate(i.createdAt)}</p>
              </li>
            ))}
          </ul>
        )}

        <section className="mt-16 rounded-xl border border-border bg-surface p-6">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">Your information</p>
          <h2 className="mt-2 font-display text-2xl text-fg">Marketing preference</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
            Virellion keeps an operational record of your account so we can serve the work. Marketing contact is separate
            and optional. You can read the{" "}
            <Link to="/privacy" className="text-fg underline underline-offset-4">
              Privacy Notice
            </Link>{" "}
            and{" "}
            <Link to="/terms" className="text-fg underline underline-offset-4">
              Terms of Engagement
            </Link>{" "}
            at any time.
          </p>
          <label className="mt-5 flex min-h-11 cursor-pointer items-start gap-3 text-sm text-muted">
            <input
              type="checkbox"
              className="mt-1 size-4 accent-accent"
              checked={Boolean(profile?.marketingOptIn)}
              disabled={saving || !profile}
              onChange={(e) => void toggleMarketing(e.target.checked)}
            />
            <span>
              Virellion may email me about related studio services. I can turn this off at any time. This is not required
              to receive receipts or project updates.
            </span>
          </label>
        </section>
      </section>
    </main>
  );
}
