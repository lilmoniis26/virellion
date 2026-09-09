import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useLiveCatalog } from "@/components/catalog-provider";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { STUDIO_MEDIA } from "@/lib/catalog";
import {
  createCatalogItem,
  getStudioCatalog,
  resetCatalogItem,
  saveCatalogItem,
} from "@/lib/catalog-data";
import {
  isSeedCatalogId,
  type CatalogItemKind,
  type LiveCatalog,
  type LiveDepartment,
  type LiveOffer,
  type LivePackage,
} from "@/lib/catalog-live";
import { formatMoney } from "@/lib/utils";

export const Route = createFileRoute("/hq/catalog")({
  component: CatalogPage,
});

type Tab = CatalogItemKind;
type Draft = {
  kind: CatalogItemKind;
  id: string;
  published: boolean;
  name: string;
  shortName: string;
  eyebrow: string;
  summary: string;
  outcome: string;
  timeline: string;
  nextStep: string;
  typicalClients: string;
  price: string;
  priceSuffix: string;
  image: string;
  imageAlt: string;
  deliverablesText: string;
  exclusionsText: string;
  capabilitiesText: string;
  departmentsText: string;
  packageKind: "launch" | "custom" | "";
};

function listText(values: string[]) {
  return values.join("\n");
}

function fromOffer(item: LiveOffer): Draft {
  return {
    kind: "offer",
    id: item.slug,
    published: item.published,
    name: item.name,
    shortName: "",
    eyebrow: item.eyebrow,
    summary: item.summary,
    outcome: item.outcome,
    timeline: item.timeline,
    nextStep: item.nextStep,
    typicalClients: "",
    price: String(item.startingPrice),
    priceSuffix: "",
    image: item.image,
    imageAlt: item.imageAlt,
    deliverablesText: listText(item.deliverables),
    exclusionsText: listText(item.exclusions),
    capabilitiesText: "",
    departmentsText: item.departments.join(", "),
    packageKind: "",
  };
}

function fromPackage(item: LivePackage): Draft {
  return {
    kind: "package",
    id: item.id,
    published: item.published,
    name: item.name,
    shortName: "",
    eyebrow: item.kind === "launch" ? "Launch package" : "Custom",
    summary: item.summary,
    outcome: "",
    timeline: item.timeline,
    nextStep: "",
    typicalClients: "",
    price: String(item.price),
    priceSuffix: item.priceSuffix ?? "",
    image: item.image,
    imageAlt: item.imageAlt,
    deliverablesText: listText(item.deliverables),
    exclusionsText: "",
    capabilitiesText: "",
    departmentsText: item.departments.join(", "),
    packageKind: item.kind,
  };
}

function fromDepartment(item: LiveDepartment): Draft {
  return {
    kind: "department",
    id: item.id,
    published: item.published,
    name: item.label,
    shortName: item.short,
    eyebrow: "",
    summary: "",
    outcome: "",
    timeline: "",
    nextStep: "",
    typicalClients: item.typicalClients,
    price: "",
    priceSuffix: "",
    image: item.image,
    imageAlt: item.imageAlt,
    deliverablesText: "",
    exclusionsText: "",
    capabilitiesText: listText(item.capabilities),
    departmentsText: "",
    packageKind: "",
  };
}

function CatalogPage() {
  const live = useLiveCatalog();
  const [catalog, setCatalog] = useState<LiveCatalog | null>(null);
  const [tab, setTab] = useState<Tab>("offer");
  const [draft, setDraft] = useState<Draft | null>(null);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState("");
  const [busy, setBusy] = useState(false);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    getStudioCatalog()
      .then(setCatalog)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : "Could not load catalog."));
  }, []);

  const items = useMemo(() => {
    if (!catalog) return [];
    if (tab === "offer") return catalog.offers.map((item) => ({ key: item.slug, title: item.name, price: item.startingPrice, image: item.image, published: item.published, kind: "offer" as const }));
    if (tab === "package") return catalog.packages.map((item) => ({ key: item.id, title: item.name, price: item.price, image: item.image, published: item.published, kind: "package" as const, suffix: item.priceSuffix }));
    return catalog.departments.map((item) => ({ key: item.id, title: item.label, price: null, image: item.image, published: item.published, kind: "department" as const }));
  }, [catalog, tab]);

  const open = (kind: CatalogItemKind, id: string) => {
    if (!catalog) return;
    setSaved("");
    setError("");
    if (kind === "offer") {
      const item = catalog.offers.find((row) => row.slug === id);
      if (item) setDraft(fromOffer(item));
    } else if (kind === "package") {
      const item = catalog.packages.find((row) => row.id === id);
      if (item) setDraft(fromPackage(item));
    } else {
      const item = catalog.departments.find((row) => row.id === id);
      if (item) setDraft(fromDepartment(item));
    }
  };

  const persist = async (next: LiveCatalog) => {
    setCatalog(next);
    live.refresh();
  };

  const save = async () => {
    if (!draft) return;
    setBusy(true);
    setError("");
    setSaved("");
    try {
      const price = draft.price.trim() === "" ? undefined : Number(draft.price);
      if (draft.kind !== "department" && (price == null || !Number.isFinite(price))) {
        throw new Error("Enter a whole-dollar starting price.");
      }
      const next = await saveCatalogItem({
        data: {
          kind: draft.kind,
          id: draft.id,
          published: draft.published,
          name: draft.name,
          shortName: draft.shortName,
          eyebrow: draft.eyebrow,
          summary: draft.summary,
          outcome: draft.outcome,
          timeline: draft.timeline,
          nextStep: draft.nextStep,
          typicalClients: draft.typicalClients,
          price,
          priceSuffix: draft.priceSuffix,
          image: draft.image,
          imageAlt: draft.imageAlt,
          deliverablesText: draft.deliverablesText,
          exclusionsText: draft.exclusionsText,
          capabilitiesText: draft.capabilitiesText,
          departmentsText: draft.departmentsText,
          packageKind: draft.packageKind,
        },
      });
      await persist(next);
      setSaved("Saved. The public site now uses this copy, price, and photograph.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save.");
    } finally {
      setBusy(false);
    }
  };

  const reset = async () => {
    if (!draft) return;
    setBusy(true);
    setError("");
    setSaved("");
    try {
      const next = await resetCatalogItem({ data: { kind: draft.kind, id: draft.id } });
      await persist(next);
      if (draft.kind === "offer") {
        const item = next.offers.find((row) => row.slug === draft.id);
        if (item) setDraft(fromOffer(item));
        else setDraft(null);
      } else if (draft.kind === "package") {
        const item = next.packages.find((row) => row.id === draft.id);
        if (item) setDraft(fromPackage(item));
        else setDraft(null);
      } else {
        const item = next.departments.find((row) => row.id === draft.id);
        if (item) setDraft(fromDepartment(item));
      }
      setSaved(isSeedCatalogId(draft.kind, draft.id) ? "Restored the original published copy for this item." : "Removed from the catalog.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not restore.");
    } finally {
      setBusy(false);
    }
  };

  const create = async () => {
    setBusy(true);
    setError("");
    setSaved("");
    try {
      const fallback = tab === "offer" ? "New offer" : tab === "package" ? "New package" : "New practice";
      const next = await createCatalogItem({
        data: { kind: tab, name: newName.trim() || fallback },
      });
      await persist(next);
      setNewName("");
      if (tab === "offer") {
        const created = next.offers.find((row) => row.custom && !catalog?.offers.some((o) => o.slug === row.slug));
        if (created) open("offer", created.slug);
      } else if (tab === "package") {
        const created = next.packages.find((row) => row.custom && !catalog?.packages.some((p) => p.id === row.id));
        if (created) open("package", created.id);
      } else {
        const created = next.departments.find((row) => row.custom && !catalog?.departments.some((d) => d.id === row.id));
        if (created) open("department", created.id);
      }
      setSaved("Added. Fill in the copy, price, and photograph, then publish.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not add the item.");
    } finally {
      setBusy(false);
    }
  };

  const onFile = (file: File | undefined) => {
    if (!file || !draft) return;
    if (file.size > 900_000) {
      setError("Keep the image under about 900 KB, or paste an https link.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      setDraft((current) => (current ? { ...current, image: result } : current));
    };
    reader.readAsDataURL(file);
  };

  return (
    <main className="px-4 py-8 sm:px-6">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">Catalog</p>
      <h1 className="mt-2 font-display text-3xl text-fg">Edit the public catalog</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        Change names, prices, photographs, and copy from this desk. Unpublish an item to take it off the public site —
        past orders keep their original title. Restore returns the original published version.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {(
          [
            ["offer", "Offers"],
            ["package", "Packages"],
            ["department", "Practices"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={`h-10 rounded-full border px-4 text-sm ${
              tab === id ? "border-accent bg-accent text-accent-fg" : "border-border text-muted"
            }`}
            onClick={() => {
              setTab(id);
              setDraft(null);
              setSaved("");
              setError("");
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-6 flex max-w-xl flex-col gap-2 sm:flex-row">
        <Input
          placeholder={tab === "offer" ? "New offer name" : tab === "package" ? "New package name" : "New practice name"}
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <Button type="button" variant="outline" disabled={busy} onClick={() => void create()}>
          Add {tab === "department" ? "practice" : tab}
        </Button>
      </div>

      {error ? <p className="mt-6 text-sm text-danger">{error}</p> : null}

      {!catalog && !error ? <p className="mt-8 text-sm text-muted">Loading catalog…</p> : null}

      <ul className="mt-8 divide-y divide-border border-y border-border">
        {items.map((item) => (
          <li key={item.key} className="flex items-center gap-4 py-4">
            <img src={item.image} alt="" className="size-14 shrink-0 rounded-md object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-fg">{item.title}</p>
              <p className="mt-0.5 text-xs text-subtle">
                {item.published ? "On the public site" : "Hidden"}
                {item.price != null ? ` · ${formatMoney(item.price)}${"suffix" in item && item.suffix ? item.suffix : ""}` : ""}
              </p>
            </div>
            <Button size="sm" variant={draft?.id === item.key ? "primary" : "outline"} onClick={() => open(item.kind, item.key)}>
              Edit
            </Button>
          </li>
        ))}
      </ul>

      {draft ? (
        <form
          className="mt-10 max-w-2xl space-y-5 rounded-xl border border-border bg-surface p-6"
          onSubmit={(e) => {
            e.preventDefault();
            void save();
          }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-subtle">Editing</p>
              <h2 className="mt-1 font-display text-2xl text-fg">{draft.name}</h2>
            </div>
            <label className="flex h-11 items-center gap-2 text-sm text-fg">
              <input
                type="checkbox"
                checked={draft.published}
                onChange={(e) => setDraft({ ...draft, published: e.target.checked })}
              />
              Show on site
            </label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cat-name">{draft.kind === "department" ? "Practice name" : "Name"}</Label>
            <Input id="cat-name" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
          </div>

          {draft.kind === "department" ? (
            <div className="space-y-2">
              <Label htmlFor="cat-short">Short label</Label>
              <Input id="cat-short" value={draft.shortName} onChange={(e) => setDraft({ ...draft, shortName: e.target.value })} />
            </div>
          ) : null}

          {draft.kind === "offer" ? (
            <div className="space-y-2">
              <Label htmlFor="cat-eyebrow">Eyebrow</Label>
              <Input id="cat-eyebrow" value={draft.eyebrow} onChange={(e) => setDraft({ ...draft, eyebrow: e.target.value })} />
            </div>
          ) : null}

          {draft.kind === "package" ? (
            <div className="space-y-2">
              <Label htmlFor="cat-kind">Package type</Label>
              <select
                id="cat-kind"
                className="h-11 w-full rounded-md border border-border bg-raised px-3 text-sm text-fg"
                value={draft.packageKind}
                onChange={(e) => setDraft({ ...draft, packageKind: e.target.value as "launch" | "custom" })}
              >
                <option value="launch">Launch — buy now</option>
                <option value="custom">Custom — scoped after a conversation</option>
              </select>
            </div>
          ) : null}

          {draft.kind !== "department" ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="cat-price">Starting price (USD)</Label>
                <Input
                  id="cat-price"
                  inputMode="numeric"
                  value={draft.price}
                  onChange={(e) => setDraft({ ...draft, price: e.target.value.replace(/[^\d]/g, "") })}
                />
              </div>
              {draft.kind === "package" ? (
                <div className="space-y-2">
                  <Label htmlFor="cat-suffix">Price suffix</Label>
                  <Input
                    id="cat-suffix"
                    placeholder="/mo"
                    value={draft.priceSuffix}
                    onChange={(e) => setDraft({ ...draft, priceSuffix: e.target.value })}
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="cat-timeline">Timeline</Label>
                  <Input id="cat-timeline" value={draft.timeline} onChange={(e) => setDraft({ ...draft, timeline: e.target.value })} />
                </div>
              )}
            </div>
          ) : null}

          {draft.kind === "package" ? (
            <div className="space-y-2">
              <Label htmlFor="cat-timeline">Timeline</Label>
              <Input id="cat-timeline" value={draft.timeline} onChange={(e) => setDraft({ ...draft, timeline: e.target.value })} />
            </div>
          ) : null}

          {draft.kind === "offer" ? (
            <div className="space-y-2">
              <Label htmlFor="cat-outcome">Outcome</Label>
              <Textarea id="cat-outcome" value={draft.outcome} onChange={(e) => setDraft({ ...draft, outcome: e.target.value })} />
            </div>
          ) : null}

          {draft.kind !== "department" ? (
            <div className="space-y-2">
              <Label htmlFor="cat-summary">Summary</Label>
              <Textarea id="cat-summary" value={draft.summary} onChange={(e) => setDraft({ ...draft, summary: e.target.value })} />
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="cat-clients">Typical clients</Label>
              <Input
                id="cat-clients"
                value={draft.typicalClients}
                onChange={(e) => setDraft({ ...draft, typicalClients: e.target.value })}
              />
            </div>
          )}

          {draft.kind === "offer" ? (
            <div className="space-y-2">
              <Label htmlFor="cat-next">Next step</Label>
              <Textarea id="cat-next" value={draft.nextStep} onChange={(e) => setDraft({ ...draft, nextStep: e.target.value })} />
            </div>
          ) : null}

          {draft.kind !== "department" ? (
            <div className="space-y-2">
              <Label htmlFor="cat-del">Deliverables (one per line)</Label>
              <Textarea id="cat-del" className="min-h-40" value={draft.deliverablesText} onChange={(e) => setDraft({ ...draft, deliverablesText: e.target.value })} />
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="cat-cap">Capabilities (one per line)</Label>
              <Textarea id="cat-cap" className="min-h-40" value={draft.capabilitiesText} onChange={(e) => setDraft({ ...draft, capabilitiesText: e.target.value })} />
            </div>
          )}

          {draft.kind === "offer" ? (
            <div className="space-y-2">
              <Label htmlFor="cat-ex">Exclusions (one per line)</Label>
              <Textarea id="cat-ex" value={draft.exclusionsText} onChange={(e) => setDraft({ ...draft, exclusionsText: e.target.value })} />
            </div>
          ) : null}

          {draft.kind !== "department" ? (
            <div className="space-y-2">
              <Label htmlFor="cat-deps">Related practices (ids, comma separated)</Label>
              <Input
                id="cat-deps"
                value={draft.departmentsText}
                onChange={(e) => setDraft({ ...draft, departmentsText: e.target.value })}
                placeholder="creative, publishing"
              />
            </div>
          ) : null}

          <div className="space-y-2">
            <Label>Photograph</Label>
            {draft.image ? <img src={draft.image} alt="" className="aspect-photo w-full max-w-sm rounded-lg object-cover" /> : null}
            <div className="grid grid-cols-5 gap-2 sm:grid-cols-6">
              {STUDIO_MEDIA.map((photo) => (
                <button
                  key={photo.src}
                  type="button"
                  className={`overflow-hidden rounded-md border ${draft.image === photo.src ? "border-accent" : "border-border"}`}
                  onClick={() => setDraft({ ...draft, image: photo.src, imageAlt: photo.alt })}
                >
                  <img src={photo.src} alt={photo.label} className="aspect-square w-full object-cover" />
                </button>
              ))}
            </div>
            <Label htmlFor="cat-image-url">Or image link</Label>
            <Input
              id="cat-image-url"
              placeholder="https://…"
              value={draft.image.startsWith("data:") ? "" : draft.image}
              onChange={(e) => setDraft({ ...draft, image: e.target.value })}
            />
            <Label htmlFor="cat-file">Or upload a file</Label>
            <Input id="cat-file" type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => onFile(e.target.files?.[0])} />
            <Label htmlFor="cat-alt">Image description</Label>
            <Input id="cat-alt" value={draft.imageAlt} onChange={(e) => setDraft({ ...draft, imageAlt: e.target.value })} />
          </div>

          {error ? <p className="text-sm text-danger">{error}</p> : null}
          {saved ? <p className="text-sm text-ok">{saved}</p> : null}

          <div className="flex flex-wrap gap-2">
            <Button type="submit" disabled={busy}>
              {busy ? "Saving…" : "Save changes"}
            </Button>
            <Button type="button" variant="outline" disabled={busy} onClick={() => void reset()}>
              {draft && isSeedCatalogId(draft.kind, draft.id) ? "Restore original" : "Remove"}
            </Button>
            <Button type="button" variant="ghost" onClick={() => setDraft(null)}>
              Close
            </Button>
          </div>
        </form>
      ) : null}
    </main>
  );
}
