import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as getStudioSettings, P as saveStudioSettings, S as Button, u as useStudioProfile } from "./router-DxJdDo-e.mjs";
import { n as buildPaypalUrl, r as normalizePaypalMe } from "./paypal-C4s4REeX.mjs";
import { t as Input } from "./input-B1NnXfay.mjs";
import { t as Label } from "./label-Cmem6H5a.mjs";
import { i as isOperator } from "./access-Ty0QsjcV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/payments-CVKTE1Ha.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PaymentsPage() {
	const { profile } = useStudioProfile();
	const [form, setForm] = (0, import_react.useState)({
		paypalMe: "",
		paypalEmail: "",
		paypalLink: "",
		notifyEmail: ""
	});
	const [error, setError] = (0, import_react.useState)("");
	const [saved, setSaved] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!isOperator(profile?.role)) return;
		getStudioSettings().then(setForm).catch((e) => setError(e instanceof Error ? e.message : "Could not load payment settings."));
	}, [profile?.role]);
	if (profile && !isOperator(profile.role)) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "px-4 py-8 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl text-fg",
			children: "PayPal"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-xl text-sm leading-relaxed text-muted",
			children: "Payout details stay with the studio operator. Partners cannot change banking information, confirm receipts, or reset passwords from this desk."
		})]
	});
	const preview = buildPaypalUrl(form, {
		id: "ord_preview",
		title: "Preview package",
		amount: 490
	});
	const submit = async () => {
		setBusy(true);
		setError("");
		setSaved("");
		try {
			const next = await saveStudioSettings({ data: {
				paypalMe: normalizePaypalMe(form.paypalMe) || form.paypalMe.trim(),
				paypalEmail: form.paypalEmail.trim(),
				paypalLink: form.paypalLink.trim(),
				notifyEmail: form.notifyEmail.trim()
			} });
			setForm(next);
			setSaved("Payment settings saved. Client PayPal buttons will use this checkout.");
		} catch (e) {
			setError(e instanceof Error ? e.message : "Could not save.");
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "px-4 py-8 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-[0.18em] text-subtle",
				children: "Payments"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-3xl text-fg",
				children: "Connect PayPal"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-sm leading-relaxed text-muted",
				children: "Clients already pay into the PayPal account you use for POS. Add your PayPal.me name, business email, or an existing PayPal checkout link. Virellion never stores card numbers. You confirm funds in PayPal, then mark the order paid so the client receives a receipt."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-8 max-w-xl space-y-6 rounded-xl border border-border bg-surface p-6",
				onSubmit: (e) => {
					e.preventDefault();
					submit();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "paypal-me",
								children: "PayPal.me name"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "paypal-me",
								value: form.paypalMe,
								onChange: (e) => setForm((f) => ({
									...f,
									paypalMe: e.target.value
								})),
								placeholder: "yourname",
								autoComplete: "off"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-subtle",
								children: "Example: virellion — opens paypal.me/virellion with the order amount."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "paypal-email",
								children: "PayPal business email"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "paypal-email",
								type: "email",
								value: form.paypalEmail,
								onChange: (e) => setForm((f) => ({
									...f,
									paypalEmail: e.target.value
								})),
								placeholder: "payments@studio.com",
								autoComplete: "off"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-subtle",
								children: "Used if you do not use PayPal.me. The order number is sent as the invoice ID."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "paypal-link",
								children: "Or a PayPal checkout link"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "paypal-link",
								value: form.paypalLink,
								onChange: (e) => setForm((f) => ({
									...f,
									paypalLink: e.target.value
								})),
								placeholder: "https://www.paypal.com/…",
								autoComplete: "off"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-subtle",
								children: "Paste a link from your PayPal POS or business tools if you prefer a fixed checkout page."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "notify-email",
								children: "Studio notify email"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "notify-email",
								type: "email",
								value: form.notifyEmail,
								onChange: (e) => setForm((f) => ({
									...f,
									notifyEmail: e.target.value
								})),
								placeholder: "you@studio.com",
								autoComplete: "off"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-subtle",
								children: "Kept on file so you know which inbox to watch. Live alerts appear in Desk → Client work. This site does not send email itself."
							})
						]
					}),
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
						children: busy ? "Saving…" : "Save PayPal"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 max-w-xl rounded-xl border border-border bg-raised/40 p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.14em] text-subtle",
					children: "Preview"
				}), preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 break-all text-sm text-muted",
					children: preview
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: "Add a PayPal.me name, business email, or checkout link to activate the button."
				})]
			})
		]
	});
}
//#endregion
export { PaymentsPage as component };
