import { CommitteeOpinion } from "../types";

export function macroAnalyst(sentiment: number): CommitteeOpinion {
  return {
    member: "macroAnalyst",
    signal: sentiment > 70 ? "LONG" : sentiment < 40 ? "SHORT" : "NEUTRAL",
    confidence: sentiment,
    conviction: 70,
    reasoning: "macro sentiment evaluation",
  };
}
