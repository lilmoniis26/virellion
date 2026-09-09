import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { RISK_LABELS, departmentById, packageById, JOURNEY } from "@/lib/catalog";
import { draftScope } from "@/lib/ai";
import { classifyIntake } from "@/lib/routing";
import { useAtlas } from "@/lib/store";
import type { EngagementType, Inquiry, JourneyStage } from "@/lib/types";
import { formatDateTime, formatMoney } from "@/lib/utils";

type Search = { id?: string };

export const Route = createFileRoute("/hq/inquiries")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    id: typeof s.id === "string" ? s.id : undefined,
  }),
  component: InquiriesPage,
});

function InquiriesPage() {
  const { id } = Route.useSearch();
  const inquiries = useAtlas((s) => s.inquiries);
  const selected = inquiries.find((i) => i.id === id) ?? inquiries[0];

  return (
    <main className="grid min-h-[70dvh] lg:grid-cols-[280px_1fr]">
      <aside className="border-b border-border lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between px-4 py-5">
          <h1 className="font-display text-xl text-fg">Inquiries</h1>
          <Button size="sm" variant="outline" asChild>
            <Link to="/start">New</Link>
          </Button>
        </div>
        {inquiries.length === 0 ? (
          <p className="px-4 pb-6 text-sm text-muted">No inquiries yet.</p>
        ) : (
          <ul className="max-h-[40vh] overflow-y-auto lg:max-h-[calc(100dvh-10rem)]">
            {inquiries.map((i) => (
              <li key={i.id}>
                <Link
                  to="/hq/inquiries"
                  search={{ id: i.id }}
                  className={`block border-t border-border px-4 py-3 ${
                    selected?.id === i.id ? "bg-raised" : "hover:bg-surface"
                  }`}
                >
                  <p className="text-sm text-fg">{i.intake.name || "Unnamed"}</p>
                  <p className="truncate text-xs text-muted">{i.intake.desiredOutcome}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-wide text-subtle">
                    {i.status} · {i.stage}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </aside>
      <div className="min-w-0">
        {selected ? <InquiryDetail inquiry={selected} /> : (
          <p className="p-8 text-sm text-muted">Select or create an inquiry.</p>
        )}
      </div>
    </main>
  );
}

function InquiryDetail({ inquiry }: { inquiry: Inquiry }) {
  const updateInquiry = useAtlas((s) => s.updateInquiry);
  const setStage = useAtlas((s) => s.setInquiryStage);
  const addProposal = useAtlas((s) => s.addProposal);
  const allProposals = useAtlas((s) => s.proposals);
  const proposals = allProposals.filter((p) => p.inquiryId === inquiry.id);
  const [busy, setBusy] = useState(false);
  const [notes, setNotes] = useState(inquiry.notes);

  const routing = inquiry.routing ?? classifyIntake(inquiry.intake);

  const draft = async () => {
    setBusy(true);
    try {
      const result = await draftScope({
        data: {
          intakeJson: JSON.stringify(inquiry.intake, null, 2),
          routingJson: JSON.stringify(routing, null, 2),
        },
      });
      const parsed = result.ok ? parseScope(result.text) : fallbackScope(inquiry, routing);
      addProposal(inquiry.id, parsed);
    } catch {
      addProposal(inquiry.id, fallbackScope(inquiry, routing));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-8 px-4 py-6 sm:px-6">
      <header>
        <p className="text-xs uppercase tracking-[0.16em] text-subtle">{inquiry.source} · {formatDateTime(inquiry.createdAt)}</p>
        <h2 className="mt-1 font-display text-3xl text-fg">{inquiry.intake.name || "Unnamed client"}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">{inquiry.intake.desiredOutcome}</p>
      </header>

      <section className="grid gap-3 sm:grid-cols-2">
        <Meta label="Email" value={inquiry.intake.email} />
        <Meta label="Phone" value={inquiry.intake.phone} />
        <Meta label="Location" value={inquiry.intake.location} />
        <Meta label="Type" value={inquiry.intake.projectType} />
        <Meta label="Stage" value={inquiry.intake.currentStage} />
        <Meta label="Deadline" value={inquiry.intake.deadline} />
        <Meta label="Budget" value={inquiry.intake.budget} />
        <Meta label="Channel" value={inquiry.intake.channel} />
      </section>

      <section>
        <h3 className="font-display text-lg text-fg">Routing</h3>
        <p className="mt-2 text-sm text-muted">{routing.summary}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {routing.departments.map((d) => (
            <span key={d} className="rounded-full border border-border px-3 py-1 text-xs text-fg">
              {departmentById(d).short}
            </span>
          ))}
          <span className="rounded-full border border-accent/40 px-3 py-1 text-xs capitalize text-accent">
            {routing.engagement}
          </span>
        </div>
        {routing.risks.length > 0 ? (
          <ul className="mt-4 space-y-1">
            {routing.risks.map((r) => (
              <li key={r} className="text-xs text-warn">
                {RISK_LABELS.find((x) => x.id === r)?.label ?? r}
              </li>
            ))}
          </ul>
        ) : null}
        {routing.suggestedPackageId ? (
          <p className="mt-3 text-sm text-muted">
            Suggested package: {packageById(routing.suggestedPackageId)?.name}
          </p>
        ) : null}
        <p className="mt-2 text-xs text-subtle">Specialists: {routing.specialists.join(" · ")}</p>
      </section>

      {inquiry.intake.businessName ? (
        <section>
          <h3 className="font-display text-lg text-fg">Formation extras</h3>
          <div className="mt-3 grid gap-2 text-sm text-muted sm:grid-cols-2">
            <p>Name: {inquiry.intake.businessName}</p>
            <p>Status: {inquiry.intake.businessStatus}</p>
            <p>Entity: {inquiry.intake.entityType}</p>
            <p>Address: {inquiry.intake.addressSituation}</p>
            <p>Marketplace: {inquiry.intake.marketplace}</p>
            <p>Category: {inquiry.intake.productCategory}</p>
          </div>
        </section>
      ) : null}

      <section>
        <h3 className="font-display text-lg text-fg">Pipeline stage</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {JOURNEY.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setStage(inquiry.id, s.id as JourneyStage)}
              className={`h-9 rounded-full border px-3 text-xs ${
                inquiry.stage === s.id ? "border-accent bg-accent text-accent-fg" : "border-border text-muted"
              }`}
            >
              {s.step}. {s.title}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h3 className="font-display text-lg text-fg">Internal notes</h3>
        <Textarea className="mt-2" value={notes} onChange={(e) => setNotes(e.target.value)} />
        <Button className="mt-3" size="sm" variant="outline" onClick={() => updateInquiry(inquiry.id, { notes })}>
          Save notes
        </Button>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg text-fg">Scope</h3>
          <Button size="sm" onClick={() => void draft()} disabled={busy}>
            {busy ? "Drafting…" : "Draft proposal"}
          </Button>
        </div>
        {proposals.length === 0 ? (
          <p className="mt-3 text-sm text-muted">No proposal yet. Draft a scope after classification and any required review.</p>
        ) : (
          <ul className="mt-4 space-y-4">
            {proposals.map((p) => (
              <ProposalCard key={p.id} proposalId={p.id} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function ProposalCard({ proposalId }: { proposalId: string }) {
  const proposal = useAtlas((s) => s.proposals.find((p) => p.id === proposalId));
  const updateProposal = useAtlas((s) => s.updateProposal);
  const approveProposal = useAtlas((s) => s.approveProposal);
  const projects = useAtlas((s) => s.projects);
  if (!proposal) return null;
  const linked = projects.find((p) => p.proposalId === proposal.id);

  return (
    <article className="rounded-xl border border-border bg-surface p-5">
      <p className="text-xs uppercase tracking-wide text-subtle">{proposal.status} · {proposal.engagement}</p>
      <h4 className="mt-1 font-display text-xl text-fg">{proposal.title}</h4>
      <p className="mt-2 text-sm text-muted">{proposal.summary}</p>
      <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-fg">
        {proposal.deliverables.map((d) => (
          <li key={d}>{d}</li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-muted">
        {proposal.timeline} · {formatMoney(proposal.fee)}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {proposal.status === "draft" ? (
          <Button size="sm" variant="outline" onClick={() => updateProposal(proposal.id, { status: "sent" })}>
            Mark sent
          </Button>
        ) : null}
        {proposal.status !== "approved" && !linked ? (
          <Button size="sm" onClick={() => approveProposal(proposal.id)}>
            Record approval & create project
          </Button>
        ) : null}
        {linked ? (
          <Button size="sm" variant="outline" asChild>
            <Link to="/hq/projects" search={{ id: linked.id }}>
              Open project
            </Link>
          </Button>
        ) : null}
      </div>
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.14em] text-subtle">{label}</p>
      <p className="mt-1 text-sm text-fg">{value}</p>
    </div>
  );
}

function parseScope(text: string) {
  const grab = (h: string) => {
    const re = new RegExp(`${h}\\s*\\n([\\s\\S]*?)(?=\\n[A-Z][A-Z ]+\\n|$)`);
    return (text.match(re)?.[1] ?? "").trim();
  };
  const bullets = (block: string) =>
    block
      .split("\n")
      .map((l) => l.replace(/^[-*•]\s*/, "").trim())
      .filter(Boolean);
  const feeLine = grab("FEE").replace(/[^0-9]/g, "");
  const engagement = grab("ENGAGEMENT").toLowerCase().split(/\s/)[0] as EngagementType;
  const allowed: EngagementType[] = ["individual", "package", "end-to-end", "consultation", "retainer"];
  return {
    title: grab("TITLE") || "Project scope",
    summary: grab("SUMMARY"),
    deliverables: bullets(grab("DELIVERABLES")),
    exclusions: bullets(grab("EXCLUSIONS")),
    timeline: grab("TIMELINE") || "To be confirmed",
    fee: Number(feeLine) || 0,
    engagement: allowed.includes(engagement) ? engagement : "consultation",
    status: "draft" as const,
  };
}

function fallbackScope(inquiry: Inquiry, routing: NonNullable<Inquiry["routing"]>) {
  const pkg = routing.suggestedPackageId ? packageById(routing.suggestedPackageId) : undefined;
  return {
    title: `${inquiry.intake.name || "Client"} — ${pkg?.name ?? "Scoped engagement"}`,
    summary: routing.summary,
    deliverables: pkg?.deliverables ?? ["Discovery summary", "Recommended next step"],
    exclusions: [
      "Legal, tax, or licensed advice",
      "Guaranteed approvals or revenue",
      "Account creation using agency identity",
    ],
    timeline: pkg?.timeline ?? "To be confirmed after review",
    fee: pkg?.price ?? 0,
    engagement: routing.engagement,
    status: "draft" as const,
  };
}

