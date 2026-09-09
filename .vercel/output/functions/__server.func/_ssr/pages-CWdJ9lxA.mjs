import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as Button, f as useSiteCopy, h as saveStudioSiteCopy, m as resetStudioSiteCopy, p as getStudioSiteCopy } from "./router-DxJdDo-e.mjs";
import { n as Textarea, t as Input } from "./input-B1NnXfay.mjs";
import { t as Label } from "./label-Cmem6H5a.mjs";
import { t as MediaPicker } from "./media-picker-DJD0ssnd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pages-CWdJ9lxA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PagesEditor() {
	const live = useSiteCopy();
	const [copy, setCopy] = (0, import_react.useState)(null);
	const [tab, setTab] = (0, import_react.useState)("home");
	const [error, setError] = (0, import_react.useState)("");
	const [saved, setSaved] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		getStudioSiteCopy().then(setCopy).catch((e) => setError(e instanceof Error ? e.message : "Could not load pages."));
	}, []);
	const persist = async (next) => {
		setCopy(next);
		live.refresh();
	};
	const save = async () => {
		if (!copy) return;
		setBusy(true);
		setError("");
		setSaved("");
		try {
			const next = await saveStudioSiteCopy({ data: copy });
			await persist(next);
			setSaved("Saved. The public site now uses this copy and photography.");
		} catch (e) {
			setError(e instanceof Error ? e.message : "Could not save.");
		} finally {
			setBusy(false);
		}
	};
	const reset = async () => {
		setBusy(true);
		setError("");
		setSaved("");
		try {
			const next = await resetStudioSiteCopy();
			await persist(next);
			setSaved("Restored the original published copy. Terms stay with the operator.");
		} catch (e) {
			setError(e instanceof Error ? e.message : "Could not restore.");
		} finally {
			setBusy(false);
		}
	};
	if (!copy && !error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "px-4 py-8 sm:px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "Loading pages…"
		})
	});
	if (!copy) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "px-4 py-8 sm:px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-danger",
			children: error
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "px-4 py-8 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-[0.18em] text-subtle",
				children: "Site"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-3xl text-fg",
				children: "Edit public pages"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-sm leading-relaxed text-muted",
				children: "Headlines, photographs, navigation, FAQs, and closing copy. Catalog prices and services stay under Catalog. Terms of Engagement stay with the operator."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 flex flex-wrap gap-2",
				children: [
					["home", "Home"],
					["pages", "Inner pages"],
					["faqs", "FAQs & steps"],
					["chrome", "Nav & contact"],
					["footer", "Footer & close"]
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
					tab === "home" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeFields, {
						copy,
						setCopy
					}) : null,
					tab === "pages" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InnerFields, {
						copy,
						setCopy
					}) : null,
					tab === "faqs" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaqFields, {
						copy,
						setCopy
					}) : null,
					tab === "chrome" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChromeFields, {
						copy,
						setCopy
					}) : null,
					tab === "footer" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterFields, {
						copy,
						setCopy
					}) : null,
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-danger",
						children: error
					}) : null,
					saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-ok",
						children: saved
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: busy,
							children: busy ? "Saving…" : "Save pages"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							disabled: busy,
							onClick: () => void reset(),
							children: "Restore original"
						})]
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
function HomeFields({ copy, setCopy }) {
	const h = copy.home;
	const patch = (partial) => setCopy({
		...copy,
		home: {
			...h,
			...partial
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 rounded-xl border border-border bg-surface p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				id: "h-kicker",
				label: "Kicker",
				value: h.kicker,
				onChange: (v) => patch({ kicker: v })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				id: "h-title",
				label: "Headline",
				value: h.title,
				onChange: (v) => patch({ title: v }),
				area: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				id: "h-dek",
				label: "Introduction",
				value: h.dek,
				onChange: (v) => patch({ dek: v }),
				area: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaPicker, {
				idPrefix: "home-hero",
				image: h.image,
				alt: h.imageAlt,
				onImage: (src, alt) => patch({
					image: src,
					imageAlt: alt ?? h.imageAlt
				}),
				onAlt: (alt) => patch({ imageAlt: alt })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				id: "h-quote",
				label: "Paper band",
				value: h.paperQuote,
				onChange: (v) => patch({ paperQuote: v }),
				area: true
			}),
			h.stats.map((stat, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: `stat-k-${i}`,
					label: `Stat ${i + 1} figure`,
					value: stat.k,
					onChange: (v) => patch({ stats: h.stats.map((s, n) => n === i ? {
						...s,
						k: v
					} : s) })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: `stat-v-${i}`,
					label: `Stat ${i + 1} label`,
					value: stat.v,
					onChange: (v) => patch({ stats: h.stats.map((s, n) => n === i ? {
						...s,
						v
					} : s) })
				})]
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				id: "h-ok",
				label: "Offers kicker",
				value: h.offersKicker,
				onChange: (v) => patch({ offersKicker: v })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				id: "h-ot",
				label: "Offers heading",
				value: h.offersTitle,
				onChange: (v) => patch({ offersTitle: v }),
				area: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				id: "h-sk",
				label: "Services kicker",
				value: h.servicesKicker,
				onChange: (v) => patch({ servicesKicker: v })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				id: "h-st",
				label: "Services heading",
				value: h.servicesTitle,
				onChange: (v) => patch({ servicesTitle: v }),
				area: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				id: "h-sd",
				label: "Services introduction",
				value: h.servicesDek,
				onChange: (v) => patch({ servicesDek: v }),
				area: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				id: "h-uk",
				label: "Studio kicker",
				value: h.studioKicker,
				onChange: (v) => patch({ studioKicker: v })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				id: "h-ut",
				label: "Studio heading",
				value: h.studioTitle,
				onChange: (v) => patch({ studioTitle: v }),
				area: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				id: "h-ub1",
				label: "Studio paragraph 1",
				value: h.studioBody1,
				onChange: (v) => patch({ studioBody1: v }),
				area: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				id: "h-ub2",
				label: "Studio paragraph 2",
				value: h.studioBody2,
				onChange: (v) => patch({ studioBody2: v }),
				area: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaPicker, {
				idPrefix: "home-studio",
				image: h.studioImage,
				alt: h.studioImageAlt,
				onImage: (src, alt) => patch({
					studioImage: src,
					studioImageAlt: alt ?? h.studioImageAlt
				}),
				onAlt: (alt) => patch({ studioImageAlt: alt })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				id: "h-ek",
				label: "Engagement kicker",
				value: h.engagementKicker,
				onChange: (v) => patch({ engagementKicker: v })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				id: "h-et",
				label: "Engagement heading",
				value: h.engagementTitle,
				onChange: (v) => patch({ engagementTitle: v })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				id: "h-pk",
				label: "Packages kicker",
				value: h.packagesKicker,
				onChange: (v) => patch({ packagesKicker: v })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				id: "h-pt",
				label: "Packages heading",
				value: h.packagesTitle,
				onChange: (v) => patch({ packagesTitle: v })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				id: "h-hk",
				label: "How-it-works kicker",
				value: h.stepsKicker,
				onChange: (v) => patch({ stepsKicker: v })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				id: "h-ht",
				label: "How-it-works heading",
				value: h.stepsTitle,
				onChange: (v) => patch({ stepsTitle: v })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				id: "h-fk",
				label: "FAQ kicker",
				value: h.faqKicker,
				onChange: (v) => patch({ faqKicker: v })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				id: "h-ft",
				label: "FAQ heading",
				value: h.faqTitle,
				onChange: (v) => patch({ faqTitle: v })
			})
		]
	});
}
function InnerFields({ copy, setCopy }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-5 rounded-xl border border-border bg-surface p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl text-fg",
						children: "Services"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "s-k",
						label: "Kicker",
						value: copy.services.kicker,
						onChange: (v) => setCopy({
							...copy,
							services: {
								...copy.services,
								kicker: v
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "s-t",
						label: "Title",
						value: copy.services.title,
						onChange: (v) => setCopy({
							...copy,
							services: {
								...copy.services,
								title: v
							}
						}),
						area: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "s-d",
						label: "Introduction",
						value: copy.services.dek,
						onChange: (v) => setCopy({
							...copy,
							services: {
								...copy.services,
								dek: v
							}
						}),
						area: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaPicker, {
						idPrefix: "svc",
						image: copy.services.image,
						alt: copy.services.imageAlt,
						onImage: (src, alt) => setCopy({
							...copy,
							services: {
								...copy.services,
								image: src,
								imageAlt: alt ?? copy.services.imageAlt
							}
						}),
						onAlt: (alt) => setCopy({
							...copy,
							services: {
								...copy.services,
								imageAlt: alt
							}
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-5 rounded-xl border border-border bg-surface p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl text-fg",
						children: "Offers index"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "o-k",
						label: "Kicker",
						value: copy.offers.kicker,
						onChange: (v) => setCopy({
							...copy,
							offers: {
								...copy.offers,
								kicker: v
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "o-t",
						label: "Title",
						value: copy.offers.title,
						onChange: (v) => setCopy({
							...copy,
							offers: {
								...copy.offers,
								title: v
							}
						}),
						area: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "o-d",
						label: "Introduction",
						value: copy.offers.dek,
						onChange: (v) => setCopy({
							...copy,
							offers: {
								...copy.offers,
								dek: v
							}
						}),
						area: true
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-5 rounded-xl border border-border bg-surface p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl text-fg",
						children: "Packages"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "p-k",
						label: "Kicker",
						value: copy.packages.kicker,
						onChange: (v) => setCopy({
							...copy,
							packages: {
								...copy.packages,
								kicker: v
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "p-t",
						label: "Title",
						value: copy.packages.title,
						onChange: (v) => setCopy({
							...copy,
							packages: {
								...copy.packages,
								title: v
							}
						}),
						area: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "p-d",
						label: "Introduction",
						value: copy.packages.dek,
						onChange: (v) => setCopy({
							...copy,
							packages: {
								...copy.packages,
								dek: v
							}
						}),
						area: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "p-st",
						label: "Section heading",
						value: copy.packages.sectionTitle,
						onChange: (v) => setCopy({
							...copy,
							packages: {
								...copy.packages,
								sectionTitle: v
							}
						}),
						area: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "p-sd",
						label: "Section label",
						value: copy.packages.sectionDek,
						onChange: (v) => setCopy({
							...copy,
							packages: {
								...copy.packages,
								sectionDek: v
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaPicker, {
						idPrefix: "pkg",
						image: copy.packages.image,
						alt: copy.packages.imageAlt,
						onImage: (src, alt) => setCopy({
							...copy,
							packages: {
								...copy.packages,
								image: src,
								imageAlt: alt ?? copy.packages.imageAlt
							}
						}),
						onAlt: (alt) => setCopy({
							...copy,
							packages: {
								...copy.packages,
								imageAlt: alt
							}
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-5 rounded-xl border border-border bg-surface p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl text-fg",
						children: "Approach"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "w-k",
						label: "Kicker",
						value: copy.work.kicker,
						onChange: (v) => setCopy({
							...copy,
							work: {
								...copy.work,
								kicker: v
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "w-t",
						label: "Title",
						value: copy.work.title,
						onChange: (v) => setCopy({
							...copy,
							work: {
								...copy.work,
								title: v
							}
						}),
						area: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "w-d",
						label: "Introduction",
						value: copy.work.dek,
						onChange: (v) => setCopy({
							...copy,
							work: {
								...copy.work,
								dek: v
							}
						}),
						area: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "w-p",
						label: "Path heading",
						value: copy.work.pathTitle,
						onChange: (v) => setCopy({
							...copy,
							work: {
								...copy.work,
								pathTitle: v
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "w-e",
						label: "Engagement heading",
						value: copy.work.engagementTitle,
						onChange: (v) => setCopy({
							...copy,
							work: {
								...copy.work,
								engagementTitle: v
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "w-bt",
						label: "Boundaries heading",
						value: copy.work.boundariesTitle,
						onChange: (v) => setCopy({
							...copy,
							work: {
								...copy.work,
								boundariesTitle: v
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaPicker, {
						idPrefix: "work",
						image: copy.work.image,
						alt: copy.work.imageAlt,
						onImage: (src, alt) => setCopy({
							...copy,
							work: {
								...copy.work,
								image: src,
								imageAlt: alt ?? copy.work.imageAlt
							}
						}),
						onAlt: (alt) => setCopy({
							...copy,
							work: {
								...copy.work,
								imageAlt: alt
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaPicker, {
						idPrefix: "work-eg",
						image: copy.work.engagementImage,
						alt: copy.work.engagementImageAlt,
						onImage: (src, alt) => setCopy({
							...copy,
							work: {
								...copy.work,
								engagementImage: src,
								engagementImageAlt: alt ?? copy.work.engagementImageAlt
							}
						}),
						onAlt: (alt) => setCopy({
							...copy,
							work: {
								...copy.work,
								engagementImageAlt: alt
							}
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-5 rounded-xl border border-border bg-surface p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl text-fg",
						children: "Intake"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "st-k",
						label: "Kicker",
						value: copy.start.kicker,
						onChange: (v) => setCopy({
							...copy,
							start: {
								...copy.start,
								kicker: v
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "st-t",
						label: "Title",
						value: copy.start.title,
						onChange: (v) => setCopy({
							...copy,
							start: {
								...copy.start,
								title: v
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "st-d",
						label: "Introduction",
						value: copy.start.dek,
						onChange: (v) => setCopy({
							...copy,
							start: {
								...copy.start,
								dek: v
							}
						}),
						area: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaPicker, {
						idPrefix: "start",
						image: copy.start.image,
						alt: copy.start.imageAlt,
						onImage: (src, alt) => setCopy({
							...copy,
							start: {
								...copy.start,
								image: src,
								imageAlt: alt ?? copy.start.imageAlt
							}
						}),
						onAlt: (alt) => setCopy({
							...copy,
							start: {
								...copy.start,
								imageAlt: alt
							}
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-5 rounded-xl border border-border bg-surface p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl text-fg",
						children: "Reception"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "r-k",
						label: "Kicker",
						value: copy.receptionist.kicker,
						onChange: (v) => setCopy({
							...copy,
							receptionist: {
								...copy.receptionist,
								kicker: v
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "r-t",
						label: "Title",
						value: copy.receptionist.title,
						onChange: (v) => setCopy({
							...copy,
							receptionist: {
								...copy.receptionist,
								title: v
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "r-d",
						label: "Introduction",
						value: copy.receptionist.dek,
						onChange: (v) => setCopy({
							...copy,
							receptionist: {
								...copy.receptionist,
								dek: v
							}
						}),
						area: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaPicker, {
						idPrefix: "reception",
						image: copy.receptionist.image,
						alt: copy.receptionist.imageAlt,
						onImage: (src, alt) => setCopy({
							...copy,
							receptionist: {
								...copy.receptionist,
								image: src,
								imageAlt: alt ?? copy.receptionist.imageAlt
							}
						}),
						onAlt: (alt) => setCopy({
							...copy,
							receptionist: {
								...copy.receptionist,
								imageAlt: alt
							}
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-5 rounded-xl border border-border bg-surface p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl text-fg",
						children: "Sign-in"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "l-k",
						label: "Kicker",
						value: copy.login.kicker,
						onChange: (v) => setCopy({
							...copy,
							login: {
								...copy.login,
								kicker: v
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "l-si",
						label: "Sign-in title",
						value: copy.login.titleSignIn,
						onChange: (v) => setCopy({
							...copy,
							login: {
								...copy.login,
								titleSignIn: v
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "l-su",
						label: "Create-account title",
						value: copy.login.titleSignUp,
						onChange: (v) => setCopy({
							...copy,
							login: {
								...copy.login,
								titleSignUp: v
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "l-d",
						label: "Introduction",
						value: copy.login.dek,
						onChange: (v) => setCopy({
							...copy,
							login: {
								...copy.login,
								dek: v
							}
						}),
						area: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "l-b",
						label: "Body",
						value: copy.login.body,
						onChange: (v) => setCopy({
							...copy,
							login: {
								...copy.login,
								body: v
							}
						}),
						area: true
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-5 rounded-xl border border-border bg-surface p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl text-fg",
						children: "Client account"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "a-k",
						label: "Kicker",
						value: copy.account.kicker,
						onChange: (v) => setCopy({
							...copy,
							account: {
								...copy.account,
								kicker: v
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "a-t",
						label: "Title",
						value: copy.account.title,
						onChange: (v) => setCopy({
							...copy,
							account: {
								...copy.account,
								title: v
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "a-d",
						label: "Introduction",
						value: copy.account.dek,
						onChange: (v) => setCopy({
							...copy,
							account: {
								...copy.account,
								dek: v
							}
						}),
						area: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaPicker, {
						idPrefix: "account",
						image: copy.account.image,
						alt: copy.account.imageAlt,
						onImage: (src, alt) => setCopy({
							...copy,
							account: {
								...copy.account,
								image: src,
								imageAlt: alt ?? copy.account.imageAlt
							}
						}),
						onAlt: (alt) => setCopy({
							...copy,
							account: {
								...copy.account,
								imageAlt: alt
							}
						})
					})
				]
			})
		]
	});
}
function FaqFields({ copy, setCopy }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-5 rounded-xl border border-border bg-surface p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl text-fg",
						children: "FAQs"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						variant: "outline",
						onClick: () => setCopy({
							...copy,
							faqs: [...copy.faqs, {
								q: "",
								a: ""
							}]
						}),
						children: "Add question"
					})]
				}), copy.faqs.map((faq, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 border-t border-border pt-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: `faq-q-${i}`,
							label: `Question ${i + 1}`,
							value: faq.q,
							onChange: (v) => setCopy({
								...copy,
								faqs: copy.faqs.map((f, n) => n === i ? {
									...f,
									q: v
								} : f)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: `faq-a-${i}`,
							label: "Answer",
							value: faq.a,
							onChange: (v) => setCopy({
								...copy,
								faqs: copy.faqs.map((f, n) => n === i ? {
									...f,
									a: v
								} : f)
							}),
							area: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "sm",
							variant: "ghost",
							onClick: () => setCopy({
								...copy,
								faqs: copy.faqs.filter((_, n) => n !== i)
							}),
							children: "Remove"
						})
					]
				}, i))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-5 rounded-xl border border-border bg-surface p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl text-fg",
					children: "Public path"
				}), copy.steps.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 border-t border-border pt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: `step-t-${i}`,
						label: `Step ${step.n} title`,
						value: step.title,
						onChange: (v) => setCopy({
							...copy,
							steps: copy.steps.map((s, n) => n === i ? {
								...s,
								title: v
							} : s)
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: `step-b-${i}`,
						label: "Body",
						value: step.body,
						onChange: (v) => setCopy({
							...copy,
							steps: copy.steps.map((s, n) => n === i ? {
								...s,
								body: v
							} : s)
						}),
						area: true
					})]
				}, i))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-5 rounded-xl border border-border bg-surface p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl text-fg",
					children: "Engagement types"
				}), copy.engagements.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 border-t border-border pt-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: `eg-l-${i}`,
							label: "Label",
							value: item.label,
							onChange: (v) => setCopy({
								...copy,
								engagements: copy.engagements.map((e, n) => n === i ? {
									...e,
									label: v
								} : e)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: `eg-b-${i}`,
							label: "Best for",
							value: item.bestFor,
							onChange: (v) => setCopy({
								...copy,
								engagements: copy.engagements.map((e, n) => n === i ? {
									...e,
									bestFor: v
								} : e)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: `eg-x-${i}`,
							label: "Examples",
							value: item.examples,
							onChange: (v) => setCopy({
								...copy,
								engagements: copy.engagements.map((e, n) => n === i ? {
									...e,
									examples: v
								} : e)
							}),
							area: true
						})
					]
				}, item.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-5 rounded-xl border border-border bg-surface p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl text-fg",
						children: "Studio boundaries"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						variant: "outline",
						onClick: () => setCopy({
							...copy,
							boundaries: [...copy.boundaries, ""]
						}),
						children: "Add line"
					})]
				}), copy.boundaries.map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 border-t border-border pt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: `bd-${i}`,
						label: `Boundary ${i + 1}`,
						value: line,
						onChange: (v) => setCopy({
							...copy,
							boundaries: copy.boundaries.map((b, n) => n === i ? v : b)
						}),
						area: true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						variant: "ghost",
						onClick: () => setCopy({
							...copy,
							boundaries: copy.boundaries.filter((_, n) => n !== i)
						}),
						children: "Remove"
					})]
				}, i))]
			})
		]
	});
}
function ChromeFields({ copy, setCopy }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "space-y-5 rounded-xl border border-border bg-surface p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl text-fg",
					children: "Navigation labels"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: "n-s",
					label: "Services",
					value: copy.nav.services,
					onChange: (v) => setCopy({
						...copy,
						nav: {
							...copy.nav,
							services: v
						}
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: "n-o",
					label: "Offers",
					value: copy.nav.offers,
					onChange: (v) => setCopy({
						...copy,
						nav: {
							...copy.nav,
							offers: v
						}
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: "n-p",
					label: "Packages",
					value: copy.nav.packages,
					onChange: (v) => setCopy({
						...copy,
						nav: {
							...copy.nav,
							packages: v
						}
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: "n-w",
					label: "Approach",
					value: copy.nav.work,
					onChange: (v) => setCopy({
						...copy,
						nav: {
							...copy.nav,
							work: v
						}
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: "n-st",
					label: "Start button",
					value: copy.nav.startCta,
					onChange: (v) => setCopy({
						...copy,
						nav: {
							...copy.nav,
							startCta: v
						}
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: "n-r",
					label: "Reception link",
					value: copy.nav.receptionCta,
					onChange: (v) => setCopy({
						...copy,
						nav: {
							...copy.nav,
							receptionCta: v
						}
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "space-y-5 rounded-xl border border-border bg-surface p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl text-fg",
					children: "Public contact"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Shown in the footer. This is display copy — not domain, DNS, or banking details."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: "c-e",
					label: "Public email",
					value: copy.contact.email,
					onChange: (v) => setCopy({
						...copy,
						contact: {
							...copy.contact,
							email: v
						}
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: "c-p",
					label: "Public phone",
					value: copy.contact.phone,
					onChange: (v) => setCopy({
						...copy,
						contact: {
							...copy.contact,
							phone: v
						}
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					id: "c-a",
					label: "Address line",
					value: copy.contact.addressLine,
					onChange: (v) => setCopy({
						...copy,
						contact: {
							...copy.contact,
							addressLine: v
						}
					})
				})
			]
		})]
	});
}
function FooterFields({ copy, setCopy }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 rounded-xl border border-border bg-surface p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				id: "f-b",
				label: "Footer blurb",
				value: copy.footer.blurb,
				onChange: (v) => setCopy({
					...copy,
					footer: {
						...copy.footer,
						blurb: v
					}
				}),
				area: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				id: "f-l",
				label: "Footer legal line",
				value: copy.footer.legalLine,
				onChange: (v) => setCopy({
					...copy,
					footer: {
						...copy.footer,
						legalLine: v
					}
				}),
				area: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				id: "c-t",
				label: "Closing title",
				value: copy.cta.title,
				onChange: (v) => setCopy({
					...copy,
					cta: {
						...copy.cta,
						title: v
					}
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				id: "c-b",
				label: "Closing body",
				value: copy.cta.body,
				onChange: (v) => setCopy({
					...copy,
					cta: {
						...copy.cta,
						body: v
					}
				}),
				area: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				id: "c-sl",
				label: "Closing start button",
				value: copy.cta.startLabel,
				onChange: (v) => setCopy({
					...copy,
					cta: {
						...copy.cta,
						startLabel: v
					}
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				id: "c-rl",
				label: "Closing reception button",
				value: copy.cta.receptionLabel,
				onChange: (v) => setCopy({
					...copy,
					cta: {
						...copy.cta,
						receptionLabel: v
					}
				})
			})
		]
	});
}
//#endregion
export { PagesEditor as component };
