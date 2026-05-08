import Link from "next/link";

export default function TerminalPage() {
  return (
    <main className="min-h-screen text-white font-mono relative overflow-hidden bg-black">
      {/* PREMIUM GRADIENT LAYERS */}

      {/* ORANGE CORE GLOW */}
      <div className="absolute w-[900px] h-[900px] bg-orange-500 blur-[160px] opacity-20 rounded-full top-[-200px] left-1/2 -translate-x-1/2 pointer-events-none" />

      {/* WHITE DEPTH FOG */}
      <div className="absolute w-[800px] h-[800px] bg-white blur-[200px] opacity-[0.04] rounded-full bottom-[-300px] right-[-200px] pointer-events-none" />

      {/* SECOND ORANGE ACCENT */}
      <div className="absolute w-[600px] h-[600px] bg-orange-400 blur-[180px] opacity-10 rounded-full bottom-20 left-[-200px] pointer-events-none" />
      {/* TOP BAR */}
      <div className="border-b border-[#1A1A1A] px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-xs text-[#7A7A7A] hover:text-white transition"
        >
          ← BACK
        </Link>

        <div className="text-sm text-[#FFA500]">
          SHADOWALPHA / QUANT OPS TERMINAL
        </div>

        <div className="text-xs text-green-400 animate-pulse">
          ● LIVE SYSTEM ACTIVE
        </div>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-12 gap-4 p-6">
        {/* MARKET CORE */}
        <div className="md:col-span-8 border border-[#1A1A1A] rounded-2xl bg-[#0D0D0D] p-5">
          <div className="text-xs text-[#7A7A7A] mb-4">MARKET STRUCTURE</div>

          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="p-4 border border-[#1A1A1A] rounded-xl">
              BTC
              <div className="text-green-400 mt-2">+2.4%</div>
            </div>

            <div className="p-4 border border-[#1A1A1A] rounded-xl">
              ETH
              <div className="text-red-400 mt-2">-0.8%</div>
            </div>

            <div className="p-4 border border-[#1A1A1A] rounded-xl">
              SOL
              <div className="text-green-400 mt-2">+5.1%</div>
            </div>
          </div>

          <div className="mt-5 h-64 border border-[#1A1A1A] rounded-xl flex items-center justify-center text-[#333] text-xs">
            LIVE INSTITUTIONAL PRICE ENGINE
          </div>
        </div>

        {/* AI ENGINE */}
        <div className="md:col-span-4 border border-[#1A1A1A] rounded-2xl bg-[#0D0D0D] p-5">
          <div className="text-xs text-[#7A7A7A] mb-4">AI STRATEGY CORE</div>

          <div className="space-y-3 text-xs">
            <div className="border border-cyan-500/20 p-4 rounded-xl">
              MODEL: MULTI-AGENT
            </div>

            <div className="border border-green-500/20 p-4 rounded-xl">
              SIGNAL: LONG SOL
            </div>

            <div className="border border-yellow-500/20 p-4 rounded-xl">
              RISK: CONTROLLED
            </div>

            <div className="border border-[#1A1A1A] p-4 rounded-xl">
              MODE: AUTONOMOUS
            </div>
          </div>
        </div>

        {/* BOTTOM PANEL */}
        <div className="md:col-span-12 grid md:grid-cols-3 gap-4">
          <div className="border border-[#1A1A1A] bg-[#0D0D0D] rounded-2xl p-4">
            <div className="text-xs text-[#7A7A7A]">PORTFOLIO</div>
            <div className="text-xl font-bold mt-2">$128,450</div>
          </div>

          <div className="border border-[#1A1A1A] bg-[#0D0D0D] rounded-2xl p-4">
            <div className="text-xs text-[#7A7A7A]">PNL</div>
            <div className="text-xl font-bold mt-2 text-green-400">+14.2%</div>
          </div>

          <div className="border border-[#1A1A1A] bg-[#0D0D0D] rounded-2xl p-4">
            <div className="text-xs text-[#7A7A7A]">STATUS</div>
            <div className="text-xl font-bold mt-2 text-green-400">LIVE</div>
          </div>
        </div>
      </div>

      {/* FOOTER STATUS */}
      <div className="border-t border-[#1A1A1A] px-6 py-4 text-xs text-[#7A7A7A]">
        QUANT OPS MODE / SIMULATION LAYER ACTIVE
      </div>
    </main>
  );
}
