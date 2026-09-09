import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MediaPicker } from "@/components/media-picker";
import { useSiteCopy } from "@/components/site-copy-provider";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type SiteCopy } from "@/lib/site-copy";
import { getStudioSiteCopy, resetStudioSiteCopy, saveStudioSiteCopy } from "@/lib/site-copy-data";

export const Route = createFileRoute("/hq/pages")({
  component: PagesEditor,
});

type Tab = "home" | "pages" | "faqs" | "chrome" | "footer";

function PagesEditor() {
  const live = useSiteCopy();
  const [copy, setCopy] = useState<SiteCopy | null>(null);
  const [tab, setTab] = useState<Tab>("home");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    getStudioSiteCopy()
      .then(setCopy)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : "Could not load pages."));
  }, []);

  const persist = async (next: SiteCopy) => {
    setCopy(next);
    live.refresh();
  };

  const save = async () => {
    if (!copy) return;
    setBusy(true);
    setError("");
    setSaved("");
    try {
      const next = await saveStudioSiteCopy({ data: copy });
      await persist(next);
      setSaved("Saved. The public site now uses this copy and photography.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save.");
    } finally {
      setBusy(false);
    }
  };

  const reset = async () => {
    setBusy(true);
    setError("");
    setSaved("");
    try {
      const next = await resetStudioSiteCopy();
      await persist(next);
      setSaved("Restored the original published copy. Terms stay with the operator.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not restore.");
    } finally {
      setBusy(false);
    }
  };

  if (!copy && !error) {
    return (
      <main className="px-4 py-8 sm:px-6">
        <p className="text-sm text-muted">Loading pages…</p>
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

  return (
    <main className="px-4 py-8 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">Site</p>
      <h1 className="mt-2 font-display text-3xl text-fg">Edit public pages</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        Headlines, photographs, navigation, FAQs, and closing copy. Catalog prices and services stay under Catalog.
        Terms of Engagement stay with the operator.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {(
          [
            ["home", "Home"],
            ["pages", "Inner pages"],
            ["faqs", "FAQs & steps"],
            ["chrome", "Nav & contact"],
            ["footer", "Footer & close"],
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
        {tab === "home" ? <HomeFields copy={copy} setCopy={setCopy} /> : null}
        {tab === "pages" ? <InnerFields copy={copy} setCopy={setCopy} /> : null}
        {tab === "faqs" ? <FaqFields copy={copy} setCopy={setCopy} /> : null}
        {tab === "chrome" ? <ChromeFields copy={copy} setCopy={setCopy} /> : null}
        {tab === "footer" ? <FooterFields copy={copy} setCopy={setCopy} /> : null}

        {error ? <p className="text-sm text-danger">{error}</p> : null}
        {saved ? <p className="text-sm text-ok">{saved}</p> : null}

        <div className="flex flex-wrap gap-2">
          <Button type="submit" disabled={busy}>
            {busy ? "Saving…" : "Save pages"}
          </Button>
          <Button type="button" variant="outline" disabled={busy} onClick={() => void reset()}>
            Restore original
          </Button>
        </div>
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

function HomeFields({ copy, setCopy }: { copy: SiteCopy; setCopy: (c: SiteCopy) => void }) {
  const h = copy.home;
  const patch = (partial: Partial<typeof h>) => setCopy({ ...copy, home: { ...h, ...partial } });
  return (
    <div className="space-y-6 rounded-xl border border-border bg-surface p-6">
      <Field id="h-kicker" label="Kicker" value={h.kicker} onChange={(v) => patch({ kicker: v })} />
      <Field id="h-title" label="Headline" value={h.title} onChange={(v) => patch({ title: v })} area />
      <Field id="h-dek" label="Introduction" value={h.dek} onChange={(v) => patch({ dek: v })} area />
      <MediaPicker
        idPrefix="home-hero"
        image={h.image}
        alt={h.imageAlt}
        onImage={(src, alt) => patch({ image: src, imageAlt: alt ?? h.imageAlt })}
        onAlt={(alt) => patch({ imageAlt: alt })}
      />
      <Field id="h-quote" label="Paper band" value={h.paperQuote} onChange={(v) => patch({ paperQuote: v })} area />
      {h.stats.map((stat, i) => (
        <div key={i} className="grid gap-3 sm:grid-cols-2">
          <Field
            id={`stat-k-${i}`}
            label={`Stat ${i + 1} figure`}
            value={stat.k}
            onChange={(v) =>
              patch({ stats: h.stats.map((s, n) => (n === i ? { ...s, k: v } : s)) })
            }
          />
          <Field
            id={`stat-v-${i}`}
            label={`Stat ${i + 1} label`}
            value={stat.v}
            onChange={(v) =>
              patch({ stats: h.stats.map((s, n) => (n === i ? { ...s, v: v } : s)) })
            }
          />
        </div>
      ))}
      <Field id="h-ok" label="Offers kicker" value={h.offersKicker} onChange={(v) => patch({ offersKicker: v })} />
      <Field id="h-ot" label="Offers heading" value={h.offersTitle} onChange={(v) => patch({ offersTitle: v })} area />
      <Field id="h-sk" label="Services kicker" value={h.servicesKicker} onChange={(v) => patch({ servicesKicker: v })} />
      <Field id="h-st" label="Services heading" value={h.servicesTitle} onChange={(v) => patch({ servicesTitle: v })} area />
      <Field id="h-sd" label="Services introduction" value={h.servicesDek} onChange={(v) => patch({ servicesDek: v })} area />
      <Field id="h-uk" label="Studio kicker" value={h.studioKicker} onChange={(v) => patch({ studioKicker: v })} />
      <Field id="h-ut" label="Studio heading" value={h.studioTitle} onChange={(v) => patch({ studioTitle: v })} area />
      <Field id="h-ub1" label="Studio paragraph 1" value={h.studioBody1} onChange={(v) => patch({ studioBody1: v })} area />
      <Field id="h-ub2" label="Studio paragraph 2" value={h.studioBody2} onChange={(v) => patch({ studioBody2: v })} area />
      <MediaPicker
        idPrefix="home-studio"
        image={h.studioImage}
        alt={h.studioImageAlt}
        onImage={(src, alt) => patch({ studioImage: src, studioImageAlt: alt ?? h.studioImageAlt })}
        onAlt={(alt) => patch({ studioImageAlt: alt })}
      />
      <Field id="h-ek" label="Engagement kicker" value={h.engagementKicker} onChange={(v) => patch({ engagementKicker: v })} />
      <Field id="h-et" label="Engagement heading" value={h.engagementTitle} onChange={(v) => patch({ engagementTitle: v })} />
      <Field id="h-pk" label="Packages kicker" value={h.packagesKicker} onChange={(v) => patch({ packagesKicker: v })} />
      <Field id="h-pt" label="Packages heading" value={h.packagesTitle} onChange={(v) => patch({ packagesTitle: v })} />
      <Field id="h-hk" label="How-it-works kicker" value={h.stepsKicker} onChange={(v) => patch({ stepsKicker: v })} />
      <Field id="h-ht" label="How-it-works heading" value={h.stepsTitle} onChange={(v) => patch({ stepsTitle: v })} />
      <Field id="h-fk" label="FAQ kicker" value={h.faqKicker} onChange={(v) => patch({ faqKicker: v })} />
      <Field id="h-ft" label="FAQ heading" value={h.faqTitle} onChange={(v) => patch({ faqTitle: v })} />
    </div>
  );
}

function InnerFields({ copy, setCopy }: { copy: SiteCopy; setCopy: (c: SiteCopy) => void }) {
  return (
    <div className="space-y-10">
      <section className="space-y-5 rounded-xl border border-border bg-surface p-6">
        <h2 className="font-display text-xl text-fg">Services</h2>
        <Field id="s-k" label="Kicker" value={copy.services.kicker} onChange={(v) => setCopy({ ...copy, services: { ...copy.services, kicker: v } })} />
        <Field id="s-t" label="Title" value={copy.services.title} onChange={(v) => setCopy({ ...copy, services: { ...copy.services, title: v } })} area />
        <Field id="s-d" label="Introduction" value={copy.services.dek} onChange={(v) => setCopy({ ...copy, services: { ...copy.services, dek: v } })} area />
        <MediaPicker
          idPrefix="svc"
          image={copy.services.image}
          alt={copy.services.imageAlt}
          onImage={(src, alt) => setCopy({ ...copy, services: { ...copy.services, image: src, imageAlt: alt ?? copy.services.imageAlt } })}
          onAlt={(alt) => setCopy({ ...copy, services: { ...copy.services, imageAlt: alt } })}
        />
      </section>
      <section className="space-y-5 rounded-xl border border-border bg-surface p-6">
        <h2 className="font-display text-xl text-fg">Offers index</h2>
        <Field id="o-k" label="Kicker" value={copy.offers.kicker} onChange={(v) => setCopy({ ...copy, offers: { ...copy.offers, kicker: v } })} />
        <Field id="o-t" label="Title" value={copy.offers.title} onChange={(v) => setCopy({ ...copy, offers: { ...copy.offers, title: v } })} area />
        <Field id="o-d" label="Introduction" value={copy.offers.dek} onChange={(v) => setCopy({ ...copy, offers: { ...copy.offers, dek: v } })} area />
      </section>
      <section className="space-y-5 rounded-xl border border-border bg-surface p-6">
        <h2 className="font-display text-xl text-fg">Packages</h2>
        <Field id="p-k" label="Kicker" value={copy.packages.kicker} onChange={(v) => setCopy({ ...copy, packages: { ...copy.packages, kicker: v } })} />
        <Field id="p-t" label="Title" value={copy.packages.title} onChange={(v) => setCopy({ ...copy, packages: { ...copy.packages, title: v } })} area />
        <Field id="p-d" label="Introduction" value={copy.packages.dek} onChange={(v) => setCopy({ ...copy, packages: { ...copy.packages, dek: v } })} area />
        <Field id="p-st" label="Section heading" value={copy.packages.sectionTitle} onChange={(v) => setCopy({ ...copy, packages: { ...copy.packages, sectionTitle: v } })} area />
        <Field id="p-sd" label="Section label" value={copy.packages.sectionDek} onChange={(v) => setCopy({ ...copy, packages: { ...copy.packages, sectionDek: v } })} />
        <MediaPicker
          idPrefix="pkg"
          image={copy.packages.image}
          alt={copy.packages.imageAlt}
          onImage={(src, alt) => setCopy({ ...copy, packages: { ...copy.packages, image: src, imageAlt: alt ?? copy.packages.imageAlt } })}
          onAlt={(alt) => setCopy({ ...copy, packages: { ...copy.packages, imageAlt: alt } })}
        />
      </section>
      <section className="space-y-5 rounded-xl border border-border bg-surface p-6">
        <h2 className="font-display text-xl text-fg">Approach</h2>
        <Field id="w-k" label="Kicker" value={copy.work.kicker} onChange={(v) => setCopy({ ...copy, work: { ...copy.work, kicker: v } })} />
        <Field id="w-t" label="Title" value={copy.work.title} onChange={(v) => setCopy({ ...copy, work: { ...copy.work, title: v } })} area />
        <Field id="w-d" label="Introduction" value={copy.work.dek} onChange={(v) => setCopy({ ...copy, work: { ...copy.work, dek: v } })} area />
        <Field id="w-p" label="Path heading" value={copy.work.pathTitle} onChange={(v) => setCopy({ ...copy, work: { ...copy.work, pathTitle: v } })} />
        <Field id="w-e" label="Engagement heading" value={copy.work.engagementTitle} onChange={(v) => setCopy({ ...copy, work: { ...copy.work, engagementTitle: v } })} />
        <Field id="w-bt" label="Boundaries heading" value={copy.work.boundariesTitle} onChange={(v) => setCopy({ ...copy, work: { ...copy.work, boundariesTitle: v } })} />
        <MediaPicker
          idPrefix="work"
          image={copy.work.image}
          alt={copy.work.imageAlt}
          onImage={(src, alt) => setCopy({ ...copy, work: { ...copy.work, image: src, imageAlt: alt ?? copy.work.imageAlt } })}
          onAlt={(alt) => setCopy({ ...copy, work: { ...copy.work, imageAlt: alt } })}
        />
        <MediaPicker
          idPrefix="work-eg"
          image={copy.work.engagementImage}
          alt={copy.work.engagementImageAlt}
          onImage={(src, alt) =>
            setCopy({ ...copy, work: { ...copy.work, engagementImage: src, engagementImageAlt: alt ?? copy.work.engagementImageAlt } })
          }
          onAlt={(alt) => setCopy({ ...copy, work: { ...copy.work, engagementImageAlt: alt } })}
        />
      </section>
      <section className="space-y-5 rounded-xl border border-border bg-surface p-6">
        <h2 className="font-display text-xl text-fg">Intake</h2>
        <Field id="st-k" label="Kicker" value={copy.start.kicker} onChange={(v) => setCopy({ ...copy, start: { ...copy.start, kicker: v } })} />
        <Field id="st-t" label="Title" value={copy.start.title} onChange={(v) => setCopy({ ...copy, start: { ...copy.start, title: v } })} />
        <Field id="st-d" label="Introduction" value={copy.start.dek} onChange={(v) => setCopy({ ...copy, start: { ...copy.start, dek: v } })} area />
        <MediaPicker
          idPrefix="start"
          image={copy.start.image}
          alt={copy.start.imageAlt}
          onImage={(src, alt) => setCopy({ ...copy, start: { ...copy.start, image: src, imageAlt: alt ?? copy.start.imageAlt } })}
          onAlt={(alt) => setCopy({ ...copy, start: { ...copy.start, imageAlt: alt } })}
        />
      </section>
      <section className="space-y-5 rounded-xl border border-border bg-surface p-6">
        <h2 className="font-display text-xl text-fg">Reception</h2>
        <Field id="r-k" label="Kicker" value={copy.receptionist.kicker} onChange={(v) => setCopy({ ...copy, receptionist: { ...copy.receptionist, kicker: v } })} />
        <Field id="r-t" label="Title" value={copy.receptionist.title} onChange={(v) => setCopy({ ...copy, receptionist: { ...copy.receptionist, title: v } })} />
        <Field id="r-d" label="Introduction" value={copy.receptionist.dek} onChange={(v) => setCopy({ ...copy, receptionist: { ...copy.receptionist, dek: v } })} area />
        <MediaPicker
          idPrefix="reception"
          image={copy.receptionist.image}
          alt={copy.receptionist.imageAlt}
          onImage={(src, alt) =>
            setCopy({ ...copy, receptionist: { ...copy.receptionist, image: src, imageAlt: alt ?? copy.receptionist.imageAlt } })
          }
          onAlt={(alt) => setCopy({ ...copy, receptionist: { ...copy.receptionist, imageAlt: alt } })}
        />
      </section>
      <section className="space-y-5 rounded-xl border border-border bg-surface p-6">
        <h2 className="font-display text-xl text-fg">Sign-in</h2>
        <Field id="l-k" label="Kicker" value={copy.login.kicker} onChange={(v) => setCopy({ ...copy, login: { ...copy.login, kicker: v } })} />
        <Field id="l-si" label="Sign-in title" value={copy.login.titleSignIn} onChange={(v) => setCopy({ ...copy, login: { ...copy.login, titleSignIn: v } })} />
        <Field id="l-su" label="Create-account title" value={copy.login.titleSignUp} onChange={(v) => setCopy({ ...copy, login: { ...copy.login, titleSignUp: v } })} />
        <Field id="l-d" label="Introduction" value={copy.login.dek} onChange={(v) => setCopy({ ...copy, login: { ...copy.login, dek: v } })} area />
        <Field id="l-b" label="Body" value={copy.login.body} onChange={(v) => setCopy({ ...copy, login: { ...copy.login, body: v } })} area />
      </section>
      <section className="space-y-5 rounded-xl border border-border bg-surface p-6">
        <h2 className="font-display text-xl text-fg">Client account</h2>
        <Field id="a-k" label="Kicker" value={copy.account.kicker} onChange={(v) => setCopy({ ...copy, account: { ...copy.account, kicker: v } })} />
        <Field id="a-t" label="Title" value={copy.account.title} onChange={(v) => setCopy({ ...copy, account: { ...copy.account, title: v } })} />
        <Field id="a-d" label="Introduction" value={copy.account.dek} onChange={(v) => setCopy({ ...copy, account: { ...copy.account, dek: v } })} area />
        <MediaPicker
          idPrefix="account"
          image={copy.account.image}
          alt={copy.account.imageAlt}
          onImage={(src, alt) => setCopy({ ...copy, account: { ...copy.account, image: src, imageAlt: alt ?? copy.account.imageAlt } })}
          onAlt={(alt) => setCopy({ ...copy, account: { ...copy.account, imageAlt: alt } })}
        />
      </section>
    </div>
  );
}

function FaqFields({ copy, setCopy }: { copy: SiteCopy; setCopy: (c: SiteCopy) => void }) {
  return (
    <div className="space-y-8">
      <section className="space-y-5 rounded-xl border border-border bg-surface p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl text-fg">FAQs</h2>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setCopy({ ...copy, faqs: [...copy.faqs, { q: "", a: "" }] })}
          >
            Add question
          </Button>
        </div>
        {copy.faqs.map((faq, i) => (
          <div key={i} className="space-y-3 border-t border-border pt-4">
            <Field
              id={`faq-q-${i}`}
              label={`Question ${i + 1}`}
              value={faq.q}
              onChange={(v) => setCopy({ ...copy, faqs: copy.faqs.map((f, n) => (n === i ? { ...f, q: v } : f)) })}
            />
            <Field
              id={`faq-a-${i}`}
              label="Answer"
              value={faq.a}
              onChange={(v) => setCopy({ ...copy, faqs: copy.faqs.map((f, n) => (n === i ? { ...f, a: v } : f)) })}
              area
            />
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => setCopy({ ...copy, faqs: copy.faqs.filter((_, n) => n !== i) })}
            >
              Remove
            </Button>
          </div>
        ))}
      </section>
      <section className="space-y-5 rounded-xl border border-border bg-surface p-6">
        <h2 className="font-display text-xl text-fg">Public path</h2>
        {copy.steps.map((step, i) => (
          <div key={i} className="space-y-3 border-t border-border pt-4">
            <Field
              id={`step-t-${i}`}
              label={`Step ${step.n} title`}
              value={step.title}
              onChange={(v) => setCopy({ ...copy, steps: copy.steps.map((s, n) => (n === i ? { ...s, title: v } : s)) })}
            />
            <Field
              id={`step-b-${i}`}
              label="Body"
              value={step.body}
              onChange={(v) => setCopy({ ...copy, steps: copy.steps.map((s, n) => (n === i ? { ...s, body: v } : s)) })}
              area
            />
          </div>
        ))}
      </section>
      <section className="space-y-5 rounded-xl border border-border bg-surface p-6">
        <h2 className="font-display text-xl text-fg">Engagement types</h2>
        {copy.engagements.map((item, i) => (
          <div key={item.id} className="space-y-3 border-t border-border pt-4">
            <Field
              id={`eg-l-${i}`}
              label="Label"
              value={item.label}
              onChange={(v) =>
                setCopy({ ...copy, engagements: copy.engagements.map((e, n) => (n === i ? { ...e, label: v } : e)) })
              }
            />
            <Field
              id={`eg-b-${i}`}
              label="Best for"
              value={item.bestFor}
              onChange={(v) =>
                setCopy({ ...copy, engagements: copy.engagements.map((e, n) => (n === i ? { ...e, bestFor: v } : e)) })
              }
            />
            <Field
              id={`eg-x-${i}`}
              label="Examples"
              value={item.examples}
              onChange={(v) =>
                setCopy({ ...copy, engagements: copy.engagements.map((e, n) => (n === i ? { ...e, examples: v } : e)) })
              }
              area
            />
          </div>
        ))}
      </section>
      <section className="space-y-5 rounded-xl border border-border bg-surface p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl text-fg">Studio boundaries</h2>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setCopy({ ...copy, boundaries: [...copy.boundaries, ""] })}
          >
            Add line
          </Button>
        </div>
        {copy.boundaries.map((line, i) => (
          <div key={i} className="space-y-3 border-t border-border pt-4">
            <Field
              id={`bd-${i}`}
              label={`Boundary ${i + 1}`}
              value={line}
              onChange={(v) => setCopy({ ...copy, boundaries: copy.boundaries.map((b, n) => (n === i ? v : b)) })}
              area
            />
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => setCopy({ ...copy, boundaries: copy.boundaries.filter((_, n) => n !== i) })}
            >
              Remove
            </Button>
          </div>
        ))}
      </section>
    </div>
  );
}

function ChromeFields({ copy, setCopy }: { copy: SiteCopy; setCopy: (c: SiteCopy) => void }) {
  return (
    <div className="space-y-10">
      <section className="space-y-5 rounded-xl border border-border bg-surface p-6">
        <h2 className="font-display text-xl text-fg">Navigation labels</h2>
        <Field id="n-s" label="Services" value={copy.nav.services} onChange={(v) => setCopy({ ...copy, nav: { ...copy.nav, services: v } })} />
        <Field id="n-o" label="Offers" value={copy.nav.offers} onChange={(v) => setCopy({ ...copy, nav: { ...copy.nav, offers: v } })} />
        <Field id="n-p" label="Packages" value={copy.nav.packages} onChange={(v) => setCopy({ ...copy, nav: { ...copy.nav, packages: v } })} />
        <Field id="n-w" label="Approach" value={copy.nav.work} onChange={(v) => setCopy({ ...copy, nav: { ...copy.nav, work: v } })} />
        <Field id="n-st" label="Start button" value={copy.nav.startCta} onChange={(v) => setCopy({ ...copy, nav: { ...copy.nav, startCta: v } })} />
        <Field id="n-r" label="Reception link" value={copy.nav.receptionCta} onChange={(v) => setCopy({ ...copy, nav: { ...copy.nav, receptionCta: v } })} />
      </section>
      <section className="space-y-5 rounded-xl border border-border bg-surface p-6">
        <h2 className="font-display text-xl text-fg">Public contact</h2>
        <p className="text-sm text-muted">Shown in the footer. This is display copy — not domain, DNS, or banking details.</p>
        <Field id="c-e" label="Public email" value={copy.contact.email} onChange={(v) => setCopy({ ...copy, contact: { ...copy.contact, email: v } })} />
        <Field id="c-p" label="Public phone" value={copy.contact.phone} onChange={(v) => setCopy({ ...copy, contact: { ...copy.contact, phone: v } })} />
        <Field id="c-a" label="Address line" value={copy.contact.addressLine} onChange={(v) => setCopy({ ...copy, contact: { ...copy.contact, addressLine: v } })} />
      </section>
    </div>
  );
}

function FooterFields({ copy, setCopy }: { copy: SiteCopy; setCopy: (c: SiteCopy) => void }) {
  return (
    <div className="space-y-6 rounded-xl border border-border bg-surface p-6">
      <Field
        id="f-b"
        label="Footer blurb"
        value={copy.footer.blurb}
        onChange={(v) => setCopy({ ...copy, footer: { ...copy.footer, blurb: v } })}
        area
      />
      <Field
        id="f-l"
        label="Footer legal line"
        value={copy.footer.legalLine}
        onChange={(v) => setCopy({ ...copy, footer: { ...copy.footer, legalLine: v } })}
        area
      />
      <Field
        id="c-t"
        label="Closing title"
        value={copy.cta.title}
        onChange={(v) => setCopy({ ...copy, cta: { ...copy.cta, title: v } })}
      />
      <Field
        id="c-b"
        label="Closing body"
        value={copy.cta.body}
        onChange={(v) => setCopy({ ...copy, cta: { ...copy.cta, body: v } })}
        area
      />
      <Field
        id="c-sl"
        label="Closing start button"
        value={copy.cta.startLabel}
        onChange={(v) => setCopy({ ...copy, cta: { ...copy.cta, startLabel: v } })}
      />
      <Field
        id="c-rl"
        label="Closing reception button"
        value={copy.cta.receptionLabel}
        onChange={(v) => setCopy({ ...copy, cta: { ...copy.cta, receptionLabel: v } })}
      />
    </div>
  );
}
