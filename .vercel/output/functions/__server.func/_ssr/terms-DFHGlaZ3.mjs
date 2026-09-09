import { S as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as useSiteCopy } from "./router-DxJdDo-e.mjs";
import { t as PageHero } from "./page-hero-CPyRRzn8.mjs";
import { n as EngagementNotice } from "./consent-fields-DPBzMLkC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/terms-DFHGlaZ3.js
var import_jsx_runtime = require_jsx_runtime();
function TermsPage() {
	const legal = useSiteCopy().legal;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		src: legal.termsImage,
		alt: legal.termsImageAlt,
		kicker: legal.termsKicker,
		title: legal.termsTitle,
		dek: legal.termsDek,
		compact: true
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-3xl px-4 py-14 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EngagementNotice, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 space-y-12",
				children: legal.terms.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl text-fg",
					children: section.heading
				}), section.paragraphs.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm leading-relaxed text-muted",
					children: p
				}, p.slice(0, 48)))] }, section.heading))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-14 text-sm text-subtle",
				children: [
					"Related:",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/privacy",
						className: "text-fg underline underline-offset-4",
						children: "Privacy Notice"
					}),
					"."
				]
			})
		]
	})] });
}
//#endregion
export { TermsPage as component };
