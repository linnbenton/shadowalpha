"use client";

import { useEffect, useState } from "react";

export default function LiveTerminalLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/intel");

      const intel = await res.json();

      setLogs([
        `[INTEL] ${intel.summary}`,
        `[NARRATIVE] ${intel.narrative}`,
        `[MACRO SCORE] ${intel.macroScore}`,
        `[SENTIMENT] ${intel.sentiment}`,
        `[FUNDING] ${intel.funding}`,
      ]);
    };

    load();

    const interval = setInterval(load, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-2xl border border-cyan-500/20 bg-black/40 p-4">
      <div className="text-cyan-400 font-bold mb-4">AI TERMINAL</div>

      <div className="space-y-2 text-sm font-mono">
        {logs.map((log, i) => (
          <div key={i} className="text-green-400">
            {">"} {log}
          </div>
        ))}
      </div>
    </div>
  );
}
