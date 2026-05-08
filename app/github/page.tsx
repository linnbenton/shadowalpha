import Navbar from "@/components/Navbar";

export default function GithubPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="max-w-4xl mx-auto px-6 py-24">
        <h1 className="text-5xl font-bold">GitHub</h1>

        <p className="text-zinc-500 mt-8 text-lg">
          Open-source infrastructure powering ShadowAlpha.
        </p>

        <a
          href="https://github.com/linnbenton/shadowalpha"
          target="_blank"
          className="inline-block mt-10 border border-zinc-800 rounded-2xl px-6 py-3"
        >
          Open Repository
        </a>
      </section>
    </main>
  );
}
