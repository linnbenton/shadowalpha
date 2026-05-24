export type Signal = "LONG" | "SHORT" | "NEUTRAL";

export interface CommitteeOpinion {
  member: string;
  signal: Signal;
  confidence: number; // 0–100
  conviction: number; // extra strength score
  reasoning?: string;
}

export interface CommitteeDecision {
  finalSignal: Signal;
  confidence: number;
  consensusScore: number;
  riskApproved: boolean;
  breakdown: CommitteeOpinion[];
}
