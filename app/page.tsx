import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen text-white bg-black relative overflow-hidden">
      {/* ORANGE CORE GLOW */}
      <div className="absolute w-[900px] h-[900px] bg-orange-500 blur-[180px] opacity-15 rounded-full top-[-250px] left-1/2 -translate-x-1/2 pointer-events-none" />

      {/* WHITE INSTITUTIONAL FOG */}
      <div className="absolute w-[900px] h-[900px] bg-white blur-[220px] opacity-[0.05] rounded-full bottom-[-300px] right-[-200px] pointer-events-none" />
      <Navbar />

      {/* HERO (Product Hunt STYLE) */}
      <section className="max-w-7xl mx-auto px-6 py-28 text-center">
        <div className="inline-flex items-center rounded-full border border-[#1A1A1A] bg-[#0D0D0D] px-4 py-1.5 text-sm text-[#7A7A7A]">
          Now Live on Early Access
        </div>

        <h1 className="mt-8 text-6xl md:text-7xl font-bold leading-tight">
          Autonomous Onchain Execution Infrastructure
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-xl text-[#7A7A7A]">
          A single-operator system that unifies market intelligence, decision
          logic, and execution into one autonomous trading stack.
        </p>
      </section>

      {/* METRICS BAR (Product Hunt credibility layer) */}
      <section className="border-y border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 text-center text-sm text-[#7A7A7A]">
          <div>
            <div className="text-white font-bold">&lt;50ms</div>
            High-frequency ready
          </div>
          <div>
            <div className="text-white font-bold">AI Agents</div>
            Signal consensus engine
          </div>
          <div>
            <div className="text-white font-bold">24/7</div>
            Continuous execution layer
          </div>
          <div>
            <div className="text-white font-bold">Onchain</div>
            Fully decentralized routing
          </div>
        </div>
      </section>

      {/* PROBLEM (VC SLIDE 1) */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold">The Problem</h2>

          <p className="mt-6 text-[#7A7A7A] leading-relaxed">
            Crypto trading is fragmented across tools that don’t communicate —
            forcing operators to manually interpret signals, manage risk, and
            execute trades under high volatility pressure.
          </p>
        </div>
      </section>

      {/* SOLUTION (VC SLIDE 2) */}
      <section className="border-t border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold">The Solution</h2>

            <p className="mt-6 text-[#7A7A7A] leading-relaxed">
              ShadowAlpha converts market data into autonomous execution through
              AI agents that continuously evaluate signals, risk, and liquidity
              conditions in real time.
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCT MODULES */}
      <section className="border-t border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold">Core System Modules</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-14">
            {[
              {
                title: "Intelligence Engine",
                desc: "Continuously processes onchain flows, narratives, and market structure into machine-readable signals.",
              },
              {
                title: "Decision Layer",
                desc: "Multi-agent system that evaluates probability, risk exposure, and trade validity.",
              },
              {
                title: "Execution Engine",
                desc: "Low-latency execution system optimized for automated DeFi and CEX routing.",
              },
            ].map((m) => (
              <div
                key={m.title}
                className="border border-[#1A1A1A] bg-[#0D0D0D] rounded-3xl p-6"
              >
                <div className="text-xl font-semibold">{m.title}</div>
                <p className="text-[#7A7A7A] mt-4">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🏦 QUANT HEDGE FUND TERMINAL */}
      <section className="border-t border-[#1A1A1A] relative overflow-hidden font-mono">
        {/* DARK MARKET AMBIENCE */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#05070d] to-black opacity-80" />
        <div className="absolute w-[800px] h-[800px] bg-cyan-500 blur-3xl opacity-10 rounded-full top-24 left-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-6 py-28 relative">
          {/* HEADER (Terminal feel) */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                QUANT EXECUTION INFRASTRUCTURE
              </h2>
              <p className="text-[#7A7A7A] text-sm mt-2">
                Autonomous trading system operating in real-time market
                conditions
              </p>
            </div>

            <div className="text-xs text-green-400 animate-pulse">
              ● LIVE MARKET FEED ACTIVE
            </div>
          </div>

          {/* MAIN GRID */}
          <div className="mt-12 grid md:grid-cols-12 gap-6">
            {/* LEFT: MARKET TAPE */}
            <div className="md:col-span-7 border border-[#1A1A1A] bg-[#0D0D0D] rounded-2xl p-5">
              <div className="text-xs text-[#7A7A7A] mb-4">
                MARKET TAPE / REAL-TIME FLOW
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-green-400">
                  <span>BTC PERP LONG FLOW</span>
                  <span>+12.4M</span>
                </div>

                <div className="flex justify-between text-red-400">
                  <span>ETH LIQUIDATIONS</span>
                  <span>-8.1M</span>
                </div>

                <div className="flex justify-between text-green-400">
                  <span>SOL SMART MONEY ACCUMULATION</span>
                  <span>+5.7M</span>
                </div>

                <div className="flex justify-between text-[#7A7A7A]">
                  <span>MARKET SENTIMENT INDEX</span>
                  <span>0.73 BULLISH</span>
                </div>
              </div>

              {/* fake chart block */}
              <div className="mt-6 h-56 border border-[#1A1A1A] rounded-xl flex items-center justify-center text-[#333] text-xs">
                QUANT PRICE ACTION GRID (LIVE SIMULATION)
              </div>
            </div>

            {/* RIGHT: AI QUANT DECISION ENGINE */}
            <div className="md:col-span-5 border border-[#1A1A1A] bg-[#0D0D0D] rounded-2xl p-5">
              <div className="text-xs text-[#7A7A7A] mb-4">
                AI QUANT DECISION ENGINE
              </div>

              <div className="space-y-4 text-xs">
                <div className="border border-cyan-500/20 p-4 rounded-xl">
                  🤖 MODEL: MULTI-AGENT CONSENSUS
                  <div className="text-[#7A7A7A] mt-1">
                    signal aggregation from 12 strategies
                  </div>
                </div>

                <div className="border border-green-500/20 p-4 rounded-xl">
                  🟢 TRADE SIGNAL: LONG SOL
                  <div className="text-[#7A7A7A] mt-1">
                    edge probability: 78%
                  </div>
                </div>

                <div className="border border-yellow-500/20 p-4 rounded-xl">
                  ⚠ RISK ENGINE
                  <div className="text-[#7A7A7A] mt-1">
                    exposure within safe threshold
                  </div>
                </div>

                <div className="border border-[#1A1A1A] p-4 rounded-xl">
                  📊 PORTFOLIO ALLOCATION
                  <div className="text-[#7A7A7A] mt-1">
                    BTC 42% / ETH 28% / SOL 18% / STABLE 12%
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM: FUND METRICS */}
            <div className="md:col-span-12 grid md:grid-cols-4 gap-4 mt-4">
              <div className="border border-[#1A1A1A] bg-[#0D0D0D] rounded-2xl p-4">
                <div className="text-xs text-[#7A7A7A]">AUM</div>
                <div className="text-xl font-bold mt-2">$12.8M</div>
              </div>

              <div className="border border-[#1A1A1A] bg-[#0D0D0D] rounded-2xl p-4">
                <div className="text-xs text-[#7A7A7A]">DAILY PNL</div>
                <div className="text-xl font-bold mt-2 text-green-400">
                  +3.42%
                </div>
              </div>

              <div className="border border-[#1A1A1A] bg-[#0D0D0D] rounded-2xl p-4">
                <div className="text-xs text-[#7A7A7A]">SHARPE</div>
                <div className="text-xl font-bold mt-2">2.31</div>
              </div>

              <div className="border border-[#1A1A1A] bg-[#0D0D0D] rounded-2xl p-4">
                <div className="text-xs text-[#7A7A7A]">MAX DRAWDOWN</div>
                <div className="text-xl font-bold mt-2 text-red-400">-6.8%</div>
              </div>
            </div>
          </div>

          {/* FOOTER STATUS BAR */}
          <div className="mt-10 text-xs text-green-400 animate-pulse">
            ● QUANT SYSTEM ONLINE — AUTONOMOUS EXECUTION ENABLED
          </div>
        </div>
      </section>

      {/* 🧭 TERMINAL CTA BRIDGE */}
      <section className="border-t border-[#1A1A1A] relative">
        {/* subtle glow */}
        <div className="absolute w-[500px] h-[500px] bg-orange-500 blur-3xl opacity-10 rounded-full top-10 left-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-6 py-16 relative">
          {/* CENTERED CTA BLOCK */}
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-semibold">
              Access the Execution Layer
            </h3>

            <p className="text-[#7A7A7A] mt-3 text-sm leading-relaxed">
              Enter the institutional terminal or explore a live simulation of
              AI-driven on-chain trading operations.
            </p>

            {/* BUTTONS */}
            <div className="mt-6 flex items-center justify-center gap-4">
              <Link
                href="/terminal"
                className="
            rounded-2xl
            bg-[#FF6B00]
            px-6 py-3
            font-medium
            shadow-[0_0_30px_rgba(255,107,0,0.25)]
          "
              >
                Try Terminal
              </Link>

              <button className="rounded-2xl border border-[#1A1A1A] bg-[#0D0D0D] px-6 py-3">
                View Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 🏦 INSTITUTIONAL TRADING DASHBOARD */}
      <section className="border-t border-[#1A1A1A] relative overflow-hidden">
        {/* ambient glow */}
        <div className="absolute w-[700px] h-[700px] bg-cyan-500 blur-3xl opacity-10 rounded-full top-20 left-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-6 py-28 relative">
          {/* HEADER */}
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold">
              Institutional Trading Command Center
            </h2>

            <p className="text-[#7A7A7A] mt-4">
              A unified on-chain finance workspace for signal detection,
              portfolio management, and autonomous execution — built for
              single-operator funds.
            </p>
          </div>

          {/* DASHBOARD GRID */}
          <div className="mt-16 grid md:grid-cols-12 gap-6">
            {/* LEFT: MARKET OVERVIEW */}
            <div className="md:col-span-8 border border-[#1A1A1A] bg-[#0D0D0D] rounded-3xl p-6">
              <div className="text-sm text-[#7A7A7A]">MARKET OVERVIEW</div>

              <div className="mt-6 grid grid-cols-3 gap-4 text-xs">
                <div className="p-4 border border-[#1A1A1A] rounded-2xl">
                  BTC / USDT
                  <div className="text-green-400 mt-2">+2.41%</div>
                </div>

                <div className="p-4 border border-[#1A1A1A] rounded-2xl">
                  ETH / USDT
                  <div className="text-red-400 mt-2">-0.87%</div>
                </div>

                <div className="p-4 border border-[#1A1A1A] rounded-2xl">
                  SOL / USDT
                  <div className="text-green-400 mt-2">+5.12%</div>
                </div>
              </div>

              {/* chart placeholder */}
              <div className="mt-6 h-48 border border-[#1A1A1A] rounded-2xl flex items-center justify-center text-[#333] text-xs">
                LIVE PRICE ACTION CHART
              </div>
            </div>

            {/* RIGHT: AI SIGNAL PANEL */}
            <div className="md:col-span-4 border border-[#1A1A1A] bg-[#0D0D0D] rounded-3xl p-6">
              <div className="text-sm text-[#7A7A7A]">AI SIGNAL ENGINE</div>

              <div className="mt-6 space-y-4 text-xs">
                <div className="p-4 border border-green-500/20 rounded-2xl">
                  🟢 LONG SIGNAL DETECTED
                  <div className="text-[#7A7A7A] mt-2">
                    Smart money accumulation detected on SOL
                  </div>
                </div>

                <div className="p-4 border border-yellow-500/20 rounded-2xl">
                  🟡 RISK ADJUSTMENT
                  <div className="text-[#7A7A7A] mt-2">
                    Volatility spike in BTC dominance
                  </div>
                </div>

                <div className="p-4 border border-cyan-500/20 rounded-2xl">
                  🤖 AI CONFIDENCE: 87%
                </div>
              </div>
            </div>

            {/* BOTTOM: PORTFOLIO + EXECUTION */}
            <div className="md:col-span-12 grid md:grid-cols-3 gap-6">
              <div className="border border-[#1A1A1A] bg-[#0D0D0D] rounded-3xl p-6">
                <div className="text-sm text-[#7A7A7A]">PORTFOLIO VALUE</div>
                <div className="text-2xl font-bold mt-4">$128,450</div>
                <div className="text-green-400 text-xs mt-2">+14.2% 7D</div>
              </div>

              <div className="border border-[#1A1A1A] bg-[#0D0D0D] rounded-3xl p-6">
                <div className="text-sm text-[#7A7A7A]">ACTIVE POSITIONS</div>
                <div className="text-2xl font-bold mt-4">7</div>
                <div className="text-[#7A7A7A] text-xs mt-2">
                  3 LONG / 4 SHORT
                </div>
              </div>

              <div className="border border-[#1A1A1A] bg-[#0D0D0D] rounded-3xl p-6">
                <div className="text-sm text-[#7A7A7A]">EXECUTION STATUS</div>
                <div className="text-green-400 text-2xl font-bold mt-4">
                  LIVE
                </div>
                <div className="text-[#7A7A7A] text-xs mt-2">
                  AUTONOMOUS MODE ACTIVE
                </div>
              </div>
            </div>
          </div>

          {/* FOOT NOTE */}
          <div className="mt-12 text-xs text-[#7A7A7A]">
            Built for one-person funds operating institutional-grade on-chain
            strategies.
          </div>
        </div>
      </section>

      {/* MARKET (VC SLIDE) */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold">Target Users</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-14">
          {["Hedge Funds", "Prop Trading Teams", "Onchain Analysts"].map(
            (t) => (
              <div
                key={t}
                className="border border-[#1A1A1A] bg-[#0D0D0D] rounded-3xl p-6"
              >
                <div className="text-xl font-semibold">{t}</div>
                <p className="text-[#7A7A7A] mt-4">
                  Institutional-grade execution infrastructure for
                  high-frequency decision environments.
                </p>
              </div>
            ),
          )}
        </div>
      </section>

      {/* FINAL CTA (PRODUCT HUNT + VC CLOSE) */}
      <section className="border-t border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6 py-28 text-center">
          <h2 className="text-4xl font-bold">Request Access</h2>

          <p className="text-[#7A7A7A] mt-4 max-w-2xl mx-auto">
            Access is currently limited to selected operators and institutional
            testers validating autonomous execution systems.
          </p>

          <button className="mt-10 rounded-2xl bg-[#FF6B00] px-8 py-4 font-medium shadow-[0_0_40px_rgba(255,107,0,0.25)]">
            Request Access
          </button>
        </div>
      </section>
    </main>
  );
}
