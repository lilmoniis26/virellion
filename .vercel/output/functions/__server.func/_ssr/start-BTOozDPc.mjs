import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, b as useNavigate, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-BTLGo2_i.mjs";
import { a as CURRENT_STAGES, g as REGULATED_MATTERS, i as BUDGETS, p as PROJECT_TYPES, y as SERVICE_OPTIONS } from "./catalog-CyGgm22L.mjs";
import { n as emptyIntake, r as needsFormationExtras } from "./routing-kDjt9tDQ.mjs";
import { B as useCurrentUserState, C as createInquiry, S as Button, f as useSiteCopy, x as useAtlas } from "./router-DxJdDo-e.mjs";
import { t as PageHero } from "./page-hero-CPyRRzn8.mjs";
import { n as Textarea, t as Input } from "./input-B1NnXfay.mjs";
import { t as Label } from "./label-Cmem6H5a.mjs";
import { n as EngagementNotice, t as ConsentFields } from "./consent-fields-DPBzMLkC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/start-BTOozDPc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KEY = "virellion-intake-draft";
function saveIntakeDraft(intake) {
	sessionStorage.setItem(KEY, JSON.stringify(intake));
}
function readIntakeDraft() {
	try {
		const raw = sessionStorage.getItem(KEY);
		if (!raw) return null;
		return JSON.parse(raw);
	} catch {
		return null;
	}
}
function clearIntakeDraft() {
	sessionStorage.removeItem(KEY);
}
var STEPS = [
	"Contact",
	"Outcome",
	"Practical",
	"Risk",
	"Formation"
];
function StartPage() {
	const navigate = useNavigate();
	const addInquiry = useAtlas((s) => s.addInquiry);
	const { user, isPending } = useCurrentUserState();
	const copy = useSiteCopy();
	const [step, setStep] = (0, import_react.useState)(0);
	const [form, setForm] = (0, import_react.useState)(emptyIntake);
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [terms, setTerms] = (0, import_react.useState)(false);
	const [marketing, setMarketing] = (0, import_react.useState)(false);
	const restored = (0, import_react.useRef)(false);
	const showFormation = needsFormationExtras(form);
	const visibleSteps = showFormation ? STEPS : STEPS.slice(0, 4);
	const patch = (p) => setForm((f) => ({
		...f,
		...p
	}));
	const toggle = (key, value) => {
		setForm((f) => {
			const list = f[key];
			return {
				...f,
				[key]: list.includes(value) ? list.filter((x) => x !== value) : [...list, value]
			};
		});
	};
	const canNext = (0, import_react.useMemo)(() => {
		if (step === 0) return form.name.trim() && form.email.trim();
		if (step === 1) return form.desiredOutcome.trim().length > 8;
		return true;
	}, [step, form]);
	const submit = async (intake) => {
		if (!intake.name || !intake.email || !intake.desiredOutcome) {
			setError("Name, email, and desired outcome are required.");
			return;
		}
		if (isPending) return;
		if (!user) {
			saveIntakeDraft(intake);
			await navigate({
				to: "/login",
				search: { redirect: "/start" }
			});
			return;
		}
		if (!terms) {
			setError("Please agree to the Terms of Engagement and Privacy Notice.");
			return;
		}
		setBusy(true);
		setError("");
		try {
			await createInquiry({ data: {
				intake,
				source: "form",
				termsAccepted: true,
				marketingOptIn: marketing
			} });
			addInquiry({
				intake,
				source: "form"
			});
			clearIntakeDraft();
			await navigate({ to: "/account" });
		} catch (e) {
			setError(e instanceof Error ? e.message : "Could not submit the inquiry.");
		} finally {
			setBusy(false);
		}
	};
	(0, import_react.useEffect)(() => {
		if (isPending || restored.current) return;
		const draft = readIntakeDraft();
		if (!draft) return;
		restored.current = true;
		setForm(draft);
		setStep(needsFormationExtras(draft) ? STEPS.length - 1 : STEPS.length - 2);
	}, [user, isPending]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		compact: true,
		src: copy.start.image,
		alt: copy.start.imageAlt,
		kicker: copy.start.kicker,
		title: copy.start.title,
		dek: copy.start.dek
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm leading-relaxed text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/receptionist",
						className: "text-fg underline decoration-border underline-offset-4",
						children: "Talk to reception"
					}),
					" ",
					"if you would rather describe it in a sentence. Formation extras appear only when they are relevant."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-8 flex flex-wrap gap-2",
				children: visibleSteps.map((label, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: cn("rounded-full border px-3 py-1 text-xs uppercase tracking-wide", i === step ? "border-accent bg-accent text-accent-fg" : "border-border text-subtle"),
					children: label
				}, label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-8 space-y-6",
				onSubmit: (e) => {
					e.preventDefault();
					if (step < visibleSteps.length - 1) setStep((s) => s + 1);
					else submit(form);
				},
				children: [
					step === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-5 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Name",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.name,
									onChange: (e) => patch({ name: e.target.value }),
									required: true
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Email",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "email",
									value: form.email,
									onChange: (e) => patch({ email: e.target.value }),
									required: true
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Phone",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.phone,
									onChange: (e) => patch({ phone: e.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Location",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.location,
									onChange: (e) => patch({ location: e.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Preferred channel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 flex flex-wrap gap-2",
									children: [
										"email",
										"phone",
										"sms",
										"chat"
									].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
										active: form.channel === c,
										onClick: () => patch({ channel: c }),
										children: c === "sms" ? "SMS" : c
									}, c))
								})]
							})
						]
					}) : null,
					step === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Desired outcome",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									value: form.desiredOutcome,
									onChange: (e) => patch({ desiredOutcome: e.target.value }),
									placeholder: "What are you trying to create, improve, launch, or accomplish?",
									required: true
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-5 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Business or project type",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
										value: form.projectType,
										onChange: (v) => patch({ projectType: v }),
										options: PROJECT_TYPES
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Current stage",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
										value: form.currentStage,
										onChange: (v) => patch({ currentStage: v }),
										options: CURRENT_STAGES
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Target audience",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.audience,
									onChange: (e) => patch({ audience: e.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Required services" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 flex flex-wrap gap-2",
								children: SERVICE_OPTIONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
									active: form.services.includes(s),
									onClick: () => toggle("services", s),
									children: s
								}, s))
							})] })
						]
					}) : null,
					step === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Deadline",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.deadline,
									onChange: (e) => patch({ deadline: e.target.value }),
									placeholder: "e.g. 6 weeks, before November"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Budget range" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 flex flex-wrap gap-2",
								children: BUDGETS.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
									active: form.budget === b.id,
									onClick: () => patch({ budget: b.id }),
									children: b.label
								}, b.id))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Existing assets",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									value: form.assets,
									onChange: (e) => patch({ assets: e.target.value }),
									placeholder: "Logo, manuscript, product photos, domain, store, copy…"
								})
							})
						]
					}) : null,
					step === 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Does this project involve legal, tax, financial, medical, immigration, employment, licensing, or other regulated matters? If yes, a human reviews before any proposal. Virellion does not provide licensed advice."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
								active: form.regulated.length === 0,
								onClick: () => patch({ regulated: [] }),
								children: "None"
							}), REGULATED_MATTERS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
								active: form.regulated.includes(r),
								onClick: () => toggle("regulated", r),
								children: r
							}, r))]
						})]
					}) : null,
					step === 4 && showFormation ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-5 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Proposed business name",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.businessName,
									onChange: (e) => patch({ businessName: e.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Current business status",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.businessStatus,
									onChange: (e) => patch({ businessStatus: e.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Entity type (if chosen)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.entityType,
									onChange: (e) => patch({ entityType: e.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Operating address situation",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.addressSituation,
									onChange: (e) => patch({ addressSituation: e.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Desired marketplace",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.marketplace,
									onChange: (e) => patch({ marketplace: e.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Product category",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.productCategory,
									onChange: (e) => patch({ productCategory: e.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Supplier status",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.supplierStatus,
									onChange: (e) => patch({ supplierStatus: e.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Inventory status",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.inventoryStatus,
									onChange: (e) => patch({ inventoryStatus: e.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Expected sales channels",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.salesChannels,
									onChange: (e) => patch({ salesChannels: e.target.value }),
									className: "sm:col-span-2"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YesNo, {
								label: "Business bank account",
								value: form.hasBank,
								onChange: (v) => patch({ hasBank: v })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YesNo, {
								label: "EIN",
								value: form.hasEin,
								onChange: (v) => patch({ hasEin: v })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YesNo, {
								label: "Insurance",
								value: form.hasInsurance,
								onChange: (v) => patch({ hasInsurance: v })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YesNo, {
								label: "Licenses",
								value: form.hasLicenses,
								onChange: (v) => patch({ hasLicenses: v })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YesNo, {
								label: "Product-compliance documents",
								value: form.hasComplianceDocs,
								onChange: (v) => patch({ hasComplianceDocs: v })
							})
						]
					}) : null,
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-danger",
						children: error
					}) : null,
					step === visibleSteps.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EngagementNotice, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsentFields, {
							idPrefix: "intake",
							terms,
							onTerms: setTerms,
							marketing,
							onMarketing: setMarketing
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							disabled: step === 0,
							onClick: () => setStep((s) => Math.max(0, s - 1)),
							children: "Back"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: !canNext || busy || step === visibleSteps.length - 1 && !terms,
							children: step === visibleSteps.length - 1 ? user ? "Submit inquiry" : "Sign in to submit" : "Continue"
						})]
					})
				]
			})
		]
	})] });
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), children]
	});
}
function Chip({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("h-10 rounded-full border px-3 text-sm", active ? "border-accent bg-accent text-accent-fg" : "border-border text-muted hover:text-fg"),
		children
	});
}
function Select({ value, onChange, options }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
		value,
		onChange: (e) => onChange(e.target.value),
		className: "flex h-11 w-full rounded-md border border-border bg-raised px-3 text-sm text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
			value: "",
			children: "Select…"
		}), options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
			value: o,
			children: o
		}, o))]
	});
}
function YesNo({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-2 flex gap-2",
		children: ["yes", "no"].map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
			active: value === v,
			onClick: () => onChange(v),
			children: v === "yes" ? "Yes" : "No"
		}, v))
	})] });
}
//#endregion
export { StartPage as component };
