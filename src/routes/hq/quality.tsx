import { createFileRoute, Link } from "@tanstack/react-router";
import { QUALITY_CHECKS } from "@/lib/catalog";
import { useAtlas } from "@/lib/store";

export const Route = createFileRoute("/hq/quality")({ component: QualityPage });

function QualityPage() {
  const projects = useAtlas((s) => s.projects);

  return (
    <main className="px-4 py-8 sm:px-6 sm:py-10">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">Checkpoints</p>
      <h1 className="mt-2 font-display text-3xl text-fg">Quality control</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        Before delivery: confirm scope, accuracy, links, files, branding, product data, platform policies, no regulated
        advice, and return or delete client credentials.
      </p>

      <ol className="mt-8 space-y-3">
        {QUALITY_CHECKS.map((c, i) => (
          <li key={c.id} className="flex gap-4 border-t border-border pt-3">
            <span className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-sm text-fg">{c.label}</span>
          </li>
        ))}
      </ol>

      <section className="mt-12">
        <h2 className="font-display text-xl text-fg">Open reviews</h2>
        {projects.length === 0 ? (
          <p className="mt-3 text-sm text-muted">No project workspaces yet.</p>
        ) : (
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {projects.map((p) => {
              const done = p.quality.filter((q) => q.done).length;
              const ready = done === p.quality.length;
              return (
                <li key={p.id} className="flex items-center justify-between gap-3 py-3">
                  <div>
                    <p className="text-sm text-fg">{p.name}</p>
                    <p className="text-xs text-muted">
                      {done}/{p.quality.length} checks · {p.status}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs ${ready ? "text-ok" : "text-warn"}`}>
                      {ready ? "Ready to deliver" : "Incomplete"}
                    </span>
                    <Link to="/hq/projects" search={{ id: p.id }} className="text-sm text-fg">
                      Open
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}
