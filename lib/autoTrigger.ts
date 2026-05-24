import { Connection, PublicKey } from "@solana/web3.js";

type Signal = {
  signal: "LONG" | "SHORT" | "NEUTRAL";
  confidence: number;
  trend: string;
};

let lastTradeTime = 0;

export async function shouldAutoExecute(signal: Signal) {
  const now = Date.now();

  // cooldown 30 detik
  const COOLDOWN = 30 * 1000;

  if (now - lastTradeTime < COOLDOWN) {
    return false;
  }

  // RULE 1: confidence threshold
  if (signal.confidence < 80) {
    return false;
  }

  // RULE 2: ignore neutral market
  if (signal.signal === "NEUTRAL") {
    return false;
  }

  // RULE 3: only strong trend
  if (!signal.trend.includes("strong")) {
    return false;
  }

  return true;
}

export function markTradeExecuted() {
  lastTradeTime = Date.now();
}
