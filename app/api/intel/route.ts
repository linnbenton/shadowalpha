import { NextResponse } from "next/server";

export async function GET() {
  try {
    // FEAR & GREED
    const fearGreedRes = await fetch(
      "https://api.alternative.me/fng/?limit=1",
      {
        cache: "no-store",
      },
    );

    const fearGreedData = await fearGreedRes.json();

    // BINANCE FUNDING
    const fundingRes = await fetch(
      "https://fapi.binance.com/fapi/v1/premiumIndex?symbol=SOLUSDT",
      {
        cache: "no-store",
      },
    );

    const fundingData = await fundingRes.json();

    // BINANCE VOLUME
    const tickerRes = await fetch(
      "https://api.binance.com/api/v3/ticker/24hr?symbol=SOLUSDT",
      {
        cache: "no-store",
      },
    );

    const tickerData = await tickerRes.json();

    const sentiment = Number(fearGreedData?.data?.[0]?.value || 50);

    const funding = Number(fundingData?.lastFundingRate || 0);

    const volume = Number(tickerData?.quoteVolume || 0);

    const volumeSpike = volume > 100000000;

    // AI SUMMARY ENGINE
    let summary = "";
    let narrative = "";

    if (sentiment > 70 && funding > 0) {
      summary =
        "Bullish momentum detected across derivatives and market sentiment.";

      narrative =
        "AI agents detected strong continuation probability supported by positive funding and aggressive participation.";
    } else if (sentiment < 40) {
      summary =
        "Risk-off environment detected with weakening trader confidence.";

      narrative =
        "Defensive positioning activated due to deteriorating market structure.";
    } else {
      summary = "Neutral market conditions with mixed directional signals.";

      narrative =
        "Execution engine waiting for stronger confirmation before routing.";
    }

    return NextResponse.json({
      sentiment,
      funding,
      volumeSpike,
      summary,
      narrative,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json({
      sentiment: 50,
      funding: 0,
      volumeSpike: false,
      summary: "Intelligence engine temporarily unavailable.",
      narrative: "Fallback protection layer activated.",
    });
  }
}
