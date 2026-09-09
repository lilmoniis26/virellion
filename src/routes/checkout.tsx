import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useLiveCatalog } from "@/components/catalog-provider";
import { ConsentFields, EngagementNotice } from "@/components/consent-fields";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { placeOrder } from "@/lib/client-data";
import { purchasableFromLive } from "@/lib/catalog-live";
import { parseItemParam } from "@/lib/commerce";
import { pageHead } from "@/lib/seo";
import { formatMoney } from "@/lib/utils";

type Search = { item?: string };

export const Route = createFileRoute("/checkout")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    item: typeof s.item === "string" ? s.item : undefined,
  }),
  head: () => pageHead("Checkout", "Order a Virellion launch package or flagship offer."),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { item: raw } = Route.useSearch();
  const parsed = parseItemParam(raw);
  const catalog = useLiveCatalog();
  const item = parsed ? purchasableFromLive(catalog, parsed.kind, parsed.id) : null;
  const { user, isPending } = useCurrentUserState();
  const [billingName, setBillingName] = useState("");
  const [billingEmail, setBillingEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [terms, setTerms] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const prefill = useMemo(() => {
    return { name: user?.displayName ?? "", email: user?.primaryEmail ?? "" };
  }, [user?.displayName, user?.primaryEmail]);

  if (isPending) return <main className="min-h-[60dvh]" />;
  if (!user) {
    const redirect = `/checkout${raw ? `?item=${encodeURIComponent(raw)}` : ""}`;
    return <Navigate to="/login" search={{ redirect }} />;
  }
  if (!item) {
    return (
      <main className="mx-auto max-w-xl px-4 py-20">
        <h1 className="font-display text-3xl text-fg">Nothing to order</h1>
        <p className="mt-3 text-sm text-muted">Choose a launch package or flagship offer first.</p>
        <Button className="mt-6" asChild>
          <Link to="/packages">View packages</Link>
        </Button>
      </main>
    );
  }
  if (!item.instant) {
    return <Navigate to="/start" />;
  }
  if (orderId) {
    return <Navigate to="/account/orders/$id" params={{ id: orderId }} />;
  }

  const name = billingName || prefill.name;
  const email = billingEmail || prefill.email;

  const submit = async () => {
    setError("");
    if (!name.trim() || !email.trim()) {
      setError("Billing name and email are required.");
      return;
    }
    if (!terms) {
      setError("Please agree to the Terms of Engagement and Privacy Notice.");
      return;
    }
    setBusy(true);
    try {
      const result = await placeOrder({
        data: {
          kind: item.kind,
          id: item.id,
          billingName: name.trim(),
          billingEmail: email.trim(),
          notes,
          termsAccepted: true as const,
          marketingOptIn: marketing,
        },
      });
      setOrderId(result.id);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not place the order.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main>
      <PageHero
        src={item.image}
        alt={item.imageAlt}
        kicker="Checkout"
        title={item.title}
        dek={`${formatMoney(item.amount)}${item.priceSuffix} · ${item.timeline}`}
        compact
      />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-sm leading-relaxed text-muted">{item.summary}</p>
          <p className="mt-6 text-sm leading-relaxed text-subtle">
            Placing the order reserves the package at the published starting price. Next you pay with PayPal, request an
            invoice, or ask for a secure card link. Virellion never stores card numbers. Custom or regulated work is scoped
            after intake — not sold as a click-to-buy.
          </p>
          <EngagementNotice className="mt-8" />
        </div>
        <form
          className="rounded-xl border border-border bg-surface p-6"
          onSubmit={(e) => {
            e.preventDefault();
            void submit();
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="billing-name">Billing name</Label>
            <Input
              id="billing-name"
              value={billingName}
              placeholder={prefill.name}
              onChange={(e) => setBillingName(e.target.value)}
              autoComplete="name"
            />
          </div>
          <div className="mt-5 space-y-2">
            <Label htmlFor="billing-email">Billing email</Label>
            <Input
              id="billing-email"
              type="email"
              value={billingEmail}
              placeholder={prefill.email}
              onChange={(e) => setBillingEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="mt-5 space-y-2">
            <Label htmlFor="notes">Notes for the studio</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Assets, deadline, marketplace, manuscript status…"
            />
          </div>
          <div className="mt-6">
            <ConsentFields
              idPrefix="checkout"
              terms={terms}
              onTerms={setTerms}
              marketing={marketing}
              onMarketing={setMarketing}
            />
          </div>
          {error ? <p className="mt-4 text-sm text-danger">{error}</p> : null}
          <p className="mt-6 text-xs text-subtle">
            Signed in as {user.primaryEmail ?? user.displayName}.{" "}
            <Link to="/account" className="text-fg underline underline-offset-4">
              Account
            </Link>
          </p>
          <Button type="submit" className="mt-4 w-full" disabled={busy || !terms}>
            {busy ? "Placing order…" : `Place order · ${formatMoney(item.amount)}${item.priceSuffix}`}
          </Button>
        </form>
      </section>
    </main>
  );
}
