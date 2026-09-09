import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as signIn, t as authClient } from "./client-B40BzJxt.mjs";
import { t as GROK_PROVIDERS } from "./server-CTqeOO7O.mjs";
import { B as useCurrentUserState, S as Button, c as Route$26, f as useSiteCopy } from "./router-DxJdDo-e.mjs";
import { t as PageHero } from "./page-hero-CPyRRzn8.mjs";
import { o as safeRedirect } from "./commerce-BoLC0y_C.mjs";
import { t as Input } from "./input-B1NnXfay.mjs";
import { t as Label } from "./label-Cmem6H5a.mjs";
import { t as acceptStudioInvite } from "./team-data-CIkvAPy2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-LJDoDE3M.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const { redirect: rawRedirect, invite } = Route$26.useSearch();
	const redirect = safeRedirect(rawRedirect, invite ? "/hq" : "/account");
	const copy = useSiteCopy();
	const { user, isPending } = useCurrentUserState();
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [terms, setTerms] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (isPending || !user) return;
		let cancelled = false;
		const go = async () => {
			if (invite) try {
				await acceptStudioInvite({ data: { token: invite } });
			} catch {}
			if (!cancelled) window.location.replace(redirect);
		};
		go();
		return () => {
			cancelled = true;
		};
	}, [
		isPending,
		user,
		redirect,
		invite
	]);
	if (isPending || user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { className: "min-h-[60dvh]" });
	const go = (path) => {
		window.location.assign(path);
	};
	const submitEmail = async () => {
		setError("");
		if (mode === "signup" && !terms) {
			setError("Please agree to the Terms of Engagement and Privacy Notice.");
			return;
		}
		setBusy(true);
		try {
			if (mode === "signup") {
				const { error: err } = await authClient.signUp.email({
					email: email.trim(),
					password,
					name: name.trim() || email.trim()
				});
				if (err) throw new Error(err.message || "Could not create the account.");
			} else {
				const { error: err } = await authClient.signIn.email({
					email: email.trim(),
					password
				});
				if (err) throw new Error(err.message || "Could not sign in.");
			}
			await authClient.getSession();
			if (invite) try {
				await acceptStudioInvite({ data: { token: invite } });
			} catch (e) {
				setError(e instanceof Error ? e.message : "Signed in, but the invitation could not be applied.");
			}
			go(redirect);
		} catch (e) {
			setError(e instanceof Error ? e.message : "Something went wrong.");
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
		src: "/media/paper.jpg",
		alt: "Brass compass and blank cotton paper on slate.",
		kicker: copy.login.kicker,
		title: mode === "signup" ? copy.login.titleSignUp : copy.login.titleSignIn,
		dek: copy.login.dek,
		compact: true
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			invite ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-6 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-fg",
				children: "You’ve been invited as a studio partner. Sign in with the invited email to open the desk. Partners can edit the site; PayPal, terms, and password recovery stay with the operator."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-[0.18em] text-subtle",
				children: "Continue"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 flex flex-col gap-2",
				children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					className: "h-12 w-full justify-center",
					onClick: () => void signIn(p.providerId, { callbackURL: redirect }),
					children: ["Continue with ", p.label]
				}, p.providerId))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-sm leading-relaxed text-muted",
				children: copy.login.body
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-xs leading-relaxed text-subtle",
				children: [
					"By continuing you agree to the",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/terms",
						className: "text-fg underline underline-offset-4",
						children: "Terms of Engagement"
					}),
					" ",
					"and",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/privacy",
						className: "text-fg underline underline-offset-4",
						children: "Privacy Notice"
					}),
					"."
				]
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "rounded-xl border border-border bg-surface p-6",
			onSubmit: (e) => {
				e.preventDefault();
				submitEmail();
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: `h-10 rounded-full border px-4 text-sm ${mode === "signin" ? "border-accent bg-accent text-accent-fg" : "border-border text-muted"}`,
						onClick: () => setMode("signin"),
						children: "Sign in"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: `h-10 rounded-full border px-4 text-sm ${mode === "signup" ? "border-accent bg-accent text-accent-fg" : "border-border text-muted"}`,
						onClick: () => setMode("signup"),
						children: "Create account"
					})]
				}),
				mode === "signup" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "name",
						children: "Name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "name",
						value: name,
						onChange: (e) => setName(e.target.value),
						autoComplete: "name"
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "email",
						children: "Email"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "email",
						type: "email",
						required: true,
						value: email,
						onChange: (e) => setEmail(e.target.value),
						autoComplete: "email"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "password",
							children: "Password"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "password",
							type: "password",
							required: true,
							minLength: 8,
							value: password,
							onChange: (e) => setPassword(e.target.value),
							autoComplete: mode === "signup" ? "new-password" : "current-password"
						}),
						mode === "signup" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-subtle",
							children: "At least 8 characters."
						}) : null
					]
				}),
				mode === "signup" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					htmlFor: "signup-terms",
					className: "mt-5 flex min-h-11 cursor-pointer gap-3 text-sm leading-relaxed text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "signup-terms",
						type: "checkbox",
						checked: terms,
						onChange: (e) => setTerms(e.target.checked),
						className: "mt-1 size-4 shrink-0 accent-accent"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"I agree to the",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/terms",
							className: "text-fg underline underline-offset-4",
							children: "Terms of Engagement"
						}),
						" ",
						"and",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/privacy",
							className: "text-fg underline underline-offset-4",
							children: "Privacy Notice"
						}),
						"."
					] })]
				}) : null,
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-danger",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					className: "mt-6 w-full",
					disabled: busy || mode === "signup" && !terms,
					children: busy ? "Please wait…" : mode === "signup" ? "Create account" : "Sign in with email"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-xs leading-relaxed text-subtle",
					children: [
						"Prefer to describe the work first?",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/start",
							className: "text-fg underline underline-offset-4",
							children: copy.nav.startCta
						}),
						"."
					]
				})
			]
		})]
	})] });
}
//#endregion
export { LoginPage as component };
