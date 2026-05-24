export default function ExecutionSimulation() {
  return (
    <div className="rounded-2xl border border-orange-500/20 bg-black/40 p-4">
      <div className="text-orange-400 font-bold mb-4">EXECUTION SIMULATION</div>

      <div className="space-y-2 text-zinc-300">
        <div>Asset: ETH</div>
        <div>Action: LONG</div>
        <div>Expected Return: +11%</div>
        <div>Max Drawdown: -4.1%</div>
        <div>Status: SIMULATED</div>
      </div>
    </div>
  );
}
