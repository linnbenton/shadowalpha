import { NextResponse } from "next/server";
import { createExecutionProof } from "@/lib/proofs/executionProof";

export async function POST(req: Request) {
  const body = await req.json();

  const proof = createExecutionProof(body);

  return NextResponse.json({
    proof,
    timestamp: Date.now(),
  });
}
