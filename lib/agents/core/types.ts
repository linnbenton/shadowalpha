export type SignalType = "LONG" | "SHORT" | "NEUTRAL";

export interface MarketData {
  price?: number;
  volume?: number;
  sentiment?: number;
  funding?: number;
  volatility?: number;
}

export interface AgentResult {
  signal: SignalType;
  confidence: number; // 0–100
  score: number; // weighted score
  contribution?: number;

  metadata?: {
    agent: string;
    reasoning?: string;
  };
}

export interface AgentContext {
  market: MarketData;
  timestamp: number;
}
