import { AgentContext, AgentResult } from "@/lib/agents/core/types";
import { AGENT_WEIGHTS } from "@/lib/agents/core/weights";

import { trendAgent } from "../agents/trendAgent";
import { riskAgent } from "../agents/riskAgent";
import { macroAgent } from "../agents/macroAgent";
import { liquidityAgent } from "../agents/liquidityAgent";

export async function runAgents(ctx: AgentContext) {
  const results: AgentResult[] = await Promise.all([
    trendAgent(ctx),
    riskAgent(ctx),
    macroAgent(ctx),
    liquidityAgent(ctx),
  ]);

  let totalScore = 0;
  let weightedConfidence = 0;

  for (const r of results) {
    const weight =
      AGENT_WEIGHTS[
        r.metadata?.agent
          .replace("Agent", "")
          .toLowerCase() as keyof typeof AGENT_WEIGHTS
      ] ?? 0.25;

    totalScore += r.score * weight;
    weightedConfidence += r.confidence * weight;
  }

  const finalSignal =
    weightedConfidence > 70
      ? "LONG"
      : weightedConfidence < 40
        ? "SHORT"
        : "NEUTRAL";

  return {
    signal: finalSignal,
    confidence: weightedConfidence,
    score: totalScore,
    breakdown: results,
  };
}
