export function evaluateRisk(signal: any) {
  const absChange = Math.abs(signal.change);

  let level = "LOW RISK";
  let color = "green";
  let score = 20;

  if (absChange > 2) {
    level = "MEDIUM RISK";
    color = "yellow";
    score = 52;
  }

  if (absChange > 5) {
    level = "HIGH RISK";
    color = "red";
    score = 81;
  }

  return {
    level,
    color,
    score,
  };
}
