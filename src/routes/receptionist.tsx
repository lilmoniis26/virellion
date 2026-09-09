import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ConsentFields } from "@/components/consent-fields";
import { Button } from "@/components/ui/button";
import { receptionReply } from "@/lib/ai";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { useSiteCopy } from "@/components/site-copy-provider";
import { AGENCY, departmentById } from "@/lib/catalog";
import { createInquiry } from "@/lib/client-data";
import { classifyIntake, emptyIntake } from "@/lib/routing";
import { pageHead } from "@/lib/seo";
import { useAtlas } from "@/lib/store";
import type { ChatMessage, IntakeRecord } from "@/lib/types";
import { uid } from "@/lib/utils";

export const Route = createFileRoute("/receptionist")({
  component: ReceptionPage,
  head: () =>
    pageHead(
      "Reception",
      "Tell Virellion what you are trying to create, improve, launch, or accomplish. Reception identifies the right practice.",
    ),
});

const OPENING: ChatMessage = {
  id: "opening",
  role: "assistant",
  content: AGENCY.opening,
  createdAt: new Date(0).toISOString(),
};

function ReceptionPage() {
  return <ReceptionPageInner />;
}

function ReceptionPageInner() {
  const navigate = useNavigate();
  const stored = useAtlas((s) => s.reception);
  const setReception = useAtlas((s) => s.setReception);
  const intake = useAtlas((s) => s.receptionIntake);
  const setIntake = useAtlas((s) => s.setReceptionIntake);
  const addInquiry = useAtlas((s) => s.addInquiry);
  const { user } = useCurrentUserState();
  const copy = useSiteCopy();

  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [terms, setTerms] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);

  const messages = stored.length ? stored : [OPENING];

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
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
    const next = [...(stored.length ? stored : [OPENING]), userMsg];
    setReception(next);
    const extracted = extractFromUtterance(intake, text);
    setIntake(extracted);

    setBusy(true);
    try {
      const result = await receptionReply({
        data: {
          messages: next
            .filter((m) => m.role !== "system")
            .map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
          extracted: summarizeIntake(extracted),
        },
      });
      if (!result.ok) {
        const fallback = localReception(extracted, text);
        setReception([
          ...next,
          {
            id: uid("msg"),
            role: "assistant",
            content: fallback,
            createdAt: new Date().toISOString(),
          },
        ]);
        if (result.error !== "AI is not available in this environment") setError(result.error);
      } else {
        setReception([
          ...next,
          {
            id: uid("msg"),
            role: "assistant",
            content: result.text,
            createdAt: new Date().toISOString(),
          },
        ]);
      }
    } catch {
      setReception([
        ...next,
        {
          id: uid("msg"),
          role: "assistant",
          content: localReception(extracted, text),
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setBusy(false);
    }
  };

  const fileRecord = async () => {
    const routing = classifyIntake(intake);
    const filled: IntakeRecord = {
      ...emptyIntake(),
      ...intake,
      desiredOutcome: intake.desiredOutcome || lastUserText(messages) || "Discussed with reception",
      name: intake.name || user?.displayName || "Reception visitor",
      email: intake.email || user?.primaryEmail || "",
    };
    if (!user) {
      await navigate({ to: "/login", search: { redirect: "/receptionist" } });
      return;
    }
    if (!filled.email) {
      setError("Add an email in the conversation, or use an account with an email address.");
      return;
    }
    if (!terms) {
      setError("Please agree to the Terms of Engagement and Privacy Notice.");
      return;
    }
    try {
      await createInquiry({
        data: { intake: filled, source: "receptionist", termsAccepted: true, marketingOptIn: marketing },
      });
      addInquiry({
        intake: filled,
        source: "receptionist",
        conversation: messages,
        routing,
      });
      await navigate({ to: "/account" });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not file the inquiry.");
    }
  };

  const routingPreview = classifyIntake(intake);

  return (
    <main>
      <section className="relative isolate overflow-hidden border-b border-border">
        <img
          src={copy.receptionist.image}
          alt={copy.receptionist.imageAlt}
          className="absolute inset-0 size-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-bg/50" />
        <div className="relative mx-auto flex max-w-6xl items-end justify-between gap-6 px-4 py-16 sm:px-6 sm:py-20">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">{copy.receptionist.kicker}</p>
            <h1 className="mt-3 font-display text-4xl text-fg sm:text-5xl">{copy.receptionist.title}</h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-accent">{copy.receptionist.dek}</p>
          </div>
          <Button
            variant="outline"
            className="hidden shrink-0 sm:inline-flex"
            onClick={fileRecord}
            disabled={messages.length < 2 || !terms}
          >
            Send to the studio
          </Button>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_280px]">
        <section className="flex min-h-[420px] flex-col rounded-xl border border-border bg-surface">
          <div ref={scroller} className="flex-1 space-y-4 overflow-y-auto p-5">
            {messages.map((m) => (
              <div key={m.id} className={m.role === "user" ? "ml-8 sm:ml-16" : "mr-8 sm:mr-16"}>
                <p className="text-xs uppercase tracking-[0.14em] text-subtle">
                  {m.role === "user" ? "You" : "Reception"}
                </p>
                <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-fg">{m.content}</p>
              </div>
            ))}
            {busy ? <p className="text-sm text-muted">Listening and classifying…</p> : null}
          </div>
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
              placeholder="What are you trying to create, improve, launch, or accomplish?"
              className="h-12 flex-1 rounded-md border border-border bg-raised px-3 text-sm text-fg placeholder:text-subtle"
            />
            <Button type="submit" size="icon" disabled={busy || !input.trim()} aria-label="Send">
              <ArrowUp />
            </Button>
          </form>
          {error ? <p className="px-4 pb-3 text-xs text-danger">{error}</p> : null}
        </section>

        <aside className="rounded-xl border border-border bg-surface p-5">
          <p className="text-xs uppercase tracking-[0.14em] text-subtle">Live routing</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">{routingPreview.summary}</p>
          <ul className="mt-4 space-y-1 text-sm text-fg">
            {routingPreview.departments.map((d) => (
              <li key={d}>{departmentById(d).short}</li>
            ))}
          </ul>
          {routingPreview.needsHumanReview ? (
            <p className="mt-4 text-xs text-warn">Human review required</p>
          ) : null}
          <div className="mt-6">
            <ConsentFields
              idPrefix="reception"
              terms={terms}
              onTerms={setTerms}
              marketing={marketing}
              onMarketing={setMarketing}
            />
          </div>
          <Button className="mt-6 w-full sm:hidden" variant="outline" onClick={fileRecord} disabled={messages.length < 2 || !terms}>
            Send to the studio
          </Button>
          <p className="mt-6 text-xs leading-relaxed text-subtle">
            Prefer the structured form?{" "}
            <Link to="/start" className="text-fg underline underline-offset-4">
              Open intake
            </Link>
            .
          </p>
        </aside>
      </div>
    </main>
  );
}

function lastUserText(messages: ChatMessage[]): string {
  return [...messages].reverse().find((m) => m.role === "user")?.content ?? "";
}

function summarizeIntake(i: IntakeRecord): string {
  return Object.entries(i)
    .filter(([, v]) => (Array.isArray(v) ? v.length : String(v).trim()))
    .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
    .join("\n");
}

function extractFromUtterance(current: IntakeRecord, text: string): IntakeRecord {
  const next = { ...current };
  const email = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  if (email) next.email = email[0];
  const phone = text.match(/\+?1?\s*\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/);
  if (phone) next.phone = phone[0];
  if (!next.desiredOutcome) next.desiredOutcome = text;
  else next.desiredOutcome = `${next.desiredOutcome}\n${text}`;
  if (/llc|ein|formation/i.test(text) && !next.services.includes("Business formation")) {
    next.services = [...next.services, "Business formation"];
  }
  if (/shopify|amazon|tiktok|reseller/i.test(text) && !next.services.includes("Online reseller / marketplace")) {
    next.services = [...next.services, "Online reseller / marketplace"];
  }
  if (/book|manuscript/i.test(text) && !next.services.includes("Book / publishing")) {
    next.services = [...next.services, "Book / publishing"];
  }
  if (/logo|brand/i.test(text) && !next.services.includes("Brand identity")) {
    next.services = [...next.services, "Brand identity"];
  }
  return next;
}

function localReception(intake: IntakeRecord, text: string): string {
  const routing = classifyIntake(intake, text);
  if (!intake.name) {
    return "Understood. What’s your name, and where is this project based?";
  }
  if (!intake.budget) {
    return "Helpful. Do you have a budget range and a deadline in mind, even roughly?";
  }
  return `${routing.summary} If that sounds right, I can file this as an inquiry so a specialist can send a scope summary${
    routing.needsHumanReview ? " after human review" : ""
  }.`;
}
