import { VirellionMark } from "@/components/mark";
import type { OrderRow } from "@/lib/client-data";
import { PAYMENT_METHOD_LABEL } from "@/lib/paypal";
import { SITE } from "@/lib/site";
import { formatDate, formatMoney } from "@/lib/utils";

export function ReceiptSheet({ order }: { order: OrderRow }) {
  const method = PAYMENT_METHOD_LABEL[order.paymentMethod] ?? order.paymentMethod ?? "Confirmed";
  return (
    <article
      id="receipt-sheet"
      className="receipt-print rounded-xl border border-border bg-paper px-6 py-8 text-ink sm:px-10"
    >
      <header className="flex items-start justify-between gap-4 border-b border-line pb-6 text-ink">
        <div className="flex items-center gap-2">
          <VirellionMark className="size-7 text-ink" />
          <div>
            <p className="font-display text-xl tracking-[0.18em] text-ink">{SITE.wordmark}</p>
            <p className="mt-0.5 font-mono text-[11px] tracking-wide text-ink-soft">{SITE.host}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-[0.14em] text-ink-soft">Receipt</p>
          <p className="mt-1 font-mono text-sm text-ink">{order.receiptNumber ?? "Pending"}</p>
        </div>
      </header>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-ink-soft">Billed to</p>
          <p className="mt-2 text-sm text-ink">{order.billingName}</p>
          <p className="text-sm text-ink-soft">{order.billingEmail}</p>
        </div>
        <div className="sm:text-right">
          <p className="text-xs uppercase tracking-[0.14em] text-ink-soft">Paid</p>
          <p className="mt-2 text-sm text-ink">{order.paidAt ? formatDate(order.paidAt) : "Awaiting confirmation"}</p>
          <p className="text-sm text-ink-soft">Order {order.id}</p>
        </div>
      </div>

      <table className="mt-8 w-full text-left text-sm">
        <thead>
          <tr className="border-b border-line text-xs uppercase tracking-[0.14em] text-ink-soft">
            <th className="py-2 font-medium">Description</th>
            <th className="py-2 text-right font-medium">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-line">
            <td className="py-4">
              <p className="text-ink">{order.title}</p>
              <p className="mt-1 text-ink-soft">{order.summary}</p>
            </td>
            <td className="py-4 text-right font-mono tabular-nums text-ink">
              {formatMoney(order.amount)}
              {order.priceSuffix}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="mt-6 flex items-end justify-between gap-4">
        <p className="max-w-sm text-xs leading-relaxed text-ink-soft">
          Method: {method}. Studio receipt for professional services. Not legal, tax, or licensed advice. Terms version{" "}
          {order.termsVersion || "—"}.
        </p>
        <p className="font-display text-2xl text-ink">
          {formatMoney(order.amount)}
          {order.priceSuffix}
        </p>
      </div>
    </article>
  );
}
