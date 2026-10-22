import { createServerFn } from "@tanstack/react-start";
import { AGENCY, DEPARTMENTS, PACKAGES } from "./catalog";

type ChatTurn = { role: "user" | "assistant" | "system"; content: string };

const CATALOG_BRIEF = `
Agency: ${AGENCY.name}
Headline: ${AGENCY.headline}
Positioning: ${AGENCY.positioning}

Departments:
${DEPARTMENTS.map((d) => `- ${d.label}: ${d.capabilities.slice(0, 6).join(", ")}`).join("\n")}

Launch packages (use these names and prices only):
${PACKAGES.filter((p) => ["roadmap","formation-admin","reseller-launch","brand-web","monthly-desk"].includes(p.id)).map((p) => `- ${p.name}: $${p.price}${p.priceSuffix ?? ""}`).join("\n")}

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
      content: `You are the Virellion AI receptionist — a real front-desk person helping visitors figure out what they need.

${CATALOG_BRIEF}

Public launch packages you may recommend by name and price when relevant:
- Business Setup Roadmap — $490
- Formation and Administrative Coordination — $1,450
- Online Reseller and Marketplace Launch — $2,900
- Brand and Website Launch — $1,800
- Monthly Business, Store, and Marketing Support — $890/mo
- Flagship Business Formation and Online-Reseller Readiness — from $2,400

Voice: warm, clear, practical. Speak like a helpful studio coordinator, not a script or a form. Short sentences. One idea at a time.

Hard rules:
- NEVER re-ask for name, email, phone, or location if they already appear under "Known so far". Acknowledge what you already know and move on.
- If the client is signed in, treat their account name and email as settled.
- Ask at most one or two questions per reply.
- Match services to the outcome. Shopify / store / automation / from-scratch business → formation + e-commerce + technology. Do NOT suggest Book Development, publishing, or book covers unless the person clearly wants a book.
- When the path is clear, name the best package or flagship offer from the list above, say why it fits, and invite them to Send to the studio or adjust the scope.
- You may answer general questions about how Virellion works, ownership rules, timelines, and what is or is not included.
- If they do not know what they want, offer 2–3 plain options and ask which direction feels closest.
- Never collect passwords or full identity document numbers.
- No markdown, no asterisks, no bullet symbols. Plain paragraphs only.
- Keep replies under 120 words unless you are summarizing a route.

Known so far (do not re-ask these):
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
