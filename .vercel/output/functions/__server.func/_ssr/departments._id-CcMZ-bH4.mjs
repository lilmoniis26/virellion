import { H as notFound, S as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as formatMoney } from "./utils-BTLGo2_i.mjs";
import { b as SPECIALISTS, o as DEPARTMENTS } from "./catalog-CyGgm22L.mjs";
import { g as useLiveCatalog, s as Route$17 } from "./router-DxJdDo-e.mjs";
import { t as PageHero } from "./page-hero-CPyRRzn8.mjs";
import { t as CloseCta } from "./close-cta-CpomdH5Y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/departments._id-CcMZ-bH4.js
var import_jsx_runtime = require_jsx_runtime();
function DepartmentPage() {
	const { id } = Route$17.useParams();
	const { departments, offers, packages } = useLiveCatalog();
	const dept = departments.find((d) => d.id === id);
	if (!dept) throw notFound();
	const relatedOffers = offers.filter((o) => o.departments.includes(dept.id));
	const relatedPackages = packages.filter((p) => p.departments.includes(dept.id));
	const specialists = SPECIALISTS.filter((s) => s.department === dept.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			src: dept.image,
			alt: dept.imageAlt,
			kicker: "Practice",
			title: dept.label,
			dek: dept.typicalClients
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-4 py-16 sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.18em] text-subtle",
						children: "Capabilities"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 max-w-2xl font-display text-3xl text-fg",
						children: "What this practice finishes."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3",
						children: dept.capabilities.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "bg-surface px-5 py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs tabular-nums text-subtle",
								children: String(i + 1).padStart(2, "0")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-fg",
								children: c
							})]
						}, c))
					})
				]
			})
		}),
		specialists.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-4 py-16 sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.18em] text-subtle",
						children: "Studio roles"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-3xl text-fg",
						children: "Who owns the work."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-10 divide-y divide-border border-y border-border",
						children: specialists.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "grid gap-2 py-5 sm:grid-cols-12 sm:items-baseline",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-xl text-fg sm:col-span-4",
								children: s.role
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm leading-relaxed text-muted sm:col-span-8",
								children: s.responsibility
							})]
						}, s.role))
					})
				]
			})
		}) : null,
		relatedOffers.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-4 py-16 sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.18em] text-subtle",
						children: "Flagship offers"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-3xl text-fg",
						children: "Where this practice appears."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 grid gap-5 lg:grid-cols-3",
						children: relatedOffers.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/offers/$slug",
							params: { slug: o.slug },
							className: "group flex flex-col overflow-hidden rounded-xl border border-border bg-surface",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "aspect-photo overflow-hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: o.image,
									alt: o.imageAlt,
									className: "size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-1 flex-col p-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs uppercase tracking-[0.16em] text-subtle",
										children: o.eyebrow
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-2 font-display text-2xl leading-tight text-fg",
										children: o.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-5 text-sm text-fg",
										children: ["From ", formatMoney(o.startingPrice)]
									})
								]
							})]
						}, o.slug))
					})
				]
			})
		}) : null,
		relatedPackages.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-4 py-16 sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.18em] text-subtle",
						children: "Packages"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-8 divide-y divide-border border-y border-border",
						children: relatedPackages.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "grid gap-2 py-5 sm:grid-cols-12 sm:items-baseline",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-lg text-fg sm:col-span-5",
									children: p.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted sm:col-span-5",
									children: p.summary
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-mono text-sm tabular-nums text-fg sm:col-span-2 sm:text-right",
									children: [formatMoney(p.price), p.priceSuffix ?? ""]
								})
							]
						}, p.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/packages",
						className: "mt-6 inline-flex h-11 items-center text-sm text-fg underline decoration-border underline-offset-4",
						children: "All packages"
					})
				]
			})
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-4 py-16 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-[0.18em] text-subtle",
					children: "All practices"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 flex flex-wrap gap-2",
					children: DEPARTMENTS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/departments/$id",
						params: { id: d.id },
						className: `inline-flex h-11 items-center rounded-full border px-4 text-sm ${d.id === dept.id ? "border-accent bg-accent text-accent-fg" : "border-border text-muted hover:text-fg"}`,
						children: d.short
					}, d.id))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseCta, {
			title: `Start with ${dept.short.toLowerCase()}, or describe the whole outcome.`,
			body: "Reception will identify the practices involved. You approve scope before work begins."
		})
	] });
}
//#endregion
export { DepartmentPage as component };
