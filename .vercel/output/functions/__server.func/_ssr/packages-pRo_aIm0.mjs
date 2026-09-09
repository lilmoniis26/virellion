import { S as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as formatMoney } from "./utils-BTLGo2_i.mjs";
import { S as Button, f as useSiteCopy, g as useLiveCatalog } from "./router-DxJdDo-e.mjs";
import { t as PageHero } from "./page-hero-CPyRRzn8.mjs";
import { i as itemParam } from "./commerce-BoLC0y_C.mjs";
import { t as CloseCta } from "./close-cta-CpomdH5Y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/packages-pRo_aIm0.js
var import_jsx_runtime = require_jsx_runtime();
function PackagesPage() {
	const { packages } = useLiveCatalog();
	const copy = useSiteCopy();
	const launch = packages.filter((p) => p.kind === "launch");
	const custom = packages.filter((p) => p.kind === "custom");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			src: copy.packages.image,
			alt: copy.packages.imageAlt,
			kicker: copy.packages.kicker,
			title: copy.packages.title,
			dek: copy.packages.dek
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.18em] text-subtle",
						children: copy.packages.sectionDek
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 max-w-2xl font-display text-3xl text-fg sm:text-4xl",
						children: copy.packages.sectionTitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-12 space-y-6",
						children: launch.map((p, i) => {
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "grid overflow-hidden rounded-xl border border-border bg-surface lg:grid-cols-12",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "aspect-photo min-h-48 lg:col-span-4 lg:aspect-auto lg:min-h-full",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: p.image,
										alt: p.imageAlt,
										className: "size-full object-cover"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col p-6 sm:p-8 lg:col-span-8",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start justify-between gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-mono text-xs tabular-nums text-subtle",
												children: String(i + 1).padStart(2, "0")
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "font-mono text-sm tabular-nums text-fg",
												children: [formatMoney(p.price), p.priceSuffix ?? ""]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-3 font-display text-3xl text-fg",
											children: p.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-3 max-w-2xl text-sm leading-relaxed text-muted",
											children: p.summary
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											className: "mt-6 grid gap-2 sm:grid-cols-2",
											children: p.deliverables.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex gap-3 text-sm text-fg/90",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2 size-1 shrink-0 rounded-full bg-accent" }), d]
											}, d))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-8 flex flex-wrap items-end justify-between gap-3 border-t border-border pt-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs uppercase tracking-[0.14em] text-subtle",
												children: p.timeline
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												asChild: true,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
													to: "/checkout",
													search: { item: itemParam("package", p.id) },
													children: [
														"Order ",
														formatMoney(p.price),
														p.priceSuffix ?? ""
													]
												})
											})]
										})
									]
								})]
							}, p.id);
						})
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.18em] text-subtle",
						children: "Custom until proven"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-3xl text-fg",
						children: "Scoped after a conversation."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-10 divide-y divide-border border-y border-border",
						children: custom.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "grid gap-3 py-8 sm:grid-cols-12 sm:items-baseline",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-2xl text-fg sm:col-span-4",
									children: p.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "sm:col-span-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm leading-relaxed text-muted",
										children: p.summary
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-xs uppercase tracking-[0.14em] text-subtle",
										children: p.timeline
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-mono text-sm tabular-nums text-fg sm:col-span-2 sm:text-right",
									children: ["from ", formatMoney(p.price)]
								})
							]
						}, p.id))
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseCta, {
			title: "Request a package, or describe something else.",
			body: "Intake classifies the work. You receive a scope with deliverables, exclusions, timeline, and fee before anything starts."
		})
	] });
}
//#endregion
export { PackagesPage as component };
