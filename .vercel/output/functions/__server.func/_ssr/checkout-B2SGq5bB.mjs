import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, v as Link, y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as formatMoney } from "./utils-BTLGo2_i.mjs";
import { i as purchasableFromLive } from "./catalog-live-DrcRqM9_.mjs";
import { B as useCurrentUserState, N as placeOrder, S as Button, g as useLiveCatalog, l as Route$28 } from "./router-DxJdDo-e.mjs";
import { t as PageHero } from "./page-hero-CPyRRzn8.mjs";
import { a as parseItemParam } from "./commerce-BoLC0y_C.mjs";
import { n as Textarea, t as Input } from "./input-B1NnXfay.mjs";
import { t as Label } from "./label-Cmem6H5a.mjs";
import { n as EngagementNotice, t as ConsentFields } from "./consent-fields-DPBzMLkC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-B2SGq5bB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CheckoutPage() {
	const { item: raw } = Route$28.useSearch();
	const parsed = parseItemParam(raw);
	const catalog = useLiveCatalog();
	const item = parsed ? purchasableFromLive(catalog, parsed.kind, parsed.id) : null;
	const { user, isPending } = useCurrentUserState();
	const [billingName, setBillingName] = (0, import_react.useState)("");
	const [billingEmail, setBillingEmail] = (0, import_react.useState)("");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [terms, setTerms] = (0, import_react.useState)(false);
	const [marketing, setMarketing] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [orderId, setOrderId] = (0, import_react.useState)(null);
	const prefill = (0, import_react.useMemo)(() => {
		return {
			name: user?.displayName ?? "",
			email: user?.primaryEmail ?? ""
		};
	}, [user?.displayName, user?.primaryEmail]);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { className: "min-h-[60dvh]" });
	if (!user) {
		const redirect = `/checkout${raw ? `?item=${encodeURIComponent(raw)}` : ""}`;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
			to: "/login",
			search: { redirect }
		});
	}
	if (!item) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-xl px-4 py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl text-fg",
				children: "Nothing to order"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: "Choose a launch package or flagship offer first."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-6",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/packages",
					children: "View packages"
				})
			})
		]
	});
	if (!item.instant) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/start" });
	if (orderId) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/account/orders/$id",
		params: { id: orderId }
	});
	const name = billingName || prefill.name;
	const email = billingEmail || prefill.email;
	const submit = async () => {
		setError("");
		if (!name.trim() || !email.trim()) {
			setError("Billing name and email are required.");
			return;
		}
		if (!terms) {
			setError("Please agree to the Terms of Engagement and Privacy Notice.");
			return;
		}
		setBusy(true);
		try {
			const result = await placeOrder({ data: {
				kind: item.kind,
				id: item.id,
				billingName: name.trim(),
				billingEmail: email.trim(),
				notes,
				termsAccepted: true,
				marketingOptIn: marketing
			} });
			setOrderId(result.id);
		} catch (e) {
			setError(e instanceof Error ? e.message : "Could not place the order.");
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		src: item.image,
		alt: item.imageAlt,
		kicker: "Checkout",
		title: item.title,
		dek: `${formatMoney(item.amount)}${item.priceSuffix} · ${item.timeline}`,
		compact: true
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-muted",
				children: item.summary
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-sm leading-relaxed text-subtle",
				children: "Placing the order reserves the package at the published starting price. Next you pay with PayPal, request an invoice, or ask for a secure card link. Virellion never stores card numbers. Custom or regulated work is scoped after intake — not sold as a click-to-buy."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EngagementNotice, { className: "mt-8" })
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "rounded-xl border border-border bg-surface p-6",
			onSubmit: (e) => {
				e.preventDefault();
				submit();
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "billing-name",
						children: "Billing name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "billing-name",
						value: billingName,
						placeholder: prefill.name,
						onChange: (e) => setBillingName(e.target.value),
						autoComplete: "name"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "billing-email",
						children: "Billing email"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "billing-email",
						type: "email",
						value: billingEmail,
						placeholder: prefill.email,
						onChange: (e) => setBillingEmail(e.target.value),
						autoComplete: "email"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "notes",
						children: "Notes for the studio"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "notes",
						value: notes,
						onChange: (e) => setNotes(e.target.value),
						placeholder: "Assets, deadline, marketplace, manuscript status…"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsentFields, {
						idPrefix: "checkout",
						terms,
						onTerms: setTerms,
						marketing,
						onMarketing: setMarketing
					})
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-danger",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 text-xs text-subtle",
					children: [
						"Signed in as ",
						user.primaryEmail ?? user.displayName,
						".",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/account",
							className: "text-fg underline underline-offset-4",
							children: "Account"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					className: "mt-4 w-full",
					disabled: busy || !terms,
					children: busy ? "Placing order…" : `Place order · ${formatMoney(item.amount)}${item.priceSuffix}`
				})
			]
		})]
	})] });
}
//#endregion
export { CheckoutPage as component };
