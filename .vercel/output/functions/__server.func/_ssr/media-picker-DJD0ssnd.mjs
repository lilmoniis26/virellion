import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { x as STUDIO_MEDIA } from "./catalog-CyGgm22L.mjs";
import { t as Input } from "./input-B1NnXfay.mjs";
import { t as Label } from "./label-Cmem6H5a.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/media-picker-DJD0ssnd.js
var import_jsx_runtime = require_jsx_runtime();
function MediaPicker({ image, alt, onImage, onAlt, idPrefix = "media" }) {
	const onFile = (file) => {
		if (!file) return;
		if (file.size > 9e5) return;
		const reader = new FileReader();
		reader.onload = () => {
			const result = typeof reader.result === "string" ? reader.result : "";
			if (result) onImage(result);
		};
		reader.readAsDataURL(file);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Photograph" }),
			image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: image,
				alt: "",
				className: "aspect-photo w-full max-w-sm rounded-lg object-cover"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-5 gap-2 sm:grid-cols-6",
				children: STUDIO_MEDIA.map((photo) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: `overflow-hidden rounded-md border ${image === photo.src ? "border-accent" : "border-border"}`,
					onClick: () => onImage(photo.src, photo.alt),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: photo.src,
						alt: photo.label,
						className: "aspect-square w-full object-cover"
					})
				}, photo.src))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor: `${idPrefix}-url`,
				children: "Or image link"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				id: `${idPrefix}-url`,
				placeholder: "https://…",
				value: image.startsWith("data:") ? "" : image,
				onChange: (e) => onImage(e.target.value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor: `${idPrefix}-file`,
				children: "Or upload a file"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				id: `${idPrefix}-file`,
				type: "file",
				accept: "image/jpeg,image/png,image/webp",
				onChange: (e) => onFile(e.target.files?.[0])
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor: `${idPrefix}-alt`,
				children: "Image description"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				id: `${idPrefix}-alt`,
				value: alt,
				onChange: (e) => onAlt(e.target.value)
			})
		]
	});
}
//#endregion
export { MediaPicker as t };
