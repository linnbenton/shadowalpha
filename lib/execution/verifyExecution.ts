import {
  createExecutionProof,
  verifyExecutionProof,
} from "@/lib/proofs/executionProof";

/**
 * Full verification pipeline for execution integrity.
 */
export function verifyExecution(payload: any, proof: string) {
  const valid = verifyExecutionProof(payload, proof);

  return {
    valid,
    reason: valid ? "valid_proof" : "tampered_or_invalid_proof",
  };
}
