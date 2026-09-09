import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { assistantReply } from "@/lib/ai";
import { DEPARTMENTS } from "@/lib/catalog";
import { useAtlas } from "@/lib/store";
import type { AssistantDef, ChatMessage, DepartmentId } from "@/lib/types";
import { uid } from "@/lib/utils";

type Search = { id?: string };

export const Route = createFileRoute("/hq/assistants")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    id: typeof s.id === "string" ? s.id : undefined,
  }),
  component: AssistantsPage,
});

function AssistantsPage() {
  const { id } = Route.useSearch();
  const navigate = useNavigate();
  const assistants = useAtlas((s) => s.assistants);
  const loadTemplates = useAtlas((s) => s.loadTemplates);
  const addAssistant = useAtlas((s) => s.addAssistant);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    loadTemplates();
  }, [loadTemplates]);

  const selected = assistants.find((a) => a.id === id) ?? assistants[0];

  return (
    <main className="grid min-h-[70dvh] lg:grid-cols-[280px_1fr]">
      <aside className="border-b border-border lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between px-4 py-5">
          <h1 className="font-display text-xl text-fg">Assistants</h1>
          <Button size="sm" variant="outline" onClick={() => setCreating(true)}>
            New
          </Button>
        </div>
        <ul className="max-h-[50vh] overflow-y-auto lg:max-h-[calc(100dvh-10rem)]">
          {assistants.map((a) => (
            <li key={a.id}>
              <Link
                to="/hq/assistants"
                search={{ id: a.id }}
                className={`block border-t border-border px-4 py-3 ${
                  selected?.id === a.id ? "bg-raised" : "hover:bg-surface"
                }`}
              >
                <p className="text-sm text-fg">{a.name}</p>
                <p className="text-xs text-muted">{a.role}</p>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <div>
        {creating ? (
          <CreateAssistant
            onCancel={() => setCreating(false)}
            onCreate={(def) => {
              const newId = addAssistant(def);
              setCreating(false);
              void navigate({ to: "/hq/assistants", search: { id: newId } });
            }}
          />
        ) : selected ? (
          <AssistantChat assistant={selected} />
        ) : (
          <p className="p-8 text-sm text-muted">Create an assistant to get started.</p>
        )}
      </div>
    </main>
  );
}

function CreateAssistant({
  onCancel,
  onCreate,
}: {
  onCancel: () => void;
  onCreate: (def: Omit<AssistantDef, "id" | "createdAt">) => void;
}) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState<DepartmentId | "">("");
  const [tone, setTone] = useState("Professional, concise, practical");
  const [brief, setBrief] = useState("");

  return (
    <form
      className="space-y-5 px-4 py-6 sm:px-6"
      onSubmit={(e) => {
        e.preventDefault();
        if (!name.trim() || !brief.trim()) return;
        onCreate({
          name: name.trim(),
          role: role.trim() || "Custom specialist",
          department: department || undefined,
          tone,
          brief,
          template: false,
        });
      }}
    >
      <h2 className="font-display text-2xl text-fg">New assistant</h2>
      <p className="text-sm text-muted">
        Personal specialists for future tasks — briefs, scripts, formation checklists, store ops, or a chief of staff.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label>Role</Label>
          <Input value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Launch producer" />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Department (optional)</Label>
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value as DepartmentId | "")}
          className="flex h-11 w-full rounded-md border border-border bg-raised px-3 text-sm text-fg"
        >
          <option value="">None / personal</option>
          {DEPARTMENTS.map((d) => (
            <option key={d.id} value={d.id}>
              {d.label}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <Label>Tone</Label>
        <Input value={tone} onChange={(e) => setTone(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label>Operating brief</Label>
        <Textarea
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
          placeholder="What this assistant owns, how it should think, what it must never do…"
          required
        />
      </div>
      <div className="flex gap-2">
        <Button type="submit">Create</Button>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

function AssistantChat({ assistant }: { assistant: AssistantDef }) {
  const thread = useAtlas((s) => s.threads[assistant.id]);
  const append = useAtlas((s) => s.appendThread);
  const removeAssistant = useAtlas((s) => s.removeAssistant);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const scroller = useRef<HTMLDivElement>(null);
  const messages = thread?.messages ?? [];

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
  }, [messages.length, busy]);

  const send = async () => {
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    setError("");
    const userMsg: ChatMessage = {
      id: uid("msg"),
      role: "user",
      content: text,
      createdAt: new Date().toISOString(),
    };
    append(assistant.id, userMsg);
    const history = [...messages, userMsg].map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }));
    setBusy(true);
    try {
      const result = await assistantReply({
        data: {
          name: assistant.name,
          role: assistant.role,
          brief: assistant.brief,
          tone: assistant.tone,
          messages: history,
        },
      });
      const content = result.ok
        ? result.text
        : localAssistant(assistant, text);
      append(assistant.id, {
        id: uid("msg"),
        role: "assistant",
        content,
        createdAt: new Date().toISOString(),
      });
      if (!result.ok && result.error !== "AI is not available in this environment") setError(result.error);
    } catch {
      append(assistant.id, {
        id: uid("msg"),
        role: "assistant",
        content: localAssistant(assistant, text),
        createdAt: new Date().toISOString(),
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex h-[calc(100dvh-9rem)] flex-col">
      <header className="flex items-start justify-between gap-3 border-b border-border px-4 py-4 sm:px-6">
        <div>
          <h2 className="font-display text-2xl text-fg">{assistant.name}</h2>
          <p className="text-sm text-muted">{assistant.role}</p>
          <p className="mt-2 max-w-2xl text-xs leading-relaxed text-subtle">{assistant.brief}</p>
        </div>
        {!assistant.template ? (
          <Button size="sm" variant="ghost" onClick={() => removeAssistant(assistant.id)}>
            Remove
          </Button>
        ) : null}
      </header>
      <div ref={scroller} className="flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-6">
        {messages.length === 0 ? (
          <p className="text-sm text-muted">
            Ask for a brief, a checklist, a script, a routing recommendation, or a next-step plan.
          </p>
        ) : null}
        {messages.map((m) => (
          <div key={m.id} className={m.role === "user" ? "ml-10" : "mr-10"}>
            <p className="text-[11px] uppercase tracking-[0.14em] text-subtle">
              {m.role === "user" ? "You" : assistant.name}
            </p>
            <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-fg">{m.content}</p>
          </div>
        ))}
        {busy ? <p className="text-sm text-muted">Drafting…</p> : null}
      </div>
      {error ? <p className="px-4 text-xs text-danger">{error}</p> : null}
      <form
        className="flex gap-2 border-t border-border p-3"
        onSubmit={(e) => {
          e.preventDefault();
          void send();
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message ${assistant.name}`}
          className="h-12 flex-1 rounded-md border border-border bg-raised px-3 text-sm text-fg placeholder:text-subtle"
        />
        <Button type="submit" size="icon" disabled={busy || !input.trim()} aria-label="Send">
          <ArrowUp />
        </Button>
      </form>
    </div>
  );
}

function localAssistant(assistant: AssistantDef, text: string): string {
  return `${assistant.name} (${assistant.role}) would approach this as follows:\n\n1. Restate the outcome: ${text.slice(0, 180)}\n2. List constraints (scope, timeline, what Virellion will not do).\n3. Produce a short checklist and a next human action.\n\nAI is unavailable right now, so this is a structured placeholder. Try again in a moment, or write the brief into a project task.`;
}
