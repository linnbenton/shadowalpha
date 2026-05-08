export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* HERO */}
        <section>
          <div className="inline-block border border-zinc-800 rounded-full px-4 py-1 text-sm text-zinc-400">
            AI-Powered Onchain Intelligence
          </div>

          <h1 className="text-7xl font-bold mt-8 leading-tight max-w-5xl">
            ShadowAlpha
          </h1>

          <p className="text-zinc-400 text-xl mt-6 max-w-2xl leading-relaxed">
            Autonomous AI trading terminal powered by narrative intelligence,
            smart money analytics, and automated execution infrastructure.
          </p>

          <div className="flex gap-4 mt-10">
            <button className="bg-white text-black px-6 py-3 rounded-2xl font-medium hover:opacity-90 transition">
              Launch Terminal
            </button>

            <button className="border border-zinc-700 px-6 py-3 rounded-2xl hover:bg-zinc-900 transition">
              GitHub
            </button>
          </div>
        </section>

        {/* GRID */}
        <section className="grid lg:grid-cols-3 gap-6 mt-24">
          {/* AI COPILOT */}
          <div className="border border-zinc-800 rounded-3xl p-6 bg-zinc-950">
            <div className="text-sm text-zinc-500 mb-4">AI Copilot</div>

            <div className="bg-black border border-zinc-800 rounded-2xl p-4 text-sm">
              <div className="text-zinc-500">
                &gt; Analyze current AI market momentum
              </div>

              <div className="mt-4 text-zinc-300 leading-relaxed">
                AI infrastructure assets are showing accelerated capital inflows
                across Solana and Base ecosystems.
              </div>
            </div>
          </div>

          {/* SMART MONEY */}
          <div className="border border-zinc-800 rounded-3xl p-6 bg-zinc-950">
            <div className="text-sm text-zinc-500 mb-4">
              Smart Money Activity
            </div>

            <div className="space-y-4 text-sm">
              <div className="border border-zinc-800 rounded-2xl p-4">
                <div className="text-white">
                  Wallet 0x8a2f accumulated AI assets
                </div>

                <div className="text-zinc-500 mt-2">3 minutes ago</div>
              </div>

              <div className="border border-zinc-800 rounded-2xl p-4">
                <div className="text-white">
                  Whale exposure to DePIN increased by 18%
                </div>

                <div className="text-zinc-500 mt-2">12 minutes ago</div>
              </div>
            </div>
          </div>

          {/* SIGNALS */}
          <div className="border border-zinc-800 rounded-3xl p-6 bg-zinc-950">
            <div className="text-sm text-zinc-500 mb-4">Opportunity Scores</div>

            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>AI Infra</span>
                  <span>92/100</span>
                </div>

                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-white w-[92%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>DePIN</span>
                  <span>88/100</span>
                </div>

                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-white w-[88%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>RWA</span>
                  <span>71/100</span>
                </div>

                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-white w-[71%]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ARCHITECTURE */}
        <section className="mt-28">
          <div className="text-4xl font-bold">Architecture</div>

          <div className="grid md:grid-cols-5 gap-4 mt-12">
            {[
              "AI Agents",
              "Market Intelligence",
              "Signal Engine",
              "SoDEX Execution",
              "Wallet Automation",
            ].map((item) => (
              <div
                key={item}
                className="border border-zinc-800 rounded-3xl p-6 text-center bg-zinc-950"
              >
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>
      {/* TERMINAL PREVIEW */}
      <section className="mt-32">
        <div className="text-4xl font-bold">Shadow Terminal</div>

        <p className="text-zinc-500 mt-4 max-w-2xl">
          AI-powered market intelligence and autonomous execution environment.
        </p>

        <div className="mt-10 border border-zinc-800 rounded-3xl overflow-hidden bg-zinc-950">
          {/* TOP BAR */}
          <div className="border-b border-zinc-800 px-6 py-4 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>

          <div className="grid lg:grid-cols-3">
            {/* LEFT PANEL */}
            <div className="border-r border-zinc-800 p-6 space-y-4">
              <div className="text-sm text-zinc-500">LIVE SIGNALS</div>

              {[
                "AI Infrastructure Momentum ↑",
                "Smart Wallet Accumulation Detected",
                "DePIN Sector Strength Increasing",
                "Whale Rotation Into Solana AI",
              ].map((signal) => (
                <div
                  key={signal}
                  className="border border-zinc-800 rounded-2xl p-4 text-sm"
                >
                  {signal}
                </div>
              ))}
            </div>

            {/* CENTER PANEL */}
            <div className="border-r border-zinc-800 p-6">
              <div className="text-sm text-zinc-500 mb-4">
                AI MARKET ANALYSIS
              </div>

              <div className="bg-black border border-zinc-800 rounded-2xl p-5 text-sm leading-relaxed text-zinc-300">
                Current onchain activity suggests continued expansion in
                AI-related ecosystems, with increasing smart capital allocation
                into infrastructure and compute networks.
                {"\n\n"}
                Narrative acceleration detected across: - AI Infrastructure -
                Autonomous Agents - DePIN Compute - Onchain Data Markets
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="p-6">
              <div className="text-sm text-zinc-500 mb-4">MARKET STATUS</div>

              <div className="space-y-5">
                {[
                  ["Market Sentiment", "Bullish"],
                  ["AI Sector Score", "92/100"],
                  ["Risk Level", "Moderate"],
                  ["Execution Status", "Active"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="border border-zinc-800 rounded-2xl p-4"
                  >
                    <div className="text-zinc-500 text-sm">{label}</div>

                    <div className="text-xl mt-2 font-semibold">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
