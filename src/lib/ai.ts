import { createServerFn } from "@tanstack/react-start";
import { AGENCY, DEPARTMENTS, PACKAGES } from "./catalog";

type ChatTurn = { role: "user" | "assistant" | "system"; content: string };

const CATALOG_BRIEF = `
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

async function complete(
  messages: ChatTurn[],
  maxTokens: number,
): Promise<{ ok: true; text: string } | { ok: false; error: string }> {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) return { ok: false, error: "AI is not available in this environment" };

  const res = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "grok-4.5",
      messages,
      max_tokens: maxTokens,
      temperature: 0.6,
    }),
  });

  if (!res.ok) {
    return { ok: false, error: `xAI API error ${res.status}` };
  }

  const body = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  return { ok: true, text: body.choices?.[0]?.message?.content ?? "" };
}

export const receptionReply = createServerFn({ method: "POST" })
  .validator((input: { messages: ChatTurn[]; extracted: string }) => input)
  .handler(async ({ data }) => {
    const system: ChatTurn = {
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
${data.extracted || "(nothing structured yet)"}`,
    };

    const history = data.messages.slice(-12);
    return complete([system, ...history], 500);
  });

export const assistantReply = createServerFn({ method: "POST" })
  .validator(
    (input: {
      name: string;
      role: string;
      brief: string;
      tone: string;
      messages: ChatTurn[];
    }) => input,
  )
  .handler(async ({ data }) => {
    const system: ChatTurn = {
      role: "system",
      content: `You are ${data.name}, ${data.role} at Virellion, a small multidisciplinary agency supported by AI.

${CATALOG_BRIEF}

Your operating brief:
${data.brief}

Tone: ${data.tone}

Distinguish client-facing communication (professional, accurate scope, confidential, escalate when needed) from internal operations (checklists, drafts, quality flags).
Do not invent client results or credentials. Keep answers useful and structured. Default to 120–220 words unless asked for a longer artifact. Prefer plain text with numbered lists over markdown.`,
    };
    const history = data.messages.slice(-16);
    return complete([system, ...history], 900);
  });

export const draftScope = createServerFn({ method: "POST" })
  .validator((input: { intakeJson: string; routingJson: string }) => input)
  .handler(async ({ data }) => {
    const system: ChatTurn = {
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

Stay within Virellion boundaries. Do not promise legal outcomes or marketplace approval.`,
    };
    return complete(
      [
        system,
        {
          role: "user",
          content: `Intake:\n${data.intakeJson}\n\nRouting:\n${data.routingJson}`,
        },
      ],
      700,
    );
  });
