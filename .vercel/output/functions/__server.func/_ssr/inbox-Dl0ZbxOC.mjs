import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as formatMoney, n as formatDate, r as formatDateTime } from "./utils-BTLGo2_i.mjs";
import { L as updateStudioOrder, M as markStudioNotificationsRead, S as Button, j as listStudioInbox, u as useStudioProfile } from "./router-DxJdDo-e.mjs";
import { n as ORDER_STATUS_LABEL, t as INQUIRY_STATUS_LABEL } from "./commerce-BoLC0y_C.mjs";
import { t as PAYMENT_METHOD_LABEL } from "./paypal-C4s4REeX.mjs";
import { i as isOperator } from "./access-Ty0QsjcV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inbox-Dl0ZbxOC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function InboxPage() {
	const { profile } = useStudioProfile();
	const operator = isOperator(profile?.role);
	const [inquiries, setInquiries] = (0, import_react.useState)([]);
	const [orders, setOrders] = (0, import_react.useState)([]);
	const [notifications, setNotifications] = (0, import_react.useState)([]);
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(null);
	const load = () => {
		listStudioInbox().then((data) => {
			setInquiries(data.inquiries);
			setOrders(data.orders);
			setNotifications(data.notifications);
		}).catch((e) => {
			setError(e instanceof Error ? e.message : "Could not load the inbox.");
		});
	};
	(0, import_react.useEffect)(() => {
		load();
		const id = window.setInterval(load, 2e4);
		return () => window.clearInterval(id);
	}, []);
	const unread = notifications.filter((n) => !n.readAt).length;
	const setStatus = async (orderId, status) => {
		setBusy(orderId);
		try {
			await updateStudioOrder({ data: {
				orderId,
				status
			} });
			load();
		} catch (e) {
			setError(e instanceof Error ? e.message : "Could not update the order.");
		} finally {
			setBusy(null);
		}
	};
	const markRead = async () => {
		try {
			await markStudioNotificationsRead();
			load();
		} catch (e) {
			setError(e instanceof Error ? e.message : "Could not update notifications.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "px-4 py-8 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-[0.18em] text-subtle",
				children: "Client work"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-3xl text-fg",
				children: "Inbox"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-sm text-muted",
				children: "Orders, inquiries, and payment alerts. Confirm funds in PayPal (or your invoice), then mark paid — that issues the client receipt. Local demo records stay under Workspace."
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-danger",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10 rounded-xl border border-border bg-surface p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-xl text-fg",
						children: ["Notifications ", unread ? `(${unread} new)` : ""]
					}), unread ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => void markRead(),
						children: "Mark read"
					}) : null]
				}), notifications.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted",
					children: "No alerts yet. New orders and PayPal submissions appear here."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 divide-y divide-border",
					children: notifications.slice(0, 8).map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "py-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: n.readAt ? "text-sm text-muted" : "text-sm text-fg",
								children: n.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-subtle",
								children: n.body
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-subtle",
								children: formatDateTime(n.createdAt)
							})
						]
					}, n.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl text-fg",
					children: "Orders"
				}), orders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted",
					children: "No client orders yet."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 divide-y divide-border border-y border-border",
					children: orders.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "py-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-lg text-fg",
									children: o.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm text-muted",
									children: [
										o.billingName,
										" · ",
										o.billingEmail,
										" · ",
										formatDate(o.createdAt)
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm text-subtle",
									children: [
										ORDER_STATUS_LABEL[o.status],
										o.paymentMethod ? ` · ${PAYMENT_METHOD_LABEL[o.paymentMethod] ?? o.paymentMethod}` : "",
										o.receiptNumber ? ` · ${o.receiptNumber}` : ""
									]
								}),
								o.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted",
									children: o.notes
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-mono text-xs text-subtle",
									children: o.id
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-start gap-2 lg:items-end",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-mono text-sm tabular-nums text-fg",
									children: [formatMoney(o.amount), o.priceSuffix]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-2",
									children: [
										operator && (o.status === "payment_submitted" || o.status === "pending_payment") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											disabled: busy === o.id,
											onClick: () => void setStatus(o.id, "paid"),
											children: "Mark paid · issue receipt"
										}) : null,
										o.status === "paid" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											variant: "outline",
											disabled: busy === o.id,
											onClick: () => void setStatus(o.id, "in_progress"),
											children: "Start production"
										}) : null,
										o.status === "in_progress" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											variant: "outline",
											disabled: busy === o.id,
											onClick: () => void setStatus(o.id, "complete"),
											children: "Complete"
										}) : null
									]
								})]
							})]
						})
					}, o.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl text-fg",
					children: "Inquiries"
				}), inquiries.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted",
					children: "No client inquiries yet."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 divide-y divide-border border-y border-border",
					children: inquiries.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "grid gap-2 py-5 sm:grid-cols-12",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sm:col-span-7",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-fg",
										children: i.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-muted",
										children: i.desiredOutcome
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-subtle",
										children: i.routingSummary
									})
								]
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
				})]
			}),
			operator ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-10 text-sm text-subtle",
				children: [
					"Set PayPal in",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/hq/payments",
						className: "text-fg underline underline-offset-4",
						children: "Payments"
					}),
					". Client roster is under",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/hq/clients",
						className: "text-fg underline underline-offset-4",
						children: "Clients"
					}),
					"."
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 text-sm text-subtle",
				children: "Receipts and PayPal stay with the studio operator. You can move production status after an order is paid."
			})
		]
	});
}
//#endregion
export { InboxPage as component };
