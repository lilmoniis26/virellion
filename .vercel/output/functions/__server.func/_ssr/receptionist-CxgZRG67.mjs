import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, b as useNavigate, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as uid } from "./utils-BTLGo2_i.mjs";
import { S as departmentById, t as AGENCY } from "./catalog-CyGgm22L.mjs";
import { n as emptyIntake, t as classifyIntake } from "./routing-kDjt9tDQ.mjs";
import { _ as ArrowUp } from "../_libs/lucide-react.mjs";
import { B as useCurrentUserState, C as createInquiry, S as Button, f as useSiteCopy, x as useAtlas } from "./router-DxJdDo-e.mjs";
import { r as receptionReply } from "./ai-99bp7eAb.mjs";
import { t as ConsentFields } from "./consent-fields-DPBzMLkC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/receptionist-CxgZRG67.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var OPENING = {
	id: "opening",
	role: "assistant",
	content: AGENCY.opening,
	createdAt: (/* @__PURE__ */ new Date(0)).toISOString()
};
function ReceptionPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReceptionPageInner, {});
}
function ReceptionPageInner() {
	const navigate = useNavigate();
	const stored = useAtlas((s) => s.reception);
	const setReception = useAtlas((s) => s.setReception);
	const intake = useAtlas((s) => s.receptionIntake);
	const setIntake = useAtlas((s) => s.setReceptionIntake);
	const addInquiry = useAtlas((s) => s.addInquiry);
	const { user } = useCurrentUserState();
	const copy = useSiteCopy();
	const [input, setInput] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [terms, setTerms] = (0, import_react.useState)(false);
	const [marketing, setMarketing] = (0, import_react.useState)(false);
	const scroller = (0, import_react.useRef)(null);
	const messages = stored.length ? stored : [OPENING];
	(0, import_react.useEffect)(() => {
		scroller.current?.scrollTo({
			top: scroller.current.scrollHeight,
			behavior: "smooth"
		});
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
		const next = [...stored.length ? stored : [OPENING], userMsg];
		setReception(next);
		const extracted = extractFromUtterance(intake, text);
		setIntake(extracted);
		setBusy(true);
		try {
			const result = await receptionReply({ data: {
				messages: next.filter((m) => m.role !== "system").map((m) => ({
					role: m.role,
					content: m.content
				})),
				extracted: summarizeIntake(extracted)
			} });
			if (!result.ok) {
				const fallback = localReception(extracted, text);
				setReception([...next, {
					id: uid("msg"),
					role: "assistant",
					content: fallback,
					createdAt: (/* @__PURE__ */ new Date()).toISOString()
				}]);
				if (result.error !== "AI is not available in this environment") setError(result.error);
			} else setReception([...next, {
				id: uid("msg"),
				role: "assistant",
				content: result.text,
				createdAt: (/* @__PURE__ */ new Date()).toISOString()
			}]);
		} catch {
			setReception([...next, {
				id: uid("msg"),
				role: "assistant",
				content: localReception(extracted, text),
				createdAt: (/* @__PURE__ */ new Date()).toISOString()
			}]);
		} finally {
			setBusy(false);
		}
	};
	const fileRecord = async () => {
		const routing = classifyIntake(intake);
		const filled = {
			...emptyIntake(),
			...intake,
			desiredOutcome: intake.desiredOutcome || lastUserText(messages) || "Discussed with reception",
			name: intake.name || user?.displayName || "Reception visitor",
			email: intake.email || user?.primaryEmail || ""
		};
		if (!user) {
			await navigate({
				to: "/login",
				search: { redirect: "/receptionist" }
			});
			return;
		}
		if (!filled.email) {
			setError("Add an email in the conversation, or use an account with an email address.");
			return;
		}
		if (!terms) {
			setError("Please agree to the Terms of Engagement and Privacy Notice.");
			return;
		}
		try {
			await createInquiry({ data: {
				intake: filled,
				source: "receptionist",
				termsAccepted: true,
				marketingOptIn: marketing
			} });
			addInquiry({
				intake: filled,
				source: "receptionist",
				conversation: messages,
				routing
			});
			await navigate({ to: "/account" });
		} catch (e) {
			setError(e instanceof Error ? e.message : "Could not file the inquiry.");
		}
	};
	const routingPreview = classifyIntake(intake);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative isolate overflow-hidden border-b border-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: copy.receptionist.image,
				alt: copy.receptionist.imageAlt,
				className: "absolute inset-0 size-full object-cover opacity-40"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-bg/50" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto flex max-w-6xl items-end justify-between gap-6 px-4 py-16 sm:px-6 sm:py-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.18em] text-accent",
						children: copy.receptionist.kicker
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-display text-4xl text-fg sm:text-5xl",
						children: copy.receptionist.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-xl text-sm leading-relaxed text-accent",
						children: copy.receptionist.dek
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					className: "hidden shrink-0 sm:inline-flex",
					onClick: fileRecord,
					disabled: messages.length < 2 || !terms,
					children: "Send to the studio"
				})]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_280px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "flex min-h-[420px] flex-col rounded-xl border border-border bg-surface",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					ref: scroller,
					className: "flex-1 space-y-4 overflow-y-auto p-5",
					children: [messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: m.role === "user" ? "ml-8 sm:ml-16" : "mr-8 sm:mr-16",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-[0.14em] text-subtle",
							children: m.role === "user" ? "You" : "Reception"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 whitespace-pre-wrap text-sm leading-relaxed text-fg",
							children: m.content
						})]
					}, m.id)), busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Listening and classifying…"
					}) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "flex gap-2 border-t border-border p-3",
					onSubmit: (e) => {
						e.preventDefault();
						send();
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: input,
						onChange: (e) => setInput(e.target.value),
						placeholder: "What are you trying to create, improve, launch, or accomplish?",
						className: "h-12 flex-1 rounded-md border border-border bg-raised px-3 text-sm text-fg placeholder:text-subtle"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						size: "icon",
						disabled: busy || !input.trim(),
						"aria-label": "Send",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, {})
					})]
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-4 pb-3 text-xs text-danger",
					children: error
				}) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "rounded-xl border border-border bg-surface p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.14em] text-subtle",
					children: "Live routing"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted",
					children: routingPreview.summary
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-1 text-sm text-fg",
					children: routingPreview.departments.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: departmentById(d).short }, d))
				}),
				routingPreview.needsHumanReview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-xs text-warn",
					children: "Human review required"
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsentFields, {
						idPrefix: "reception",
						terms,
						onTerms: setTerms,
						marketing,
						onMarketing: setMarketing
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-6 w-full sm:hidden",
					variant: "outline",
					onClick: fileRecord,
					disabled: messages.length < 2 || !terms,
					children: "Send to the studio"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 text-xs leading-relaxed text-subtle",
					children: [
						"Prefer the structured form?",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/start",
							className: "text-fg underline underline-offset-4",
							children: "Open intake"
						}),
						"."
					]
				})
			]
		})]
	})] });
}
function lastUserText(messages) {
	return [...messages].reverse().find((m) => m.role === "user")?.content ?? "";
}
function summarizeIntake(i) {
	return Object.entries(i).filter(([, v]) => Array.isArray(v) ? v.length : String(v).trim()).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`).join("\n");
}
function extractFromUtterance(current, text) {
	const next = { ...current };
	const email = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
	if (email) next.email = email[0];
	const phone = text.match(/\+?1?\s*\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/);
	if (phone) next.phone = phone[0];
	if (!next.desiredOutcome) next.desiredOutcome = text;
	else next.desiredOutcome = `${next.desiredOutcome}\n${text}`;
	if (/llc|ein|formation/i.test(text) && !next.services.includes("Business formation")) next.services = [...next.services, "Business formation"];
	if (/shopify|amazon|tiktok|reseller/i.test(text) && !next.services.includes("Online reseller / marketplace")) next.services = [...next.services, "Online reseller / marketplace"];
	if (/book|manuscript/i.test(text) && !next.services.includes("Book / publishing")) next.services = [...next.services, "Book / publishing"];
	if (/logo|brand/i.test(text) && !next.services.includes("Brand identity")) next.services = [...next.services, "Brand identity"];
	return next;
}
function localReception(intake, text) {
	const routing = classifyIntake(intake, text);
	if (!intake.name) return "Understood. What’s your name, and where is this project based?";
	if (!intake.budget) return "Helpful. Do you have a budget range and a deadline in mind, even roughly?";
	return `${routing.summary} If that sounds right, I can file this as an inquiry so a specialist can send a scope summary${routing.needsHumanReview ? " after human review" : ""}.`;
}
//#endregion
export { ReceptionPage as component };
