import { S as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as formatDate } from "./utils-BTLGo2_i.mjs";
import { S as Button, i as Route$6, x as useAtlas } from "./router-DxJdDo-e.mjs";
import { n as Textarea } from "./input-B1NnXfay.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects-DPazVDBG.js
var import_jsx_runtime = require_jsx_runtime();
function ProjectsPage() {
	const { id } = Route$6.useSearch();
	const projects = useAtlas((s) => s.projects);
	const selected = projects.find((p) => p.id === id) ?? projects[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "grid min-h-[70dvh] lg:grid-cols-[280px_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "border-b border-border lg:border-b-0 lg:border-r",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4 py-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-xl text-fg",
					children: "Projects"
				})
			}), projects.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-4 pb-6 text-sm text-muted",
				children: "No projects. Approve a proposal from an inquiry to create a workspace."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: projects.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/hq/projects",
				search: { id: p.id },
				className: `block border-t border-border px-4 py-3 ${selected?.id === p.id ? "bg-raised" : "hover:bg-surface"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-fg",
					children: p.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: p.clientName
				})]
			}) }, p.id)) })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectDetail, { project: selected }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "p-8 text-sm text-muted",
			children: "Select a project."
		}) })]
	});
}
function ProjectDetail({ project }) {
	const updateProject = useAtlas((s) => s.updateProject);
	const toggleTask = useAtlas((s) => s.toggleTask);
	const toggleQuality = useAtlas((s) => s.toggleQuality);
	const done = project.tasks.filter((t) => t.done).length;
	const qdone = project.quality.filter((c) => c.done).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 px-4 py-6 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs uppercase tracking-[0.16em] text-subtle",
					children: [
						project.status,
						" · opened ",
						formatDate(project.createdAt)
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-3xl text-fg",
					children: project.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted",
					children: [
						project.clientName,
						" · ",
						project.specialist
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					"setup",
					"in-progress",
					"internal-review",
					"delivered",
					"follow-up"
				].map((st) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => updateProject(project.id, {
						status: st,
						stage: statusToStage(st)
					}),
					className: `h-9 rounded-full border px-3 text-xs capitalize ${project.status === st ? "border-accent bg-accent text-accent-fg" : "border-border text-muted"}`,
					children: st.replace("-", " ")
				}, st))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg text-fg",
				children: "Folders"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 flex flex-wrap gap-2",
				children: project.folders.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "rounded-md border border-border bg-surface px-3 py-2 text-sm text-fg",
					children: f
				}, f))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: "font-display text-lg text-fg",
				children: [
					"Tasks",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-sans text-sm text-muted tabular-nums",
						children: [
							done,
							"/",
							project.tasks.length
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-2",
				children: project.tasks.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-surface px-3 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: t.done,
						onChange: () => toggleTask(project.id, t.id),
						className: "mt-1 size-4 accent-accent"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `block text-sm ${t.done ? "text-muted line-through" : "text-fg"}`,
						children: t.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-subtle",
						children: t.owner
					})] })]
				}) }, t.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: "font-display text-lg text-fg",
				children: [
					"Quality",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-sans text-sm text-muted tabular-nums",
						children: [
							qdone,
							"/",
							project.quality.length
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-2",
				children: project.quality.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex cursor-pointer items-start gap-3 text-sm text-fg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: c.done,
						onChange: () => toggleQuality(project.id, c.id),
						className: "mt-0.5 size-4 accent-accent"
					}), c.label]
				}) }, c.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg text-fg",
				children: "Handoff"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				className: "mt-2",
				value: project.handoff,
				onChange: (e) => updateProject(project.id, { handoff: e.target.value }),
				placeholder: "Files, access, instructions, what the client owns…"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg text-fg",
				children: "Follow-up"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				className: "mt-2",
				value: project.followUp,
				onChange: (e) => updateProject(project.id, { followUp: e.target.value }),
				placeholder: "Referrals, maintenance, marketplace ops, content, coaching, growth…"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/hq/inquiries",
					search: { id: project.inquiryId },
					children: "Back to inquiry"
				})
			})
		]
	});
}
function statusToStage(st) {
	switch (st) {
		case "setup": return "project";
		case "in-progress": return "production";
		case "internal-review": return "quality";
		case "delivered": return "delivery";
		case "follow-up": return "follow-up";
	}
}
//#endregion
export { ProjectsPage as component };
