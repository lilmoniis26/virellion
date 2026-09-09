import { S as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as JOURNEY } from "./catalog-CyGgm22L.mjs";
import { S as Button, x as useAtlas } from "./router-DxJdDo-e.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/demo-BfsuZTjN.js
var import_jsx_runtime = require_jsx_runtime();
var SCRIPT = [
	{
		title: "Receptionist message",
		detail: "Maren Cole describes Hearth & Hollow — ceramics and textiles, no LLC, no store."
	},
	{
		title: "Intake form",
		detail: "Contact, outcome, budget $3–8k, Portland, formation + reseller + brand + website fields."
	},
	{
		title: "Routing",
		detail: "Formation → E-commerce → Creative → Web. Engagement: end-to-end. Risks: identity verification, marketplace approval, human review."
	},
	{
		title: "Proposal",
		detail: "Fixed-price scope at $4,200. Exclusions include legal advice and guaranteed marketplace approval."
	},
	{
		title: "Payment step",
		detail: "Approval recorded. No live processor in this workspace — the record stands in for signed terms and payment."
	},
	{
		title: "Project creation",
		detail: "Workspace, folders, tasks, and specialist ownership assigned."
	},
	{
		title: "Quality review",
		detail: "All nine checkpoints marked complete. Credentials not retained."
	},
	{
		title: "Delivery email",
		detail: "Handoff notes: client owns Gmail, domain, EIN letter, SOS login, Shopify, TikTok Shop."
	},
	{
		title: "Follow-up",
		detail: "Monthly desk offered. Amazon deferred until TikTok Shop is healthy."
	}
];
function DemoPage() {
	const runDemo = useAtlas((s) => s.runDemo);
	const demoComplete = useAtlas((s) => s.demoComplete);
	const resetWorkspace = useAtlas((s) => s.resetWorkspace);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "px-4 py-8 sm:px-6 sm:py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-[0.18em] text-subtle",
				children: "Milestone"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-3xl text-fg",
				children: "Internal demo journey"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-sm leading-relaxed text-muted",
				children: "Fictional client only — Maren Cole / Hearth & Hollow. Tests receptionist message, intake, routing, proposal, payment record, project creation, quality review, delivery, and follow-up before broad promotion."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => runDemo(),
						children: demoComplete ? "Replay demo data" : "Load demo journey"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/hq/inquiries",
							search: { id: "inq_demo_hearth" },
							children: "Open demo inquiry"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: () => resetWorkspace(),
						children: "Reset workspace"
					})
				]
			}),
			demoComplete ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-ok",
				children: "Demo record is loaded. Walk the inquiry, proposal, and project."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-10 space-y-6",
				children: SCRIPT.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "grid grid-cols-[auto_1fr] gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-xs text-subtle",
						children: String(i + 1).padStart(2, "0")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl text-fg",
						children: s.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm leading-relaxed text-muted",
						children: s.detail
					})] })]
				}, s.title))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl text-fg",
					children: "Mapped to the operating journey"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 grid gap-2 sm:grid-cols-2",
					children: JOURNEY.map((j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-lg border border-border bg-surface px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-fg",
							children: [
								j.step,
								". ",
								j.title
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: j.output
						})]
					}, j.id))
				})]
			})
		]
	});
}
//#endregion
export { DemoPage as component };
