import { AgentResult } from "@/lib/agents/core/types";
import { AGENT_WEIGHTS, AgentKey } from "@/lib/agents/core/weights";

type AgentResults = Partial<Record<AgentKey, AgentResult>>;

export function decisionEngine(results: AgentResults) {
  let longScore = 0;
  let shortScore = 0;

  const apply = (agent: AgentKey) => {
    const r = results[agent];
    if (!r) return;

    const weight = AGENT_WEIGHTS[agent];

    if (r.signal === "LONG") {
      longScore += r.confidence * weight;
    }

    if (r.signal === "SHORT") {
      shortScore += r.confidence * weight;
    }
  };

  apply("trend");
  apply("risk");
  apply("liquidity");
  apply("macro");

  const finalSignal =
    longScore > shortScore
      ? "LONG"
      : shortScore > longScore
        ? "SHORT"
        : "NEUTRAL";

  const confidence = Math.max(longScore, shortScore);

  return {
    signal: finalSignal,
    confidence,
    score: confidence,
  };
}
