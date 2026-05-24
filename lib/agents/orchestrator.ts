import { AgentContext, AgentResult } from "./types";
import { riskAgent } from "./riskAgent";
import { liquidityAgent } from "./liquidityAgent";
import { macroAgent } from "./macroAgent";

export async function runAgents(ctx: AgentContext): Promise<AgentResult> {
  const [risk, liquidity, macro] = await Promise.all([
    riskAgent(ctx),
    liquidityAgent(ctx),
    macroAgent(ctx),
  ]);

  const avgConfidence =
    (risk.confidence + liquidity.confidence + macro.confidence) / 3;

  const longBias =
    (risk.signal === "LONG" ? 1 : 0) +
    (liquidity.signal === "LONG" ? 1 : 0) +
    (macro.signal === "LONG" ? 1 : 0);

  const signal = longBias >= 2 ? "LONG" : longBias === 1 ? "NEUTRAL" : "SHORT";

  return {
    signal,
    confidence: avgConfidence,
    score: avgConfidence,
    metadata: {
      agent: "orchestrator",
      reasoning: "Consensus voting across risk/liquidity/macro agents",
    },
  };
}
