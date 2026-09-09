export const TERMS_VERSION = "2026-09-08";
export const TERMS_EFFECTIVE = "8 September 2026";

export const LEGAL_ALLOWS = [
  "Store your name, email, phone, billing details, and project notes so we can deliver the work.",
  "Share those details with the specialist assigned to your engagement — not with the public.",
  "Record orders, payment status, and receipts, including confirmation from PayPal or an invoice.",
  "Contact you about this project, payment, and handoff.",
  "Keep engagement records the studio needs to operate, account for the work, and defend the engagement.",
];

export const LEGAL_DOES_NOT = [
  "Open bank, marketplace, tax, or government accounts in your name, or use Virellion identity to do so.",
  "Give legal, tax, accounting, investment, immigration, or medical advice.",
  "Collect or store your PayPal password or card number on this site.",
  "Sell your information, or add you to a marketing list unless you opt in.",
  "Fabricate employees, client results, reviews, or guarantees of approval, sales, or revenue.",
  "Retain passwords when an invitation-based permission system is available.",
];

export type LegalSection = { heading: string; paragraphs: string[] };

export const TERMS_SECTIONS: LegalSection[] = [
  {
    heading: "Who we are",
    paragraphs: [
      "Virellion is a multidisciplinary creative, business, and technology studio operating at virellion.online. These Terms of Engagement govern every inquiry, order, package, and conversation you start through this site. By creating an account, submitting intake, or placing an order, you agree to them.",
      "Virellion provides administrative assistance, research, preparation, coordination, production, and referral support. We are not a law firm, CPA firm, bank, broker-dealer, immigration practice, or medical provider.",
    ],
  },
  {
    heading: "What you are agreeing to",
    paragraphs: [
      "You are hiring Virellion to perform the scoped work described in the catalog item, proposal, or intake record — not an open-ended retainer unless we agree in writing. Starting prices on flagship offers and launch packages are the published fees for the listed deliverables. Custom work is scoped after a conversation.",
      "You confirm that the information you give us is accurate, that you have the right to share any files or copy you upload, and that you will personally complete identity checks, banking, marketplace verification, and any legal or tax decisions.",
    ],
  },
  {
    heading: "Professional boundaries",
    paragraphs: [
      "You own the primary email, phone, domain, tax identifiers, identity documents, bank account, payment cards, marketplace profiles, and recovery methods. Virellion uses delegated access where possible. We do not create client marketplace or banking accounts using agency identity, address, tax ID, phone, or payment details.",
      "We do not guarantee marketplace approval, sales, rankings, funding, or revenue. We do not use fake reviews or misrepresent ownership. Sensitive, regulated, or high-value work is reviewed by a human before production.",
    ],
  },
  {
    heading: "Payment",
    paragraphs: [
      "Payment is due as stated on the order. You may pay through PayPal (using the studio’s PayPal checkout), by invoice, or by a secure card link the studio sends. Virellion never collects or stores card numbers or PayPal passwords on this site. Funds are received in the studio’s existing PayPal business / POS account.",
      "Placing an order reserves the published starting price. Production starts after the studio confirms funds, unless a deposit plan is agreed in writing. You are responsible for completing the PayPal (or invoice) payment and for including the order number in the PayPal note when asked.",
      "Fees for work already performed are earned. If work has not started, contact the studio. Chargebacks filed without first writing to the studio may be treated as a dispute of the engagement record.",
    ],
  },
  {
    heading: "Receipts",
    paragraphs: [
      "When the studio confirms payment, Virellion issues a numbered receipt on your account. The receipt is your record of the amount, method, and date. It is a studio receipt for professional services — not tax, legal, or licensed advice, and not a substitute for your own bookkeeping.",
    ],
  },
  {
    heading: "Deliverables and ownership",
    paragraphs: [
      "After payment is confirmed, you own the finished deliverables created for you, excluding Virellion methods, templates, internal tools, and pre-existing materials. You grant Virellion a limited license to use anonymized process descriptions internally. We will not publish your unpublished work as a case study without your written permission.",
    ],
  },
  {
    heading: "Your information",
    paragraphs: [
      "How we use personal information is described in the Privacy Notice. By accepting these terms you also accept that notice. Marketing contact is optional and separate: we only add you to a studio marketing list if you opt in.",
    ],
  },
  {
    heading: "Limitation of liability",
    paragraphs: [
      "To the fullest extent permitted by law, Virellion is not liable for indirect, incidental, special, consequential, or lost-profit damages, or for outcomes that depend on third parties (marketplaces, banks, platforms, printers, licensors, or government agencies).",
      "Virellion’s total liability for a given engagement is limited to the fees you actually paid Virellion for that engagement. You agree to indemnify Virellion against claims arising from content, products, or representations you supplied, or from accounts you own.",
    ],
  },
  {
    heading: "Changes and governing law",
    paragraphs: [
      "We may update these terms. The version date on this page is the version that applies to new orders and inquiries. Existing paid work keeps the version you accepted on that order.",
      "These terms are governed by the laws of the State of California, United States, without regard to conflict-of-law rules. If a court finds a provision unenforceable, the rest remains in effect.",
    ],
  },
];

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    heading: "What we collect",
    paragraphs: [
      "Account identity (name, email), optional phone, billing name and email, project intake, files and notes you send, order history, payment method chosen (PayPal, invoice, or card link — never the card or PayPal password), terms-acceptance records, and whether you opted in to marketing.",
      "Sign-in may be through Google, X, or email. Those providers share the profile information you authorize. We do not see your password at those providers.",
    ],
  },
  {
    heading: "How we use it",
    paragraphs: [
      "To run your account, route work, produce deliverables, confirm payment, issue receipts, contact you about the engagement, keep studio records, and — only if you opt in — send related studio updates.",
      "We do not sell your information. We do not use it to open accounts in your name. We do not use Virellion identity, address, or tax ID as if it were yours.",
    ],
  },
  {
    heading: "Who we share with",
    paragraphs: [
      "Payment processors you choose (PayPal, or a card processor behind a secure link). Specialists inside Virellion assigned to your work. Licensed professionals only when you ask us to coordinate a referral. Hosting and database providers that store this site.",
      "We share what is required to complete the engagement or as required by law. We do not share your list with unrelated marketers.",
    ],
  },
  {
    heading: "Marketing list",
    paragraphs: [
      "The studio keeps a client roster so we can serve you again. That operational list is not a license to market to you.",
      "A separate marketing list includes only people who opted in. You can turn this off in your account at any time. Opting out does not delete your project records or stop messages about an active order.",
    ],
  },
  {
    heading: "Retention and your requests",
    paragraphs: [
      "Engagement, payment, and receipt records are kept for as long as the studio needs them for operations, accounting, and disputes. You may ask to review, correct, or delete personal information that is not required to keep as a business record. Write through your account on virellion.online or the studio desk.",
      "If you are in California you may request access, deletion, and information about sharing. Virellion does not sell personal information.",
    ],
  },
];
