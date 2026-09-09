import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { JOURNEY } from "@/lib/catalog";
import { useAtlas } from "@/lib/store";

export const Route = createFileRoute("/hq/demo")({ component: DemoPage });

const SCRIPT = [
  {
    title: "Receptionist message",
    detail: "Maren Cole describes Hearth & Hollow — ceramics and textiles, no LLC, no store.",
  },
  {
    title: "Intake form",
    detail: "Contact, outcome, budget $3–8k, Portland, formation + reseller + brand + website fields.",
  },
  {
    title: "Routing",
    detail: "Formation → E-commerce → Creative → Web. Engagement: end-to-end. Risks: identity verification, marketplace approval, human review.",
  },
  {
    title: "Proposal",
    detail: "Fixed-price scope at $4,200. Exclusions include legal advice and guaranteed marketplace approval.",
  },
  {
    title: "Payment step",
    detail: "Approval recorded. No live processor in this workspace — the record stands in for signed terms and payment.",
  },
  {
    title: "Project creation",
    detail: "Workspace, folders, tasks, and specialist ownership assigned.",
  },
  {
    title: "Quality review",
    detail: "All nine checkpoints marked complete. Credentials not retained.",
  },
  {
    title: "Delivery email",
    detail: "Handoff notes: client owns Gmail, domain, EIN letter, SOS login, Shopify, TikTok Shop.",
  },
  {
    title: "Follow-up",
    detail: "Monthly desk offered. Amazon deferred until TikTok Shop is healthy.",
  },
];

function DemoPage() {
  const runDemo = useAtlas((s) => s.runDemo);
  const demoComplete = useAtlas((s) => s.demoComplete);
  const resetWorkspace = useAtlas((s) => s.resetWorkspace);

  return (
    <main className="px-4 py-8 sm:px-6 sm:py-10">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">Milestone</p>
      <h1 className="mt-2 font-display text-3xl text-fg">Internal demo journey</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        Fictional client only — Maren Cole / Hearth & Hollow. Tests receptionist message, intake, routing, proposal,
        payment record, project creation, quality review, delivery, and follow-up before broad promotion.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button onClick={() => runDemo()}>{demoComplete ? "Replay demo data" : "Load demo journey"}</Button>
        <Button variant="outline" asChild>
          <Link to="/hq/inquiries" search={{ id: "inq_demo_hearth" }}>
            Open demo inquiry
          </Link>
        </Button>
        <Button variant="ghost" onClick={() => resetWorkspace()}>
          Reset workspace
        </Button>
      </div>

      {demoComplete ? (
        <p className="mt-4 text-sm text-ok">Demo record is loaded. Walk the inquiry, proposal, and project.</p>
      ) : null}

      <ol className="mt-10 space-y-6">
        {SCRIPT.map((s, i) => (
          <li key={s.title} className="grid grid-cols-[auto_1fr] gap-4">
            <span className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h2 className="font-display text-xl text-fg">{s.title}</h2>
              <p className="mt-1 text-sm leading-relaxed text-muted">{s.detail}</p>
            </div>
          </li>
        ))}
      </ol>

      <section className="mt-12">
        <h2 className="font-display text-xl text-fg">Mapped to the operating journey</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {JOURNEY.map((j) => (
            <li key={j.id} className="rounded-lg border border-border bg-surface px-4 py-3">
              <p className="text-sm text-fg">
                {j.step}. {j.title}
              </p>
              <p className="text-xs text-muted">{j.output}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
