const steps = [
  "SoSoValue Feed",
  "Narrative Parsing",
  "AI Scoring",
  "Risk Engine",
  "Execution Simulation",
];

export default function WorkflowPipeline() {
  return (
    <div className="rounded-2xl border border-purple-500/20 bg-black/40 p-4">
      <div className="text-purple-400 font-bold mb-4">EXECUTION PIPELINE</div>

      <div className="space-y-3">
        {steps.map((step, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/10 p-3 text-white animate-pulse"
          >
            {step}
          </div>
        ))}
      </div>
    </div>
  );
}
