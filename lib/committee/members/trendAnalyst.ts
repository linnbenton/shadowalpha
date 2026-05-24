import { CommitteeOpinion } from "../types";

export function trendAnalyst(price: number): CommitteeOpinion {
  const signal = price > 0 ? "LONG" : "NEUTRAL";

  return {
    member: "trendAnalyst",
    signal,
    confidence: 75,
    conviction: 80,
    reasoning: "market momentum detected",
  };
}
