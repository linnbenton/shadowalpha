import Link from "next/link";
import Navbar from "@/components/Navbar";

const architectureLayers = [
  {
    title: "Market Data Layer",
    description:
      "Collects real-time prices, volatility metrics, liquidity conditions, and market activity.",
  },
  {
    title: "Intelligence Engine",
    description:
      "Transforms raw market information into machine-readable intelligence.",
  },
  {
    title: "Decision Layer",
    description:
      "Multi-agent system responsible for signal generation and consensus evaluation.",
  },
  {
    title: "Risk Engine",
    description:
      "Validates confidence levels, exposure limits, and execution eligibility.",
  },
  {
    title: "Execution Engine",
    description:
      "Builds, signs, and broadcasts transactions to the Solana network.",
  },
  {
    title: "Proof System",
    description:
      "Stores execution metadata and transaction proofs for auditability.",
  },
];

const modules = [
  {
    title: "AI Agents",
    description:
      "Specialized agents evaluate trend direction, volatility, and execution opportunities.",
  },
  {
    title: "Market Intelligence",
    description: "Aggregates market data into structured intelligence signals.",
  },
  {
    title: "Signal Engine",
    description:
      "Produces LONG, SHORT, or NEUTRAL recommendations based on agent consensus.",
  },
  {
    title: "Risk Validation",
    description:
      "Ensures every trade satisfies predefined confidence and risk requirements.",
  },
  {
    title: "Execution Layer",
    description:
      "Handles transaction construction, routing, and network confirmation.",
  },
  {
    title: "Proof System",
    description:
      "Creates a transparent and auditable record of every execution.",
  },
];

const metrics = [
  {
    title: "AI Agents",
    value: "Multi-Agent Consensus",
  },
  {
    title: "Risk Controls",
    value: "Pre-Execution Validation",
  },
  {
    title: "Blockchain",
    value: "Solana Devnet",
  },
  {
    title: "Proof Layer",
    value: "Onchain Audit Trail",
  },
];

export default function ArchitecturePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center rounded-full border border-[#1A1A1A] px-4 py-2 text-xs text-[#7A7A7A]">
          SHADOWALPHA ARCHITECTURE
        </div>

        <h1 className="mt-8 text-5xl md:text-6xl font-bold">
          System Architecture
        </h1>

        <p className="mt-6 max-w-3xl mx-auto text-[#7A7A7A] text-lg">
          ShadowAlpha is built as a modular multi-agent execution infrastructure
          that converts market intelligence into autonomous on-chain execution.
        </p>
      </section>

      {/* High-Level Architecture */}
      <section className="border-t border-[#1A1A1A]">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <h2 className="text-4xl font-bold text-center">
            High-Level Architecture
          </h2>

          <div className="mt-16 flex flex-col items-center">
            {architectureLayers.map((layer, index) => (
              <div key={layer.title} className="flex flex-col items-center">
                <div
                  className="
                    w-80
                    rounded-3xl
                    border border-[#1A1A1A]
                    bg-[#0D0D0D]
                    p-6
                    text-center
                  "
                >
                  <div className="font-semibold text-lg">{layer.title}</div>

                  <p className="mt-3 text-sm text-[#7A7A7A]">
                    {layer.description}
                  </p>
                </div>

                {index !== architectureLayers.length - 1 && (
                  <div className="py-4 text-[#FF6B00] text-2xl">↓</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Modules */}
      <section className="border-t border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <h2 className="text-4xl font-bold text-center">
            Core System Components
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {modules.map((module) => (
              <div
                key={module.title}
                className="
                  rounded-3xl
                  border border-[#1A1A1A]
                  bg-[#0D0D0D]
                  p-6
                "
              >
                <h3 className="text-xl font-semibold">{module.title}</h3>

                <p className="mt-4 text-[#7A7A7A] leading-relaxed">
                  {module.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Flow Pipeline */}
      <section className="border-t border-[#1A1A1A]">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <h2 className="text-4xl font-bold text-center">Data Flow Pipeline</h2>

          <div className="mt-16 grid md:grid-cols-6 gap-4">
            {[
              "Market Data",
              "Intelligence",
              "Decision",
              "Risk",
              "Execution",
              "Proof",
            ].map((item) => (
              <div
                key={item}
                className="
                  rounded-2xl
                  border border-[#1A1A1A]
                  bg-[#0D0D0D]
                  p-5
                  text-center
                "
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Characteristics */}
      <section className="border-t border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <h2 className="text-4xl font-bold text-center">
            Technical Characteristics
          </h2>

          <div className="grid md:grid-cols-4 gap-6 mt-16">
            {metrics.map((metric) => (
              <div
                key={metric.title}
                className="
                  rounded-3xl
                  border border-[#1A1A1A]
                  bg-[#0D0D0D]
                  p-6
                "
              >
                <div className="text-sm text-[#7A7A7A]">{metric.title}</div>

                <div className="mt-3 text-lg font-semibold">{metric.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Layer */}
      <section className="border-t border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <h2 className="text-4xl font-bold text-center">
            Security & Verification
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="rounded-3xl border border-[#1A1A1A] bg-[#0D0D0D] p-6">
              <h3 className="text-xl font-semibold">Risk Validation</h3>

              <p className="mt-4 text-[#7A7A7A]">
                Every trade must pass confidence and exposure validation before
                execution.
              </p>
            </div>

            <div className="rounded-3xl border border-[#1A1A1A] bg-[#0D0D0D] p-6">
              <h3 className="text-xl font-semibold">Wallet Authorization</h3>

              <p className="mt-4 text-[#7A7A7A]">
                Transactions require wallet approval and signature validation.
              </p>
            </div>

            <div className="rounded-3xl border border-[#1A1A1A] bg-[#0D0D0D] p-6">
              <h3 className="text-xl font-semibold">Onchain Proof</h3>

              <p className="mt-4 text-[#7A7A7A]">
                Execution metadata and transaction hashes provide a complete
                audit trail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-[#1A1A1A]">
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <h2 className="text-4xl font-bold">
            Explore the Architecture in Action
          </h2>

          <p className="mt-4 text-[#7A7A7A]">
            Open the ShadowAlpha terminal and observe how intelligence flows
            into autonomous execution.
          </p>

          <Link
            href="/terminal"
            className="
              inline-block
              mt-8
              rounded-2xl
              bg-[#FF6B00]
              px-8
              py-4
              font-medium
              transition-all
              hover:scale-105
            "
          >
            Open Terminal
          </Link>
        </div>
      </section>
    </main>
  );
}
