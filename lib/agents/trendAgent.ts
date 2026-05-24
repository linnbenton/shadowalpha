import { AgentContext, AgentResult } from "@/lib/types";

export async function trendAgent(ctx: AgentContext): Promise<AgentResult> {
  const price = ctx.market.price ?? 0;

  const momentum = price % 100; // simplified signal logic

  const signal = momentum > 60 ? "LONG" : momentum < 30 ? "SHORT" : "NEUTRAL";

  const confidence = signal === "NEUTRAL" ? 50 : Math.min(95, momentum);

  return {
    signal,
    confidence,
    score: confidence,
    metadata: {
      agent: "trendAgent",
      reasoning: "Momentum-based price structure analysis",
    },
  };
}
