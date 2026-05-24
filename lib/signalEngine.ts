export function getRandomSignal() {
  const signals = [
    {
      direction: "LONG",
      confidence: 91,
      status: "AGGRESSIVE",
      narrative: "Bullish continuation detected.",
    },

    {
      direction: "SHORT",
      confidence: 74,
      status: "DEFENSIVE",
      narrative: "Risk-off environment detected.",
    },

    {
      direction: "NEUTRAL",
      confidence: 52,
      status: "MONITORING",
      narrative: "Waiting for confirmation.",
    },
  ];

  return signals[Math.floor(Math.random() * signals.length)];
}
