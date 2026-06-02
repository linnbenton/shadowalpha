import { keccak256, toUtf8Bytes } from "ethers";

export function createExecutionProof(data: unknown) {
  return keccak256(toUtf8Bytes(JSON.stringify(data)));
}
