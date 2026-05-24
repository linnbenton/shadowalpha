import { CommitteeOpinion } from "../types";

export function liquidityAnalyst(volumeSpike: boolean): CommitteeOpinion {
  return {
    member: "liquidityAnalyst",
    signal: volumeSpike ? "LONG" : "NEUTRAL",
    confidence: volumeSpike ? 80 : 50,
    conviction: 60,
    reasoning: "liquidity flow analysis",
  };
}
