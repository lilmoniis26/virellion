import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as formatMoney } from "./utils-BTLGo2_i.mjs";
import { x as STUDIO_MEDIA } from "./catalog-CyGgm22L.mjs";
import { t as isSeedCatalogId } from "./catalog-live-DrcRqM9_.mjs";
import { S as Button, _ as createCatalogItem, b as saveCatalogItem, g as useLiveCatalog, v as getStudioCatalog, y as resetCatalogItem } from "./router-DxJdDo-e.mjs";
import { n as Textarea, t as Input } from "./input-B1NnXfay.mjs";
import { t as Label } from "./label-Cmem6H5a.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalog-1xGEZDbN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function listText(values) {
	return values.join("\n");
}
function fromOffer(item) {
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
		packageKind: ""
	};
}
function fromPackage(item) {
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
		packageKind: item.kind
	};
}
function fromDepartment(item) {
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
		packageKind: ""
	};
}
function CatalogPage() {
	const live = useLiveCatalog();
	const [catalog, setCatalog] = (0, import_react.useState)(null);
	const [tab, setTab] = (0, import_react.useState)("offer");
	const [draft, setDraft] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const [saved, setSaved] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [newName, setNewName] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		getStudioCatalog().then(setCatalog).catch((e) => setError(e instanceof Error ? e.message : "Could not load catalog."));
	}, []);
	const items = (0, import_react.useMemo)(() => {
		if (!catalog) return [];
		if (tab === "offer") return catalog.offers.map((item) => ({
			key: item.slug,
			title: item.name,
			price: item.startingPrice,
			image: item.image,
			published: item.published,
			kind: "offer"
		}));
		if (tab === "package") return catalog.packages.map((item) => ({
			key: item.id,
			title: item.name,
			price: item.price,
			image: item.image,
			published: item.published,
			kind: "package",
			suffix: item.priceSuffix
		}));
		return catalog.departments.map((item) => ({
			key: item.id,
			title: item.label,
			price: null,
			image: item.image,
			published: item.published,
			kind: "department"
		}));
	}, [catalog, tab]);
	const open = (kind, id) => {
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
	const persist = async (next) => {
		setCatalog(next);
		live.refresh();
	};
	const save = async () => {
		if (!draft) return;
		setBusy(true);
		setError("");
		setSaved("");
		try {
			const price = draft.price.trim() === "" ? void 0 : Number(draft.price);
			if (draft.kind !== "department" && (price == null || !Number.isFinite(price))) throw new Error("Enter a whole-dollar starting price.");
			const next = await saveCatalogItem({ data: {
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
				packageKind: draft.packageKind
			} });
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
			const next = await resetCatalogItem({ data: {
				kind: draft.kind,
				id: draft.id
			} });
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
			const next = await createCatalogItem({ data: {
				kind: tab,
				name: newName.trim() || fallback
			} });
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
	const onFile = (file) => {
		if (!file || !draft) return;
		if (file.size > 9e5) {
			setError("Keep the image under about 900 KB, or paste an https link.");
			return;
		}
		const reader = new FileReader();
		reader.onload = () => {
			const result = typeof reader.result === "string" ? reader.result : "";
			setDraft((current) => current ? {
				...current,
				image: result
			} : current);
		};
		reader.readAsDataURL(file);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "px-4 py-8 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-[0.18em] text-subtle",
				children: "Catalog"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-3xl text-fg",
				children: "Edit the public catalog"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-sm leading-relaxed text-muted",
				children: "Change names, prices, photographs, and copy from this desk. Unpublish an item to take it off the public site — past orders keep their original title. Restore returns the original published version."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 flex flex-wrap gap-2",
				children: [
					["offer", "Offers"],
					["package", "Packages"],
					["department", "Practices"]
				].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: `h-10 rounded-full border px-4 text-sm ${tab === id ? "border-accent bg-accent text-accent-fg" : "border-border text-muted"}`,
					onClick: () => {
						setTab(id);
						setDraft(null);
						setSaved("");
						setError("");
					},
					children: label
				}, id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex max-w-xl flex-col gap-2 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					placeholder: tab === "offer" ? "New offer name" : tab === "package" ? "New package name" : "New practice name",
					value: newName,
					onChange: (e) => setNewName(e.target.value)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					disabled: busy,
					onClick: () => void create(),
					children: ["Add ", tab === "department" ? "practice" : tab]
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-sm text-danger",
				children: error
			}) : null,
			!catalog && !error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-sm text-muted",
				children: "Loading catalog…"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-8 divide-y divide-border border-y border-border",
				children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-4 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: item.image,
							alt: "",
							className: "size-14 shrink-0 rounded-md object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm text-fg",
								children: item.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-0.5 text-xs text-subtle",
								children: [item.published ? "On the public site" : "Hidden", item.price != null ? ` · ${formatMoney(item.price)}${"suffix" in item && item.suffix ? item.suffix : ""}` : ""]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: draft?.id === item.key ? "primary" : "outline",
							onClick: () => open(item.kind, item.key),
							children: "Edit"
						})
					]
				}, item.key))
			}),
			draft ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-10 max-w-2xl space-y-5 rounded-xl border border-border bg-surface p-6",
				onSubmit: (e) => {
					e.preventDefault();
					save();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-[0.14em] text-subtle",
							children: "Editing"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 font-display text-2xl text-fg",
							children: draft.name
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex h-11 items-center gap-2 text-sm text-fg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: draft.published,
								onChange: (e) => setDraft({
									...draft,
									published: e.target.checked
								})
							}), "Show on site"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "cat-name",
							children: draft.kind === "department" ? "Practice name" : "Name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "cat-name",
							value: draft.name,
							onChange: (e) => setDraft({
								...draft,
								name: e.target.value
							})
						})]
					}),
					draft.kind === "department" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "cat-short",
							children: "Short label"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "cat-short",
							value: draft.shortName,
							onChange: (e) => setDraft({
								...draft,
								shortName: e.target.value
							})
						})]
					}) : null,
					draft.kind === "offer" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "cat-eyebrow",
							children: "Eyebrow"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "cat-eyebrow",
							value: draft.eyebrow,
							onChange: (e) => setDraft({
								...draft,
								eyebrow: e.target.value
							})
						})]
					}) : null,
					draft.kind === "package" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "cat-kind",
							children: "Package type"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							id: "cat-kind",
							className: "h-11 w-full rounded-md border border-border bg-raised px-3 text-sm text-fg",
							value: draft.packageKind,
							onChange: (e) => setDraft({
								...draft,
								packageKind: e.target.value
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "launch",
								children: "Launch — buy now"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "custom",
								children: "Custom — scoped after a conversation"
							})]
						})]
					}) : null,
					draft.kind !== "department" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "cat-price",
								children: "Starting price (USD)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "cat-price",
								inputMode: "numeric",
								value: draft.price,
								onChange: (e) => setDraft({
									...draft,
									price: e.target.value.replace(/[^\d]/g, "")
								})
							})]
						}), draft.kind === "package" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "cat-suffix",
								children: "Price suffix"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "cat-suffix",
								placeholder: "/mo",
								value: draft.priceSuffix,
								onChange: (e) => setDraft({
									...draft,
									priceSuffix: e.target.value
								})
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "cat-timeline",
								children: "Timeline"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "cat-timeline",
								value: draft.timeline,
								onChange: (e) => setDraft({
									...draft,
									timeline: e.target.value
								})
							})]
						})]
					}) : null,
					draft.kind === "package" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "cat-timeline",
							children: "Timeline"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "cat-timeline",
							value: draft.timeline,
							onChange: (e) => setDraft({
								...draft,
								timeline: e.target.value
							})
						})]
					}) : null,
					draft.kind === "offer" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "cat-outcome",
							children: "Outcome"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "cat-outcome",
							value: draft.outcome,
							onChange: (e) => setDraft({
								...draft,
								outcome: e.target.value
							})
						})]
					}) : null,
					draft.kind !== "department" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "cat-summary",
							children: "Summary"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "cat-summary",
							value: draft.summary,
							onChange: (e) => setDraft({
								...draft,
								summary: e.target.value
							})
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "cat-clients",
							children: "Typical clients"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "cat-clients",
							value: draft.typicalClients,
							onChange: (e) => setDraft({
								...draft,
								typicalClients: e.target.value
							})
						})]
					}),
					draft.kind === "offer" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "cat-next",
							children: "Next step"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "cat-next",
							value: draft.nextStep,
							onChange: (e) => setDraft({
								...draft,
								nextStep: e.target.value
							})
						})]
					}) : null,
					draft.kind !== "department" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "cat-del",
							children: "Deliverables (one per line)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "cat-del",
							className: "min-h-40",
							value: draft.deliverablesText,
							onChange: (e) => setDraft({
								...draft,
								deliverablesText: e.target.value
							})
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "cat-cap",
							children: "Capabilities (one per line)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "cat-cap",
							className: "min-h-40",
							value: draft.capabilitiesText,
							onChange: (e) => setDraft({
								...draft,
								capabilitiesText: e.target.value
							})
						})]
					}),
					draft.kind === "offer" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "cat-ex",
							children: "Exclusions (one per line)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "cat-ex",
							value: draft.exclusionsText,
							onChange: (e) => setDraft({
								...draft,
								exclusionsText: e.target.value
							})
						})]
					}) : null,
					draft.kind !== "department" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "cat-deps",
							children: "Related practices (ids, comma separated)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "cat-deps",
							value: draft.departmentsText,
							onChange: (e) => setDraft({
								...draft,
								departmentsText: e.target.value
							}),
							placeholder: "creative, publishing"
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Photograph" }),
							draft.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: draft.image,
								alt: "",
								className: "aspect-photo w-full max-w-sm rounded-lg object-cover"
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-5 gap-2 sm:grid-cols-6",
								children: STUDIO_MEDIA.map((photo) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: `overflow-hidden rounded-md border ${draft.image === photo.src ? "border-accent" : "border-border"}`,
									onClick: () => setDraft({
										...draft,
										image: photo.src,
										imageAlt: photo.alt
									}),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: photo.src,
										alt: photo.label,
										className: "aspect-square w-full object-cover"
									})
								}, photo.src))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "cat-image-url",
								children: "Or image link"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "cat-image-url",
								placeholder: "https://…",
								value: draft.image.startsWith("data:") ? "" : draft.image,
								onChange: (e) => setDraft({
									...draft,
									image: e.target.value
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "cat-file",
								children: "Or upload a file"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "cat-file",
								type: "file",
								accept: "image/jpeg,image/png,image/webp",
								onChange: (e) => onFile(e.target.files?.[0])
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "cat-alt",
								children: "Image description"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "cat-alt",
								value: draft.imageAlt,
								onChange: (e) => setDraft({
									...draft,
									imageAlt: e.target.value
								})
							})
						]
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-danger",
						children: error
					}) : null,
					saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-ok",
						children: saved
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								disabled: busy,
								children: busy ? "Saving…" : "Save changes"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								disabled: busy,
								onClick: () => void reset(),
								children: draft && isSeedCatalogId(draft.kind, draft.id) ? "Restore original" : "Remove"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								onClick: () => setDraft(null),
								children: "Close"
							})
						]
					})
				]
			}) : null
		]
	});
}
//#endregion
export { CatalogPage as component };
