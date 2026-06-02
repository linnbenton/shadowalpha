import { keccak256, toUtf8Bytes } from "ethers";

/**
 * Deep sort for deterministic serialization.
 */
function sortObject(input: any): any {
  if (Array.isArray(input)) return input.map(sortObject);

  if (input !== null && typeof input === "object") {
    return Object.keys(input)
      .sort()
      .reduce((acc: any, key) => {
        acc[key] = sortObject(input[key]);
        return acc;
      }, {});
  }

  return input;
}

/**
 * Canonical encoding for hashing.
 */
function canonicalize(data: unknown): string {
  return JSON.stringify(sortObject(data));
}

/**
 * Creates deterministic hash of execution.
 */
export function createExecutionProof(data: unknown): string {
  return keccak256(toUtf8Bytes(canonicalize(data)));
}

/**
 * Verifies execution integrity.
 */
export function verifyExecutionProof(data: unknown, proof: string): boolean {
  return createExecutionProof(data) === proof;
}

/**
 * Adds lightweight "signature layer" (production simulation).
 * In real production: replace with wallet signature / HMAC.
 */
export function signProof(proof: string, secret: string): string {
  return keccak256(toUtf8Bytes(proof + ":" + secret));
}
