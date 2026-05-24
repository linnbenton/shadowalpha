export function generateSignal(data: any[]) {
  if (!Array.isArray(data) || data.length === 0) {
    return {
      signal: "NEUTRAL",
      confidence: 40,
      trend: "no market data",
      score: 40,
    };
  }

  const btc = data.find((c) => c.symbol === "btc");
  const eth = data.find((c) => c.symbol === "eth");
  const sol = data.find((c) => c.symbol === "sol");

  if (!btc || !eth || !sol) {
    return {
      signal: "NEUTRAL",
      confidence: 45,
      trend: "incomplete market structure",
      score: 45,
    };
  }

  // 🔥 MOMENTUM CALC
  const btcMomentum = btc.price_change_percentage_24h ?? 0;
  const ethMomentum = eth.price_change_percentage_24h ?? 0;
  const solMomentum = sol.price_change_percentage_24h ?? 0;

  const avgMomentum = (btcMomentum + ethMomentum + solMomentum) / 3;

  // 🔥 DECISION ENGINE
  let signal: "LONG" | "SHORT" | "NEUTRAL" = "NEUTRAL";

  if (avgMomentum > 2) signal = "LONG";
  else if (avgMomentum < -2) signal = "SHORT";

  // 🔥 CONFIDENCE MODEL
  const volatility =
    Math.abs(btcMomentum) + Math.abs(ethMomentum) + Math.abs(solMomentum);

  const confidence = Math.min(95, Math.max(40, 50 + volatility * 3));

  return {
    signal,
    confidence: Number(confidence.toFixed(2)),
    trend:
      signal === "LONG"
        ? "bullish momentum expansion"
        : signal === "SHORT"
          ? "bearish pressure detected"
          : "sideways accumulation phase",
    score: Number((avgMomentum * 10 + 50).toFixed(2)),
  };
}
