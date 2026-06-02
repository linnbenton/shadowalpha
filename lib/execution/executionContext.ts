import { randomUUID } from "crypto";

/**
 * Generates a unique execution trace ID.
 * This is used for full observability and audit tracking.
 */
export function createExecutionId(): string {
  return randomUUID();
}
