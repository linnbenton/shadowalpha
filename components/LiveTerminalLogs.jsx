import { useEffect, useState } from "react";

const logs = [
  "[CONNECTED] SoSoValue API online",
  "Pulling live market narratives...",
  "Analyzing ETF momentum...",
  "Detecting smart money movement...",
  "Generating AI confidence score...",
  "Running execution simulation...",
];

export default function LiveTerminalLogs() {
  const [visibleLogs, setVisibleLogs] = useState([]);

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setVisibleLogs((prev) => [...prev, logs[index]]);

      index++;

      if (index >= logs.length) {
        clearInterval(interval);
      }
    }, 700);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-2xl border border-cyan-500/20 bg-black/40 p-4">
      <div className="text-cyan-400 font-bold mb-4">AI TERMINAL</div>

      <div className="space-y-2 text-sm font-mono">
        {visibleLogs.map((log, i) => (
          <div key={i} className="text-green-400 animate-pulse">
            {">"} {log}
          </div>
        ))}
      </div>
    </div>
  );
}
