import { r as createServerFn } from "./ssr.mjs";
import { F as object, R as string, k as array } from "../_libs/@better-auth/core+[...].mjs";
import { t as authMiddleware } from "./middleware-C4156sa6.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-copy-data-DhWe7ZX7.js
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
var getPublicSiteCopy_createServerFn_handler = createServerRpc({
	id: "e5583d53044e2b370d6622599f65e51c917b23588436c205f8cdc10c70e44d3b",
	name: "getPublicSiteCopy",
	filename: "src/lib/site-copy-data.ts"
}, (opts) => getPublicSiteCopy.__executeServer(opts));
var getPublicSiteCopy = createServerFn({ method: "GET" }).handler(getPublicSiteCopy_createServerFn_handler, async () => {
	const { readSiteCopy } = await import("./site-copy-data.server-BoUZC8A5.mjs");
	return readSiteCopy();
});
var getStudioSiteCopy_createServerFn_handler = createServerRpc({
	id: "3ad12f34e969143f2eb859e3e06ba063c46761611b2231f136329f804f0ad132",
	name: "getStudioSiteCopy",
	filename: "src/lib/site-copy-data.ts"
}, (opts) => getStudioSiteCopy.__executeServer(opts));
var getStudioSiteCopy = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getStudioSiteCopy_createServerFn_handler, async ({ context }) => {
	const { requireStaff } = await import("./staff.server-CL-6ZGxS.mjs");
	const { readSiteCopy } = await import("./site-copy-data.server-BoUZC8A5.mjs");
	await requireStaff(context.userId);
	return readSiteCopy();
});
var saveStudioSiteCopy_createServerFn_handler = createServerRpc({
	id: "d1db8d03980ece32480f904c20b37594286de1aa7986294951d2fe5976f59608",
	name: "saveStudioSiteCopy",
	filename: "src/lib/site-copy-data.ts"
}, (opts) => saveStudioSiteCopy.__executeServer(opts));
var saveStudioSiteCopy = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(saveSchema).handler(saveStudioSiteCopy_createServerFn_handler, async ({ context, data }) => {
	const { saveSiteCopyFor } = await import("./site-copy-data.server-BoUZC8A5.mjs");
	return saveSiteCopyFor(context.userId, data);
});
var resetStudioSiteCopy_createServerFn_handler = createServerRpc({
	id: "faca87266efe5d2e0e8823670106a20e053682d025f436d02f0d65e505db4af1",
	name: "resetStudioSiteCopy",
	filename: "src/lib/site-copy-data.ts"
}, (opts) => resetStudioSiteCopy.__executeServer(opts));
var resetStudioSiteCopy = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(resetStudioSiteCopy_createServerFn_handler, async ({ context }) => {
	const { resetSiteCopyFor } = await import("./site-copy-data.server-BoUZC8A5.mjs");
	return resetSiteCopyFor(context.userId);
});
//#endregion
export { getPublicSiteCopy_createServerFn_handler, getStudioSiteCopy_createServerFn_handler, resetStudioSiteCopy_createServerFn_handler, saveStudioSiteCopy_createServerFn_handler };
