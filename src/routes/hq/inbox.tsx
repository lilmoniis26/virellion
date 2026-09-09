import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useStudioProfile } from "@/components/auth-slot";
import { Button } from "@/components/ui/button";
import { isOperator } from "@/lib/access";
import {
  listStudioInbox,
  markStudioNotificationsRead,
  updateStudioOrder,
  type ClientInquiryRow,
  type OrderRow,
  type StudioNotification,
} from "@/lib/client-data";
import { INQUIRY_STATUS_LABEL, ORDER_STATUS_LABEL } from "@/lib/commerce";
import { PAYMENT_METHOD_LABEL } from "@/lib/paypal";
import { formatDate, formatDateTime, formatMoney } from "@/lib/utils";

export const Route = createFileRoute("/hq/inbox")({
  component: InboxPage,
});

function InboxPage() {
  const { profile } = useStudioProfile();
  const operator = isOperator(profile?.role);
  const [inquiries, setInquiries] = useState<ClientInquiryRow[]>([]);
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [notifications, setNotifications] = useState<StudioNotification[]>([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState<string | null>(null);

  const load = () => {
    listStudioInbox()
      .then((data) => {
        setInquiries(data.inquiries);
        setOrders(data.orders);
        setNotifications(data.notifications);
      })
      .catch((e: unknown) => {
        setError(e instanceof Error ? e.message : "Could not load the inbox.");
      });
  };

  useEffect(() => {
    load();
    const id = window.setInterval(load, 20000);
    return () => window.clearInterval(id);
  }, []);

  const unread = notifications.filter((n) => !n.readAt).length;

  const setStatus = async (orderId: string, status: "paid" | "in_progress" | "complete" | "cancelled") => {
    setBusy(orderId);
    try {
      await updateStudioOrder({ data: { orderId, status } });
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not update the order.");
    } finally {
      setBusy(null);
    }
  };

  const markRead = async () => {
    try {
      await markStudioNotificationsRead();
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not update notifications.");
    }
  };

  return (
    <main className="px-4 py-8 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">Client work</p>
      <h1 className="mt-2 font-display text-3xl text-fg">Inbox</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted">
        Orders, inquiries, and payment alerts. Confirm funds in PayPal (or your invoice), then mark paid — that issues
        the client receipt. Local demo records stay under Workspace.
      </p>
      {error ? <p className="mt-4 text-sm text-danger">{error}</p> : null}

      <section className="mt-10 rounded-xl border border-border bg-surface p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-xl text-fg">Notifications {unread ? `(${unread} new)` : ""}</h2>
          {unread ? (
            <Button size="sm" variant="outline" onClick={() => void markRead()}>
              Mark read
            </Button>
          ) : null}
        </div>
        {notifications.length === 0 ? (
          <p className="mt-4 text-sm text-muted">No alerts yet. New orders and PayPal submissions appear here.</p>
        ) : (
          <ul className="mt-4 divide-y divide-border">
            {notifications.slice(0, 8).map((n) => (
              <li key={n.id} className="py-3">
                <p className={n.readAt ? "text-sm text-muted" : "text-sm text-fg"}>{n.title}</p>
                <p className="mt-1 text-sm text-subtle">{n.body}</p>
                <p className="mt-1 text-xs text-subtle">{formatDateTime(n.createdAt)}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl text-fg">Orders</h2>
        {orders.length === 0 ? (
          <p className="mt-4 text-sm text-muted">No client orders yet.</p>
        ) : (
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {orders.map((o) => (
              <li key={o.id} className="py-5">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="font-display text-lg text-fg">{o.title}</p>
                    <p className="mt-1 text-sm text-muted">
                      {o.billingName} · {o.billingEmail} · {formatDate(o.createdAt)}
                    </p>
                    <p className="mt-1 text-sm text-subtle">
                      {ORDER_STATUS_LABEL[o.status]}
                      {o.paymentMethod ? ` · ${PAYMENT_METHOD_LABEL[o.paymentMethod] ?? o.paymentMethod}` : ""}
                      {o.receiptNumber ? ` · ${o.receiptNumber}` : ""}
                    </p>
                    {o.notes ? <p className="mt-2 text-sm text-muted">{o.notes}</p> : null}
                    <p className="mt-1 font-mono text-xs text-subtle">{o.id}</p>
                  </div>
                  <div className="flex flex-col items-start gap-2 lg:items-end">
                    <p className="font-mono text-sm tabular-nums text-fg">
                      {formatMoney(o.amount)}
                      {o.priceSuffix}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {operator && (o.status === "payment_submitted" || o.status === "pending_payment") ? (
                        <Button size="sm" disabled={busy === o.id} onClick={() => void setStatus(o.id, "paid")}>
                          Mark paid · issue receipt
                        </Button>
                      ) : null}
                      {o.status === "paid" ? (
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={busy === o.id}
                          onClick={() => void setStatus(o.id, "in_progress")}
                        >
                          Start production
                        </Button>
                      ) : null}
                      {o.status === "in_progress" ? (
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={busy === o.id}
                          onClick={() => void setStatus(o.id, "complete")}
                        >
                          Complete
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl text-fg">Inquiries</h2>
        {inquiries.length === 0 ? (
          <p className="mt-4 text-sm text-muted">No client inquiries yet.</p>
        ) : (
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {inquiries.map((i) => (
              <li key={i.id} className="grid gap-2 py-5 sm:grid-cols-12">
                <div className="sm:col-span-7">
                  <p className="text-sm text-fg">{i.name}</p>
                  <p className="mt-1 text-sm text-muted">{i.desiredOutcome}</p>
                  <p className="mt-1 text-xs text-subtle">{i.routingSummary}</p>
                </div>
                <p className="text-sm text-muted sm:col-span-3">{INQUIRY_STATUS_LABEL[i.status] ?? i.status}</p>
                <p className="text-sm text-subtle sm:col-span-2 sm:text-right">{formatDate(i.createdAt)}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {operator ? (
        <p className="mt-10 text-sm text-subtle">
          Set PayPal in{" "}
          <Link to="/hq/payments" className="text-fg underline underline-offset-4">
            Payments
          </Link>
          . Client roster is under{" "}
          <Link to="/hq/clients" className="text-fg underline underline-offset-4">
            Clients
          </Link>
          .
        </p>
      ) : (
        <p className="mt-10 text-sm text-subtle">
          Receipts and PayPal stay with the studio operator. You can move production status after an order is paid.
        </p>
      )}
    </main>
  );
}
