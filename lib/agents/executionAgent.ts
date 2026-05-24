import { Connection, Transaction } from "@solana/web3.js";

export async function executionAgent(
  signal: any,
  sendTransaction: any,
  publicKey: any,
) {
  try {
    console.log("EXECUTION AGENT RUNNING:", signal);

    const tx = new Transaction();

    // placeholder instruction
    // nanti kamu replace real swap / trade logic

    const signature = await sendTransaction(
      tx,
      new Connection("https://api.devnet.solana.com"),
    );

    return signature;
  } catch (err) {
    console.log("execution failed", err);
    return null;
  }
}
