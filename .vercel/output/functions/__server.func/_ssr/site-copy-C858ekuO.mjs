import { c as ENGAGEMENTS, l as FAQS, m as PUBLIC_STEPS, r as BOUNDARIES } from "./catalog-CyGgm22L.mjs";
import { a as TERMS_SECTIONS, i as TERMS_EFFECTIVE, n as LEGAL_DOES_NOT, o as TERMS_VERSION, r as PRIVACY_SECTIONS, t as LEGAL_ALLOWS } from "./legal-Ck2GEDxe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-copy-C858ekuO.js
var SITE = {
	name: "Virellion",
	wordmark: "VIRELLION",
	host: "virellion.online",
	url: "https://virellion.online"
};
function hero(partial) {
	return partial;
}
function defaultSiteCopy() {
	return {
		home: {
			kicker: "Creative · Business · Technology",
			title: "One team. Multiple specialties. Complete solutions.",
			dek: "A multidisciplinary studio for authors, founders, creators, and online sellers. From formation and storefronts to brands, books, film, and systems — described in ordinary language, delivered as one piece of work.",
			image: "/media/hero.jpg",
			imageAlt: "Editorial studio table with cream paper, a brass compass, and a blank linen book.",
			paperQuote: "We take an idea and return a finished brand, book, store, film, or system — one coordinated engagement, not a freelance roster.",
			stats: [
				{
					k: "16",
					v: "Practices under one roof"
				},
				{
					k: "5",
					v: "Launch packages you can buy now"
				},
				{
					k: "3",
					v: "Ways to engage, from one task to end-to-end"
				}
			],
			offersKicker: "Flagship offers",
			offersTitle: "Three ways in. Everything else stays custom until we prove it.",
			servicesKicker: "Services",
			servicesTitle: "Major practices, not a hundred line items.",
			servicesDek: "The public site shows departments. Detailed services appear after you choose a practice — or after you tell reception the outcome.",
			studioKicker: "The studio",
			studioTitle: "One coordinated team — not a freelance roster.",
			studioBody1: "Clients hire us for one task, a connected package, or a complete start-to-finish solution. AI is the operating infrastructure for reception, intake, routing, and coordination. It is not a replacement for professional judgment, licensed advice, or human accountability.",
			studioBody2: "You own every account. We do not create marketplace or banking profiles in the agency’s name, and we do not hold passwords when an invitation will do.",
			studioImage: "/media/atelier.jpg",
			studioImageAlt: "Empty atelier with a long oak work table and a north-facing window.",
			engagementKicker: "Engagement",
			engagementTitle: "Hire the width of the problem.",
			packagesKicker: "Packages",
			packagesTitle: "Five offers we can deliver now.",
			stepsKicker: "How it works",
			stepsTitle: "Inquiry to handoff, without improvising the middle.",
			faqKicker: "Questions",
			faqTitle: "Before you write."
		},
		services: hero({
			kicker: "Services",
			title: "The catalog, by practice.",
			dek: "Sixteen departments. Hire one, or describe the outcome and we will assemble the rest. Detailed services appear after you choose a practice.",
			image: "/media/atelier.jpg",
			imageAlt: "Empty atelier with a long oak work table and a north-facing window."
		}),
		offers: {
			kicker: "Offers",
			title: "Three public offers. A fifth of the catalog, on purpose.",
			dek: "The full practice map stays available as custom work. These three are the first revenue paths — each with a defined outcome, exclusions, timeline, and starting price."
		},
		packages: {
			kicker: "Packages",
			title: "Launch with five. Keep the rest custom.",
			dek: "Other capabilities stay available as scoped work until demand and capacity are proven.",
			image: "/media/commerce.jpg",
			imageAlt: "Unbranded kraft packing boxes, tissue, and a ceramic bowl on dark oak.",
			sectionTitle: "Fixed starting prices. Defined deliverables. No improvising the middle.",
			sectionDek: "Initial launch set"
		},
		work: {
			kicker: "Approach",
			title: "Inquiry to handoff, without improvising the middle.",
			dek: "AI receives the inquiry. A human reviews anything complex, regulated, sensitive, or high-value. You approve scope and terms before work begins. You own every account.",
			image: "/media/paper.jpg",
			imageAlt: "Brass compass, blank cotton paper, and a linen notebook on dark slate.",
			pathTitle: "Five steps you will actually feel.",
			engagementTitle: "Hire the width of the problem.",
			engagementImage: "/media/atelier.jpg",
			engagementImageAlt: "Empty atelier with a long oak work table and a north-facing window.",
			boundariesTitle: "What this studio will not do."
		},
		start: hero({
			kicker: "Intake",
			title: "Tell us the outcome.",
			dek: "Sign in to file it to your account. Prefer a conversation? Talk to reception.",
			image: "/media/paper.jpg",
			imageAlt: "Brass compass and blank cotton paper on dark slate."
		}),
		receptionist: hero({
			kicker: "Front desk",
			title: "Reception",
			dek: "Describe the outcome in ordinary language. Reception identifies the practice, risks, and next step.",
			image: "/media/hero.jpg",
			imageAlt: "Editorial studio table with cream paper and a brass compass."
		}),
		login: {
			kicker: "Client access",
			titleSignIn: "Sign in to Virellion.",
			titleSignUp: "Create your studio account.",
			dek: "Google, X, or email. Use this account to submit work, order a package, and pay.",
			body: "Sign in to track inquiries, place an order, and pay with PayPal, invoice, or a secure card link. Card numbers and PayPal passwords are never entered on this site."
		},
		account: hero({
			kicker: "Client account",
			title: "Your studio account.",
			dek: "Inquiries, orders, receipts, and how we may contact you. The public catalog stays on the site; this is the record of your work.",
			image: "/media/systems.jpg",
			imageAlt: "Closed laptop and ceramic cup on a dark oak desk."
		}),
		nav: {
			services: "Services",
			offers: "Offers",
			packages: "Packages",
			work: "Approach",
			startCta: "Start a project",
			receptionCta: "Talk to reception"
		},
		contact: {
			email: "",
			phone: "",
			addressLine: SITE.host
		},
		footer: {
			blurb: "A multidisciplinary creative, business, and technology studio. One team. Multiple specialties. Complete solutions.",
			legalLine: `Administrative assistance, research, preparation, coordination, and referral support. Not legal, tax, accounting, investment, immigration, or medical advice. Clients own every account, identifier, and recovery method. Payment is confirmed in PayPal or by invoice; Virellion never stores card numbers. Studio address: ${SITE.host}.`
		},
		cta: {
			title: "Tell us what you want finished.",
			body: "One coordinated team will identify the services, specialists, timeline, and next step.",
			startLabel: "Start a project",
			receptionLabel: "Talk to reception"
		},
		faqs: FAQS.map((f) => ({
			q: f.q,
			a: f.a
		})),
		steps: PUBLIC_STEPS.map((s) => ({
			n: s.n,
			title: s.title,
			body: s.body
		})),
		engagements: ENGAGEMENTS.map((e) => ({
			id: e.id,
			label: e.label,
			bestFor: e.bestFor,
			examples: e.examples
		})),
		boundaries: [...BOUNDARIES],
		legal: {
			version: TERMS_VERSION,
			effective: TERMS_EFFECTIVE,
			termsKicker: "Studio terms",
			termsTitle: "Terms of Engagement.",
			termsDek: `Version ${TERMS_VERSION} · Effective ${TERMS_EFFECTIVE}.`,
			termsImage: "/media/paper.jpg",
			termsImageAlt: "Brass compass and blank cotton paper on slate.",
			privacyKicker: "Privacy",
			privacyTitle: "How we use your information.",
			privacyDek: `Version ${TERMS_VERSION} · Effective ${TERMS_EFFECTIVE}.`,
			privacyImage: "/media/systems.jpg",
			privacyImageAlt: "Closed laptop and ceramic cup on a dark oak desk.",
			terms: TERMS_SECTIONS.map((s) => ({
				heading: s.heading,
				paragraphs: [...s.paragraphs]
			})),
			privacy: PRIVACY_SECTIONS.map((s) => ({
				heading: s.heading,
				paragraphs: [...s.paragraphs]
			})),
			allows: [...LEGAL_ALLOWS],
			doesNot: [...LEGAL_DOES_NOT]
		}
	};
}
function str(value, fallback) {
	return typeof value === "string" && value.trim() ? value : fallback;
}
function mergeHero(base, patch) {
	return {
		kicker: str(patch?.kicker, base.kicker),
		title: str(patch?.title, base.title),
		dek: str(patch?.dek, base.dek),
		image: str(patch?.image, base.image),
		imageAlt: str(patch?.imageAlt, base.imageAlt)
	};
}
function mergeLines(value, fallback) {
	if (!Array.isArray(value) || value.length === 0) return fallback;
	return value.map((item) => typeof item === "string" ? item : "").filter((item) => item.trim());
}
function mergeSections(value, fallback) {
	if (!Array.isArray(value) || value.length === 0) return fallback;
	return value.map((item) => {
		const row = item && typeof item === "object" ? item : {
			heading: "",
			paragraphs: []
		};
		return {
			heading: str(row.heading, ""),
			paragraphs: Array.isArray(row.paragraphs) ? row.paragraphs.map((p) => str(p, "")).filter(Boolean) : []
		};
	}).filter((item) => item.heading);
}
function mergeSiteCopy(raw) {
	const d = defaultSiteCopy();
	const saved = raw && typeof raw === "object" ? raw : {};
	const home = {
		...d.home,
		...saved.home ?? {}
	};
	const stats = Array.isArray(saved.home?.stats) && saved.home.stats.length ? saved.home.stats.map((s, i) => ({
		k: str(s?.k, d.home.stats[i]?.k ?? ""),
		v: str(s?.v, d.home.stats[i]?.v ?? "")
	})) : d.home.stats;
	const faqs = Array.isArray(saved.faqs) && saved.faqs.length ? saved.faqs.map((f) => ({
		q: str(f?.q, ""),
		a: str(f?.a, "")
	})).filter((f) => f.q) : d.faqs;
	const steps = Array.isArray(saved.steps) && saved.steps.length ? saved.steps.map((s, i) => ({
		n: str(s?.n, d.steps[i]?.n ?? String(i + 1).padStart(2, "0")),
		title: str(s?.title, ""),
		body: str(s?.body, "")
	})) : d.steps;
	const engagements = Array.isArray(saved.engagements) && saved.engagements.length ? saved.engagements.map((e, i) => ({
		id: str(e?.id, d.engagements[i]?.id ?? `e${i}`),
		label: str(e?.label, ""),
		bestFor: str(e?.bestFor, ""),
		examples: str(e?.examples, "")
	})) : d.engagements;
	const legalPatch = saved.legal;
	return {
		home: {
			...mergeHero(d.home, home),
			...home,
			stats
		},
		services: mergeHero(d.services, saved.services),
		offers: {
			kicker: str(saved.offers?.kicker, d.offers.kicker),
			title: str(saved.offers?.title, d.offers.title),
			dek: str(saved.offers?.dek, d.offers.dek)
		},
		packages: {
			...mergeHero(d.packages, saved.packages),
			sectionTitle: str(saved.packages?.sectionTitle, d.packages.sectionTitle),
			sectionDek: str(saved.packages?.sectionDek, d.packages.sectionDek)
		},
		work: {
			...mergeHero(d.work, saved.work),
			pathTitle: str(saved.work?.pathTitle, d.work.pathTitle),
			engagementTitle: str(saved.work?.engagementTitle, d.work.engagementTitle),
			engagementImage: str(saved.work?.engagementImage, d.work.engagementImage),
			engagementImageAlt: str(saved.work?.engagementImageAlt, d.work.engagementImageAlt),
			boundariesTitle: str(saved.work?.boundariesTitle, d.work.boundariesTitle)
		},
		start: mergeHero(d.start, saved.start),
		receptionist: mergeHero(d.receptionist, saved.receptionist),
		login: {
			kicker: str(saved.login?.kicker, d.login.kicker),
			titleSignIn: str(saved.login?.titleSignIn, d.login.titleSignIn),
			titleSignUp: str(saved.login?.titleSignUp, d.login.titleSignUp),
			dek: str(saved.login?.dek, d.login.dek),
			body: str(saved.login?.body, d.login.body)
		},
		account: mergeHero(d.account, saved.account),
		nav: {
			services: str(saved.nav?.services, d.nav.services),
			offers: str(saved.nav?.offers, d.nav.offers),
			packages: str(saved.nav?.packages, d.nav.packages),
			work: str(saved.nav?.work, d.nav.work),
			startCta: str(saved.nav?.startCta, d.nav.startCta),
			receptionCta: str(saved.nav?.receptionCta, d.nav.receptionCta)
		},
		contact: {
			email: typeof saved.contact?.email === "string" ? saved.contact.email : d.contact.email,
			phone: typeof saved.contact?.phone === "string" ? saved.contact.phone : d.contact.phone,
			addressLine: str(saved.contact?.addressLine, d.contact.addressLine)
		},
		footer: {
			blurb: str(saved.footer?.blurb, d.footer.blurb),
			legalLine: str(saved.footer?.legalLine, d.footer.legalLine)
		},
		cta: {
			title: str(saved.cta?.title, d.cta.title),
			body: str(saved.cta?.body, d.cta.body),
			startLabel: str(saved.cta?.startLabel, d.cta.startLabel),
			receptionLabel: str(saved.cta?.receptionLabel, d.cta.receptionLabel)
		},
		faqs,
		steps,
		engagements,
		boundaries: mergeLines(saved.boundaries, d.boundaries),
		legal: {
			version: str(legalPatch?.version, d.legal.version),
			effective: str(legalPatch?.effective, d.legal.effective),
			termsKicker: str(legalPatch?.termsKicker, d.legal.termsKicker),
			termsTitle: str(legalPatch?.termsTitle, d.legal.termsTitle),
			termsDek: str(legalPatch?.termsDek, d.legal.termsDek),
			termsImage: str(legalPatch?.termsImage, d.legal.termsImage),
			termsImageAlt: str(legalPatch?.termsImageAlt, d.legal.termsImageAlt),
			privacyKicker: str(legalPatch?.privacyKicker, d.legal.privacyKicker),
			privacyTitle: str(legalPatch?.privacyTitle, d.legal.privacyTitle),
			privacyDek: str(legalPatch?.privacyDek, d.legal.privacyDek),
			privacyImage: str(legalPatch?.privacyImage, d.legal.privacyImage),
			privacyImageAlt: str(legalPatch?.privacyImageAlt, d.legal.privacyImageAlt),
			terms: mergeSections(legalPatch?.terms, d.legal.terms),
			privacy: mergeSections(legalPatch?.privacy, d.legal.privacy),
			allows: mergeLines(legalPatch?.allows, d.legal.allows),
			doesNot: mergeLines(legalPatch?.doesNot, d.legal.doesNot)
		}
	};
}
//#endregion
export { defaultSiteCopy as n, mergeSiteCopy as r, SITE as t };
