import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, b as useNavigate, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as uid } from "./utils-BTLGo2_i.mjs";
import { o as DEPARTMENTS } from "./catalog-CyGgm22L.mjs";
import { _ as ArrowUp } from "../_libs/lucide-react.mjs";
import { S as Button, o as Route$15, x as useAtlas } from "./router-DxJdDo-e.mjs";
import { n as Textarea, t as Input } from "./input-B1NnXfay.mjs";
import { t as Label } from "./label-Cmem6H5a.mjs";
import { t as assistantReply } from "./ai-99bp7eAb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/assistants-1jTGps6h.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AssistantsPage() {
	const { id } = Route$15.useSearch();
	const navigate = useNavigate();
	const assistants = useAtlas((s) => s.assistants);
	const loadTemplates = useAtlas((s) => s.loadTemplates);
	const addAssistant = useAtlas((s) => s.addAssistant);
	const [creating, setCreating] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		loadTemplates();
	}, [loadTemplates]);
	const selected = assistants.find((a) => a.id === id) ?? assistants[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "grid min-h-[70dvh] lg:grid-cols-[280px_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "border-b border-border lg:border-b-0 lg:border-r",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between px-4 py-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-xl text-fg",
					children: "Assistants"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "outline",
					onClick: () => setCreating(true),
					children: "New"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "max-h-[50vh] overflow-y-auto lg:max-h-[calc(100dvh-10rem)]",
				children: assistants.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/hq/assistants",
					search: { id: a.id },
					className: `block border-t border-border px-4 py-3 ${selected?.id === a.id ? "bg-raised" : "hover:bg-surface"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-fg",
						children: a.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: a.role
					})]
				}) }, a.id))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: creating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateAssistant, {
			onCancel: () => setCreating(false),
			onCreate: (def) => {
				const newId = addAssistant(def);
				setCreating(false);
				navigate({
					to: "/hq/assistants",
					search: { id: newId }
				});
			}
		}) : selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssistantChat, { assistant: selected }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "p-8 text-sm text-muted",
			children: "Create an assistant to get started."
		}) })]
	});
}
function CreateAssistant({ onCancel, onCreate }) {
	const [name, setName] = (0, import_react.useState)("");
	const [role, setRole] = (0, import_react.useState)("");
	const [department, setDepartment] = (0, import_react.useState)("");
	const [tone, setTone] = (0, import_react.useState)("Professional, concise, practical");
	const [brief, setBrief] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "space-y-5 px-4 py-6 sm:px-6",
		onSubmit: (e) => {
			e.preventDefault();
			if (!name.trim() || !brief.trim()) return;
			onCreate({
				name: name.trim(),
				role: role.trim() || "Custom specialist",
				department: department || void 0,
				tone,
				brief,
				template: false
			});
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl text-fg",
				children: "New assistant"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Personal specialists for future tasks — briefs, scripts, formation checklists, store ops, or a chief of staff."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: name,
						onChange: (e) => setName(e.target.value),
						required: true
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Role" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: role,
						onChange: (e) => setRole(e.target.value),
						placeholder: "e.g. Launch producer"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Department (optional)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: department,
					onChange: (e) => setDepartment(e.target.value),
					className: "flex h-11 w-full rounded-md border border-border bg-raised px-3 text-sm text-fg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "None / personal"
					}), DEPARTMENTS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: d.id,
						children: d.label
					}, d.id))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Tone" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: tone,
					onChange: (e) => setTone(e.target.value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Operating brief" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: brief,
					onChange: (e) => setBrief(e.target.value),
					placeholder: "What this assistant owns, how it should think, what it must never do…",
					required: true
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					children: "Create"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					onClick: onCancel,
					children: "Cancel"
				})]
			})
		]
	});
}
function AssistantChat({ assistant }) {
	const thread = useAtlas((s) => s.threads[assistant.id]);
	const append = useAtlas((s) => s.appendThread);
	const removeAssistant = useAtlas((s) => s.removeAssistant);
	const [input, setInput] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const scroller = (0, import_react.useRef)(null);
	const messages = thread?.messages ?? [];
	(0, import_react.useEffect)(() => {
		scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
	}, [messages.length, busy]);
	const send = async () => {
		const text = input.trim();
		if (!text || busy) return;
		setInput("");
		setError("");
		const userMsg = {
			id: uid("msg"),
			role: "user",
			content: text,
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		append(assistant.id, userMsg);
		const history = [...messages, userMsg].map((m) => ({
			role: m.role,
			content: m.content
		}));
		setBusy(true);
		try {
			const result = await assistantReply({ data: {
				name: assistant.name,
				role: assistant.role,
				brief: assistant.brief,
				tone: assistant.tone,
				messages: history
			} });
			const content = result.ok ? result.text : localAssistant(assistant, text);
			append(assistant.id, {
				id: uid("msg"),
				role: "assistant",
				content,
				createdAt: (/* @__PURE__ */ new Date()).toISOString()
			});
			if (!result.ok && result.error !== "AI is not available in this environment") setError(result.error);
		} catch {
			append(assistant.id, {
				id: uid("msg"),
				role: "assistant",
				content: localAssistant(assistant, text),
				createdAt: (/* @__PURE__ */ new Date()).toISOString()
			});
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-[calc(100dvh-9rem)] flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-start justify-between gap-3 border-b border-border px-4 py-4 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl text-fg",
						children: assistant.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: assistant.role
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-2xl text-xs leading-relaxed text-subtle",
						children: assistant.brief
					})
				] }), !assistant.template ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "ghost",
					onClick: () => removeAssistant(assistant.id),
					children: "Remove"
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: scroller,
				className: "flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-6",
				children: [
					messages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Ask for a brief, a checklist, a script, a routing recommendation, or a next-step plan."
					}) : null,
					messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: m.role === "user" ? "ml-10" : "mr-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] uppercase tracking-[0.14em] text-subtle",
							children: m.role === "user" ? "You" : assistant.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 whitespace-pre-wrap text-sm leading-relaxed text-fg",
							children: m.content
						})]
					}, m.id)),
					busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Drafting…"
					}) : null
				]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-4 text-xs text-danger",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex gap-2 border-t border-border p-3",
				onSubmit: (e) => {
					e.preventDefault();
					send();
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: input,
					onChange: (e) => setInput(e.target.value),
					placeholder: `Message ${assistant.name}`,
					className: "h-12 flex-1 rounded-md border border-border bg-raised px-3 text-sm text-fg placeholder:text-subtle"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					size: "icon",
					disabled: busy || !input.trim(),
					"aria-label": "Send",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, {})
				})]
			})
		]
	});
}
function localAssistant(assistant, text) {
	return `${assistant.name} (${assistant.role}) would approach this as follows:\n\n1. Restate the outcome: ${text.slice(0, 180)}\n2. List constraints (scope, timeline, what Virellion will not do).\n3. Produce a short checklist and a next human action.\n\nAI is unavailable right now, so this is a structured placeholder. Try again in a moment, or write the brief into a project task.`;
}
//#endregion
export { AssistantsPage as component };
