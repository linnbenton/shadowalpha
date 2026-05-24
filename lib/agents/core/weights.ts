export const AGENT_WEIGHTS = {
  macro: 0.25,
  trend: 0.3,
  risk: 0.25,
  liquidity: 0.2,
} as const;

export type AgentKey = keyof typeof AGENT_WEIGHTS;
