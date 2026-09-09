import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as formatMoney, r as formatDateTime } from "./utils-BTLGo2_i.mjs";
import { S as departmentById, T as packageById, _ as RISK_LABELS, u as JOURNEY } from "./catalog-CyGgm22L.mjs";
import { t as classifyIntake } from "./routing-kDjt9tDQ.mjs";
import { S as Button, a as Route$10, x as useAtlas } from "./router-DxJdDo-e.mjs";
import { n as Textarea } from "./input-B1NnXfay.mjs";
import { n as draftScope } from "./ai-99bp7eAb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inquiries-PZfN3_6g.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function InquiriesPage() {
	const { id } = Route$10.useSearch();
	const inquiries = useAtlas((s) => s.inquiries);
	const selected = inquiries.find((i) => i.id === id) ?? inquiries[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "grid min-h-[70dvh] lg:grid-cols-[280px_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "border-b border-border lg:border-b-0 lg:border-r",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between px-4 py-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-xl text-fg",
					children: "Inquiries"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "outline",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/start",
						children: "New"
					})
				})]
			}), inquiries.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-4 pb-6 text-sm text-muted",
				children: "No inquiries yet."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "max-h-[40vh] overflow-y-auto lg:max-h-[calc(100dvh-10rem)]",
				children: inquiries.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/hq/inquiries",
					search: { id: i.id },
					className: `block border-t border-border px-4 py-3 ${selected?.id === i.id ? "bg-raised" : "hover:bg-surface"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-fg",
							children: i.intake.name || "Unnamed"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-xs text-muted",
							children: i.intake.desiredOutcome
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-[11px] uppercase tracking-wide text-subtle",
							children: [
								i.status,
								" · ",
								i.stage
							]
						})
					]
				}) }, i.id))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-w-0",
			children: selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InquiryDetail, { inquiry: selected }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "p-8 text-sm text-muted",
				children: "Select or create an inquiry."
			})
		})]
	});
}
function InquiryDetail({ inquiry }) {
	const updateInquiry = useAtlas((s) => s.updateInquiry);
	const setStage = useAtlas((s) => s.setInquiryStage);
	const addProposal = useAtlas((s) => s.addProposal);
	const proposals = useAtlas((s) => s.proposals).filter((p) => p.inquiryId === inquiry.id);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [notes, setNotes] = (0, import_react.useState)(inquiry.notes);
	const routing = inquiry.routing ?? classifyIntake(inquiry.intake);
	const draft = async () => {
		setBusy(true);
		try {
			const result = await draftScope({ data: {
				intakeJson: JSON.stringify(inquiry.intake, null, 2),
				routingJson: JSON.stringify(routing, null, 2)
			} });
			const parsed = result.ok ? parseScope(result.text) : fallbackScope(inquiry, routing);
			addProposal(inquiry.id, parsed);
		} catch {
			addProposal(inquiry.id, fallbackScope(inquiry, routing));
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 px-4 py-6 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs uppercase tracking-[0.16em] text-subtle",
					children: [
						inquiry.source,
						" · ",
						formatDateTime(inquiry.createdAt)
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-3xl text-fg",
					children: inquiry.intake.name || "Unnamed client"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted",
					children: inquiry.intake.desiredOutcome
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
						label: "Email",
						value: inquiry.intake.email
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
						label: "Phone",
						value: inquiry.intake.phone
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
						label: "Location",
						value: inquiry.intake.location
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
						label: "Type",
						value: inquiry.intake.projectType
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
						label: "Stage",
						value: inquiry.intake.currentStage
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
						label: "Deadline",
						value: inquiry.intake.deadline
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
						label: "Budget",
						value: inquiry.intake.budget
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
						label: "Channel",
						value: inquiry.intake.channel
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-lg text-fg",
					children: "Routing"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: routing.summary
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: [routing.departments.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full border border-border px-3 py-1 text-xs text-fg",
						children: departmentById(d).short
					}, d)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full border border-accent/40 px-3 py-1 text-xs capitalize text-accent",
						children: routing.engagement
					})]
				}),
				routing.risks.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-1",
					children: routing.risks.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "text-xs text-warn",
						children: RISK_LABELS.find((x) => x.id === r)?.label ?? r
					}, r))
				}) : null,
				routing.suggestedPackageId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm text-muted",
					children: ["Suggested package: ", packageById(routing.suggestedPackageId)?.name]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-xs text-subtle",
					children: ["Specialists: ", routing.specialists.join(" · ")]
				})
			] }),
			inquiry.intake.businessName ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg text-fg",
				children: "Formation extras"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid gap-2 text-sm text-muted sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Name: ", inquiry.intake.businessName] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Status: ", inquiry.intake.businessStatus] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Entity: ", inquiry.intake.entityType] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Address: ", inquiry.intake.addressSituation] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Marketplace: ", inquiry.intake.marketplace] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Category: ", inquiry.intake.productCategory] })
				]
			})] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg text-fg",
				children: "Pipeline stage"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: JOURNEY.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setStage(inquiry.id, s.id),
					className: `h-9 rounded-full border px-3 text-xs ${inquiry.stage === s.id ? "border-accent bg-accent text-accent-fg" : "border-border text-muted"}`,
					children: [
						s.step,
						". ",
						s.title
					]
				}, s.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-lg text-fg",
					children: "Internal notes"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					className: "mt-2",
					value: notes,
					onChange: (e) => setNotes(e.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-3",
					size: "sm",
					variant: "outline",
					onClick: () => updateInquiry(inquiry.id, { notes }),
					children: "Save notes"
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-lg text-fg",
					children: "Scope"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					onClick: () => void draft(),
					disabled: busy,
					children: busy ? "Drafting…" : "Draft proposal"
				})]
			}), proposals.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: "No proposal yet. Draft a scope after classification and any required review."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-4",
				children: proposals.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProposalCard, { proposalId: p.id }, p.id))
			})] })
		]
	});
}
function ProposalCard({ proposalId }) {
	const proposal = useAtlas((s) => s.proposals.find((p) => p.id === proposalId));
	const updateProposal = useAtlas((s) => s.updateProposal);
	const approveProposal = useAtlas((s) => s.approveProposal);
	const projects = useAtlas((s) => s.projects);
	if (!proposal) return null;
	const linked = projects.find((p) => p.proposalId === proposal.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-xl border border-border bg-surface p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs uppercase tracking-wide text-subtle",
				children: [
					proposal.status,
					" · ",
					proposal.engagement
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
				className: "mt-1 font-display text-xl text-fg",
				children: proposal.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: proposal.summary
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 list-disc space-y-1 pl-4 text-sm text-fg",
				children: proposal.deliverables.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: d }, d))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-sm text-muted",
				children: [
					proposal.timeline,
					" · ",
					formatMoney(proposal.fee)
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [
					proposal.status === "draft" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => updateProposal(proposal.id, { status: "sent" }),
						children: "Mark sent"
					}) : null,
					proposal.status !== "approved" && !linked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						onClick: () => approveProposal(proposal.id),
						children: "Record approval & create project"
					}) : null,
					linked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/hq/projects",
							search: { id: linked.id },
							children: "Open project"
						})
					}) : null
				]
			})
		]
	});
}
function Meta({ label, value }) {
	if (!value) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-[11px] uppercase tracking-[0.14em] text-subtle",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-1 text-sm text-fg",
		children: value
	})] });
}
function parseScope(text) {
	const grab = (h) => {
		const re = new RegExp(`${h}\\s*\\n([\\s\\S]*?)(?=\\n[A-Z][A-Z ]+\\n|$)`);
		return (text.match(re)?.[1] ?? "").trim();
	};
	const bullets = (block) => block.split("\n").map((l) => l.replace(/^[-*•]\s*/, "").trim()).filter(Boolean);
	const feeLine = grab("FEE").replace(/[^0-9]/g, "");
	const engagement = grab("ENGAGEMENT").toLowerCase().split(/\s/)[0];
	return {
		title: grab("TITLE") || "Project scope",
		summary: grab("SUMMARY"),
		deliverables: bullets(grab("DELIVERABLES")),
		exclusions: bullets(grab("EXCLUSIONS")),
		timeline: grab("TIMELINE") || "To be confirmed",
		fee: Number(feeLine) || 0,
		engagement: [
			"individual",
			"package",
			"end-to-end",
			"consultation",
			"retainer"
		].includes(engagement) ? engagement : "consultation",
		status: "draft"
	};
}
function fallbackScope(inquiry, routing) {
	const pkg = routing.suggestedPackageId ? packageById(routing.suggestedPackageId) : void 0;
	return {
		title: `${inquiry.intake.name || "Client"} — ${pkg?.name ?? "Scoped engagement"}`,
		summary: routing.summary,
		deliverables: pkg?.deliverables ?? ["Discovery summary", "Recommended next step"],
		exclusions: [
			"Legal, tax, or licensed advice",
			"Guaranteed approvals or revenue",
			"Account creation using agency identity"
		],
		timeline: pkg?.timeline ?? "To be confirmed after review",
		fee: pkg?.price ?? 0,
		engagement: routing.engagement,
		status: "draft"
	};
}
//#endregion
export { InquiriesPage as component };
