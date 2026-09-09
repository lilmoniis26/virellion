import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHero } from "@/components/page-hero";
import { ReceiptSheet } from "@/components/receipt-sheet";
import { Button } from "@/components/ui/button";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getMyOrder, submitPayment, type OrderRow } from "@/lib/client-data";
import { ORDER_STATUS_LABEL, getPurchasable } from "@/lib/commerce";
import { PAYMENT_METHOD_LABEL } from "@/lib/paypal";
import { pageHead } from "@/lib/seo";
import { formatDate, formatMoney } from "@/lib/utils";

export const Route = createFileRoute("/account/orders/$id")({
  head: () => pageHead("Order", "Pay a Virellion package or offer from your account."),
  component: OrderPage,
});

function OrderPage() {
  const { id } = Route.useParams();
  const { user, isPending } = useCurrentUserState();
  const [order, setOrder] = useState<OrderRow | null | undefined>(undefined);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const load = () => {
    getMyOrder({ data: { id } })
      .then(setOrder)
      .catch((e: unknown) => {
        if (e instanceof Error && e.message === "Unauthorized") setOrder(null);
        else setError(e instanceof Error ? e.message : "Could not load the order.");
      });
  };

  useEffect(() => {
    if (isPending || !user) return;
    load();
  }, [id, user?.id, isPending]);

  if (isPending || order === undefined) return <main className="min-h-[60dvh]" />;
  if (!user) return <RedirectToSignIn />;
  if (order === null) throw notFound();

  const item = getPurchasable(order.kind, order.catalogId);
  const canPay = order.status === "pending_payment" || order.status === "payment_submitted";
  const isPaid =
    order.status === "paid" || order.status === "in_progress" || order.status === "complete";

  const pay = async (method: "paypal" | "card_link" | "invoice") => {
    setBusy(true);
    setError("");
    try {
      const result = await submitPayment({ data: { orderId: order.id, method } });
      if (method === "paypal" && !result.paypalUrl && !order.paypalUrl) {
        setError("PayPal is not connected yet. Request an invoice, or the studio will send a link.");
      }
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not submit payment.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main>
      <PageHero
        src={item?.image ?? "/media/commerce.jpg"}
        alt={item?.imageAlt ?? "Order"}
        kicker="Order"
        title={order.title}
        dek={`${formatMoney(order.amount)}${order.priceSuffix} · ${ORDER_STATUS_LABEL[order.status] ?? order.status}`}
        compact
      />
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <p className="text-sm leading-relaxed text-muted">{order.summary}</p>
        <dl className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-surface p-5">
            <dt className="text-xs uppercase tracking-[0.14em] text-subtle">Amount due</dt>
            <dd className="mt-2 font-display text-2xl text-fg">
              {formatMoney(order.amount)}
              {order.priceSuffix}
            </dd>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <dt className="text-xs uppercase tracking-[0.14em] text-subtle">Placed</dt>
            <dd className="mt-2 font-display text-2xl text-fg">{formatDate(order.createdAt)}</dd>
          </div>
        </dl>

        <div className="mt-8 text-sm text-muted">
          <p>
            Billed to {order.billingName} · {order.billingEmail}
          </p>
          {order.notes ? <p className="mt-2">{order.notes}</p> : null}
          <p className="mt-2 font-mono text-xs text-subtle">Order {order.id}</p>
        </div>

        {canPay ? (
          <section className="mt-12 rounded-xl border border-border bg-surface p-6">
            <h2 className="font-display text-2xl text-fg">Pay this order</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              PayPal opens the studio’s existing PayPal checkout with this amount. Include the order number in the
              PayPal note. Virellion never collects card numbers or PayPal passwords here. Production starts after the
              studio confirms funds, unless a deposit plan is agreed in writing.
            </p>
            {error ? <p className="mt-4 text-sm text-danger">{error}</p> : null}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {order.paypalUrl ? (
                <Button asChild>
                  <a
                    href={order.paypalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => void pay("paypal")}
                  >
                    Pay with PayPal
                  </a>
                </Button>
              ) : (
                <Button disabled title="The studio is connecting PayPal">
                  Pay with PayPal
                </Button>
              )}
              <Button variant="outline" disabled={busy} onClick={() => void pay("invoice")}>
                Request an invoice
              </Button>
              <Button variant="ghost" disabled={busy} onClick={() => void pay("card_link")}>
                Pay by card link
              </Button>
            </div>
            {!order.paypalUrl ? (
              <p className="mt-3 text-sm text-subtle">
                PayPal checkout is being connected by the studio. You can request an invoice now.
              </p>
            ) : null}
            {order.status === "payment_submitted" ? (
              <p className="mt-4 text-sm text-muted">
                {order.paymentMethod === "paypal"
                  ? "If PayPal did not open, use Pay with PayPal again. The studio is notified and will confirm funds."
                  : `Request received via ${PAYMENT_METHOD_LABEL[order.paymentMethod] ?? order.paymentMethod}. Waiting for the studio to confirm funds.`}
              </p>
            ) : null}
          </section>
        ) : (
          <section className="mt-12 rounded-xl border border-border bg-surface p-6">
            <h2 className="font-display text-2xl text-fg">{ORDER_STATUS_LABEL[order.status]}</h2>
            <p className="mt-3 text-sm text-muted">
              {order.paymentMethod
                ? `Recorded as ${PAYMENT_METHOD_LABEL[order.paymentMethod] ?? order.paymentMethod}.`
                : "The studio will update this record as the work moves."}{" "}
              {order.receiptNumber ? `Receipt ${order.receiptNumber}.` : ""}
            </p>
          </section>
        )}

        {isPaid && order.receiptNumber ? (
          <section className="mt-12">
            <div className="mb-4 flex items-end justify-between gap-3">
              <h2 className="font-display text-2xl text-fg">Receipt</h2>
              <Button variant="outline" size="sm" className="print:hidden" onClick={() => window.print()}>
                Print receipt
              </Button>
            </div>
            <ReceiptSheet order={order} />
          </section>
        ) : null}

        <p className="mt-10 print:hidden">
          <Link to="/account" className="text-sm text-fg underline decoration-border underline-offset-4">
            Back to account
          </Link>
        </p>
      </section>
    </main>
  );
}
