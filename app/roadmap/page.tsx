import Navbar from "@/components/Navbar";

export default function RoadmapPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="max-w-5xl mx-auto px-6 py-24">
        <h1 className="text-5xl font-bold">Roadmap</h1>

        <div className="space-y-8 mt-16">
          {[
            "Wave 1 — AI infrastructure & landing page",
            "Wave 2 — Market intelligence engine",
            "Wave 3 — Autonomous execution system",
          ].map((item) => (
            <div key={item} className="border border-zinc-800 rounded-3xl p-8">
              {item}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
