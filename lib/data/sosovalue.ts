export interface SoSoValueData {
  sentiment?: number;
  narrativeStrength?: number;
  liquidityFlow?: number;
  marketRegime?: "risk-on" | "risk-off" | "neutral";
}

// MOCK FIRST (karena API real SoSoValue biasanya private / evolving)
export async function fetchSoSoValue(): Promise<SoSoValueData> {
  try {
    // nanti bisa diganti real API endpoint
    const res = await fetch("https://api.alternative.me/fng/", {
      cache: "no-store",
    });

    const data = await res.json();
    const fear = Number(data?.data?.[0]?.value || 50);

    return {
      sentiment: fear,
      narrativeStrength: fear > 70 ? 80 : fear < 40 ? 30 : 55,
      liquidityFlow: Math.random() * 100,
      marketRegime: fear > 70 ? "risk-on" : fear < 40 ? "risk-off" : "neutral",
    };
  } catch (err) {
    return {
      sentiment: 50,
      narrativeStrength: 50,
      liquidityFlow: 50,
      marketRegime: "neutral",
    };
  }
}
