import { COMMITTEE_WEIGHTS } from "./weightMatrix";
import { CommitteeOpinion, Signal } from "../types";

export function consensusEngine(opinions: CommitteeOpinion[]) {
  let long = 0;
  let short = 0;
  let neutral = 0;
  let riskOverride = false;

  for (const op of opinions) {
    const weight =
      COMMITTEE_WEIGHTS[op.member as keyof typeof COMMITTEE_WEIGHTS] ?? 0.2;

    const score = op.confidence * op.conviction * weight;

    if (op.member === "riskOfficer" && op.signal === "SHORT") {
      riskOverride = true;
    }

    if (op.signal === "LONG") long += score;
    if (op.signal === "SHORT") short += score;
    if (op.signal === "NEUTRAL") neutral += score;
  }

  let finalSignal: Signal = "NEUTRAL";

  if (riskOverride) {
    finalSignal = "SHORT";
  } else {
    finalSignal = long > short ? "LONG" : short > long ? "SHORT" : "NEUTRAL";
  }

  const total = long + short + neutral;

  return {
    finalSignal,
    consensusScore: total,
    breakdown: { long, short, neutral },
  };
}
