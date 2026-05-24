import { AgentContext, AgentResult } from "@/lib/types";

export async function macroAgent(ctx: AgentContext): Promise<AgentResult> {
  const sentiment = ctx.market.sentiment ?? 50;

  return {
    signal: sentiment > 70 ? "LONG" : sentiment < 40 ? "SHORT" : "NEUTRAL",

    confidence: sentiment,
    score: sentiment,
    metadata: {
      agent: "macroAgent",
    },
  };
}
