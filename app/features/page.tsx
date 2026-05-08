import Navbar from "@/components/Navbar";

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-24">
        <h1 className="text-5xl font-bold">Features</h1>

        <div className="grid md:grid-cols-2 gap-10 mt-16">
          {[
            "AI Copilot",
            "Smart Money Tracking",
            "Autonomous Execution",
            "Onchain Intelligence",
          ].map((item) => (
            <div key={item} className="border border-zinc-800 rounded-3xl p-8">
              <div className="text-2xl font-semibold">{item}</div>

              <p className="text-zinc-500 mt-4">
                Advanced infrastructure for AI-native trading workflows.
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
