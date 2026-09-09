import type { IntakeRecord } from "./types";

const KEY = "virellion-intake-draft";

export function saveIntakeDraft(intake: IntakeRecord) {
  sessionStorage.setItem(KEY, JSON.stringify(intake));
}

export function readIntakeDraft(): IntakeRecord | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as IntakeRecord;
  } catch {
    return null;
  }
}

export function clearIntakeDraft() {
  sessionStorage.removeItem(KEY);
}
