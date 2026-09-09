import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { JOURNEY } from "@/lib/catalog";
import { getStudioAttention } from "@/lib/client-data";
import { useStudioProfile } from "@/components/auth-slot";
import { isOperator } from "@/lib/access";
import { useAtlas } from "@/lib/store";
import { formatDateTime } from "@/lib/utils";

export const Route = createFileRoute("/hq/")({ component: HqHome });

function HqHome() {
  const inquiries = useAtlas((s) => s.inquiries);
  const projects = useAtlas((s) => s.projects);
  const assistants = useAtlas((s) => s.assistants);
  const demoComplete = useAtlas((s) => s.demoComplete);
  const { profile } = useStudioProfile();
  const operator = isOperator(profile?.role);
  const [attention, setAttention] = useState<{
    unread: number;
    pendingPayments: number;
    paypalReady: boolean;
  } | null>(null);

  useEffect(() => {
    getStudioAttention()
      .then(setAttention)
      .catch(() => setAttention(null));
  }, []);

  const open = inquiries.filter((i) => i.status === "open" || i.status === "new").length;
  const active = projects.filter((p) => p.status !== "delivered" && p.status !== "follow-up").length;

  return (
    <main className="px-4 py-8 sm:px-6 sm:py-10">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">HQ</p>
      <h1 className="mt-2 font-display text-3xl text-fg">Operations desk</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        Edit the public site, prices, and photographs from Pages and Catalog. Invite a partner to help with upkeep —
        PayPal, receipts, terms, and domain records stay with the operator.
      </p>

      {operator && attention && !attention.paypalReady ? (
        <Card className="mt-8">
          <p className="font-display text-xl text-fg">Connect PayPal</p>
          <p className="mt-1 text-sm text-muted">
            Add your PayPal.me name or business email so clients can pay with the account you already use for POS.
          </p>
          <Button className="mt-4" asChild>
            <Link to="/hq/payments">Open PayPal settings</Link>
          </Button>
        </Card>
      ) : null}

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          label="Client work"
          value={attention?.unread ? `${attention.unread} new` : "Inbox"}
          to="/hq/inbox"
        />
        <Stat label="Awaiting funds" value={attention?.pendingPayments ?? "—"} to="/hq/inbox" />
        <Stat label="Clients" value="Roster" to="/hq/clients" />
        {operator ? <Stat label="PayPal" value={attention?.paypalReady ? "Ready" : "Set up"} to="/hq/payments" /> : null}
        <Stat label="Pages" value="Edit" to="/hq/pages" />
        <Stat label="Catalog" value="Edit" to="/hq/catalog" />
        {operator ? <Stat label="Partners" value="Invite" to="/hq/team" /> : null}
        {operator ? <Stat label="Terms" value="Edit" to="/hq/legal" /> : null}
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Open inquiries" value={open} to="/hq/inquiries" />
        <Stat label="Active projects" value={active} to="/hq/projects" />
        <Stat label="Assistants" value={assistants.length} to="/hq/assistants" />
      </div>

      {!demoComplete ? (
        <Card className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-xl text-fg">First operational milestone</p>
            <p className="mt-1 text-sm text-muted">
              Complete one internal demo from inquiry to handoff using a fictional project — never a real client’s
              sensitive data.
            </p>
          </div>
          <Button asChild>
            <Link to="/hq/demo">Run demo journey</Link>
          </Button>
        </Card>
      ) : (
        <p className="mt-8 text-sm text-ok">Demo journey is on file (Hearth & Hollow — fictional).</p>
      )}

      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl text-fg">Recent inquiries</h2>
          <Link to="/hq/inquiries" className="text-sm text-muted hover:text-fg">
            View all
          </Link>
        </div>
        {inquiries.length === 0 ? (
          <p className="mt-4 text-sm text-muted">
            No records yet.{" "}
            <Link to="/start" className="text-fg underline underline-offset-4">
              Take an inquiry
            </Link>{" "}
            or talk to reception.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {inquiries.slice(0, 6).map((i) => (
              <li key={i.id} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-fg">{i.intake.name || "Unnamed"}</p>
                  <p className="text-xs text-muted">{i.intake.desiredOutcome.slice(0, 90)}</p>
                </div>
                <div className="flex items-center gap-3 text-xs text-subtle">
                  <span className="capitalize">{i.stage.replace("-", " ")}</span>
                  <span>{formatDateTime(i.createdAt)}</span>
                  <Link to="/hq/inquiries" search={{ id: i.id }} className="text-fg">
                    Open
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl text-fg">Pipeline</h2>
        <ol className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {JOURNEY.map((step) => {
            const count = inquiries.filter((i) => i.stage === step.id).length
              + projects.filter((p) => p.stage === step.id).length;
            return (
              <li key={step.id} className="rounded-lg border border-border bg-surface px-4 py-3">
                <p className="font-mono text-[11px] text-subtle">{String(step.step).padStart(2, "0")}</p>
                <p className="text-sm text-fg">{step.title}</p>
                <p className="text-xs tabular-nums text-muted">{count} in stage</p>
              </li>
            );
          })}
        </ol>
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        <Button asChild>
          <Link to="/start">
            New intake <ArrowRight className="size-4" />
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/receptionist">Open reception</Link>
        </Button>
      </div>
    </main>
  );
}

function Stat({
  label,
  value,
  to,
}: {
  label: string;
  value: number | string;
  to: "/hq/inquiries" | "/hq/projects" | "/hq/assistants" | "/hq/inbox" | "/hq/clients" | "/hq/payments" | "/hq/catalog" | "/hq/pages" | "/hq/team" | "/hq/legal";
}) {
  return (
    <Link to={to} className="rounded-xl border border-border bg-surface p-5">
      <p className="text-xs uppercase tracking-[0.14em] text-subtle">{label}</p>
      <p className="mt-2 font-display text-3xl tabular-nums text-fg">{value}</p>
    </Link>
  );
}
