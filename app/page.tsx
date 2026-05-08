export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="inline-block px-4 py-1 rounded-full border border-zinc-700 text-sm mb-6">
          AI-Powered Onchain Intelligence
        </div>

        <h1 className="text-6xl font-bold leading-tight max-w-4xl">
          ShadowAlpha
        </h1>

        <p className="text-zinc-400 text-xl mt-6 max-w-2xl">
          Autonomous AI trading terminal powered by onchain analytics, narrative
          intelligence, and smart execution infrastructure.
        </p>

        <div className="flex gap-4 mt-10">
          <button className="bg-white text-black px-6 py-3 rounded-xl font-medium">
            Launch App
          </button>

          <button className="border border-zinc-700 px-6 py-3 rounded-xl">
            View GitHub
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-24">
          <div className="border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-xl font-semibold">AI Narrative Scanner</h3>

            <p className="text-zinc-400 mt-3">
              Detect emerging market narratives and smart money flows in
              realtime.
            </p>
          </div>

          <div className="border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-xl font-semibold">Smart Execution</h3>

            <p className="text-zinc-400 mt-3">
              Execute trades through optimized onchain routing and automation.
            </p>
          </div>

          <div className="border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-xl font-semibold">Autonomous Agents</h3>

            <p className="text-zinc-400 mt-3">
              Deploy AI agents that monitor markets and act automatically.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
