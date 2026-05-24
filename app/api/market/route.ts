import { NextResponse } from "next/server";
import { getMarketData } from "@/lib/market";
import { generateSignal } from "@/lib/signal";
import { evaluateRisk } from "@/lib/risk";

export async function GET() {
  try {
    const data = await getMarketData();

    // 🔥 NORMALIZE DATA (IMPORTANT)
    const normalized = Array.isArray(data) ? data : [];

    // 🔥 SAFE SIGNAL ENGINE
    const signal = generateSignal(normalized) ?? {
      signal: "NEUTRAL",
      confidence: 50,
      trend: "sideways market detected",
      score: 50,
    };

    // 🔥 SAFE RISK ENGINE
    const risk = evaluateRisk(signal) ?? {
      level: "MEDIUM RISK",
      color: "yellow",
      score: 50,
    };

    return NextResponse.json({
      success: true,
      data: normalized,
      signal,
      risk,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error("MARKET API ERROR:", error);

    return NextResponse.json({
      success: false,
      data: [],
      signal: {
        signal: "NEUTRAL",
        confidence: 0,
        trend: "system error fallback",
        score: 0,
      },
      risk: {
        level: "HIGH RISK",
        color: "red",
        score: 100,
      },
    });
  }
}
