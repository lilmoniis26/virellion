import { S as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-BTLGo2_i.mjs";
import { f as useSiteCopy } from "./router-DxJdDo-e.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/consent-fields-DPBzMLkC.js
var import_jsx_runtime = require_jsx_runtime();
function EngagementNotice({ className }) {
	const copy = useSiteCopy();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("rounded-xl border border-border bg-raised/60 p-5", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-[0.14em] text-subtle",
				children: "What you are agreeing to"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm leading-relaxed text-muted",
				children: [
					"Terms effective ",
					copy.legal.effective,
					". Virellion is administrative and production support — not legal, tax, or licensed advice. You own every account."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid gap-6 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.14em] text-fg",
					children: "You allow Virellion to"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2 text-sm leading-relaxed text-muted",
					children: copy.legal.allows.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, item))
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.14em] text-fg",
					children: "You do not allow Virellion to"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2 text-sm leading-relaxed text-muted",
					children: copy.legal.doesNot.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, item))
				})] })]
			})
		]
	});
}
function ConsentFields({ terms, onTerms, marketing, onMarketing, idPrefix }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			htmlFor: `${idPrefix}-terms`,
			className: "flex min-h-11 cursor-pointer gap-3 text-sm leading-relaxed text-muted",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id: `${idPrefix}-terms`,
				type: "checkbox",
				checked: terms,
				onChange: (e) => onTerms(e.target.checked),
				className: "mt-1 size-4 shrink-0 accent-accent",
				required: true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
				"I have read and agree to the",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/terms",
					className: "text-fg underline underline-offset-4",
					children: "Terms of Engagement"
				}),
				" ",
				"and",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/privacy",
					className: "text-fg underline underline-offset-4",
					children: "Privacy Notice"
				}),
				". I authorize Virellion to use the information I provide as described there."
			] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			htmlFor: `${idPrefix}-marketing`,
			className: "flex min-h-11 cursor-pointer gap-3 text-sm leading-relaxed text-muted",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id: `${idPrefix}-marketing`,
				type: "checkbox",
				checked: marketing,
				onChange: (e) => onMarketing(e.target.checked),
				className: "mt-1 size-4 shrink-0 accent-accent"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Optional. Virellion may email me about related studio services. I can turn this off in my account. Virellion will not add me to a marketing list without this permission." })]
		})]
	});
}
//#endregion
export { EngagementNotice as n, ConsentFields as t };
