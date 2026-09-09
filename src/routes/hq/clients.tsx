import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useStudioProfile } from "@/components/auth-slot";
import { Button } from "@/components/ui/button";
import { isOperator } from "@/lib/access";
import { listStudioClients, type ClientRosterRow } from "@/lib/client-data";
import { formatDate } from "@/lib/utils";

export const Route = createFileRoute("/hq/clients")({
  component: ClientsPage,
});

function ClientsPage() {
  const { profile } = useStudioProfile();
  const operator = isOperator(profile?.role);
  const [rows, setRows] = useState<ClientRosterRow[]>([]);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<"all" | "marketing">("all");
  const [copied, setCopied] = useState("");

  useEffect(() => {
    listStudioClients()
      .then(setRows)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : "Could not load clients."));
  }, []);

  const visible = useMemo(
    () => (filter === "marketing" ? rows.filter((r) => r.marketingOptIn) : rows),
    [rows, filter],
  );

  const exportCsv = (marketingOnly: boolean) => {
    const source = marketingOnly ? rows.filter((r) => r.marketingOptIn) : rows;
    const header = ["Name", "Email", "Phone", "Marketing opt-in", "Opt-in date", "Last order", "Account created"];
    const lines = source.map((r) =>
      [
        csv(r.name),
        csv(r.email),
        csv(r.phone),
        r.marketingOptIn ? "yes" : "no",
        r.marketingOptInAt ? formatDate(r.marketingOptInAt) : "",
        csv(r.lastOrderTitle ?? ""),
        formatDate(r.createdAt),
      ].join(","),
    );
    const blob = new Blob([[header.join(","), ...lines].join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = marketingOnly ? "virellion-marketing-list.csv" : "virellion-clients.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyEmails = async () => {
    const emails = visible
      .map((r) => r.email)
      .filter(Boolean)
      .join(", ");
    try {
      await navigator.clipboard.writeText(emails);
      setCopied(emails ? "Emails copied." : "No emails on this list.");
    } catch {
      setCopied("Could not copy. Select the emails in the table instead.");
    }
  };

  return (
    <main className="px-4 py-8 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">Clients</p>
      <h1 className="mt-2 font-display text-3xl text-fg">Account list</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        Every signed-in client. Use the full list for operations. Use the marketing list only for people who opted in
        — that is the permission they gave you. Opting in is not implied by placing an order.
      </p>
      {error ? <p className="mt-4 text-sm text-danger">{error}</p> : null}

      <div className="mt-8 flex flex-wrap items-center gap-2">
        <Button size="sm" variant={filter === "all" ? "primary" : "outline"} onClick={() => setFilter("all")}>
          All clients ({rows.length})
        </Button>
        <Button
          size="sm"
          variant={filter === "marketing" ? "primary" : "outline"}
          onClick={() => setFilter("marketing")}
        >
          Marketing list ({rows.filter((r) => r.marketingOptIn).length})
        </Button>
        {operator ? (
          <>
            <Button size="sm" variant="ghost" onClick={() => void copyEmails()}>
              Copy emails
            </Button>
            <Button size="sm" variant="ghost" onClick={() => exportCsv(filter === "marketing")}>
              Download CSV
            </Button>
          </>
        ) : (
          <p className="text-xs text-subtle">Export stays with the operator.</p>
        )}
      </div>
      {copied ? <p className="mt-3 text-sm text-ok">{copied}</p> : null}

      {visible.length === 0 ? (
        <p className="mt-10 text-sm text-muted">
          {filter === "marketing"
            ? "No one has opted in to marketing yet. Checkout and intake both offer the optional box."
            : "No client accounts yet. The first account on this site is the studio operator."}
        </p>
      ) : (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-[0.14em] text-subtle">
                <th className="py-3 font-medium">Client</th>
                <th className="py-3 font-medium">Contact</th>
                <th className="py-3 font-medium">Marketing</th>
                <th className="py-3 font-medium">Activity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {visible.map((r) => (
                <tr key={r.userId}>
                  <td className="py-4 align-top">
                    <p className="text-fg">{r.name || "Unnamed"}</p>
                    <p className="mt-1 text-xs text-subtle">Since {formatDate(r.createdAt)}</p>
                  </td>
                  <td className="py-4 align-top text-muted">
                    <p>{r.email}</p>
                    {r.phone ? <p className="mt-1">{r.phone}</p> : null}
                  </td>
                  <td className="py-4 align-top">
                    <p className={r.marketingOptIn ? "text-ok" : "text-subtle"}>
                      {r.marketingOptIn ? "Opted in" : "Not for marketing"}
                    </p>
                    {r.termsAcceptedAt ? (
                      <p className="mt-1 text-xs text-subtle">Terms {r.termsVersion}</p>
                    ) : (
                      <p className="mt-1 text-xs text-subtle">Terms not yet on file</p>
                    )}
                  </td>
                  <td className="py-4 align-top text-muted">
                    <p>
                      {r.orderCount} order{r.orderCount === 1 ? "" : "s"} · {r.inquiryCount} inquir
                      {r.inquiryCount === 1 ? "y" : "ies"}
                    </p>
                    {r.lastOrderTitle ? <p className="mt-1 text-xs text-subtle">{r.lastOrderTitle}</p> : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

function csv(value: string): string {
  if (/[",\n]/.test(value)) return `"${value.replaceAll('"', '""')}"`;
  return value;
}
