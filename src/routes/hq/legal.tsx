import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useStudioProfile } from "@/components/auth-slot";
import { MediaPicker } from "@/components/media-picker";
import { useSiteCopy } from "@/components/site-copy-provider";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isOperator } from "@/lib/access";
import { type LegalCopy, type SiteCopy } from "@/lib/site-copy";
import { getStudioSiteCopy, saveStudioSiteCopy } from "@/lib/site-copy-data";

export const Route = createFileRoute("/hq/legal")({
  component: LegalEditor,
});

function LegalEditor() {
  const { profile } = useStudioProfile();
  const live = useSiteCopy();
  const [copy, setCopy] = useState<SiteCopy | null>(null);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState("");
  const [busy, setBusy] = useState(false);
  const [tab, setTab] = useState<"terms" | "privacy" | "notice">("terms");

  useEffect(() => {
    if (!isOperator(profile?.role)) return;
    getStudioSiteCopy()
      .then(setCopy)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : "Could not load terms."));
  }, [profile?.role]);

  if (profile && !isOperator(profile.role)) {
    return (
      <main className="px-4 py-8 sm:px-6">
        <h1 className="font-display text-3xl text-fg">Terms</h1>
        <p className="mt-3 max-w-xl text-sm text-muted">
          Only the studio operator can edit Terms of Engagement and the Privacy Notice.
        </p>
      </main>
    );
  }

  const save = async () => {
    if (!copy) return;
    setBusy(true);
    setError("");
    setSaved("");
    try {
      const next = await saveStudioSiteCopy({ data: copy });
      setCopy(next);
      live.refresh();
      setSaved("Saved. New inquiries and orders will record this version.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save.");
    } finally {
      setBusy(false);
    }
  };

  if (!copy && !error) {
    return (
      <main className="px-4 py-8 sm:px-6">
        <p className="text-sm text-muted">Loading terms…</p>
      </main>
    );
  }
  if (!copy) {
    return (
      <main className="px-4 py-8 sm:px-6">
        <p className="text-sm text-danger">{error}</p>
      </main>
    );
  }

  const legal = copy.legal;
  const setLegal = (partial: Partial<LegalCopy>) => setCopy({ ...copy, legal: { ...legal, ...partial } });

  return (
    <main className="px-4 py-8 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">Operator</p>
      <h1 className="mt-2 font-display text-3xl text-fg">Terms & privacy</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        These pages are the agreement clients accept. Partners cannot edit them. Domain, DNS, and password recovery are
        not available in this desk.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {(
          [
            ["terms", "Terms"],
            ["privacy", "Privacy"],
            ["notice", "Checkout notice"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={`h-10 rounded-full border px-4 text-sm ${
              tab === id ? "border-accent bg-accent text-accent-fg" : "border-border text-muted"
            }`}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <form
        className="mt-8 max-w-2xl space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          void save();
        }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="ver" label="Version" value={legal.version} onChange={(v) => setLegal({ version: v })} />
          <Field id="eff" label="Effective date" value={legal.effective} onChange={(v) => setLegal({ effective: v })} />
        </div>

        {tab === "terms" ? (
          <section className="space-y-5 rounded-xl border border-border bg-surface p-6">
            <Field id="tk" label="Kicker" value={legal.termsKicker} onChange={(v) => setLegal({ termsKicker: v })} />
            <Field id="tt" label="Title" value={legal.termsTitle} onChange={(v) => setLegal({ termsTitle: v })} />
            <Field id="td" label="Introduction" value={legal.termsDek} onChange={(v) => setLegal({ termsDek: v })} area />
            <MediaPicker
              idPrefix="terms"
              image={legal.termsImage}
              alt={legal.termsImageAlt}
              onImage={(src, alt) => setLegal({ termsImage: src, termsImageAlt: alt ?? legal.termsImageAlt })}
              onAlt={(alt) => setLegal({ termsImageAlt: alt })}
            />
            {legal.terms.map((section, i) => (
              <div key={i} className="space-y-3 border-t border-border pt-4">
                <Field
                  id={`th-${i}`}
                  label={`Section ${i + 1} heading`}
                  value={section.heading}
                  onChange={(v) =>
                    setLegal({
                      terms: legal.terms.map((s, n) => (n === i ? { ...s, heading: v } : s)),
                    })
                  }
                />
                <Field
                  id={`tp-${i}`}
                  label="Paragraphs (blank line between)"
                  value={section.paragraphs.join("\n\n")}
                  onChange={(v) =>
                    setLegal({
                      terms: legal.terms.map((s, n) =>
                        n === i ? { ...s, paragraphs: v.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean) } : s,
                      ),
                    })
                  }
                  area
                />
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => setLegal({ terms: legal.terms.filter((_, n) => n !== i) })}
                >
                  Remove section
                </Button>
              </div>
            ))}
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => setLegal({ terms: [...legal.terms, { heading: "", paragraphs: [""] }] })}
            >
              Add section
            </Button>
          </section>
        ) : null}

        {tab === "privacy" ? (
          <section className="space-y-5 rounded-xl border border-border bg-surface p-6">
            <Field id="pk" label="Kicker" value={legal.privacyKicker} onChange={(v) => setLegal({ privacyKicker: v })} />
            <Field id="pt" label="Title" value={legal.privacyTitle} onChange={(v) => setLegal({ privacyTitle: v })} />
            <Field id="pd" label="Introduction" value={legal.privacyDek} onChange={(v) => setLegal({ privacyDek: v })} area />
            <MediaPicker
              idPrefix="privacy"
              image={legal.privacyImage}
              alt={legal.privacyImageAlt}
              onImage={(src, alt) => setLegal({ privacyImage: src, privacyImageAlt: alt ?? legal.privacyImageAlt })}
              onAlt={(alt) => setLegal({ privacyImageAlt: alt })}
            />
            {legal.privacy.map((section, i) => (
              <div key={i} className="space-y-3 border-t border-border pt-4">
                <Field
                  id={`ph-${i}`}
                  label={`Section ${i + 1} heading`}
                  value={section.heading}
                  onChange={(v) =>
                    setLegal({
                      privacy: legal.privacy.map((s, n) => (n === i ? { ...s, heading: v } : s)),
                    })
                  }
                />
                <Field
                  id={`pp-${i}`}
                  label="Paragraphs (blank line between)"
                  value={section.paragraphs.join("\n\n")}
                  onChange={(v) =>
                    setLegal({
                      privacy: legal.privacy.map((s, n) =>
                        n === i ? { ...s, paragraphs: v.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean) } : s,
                      ),
                    })
                  }
                  area
                />
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => setLegal({ privacy: legal.privacy.filter((_, n) => n !== i) })}
                >
                  Remove section
                </Button>
              </div>
            ))}
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => setLegal({ privacy: [...legal.privacy, { heading: "", paragraphs: [""] }] })}
            >
              Add section
            </Button>
          </section>
        ) : null}

        {tab === "notice" ? (
          <section className="space-y-5 rounded-xl border border-border bg-surface p-6">
            <p className="text-sm text-muted">Shown on checkout and intake before a client agrees.</p>
            <div>
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl text-fg">Clients allow</h2>
                <Button type="button" size="sm" variant="outline" onClick={() => setLegal({ allows: [...legal.allows, ""] })}>
                  Add
                </Button>
              </div>
              {legal.allows.map((item, i) => (
                <div key={i} className="mt-4 space-y-2">
                  <Field
                    id={`al-${i}`}
                    label={`Item ${i + 1}`}
                    value={item}
                    onChange={(v) => setLegal({ allows: legal.allows.map((row, n) => (n === i ? v : row)) })}
                    area
                  />
                  <Button type="button" size="sm" variant="ghost" onClick={() => setLegal({ allows: legal.allows.filter((_, n) => n !== i) })}>
                    Remove
                  </Button>
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl text-fg">Clients do not allow</h2>
                <Button type="button" size="sm" variant="outline" onClick={() => setLegal({ doesNot: [...legal.doesNot, ""] })}>
                  Add
                </Button>
              </div>
              {legal.doesNot.map((item, i) => (
                <div key={i} className="mt-4 space-y-2">
                  <Field
                    id={`dn-${i}`}
                    label={`Item ${i + 1}`}
                    value={item}
                    onChange={(v) => setLegal({ doesNot: legal.doesNot.map((row, n) => (n === i ? v : row)) })}
                    area
                  />
                  <Button type="button" size="sm" variant="ghost" onClick={() => setLegal({ doesNot: legal.doesNot.filter((_, n) => n !== i) })}>
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {error ? <p className="text-sm text-danger">{error}</p> : null}
        {saved ? <p className="text-sm text-ok">{saved}</p> : null}
        <Button type="submit" disabled={busy}>
          {busy ? "Saving…" : "Save terms"}
        </Button>
      </form>
    </main>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  area,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  area?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {area ? (
        <Textarea id={id} value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <Input id={id} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}
