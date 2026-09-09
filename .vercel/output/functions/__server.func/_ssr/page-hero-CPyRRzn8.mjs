import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-BTLGo2_i.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/page-hero-CPyRRzn8.js
var import_jsx_runtime = require_jsx_runtime();
function PageHero({ src, alt, kicker, title, dek, compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("relative isolate overflow-hidden", compact ? "min-h-[48dvh]" : "min-h-[70dvh]"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src,
				alt,
				className: "absolute inset-0 size-full object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/25" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("relative mx-auto flex max-w-6xl flex-col justify-end px-4 sm:px-6", compact ? "min-h-[48dvh] pb-12 pt-24" : "min-h-[70dvh] pb-16 pt-28 sm:pb-20"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.18em] text-accent",
						children: kicker
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight text-fg sm:text-6xl",
						children: title
					}),
					dek ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-xl text-base leading-relaxed text-accent sm:text-lg",
						children: dek
					}) : null
				]
			})
		]
	});
}
//#endregion
export { PageHero as t };
