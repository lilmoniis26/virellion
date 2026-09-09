export type DepartmentId =
  | "creative"
  | "publishing"
  | "video"
  | "audio"
  | "web"
  | "technology"
  | "formation"
  | "ecommerce"
  | "marketing"
  | "consulting"
  | "fashion"
  | "architecture"
  | "career"
  | "creator"
  | "data"
  | "specialized";

export type EngagementType =
  | "individual"
  | "package"
  | "end-to-end"
  | "consultation"
  | "retainer";

export type RiskLabel =
  | "professional-referral"
  | "identity-verification"
  | "sensitive-data"
  | "regulated-industry"
  | "marketplace-approval"
  | "human-review";

export type JourneyStage =
  | "inquiry"
  | "discovery"
  | "classification"
  | "review"
  | "scoping"
  | "approval"
  | "project"
  | "production"
  | "quality"
  | "delivery"
  | "follow-up";

export type InquiryStatus = "new" | "open" | "review" | "proposed" | "won" | "closed";

export type ProjectStatus =
  | "setup"
  | "in-progress"
  | "internal-review"
  | "delivered"
  | "follow-up";

export type BudgetRange =
  | "under-1k"
  | "1k-3k"
  | "3k-8k"
  | "8k-20k"
  | "20k-plus"
  | "unsure";

export type CommChannel = "email" | "phone" | "sms" | "chat";

export type ChatRole = "user" | "assistant" | "system";

export type YesNo = "" | "yes" | "no";

export interface Department {
  id: string;
  label: string;
  short: string;
  capabilities: string[];
  typicalClients: string;
}

export interface Offer {
  slug: string;
  name: string;
  eyebrow: string;
  outcome: string;
  summary: string;
  deliverables: string[];
  exclusions: string[];
  timeline: string;
  startingPrice: number;
  nextStep: string;
  departments: string[];
  image: string;
  imageAlt: string;
}

export interface ServicePackage {
  id: string;
  name: string;
  kind: "launch" | "custom";
  summary: string;
  deliverables: string[];
  timeline: string;
  price: number;
  priceSuffix?: string;
  departments: string[];
}

export interface IntakeRecord {
  name: string;
  email: string;
  phone: string;
  desiredOutcome: string;
  projectType: string;
  location: string;
  audience: string;
  currentStage: string;
  services: string[];
  deadline: string;
  budget: BudgetRange | "";
  assets: string;
  channel: CommChannel | "";
  regulated: string[];
  businessName: string;
  businessStatus: string;
  entityType: string;
  addressSituation: string;
  marketplace: string;
  productCategory: string;
  supplierStatus: string;
  inventoryStatus: string;
  salesChannels: string;
  hasBank: YesNo;
  hasEin: YesNo;
  hasInsurance: YesNo;
  hasLicenses: YesNo;
  hasComplianceDocs: YesNo;
}

export interface QualityCheck {
  id: string;
  label: string;
  done: boolean;
}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: string;
}

export interface RoutingResult {
  departments: DepartmentId[];
  engagement: EngagementType;
  risks: RiskLabel[];
  suggestedPackageId?: string;
  suggestedOfferSlug?: string;
  specialists: string[];
  summary: string;
  needsHumanReview: boolean;
}

export interface Inquiry {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: InquiryStatus;
  stage: JourneyStage;
  source: "form" | "receptionist" | "demo";
  intake: IntakeRecord;
  routing: RoutingResult | null;
  notes: string;
  conversation: ChatMessage[];
}

export interface Proposal {
  id: string;
  inquiryId: string;
  createdAt: string;
  title: string;
  summary: string;
  deliverables: string[];
  exclusions: string[];
  timeline: string;
  fee: number;
  engagement: EngagementType;
  status: "draft" | "sent" | "approved" | "declined";
}

export interface ProjectTask {
  id: string;
  title: string;
  done: boolean;
  owner: string;
}

export interface Project {
  id: string;
  inquiryId: string;
  proposalId: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  clientName: string;
  status: ProjectStatus;
  stage: JourneyStage;
  specialist: string;
  folders: string[];
  tasks: ProjectTask[];
  quality: QualityCheck[];
  handoff: string;
  followUp: string;
}

export interface AssistantDef {
  id: string;
  name: string;
  role: string;
  department?: DepartmentId | string;
  brief: string;
  tone: string;
  createdAt: string;
  template?: boolean;
}

export interface AssistantThread {
  assistantId: string;
  messages: ChatMessage[];
  updatedAt: string;
}
