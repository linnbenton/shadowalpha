export interface SoSoValueData {
  sentiment?: number;
  narrativeStrength?: number;
  liquidityFlow?: number;
  marketRegime?: "risk-on" | "risk-off" | "neutral";
}

// Temporary fallback implementation.
// Replace with the official SoSoValue API when production access is available.
export async function fetchSoSoValue(): Promise<SoSoValueData> {
  try {
    // Development data source used until official integration is enabled.
    const res = await fetch(process.env.SOSOVALUE_API_URL!, {
      headers: {
        Authorization: `Bearer ${process.env.SOSOVALUE_API_KEY}`,
      },
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
  } catch {
    return {
      sentiment: 50,
      narrativeStrength: 50,
      liquidityFlow: 50,
      marketRegime: "neutral",
    };
  }
}
