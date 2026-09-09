import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as formatMoney, n as formatDate } from "./utils-BTLGo2_i.mjs";
import { B as useCurrentUserState, I as updateMyMarketing, O as listMyNotifications, S as Button, T as getMyProfile, f as useSiteCopy, k as listMyWork, z as RedirectToSignIn } from "./router-DxJdDo-e.mjs";
import { t as PageHero } from "./page-hero-CPyRRzn8.mjs";
import { n as ORDER_STATUS_LABEL, t as INQUIRY_STATUS_LABEL } from "./commerce-BoLC0y_C.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account.index-Bb6Mzar8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AccountPage() {
	const copy = useSiteCopy();
	const { user, isPending } = useCurrentUserState();
	const [inquiries, setInquiries] = (0, import_react.useState)([]);
	const [orders, setOrders] = (0, import_react.useState)([]);
	const [notes, setNotes] = (0, import_react.useState)([]);
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const [loaded, setLoaded] = (0, import_react.useState)(false);
	const [saving, setSaving] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (isPending || !user) return;
		let cancelled = false;
		Promise.all([
			listMyWork(),
			listMyNotifications(),
			getMyProfile()
		]).then(([work, notifications, me]) => {
			if (cancelled) return;
			setInquiries(work.inquiries);
			setOrders(work.orders);
			setNotes(notifications);
			setProfile(me);
			setLoaded(true);
		}).catch((e) => {
			if (cancelled) return;
			const message = e instanceof Error ? e.message : "Could not load the account.";
			if (message === "Unauthorized") setError("signin");
			else setError(message);
			setLoaded(true);
		});
		return () => {
			cancelled = true;
		};
	}, [user?.id, isPending]);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { className: "min-h-[60dvh]" });
	if (!user || error === "signin") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	const toggleMarketing = async (next) => {
		setSaving(true);
		try {
			const updated = await updateMyMarketing({ data: { marketingOptIn: next } });
			setProfile(updated);
		} catch (e) {
			setError(e instanceof Error ? e.message : "Could not update preference.");
		} finally {
			setSaving(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		src: copy.account.image,
		alt: copy.account.imageAlt,
		kicker: copy.account.kicker,
		title: user.displayName ? `Hello, ${user.displayName}.` : copy.account.title,
		dek: copy.account.dek,
		compact: true
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6",
		children: [
			error && error !== "signin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-6 text-sm text-danger",
				children: error
			}) : null,
			notes.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-12 rounded-xl border border-border bg-surface p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-[0.18em] text-subtle",
					children: "From the studio"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-3",
					children: notes.slice(0, 5).map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-fg",
								children: n.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-muted",
								children: n.body
							}),
							n.orderId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/account/orders/$id",
								params: { id: n.orderId },
								className: "mt-1 inline-block text-xs text-fg underline underline-offset-4",
								children: "Open order"
							}) : null
						]
					}, n.id))
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col justify-between gap-4 sm:flex-row sm:items-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-[0.18em] text-subtle",
					children: "Orders"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-3xl text-fg",
					children: "Packages and offers"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/packages",
						children: "Order a package"
					})
				})]
			}),
			!loaded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-sm text-muted",
				children: "Loading…"
			}) : orders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-sm text-muted",
				children: "No orders yet. Launch packages can be purchased from the catalog."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-8 divide-y divide-border border-y border-border",
				children: orders.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "grid gap-2 py-5 sm:grid-cols-12 sm:items-baseline",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg text-fg sm:col-span-5",
							children: o.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted sm:col-span-3",
							children: [ORDER_STATUS_LABEL[o.status] ?? o.status, o.receiptNumber ? ` · ${o.receiptNumber}` : ""]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-sm tabular-nums text-fg sm:col-span-2",
							children: [formatMoney(o.amount), o.priceSuffix]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "sm:col-span-2 sm:text-right",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/account/orders/$id",
								params: { id: o.id },
								className: "text-sm text-fg underline decoration-border underline-offset-4",
								children: o.status === "pending_payment" ? "Pay" : o.receiptNumber ? "Receipt" : "View"
							})
						})
					]
				}, o.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-[0.18em] text-subtle",
					children: "Inquiries"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-3xl text-fg",
					children: "Work you described"
				})]
			}),
			!loaded ? null : inquiries.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-8 text-sm text-muted",
				children: [
					"No inquiries yet.",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/start",
						className: "text-fg underline underline-offset-4",
						children: "Start a project"
					}),
					" ",
					"or talk to reception."
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-8 divide-y divide-border border-y border-border",
				children: inquiries.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "grid gap-2 py-5 sm:grid-cols-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "sm:col-span-7",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-fg",
								children: i.desiredOutcome
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-subtle",
								children: i.routingSummary
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted sm:col-span-3",
							children: INQUIRY_STATUS_LABEL[i.status] ?? i.status
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-subtle sm:col-span-2 sm:text-right",
							children: formatDate(i.createdAt)
						})
					]
				}, i.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-16 rounded-xl border border-border bg-surface p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.18em] text-subtle",
						children: "Your information"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-2xl text-fg",
						children: "Marketing preference"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 max-w-2xl text-sm leading-relaxed text-muted",
						children: [
							"Virellion keeps an operational record of your account so we can serve the work. Marketing contact is separate and optional. You can read the",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/privacy",
								className: "text-fg underline underline-offset-4",
								children: "Privacy Notice"
							}),
							" ",
							"and",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/terms",
								className: "text-fg underline underline-offset-4",
								children: "Terms of Engagement"
							}),
							" ",
							"at any time."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-5 flex min-h-11 cursor-pointer items-start gap-3 text-sm text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							className: "mt-1 size-4 accent-accent",
							checked: Boolean(profile?.marketingOptIn),
							disabled: saving || !profile,
							onChange: (e) => void toggleMarketing(e.target.checked)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Virellion may email me about related studio services. I can turn this off at any time. This is not required to receive receipts or project updates." })]
					})
				]
			})
		]
	})] });
}
//#endregion
export { AccountPage as component };
