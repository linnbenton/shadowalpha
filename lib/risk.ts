export function evaluateRisk(signal: any) {
  if (!signal) {
    return {
      level: "HIGH RISK",
      color: "red",
      score: 100,
    };
  }

  const score = signal.score ?? 50;

  if (score > 65) {
    return {
      level: "LOW RISK",
      color: "green",
      score: 25,
    };
  }

  if (score < 45) {
    return {
      level: "HIGH RISK",
      color: "red",
      score: 85,
    };
  }

  return {
    level: "MEDIUM RISK",
    color: "yellow",
    score: 55,
  };
}
