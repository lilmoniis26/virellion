import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as formatDateTime, t as cn } from "./utils-BTLGo2_i.mjs";
import { u as JOURNEY } from "./catalog-CyGgm22L.mjs";
import { v as ArrowRight } from "../_libs/lucide-react.mjs";
import { E as getStudioAttention, S as Button, u as useStudioProfile, x as useAtlas } from "./router-DxJdDo-e.mjs";
import { i as isOperator } from "./access-Ty0QsjcV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hq-G-y5w0Jy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Card({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-xl border border-border bg-surface p-5", className),
		...props
	});
}
function HqHome() {
	const inquiries = useAtlas((s) => s.inquiries);
	const projects = useAtlas((s) => s.projects);
	const assistants = useAtlas((s) => s.assistants);
	const demoComplete = useAtlas((s) => s.demoComplete);
	const { profile } = useStudioProfile();
	const operator = isOperator(profile?.role);
	const [attention, setAttention] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		getStudioAttention().then(setAttention).catch(() => setAttention(null));
	}, []);
	const open = inquiries.filter((i) => i.status === "open" || i.status === "new").length;
	const active = projects.filter((p) => p.status !== "delivered" && p.status !== "follow-up").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "px-4 py-8 sm:px-6 sm:py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-[0.18em] text-subtle",
				children: "HQ"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-3xl text-fg",
				children: "Operations desk"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-sm leading-relaxed text-muted",
				children: "Edit the public site, prices, and photographs from Pages and Catalog. Invite a partner to help with upkeep — PayPal, receipts, terms, and domain records stay with the operator."
			}),
			operator && attention && !attention.paypalReady ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl text-fg",
						children: "Connect PayPal"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Add your PayPal.me name or business email so clients can pay with the account you already use for POS."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-4",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/hq/payments",
							children: "Open PayPal settings"
						})
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Client work",
						value: attention?.unread ? `${attention.unread} new` : "Inbox",
						to: "/hq/inbox"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Awaiting funds",
						value: attention?.pendingPayments ?? "—",
						to: "/hq/inbox"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Clients",
						value: "Roster",
						to: "/hq/clients"
					}),
					operator ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "PayPal",
						value: attention?.paypalReady ? "Ready" : "Set up",
						to: "/hq/payments"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Pages",
						value: "Edit",
						to: "/hq/pages"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Catalog",
						value: "Edit",
						to: "/hq/catalog"
					}),
					operator ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Partners",
						value: "Invite",
						to: "/hq/team"
					}) : null,
					operator ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Terms",
						value: "Edit",
						to: "/hq/legal"
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Open inquiries",
						value: open,
						to: "/hq/inquiries"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Active projects",
						value: active,
						to: "/hq/projects"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Assistants",
						value: assistants.length,
						to: "/hq/assistants"
					})
				]
			}),
			!demoComplete ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xl text-fg",
					children: "First operational milestone"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Complete one internal demo from inquiry to handoff using a fictional project — never a real client’s sensitive data."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/hq/demo",
						children: "Run demo journey"
					})
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-sm text-ok",
				children: "Demo journey is on file (Hearth & Hollow — fictional)."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl text-fg",
						children: "Recent inquiries"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/hq/inquiries",
						className: "text-sm text-muted hover:text-fg",
						children: "View all"
					})]
				}), inquiries.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-sm text-muted",
					children: [
						"No records yet.",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/start",
							className: "text-fg underline underline-offset-4",
							children: "Take an inquiry"
						}),
						" ",
						"or talk to reception."
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 divide-y divide-border border-y border-border",
					children: inquiries.slice(0, 6).map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-fg",
							children: i.intake.name || "Unnamed"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: i.intake.desiredOutcome.slice(0, 90)
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 text-xs text-subtle",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "capitalize",
									children: i.stage.replace("-", " ")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatDateTime(i.createdAt) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/hq/inquiries",
									search: { id: i.id },
									className: "text-fg",
									children: "Open"
								})
							]
						})]
					}, i.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl text-fg",
					children: "Pipeline"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3",
					children: JOURNEY.map((step) => {
						const count = inquiries.filter((i) => i.stage === step.id).length + projects.filter((p) => p.stage === step.id).length;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-lg border border-border bg-surface px-4 py-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-[11px] text-subtle",
									children: String(step.step).padStart(2, "0")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-fg",
									children: step.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs tabular-nums text-muted",
									children: [count, " in stage"]
								})
							]
						}, step.id);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/start",
						children: ["New intake ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/receptionist",
						children: "Open reception"
					})
				})]
			})
		]
	});
}
function Stat({ label, value, to }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: "rounded-xl border border-border bg-surface p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs uppercase tracking-[0.14em] text-subtle",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 font-display text-3xl tabular-nums text-fg",
			children: value
		})]
	});
}
//#endregion
export { HqHome as component };
