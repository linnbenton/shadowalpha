export function calculateWinRate(trades: number, wins: number) {
  if (trades === 0) return 0;
  return (wins / trades) * 100;
}

export function calculatePnL(trades: any[]) {
  return trades.reduce((acc, t) => {
    return acc + (t.profit || 0);
  }, 0);
}
