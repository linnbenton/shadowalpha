import { NextResponse } from "next/server";
import { getMarketData } from "@/lib/market";
import { generateSignal } from "@/lib/signal";
import { evaluateRisk } from "@/lib/risk";

export async function GET() {
  try {
    const data = await getMarketData();

    const signal = generateSignal(data);
    const risk = evaluateRisk(signal);

    return NextResponse.json({
      success: true,
      data,
      signal,
      risk,
    });
  } catch (error) {
    console.error("MARKET API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch market data",
      },
      {
        status: 500,
      },
    );
  }
}
