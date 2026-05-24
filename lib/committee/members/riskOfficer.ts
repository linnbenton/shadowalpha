import { CommitteeOpinion } from "../types";

export function riskOfficer(volatility: number): CommitteeOpinion {
  const safe = volatility < 60;

  return {
    member: "riskOfficer",
    signal: safe ? "LONG" : "SHORT", // risk-off override
    confidence: safe ? 90 : 95,
    conviction: 100,
    reasoning: safe
      ? "risk within tolerance"
      : "high volatility detected, defensive mode",
  };
}
