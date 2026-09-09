import { r as createServerFn } from "./ssr.mjs";
import { f as PACKAGES, o as DEPARTMENTS, t as AGENCY } from "./catalog-CyGgm22L.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai-CegiWtT0.js
var CATALOG_BRIEF = `
Agency: ${AGENCY.name}
Headline: ${AGENCY.headline}
Positioning: ${AGENCY.positioning}

Departments:
${DEPARTMENTS.map((d) => `- ${d.label}: ${d.capabilities.slice(0, 6).join(", ")}`).join("\n")}

Launch packages: ${PACKAGES.filter((p) => p.kind === "launch").map((p) => p.name).join("; ")}

Boundaries:
- Administrative assistance, research, preparation, coordination, referral — not legal, tax, medical, immigration, or investment advice.
- Client owns email, phone, domain, tax IDs, identity documents, bank, cards, marketplace profiles, recovery methods.
- Never request passwords when invitation-based access exists.
- Never create client accounts using agency identity, address, tax ID, phone, or payment details.
- Never guarantee approval, sales, rankings, funding, or revenue.
- Do not fabricate employees, credentials, certifications, or client results. Use role-based language ("our publishing team").
`.trim();
async function complete(messages, maxTokens) {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "AI is not available in this environment"
	};
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			messages,
			max_tokens: maxTokens,
			temperature: .6
		})
	});
	if (!res.ok) return {
		ok: false,
		error: `xAI API error ${res.status}`
	};
	return {
		ok: true,
		text: (await res.json()).choices?.[0]?.message?.content ?? ""
	};
}
var receptionReply_createServerFn_handler = createServerRpc({
	id: "75d0da3184afc3e456801da619063f600a57b1b357854d73b4b27cfdff3e5ab8",
	name: "receptionReply",
	filename: "src/lib/ai.ts"
}, (opts) => receptionReply.__executeServer(opts));
var receptionReply = createServerFn({ method: "POST" }).validator((input) => input).handler(receptionReply_createServerFn_handler, async ({ data }) => {
	return complete([{
		role: "system",
		content: `You are the Virellion AI receptionist — front desk and intake specialist.

${CATALOG_BRIEF}

Voice: professional, friendly, confident, organized, efficient, approachable, knowledgeable, solution-oriented. Not robotic, pushy, overly formal, confused, or like a generic chatbot.

Rules:
- Do not recite the entire catalog.
- Classify by desired outcome, not just the customer's words.
- Ask one or two concise questions at a time about: desired outcome, current situation, target audience, required deliverables, deadline, budget range, existing assets, location, and whether the work involves legal, tax, financial, medical, employment, immigration, or licensing matters.
- If formation or reseller work appears, also ask about proposed business name, current status, entity type, address situation, marketplace, product category, suppliers, inventory, sales channels, bank/EIN/insurance/licenses.
- When you have enough to route, state the likely departments, engagement type (individual / package / end-to-end / consultation / retainer), risk flags, and the next step (scope summary or consultation).
- If regulated or high-value, say a human will review before a proposal.
- Keep replies under 160 words unless summarizing a full route.
- Never collect passwords or full identity document numbers.
- Do not use markdown, asterisks, or bullet symbols. Write in short plain paragraphs.

Known so far from the form (may be partial):
${data.extracted || "(nothing structured yet)"}`
	}, ...data.messages.slice(-12)], 500);
});
var assistantReply_createServerFn_handler = createServerRpc({
	id: "44f76c9cfca3e66209dc584fc91d7217e5f9031d1625f2d2be67d590009e2cb4",
	name: "assistantReply",
	filename: "src/lib/ai.ts"
}, (opts) => assistantReply.__executeServer(opts));
var assistantReply = createServerFn({ method: "POST" }).validator((input) => input).handler(assistantReply_createServerFn_handler, async ({ data }) => {
	return complete([{
		role: "system",
		content: `You are ${data.name}, ${data.role} at Virellion, a small multidisciplinary agency supported by AI.

${CATALOG_BRIEF}

Your operating brief:
${data.brief}

Tone: ${data.tone}

Distinguish client-facing communication (professional, accurate scope, confidential, escalate when needed) from internal operations (checklists, drafts, quality flags).
Do not invent client results or credentials. Keep answers useful and structured. Default to 120–220 words unless asked for a longer artifact. Prefer plain text with numbered lists over markdown.`
	}, ...data.messages.slice(-16)], 900);
});
var draftScope_createServerFn_handler = createServerRpc({
	id: "2efb493bb3ccade9ed6999a0f82547abba8685d2e440817f3433d8413e04793d",
	name: "draftScope",
	filename: "src/lib/ai.ts"
}, (opts) => draftScope.__executeServer(opts));
var draftScope = createServerFn({ method: "POST" }).validator((input) => input).handler(draftScope_createServerFn_handler, async ({ data }) => {
	return complete([{
		role: "system",
		content: `You write Virellion scope summaries. ${CATALOG_BRIEF}

Return plain text with these headings exactly:
TITLE
SUMMARY
DELIVERABLES (bullet list)
EXCLUSIONS (bullet list)
TIMELINE
FEE (a single integer USD starting fee, no other text on that line)
ENGAGEMENT (one of: individual, package, end-to-end, consultation, retainer)
NEXT STEP

Stay within Virellion boundaries. Do not promise legal outcomes or marketplace approval.`
	}, {
		role: "user",
		content: `Intake:\n${data.intakeJson}\n\nRouting:\n${data.routingJson}`
	}], 700);
});
//#endregion
export { assistantReply_createServerFn_handler, draftScope_createServerFn_handler, receptionReply_createServerFn_handler };
