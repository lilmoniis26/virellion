import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as formatDate } from "./utils-BTLGo2_i.mjs";
import { A as listStudioClients, S as Button, u as useStudioProfile } from "./router-DxJdDo-e.mjs";
import { i as isOperator } from "./access-Ty0QsjcV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/clients-CAFjfSoc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ClientsPage() {
	const { profile } = useStudioProfile();
	const operator = isOperator(profile?.role);
	const [rows, setRows] = (0, import_react.useState)([]);
	const [error, setError] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [copied, setCopied] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		listStudioClients().then(setRows).catch((e) => setError(e instanceof Error ? e.message : "Could not load clients."));
	}, []);
	const visible = (0, import_react.useMemo)(() => filter === "marketing" ? rows.filter((r) => r.marketingOptIn) : rows, [rows, filter]);
	const exportCsv = (marketingOnly) => {
		const source = marketingOnly ? rows.filter((r) => r.marketingOptIn) : rows;
		const header = [
			"Name",
			"Email",
			"Phone",
			"Marketing opt-in",
			"Opt-in date",
			"Last order",
			"Account created"
		];
		const lines = source.map((r) => [
			csv(r.name),
			csv(r.email),
			csv(r.phone),
			r.marketingOptIn ? "yes" : "no",
			r.marketingOptInAt ? formatDate(r.marketingOptInAt) : "",
			csv(r.lastOrderTitle ?? ""),
			formatDate(r.createdAt)
		].join(","));
		const blob = new Blob([[header.join(","), ...lines].join("\n")], { type: "text/csv;charset=utf-8" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = marketingOnly ? "virellion-marketing-list.csv" : "virellion-clients.csv";
		a.click();
		URL.revokeObjectURL(url);
	};
	const copyEmails = async () => {
		const emails = visible.map((r) => r.email).filter(Boolean).join(", ");
		try {
			await navigator.clipboard.writeText(emails);
			setCopied(emails ? "Emails copied." : "No emails on this list.");
		} catch {
			setCopied("Could not copy. Select the emails in the table instead.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "px-4 py-8 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-[0.18em] text-subtle",
				children: "Clients"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-3xl text-fg",
				children: "Account list"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-sm leading-relaxed text-muted",
				children: "Every signed-in client. Use the full list for operations. Use the marketing list only for people who opted in — that is the permission they gave you. Opting in is not implied by placing an order."
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-danger",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: filter === "all" ? "primary" : "outline",
						onClick: () => setFilter("all"),
						children: [
							"All clients (",
							rows.length,
							")"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: filter === "marketing" ? "primary" : "outline",
						onClick: () => setFilter("marketing"),
						children: [
							"Marketing list (",
							rows.filter((r) => r.marketingOptIn).length,
							")"
						]
					}),
					operator ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: () => void copyEmails(),
						children: "Copy emails"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: () => exportCsv(filter === "marketing"),
						children: "Download CSV"
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-subtle",
						children: "Export stays with the operator."
					})
				]
			}),
			copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-ok",
				children: copied
			}) : null,
			visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 text-sm text-muted",
				children: filter === "marketing" ? "No one has opted in to marketing yet. Checkout and intake both offer the optional box." : "No client accounts yet. The first account on this site is the studio operator."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[640px] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border text-xs uppercase tracking-[0.14em] text-subtle",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-3 font-medium",
								children: "Client"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-3 font-medium",
								children: "Contact"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-3 font-medium",
								children: "Marketing"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-3 font-medium",
								children: "Activity"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-border",
						children: visible.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "py-4 align-top",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-fg",
									children: r.name || "Unnamed"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs text-subtle",
									children: ["Since ", formatDate(r.createdAt)]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "py-4 align-top text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: r.email }), r.phone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1",
									children: r.phone
								}) : null]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "py-4 align-top",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: r.marketingOptIn ? "text-ok" : "text-subtle",
									children: r.marketingOptIn ? "Opted in" : "Not for marketing"
								}), r.termsAcceptedAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs text-subtle",
									children: ["Terms ", r.termsVersion]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-subtle",
									children: "Terms not yet on file"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "py-4 align-top text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									r.orderCount,
									" order",
									r.orderCount === 1 ? "" : "s",
									" · ",
									r.inquiryCount,
									" inquir",
									r.inquiryCount === 1 ? "y" : "ies"
								] }), r.lastOrderTitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-subtle",
									children: r.lastOrderTitle
								}) : null]
							})
						] }, r.userId))
					})]
				})
			})
		]
	});
}
function csv(value) {
	if (/[",\n]/.test(value)) return `"${value.replaceAll("\"", "\"\"")}"`;
	return value;
}
//#endregion
export { ClientsPage as component };
