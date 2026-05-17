export type MarketFlow = {
  momentum: number;
  direction: "BULLISH" | "BEARISH" | "NEUTRAL";
  volatility: number;
};

export function buildMarketFlow(data: any[]): MarketFlow {
  if (!data?.length) {
    return {
      momentum: 0,
      direction: "NEUTRAL",
      volatility: 0,
    };
  }

  const btc = data.find((c) => c.symbol === "btc");

  const change = btc?.price_change_percentage_24h ?? 0;
  const vol = btc?.total_volume ?? 0;

  const momentum = change * 10;

  let direction: MarketFlow["direction"] = "NEUTRAL";
  if (change > 1) direction = "BULLISH";
  if (change < -1) direction = "BEARISH";

  const volatility = Math.min(100, vol / 1e8);

  return {
    momentum,
    direction,
    volatility,
  };
}
