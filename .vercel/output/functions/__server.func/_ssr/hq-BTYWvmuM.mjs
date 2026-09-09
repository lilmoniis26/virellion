import { S as require_jsx_runtime, d as useRouterState, m as Outlet, v as Link, y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-BTLGo2_i.mjs";
import { a as Scale, c as LayoutDashboard, d as Files, f as FilePenLine, g as Bot, h as CirclePlay, l as Inbox, m as ClipboardCheck, n as Users, p as CreditCard, r as UserPlus, s as Library, u as FolderKanban } from "../_libs/lucide-react.mjs";
import { u as useStudioProfile, z as RedirectToSignIn } from "./router-DxJdDo-e.mjs";
import { a as isStaff, i as isOperator } from "./access-Ty0QsjcV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hq-BTYWvmuM.js
var import_jsx_runtime = require_jsx_runtime();
var ITEMS = [
	{
		to: "/hq",
		label: "Overview",
		icon: LayoutDashboard,
		exact: true
	},
	{
		to: "/hq/inbox",
		label: "Client work",
		icon: Inbox
	},
	{
		to: "/hq/clients",
		label: "Clients",
		icon: Users
	},
	{
		to: "/hq/pages",
		label: "Pages",
		icon: FilePenLine
	},
	{
		to: "/hq/catalog",
		label: "Catalog",
		icon: Library
	},
	{
		to: "/hq/payments",
		label: "PayPal",
		icon: CreditCard,
		operatorOnly: true
	},
	{
		to: "/hq/legal",
		label: "Terms",
		icon: Scale,
		operatorOnly: true
	},
	{
		to: "/hq/team",
		label: "Partners",
		icon: UserPlus,
		operatorOnly: true
	},
	{
		to: "/hq/inquiries",
		label: "Workspace",
		icon: Files
	},
	{
		to: "/hq/projects",
		label: "Projects",
		icon: FolderKanban
	},
	{
		to: "/hq/assistants",
		label: "Assistants",
		icon: Bot
	},
	{
		to: "/hq/quality",
		label: "Quality",
		icon: ClipboardCheck
	},
	{
		to: "/hq/demo",
		label: "Demo journey",
		icon: CirclePlay
	}
];
function HqNav({ onNavigate, role }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const items = ITEMS.filter((item) => !item.operatorOnly || isOperator(role));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "flex flex-col gap-1",
		children: items.map((item) => {
			const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
			const Icon = item.icon;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: item.to,
				onClick: onNavigate,
				className: cn("flex h-11 items-center gap-3 rounded-md px-3 text-sm transition-colors", active ? "bg-raised text-fg" : "text-muted hover:bg-raised/60 hover:text-fg"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), item.label]
			}, item.to);
		})
	});
}
function HqLayout() {
	const { user, isPending, profile } = useStudioProfile();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { className: "min-h-[60dvh]" });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	if (!isStaff(profile?.role)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/account" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-7xl gap-0 px-0 sm:px-6 lg:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "sticky top-16 hidden h-[calc(100dvh-4rem)] w-56 shrink-0 border-r border-border py-8 pr-4 md:block",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-3 text-xs font-medium uppercase tracking-[0.16em] text-subtle",
					children: profile?.role === "partner" ? "Partner desk" : "Operations"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HqNav, { role: profile?.role })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 px-3 text-xs leading-relaxed text-subtle",
					children: profile?.role === "partner" ? "You can edit the public site and help with client work. PayPal, receipts, and partner invites stay with the operator." : "Internal workspace. Client-facing pages remain on the public site."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-b border-border px-4 py-3 md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2 overflow-x-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/hq",
							className: "h-9 shrink-0 rounded-full border border-border px-3 text-xs leading-9 text-muted",
							children: "Overview"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/hq/inbox",
							className: "h-9 shrink-0 rounded-full border border-border px-3 text-xs leading-9 text-muted",
							children: "Client work"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/hq/pages",
							className: "h-9 shrink-0 rounded-full border border-border px-3 text-xs leading-9 text-muted",
							children: "Pages"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/hq/catalog",
							className: "h-9 shrink-0 rounded-full border border-border px-3 text-xs leading-9 text-muted",
							children: "Catalog"
						}),
						profile?.role === "operator" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/hq/payments",
								className: "h-9 shrink-0 rounded-full border border-border px-3 text-xs leading-9 text-muted",
								children: "PayPal"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/hq/legal",
								className: "h-9 shrink-0 rounded-full border border-border px-3 text-xs leading-9 text-muted",
								children: "Terms"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/hq/team",
								className: "h-9 shrink-0 rounded-full border border-border px-3 text-xs leading-9 text-muted",
								children: "Partners"
							})
						] }) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/hq/clients",
							className: "h-9 shrink-0 rounded-full border border-border px-3 text-xs leading-9 text-muted",
							children: "Clients"
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})]
		})]
	});
}
//#endregion
export { HqLayout as component };
