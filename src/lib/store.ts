import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ASSISTANT_TEMPLATES, QUALITY_CHECKS } from "./catalog";
import { classifyIntake, emptyIntake } from "./routing";
import type {
  AssistantDef,
  AssistantThread,
  ChatMessage,
  Inquiry,
  IntakeRecord,
  JourneyStage,
  Project,
  Proposal,
  RoutingResult,
} from "./types";
import { uid } from "./utils";
import { buildDemoState, DEMO_MARKER } from "./demo";

interface AtlasState {
  inquiries: Inquiry[];
  proposals: Proposal[];
  projects: Project[];
  assistants: AssistantDef[];
  threads: Record<string, AssistantThread>;
  reception: ChatMessage[];
  receptionIntake: IntakeRecord;
  demoComplete: boolean;
  addInquiry: (partial: {
    intake: IntakeRecord;
    source: Inquiry["source"];
    conversation?: ChatMessage[];
    routing?: RoutingResult | null;
  }) => string;
  updateInquiry: (id: string, patch: Partial<Inquiry>) => void;
  setInquiryStage: (id: string, stage: JourneyStage) => void;
  addProposal: (inquiryId: string, draft: Omit<Proposal, "id" | "createdAt" | "inquiryId">) => string;
  updateProposal: (id: string, patch: Partial<Proposal>) => void;
  approveProposal: (proposalId: string) => string;
  updateProject: (id: string, patch: Partial<Project>) => void;
  toggleTask: (projectId: string, taskId: string) => void;
  toggleQuality: (projectId: string, checkId: string) => void;
  addAssistant: (def: Omit<AssistantDef, "id" | "createdAt">) => string;
  updateAssistant: (id: string, patch: Partial<AssistantDef>) => void;
  removeAssistant: (id: string) => void;
  appendThread: (assistantId: string, message: ChatMessage) => void;
  setReception: (messages: ChatMessage[]) => void;
  setReceptionIntake: (intake: IntakeRecord) => void;
  loadTemplates: () => void;
  runDemo: () => void;
  resetWorkspace: () => void;
}

const defaultAssistants = (): AssistantDef[] =>
  ASSISTANT_TEMPLATES.map((t) => ({
    id: t.id,
    name: t.name,
    role: t.role,
    department: t.department,
    brief: t.brief,
    tone: t.tone,
    createdAt: new Date().toISOString(),
    template: true,
  }));

function nextStatus(stage: JourneyStage): Inquiry["status"] {
  if (stage === "inquiry" || stage === "discovery" || stage === "classification") return "open";
  if (stage === "review") return "review";
  if (stage === "scoping") return "proposed";
  if (stage === "approval" || stage === "project" || stage === "production" || stage === "quality") return "won";
  return "closed";
}

export const useAtlas = create<AtlasState>()(
  persist(
    (set, get) => ({
      inquiries: [],
      proposals: [],
      projects: [],
      assistants: defaultAssistants(),
      threads: {},
      reception: [],
      receptionIntake: emptyIntake(),
      demoComplete: false,

      addInquiry: ({ intake, source, conversation = [], routing }) => {
        const id = uid("inq");
        const now = new Date().toISOString();
        const resolved = routing ?? classifyIntake(intake);
        const inquiry: Inquiry = {
          id,
          createdAt: now,
          updatedAt: now,
          status: resolved.needsHumanReview ? "review" : "open",
          stage: resolved.needsHumanReview ? "review" : "classification",
          source,
          intake,
          routing: resolved,
          notes: "",
          conversation,
        };
        set({ inquiries: [inquiry, ...get().inquiries] });
        return id;
      },

      updateInquiry: (id, patch) => {
        set({
          inquiries: get().inquiries.map((i) =>
            i.id === id ? { ...i, ...patch, updatedAt: new Date().toISOString() } : i,
          ),
        });
      },

      setInquiryStage: (id, stage) => {
        set({
          inquiries: get().inquiries.map((i) =>
            i.id === id
              ? { ...i, stage, status: nextStatus(stage), updatedAt: new Date().toISOString() }
              : i,
          ),
        });
      },

      addProposal: (inquiryId, draft) => {
        const id = uid("prop");
        const proposal: Proposal = {
          ...draft,
          id,
          inquiryId,
          createdAt: new Date().toISOString(),
        };
        set({ proposals: [proposal, ...get().proposals] });
        get().updateInquiry(inquiryId, { stage: "scoping", status: "proposed" });
        return id;
      },

      updateProposal: (id, patch) => {
        set({
          proposals: get().proposals.map((p) => (p.id === id ? { ...p, ...patch } : p)),
        });
      },

      approveProposal: (proposalId) => {
        const proposal = get().proposals.find((p) => p.id === proposalId);
        if (!proposal) return "";
        const inquiry = get().inquiries.find((i) => i.id === proposal.inquiryId);
        if (!inquiry) return "";
        get().updateProposal(proposalId, { status: "approved" });
        const now = new Date().toISOString();
        const projectId = uid("prj");
        const specialist = inquiry.routing?.specialists[0] ?? "Administrative Coordinator";
        const project: Project = {
          id: projectId,
          inquiryId: inquiry.id,
          proposalId,
          createdAt: now,
          updatedAt: now,
          name: proposal.title,
          clientName: inquiry.intake.name || "Client",
          status: "setup",
          stage: "project",
          specialist,
          folders: ["01 Brief", "02 Working files", "03 Client assets", "04 Delivery"],
          tasks: proposal.deliverables.map((title) => ({
            id: uid("task"),
            title,
            done: false,
            owner: specialist,
          })),
          quality: QUALITY_CHECKS.map((c) => ({ ...c, done: false })),
          handoff: "",
          followUp: "",
        };
        set({ projects: [project, ...get().projects] });
        get().updateInquiry(inquiry.id, { stage: "project", status: "won" });
        return projectId;
      },

      updateProject: (id, patch) => {
        set({
          projects: get().projects.map((p) =>
            p.id === id ? { ...p, ...patch, updatedAt: new Date().toISOString() } : p,
          ),
        });
      },

      toggleTask: (projectId, taskId) => {
        set({
          projects: get().projects.map((p) =>
            p.id === projectId
              ? {
                  ...p,
                  tasks: p.tasks.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t)),
                  updatedAt: new Date().toISOString(),
                }
              : p,
          ),
        });
      },

      toggleQuality: (projectId, checkId) => {
        set({
          projects: get().projects.map((p) =>
            p.id === projectId
              ? {
                  ...p,
                  quality: p.quality.map((c) => (c.id === checkId ? { ...c, done: !c.done } : c)),
                  updatedAt: new Date().toISOString(),
                }
              : p,
          ),
        });
      },

      addAssistant: (def) => {
        const id = uid("asst");
        const assistant: AssistantDef = {
          ...def,
          id,
          createdAt: new Date().toISOString(),
        };
        set({ assistants: [assistant, ...get().assistants] });
        return id;
      },

      updateAssistant: (id, patch) => {
        set({
          assistants: get().assistants.map((a) => (a.id === id ? { ...a, ...patch } : a)),
        });
      },

      removeAssistant: (id) => {
        const { [id]: _removed, ...rest } = get().threads;
        set({
          assistants: get().assistants.filter((a) => a.id !== id),
          threads: rest,
        });
      },

      appendThread: (assistantId, message) => {
        const existing = get().threads[assistantId];
        const messages = [...(existing?.messages ?? []), message];
        set({
          threads: {
            ...get().threads,
            [assistantId]: {
              assistantId,
              messages,
              updatedAt: new Date().toISOString(),
            },
          },
        });
      },

      setReception: (messages) => set({ reception: messages }),
      setReceptionIntake: (intake) => set({ receptionIntake: intake }),

      loadTemplates: () => {
        const have = new Set(get().assistants.map((a) => a.id));
        const missing = defaultAssistants().filter((a) => !have.has(a.id));
        if (missing.length) set({ assistants: [...get().assistants, ...missing] });
      },

      runDemo: () => {
        const demo = buildDemoState();
        const restInq = get().inquiries.filter((i) => i.source !== "demo" && i.id !== DEMO_MARKER.inquiryId);
        const restProp = get().proposals.filter((p) => p.id !== DEMO_MARKER.proposalId);
        const restPrj = get().projects.filter((p) => p.id !== DEMO_MARKER.projectId);
        set({
          inquiries: [demo.inquiry, ...restInq],
          proposals: [demo.proposal, ...restProp],
          projects: [demo.project, ...restPrj],
          demoComplete: true,
        });
      },

      resetWorkspace: () => {
        set({
          inquiries: [],
          proposals: [],
          projects: [],
          assistants: defaultAssistants(),
          threads: {},
          reception: [],
          receptionIntake: emptyIntake(),
          demoComplete: false,
        });
      },
    }),
    {
      name: "virellion-agency-os",
      version: 1,
      skipHydration: true,
    },
  ),
);
