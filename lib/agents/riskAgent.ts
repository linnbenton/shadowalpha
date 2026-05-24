import { AgentContext, AgentResult } from "@/lib/types";

export async function riskAgent(ctx: AgentContext): Promise<AgentResult> {
  const volatility = ctx.market.volatility ?? 50;

  const riskScore = 100 - volatility;

  return {
    signal: riskScore > 60 ? "LONG" : "SHORT",
    confidence: riskScore,
    score: riskScore,
    metadata: {
      agent: "riskAgent",
      reasoning: "Inverse volatility risk model",
    },
  };
}
