import { S as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as formatMoney } from "./utils-BTLGo2_i.mjs";
import { f as useSiteCopy, g as useLiveCatalog } from "./router-DxJdDo-e.mjs";
import { t as CloseCta } from "./close-cta-CpomdH5Y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/offers.index-2PhSGaBS.js
var import_jsx_runtime = require_jsx_runtime();
function OffersIndex() {
	const { offers } = useLiveCatalog();
	const copy = useSiteCopy();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-[0.18em] text-subtle",
					children: copy.offers.kicker
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 max-w-3xl font-display text-4xl text-fg sm:text-6xl",
					children: copy.offers.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 max-w-2xl text-base leading-relaxed text-muted",
					children: copy.offers.dek
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-6xl space-y-16 px-4 pb-16 sm:px-6",
			children: offers.map((o, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "grid items-center gap-8 border-t border-border pt-12 lg:grid-cols-2 lg:gap-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/offers/$slug",
					params: { slug: o.slug },
					className: `overflow-hidden rounded-xl ${i % 2 === 1 ? "lg:order-2" : ""}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: o.image,
						alt: o.imageAlt,
						className: "aspect-photo w-full object-cover"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.16em] text-subtle",
						children: o.eyebrow
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-3xl text-fg sm:text-4xl",
						children: o.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm leading-relaxed text-muted sm:text-base",
						children: o.outcome
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-6 font-display text-2xl text-fg",
						children: ["From ", formatMoney(o.startingPrice)]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-subtle",
						children: o.timeline
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/offers/$slug",
						params: { slug: o.slug },
						className: "mt-6 inline-flex h-11 items-center text-sm text-fg underline decoration-border underline-offset-4",
						children: "Outcome, deliverables, and exclusions"
					})
				] })]
			}, o.slug))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseCta, {})
	] });
}
//#endregion
export { OffersIndex as component };
