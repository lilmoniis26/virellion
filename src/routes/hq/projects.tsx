import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { useAtlas } from "@/lib/store";
import type { JourneyStage, Project, ProjectStatus } from "@/lib/types";
import { formatDate } from "@/lib/utils";

type Search = { id?: string };

export const Route = createFileRoute("/hq/projects")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    id: typeof s.id === "string" ? s.id : undefined,
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { id } = Route.useSearch();
  const projects = useAtlas((s) => s.projects);
  const selected = projects.find((p) => p.id === id) ?? projects[0];

  return (
    <main className="grid min-h-[70dvh] lg:grid-cols-[280px_1fr]">
      <aside className="border-b border-border lg:border-b-0 lg:border-r">
        <div className="px-4 py-5">
          <h1 className="font-display text-xl text-fg">Projects</h1>
        </div>
        {projects.length === 0 ? (
          <p className="px-4 pb-6 text-sm text-muted">
            No projects. Approve a proposal from an inquiry to create a workspace.
          </p>
        ) : (
          <ul>
            {projects.map((p) => (
              <li key={p.id}>
                <Link
                  to="/hq/projects"
                  search={{ id: p.id }}
                  className={`block border-t border-border px-4 py-3 ${
                    selected?.id === p.id ? "bg-raised" : "hover:bg-surface"
                  }`}
                >
                  <p className="text-sm text-fg">{p.name}</p>
                  <p className="text-xs text-muted">{p.clientName}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </aside>
      <div>{selected ? <ProjectDetail project={selected} /> : <p className="p-8 text-sm text-muted">Select a project.</p>}</div>
    </main>
  );
}

function ProjectDetail({ project }: { project: Project }) {
  const updateProject = useAtlas((s) => s.updateProject);
  const toggleTask = useAtlas((s) => s.toggleTask);
  const toggleQuality = useAtlas((s) => s.toggleQuality);
  const done = project.tasks.filter((t) => t.done).length;
  const qdone = project.quality.filter((c) => c.done).length;

  return (
    <div className="space-y-8 px-4 py-6 sm:px-6">
      <header>
        <p className="text-xs uppercase tracking-[0.16em] text-subtle">
          {project.status} · opened {formatDate(project.createdAt)}
        </p>
        <h2 className="mt-1 font-display text-3xl text-fg">{project.name}</h2>
        <p className="mt-2 text-sm text-muted">
          {project.clientName} · {project.specialist}
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        {(["setup", "in-progress", "internal-review", "delivered", "follow-up"] as ProjectStatus[]).map((st) => (
          <button
            key={st}
            type="button"
            onClick={() =>
              updateProject(project.id, {
                status: st,
                stage: statusToStage(st),
              })
            }
            className={`h-9 rounded-full border px-3 text-xs capitalize ${
              project.status === st ? "border-accent bg-accent text-accent-fg" : "border-border text-muted"
            }`}
          >
            {st.replace("-", " ")}
          </button>
        ))}
      </div>

      <section>
        <h3 className="font-display text-lg text-fg">Folders</h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {project.folders.map((f) => (
            <li key={f} className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-fg">
              {f}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="font-display text-lg text-fg">
          Tasks{" "}
          <span className="font-sans text-sm text-muted tabular-nums">
            {done}/{project.tasks.length}
          </span>
        </h3>
        <ul className="mt-3 space-y-2">
          {project.tasks.map((t) => (
            <li key={t.id}>
              <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-surface px-3 py-3">
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => toggleTask(project.id, t.id)}
                  className="mt-1 size-4 accent-accent"
                />
                <span>
                  <span className={`block text-sm ${t.done ? "text-muted line-through" : "text-fg"}`}>{t.title}</span>
                  <span className="text-xs text-subtle">{t.owner}</span>
                </span>
              </label>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="font-display text-lg text-fg">
          Quality{" "}
          <span className="font-sans text-sm text-muted tabular-nums">
            {qdone}/{project.quality.length}
          </span>
        </h3>
        <ul className="mt-3 space-y-2">
          {project.quality.map((c) => (
            <li key={c.id}>
              <label className="flex cursor-pointer items-start gap-3 text-sm text-fg">
                <input
                  type="checkbox"
                  checked={c.done}
                  onChange={() => toggleQuality(project.id, c.id)}
                  className="mt-0.5 size-4 accent-accent"
                />
                {c.label}
              </label>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="font-display text-lg text-fg">Handoff</h3>
        <Textarea
          className="mt-2"
          value={project.handoff}
          onChange={(e) => updateProject(project.id, { handoff: e.target.value })}
          placeholder="Files, access, instructions, what the client owns…"
        />
      </section>

      <section>
        <h3 className="font-display text-lg text-fg">Follow-up</h3>
        <Textarea
          className="mt-2"
          value={project.followUp}
          onChange={(e) => updateProject(project.id, { followUp: e.target.value })}
          placeholder="Referrals, maintenance, marketplace ops, content, coaching, growth…"
        />
      </section>

      <Button variant="outline" asChild>
        <Link to="/hq/inquiries" search={{ id: project.inquiryId }}>
          Back to inquiry
        </Link>
      </Button>
    </div>
  );
}

function statusToStage(st: ProjectStatus): JourneyStage {
  switch (st) {
    case "setup":
      return "project";
    case "in-progress":
      return "production";
    case "internal-review":
      return "quality";
    case "delivered":
      return "delivery";
    case "follow-up":
      return "follow-up";
  }
}
