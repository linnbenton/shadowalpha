import { Connection, VersionedTransaction } from "@solana/web3.js";
import { createExecutionProof } from "@/lib/proofs/executionProof";

export interface ExecutionRequest {
  side: "BUY" | "SELL";
  amount: number;
  symbol: string;
}

export async function executeTrade(req: ExecutionRequest) {
  try {
    const connection = new Connection(
      "https://api.devnet.solana.com",
      "confirmed",
    );

    const dummyTx = new VersionedTransaction(new Uint8Array(0) as any);

    const signature = "SIMULATED_TX_HASH_" + Date.now();

    const proofHash = createExecutionProof({
      side: req.side,
      amount: req.amount,
      symbol: req.symbol,
      signature,
      timestamp: Date.now(),
    });

    return {
      success: true,
      signature,
      proofHash,
      side: req.side,
      symbol: req.symbol,
    };
  } catch (err) {
    console.error("Execution failed:", err);

    return {
      success: false,
      error: "execution_failed",
    };
  }
}
