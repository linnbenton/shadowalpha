export async function POST(req: Request) {
  const body = await req.json();

  const { side, symbol, signal, risk, market } = body;

  // 🔥 VALIDATION LAYER (SoSoValue-style logic gate)
  const confidence = signal?.confidence ?? 0;
  const riskScore = risk?.score ?? 100;

  if (signal?.signal === "NEUTRAL") {
    return Response.json({ success: false, reason: "NO_SIGNAL" });
  }

  if (confidence < 70) {
    return Response.json({ success: false, reason: "LOW_CONFIDENCE" });
  }

  if (riskScore > 70) {
    return Response.json({ success: false, reason: "HIGH_RISK" });
  }

  // 🔥 SIMULATED EXECUTION RESULT
  return Response.json({
    success: true,
    side,
    symbol,
    executedPrice: market?.find((c: any) => c.symbol === "sol")?.current_price,
    timestamp: Date.now(),
    status: "EXECUTED",
  });
}
