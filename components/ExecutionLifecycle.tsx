"use client";

const steps = [
  "Receiving market data",
  "Scanning narrative shifts",
  "Evaluating AI consensus",
  "Running risk engine",
  "Preparing execution route",
  "Broadcasting simulation",
];

export default function ExecutionLifecycle() {
  return (
    <div className="h-[620px] border border-[#1A1A1A] rounded-2xl bg-[#0D0D0D]/80 p-5">
      <div className="text-[10px] tracking-[0.25em] text-[#666] uppercase">
        Execution Lifecycle
      </div>

      <div className="text-xl font-bold mt-2">Autonomous System Activity</div>

      <div className="mt-6 space-y-3">
        {steps.map((step, i) => (
          <div
            key={i}
            className="flex items-center justify-between border border-[#1A1A1A] bg-[#101010] rounded-xl p-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

              <div className="text-sm text-[#DDD]">{step}</div>
            </div>

            <div className="text-xs text-green-400">ACTIVE</div>
          </div>
        ))}
      </div>
    </div>
  );
}
