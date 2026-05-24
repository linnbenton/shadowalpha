import { executeTrade } from "./executionEngine";

export async function decisionRouter(signal: any, macroScore: number) {
  // 🔐 EXECUTION GATE (VERY IMPORTANT)
  if (macroScore < 60) {
    return {
      executed: false,
      reason: "macro regime not safe",
    };
  }

  if (signal.signal === "LONG" && signal.confidence > 80) {
    return await executeTrade({
      side: "BUY",
      amount: 0.01,
      symbol: "SOL",
    });
  }

  if (signal.signal === "SHORT" && signal.confidence > 80) {
    return await executeTrade({
      side: "SELL",
      amount: 0.01,
      symbol: "SOL",
    });
  }

  return {
    executed: false,
    reason: "no valid signal",
  };
}
