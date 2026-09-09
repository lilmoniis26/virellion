import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as formatDate } from "./utils-BTLGo2_i.mjs";
import { S as Button, u as useStudioProfile } from "./router-DxJdDo-e.mjs";
import { t as Input } from "./input-B1NnXfay.mjs";
import { t as Label } from "./label-Cmem6H5a.mjs";
import { n as OPERATOR_ONLY, r as PARTNER_MAY, t as OPERATOR_NEVER_IN_DESK } from "./access-Ty0QsjcV.mjs";
import { i as revokeStudioPartner, n as inviteStudioPartner, r as listStudioTeam } from "./team-data-CIkvAPy2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/team-CpA_RS7i.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TeamPage() {
	const { profile } = useStudioProfile();
	const [staff, setStaff] = (0, import_react.useState)([]);
	const [invites, setInvites] = (0, import_react.useState)([]);
	const [email, setEmail] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [saved, setSaved] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [inviteUrl, setInviteUrl] = (0, import_react.useState)("");
	const load = () => {
		listStudioTeam().then((data) => {
			setStaff(data.staff);
			setInvites(data.invites);
		}).catch((e) => setError(e instanceof Error ? e.message : "Could not load the team."));
	};
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	const invite = async () => {
		setBusy(true);
		setError("");
		setSaved("");
		setInviteUrl("");
		try {
			const next = await inviteStudioPartner({ data: { email } });
			setStaff(next.staff);
			setInvites(next.invites);
			setEmail("");
			if (next.granted) setSaved("That account is now a studio partner. They will see Desk on their next visit.");
			else {
				const pending = next.invites.find((row) => row.email === email.trim().toLowerCase()) ?? next.invites[0];
				if (pending) {
					const url = `${window.location.origin}/login?invite=${pending.token}&redirect=${encodeURIComponent("/hq")}`;
					setInviteUrl(url);
				}
				setSaved("Invitation created. Send them the link below. They must sign in with that email.");
			}
		} catch (e) {
			setError(e instanceof Error ? e.message : "Could not invite.");
		} finally {
			setBusy(false);
		}
	};
	const revoke = async (target) => {
		setBusy(true);
		setError("");
		setSaved("");
		try {
			const next = await revokeStudioPartner({ data: target });
			setStaff(next.staff);
			setInvites(next.invites);
			setSaved("Partner access removed.");
		} catch (e) {
			setError(e instanceof Error ? e.message : "Could not update access.");
		} finally {
			setBusy(false);
		}
	};
	if (profile && profile.role !== "operator") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "px-4 py-8 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl text-fg",
			children: "Team"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-xl text-sm text-muted",
			children: "Only the studio operator can invite or remove partners."
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "px-4 py-8 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-[0.18em] text-subtle",
				children: "Studio"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-3xl text-fg",
				children: "Partners"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-sm leading-relaxed text-muted",
				children: "Invite someone to help keep the public site current. A partner can edit pages, prices, photographs, and client work. They cannot change PayPal, confirm receipts, export the marketing list, edit terms, or touch domain, DNS, banking, or account recovery — those stay off this desk entirely."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl border border-border bg-surface p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.14em] text-subtle",
						children: "Partners may"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-2 text-sm text-muted",
						children: PARTNER_MAY.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, item))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl border border-border bg-surface p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.14em] text-subtle",
						children: "Operator only"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-4 space-y-2 text-sm text-muted",
						children: [OPERATOR_ONLY.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, item)), OPERATOR_NEVER_IN_DESK.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, item))]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-10 max-w-xl space-y-4 rounded-xl border border-border bg-surface p-6",
				onSubmit: (e) => {
					e.preventDefault();
					invite();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "partner-email",
						children: "Partner email"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "partner-email",
						type: "email",
						autoComplete: "off",
						value: email,
						onChange: (e) => setEmail(e.target.value),
						placeholder: "name@example.com"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: busy || !email.trim(),
						children: busy ? "Sending…" : "Invite partner"
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-danger",
						children: error
					}) : null,
					saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-ok",
						children: saved
					}) : null,
					inviteUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "break-all font-mono text-xs text-muted",
							children: inviteUrl
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "sm",
							variant: "outline",
							onClick: () => {
								navigator.clipboard.writeText(inviteUrl).then(() => setSaved("Invitation link copied."), () => setSaved("Copy the link above and send it to them."));
							},
							children: "Copy invite link"
						})]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl text-fg",
					children: "People with desk access"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 divide-y divide-border border-y border-border",
					children: staff.map((member) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-fg",
							children: member.name || member.email
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted",
							children: [
								member.email,
								" · ",
								member.role === "operator" ? "Operator" : "Partner",
								" · since",
								" ",
								formatDate(member.createdAt)
							]
						})] }), member.role === "partner" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							disabled: busy,
							onClick: () => void revoke({ userId: member.userId }),
							children: "Remove partner access"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-subtle",
							children: "Full studio control"
						})]
					}, member.userId))
				})]
			}),
			invites.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl text-fg",
					children: "Open invitations"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 divide-y divide-border border-y border-border",
					children: invites.map((inviteRow) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-fg",
							children: inviteRow.email
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-subtle",
							children: ["Sent ", formatDate(inviteRow.createdAt)]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "outline",
								type: "button",
								onClick: () => {
									const url = `${window.location.origin}/login?invite=${inviteRow.token}&redirect=${encodeURIComponent("/hq")}`;
									navigator.clipboard.writeText(url).then(() => setSaved(`Invite link copied for ${inviteRow.email}.`), () => {
										setInviteUrl(url);
										setSaved("Copy the link below and send it to them.");
									});
								},
								children: "Copy invite link"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "outline",
								disabled: busy,
								onClick: () => void revoke({ inviteId: inviteRow.id }),
								children: "Revoke invite"
							})]
						})]
					}, inviteRow.id))
				})]
			}) : null
		]
	});
}
//#endregion
export { TeamPage as component };
