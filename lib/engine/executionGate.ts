export function executionGate(result: any) {
  if (!result) return false;

  if (result.signal !== "LONG" && result.signal !== "SHORT") {
    return false;
  }

  if (result.confidence < 75) return false;

  if (result.breakdown?.risk?.confidence < 40) return false;

  return true;
}
