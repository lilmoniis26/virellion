import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, _ as createRootRoute, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, x as useRouter, y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as uid, i as formatMoney, t as cn } from "./utils-BTLGo2_i.mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn, s as __exportAll } from "./ssr.mjs";
import { A as boolean, D as _enum, F as object, M as literal, P as number, R as string, k as array, z as union } from "../_libs/@better-auth/core+[...].mjs";
import { i as signOut, t as authClient } from "./client-B40BzJxt.mjs";
import { a as hasGateSessionMarker, n as auth } from "./server-CTqeOO7O.mjs";
import { t as authMiddleware } from "./middleware-C4156sa6.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { h as QUALITY_CHECKS, n as ASSISTANT_TEMPLATES, o as DEPARTMENTS, v as SERVICE_GROUPS, w as offerBySlug } from "./catalog-CyGgm22L.mjs";
import { a as seedLiveCatalog } from "./catalog-live-DrcRqM9_.mjs";
import { n as emptyIntake, t as classifyIntake } from "./routing-kDjt9tDQ.mjs";
import { n as defaultSiteCopy, t as SITE } from "./site-copy-C858ekuO.mjs";
import { i as TriangleAlert, o as Menu, t as X } from "../_libs/lucide-react.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-current-user-DG6UNzh9.js
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	const { data, isPending } = authClient.useSession();
	const user = data?.user;
	return {
		user: user ? {
			id: user.id,
			displayName: user.name ?? null,
			primaryEmail: user.email ?? null,
			profileImageUrl: user.image ?? null,
			isDevFallback: false
		} : null,
		isPending
	};
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/gates-DlzlouwQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var subscribeToNothing = () => () => {};
var noGateSessionOnServer = () => false;
/**
* Auth state components — plain wrappers around `useCurrentUserState()`.
*
* With auth on, visitors are signed out until they authenticate — in the sandbox
* live preview too, which does real sign-in. The shared dev user appears only
* when auth is disabled (`VITE_AUTH_ENABLED=false`, the shipped default).
* While the session is still resolving, gates that care about signed-out state
* render nothing so there's no signed-out flash on hard reload.
*/
/** Where `RedirectToSignIn` sends signed-out visitors. Create this route. */
var SIGN_IN_PATH = "/login";
/**
* Client-side redirect to the sign-in route (TanStack `<Navigate>` — NOT a full
* `window.location` reload). A hard navigation re-bootstraps the SPA and re-runs
* session loading, which feels like a second "Loading…" on /login.
*
* Guard routes by waiting out `isPending` first (see `use-current-user`), then
* render this.
*/
function RedirectToSignIn({ to = SIGN_IN_PATH }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to });
}
/**
* Minimal signed-in identity chip + sign-out. Restyle freely (see the
* `design-ui` skill). Sign-out is only shown when auth is enabled (the
* disabled-auth dev user has nothing to sign out of) and the session is not
* gate-materialized — behind the gate the next request signs the viewer
* straight back in, so a sign-out control there is a broken loop.
*/
function UserButton() {
	const user = useCurrentUser();
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	const gateSession = (0, import_react.useSyncExternalStore)(subscribeToNothing, hasGateSessionMarker, noGateSessionOnServer);
	if (!user) return null;
	const label = user.displayName ?? user.primaryEmail ?? "Account";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "h-8 w-8 rounded-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-8 w-8 place-items-center rounded-full bg-black/10 text-sm font-medium dark:bg-white/20",
				children: label.charAt(0).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			!gateSession && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: signingOut,
				onClick: () => {
					setSigningOut(true);
					signOut().catch(() => setSigningOut(false));
				},
				className: "cursor-pointer text-sm underline-offset-4 opacity-70 hover:underline disabled:cursor-wait disabled:no-underline",
				children: signingOut ? "Signing out…" : "Sign out"
			})
		]
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/createSsrRpc-B2Izd0c7.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/client-data-BWMaMcmV.js
var getMyProfile = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("fb22a123c139e3397e32700027412fb508dc88f8af59ddbcf3333b6266c316b6"));
var listMyWork = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("6bdfecfcfcdde98648741c52b88c498c1e75abd5a4f444de7d76430174a7f119"));
var getMyOrder = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator(object({ id: string().min(1) })).handler(createSsrRpc("40ee2e12d7c8dfb998116e4bea0cf3eb4a1b27368d8e8d02074d1581e3200a6e"));
var intakeSchema = object({
	name: string().min(1),
	email: string().min(1),
	phone: string().optional(),
	desiredOutcome: string().min(8),
	projectType: string().optional(),
	location: string().optional(),
	audience: string().optional(),
	currentStage: string().optional(),
	services: array(string()).optional(),
	deadline: string().optional(),
	budget: string().optional(),
	assets: string().optional(),
	channel: string().optional(),
	regulated: array(string()).optional(),
	businessName: string().optional(),
	businessStatus: string().optional(),
	entityType: string().optional(),
	addressSituation: string().optional(),
	marketplace: string().optional(),
	productCategory: string().optional(),
	supplierStatus: string().optional(),
	inventoryStatus: string().optional(),
	salesChannels: string().optional(),
	hasBank: string().optional(),
	hasEin: string().optional(),
	hasInsurance: string().optional(),
	hasLicenses: string().optional(),
	hasComplianceDocs: string().optional()
});
var createInquiry = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	intake: intakeSchema,
	source: _enum(["form", "receptionist"]),
	termsAccepted: literal(true),
	marketingOptIn: boolean().optional()
})).handler(createSsrRpc("1e60c32edea6f15dca7a417f4c2c244ed5a15291e0a24ed6b570a7cc816ebf91"));
var placeOrder = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	kind: _enum(["package", "offer"]),
	id: string().min(1),
	billingName: string().min(1),
	billingEmail: string().email(),
	notes: string().optional(),
	termsAccepted: literal(true),
	marketingOptIn: boolean().optional()
})).handler(createSsrRpc("f980a4085d746b5b329cb6b7329ab2c5c3cefe4e8aa3922c00d0a4c58587adad"));
var submitPayment = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	orderId: string().min(1),
	method: _enum([
		"paypal",
		"card_link",
		"invoice"
	])
})).handler(createSsrRpc("5ffe2ad4ff285a66acbab6b779bfd488bf26b110aed6d82824f1bdccec8776fb"));
var listStudioInbox = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("29d26c6915136bb3da56f8e129b852b1605292391e97ac40970205417d9ac3c6"));
var updateStudioOrder = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	orderId: string().min(1),
	status: _enum([
		"pending_payment",
		"payment_submitted",
		"paid",
		"in_progress",
		"complete",
		"cancelled"
	])
})).handler(createSsrRpc("62a440125c066ab9fd56806696ce306d51982529308bb2481333cd445409183c"));
var getStudioSettings = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("7e9752cf08799b91adbaa991885222471c86037dbc5be382a4ed797a792cce13"));
var saveStudioSettings = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	paypalMe: string().max(80),
	paypalEmail: string().max(160),
	paypalLink: string().max(400),
	notifyEmail: string().max(160)
})).handler(createSsrRpc("a120636969e5a241dc38109e1866afddef3ec545e7b4fdb57b664692840cb431"));
var listStudioClients = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("3b1acfeea986cbc8a4d5ddd3f2455563fb7d20e1337a9d1411a976258e641c64"));
var markStudioNotificationsRead = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(createSsrRpc("379d89d2eecedec70de498151a2c1beb92c3e1dcd604091d739d4ae2459095b9"));
var listMyNotifications = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("86c1065e90fa4f53d6f2cd049c0d27e4bbc0215497642bb7e2337f3d546e5dc1"));
var updateMyMarketing = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ marketingOptIn: boolean() })).handler(createSsrRpc("d8a5bc7a7995f9a61cb07ae2a004298e6db6720770d44e57695dc3eff8b06055"));
var getStudioAttention = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("2ff2f9d87643efe362fbbadbf0956d4f562306e66b1535497ee9a7f208f34ba5"));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/button-C_QGFkfa.js
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors transition-transform duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98] [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			primary: "bg-accent text-accent-fg hover:bg-paper",
			secondary: "bg-raised text-fg border border-border hover:bg-surface",
			outline: "border border-border bg-transparent text-fg hover:bg-raised",
			ghost: "text-fg hover:bg-raised",
			ink: "bg-ink text-paper hover:opacity-90",
			danger: "bg-danger text-fg hover:opacity-90"
		},
		size: {
			sm: "h-9 px-3 text-xs",
			md: "h-11 px-4",
			lg: "h-12 px-5 text-base",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/seo-CB6O3Vjr.js
function pageHead(title, description) {
	return { meta: [{ title: `${title} · ${SITE.name}` }, {
		name: "description",
		content: description
	}] };
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-DxJdDo-e.js
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var DEMO_MARKER = {
	inquiryId: "inq_demo_hearth",
	proposalId: "prop_demo_hearth",
	projectId: "prj_demo_hearth"
};
function buildDemoState() {
	const intake = {
		...emptyIntake(),
		name: "Maren Cole",
		email: "maren@hearthandhollow.example",
		phone: "(503) 555-0142",
		desiredOutcome: "Form an LLC, get banking-ready, launch a brand, open Shopify, and prepare TikTok Shop for artisan home goods.",
		projectType: "Online reseller",
		location: "Portland, Oregon",
		audience: "Design-conscious homeowners buying small-batch ceramics and textiles",
		currentStage: "Planning",
		services: [
			"Business formation",
			"Online reseller / marketplace",
			"Brand identity",
			"Website"
		],
		deadline: "Before holiday market — 8 weeks",
		budget: "3k-8k",
		assets: "Working product photos, draft product names, no logo, no entity",
		channel: "email",
		regulated: [],
		businessName: "Hearth & Hollow",
		businessStatus: "Not yet formed",
		entityType: "Considering LLC",
		addressSituation: "Home-based, needs mailing and registered-agent options",
		marketplace: "Shopify + TikTok Shop",
		productCategory: "Home goods — ceramics and textiles",
		supplierStatus: "Two makers identified, no contracts",
		inventoryStatus: "Pre-order / made-to-order",
		salesChannels: "Own store and TikTok Shop first; Amazon later",
		hasBank: "no",
		hasEin: "no",
		hasInsurance: "no",
		hasLicenses: "no",
		hasComplianceDocs: "no"
	};
	const routing = classifyIntake(intake);
	const now = (/* @__PURE__ */ new Date()).toISOString();
	const inquiry = {
		id: DEMO_MARKER.inquiryId,
		createdAt: now,
		updatedAt: now,
		status: "won",
		stage: "follow-up",
		source: "demo",
		intake,
		routing,
		notes: "Internal demo only. Fictional client. Used to test reception → intake → routing → proposal → payment record → project → quality → delivery → follow-up.",
		conversation: [
			{
				id: "msg_demo_1",
				role: "assistant",
				content: "We offer creative, publishing, business, technology, marketing, media, e-commerce, and administrative services. Tell me what you are trying to create, improve, launch, or accomplish, and I’ll help identify the right service or specialist.",
				createdAt: now
			},
			{
				id: "msg_demo_2",
				role: "user",
				content: "I want to start Hearth & Hollow and sell ceramics and textiles online. I don’t have an LLC, EIN, or store yet.",
				createdAt: now
			},
			{
				id: "msg_demo_3",
				role: "assistant",
				content: "That’s an end-to-end formation and reseller launch. I’ll collect the rest of the intake, flag identity verification and marketplace approval risk, and prepare a scope — not legal advice, and you will own every account.",
				createdAt: now
			}
		]
	};
	const proposal = {
		id: DEMO_MARKER.proposalId,
		inquiryId: inquiry.id,
		createdAt: now,
		title: "Hearth & Hollow — Formation and Reseller Launch",
		summary: "Administrative formation coordination, banking-readiness, brand starter, Shopify storefront, and TikTok Shop preparation. Virellion does not provide legal or tax advice and will not open accounts in the agency’s name.",
		deliverables: [
			"Startup roadmap and name research notes",
			"LLC filing coordination packet",
			"EIN assistance checklist",
			"Registered-agent and mailbox referrals",
			"License and permit matrix for Portland / Oregon home goods",
			"Banking-readiness packet",
			"Logo, palette, and packaging direction",
			"Shopify store with first collection",
			"TikTok Shop seller-document organization",
			"Handoff archive"
		],
		exclusions: [
			"Legal or tax advice",
			"Guaranteed marketplace approval",
			"Holding passwords or creating accounts with Virellion identity"
		],
		timeline: "5 weeks",
		fee: 4200,
		engagement: "end-to-end",
		status: "approved"
	};
	return {
		inquiry,
		proposal,
		project: {
			id: DEMO_MARKER.projectId,
			inquiryId: inquiry.id,
			proposalId: proposal.id,
			createdAt: now,
			updatedAt: now,
			name: "Hearth & Hollow launch",
			clientName: "Maren Cole",
			status: "delivered",
			stage: "follow-up",
			specialist: "Business Consultant",
			folders: [
				"01 Brief",
				"02 Formation",
				"03 Brand",
				"04 Store",
				"05 Delivery"
			],
			tasks: proposal.deliverables.map((title, i) => ({
				id: `task_demo_${i}`,
				title,
				done: true,
				owner: i < 6 ? "Business Consultant" : i < 8 ? "Creative Director" : "E-Commerce Operations Specialist"
			})),
			quality: QUALITY_CHECKS.map((c) => ({
				...c,
				done: true
			})),
			handoff: "Client owns the Gmail, domain, IRS EIN letter, Oregon SOS login, Shopify owner email, and TikTok Shop seller account. Virellion retains no passwords. Next: monthly store desk if desired.",
			followUp: "Offer Monthly Business, Store, and Marketing Support. Optional Amazon track after TikTok Shop is healthy. Product photography session if holiday inventory lands."
		}
	};
}
var defaultAssistants = () => ASSISTANT_TEMPLATES.map((t) => ({
	id: t.id,
	name: t.name,
	role: t.role,
	department: t.department,
	brief: t.brief,
	tone: t.tone,
	createdAt: (/* @__PURE__ */ new Date()).toISOString(),
	template: true
}));
function nextStatus(stage) {
	if (stage === "inquiry" || stage === "discovery" || stage === "classification") return "open";
	if (stage === "review") return "review";
	if (stage === "scoping") return "proposed";
	if (stage === "approval" || stage === "project" || stage === "production" || stage === "quality") return "won";
	return "closed";
}
var useAtlas = create()(persist((set, get) => ({
	inquiries: [],
	proposals: [],
	projects: [],
	assistants: defaultAssistants(),
	threads: {},
	reception: [],
	receptionIntake: emptyIntake(),
	demoComplete: false,
	addInquiry: ({ intake, source, conversation = [], routing }) => {
		const id = uid("inq");
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const resolved = routing ?? classifyIntake(intake);
		set({ inquiries: [{
			id,
			createdAt: now,
			updatedAt: now,
			status: resolved.needsHumanReview ? "review" : "open",
			stage: resolved.needsHumanReview ? "review" : "classification",
			source,
			intake,
			routing: resolved,
			notes: "",
			conversation
		}, ...get().inquiries] });
		return id;
	},
	updateInquiry: (id, patch) => {
		set({ inquiries: get().inquiries.map((i) => i.id === id ? {
			...i,
			...patch,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		} : i) });
	},
	setInquiryStage: (id, stage) => {
		set({ inquiries: get().inquiries.map((i) => i.id === id ? {
			...i,
			stage,
			status: nextStatus(stage),
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		} : i) });
	},
	addProposal: (inquiryId, draft) => {
		const id = uid("prop");
		set({ proposals: [{
			...draft,
			id,
			inquiryId,
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		}, ...get().proposals] });
		get().updateInquiry(inquiryId, {
			stage: "scoping",
			status: "proposed"
		});
		return id;
	},
	updateProposal: (id, patch) => {
		set({ proposals: get().proposals.map((p) => p.id === id ? {
			...p,
			...patch
		} : p) });
	},
	approveProposal: (proposalId) => {
		const proposal = get().proposals.find((p) => p.id === proposalId);
		if (!proposal) return "";
		const inquiry = get().inquiries.find((i) => i.id === proposal.inquiryId);
		if (!inquiry) return "";
		get().updateProposal(proposalId, { status: "approved" });
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const projectId = uid("prj");
		const specialist = inquiry.routing?.specialists[0] ?? "Administrative Coordinator";
		set({ projects: [{
			id: projectId,
			inquiryId: inquiry.id,
			proposalId,
			createdAt: now,
			updatedAt: now,
			name: proposal.title,
			clientName: inquiry.intake.name || "Client",
			status: "setup",
			stage: "project",
			specialist,
			folders: [
				"01 Brief",
				"02 Working files",
				"03 Client assets",
				"04 Delivery"
			],
			tasks: proposal.deliverables.map((title) => ({
				id: uid("task"),
				title,
				done: false,
				owner: specialist
			})),
			quality: QUALITY_CHECKS.map((c) => ({
				...c,
				done: false
			})),
			handoff: "",
			followUp: ""
		}, ...get().projects] });
		get().updateInquiry(inquiry.id, {
			stage: "project",
			status: "won"
		});
		return projectId;
	},
	updateProject: (id, patch) => {
		set({ projects: get().projects.map((p) => p.id === id ? {
			...p,
			...patch,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		} : p) });
	},
	toggleTask: (projectId, taskId) => {
		set({ projects: get().projects.map((p) => p.id === projectId ? {
			...p,
			tasks: p.tasks.map((t) => t.id === taskId ? {
				...t,
				done: !t.done
			} : t),
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		} : p) });
	},
	toggleQuality: (projectId, checkId) => {
		set({ projects: get().projects.map((p) => p.id === projectId ? {
			...p,
			quality: p.quality.map((c) => c.id === checkId ? {
				...c,
				done: !c.done
			} : c),
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		} : p) });
	},
	addAssistant: (def) => {
		const id = uid("asst");
		set({ assistants: [{
			...def,
			id,
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		}, ...get().assistants] });
		return id;
	},
	updateAssistant: (id, patch) => {
		set({ assistants: get().assistants.map((a) => a.id === id ? {
			...a,
			...patch
		} : a) });
	},
	removeAssistant: (id) => {
		const { [id]: _removed, ...rest } = get().threads;
		set({
			assistants: get().assistants.filter((a) => a.id !== id),
			threads: rest
		});
	},
	appendThread: (assistantId, message) => {
		const messages = [...get().threads[assistantId]?.messages ?? [], message];
		set({ threads: {
			...get().threads,
			[assistantId]: {
				assistantId,
				messages,
				updatedAt: (/* @__PURE__ */ new Date()).toISOString()
			}
		} });
	},
	setReception: (messages) => set({ reception: messages }),
	setReceptionIntake: (intake) => set({ receptionIntake: intake }),
	loadTemplates: () => {
		const have = new Set(get().assistants.map((a) => a.id));
		const missing = defaultAssistants().filter((a) => !have.has(a.id));
		if (missing.length) set({ assistants: [...get().assistants, ...missing] });
	},
	runDemo: () => {
		const demo = buildDemoState();
		const restInq = get().inquiries.filter((i) => i.source !== "demo" && i.id !== DEMO_MARKER.inquiryId);
		const restProp = get().proposals.filter((p) => p.id !== DEMO_MARKER.proposalId);
		const restPrj = get().projects.filter((p) => p.id !== DEMO_MARKER.projectId);
		set({
			inquiries: [demo.inquiry, ...restInq],
			proposals: [demo.proposal, ...restProp],
			projects: [demo.project, ...restPrj],
			demoComplete: true
		});
	},
	resetWorkspace: () => {
		set({
			inquiries: [],
			proposals: [],
			projects: [],
			assistants: defaultAssistants(),
			threads: {},
			reception: [],
			receptionIntake: emptyIntake(),
			demoComplete: false
		});
	}
}), {
	name: "virellion-agency-os",
	version: 1,
	skipHydration: true
}));
function PersistGate() {
	(0, import_react.useEffect)(() => {
		useAtlas.persist.rehydrate();
	}, []);
	return null;
}
var saveSchema$1 = object({
	kind: _enum([
		"offer",
		"package",
		"department"
	]),
	id: string().min(1).max(80),
	published: boolean(),
	name: string().min(1).max(160),
	shortName: string().max(80).optional(),
	eyebrow: string().max(80).optional(),
	summary: string().max(1200).optional(),
	outcome: string().max(1200).optional(),
	timeline: string().max(200).optional(),
	nextStep: string().max(400).optional(),
	typicalClients: string().max(240).optional(),
	price: number().int().min(0).max(1e6).optional(),
	priceSuffix: string().max(20).optional(),
	image: string().max(14e5).optional(),
	imageAlt: string().max(240).optional(),
	deliverablesText: string().max(8e3).optional(),
	exclusionsText: string().max(4e3).optional(),
	capabilitiesText: string().max(4e3).optional(),
	departmentsText: string().max(400).optional(),
	packageKind: _enum([
		"launch",
		"custom",
		""
	]).optional()
});
/** Public marketing catalog. Intentionally unauthenticated. */
var getPublicCatalog = createServerFn({ method: "GET" }).handler(createSsrRpc("d0531da818240ee65083ba771b328d16376976a05cefad4c54a056bf41d1812b"));
var getStudioCatalog = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("1825bf0fc589f34780dc837f48bd709520ae78d6d8bd1c112e2dd9a895b80654"));
var saveCatalogItem = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(saveSchema$1).handler(createSsrRpc("5588f47961001911601054bc44da1351c554795a007025e1c1a33871862e85f4"));
var resetCatalogItem = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	kind: _enum([
		"offer",
		"package",
		"department"
	]),
	id: string().min(1).max(80)
})).handler(createSsrRpc("ceaf993021958896da8c03690429cc962b73ec4ef1b41b11def5e0749fa14275"));
var createCatalogItem = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	kind: _enum([
		"offer",
		"package",
		"department"
	]),
	name: string().min(2).max(160),
	packageKind: _enum(["launch", "custom"]).optional()
})).handler(createSsrRpc("447c8e8f2dee5d69b404b3955668e903eae8a1e1c98e410656605708dda45c5a"));
var CatalogContext = (0, import_react.createContext)({
	...seedLiveCatalog(),
	refresh: () => {}
});
function CatalogProvider({ children }) {
	const seed = (0, import_react.useMemo)(() => seedLiveCatalog(), []);
	const [catalog, setCatalog] = (0, import_react.useState)(seed);
	const refresh = (0, import_react.useCallback)(() => {
		getPublicCatalog().then(setCatalog).catch(() => {});
	}, []);
	(0, import_react.useEffect)(() => {
		refresh();
	}, [refresh]);
	const value = (0, import_react.useMemo)(() => ({
		...catalog,
		refresh
	}), [catalog, refresh]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CatalogContext.Provider, {
		value,
		children
	});
}
function useLiveCatalog() {
	return (0, import_react.useContext)(CatalogContext);
}
var optionalHero = object({
	kicker: string().max(80),
	title: string().max(200),
	dek: string().max(800),
	image: string().max(14e5),
	imageAlt: string().max(240)
});
var legalSection = object({
	heading: string().max(120),
	paragraphs: array(string().max(2400)).max(8)
});
var saveSchema = object({
	home: optionalHero.extend({
		paperQuote: string().max(600),
		stats: array(object({
			k: string().max(12),
			v: string().max(80)
		})).max(6),
		offersKicker: string().max(80),
		offersTitle: string().max(200),
		servicesKicker: string().max(80),
		servicesTitle: string().max(200),
		servicesDek: string().max(600),
		studioKicker: string().max(80),
		studioTitle: string().max(200),
		studioBody1: string().max(800),
		studioBody2: string().max(800),
		studioImage: string().max(14e5),
		studioImageAlt: string().max(240),
		engagementKicker: string().max(80),
		engagementTitle: string().max(200),
		packagesKicker: string().max(80),
		packagesTitle: string().max(200),
		stepsKicker: string().max(80),
		stepsTitle: string().max(200),
		faqKicker: string().max(80),
		faqTitle: string().max(200)
	}),
	services: optionalHero,
	offers: object({
		kicker: string().max(80),
		title: string().max(200),
		dek: string().max(800)
	}),
	packages: optionalHero.extend({
		sectionTitle: string().max(200),
		sectionDek: string().max(80)
	}),
	work: optionalHero.extend({
		pathTitle: string().max(200),
		engagementTitle: string().max(200),
		engagementImage: string().max(14e5),
		engagementImageAlt: string().max(240),
		boundariesTitle: string().max(200)
	}),
	start: optionalHero,
	receptionist: optionalHero,
	login: object({
		kicker: string().max(80),
		titleSignIn: string().max(200),
		titleSignUp: string().max(200),
		dek: string().max(400),
		body: string().max(600)
	}),
	account: optionalHero,
	nav: object({
		services: string().max(40),
		offers: string().max(40),
		packages: string().max(40),
		work: string().max(40),
		startCta: string().max(40),
		receptionCta: string().max(40)
	}),
	contact: object({
		email: string().max(160),
		phone: string().max(40),
		addressLine: string().max(120)
	}),
	footer: object({
		blurb: string().max(400),
		legalLine: string().max(800)
	}),
	cta: object({
		title: string().max(200),
		body: string().max(400),
		startLabel: string().max(40),
		receptionLabel: string().max(40)
	}),
	faqs: array(object({
		q: string().max(200),
		a: string().max(1200)
	})).max(20),
	steps: array(object({
		n: string().max(8),
		title: string().max(80),
		body: string().max(400)
	})).max(8),
	engagements: array(object({
		id: string().max(40),
		label: string().max(80),
		bestFor: string().max(200),
		examples: string().max(400)
	})).max(8),
	boundaries: array(string().max(400)).max(12),
	legal: object({
		version: string().max(40),
		effective: string().max(80),
		termsKicker: string().max(80),
		termsTitle: string().max(200),
		termsDek: string().max(400),
		termsImage: string().max(14e5),
		termsImageAlt: string().max(240),
		privacyKicker: string().max(80),
		privacyTitle: string().max(200),
		privacyDek: string().max(400),
		privacyImage: string().max(14e5),
		privacyImageAlt: string().max(240),
		terms: array(legalSection).max(20),
		privacy: array(legalSection).max(20),
		allows: array(string().max(400)).max(12),
		doesNot: array(string().max(400)).max(12)
	})
});
var getPublicSiteCopy = createServerFn({ method: "GET" }).handler(createSsrRpc("e5583d53044e2b370d6622599f65e51c917b23588436c205f8cdc10c70e44d3b"));
var getStudioSiteCopy = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("3ad12f34e969143f2eb859e3e06ba063c46761611b2231f136329f804f0ad132"));
var saveStudioSiteCopy = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(saveSchema).handler(createSsrRpc("d1db8d03980ece32480f904c20b37594286de1aa7986294951d2fe5976f59608"));
var resetStudioSiteCopy = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(createSsrRpc("faca87266efe5d2e0e8823670106a20e053682d025f436d02f0d65e505db4af1"));
var SiteCopyContext = (0, import_react.createContext)({
	...defaultSiteCopy(),
	refresh: () => {}
});
function SiteCopyProvider({ children }) {
	const seed = (0, import_react.useMemo)(() => defaultSiteCopy(), []);
	const [copy, setCopy] = (0, import_react.useState)(seed);
	const refresh = (0, import_react.useCallback)(() => {
		getPublicSiteCopy().then(setCopy).catch(() => {});
	}, []);
	(0, import_react.useEffect)(() => {
		refresh();
	}, [refresh]);
	const value = (0, import_react.useMemo)(() => ({
		...copy,
		refresh
	}), [copy, refresh]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteCopyContext.Provider, {
		value,
		children
	});
}
function useSiteCopy() {
	return (0, import_react.useContext)(SiteCopyContext);
}
/** Pole-star V — same glyph as public/favicon.svg */
function VirellionMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: cn("size-7", className),
		"aria-hidden": "true",
		fill: "none",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M8.4 7.1 L14.6 24.6 H17.4 L23.6 7.1 H19.7 L16 18.2 12.3 7.1 Z",
			fill: "currentColor"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "16",
			cy: "8.15",
			r: "1.65",
			fill: "currentColor"
		})]
	});
}
function SiteFooter() {
	const { offers, departments } = useLiveCatalog();
	const copy = useSiteCopy();
	const deptMap = Object.fromEntries(departments.map((d) => [d.id, d]));
	const studioIds = SERVICE_GROUPS.flatMap((g) => g.ids).filter((id) => deptMap[id]).slice(0, 8);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "border-t border-border bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-fg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VirellionMark, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display tracking-[0.14em]",
							children: SITE.wordmark
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-xs text-sm leading-relaxed text-muted",
						children: copy.footer.blurb
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-mono text-xs tracking-wide text-subtle",
						children: copy.contact.addressLine || SITE.host
					}),
					copy.contact.email ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: copy.contact.email
					}) : null,
					copy.contact.phone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: copy.contact.phone
					}) : null
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-[0.16em] text-subtle",
					children: "Offers"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-2",
					children: [offers.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/offers/$slug",
						params: { slug: o.slug },
						className: "text-sm text-muted hover:text-fg",
						children: o.name
					}) }, o.slug)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/packages",
						className: "text-sm text-muted hover:text-fg",
						children: "Launch packages"
					}) })]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-[0.16em] text-subtle",
					children: "Studio"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-2",
					children: studioIds.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/departments/$id",
						params: { id },
						className: "text-sm text-muted hover:text-fg",
						children: deptMap[id].short
					}) }, id))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-[0.16em] text-subtle",
					children: "Visit"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/services",
							className: "text-muted hover:text-fg",
							children: "All services"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/work",
							className: "text-muted hover:text-fg",
							children: "Approach"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/start",
							className: "text-muted hover:text-fg",
							children: "Start a project"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/receptionist",
							className: "text-muted hover:text-fg",
							children: "Reception"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							search: { redirect: "/account" },
							className: "text-muted hover:text-fg",
							children: "Sign in"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/account",
							className: "text-muted hover:text-fg",
							children: "Client account"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/hq",
							className: "text-muted hover:text-fg",
							children: "Studio desk"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/terms",
							className: "text-muted hover:text-fg",
							children: "Terms of Engagement"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/privacy",
							className: "text-muted hover:text-fg",
							children: "Privacy Notice"
						}) })
					]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto max-w-6xl px-4 py-6 text-xs leading-relaxed text-subtle sm:px-6",
				children: copy.footer.legalLine
			})
		})]
	});
}
function AuthSlot({ onNavigate }) {
	const { user, isPending } = useCurrentUserState();
	const [profile, setProfile] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!user) {
			setProfile(null);
			return;
		}
		let cancelled = false;
		getMyProfile().then((p) => {
			if (!cancelled) setProfile(p);
		}).catch(() => {
			if (!cancelled) setProfile(null);
		});
		return () => {
			cancelled = true;
		};
	}, [user?.id]);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-9 w-20 animate-pulse rounded-md bg-raised",
		"aria-hidden": true
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		variant: "ghost",
		size: "sm",
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/login",
			search: { redirect: "/account" },
			onClick: onNavigate,
			children: "Sign in"
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			profile && (profile.role === "operator" || profile.role === "partner") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "sm",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/hq",
					onClick: onNavigate,
					children: "Desk"
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "sm",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/account",
					onClick: onNavigate,
					children: "Account"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
		]
	});
}
function useStudioProfile() {
	const { user, isPending } = useCurrentUserState();
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (isPending) return;
		if (!user) {
			setProfile(null);
			setReady(true);
			return;
		}
		let cancelled = false;
		setReady(false);
		getMyProfile().then((p) => {
			if (!cancelled) {
				setProfile(p);
				setReady(true);
			}
		}).catch(() => {
			if (!cancelled) {
				setProfile(null);
				setReady(true);
			}
		});
		return () => {
			cancelled = true;
		};
	}, [user?.id, isPending]);
	return {
		user,
		isPending: isPending || Boolean(user) && !ready,
		profile
	};
}
function SiteHeader() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const copy = useSiteCopy();
	const nav = [
		{
			to: "/services",
			label: copy.nav.services,
			match: "/services"
		},
		{
			to: "/offers",
			label: copy.nav.offers,
			match: "/offers"
		},
		{
			to: "/packages",
			label: copy.nav.packages
		},
		{
			to: "/work",
			label: copy.nav.work
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-md",
		"data-print-hide": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex shrink-0 items-center gap-2 text-fg",
					onClick: () => setOpen(false),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VirellionMark, { className: "size-6 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-[13px] tracking-[0.1em] sm:text-base sm:tracking-[0.16em]",
						children: SITE.wordmark
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-7 md:flex",
					children: nav.map((item) => {
						const active = "match" in item && item.match ? pathname.startsWith(item.match) : pathname === item.to;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.to,
							className: cn("text-sm transition-colors", active ? "text-fg" : "text-muted hover:text-fg"),
							children: item.label
						}, item.to);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden items-center gap-2 md:flex",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthSlot, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/start",
							children: copy.nav.startCta
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "inline-flex size-11 items-center justify-center rounded-md text-fg md:hidden",
					"aria-label": open ? "Close menu" : "Open menu",
					onClick: () => setOpen((v) => !v),
					children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
				})
			]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-border bg-bg px-4 py-4 md:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex flex-col gap-1",
				children: [
					nav.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						className: "flex h-11 items-center text-sm text-fg",
						onClick: () => setOpen(false),
						children: item.label
					}, item.to)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/receptionist",
						className: "flex h-11 items-center text-sm text-fg",
						onClick: () => setOpen(false),
						children: copy.nav.receptionCta
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/start",
						className: "flex h-11 items-center text-sm text-fg",
						onClick: () => setOpen(false),
						children: copy.nav.startCta
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthSlot, { onNavigate: () => setOpen(false) })
					})
				]
			})
		}) : null]
	});
}
var styles_default = "/assets/styles-DDQxZwmR.css";
var Route$31 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: SITE.name },
			{
				name: "description",
				content: "One team. Multiple specialties. Complete solutions. A multidisciplinary creative, business, and technology studio at virellion.online."
			},
			{
				name: "theme-color",
				content: "#080a09"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,400;0,500;0,600;1,400&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=IBM+Plex+Mono:wght@400;500&display=swap"
			}
		]
	}),
	component: RootDocument,
	notFoundComponent: NotFound
});
function RootDocument() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "min-h-dvh bg-bg text-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersistGate, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CatalogProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteCopyProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {}) }) })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
function AppShell() {
	const isHq = useRouterState({ select: (s) => s.location.pathname }).startsWith("/hq");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			}),
			isHq ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
function NotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-xl px-4 py-20 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.18em] text-subtle",
				children: "404"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl text-fg",
				children: "Not on the map"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: "That page is not part of Virellion."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "mt-6 inline-block text-sm text-fg underline underline-offset-4",
				children: "Return home"
			})
		]
	});
}
var $$splitComponentImporter$29 = () => import("./routes-C51ILgS1.mjs");
var Route$30 = createFileRoute("/")({
	component: lazyRouteComponent($$splitComponentImporter$29, "component"),
	head: () => pageHead("One team. Multiple specialties. Complete solutions.", "A multidisciplinary studio for authors, founders, creators, and online sellers. Formation, brands, books, film, and systems — described in ordinary language, delivered as one piece of work.")
});
var $$splitComponentImporter$28 = () => import("./account-BgpQ5RFH.mjs");
var Route$29 = createFileRoute("/account")({ component: lazyRouteComponent($$splitComponentImporter$28, "component") });
var $$splitComponentImporter$27 = () => import("./checkout-B2SGq5bB.mjs");
var Route$28 = createFileRoute("/checkout")({
	validateSearch: (s) => ({ item: typeof s.item === "string" ? s.item : void 0 }),
	head: () => pageHead("Checkout", "Order a Virellion launch package or flagship offer."),
	component: lazyRouteComponent($$splitComponentImporter$27, "component")
});
var $$splitComponentImporter$26 = () => import("./hq-BTYWvmuM.mjs");
var Route$27 = createFileRoute("/hq")({ component: lazyRouteComponent($$splitComponentImporter$26, "component") });
var $$splitComponentImporter$25 = () => import("./login-LJDoDE3M.mjs");
var Route$26 = createFileRoute("/login")({
	validateSearch: (s) => ({
		redirect: typeof s.redirect === "string" ? s.redirect : void 0,
		invite: typeof s.invite === "string" ? s.invite : void 0
	}),
	head: () => pageHead("Sign in", "Create a Virellion account to submit work, order packages, and pay."),
	component: lazyRouteComponent($$splitComponentImporter$25, "component")
});
var $$splitComponentImporter$24 = () => import("./packages-pRo_aIm0.mjs");
var Route$25 = createFileRoute("/packages")({
	component: lazyRouteComponent($$splitComponentImporter$24, "component"),
	head: () => pageHead("Packages", "Five launch packages Virellion can deliver now, plus custom work held until demand and capacity are proven.")
});
var $$splitComponentImporter$23 = () => import("./privacy-DhQHK5zV.mjs");
var Route$24 = createFileRoute("/privacy")({
	head: () => pageHead("Privacy Notice", "How Virellion uses the information you provide, what we do not do with it, and how marketing opt-in works."),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("./receptionist-CxgZRG67.mjs");
var Route$23 = createFileRoute("/receptionist")({
	component: lazyRouteComponent($$splitComponentImporter$22, "component"),
	head: () => pageHead("Reception", "Tell Virellion what you are trying to create, improve, launch, or accomplish. Reception identifies the right practice.")
});
var $$splitComponentImporter$21 = () => import("./services-BpRyBx4d.mjs");
var Route$22 = createFileRoute("/services")({
	component: lazyRouteComponent($$splitComponentImporter$21, "component"),
	head: () => pageHead("Services", "Sixteen practices under one roof. Hire one, or describe the outcome and Virellion will assemble the rest.")
});
var $$splitComponentImporter$20 = () => import("./start-BTOozDPc.mjs");
var Route$21 = createFileRoute("/start")({
	component: lazyRouteComponent($$splitComponentImporter$20, "component"),
	head: () => pageHead("Start a project", "Tell Virellion the outcome. Intake creates a routing record and a specialist sends a scope summary.")
});
var $$splitComponentImporter$19 = () => import("./terms-DFHGlaZ3.mjs");
var Route$20 = createFileRoute("/terms")({
	head: () => pageHead("Terms of Engagement", "What you agree to when you hire Virellion, how payment works, and the professional boundaries of the studio."),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./work-BRn5UQu9.mjs");
var Route$19 = createFileRoute("/work")({
	component: lazyRouteComponent($$splitComponentImporter$18, "component"),
	head: () => pageHead("Approach", "How Virellion takes an inquiry to a finished handoff. AI receives. A human reviews anything complex. You approve before work begins.")
});
var $$splitComponentImporter$17 = () => import("./account.index-Bb6Mzar8.mjs");
var Route$18 = createFileRoute("/account/")({
	head: () => pageHead("Account", "Your Virellion inquiries, orders, receipts, and marketing preference."),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./departments._id-CcMZ-bH4.mjs");
var Route$17 = createFileRoute("/departments/$id")({
	component: lazyRouteComponent($$splitComponentImporter$16, "component"),
	head: ({ params }) => {
		const dept = DEPARTMENTS.find((d) => d.id === params.id);
		return pageHead(dept?.label ?? "Practice", dept ? `${dept.label} at Virellion. Typical clients: ${dept.typicalClients}.` : "A practice at Virellion.");
	}
});
var $$splitComponentImporter$15 = () => import("./hq-G-y5w0Jy.mjs");
var Route$16 = createFileRoute("/hq/")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var $$splitComponentImporter$14 = () => import("./assistants-1jTGps6h.mjs");
var Route$15 = createFileRoute("/hq/assistants")({
	validateSearch: (s) => ({ id: typeof s.id === "string" ? s.id : void 0 }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./catalog-1xGEZDbN.mjs");
var Route$14 = createFileRoute("/hq/catalog")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./clients-CAFjfSoc.mjs");
var Route$13 = createFileRoute("/hq/clients")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./demo-BfsuZTjN.mjs");
var Route$12 = createFileRoute("/hq/demo")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./inbox-Dl0ZbxOC.mjs");
var Route$11 = createFileRoute("/hq/inbox")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./inquiries-PZfN3_6g.mjs");
var Route$10 = createFileRoute("/hq/inquiries")({
	validateSearch: (s) => ({ id: typeof s.id === "string" ? s.id : void 0 }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./legal-CIhMmtul.mjs");
var Route$9 = createFileRoute("/hq/legal")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./pages-CWdJ9lxA.mjs");
var Route$8 = createFileRoute("/hq/pages")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./payments-CVKTE1Ha.mjs");
var Route$7 = createFileRoute("/hq/payments")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./projects-DPazVDBG.mjs");
var Route$6 = createFileRoute("/hq/projects")({
	validateSearch: (s) => ({ id: typeof s.id === "string" ? s.id : void 0 }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./quality-9ZFKIaC1.mjs");
var Route$5 = createFileRoute("/hq/quality")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./team-CpA_RS7i.mjs");
var Route$4 = createFileRoute("/hq/team")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./offers.index-2PhSGaBS.mjs");
var Route$3 = createFileRoute("/offers/")({
	component: lazyRouteComponent($$splitComponentImporter$2, "component"),
	head: () => pageHead("Offers", "Three public offers from Virellion: formation and reseller readiness, brand and website launch, and book development.")
});
var $$splitComponentImporter$1 = () => import("./offers._slug-CINJFFmW.mjs");
var Route$2 = createFileRoute("/offers/$slug")({
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	head: ({ params }) => {
		const offer = offerBySlug(params.slug);
		return pageHead(offer?.name ?? "Offer", offer ? `${offer.outcome} Starting at ${formatMoney(offer.startingPrice)}.` : "A flagship offer from Virellion.");
	}
});
var $$splitComponentImporter = () => import("./account.orders._id-Vq1c8zU4.mjs");
var Route$1 = createFileRoute("/account/orders/$id")({
	head: () => pageHead("Order", "Pay a Virellion package or offer from your account."),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var Route = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => auth.handler(request),
	POST: ({ request }) => auth.handler(request)
} } });
var IndexRoute = Route$30.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$31
});
var AccountRoute = Route$29.update({
	id: "/account",
	path: "/account",
	getParentRoute: () => Route$31
});
var CheckoutRoute = Route$28.update({
	id: "/checkout",
	path: "/checkout",
	getParentRoute: () => Route$31
});
var HqRoute = Route$27.update({
	id: "/hq",
	path: "/hq",
	getParentRoute: () => Route$31
});
var LoginRoute = Route$26.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$31
});
var PackagesRoute = Route$25.update({
	id: "/packages",
	path: "/packages",
	getParentRoute: () => Route$31
});
var PrivacyRoute = Route$24.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => Route$31
});
var ReceptionistRoute = Route$23.update({
	id: "/receptionist",
	path: "/receptionist",
	getParentRoute: () => Route$31
});
var ServicesRoute = Route$22.update({
	id: "/services",
	path: "/services",
	getParentRoute: () => Route$31
});
var StartRoute = Route$21.update({
	id: "/start",
	path: "/start",
	getParentRoute: () => Route$31
});
var TermsRoute = Route$20.update({
	id: "/terms",
	path: "/terms",
	getParentRoute: () => Route$31
});
var WorkRoute = Route$19.update({
	id: "/work",
	path: "/work",
	getParentRoute: () => Route$31
});
var AccountIndexRoute = Route$18.update({
	id: "/",
	path: "/",
	getParentRoute: () => AccountRoute
});
var DepartmentsIdRoute = Route$17.update({
	id: "/departments/$id",
	path: "/departments/$id",
	getParentRoute: () => Route$31
});
var HqIndexRoute = Route$16.update({
	id: "/",
	path: "/",
	getParentRoute: () => HqRoute
});
var HqAssistantsRoute = Route$15.update({
	id: "/assistants",
	path: "/assistants",
	getParentRoute: () => HqRoute
});
var HqCatalogRoute = Route$14.update({
	id: "/catalog",
	path: "/catalog",
	getParentRoute: () => HqRoute
});
var HqClientsRoute = Route$13.update({
	id: "/clients",
	path: "/clients",
	getParentRoute: () => HqRoute
});
var HqDemoRoute = Route$12.update({
	id: "/demo",
	path: "/demo",
	getParentRoute: () => HqRoute
});
var HqInboxRoute = Route$11.update({
	id: "/inbox",
	path: "/inbox",
	getParentRoute: () => HqRoute
});
var HqInquiriesRoute = Route$10.update({
	id: "/inquiries",
	path: "/inquiries",
	getParentRoute: () => HqRoute
});
var HqLegalRoute = Route$9.update({
	id: "/legal",
	path: "/legal",
	getParentRoute: () => HqRoute
});
var HqPagesRoute = Route$8.update({
	id: "/pages",
	path: "/pages",
	getParentRoute: () => HqRoute
});
var HqPaymentsRoute = Route$7.update({
	id: "/payments",
	path: "/payments",
	getParentRoute: () => HqRoute
});
var HqProjectsRoute = Route$6.update({
	id: "/projects",
	path: "/projects",
	getParentRoute: () => HqRoute
});
var HqQualityRoute = Route$5.update({
	id: "/quality",
	path: "/quality",
	getParentRoute: () => HqRoute
});
var HqTeamRoute = Route$4.update({
	id: "/team",
	path: "/team",
	getParentRoute: () => HqRoute
});
var OffersIndexRoute = Route$3.update({
	id: "/offers/",
	path: "/offers/",
	getParentRoute: () => Route$31
});
var OffersSlugRoute = Route$2.update({
	id: "/offers/$slug",
	path: "/offers/$slug",
	getParentRoute: () => Route$31
});
var AccountOrdersIdRoute = Route$1.update({
	id: "/orders/$id",
	path: "/orders/$id",
	getParentRoute: () => AccountRoute
});
var ApiAuthSplatRoute = Route.update({
	id: "/api/auth/$",
	path: "/api/auth/$",
	getParentRoute: () => Route$31
});
var AccountRouteChildren = {
	AccountIndexRoute,
	AccountOrdersIdRoute
};
var AccountRouteWithChildren = AccountRoute._addFileChildren(AccountRouteChildren);
var HqRouteChildren = {
	HqAssistantsRoute,
	HqCatalogRoute,
	HqClientsRoute,
	HqDemoRoute,
	HqInboxRoute,
	HqInquiriesRoute,
	HqLegalRoute,
	HqPagesRoute,
	HqPaymentsRoute,
	HqProjectsRoute,
	HqQualityRoute,
	HqTeamRoute,
	HqIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AccountRoute: AccountRouteWithChildren,
	CheckoutRoute,
	HqRoute: HqRoute._addFileChildren(HqRouteChildren),
	LoginRoute,
	PackagesRoute,
	PrivacyRoute,
	ReceptionistRoute,
	ServicesRoute,
	StartRoute,
	TermsRoute,
	WorkRoute,
	DepartmentsIdRoute,
	OffersSlugRoute,
	OffersIndexRoute,
	ApiAuthSplatRoute
};
var routeTree = Route$31._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { listStudioClients as A, useCurrentUserState as B, createInquiry as C, getStudioSettings as D, getStudioAttention as E, submitPayment as F, updateMyMarketing as I, updateStudioOrder as L, markStudioNotificationsRead as M, placeOrder as N, listMyNotifications as O, saveStudioSettings as P, createSsrRpc as R, Button as S, getMyProfile as T, createCatalogItem as _, Route$10 as a, saveCatalogItem as b, Route$26 as c, VirellionMark as d, useSiteCopy as f, useLiveCatalog as g, saveStudioSiteCopy as h, Route$6 as i, listStudioInbox as j, listMyWork as k, Route$28 as l, resetStudioSiteCopy as m, Route$1 as n, Route$15 as o, getStudioSiteCopy as p, Route$2 as r, Route$17 as s, router_exports as t, useStudioProfile as u, getStudioCatalog as v, getMyOrder as w, useAtlas as x, resetCatalogItem as y, RedirectToSignIn as z };
