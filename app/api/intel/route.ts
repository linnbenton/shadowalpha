import { NextResponse } from "next/server";
import { fetchSoSoValue } from "@/lib/data/sosovalue";

export async function GET() {
  try {
    const sosovalue = await fetchSoSoValue();

    const fundingRes = await fetch(
      "https://fapi.binance.com/fapi/v1/premiumIndex?symbol=SOLUSDT",
      { cache: "no-store" },
    );

    const fundingData = await fundingRes.json();

    const tickerRes = await fetch(
      "https://api.binance.com/api/v3/ticker/24hr?symbol=SOLUSDT",
      { cache: "no-store" },
    );

    const tickerData = await tickerRes.json();

    const funding = Number(fundingData?.lastFundingRate || 0);
    const volume = Number(tickerData?.quoteVolume || 0);

    const volumeSpike = volume > 100000000;

    // 🧠 COMPOSITE INTELLIGENCE SCORE (NEW CORE)
    const sentiment = sosovalue.sentiment ?? 50;

    const macroScore =
      sentiment * 0.4 +
      (sosovalue.narrativeStrength ?? 50) * 0.2 +
      (sosovalue.liquidityFlow ?? 50) * 0.2 +
      (funding > 0 ? 70 : 30) * 0.2;

    let summary = "";
    let narrative = "";

    if (macroScore > 70) {
      summary = "Risk-on macro regime detected.";
      narrative =
        "Liquidity expansion + positive sentiment alignment across macro layers.";
    } else if (macroScore < 40) {
      summary = "Risk-off macro regime detected.";
      narrative =
        "Liquidity contraction and defensive positioning environment.";
    } else {
      summary = "Neutral macro regime.";
      narrative = "Mixed signals across macro intelligence layers.";
    }

    return NextResponse.json({
      sentiment,
      funding,
      volumeSpike,

      sosovalue,
      macroScore,

      summary,
      narrative,
    });
  } catch (err) {
    return NextResponse.json({
      sentiment: 50,
      funding: 0,
      volumeSpike: false,
      macroScore: 50,
      summary: "Intel fallback mode",
      narrative: "System degraded",
    });
  }
}
