import Navbar from "@/components/Navbar";

const features = [
  {
    title: "Market Intelligence Engine",
    description:
      "Continuously aggregates market structure, volatility, liquidity conditions, and narrative signals into machine-readable intelligence.",
  },
  {
    title: "Multi-Agent Decision Layer",
    description:
      "Independent AI agents evaluate opportunities and produce consensus-driven trading signals.",
  },
  {
    title: "Explainable AI",
    description:
      "Every decision includes confidence scoring, reasoning chains, and risk-aware explanations.",
  },
  {
    title: "Risk Validation Engine",
    description:
      "Execution is blocked when confidence is insufficient or market risk exceeds predefined thresholds.",
  },
  {
    title: "Autonomous Execution",
    description:
      "Signals can be automatically converted into executable Solana transactions through a secure execution pipeline.",
  },
  {
    title: "Execution Proof System",
    description:
      "Every execution generates a cryptographic proof hash for auditability and verification.",
  },
  {
    title: "Real-Time Market Monitoring",
    description:
      "Live monitoring of BTC, ETH, SOL, volatility, trend conditions, and market sentiment.",
  },
  {
    title: "Institutional Dashboard",
    description:
      "Unified command center for intelligence, execution, portfolio monitoring, and operational oversight.",
  },
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-4xl">
          <div className="inline-flex items-center rounded-full border border-[#1A1A1A] px-4 py-2 text-xs text-[#7A7A7A]">
            PLATFORM OVERVIEW
          </div>

          <h1 className="mt-8 text-5xl md:text-6xl font-bold">
            Core Platform Capabilities
          </h1>

          <p className="mt-6 max-w-3xl text-lg text-[#7A7A7A]">
            ShadowAlpha combines market intelligence, explainable AI, autonomous
            execution, and proof generation into a unified institutional-grade
            trading infrastructure.
          </p>
        </div>

        {/* METRICS */}
        <div className="grid md:grid-cols-4 gap-6 mt-16">
          <div className="rounded-3xl border border-[#1A1A1A] bg-[#0D0D0D] p-6">
            <div className="text-3xl font-bold">24/7</div>
            <div className="mt-2 text-sm text-[#7A7A7A]">Market Monitoring</div>
          </div>

          <div className="rounded-3xl border border-[#1A1A1A] bg-[#0D0D0D] p-6">
            <div className="text-3xl font-bold">AI</div>
            <div className="mt-2 text-sm text-[#7A7A7A]">
              Multi-Agent Consensus
            </div>
          </div>

          <div className="rounded-3xl border border-[#1A1A1A] bg-[#0D0D0D] p-6">
            <div className="text-3xl font-bold">Proof</div>
            <div className="mt-2 text-sm text-[#7A7A7A]">
              Execution Verification
            </div>
          </div>

          <div className="rounded-3xl border border-[#1A1A1A] bg-[#0D0D0D] p-6">
            <div className="text-3xl font-bold">Onchain</div>
            <div className="mt-2 text-sm text-[#7A7A7A]">
              Solana Infrastructure
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="border-t border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <h2 className="text-4xl font-bold text-center">Feature Breakdown</h2>

          <p className="mt-4 text-center text-[#7A7A7A] max-w-2xl mx-auto">
            Each component is designed to transform raw market data into
            explainable, risk-aware, and auditable execution decisions.
          </p>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-cols-4 gap-6 mt-16">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="
                  rounded-3xl
                  border border-[#1A1A1A]
                  bg-[#0D0D0D]
                  p-6
                  transition-all
                  duration-300
                  hover:border-[#2A2A2A]
                  hover:translate-y-[-4px]
                "
              >
                <h3 className="text-xl font-semibold">{feature.title}</h3>

                <p className="mt-4 text-sm leading-relaxed text-[#7A7A7A]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SYSTEM FLOW */}
      <section className="border-t border-[#1A1A1A]">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <h2 className="text-4xl font-bold text-center">
            End-to-End Workflow
          </h2>

          <div className="mt-16 flex flex-col items-center gap-4">
            {[
              "Market Data",
              "Intelligence Engine",
              "Decision Layer",
              "Risk Validation",
              "Execution Engine",
              "Proof Generation",
            ].map((item, index) => (
              <div key={item} className="flex flex-col items-center">
                <div
                  className="
                    w-72
                    rounded-2xl
                    border border-[#1A1A1A]
                    bg-[#0D0D0D]
                    p-5
                    text-center
                    font-medium
                  "
                >
                  {item}
                </div>

                {index !== 5 && (
                  <div className="py-2 text-[#FF6B00] text-xl">↓</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#1A1A1A]">
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <h2 className="text-4xl font-bold">
            Built for Autonomous Trading Operations
          </h2>

          <p className="mt-4 text-[#7A7A7A]">
            ShadowAlpha provides the infrastructure required to move from
            intelligence gathering to explainable execution and verifiable proof
            generation.
          </p>

          <div className="mt-10 inline-flex rounded-2xl bg-[#FF6B00] px-8 py-4 font-medium">
            Institutional Execution Infrastructure
          </div>
        </div>
      </section>
    </main>
  );
}
