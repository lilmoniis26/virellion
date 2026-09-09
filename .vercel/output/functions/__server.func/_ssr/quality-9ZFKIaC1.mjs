import { S as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as QUALITY_CHECKS } from "./catalog-CyGgm22L.mjs";
import { x as useAtlas } from "./router-DxJdDo-e.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quality-9ZFKIaC1.js
var import_jsx_runtime = require_jsx_runtime();
function QualityPage() {
	const projects = useAtlas((s) => s.projects);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "px-4 py-8 sm:px-6 sm:py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-[0.18em] text-subtle",
				children: "Checkpoints"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-3xl text-fg",
				children: "Quality control"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-sm leading-relaxed text-muted",
				children: "Before delivery: confirm scope, accuracy, links, files, branding, product data, platform policies, no regulated advice, and return or delete client credentials."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-8 space-y-3",
				children: QUALITY_CHECKS.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-4 border-t border-border pt-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-xs text-subtle",
						children: String(i + 1).padStart(2, "0")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-fg",
						children: c.label
					})]
				}, c.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl text-fg",
					children: "Open reviews"
				}), projects.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: "No project workspaces yet."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 divide-y divide-border border-y border-border",
					children: projects.map((p) => {
						const done = p.quality.filter((q) => q.done).length;
						const ready = done === p.quality.length;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-3 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-fg",
								children: p.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									done,
									"/",
									p.quality.length,
									" checks · ",
									p.status
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `text-xs ${ready ? "text-ok" : "text-warn"}`,
									children: ready ? "Ready to deliver" : "Incomplete"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/hq/projects",
									search: { id: p.id },
									className: "text-sm text-fg",
									children: "Open"
								})]
							})]
						}, p.id);
					})
				})]
			})
		]
	});
}
//#endregion
export { QualityPage as component };
