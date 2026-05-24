import { AgentContext, AgentResult } from "@/lib/types";

export async function liquidityAgent(ctx: AgentContext): Promise<AgentResult> {
  const volume = ctx.market.volume ?? 0;

  const score = volume > 100000000 ? 85 : 45;

  return {
    signal: score > 70 ? "LONG" : "NEUTRAL",
    confidence: score,
    score,
    metadata: {
      agent: "liquidityAgent",
    },
  };
}
