import { consensusEngine } from "./voting/consensusEngine";
import { trendAnalyst } from "./members/trendAnalyst";
import { macroAnalyst } from "./members/macroAnalyst";
import { liquidityAnalyst } from "./members/liquidityAnalyst";
import { riskOfficer } from "./members/riskOfficer";
import { CommitteeDecision } from "./types";

export function runCommittee(market: any): CommitteeDecision {
  const opinions = [
    trendAnalyst(market.price),
    macroAnalyst(market.sentiment),
    liquidityAnalyst(market.volumeSpike),
    riskOfficer(market.volatility),
  ];

  const consensus = consensusEngine(opinions);

  const avgConfidence =
    opinions.reduce((a, b) => a + b.confidence, 0) / opinions.length;

  return {
    finalSignal: consensus.finalSignal,
    confidence: avgConfidence,
    consensusScore: consensus.consensusScore,
    riskApproved: consensus.finalSignal !== "SHORT",
    breakdown: opinions,
  };
}
