import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { H as notFound, S as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as formatMoney, n as formatDate } from "./utils-BTLGo2_i.mjs";
import { t as SITE } from "./site-copy-C858ekuO.mjs";
import { B as useCurrentUserState, F as submitPayment, S as Button, d as VirellionMark, n as Route$1, w as getMyOrder, z as RedirectToSignIn } from "./router-DxJdDo-e.mjs";
import { t as PageHero } from "./page-hero-CPyRRzn8.mjs";
import { n as ORDER_STATUS_LABEL, r as getPurchasable } from "./commerce-BoLC0y_C.mjs";
import { t as PAYMENT_METHOD_LABEL } from "./paypal-C4s4REeX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account.orders._id-Vq1c8zU4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ReceiptSheet({ order }) {
	const method = PAYMENT_METHOD_LABEL[order.paymentMethod] ?? order.paymentMethod ?? "Confirmed";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		id: "receipt-sheet",
		className: "receipt-print rounded-xl border border-border bg-paper px-6 py-8 text-ink sm:px-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-start justify-between gap-4 border-b border-line pb-6 text-ink",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VirellionMark, { className: "size-7 text-ink" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl tracking-[0.18em] text-ink",
						children: SITE.wordmark
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 font-mono text-[11px] tracking-wide text-ink-soft",
						children: SITE.host
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.14em] text-ink-soft",
						children: "Receipt"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-mono text-sm text-ink",
						children: order.receiptNumber ?? "Pending"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-6 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.14em] text-ink-soft",
						children: "Billed to"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-ink",
						children: order.billingName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-ink-soft",
						children: order.billingEmail
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sm:text-right",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-[0.14em] text-ink-soft",
							children: "Paid"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-ink",
							children: order.paidAt ? formatDate(order.paidAt) : "Awaiting confirmation"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-ink-soft",
							children: ["Order ", order.id]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "mt-8 w-full text-left text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-line text-xs uppercase tracking-[0.14em] text-ink-soft",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-2 font-medium",
						children: "Description"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-2 text-right font-medium",
						children: "Amount"
					})]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-line",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						className: "py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-ink",
							children: order.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-ink-soft",
							children: order.summary
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						className: "py-4 text-right font-mono tabular-nums text-ink",
						children: [formatMoney(order.amount), order.priceSuffix]
					})]
				}) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "max-w-sm text-xs leading-relaxed text-ink-soft",
					children: [
						"Method: ",
						method,
						". Studio receipt for professional services. Not legal, tax, or licensed advice. Terms version",
						" ",
						order.termsVersion || "—",
						"."
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-display text-2xl text-ink",
					children: [formatMoney(order.amount), order.priceSuffix]
				})]
			})
		]
	});
}
function OrderPage() {
	const { id } = Route$1.useParams();
	const { user, isPending } = useCurrentUserState();
	const [order, setOrder] = (0, import_react.useState)(void 0);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const load = () => {
		getMyOrder({ data: { id } }).then(setOrder).catch((e) => {
			if (e instanceof Error && e.message === "Unauthorized") setOrder(null);
			else setError(e instanceof Error ? e.message : "Could not load the order.");
		});
	};
	(0, import_react.useEffect)(() => {
		if (isPending || !user) return;
		load();
	}, [
		id,
		user?.id,
		isPending
	]);
	if (isPending || order === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { className: "min-h-[60dvh]" });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	if (order === null) throw notFound();
	const item = getPurchasable(order.kind, order.catalogId);
	const canPay = order.status === "pending_payment" || order.status === "payment_submitted";
	const isPaid = order.status === "paid" || order.status === "in_progress" || order.status === "complete";
	const pay = async (method) => {
		setBusy(true);
		setError("");
		try {
			const result = await submitPayment({ data: {
				orderId: order.id,
				method
			} });
			if (method === "paypal" && !result.paypalUrl && !order.paypalUrl) setError("PayPal is not connected yet. Request an invoice, or the studio will send a link.");
			load();
		} catch (e) {
			setError(e instanceof Error ? e.message : "Could not submit payment.");
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		src: item?.image ?? "/media/commerce.jpg",
		alt: item?.imageAlt ?? "Order",
		kicker: "Order",
		title: order.title,
		dek: `${formatMoney(order.amount)}${order.priceSuffix} · ${ORDER_STATUS_LABEL[order.status] ?? order.status}`,
		compact: true
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-3xl px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-muted",
				children: order.summary
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-8 grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-surface p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs uppercase tracking-[0.14em] text-subtle",
						children: "Amount due"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
						className: "mt-2 font-display text-2xl text-fg",
						children: [formatMoney(order.amount), order.priceSuffix]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-surface p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs uppercase tracking-[0.14em] text-subtle",
						children: "Placed"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-2 font-display text-2xl text-fg",
						children: formatDate(order.createdAt)
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 text-sm text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Billed to ",
						order.billingName,
						" · ",
						order.billingEmail
					] }),
					order.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2",
						children: order.notes
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 font-mono text-xs text-subtle",
						children: ["Order ", order.id]
					})
				]
			}),
			canPay ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12 rounded-xl border border-border bg-surface p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl text-fg",
						children: "Pay this order"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-relaxed text-muted",
						children: "PayPal opens the studio’s existing PayPal checkout with this amount. Include the order number in the PayPal note. Virellion never collects card numbers or PayPal passwords here. Production starts after the studio confirms funds, unless a deposit plan is agreed in writing."
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-danger",
						children: error
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap",
						children: [
							order.paypalUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: order.paypalUrl,
									target: "_blank",
									rel: "noopener noreferrer",
									onClick: () => void pay("paypal"),
									children: "Pay with PayPal"
								})
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								disabled: true,
								title: "The studio is connecting PayPal",
								children: "Pay with PayPal"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								disabled: busy,
								onClick: () => void pay("invoice"),
								children: "Request an invoice"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								disabled: busy,
								onClick: () => void pay("card_link"),
								children: "Pay by card link"
							})
						]
					}),
					!order.paypalUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-subtle",
						children: "PayPal checkout is being connected by the studio. You can request an invoice now."
					}) : null,
					order.status === "payment_submitted" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-muted",
						children: order.paymentMethod === "paypal" ? "If PayPal did not open, use Pay with PayPal again. The studio is notified and will confirm funds." : `Request received via ${PAYMENT_METHOD_LABEL[order.paymentMethod] ?? order.paymentMethod}. Waiting for the studio to confirm funds.`
					}) : null
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12 rounded-xl border border-border bg-surface p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl text-fg",
					children: ORDER_STATUS_LABEL[order.status]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm text-muted",
					children: [
						order.paymentMethod ? `Recorded as ${PAYMENT_METHOD_LABEL[order.paymentMethod] ?? order.paymentMethod}.` : "The studio will update this record as the work moves.",
						" ",
						order.receiptNumber ? `Receipt ${order.receiptNumber}.` : ""
					]
				})]
			}),
			isPaid && order.receiptNumber ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-end justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl text-fg",
						children: "Receipt"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						className: "print:hidden",
						onClick: () => window.print(),
						children: "Print receipt"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReceiptSheet, { order })]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 print:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/account",
					className: "text-sm text-fg underline decoration-border underline-offset-4",
					children: "Back to account"
				})
			})
		]
	})] });
}
//#endregion
export { OrderPage as component };
