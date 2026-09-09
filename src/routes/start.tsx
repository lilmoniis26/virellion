import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ConsentFields, EngagementNotice } from "@/components/consent-fields";
import { PageHero } from "@/components/page-hero";
import { useSiteCopy } from "@/components/site-copy-provider";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import {
  BUDGETS,
  CURRENT_STAGES,
  PROJECT_TYPES,
  REGULATED_MATTERS,
  SERVICE_OPTIONS,
} from "@/lib/catalog";
import { createInquiry } from "@/lib/client-data";
import { clearIntakeDraft, readIntakeDraft, saveIntakeDraft } from "@/lib/intake-draft";
import { emptyIntake, needsFormationExtras } from "@/lib/routing";
import { pageHead } from "@/lib/seo";
import { useAtlas } from "@/lib/store";
import type { BudgetRange, CommChannel, IntakeRecord } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/start")({
  component: StartPage,
  head: () =>
    pageHead(
      "Start a project",
      "Tell Virellion the outcome. Intake creates a routing record and a specialist sends a scope summary.",
    ),
});

const STEPS = ["Contact", "Outcome", "Practical", "Risk", "Formation"];

function StartPage() {
  const navigate = useNavigate();
  const addInquiry = useAtlas((s) => s.addInquiry);
  const { user, isPending } = useCurrentUserState();
  const copy = useSiteCopy();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<IntakeRecord>(emptyIntake);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [terms, setTerms] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const restored = useRef(false);

  const showFormation = needsFormationExtras(form);
  const visibleSteps = showFormation ? STEPS : STEPS.slice(0, 4);

  const patch = (p: Partial<IntakeRecord>) => setForm((f) => ({ ...f, ...p }));

  const toggle = (key: "services" | "regulated", value: string) => {
    setForm((f) => {
      const list = f[key];
      return {
        ...f,
        [key]: list.includes(value) ? list.filter((x) => x !== value) : [...list, value],
      };
    });
  };

  const canNext = useMemo(() => {
    if (step === 0) return form.name.trim() && form.email.trim();
    if (step === 1) return form.desiredOutcome.trim().length > 8;
    return true;
  }, [step, form]);

  const submit = async (intake: IntakeRecord) => {
    if (!intake.name || !intake.email || !intake.desiredOutcome) {
      setError("Name, email, and desired outcome are required.");
      return;
    }
    if (isPending) return;
    if (!user) {
      saveIntakeDraft(intake);
      await navigate({ to: "/login", search: { redirect: "/start" } });
      return;
    }
    if (!terms) {
      setError("Please agree to the Terms of Engagement and Privacy Notice.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      await createInquiry({ data: { intake, source: "form", termsAccepted: true, marketingOptIn: marketing } });
      addInquiry({ intake, source: "form" });
      clearIntakeDraft();
      await navigate({ to: "/account" });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not submit the inquiry.");
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    if (isPending || restored.current) return;
    const draft = readIntakeDraft();
    if (!draft) return;
    restored.current = true;
    setForm(draft);
    setStep(needsFormationExtras(draft) ? STEPS.length - 1 : STEPS.length - 2);
  }, [user, isPending]);

  return (
    <main>
      <PageHero
        compact
        src={copy.start.image}
        alt={copy.start.imageAlt}
        kicker={copy.start.kicker}
        title={copy.start.title}
        dek={copy.start.dek}
      />

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-sm leading-relaxed text-muted">
          <Link to="/receptionist" className="text-fg underline decoration-border underline-offset-4">
            Talk to reception
          </Link>{" "}
          if you would rather describe it in a sentence. Formation extras appear only when they are relevant.
        </p>

        <ol className="mt-8 flex flex-wrap gap-2">
          {visibleSteps.map((label, i) => (
            <li
              key={label}
              className={cn(
                "rounded-full border px-3 py-1 text-xs uppercase tracking-wide",
                i === step ? "border-accent bg-accent text-accent-fg" : "border-border text-subtle",
              )}
            >
              {label}
            </li>
          ))}
        </ol>

        <form
          className="mt-8 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            if (step < visibleSteps.length - 1) setStep((s) => s + 1);
            else void submit(form);
          }}
        >
          {step === 0 ? (
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name">
                <Input value={form.name} onChange={(e) => patch({ name: e.target.value })} required />
              </Field>
              <Field label="Email">
                <Input type="email" value={form.email} onChange={(e) => patch({ email: e.target.value })} required />
              </Field>
              <Field label="Phone">
                <Input value={form.phone} onChange={(e) => patch({ phone: e.target.value })} />
              </Field>
              <Field label="Location">
                <Input value={form.location} onChange={(e) => patch({ location: e.target.value })} />
              </Field>
              <div className="sm:col-span-2">
                <Label>Preferred channel</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(["email", "phone", "sms", "chat"] as CommChannel[]).map((c) => (
                    <Chip key={c} active={form.channel === c} onClick={() => patch({ channel: c })}>
                      {c === "sms" ? "SMS" : c}
                    </Chip>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {step === 1 ? (
            <div className="space-y-5">
              <Field label="Desired outcome">
                <Textarea
                  value={form.desiredOutcome}
                  onChange={(e) => patch({ desiredOutcome: e.target.value })}
                  placeholder="What are you trying to create, improve, launch, or accomplish?"
                  required
                />
              </Field>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Business or project type">
                  <Select
                    value={form.projectType}
                    onChange={(v) => patch({ projectType: v })}
                    options={PROJECT_TYPES}
                  />
                </Field>
                <Field label="Current stage">
                  <Select
                    value={form.currentStage}
                    onChange={(v) => patch({ currentStage: v })}
                    options={CURRENT_STAGES}
                  />
                </Field>
              </div>
              <Field label="Target audience">
                <Input value={form.audience} onChange={(e) => patch({ audience: e.target.value })} />
              </Field>
              <div>
                <Label>Required services</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {SERVICE_OPTIONS.map((s) => (
                    <Chip key={s} active={form.services.includes(s)} onClick={() => toggle("services", s)}>
                      {s}
                    </Chip>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="space-y-5">
              <Field label="Deadline">
                <Input
                  value={form.deadline}
                  onChange={(e) => patch({ deadline: e.target.value })}
                  placeholder="e.g. 6 weeks, before November"
                />
              </Field>
              <div>
                <Label>Budget range</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {BUDGETS.map((b) => (
                    <Chip
                      key={b.id}
                      active={form.budget === b.id}
                      onClick={() => patch({ budget: b.id as BudgetRange })}
                    >
                      {b.label}
                    </Chip>
                  ))}
                </div>
              </div>
              <Field label="Existing assets">
                <Textarea
                  value={form.assets}
                  onChange={(e) => patch({ assets: e.target.value })}
                  placeholder="Logo, manuscript, product photos, domain, store, copy…"
                />
              </Field>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="space-y-5">
              <p className="text-sm text-muted">
                Does this project involve legal, tax, financial, medical, immigration, employment, licensing, or other
                regulated matters? If yes, a human reviews before any proposal. Virellion does not provide licensed advice.
              </p>
              <div className="flex flex-wrap gap-2">
                <Chip active={form.regulated.length === 0} onClick={() => patch({ regulated: [] })}>
                  None
                </Chip>
                {REGULATED_MATTERS.map((r) => (
                  <Chip key={r} active={form.regulated.includes(r)} onClick={() => toggle("regulated", r)}>
                    {r}
                  </Chip>
                ))}
              </div>
            </div>
          ) : null}

          {step === 4 && showFormation ? (
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Proposed business name">
                <Input value={form.businessName} onChange={(e) => patch({ businessName: e.target.value })} />
              </Field>
              <Field label="Current business status">
                <Input value={form.businessStatus} onChange={(e) => patch({ businessStatus: e.target.value })} />
              </Field>
              <Field label="Entity type (if chosen)">
                <Input value={form.entityType} onChange={(e) => patch({ entityType: e.target.value })} />
              </Field>
              <Field label="Operating address situation">
                <Input value={form.addressSituation} onChange={(e) => patch({ addressSituation: e.target.value })} />
              </Field>
              <Field label="Desired marketplace">
                <Input value={form.marketplace} onChange={(e) => patch({ marketplace: e.target.value })} />
              </Field>
              <Field label="Product category">
                <Input value={form.productCategory} onChange={(e) => patch({ productCategory: e.target.value })} />
              </Field>
              <Field label="Supplier status">
                <Input value={form.supplierStatus} onChange={(e) => patch({ supplierStatus: e.target.value })} />
              </Field>
              <Field label="Inventory status">
                <Input value={form.inventoryStatus} onChange={(e) => patch({ inventoryStatus: e.target.value })} />
              </Field>
              <Field label="Expected sales channels">
                <Input
                  value={form.salesChannels}
                  onChange={(e) => patch({ salesChannels: e.target.value })}
                  className="sm:col-span-2"
                />
              </Field>
              <YesNo label="Business bank account" value={form.hasBank} onChange={(v) => patch({ hasBank: v })} />
              <YesNo label="EIN" value={form.hasEin} onChange={(v) => patch({ hasEin: v })} />
              <YesNo label="Insurance" value={form.hasInsurance} onChange={(v) => patch({ hasInsurance: v })} />
              <YesNo label="Licenses" value={form.hasLicenses} onChange={(v) => patch({ hasLicenses: v })} />
              <YesNo
                label="Product-compliance documents"
                value={form.hasComplianceDocs}
                onChange={(v) => patch({ hasComplianceDocs: v })}
              />
            </div>
          ) : null}

          {error ? <p className="text-sm text-danger">{error}</p> : null}

          {step === visibleSteps.length - 1 ? (
            <div className="space-y-5">
              <EngagementNotice />
              <ConsentFields
                idPrefix="intake"
                terms={terms}
                onTerms={setTerms}
                marketing={marketing}
                onMarketing={setMarketing}
              />
            </div>
          ) : null}

          <div className="flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="ghost"
              disabled={step === 0}
              onClick={() => setStep((s) => Math.max(0, s - 1))}
            >
              Back
            </Button>
            <Button type="submit" disabled={!canNext || busy || (step === visibleSteps.length - 1 && !terms)}>
              {step === visibleSteps.length - 1
                ? user
                  ? "Submit inquiry"
                  : "Sign in to submit"
                : "Continue"}
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-10 rounded-full border px-3 text-sm",
        active ? "border-accent bg-accent text-accent-fg" : "border-border text-muted hover:text-fg",
      )}
    >
      {children}
    </button>
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="flex h-11 w-full rounded-md border border-border bg-raised px-3 text-sm text-fg"
    >
      <option value="">Select…</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

function YesNo({
  label,
  value,
  onChange,
}: {
  label: string;
  value: "" | "yes" | "no";
  onChange: (v: "" | "yes" | "no") => void;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-2 flex gap-2">
        {(["yes", "no"] as const).map((v) => (
          <Chip key={v} active={value === v} onClick={() => onChange(v)}>
            {v === "yes" ? "Yes" : "No"}
          </Chip>
        ))}
      </div>
    </div>
  );
}
