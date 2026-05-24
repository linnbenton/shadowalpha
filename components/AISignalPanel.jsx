export default function AISignalPanel() {
  return (
    <div className="rounded-2xl border border-emerald-500/20 bg-black/40 p-4">
      <div className="text-emerald-400 font-bold mb-4">AI SIGNAL ENGINE</div>

      <div className="text-5xl font-black text-white">BUY</div>

      <div className="text-emerald-400 text-xl mt-2">Confidence: 84%</div>

      <div className="mt-4 space-y-2 text-sm text-zinc-300">
        <div>+ ETF inflow spike</div>
        <div>+ Whale accumulation detected</div>
        <div>- Elevated short-term volatility</div>
      </div>
    </div>
  );
}
