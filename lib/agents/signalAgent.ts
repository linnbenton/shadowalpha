export type Signal = {
  signal: "LONG" | "SHORT" | "NEUTRAL";
  trend: string;
  confidence: number;
  score: number;
};

export function signalAgent(data: any[]): Signal {
  let score = 0;

  const btc = data.find((c) => c.symbol?.toLowerCase() === "btc");

  const change = btc?.price_change_percentage_24h ?? 0;
  const volume = btc?.total_volume ?? 0;

  if (change > 2) score += 40;
  if (change > 5) score += 25;
  if (change < -2) score -= 40;
  if (change < -5) score -= 25;

  if (volume > 50_000_000) score += 20;

  let signal: "LONG" | "SHORT" | "NEUTRAL" = "NEUTRAL";

  if (score >= 50) signal = "LONG";
  else if (score <= -50) signal = "SHORT";

  const confidence = Math.min(100, Math.abs(score));

  return {
    signal,
    trend:
      signal === "LONG"
        ? "bullish momentum"
        : signal === "SHORT"
          ? "bearish pressure"
          : "sideways",
    confidence,
    score,
  };
}
