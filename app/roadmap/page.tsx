import Navbar from "@/components/Navbar";

const roadmap = [
  {
    phase: "Wave 1",
    title: "Foundation & Platform Infrastructure",
    status: "Completed",
    items: [
      "Landing page and product positioning",
      "Institutional UI system",
      "Solana wallet integration",
      "Execution dashboard foundation",
      "Project architecture design",
    ],
  },
  {
    phase: "Wave 2",
    title: "Market Intelligence Engine",
    status: "Completed",
    items: [
      "Real-time market monitoring",
      "Signal generation engine",
      "Risk analysis framework",
      "Explainable AI layer",
      "Market intelligence scoring",
    ],
  },
  {
    phase: "Wave 3",
    title: "Autonomous Execution Layer",
    status: "In Progress",
    items: [
      "Transaction builder",
      "Execution engine",
      "Proof generation system",
      "Autonomous execution logic",
      "Execution monitoring dashboard",
    ],
  },
  {
    phase: "Wave 4",
    title: "Multi-Agent Consensus Network",
    status: "Planned",
    items: [
      "Specialized AI agents",
      "Agent voting system",
      "Consensus scoring",
      "Strategy marketplace",
      "Agent performance tracking",
    ],
  },
  {
    phase: "Wave 5",
    title: "Institutional Infrastructure",
    status: "Future",
    items: [
      "Portfolio management",
      "Vault architecture",
      "Risk controls",
      "Performance analytics",
      "Operator workflows",
    ],
  },
];

export default function RoadmapPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center rounded-full border border-[#1A1A1A] px-4 py-2 text-xs text-[#7A7A7A]">
          SHADOWALPHA ROADMAP
        </div>

        <h1 className="mt-8 text-5xl md:text-6xl font-bold">Product Roadmap</h1>

        <p className="max-w-3xl mx-auto mt-6 text-lg text-[#7A7A7A]">
          Building autonomous trading infrastructure that transforms market
          intelligence into explainable and verifiable on-chain execution.
        </p>
      </section>

      {/* Timeline */}
      <section className="border-t border-[#1A1A1A]">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <h2 className="text-4xl font-bold text-center">
            Development Timeline
          </h2>

          <div className="mt-16 space-y-8">
            {roadmap.map((wave) => (
              <div
                key={wave.phase}
                className="
                  rounded-3xl
                  border border-[#1A1A1A]
                  bg-[#0D0D0D]
                  p-8
                "
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="text-sm text-[#FF6B00]">{wave.phase}</div>

                    <h3 className="text-2xl font-semibold mt-2">
                      {wave.title}
                    </h3>
                  </div>

                  <div
                    className={`
                      rounded-full
                      px-4 py-2
                      text-sm
                      w-fit

                      ${
                        wave.status === "Completed"
                          ? "bg-green-500/10 text-green-400 border border-green-500/20"
                          : wave.status === "In Progress"
                            ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                            : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                      }
                    `}
                  >
                    {wave.status}
                  </div>
                </div>

                <div className="mt-6 grid md:grid-cols-2 gap-3">
                  {wave.items.map((item) => (
                    <div
                      key={item}
                      className="
                        rounded-xl
                        border border-[#1A1A1A]
                        bg-black/40
                        px-4 py-3
                        text-sm
                        text-[#CCCCCC]
                      "
                    >
                      • {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="border-t border-[#1A1A1A]">
        <div className="max-w-5xl mx-auto px-6 py-24 text-center">
          <h2 className="text-4xl font-bold">Long-Term Vision</h2>

          <p className="mt-6 text-[#7A7A7A] leading-relaxed">
            ShadowAlpha aims to become a complete autonomous trading
            infrastructure where intelligence generation, decision-making, risk
            validation, execution, and proof systems operate as a unified
            on-chain operating layer for independent operators and digital asset
            funds.
          </p>
        </div>
      </section>

      {/* Future Architecture Preview */}
      <section className="border-t border-[#1A1A1A]">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <h2 className="text-4xl font-bold text-center">Future Stack</h2>

          <div className="grid md:grid-cols-4 gap-6 mt-16">
            {[
              "Multi-Agent AI",
              "Execution Infrastructure",
              "Portfolio Layer",
              "Proof Network",
            ].map((item) => (
              <div
                key={item}
                className="
                  rounded-3xl
                  border border-[#1A1A1A]
                  bg-[#0D0D0D]
                  p-8
                  text-center
                "
              >
                <div className="font-semibold">{item}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
