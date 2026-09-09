import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useStudioProfile } from "@/components/auth-slot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isOperator } from "@/lib/access";
import { getStudioSettings, saveStudioSettings, type StudioSettings } from "@/lib/client-data";
import { buildPaypalUrl, normalizePaypalMe } from "@/lib/paypal";

export const Route = createFileRoute("/hq/payments")({
  component: PaymentsPage,
});

function PaymentsPage() {
  const { profile } = useStudioProfile();
  const [form, setForm] = useState<StudioSettings>({
    paypalMe: "",
    paypalEmail: "",
    paypalLink: "",
    notifyEmail: "",
  });
  const [error, setError] = useState("");
  const [saved, setSaved] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!isOperator(profile?.role)) return;
    getStudioSettings()
      .then(setForm)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : "Could not load payment settings."));
  }, [profile?.role]);

  if (profile && !isOperator(profile.role)) {
    return (
      <main className="px-4 py-8 sm:px-6">
        <h1 className="font-display text-3xl text-fg">PayPal</h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
          Payout details stay with the studio operator. Partners cannot change banking information, confirm receipts, or
          reset passwords from this desk.
        </p>
      </main>
    );
  }

  const preview = buildPaypalUrl(form, {
    id: "ord_preview",
    title: "Preview package",
    amount: 490,
  });

  const submit = async () => {
    setBusy(true);
    setError("");
    setSaved("");
    try {
      const next = await saveStudioSettings({
        data: {
          paypalMe: normalizePaypalMe(form.paypalMe) || form.paypalMe.trim(),
          paypalEmail: form.paypalEmail.trim(),
          paypalLink: form.paypalLink.trim(),
          notifyEmail: form.notifyEmail.trim(),
        },
      });
      setForm(next);
      setSaved("Payment settings saved. Client PayPal buttons will use this checkout.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="px-4 py-8 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">Payments</p>
      <h1 className="mt-2 font-display text-3xl text-fg">Connect PayPal</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        Clients already pay into the PayPal account you use for POS. Add your PayPal.me name, business email, or an
        existing PayPal checkout link. Virellion never stores card numbers. You confirm funds in PayPal, then mark the
        order paid so the client receives a receipt.
      </p>

      <form
        className="mt-8 max-w-xl space-y-6 rounded-xl border border-border bg-surface p-6"
        onSubmit={(e) => {
          e.preventDefault();
          void submit();
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="paypal-me">PayPal.me name</Label>
          <Input
            id="paypal-me"
            value={form.paypalMe}
            onChange={(e) => setForm((f) => ({ ...f, paypalMe: e.target.value }))}
            placeholder="yourname"
            autoComplete="off"
          />
          <p className="text-xs text-subtle">Example: virellion — opens paypal.me/virellion with the order amount.</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="paypal-email">PayPal business email</Label>
          <Input
            id="paypal-email"
            type="email"
            value={form.paypalEmail}
            onChange={(e) => setForm((f) => ({ ...f, paypalEmail: e.target.value }))}
            placeholder="payments@studio.com"
            autoComplete="off"
          />
          <p className="text-xs text-subtle">Used if you do not use PayPal.me. The order number is sent as the invoice ID.</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="paypal-link">Or a PayPal checkout link</Label>
          <Input
            id="paypal-link"
            value={form.paypalLink}
            onChange={(e) => setForm((f) => ({ ...f, paypalLink: e.target.value }))}
            placeholder="https://www.paypal.com/…"
            autoComplete="off"
          />
          <p className="text-xs text-subtle">Paste a link from your PayPal POS or business tools if you prefer a fixed checkout page.</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="notify-email">Studio notify email</Label>
          <Input
            id="notify-email"
            type="email"
            value={form.notifyEmail}
            onChange={(e) => setForm((f) => ({ ...f, notifyEmail: e.target.value }))}
            placeholder="you@studio.com"
            autoComplete="off"
          />
          <p className="text-xs text-subtle">
            Kept on file so you know which inbox to watch. Live alerts appear in Desk → Client work. This site does not
            send email itself.
          </p>
        </div>
        {error ? <p className="text-sm text-danger">{error}</p> : null}
        {saved ? <p className="text-sm text-ok">{saved}</p> : null}
        <Button type="submit" disabled={busy}>
          {busy ? "Saving…" : "Save PayPal"}
        </Button>
      </form>

      <div className="mt-10 max-w-xl rounded-xl border border-border bg-raised/40 p-5">
        <p className="text-xs uppercase tracking-[0.14em] text-subtle">Preview</p>
        {preview ? (
          <p className="mt-3 break-all text-sm text-muted">{preview}</p>
        ) : (
          <p className="mt-3 text-sm text-muted">Add a PayPal.me name, business email, or checkout link to activate the button.</p>
        )}
      </div>
    </main>
  );
}
