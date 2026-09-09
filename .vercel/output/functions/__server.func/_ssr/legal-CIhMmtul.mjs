import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as Button, f as useSiteCopy, h as saveStudioSiteCopy, p as getStudioSiteCopy, u as useStudioProfile } from "./router-DxJdDo-e.mjs";
import { n as Textarea, t as Input } from "./input-B1NnXfay.mjs";
import { t as Label } from "./label-Cmem6H5a.mjs";
import { i as isOperator } from "./access-Ty0QsjcV.mjs";
import { t as MediaPicker } from "./media-picker-DJD0ssnd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/legal-CIhMmtul.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LegalEditor() {
	const { profile } = useStudioProfile();
	const live = useSiteCopy();
	const [copy, setCopy] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const [saved, setSaved] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [tab, setTab] = (0, import_react.useState)("terms");
	(0, import_react.useEffect)(() => {
		if (!isOperator(profile?.role)) return;
		getStudioSiteCopy().then(setCopy).catch((e) => setError(e instanceof Error ? e.message : "Could not load terms."));
	}, [profile?.role]);
	if (profile && !isOperator(profile.role)) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "px-4 py-8 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl text-fg",
			children: "Terms"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-xl text-sm text-muted",
			children: "Only the studio operator can edit Terms of Engagement and the Privacy Notice."
		})]
	});
	const save = async () => {
		if (!copy) return;
		setBusy(true);
		setError("");
		setSaved("");
		try {
			const next = await saveStudioSiteCopy({ data: copy });
			setCopy(next);
			live.refresh();
			setSaved("Saved. New inquiries and orders will record this version.");
		} catch (e) {
			setError(e instanceof Error ? e.message : "Could not save.");
		} finally {
			setBusy(false);
		}
	};
	if (!copy && !error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "px-4 py-8 sm:px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "Loading terms…"
		})
	});
	if (!copy) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "px-4 py-8 sm:px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-danger",
			children: error
		})
	});
	const legal = copy.legal;
	const setLegal = (partial) => setCopy({
		...copy,
		legal: {
			...legal,
			...partial
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "px-4 py-8 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-[0.18em] text-subtle",
				children: "Operator"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-3xl text-fg",
				children: "Terms & privacy"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-sm leading-relaxed text-muted",
				children: "These pages are the agreement clients accept. Partners cannot edit them. Domain, DNS, and password recovery are not available in this desk."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 flex flex-wrap gap-2",
				children: [
					["terms", "Terms"],
					["privacy", "Privacy"],
					["notice", "Checkout notice"]
				].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: `h-10 rounded-full border px-4 text-sm ${tab === id ? "border-accent bg-accent text-accent-fg" : "border-border text-muted"}`,
					onClick: () => setTab(id),
					children: label
				}, id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-8 max-w-2xl space-y-6",
				onSubmit: (e) => {
					e.preventDefault();
					save();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: "ver",
							label: "Version",
							value: legal.version,
							onChange: (v) => setLegal({ version: v })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: "eff",
							label: "Effective date",
							value: legal.effective,
							onChange: (v) => setLegal({ effective: v })
						})]
					}),
					tab === "terms" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "space-y-5 rounded-xl border border-border bg-surface p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								id: "tk",
								label: "Kicker",
								value: legal.termsKicker,
								onChange: (v) => setLegal({ termsKicker: v })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								id: "tt",
								label: "Title",
								value: legal.termsTitle,
								onChange: (v) => setLegal({ termsTitle: v })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								id: "td",
								label: "Introduction",
								value: legal.termsDek,
								onChange: (v) => setLegal({ termsDek: v }),
								area: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaPicker, {
								idPrefix: "terms",
								image: legal.termsImage,
								alt: legal.termsImageAlt,
								onImage: (src, alt) => setLegal({
									termsImage: src,
									termsImageAlt: alt ?? legal.termsImageAlt
								}),
								onAlt: (alt) => setLegal({ termsImageAlt: alt })
							}),
							legal.terms.map((section, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3 border-t border-border pt-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										id: `th-${i}`,
										label: `Section ${i + 1} heading`,
										value: section.heading,
										onChange: (v) => setLegal({ terms: legal.terms.map((s, n) => n === i ? {
											...s,
											heading: v
										} : s) })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										id: `tp-${i}`,
										label: "Paragraphs (blank line between)",
										value: section.paragraphs.join("\n\n"),
										onChange: (v) => setLegal({ terms: legal.terms.map((s, n) => n === i ? {
											...s,
											paragraphs: v.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
										} : s) }),
										area: true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										size: "sm",
										variant: "ghost",
										onClick: () => setLegal({ terms: legal.terms.filter((_, n) => n !== i) }),
										children: "Remove section"
									})
								]
							}, i)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								size: "sm",
								variant: "outline",
								onClick: () => setLegal({ terms: [...legal.terms, {
									heading: "",
									paragraphs: [""]
								}] }),
								children: "Add section"
							})
						]
					}) : null,
					tab === "privacy" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "space-y-5 rounded-xl border border-border bg-surface p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								id: "pk",
								label: "Kicker",
								value: legal.privacyKicker,
								onChange: (v) => setLegal({ privacyKicker: v })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								id: "pt",
								label: "Title",
								value: legal.privacyTitle,
								onChange: (v) => setLegal({ privacyTitle: v })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								id: "pd",
								label: "Introduction",
								value: legal.privacyDek,
								onChange: (v) => setLegal({ privacyDek: v }),
								area: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaPicker, {
								idPrefix: "privacy",
								image: legal.privacyImage,
								alt: legal.privacyImageAlt,
								onImage: (src, alt) => setLegal({
									privacyImage: src,
									privacyImageAlt: alt ?? legal.privacyImageAlt
								}),
								onAlt: (alt) => setLegal({ privacyImageAlt: alt })
							}),
							legal.privacy.map((section, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3 border-t border-border pt-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										id: `ph-${i}`,
										label: `Section ${i + 1} heading`,
										value: section.heading,
										onChange: (v) => setLegal({ privacy: legal.privacy.map((s, n) => n === i ? {
											...s,
											heading: v
										} : s) })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										id: `pp-${i}`,
										label: "Paragraphs (blank line between)",
										value: section.paragraphs.join("\n\n"),
										onChange: (v) => setLegal({ privacy: legal.privacy.map((s, n) => n === i ? {
											...s,
											paragraphs: v.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
										} : s) }),
										area: true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										size: "sm",
										variant: "ghost",
										onClick: () => setLegal({ privacy: legal.privacy.filter((_, n) => n !== i) }),
										children: "Remove section"
									})
								]
							}, i)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								size: "sm",
								variant: "outline",
								onClick: () => setLegal({ privacy: [...legal.privacy, {
									heading: "",
									paragraphs: [""]
								}] }),
								children: "Add section"
							})
						]
					}) : null,
					tab === "notice" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "space-y-5 rounded-xl border border-border bg-surface p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "Shown on checkout and intake before a client agrees."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-xl text-fg",
									children: "Clients allow"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									size: "sm",
									variant: "outline",
									onClick: () => setLegal({ allows: [...legal.allows, ""] }),
									children: "Add"
								})]
							}), legal.allows.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									id: `al-${i}`,
									label: `Item ${i + 1}`,
									value: item,
									onChange: (v) => setLegal({ allows: legal.allows.map((row, n) => n === i ? v : row) }),
									area: true
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									size: "sm",
									variant: "ghost",
									onClick: () => setLegal({ allows: legal.allows.filter((_, n) => n !== i) }),
									children: "Remove"
								})]
							}, i))] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-xl text-fg",
									children: "Clients do not allow"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									size: "sm",
									variant: "outline",
									onClick: () => setLegal({ doesNot: [...legal.doesNot, ""] }),
									children: "Add"
								})]
							}), legal.doesNot.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									id: `dn-${i}`,
									label: `Item ${i + 1}`,
									value: item,
									onChange: (v) => setLegal({ doesNot: legal.doesNot.map((row, n) => n === i ? v : row) }),
									area: true
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									size: "sm",
									variant: "ghost",
									onClick: () => setLegal({ doesNot: legal.doesNot.filter((_, n) => n !== i) }),
									children: "Remove"
								})]
							}, i))] })
						]
					}) : null,
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-danger",
						children: error
					}) : null,
					saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-ok",
						children: saved
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: busy,
						children: busy ? "Saving…" : "Save terms"
					})
				]
			})
		]
	});
}
function Field({ id, label, value, onChange, area }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor: id,
			children: label
		}), area ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
			id,
			value,
			onChange: (e) => onChange(e.target.value)
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			id,
			value,
			onChange: (e) => onChange(e.target.value)
		})]
	});
}
//#endregion
export { LegalEditor as component };
