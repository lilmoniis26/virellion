import { S as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as SERVICE_GROUPS } from "./catalog-CyGgm22L.mjs";
import { f as useSiteCopy, g as useLiveCatalog } from "./router-DxJdDo-e.mjs";
import { t as PageHero } from "./page-hero-CPyRRzn8.mjs";
import { t as CloseCta } from "./close-cta-CpomdH5Y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/services-BpRyBx4d.js
var import_jsx_runtime = require_jsx_runtime();
function ServicesPage() {
	const { departments } = useLiveCatalog();
	const copy = useSiteCopy();
	const byId = Object.fromEntries(departments.map((d) => [d.id, d]));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
			src: copy.services.image,
			alt: copy.services.imageAlt,
			kicker: copy.services.kicker,
			title: copy.services.title,
			dek: copy.services.dek
		}),
		SERVICE_GROUPS.map((group) => {
			const ids = group.ids.filter((id) => byId[id]);
			if (ids.length === 0) return null;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-b border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-4 py-16 sm:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-[0.18em] text-subtle",
							children: group.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-3xl text-fg",
							children: group.dek
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
							children: ids.map((id) => {
								const d = byId[id];
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/departments/$id",
									params: { id },
									className: "group overflow-hidden rounded-xl border border-border bg-surface",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "aspect-photo overflow-hidden",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: d.image,
											alt: d.imageAlt,
											className: "size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "font-display text-2xl text-fg",
												children: d.short
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 text-sm leading-relaxed text-muted",
												children: d.capabilities.slice(0, 5).join(" · ")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-3 text-xs text-subtle",
												children: ["Typical clients · ", d.typicalClients]
											})
										]
									})]
								}, id);
							})
						})
					]
				})
			}, group.title);
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseCta, {
			title: "Not sure which practice?",
			body: "Tell reception the outcome. Classification is the first deliverable."
		})
	] });
}
//#endregion
export { ServicesPage as component };
