type Coin = {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
};

export function generateSignal(coins: Coin[]) {
  if (!coins.length) {
    return {
      signal: "NO SIGNAL",
      confidence: 0,
      trend: "neutral",
    };
  }

  // cari coin performa terbaik
  const strongest = [...coins].sort(
    (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h,
  )[0];

  const change = strongest.price_change_percentage_24h;

  let trend = "neutral";
  let signal = "HOLD";
  let confidence = 50;

  if (change > 4) {
    trend = "bullish momentum";
    signal = `LONG ${strongest.symbol.toUpperCase()}`;
    confidence = 78;
  } else if (change > 1) {
    trend = "bullish";
    signal = `WATCH ${strongest.symbol.toUpperCase()}`;
    confidence = 64;
  } else if (change < -4) {
    trend = "bearish momentum";
    signal = `AVOID ${strongest.symbol.toUpperCase()}`;
    confidence = 74;
  }

  return {
    signal,
    confidence,
    trend,
    asset: strongest.name,
    change,
  };
}
