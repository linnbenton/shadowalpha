import Navbar from "@/components/Navbar";

export default function ArchitecturePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-24">
        <h1 className="text-5xl font-bold">Architecture</h1>

        <div className="grid md:grid-cols-5 gap-6 mt-16">
          {[
            "AI Agents",
            "Market Intelligence",
            "Signal Engine",
            "SoDEX Routing",
            "Wallet Execution",
          ].map((item) => (
            <div
              key={item}
              className="border border-zinc-800 rounded-3xl p-8 text-center"
            >
              {item}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
