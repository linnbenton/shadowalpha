"use client";

import Link from "next/link";
import Image from "next/image";

import { createChart, ColorType } from "lightweight-charts";

import { useEffect, useRef, useState } from "react";

import { runAgents } from "@/lib/agents/orchestrator";
import { connectBinanceWS } from "@/lib/binance";
import { getRandomSignal } from "@/lib/signalEngine";

import AISignalPanel from "@/components/AISignalPanel";
import WorkflowPipeline from "@/components/WorkflowPipeline";
import ExecutionSimulation from "@/components/ExecutionSimulation";
import LiveTerminalLogs from "@/components/LiveTerminalLogs";
import ExecutionLifecycle from "@/components/ExecutionLifecycle";

export default function TerminalPage() {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const [marketPrice, setMarketPrice] = useState(182.42);

  const [intel, setIntel] = useState({
    sentiment: 72,
    funding: 0.012,
    volumeSpike: false,
    narrative: "Waiting for market intelligence...",
    summary: "AI monitoring market structure...",
  });

  const [signal, setSignal] = useState<{
    direction: string;
    confidence: number;
    status: string;
  }>({
    direction: "LONG",
    confidence: 87,
    status: "BULLISH",
  });

  const [reasoning, setReasoning] = useState(
    "Monitoring volatility structure...",
  );

  const [logs, setLogs] = useState<string[]>([]);

  const handleTrade = (action: "BUY" | "SELL") => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [
      `[${timestamp}] Manual Execution Triggered: ${action}`,
      ...prev.slice(0, 9),
    ]);
  };

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: {
          type: ColorType.Solid,
          color: "#0A0A0A",
        },
        textColor: "#666",
      },
      grid: {
        vertLines: { color: "rgba(255,255,255,0.05)" },
        horzLines: { color: "rgba(255,255,255,0.05)" },
      },
      rightPriceScale: { borderColor: "rgba(255,255,255,0.08)" },
      timeScale: {
        borderColor: "rgba(255,255,255,0.08)",
        timeVisible: true,
      },
      crosshair: { mode: 0 },
      handleScroll: true,
      handleScale: true,
      width: chartContainerRef.current.clientWidth,
      height: 420,
    });

    const series = chart.addCandlestickSeries({
      upColor: "#22c55e",
      downColor: "#ef4444",
      borderVisible: false,
      wickUpColor: "#22c55e",
      wickDownColor: "#ef4444",
    });

    const loadHistory = async () => {
      try {
        const res = await fetch(
          "https://api.binance.com/api/v3/klines?symbol=SOLUSDT&interval=1m&limit=80",
        );
        const data = await res.json();
        const candles = data.map((item: any) => ({
          time: item[0] / 1000,
          open: parseFloat(item[1]),
          high: parseFloat(item[2]),
          low: parseFloat(item[3]),
          close: parseFloat(item[4]),
        }));
        series.setData(candles);
        chart.timeScale().fitContent();
      } catch (err) {
        console.error("failed history load");
      }
    };

    loadHistory();

    const ws = connectBinanceWS((candle) => {
      series.update(candle);
      const close = candle.close;
      setMarketPrice(close);

      const action =
        intel.sentiment > 70
          ? "AGGRESSIVE LONG ROUTING"
          : intel.sentiment < 40
            ? "DEFENSIVE HEDGE ACTIVATED"
            : "NEUTRAL MARKET MONITORING";

      if (intel.sentiment > 70 && intel.funding > 0 && intel.volumeSpike) {
        setSignal({
          direction: "LONG",
          confidence: 91,
          status: "AGGRESSIVE",
        });
        setReasoning(
          "AI detected bullish continuation supported by positive funding, strong sentiment, and rising market participation.",
        );
        setLogs((prev) => [
          `[${new Date().toLocaleTimeString()}] ${action}`,
          ...prev.slice(0, 7),
        ]);
      } else if (intel.sentiment < 40) {
        setSignal({
          direction: "SHORT",
          confidence: 74,
          status: "DEFENSIVE",
        });
        setReasoning(
          "Defensive positioning activated due to deteriorating market structure.",
        );
        setLogs((prev) => [
          `[${new Date().toLocaleTimeString()}] ${action}`,
          ...prev.slice(0, 7),
        ]);
      } else {
        setSignal({
          direction: "NEUTRAL",
          confidence: 52,
          status: "MONITORING",
        });
        setReasoning(
          "Execution engine waiting for stronger confirmation before routing.",
        );
        setLogs((prev) => [
          `[${new Date().toLocaleTimeString()}] ${action}`,
          ...prev.slice(0, 7),
        ]);
      }
    });

    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current?.clientWidth,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ws.close();
      chart.remove();
    };
  }, [intel]);

  useEffect(() => {
    const interval = setInterval(() => {
      const next = getRandomSignal();

      setSignal({
        direction: next.direction,
        confidence: next.confidence,
        status: next.status,
      });

      setReasoning(next.narrative);

      setLogs((prev) => [
        `[${new Date().toLocaleTimeString()}] AI switched market bias to ${next.direction}`,
        ...prev.slice(0, 9),
      ]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen text-white font-mono relative overflow-hidden bg-black">
      {/* PREMIUM GRADIENT LAYERS */}
      <div className="absolute w-[900px] h-[900px] bg-orange-500 blur-[160px] opacity-20 rounded-full top-[-200px] left-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute w-[800px] h-[800px] bg-white blur-[200px] opacity-[0.04] rounded-full bottom-[-300px] right-[-200px] pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] bg-orange-400 blur-[180px] opacity-10 rounded-full bottom-20 left-[-200px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:60px_60px]" />
      {/* TOP BAR */}
      <div className="border-b border-[#1A1A1A] px-6 py-4 flex justify-between items-center relative z-10">
        <Link
          href="/"
          className="text-sm text-[#8A8A8A] hover:text-white transition"
        >
          ← BACK
        </Link>
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="ShadowAlpha"
            width={34}
            height={34}
            className="object-contain"
          />
          <div className="text-sm text-[#FFA500] tracking-[0.2em]">
            SHADOWALPHA / QUANT OPS TERMINAL
          </div>
        </div>
        <div className="text-xs text-green-400 animate-pulse">
          ● LIVE SYSTEM ACTIVE
        </div>
      </div>
      {/* MAIN SYSTEM DASHBOARD GRID */}
      <div className="grid md:grid-cols-12 gap-4 p-6 relative z-10">
        {/* MARKET CORE (COL SPAN 8) */}
        <div className="md:col-span-8 border border-[#1A1A1A] rounded-2xl bg-[#0D0D0D]/80 backdrop-blur-xl p-5 shadow-[0_0_60px_rgba(255,120,0,0.08)]">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs text-[#7A7A7A]">MARKET STRUCTURE</div>
            <div className="text-[10px] text-orange-400 tracking-widest">
              INSTITUTIONAL FLOW
            </div>
          </div>

          {/* ASSET METRICS GRID */}
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="p-4 border border-[#1A1A1A] rounded-xl bg-gradient-to-b from-[#111] to-[#0A0A0A]">
              BTC{" "}
              <div className="text-green-400 mt-2 text-sm font-bold">+2.4%</div>
            </div>
            <div className="p-4 border border-[#1A1A1A] rounded-xl bg-gradient-to-b from-[#111] to-[#0A0A0A]">
              ETH{" "}
              <div className="text-red-400 mt-2 text-sm font-bold">-0.8%</div>
            </div>
            <div className="p-4 border border-[#1A1A1A] rounded-xl bg-gradient-to-b from-[#111] to-[#0A0A0A]">
              SOL{" "}
              <div className="text-green-400 mt-2 text-sm font-bold">+5.1%</div>
            </div>
          </div>

          {/* PREMIUM CHART INTERFACE */}
          <div className="mt-5 border border-[#1A1A1A] rounded-2xl bg-gradient-to-b from-[#101010] to-black relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="absolute inset-0 bg-orange-500/5 blur-3xl pointer-events-none" />
            <div className="relative z-20 flex items-center justify-between px-5 pt-5">
              <div>
                <div className="text-[10px] tracking-[0.25em] text-[#666] uppercase">
                  Live Market Execution
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <div className="text-2xl font-bold tracking-wide">
                    SOL/USD
                  </div>
                  <div className="px-2 py-1 rounded-full border border-green-500/20 bg-green-500/10 text-[10px] text-green-400">
                    LIVE
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-400">
                  ${marketPrice.toFixed(2)}
                </div>
                <div className="text-xs text-[#666] mt-1">+5.12% TODAY</div>
              </div>
            </div>

            {/* CHART RENDER ENGINE CONTAINER */}
            <div className="relative h-[420px] mt-4">
              <div ref={chartContainerRef} className="absolute inset-0 z-10" />
              <div className="absolute bottom-0 left-0 right-0 h-10 px-3 flex items-end gap-[2px] opacity-20 pointer-events-none z-20">
                {[20, 35, 30, 55, 40, 70, 50, 90, 60, 95, 70, 100].map(
                  (v, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-orange-400 rounded-t-sm"
                      style={{ height: `${v}%` }}
                    />
                  ),
                )}
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
            </div>

            {/* CHART OVERLAY INFOMODULE */}
            <div className="relative z-20 border-t border-[#1A1A1A] px-5 py-4 flex items-center justify-between text-xs text-[#666]">
              <div className="flex items-center gap-6">
                <div>
                  VOL <span className="text-white ml-1">24.2M</span>
                </div>
                <div>
                  OI <span className="text-white ml-1">$182M</span>
                </div>
                <div>
                  FUNDING <span className="text-green-400 ml-1">0.012%</span>
                </div>
              </div>
              <div className="text-orange-400 tracking-widest">
                BINANCE WS CONNECTED
              </div>
            </div>
          </div>

          {/* EXECUTION SYSTEM ZONE */}
          <div className="border-t border-[#1A1A1A] grid md:grid-cols-2">
            {/* BUY / LONG */}
            <div className="p-5 border-r border-[#1A1A1A] bg-green-500/5">
              <div className="text-[10px] tracking-widest text-[#666]">
                AI LONG EXECUTION
              </div>
              <div className="text-3xl font-bold text-green-400 mt-3">
                BUY SOL
              </div>
              <div className="mt-2 text-xs text-[#AAA]">
                Confidence: {signal?.confidence ?? 0}%
              </div>
              <div className="mt-1 text-[10px] text-[#666]">
                {signal?.direction || "NEUTRAL"} • CONFIDENCE{" "}
                {signal?.confidence ?? 0}%
              </div>
              <button
                onClick={() =>
                  handleTrade(signal?.direction === "LONG" ? "BUY" : "SELL")
                }
                disabled={signal?.direction !== "LONG"}
                className={`
                  mt-5 w-full py-3 rounded-xl font-bold transition
                  ${
                    signal?.direction === "LONG"
                      ? "bg-green-500 text-black hover:opacity-90 animate-pulse" // Beri efek pulse jika aktif
                      : "bg-green-950/20 text-green-700/40 cursor-not-allowed border border-green-950/30"
                  }
                `}
              >
                EXECUTE LONG
              </button>
            </div>

            {/* SELL / SHORT */}
            <div className="p-5 bg-red-500/5">
              <div className="text-[10px] tracking-widest text-[#666]">
                AI SHORT EXECUTION
              </div>
              <div className="text-3xl font-bold text-red-400 mt-3">
                SELL SOL
              </div>
              <div className="mt-2 text-xs text-[#AAA]">
                Confidence: {signal?.confidence ?? 0}%
              </div>
              <div className="mt-1 text-[10px] text-[#666]">
                {signal?.direction || "NEUTRAL"} • CONFIDENCE{" "}
                {signal?.confidence ?? 0}%
              </div>
              <button
                onClick={() =>
                  handleTrade(signal?.direction === "SHORT" ? "SELL" : "BUY")
                }
                disabled={signal?.direction !== "SHORT"}
                className={`
                  mt-5 w-full py-3 rounded-xl font-bold transition
                  ${
                    signal?.direction === "SHORT"
                      ? "bg-red-500 text-black hover:opacity-90 animate-pulse"
                      : "bg-red-950/20 text-red-700/40 cursor-not-allowed border border-red-950/30"
                  }
                `}
              >
                EXECUTE SHORT
              </button>
            </div>
          </div>

          {/* ROUTING INFRASTRUCTURE */}
          <div className="p-5 bg-[#101010]">
            <div className="text-[10px] tracking-widest text-[#666]">
              EXECUTION ROUTER
            </div>
            <div className="space-y-3 mt-4 text-sm">
              <div className="flex justify-between">
                <span className="text-[#666]">Venue</span>
                <span className="text-white">SoDEX</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666]">Leverage</span>
                <span className="text-orange-400">3x</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666]">Latency</span>
                <span className="text-cyan-400">12ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#666]">Status</span>
                <span
                  className={
                    intel.sentiment > 70
                      ? "text-green-400"
                      : intel.sentiment < 40
                        ? "text-red-400"
                        : "text-yellow-400"
                  }
                >
                  {intel.sentiment > 70
                    ? "AGGRESSIVE"
                    : intel.sentiment < 40
                      ? "DEFENSIVE"
                      : "MONITORING"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* AI ENGINE STRATEGY CORE (COL SPAN 4) */}
        <div className="md:col-span-4 h-full border border-[#1A1A1A] rounded-2xl bg-[#0D0D0D]/80 backdrop-blur-xl p-5 shadow-[0_0_40px_rgba(255,120,0,0.05)] relative overflow-hidden flex flex-col justify-between">
          <div className="absolute inset-0 bg-orange-500/5 blur-3xl pointer-events-none" />
          <div className="relative z-10 flex items-center justify-between mb-5">
            <div>
              <div className="text-xs text-[#7A7A7A] tracking-[0.2em] uppercase">
                AI Strategy Core
              </div>
              <div className="text-lg font-bold mt-2">SHADOW AGENT</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <div className="text-[10px] text-green-400 tracking-widest">
                ACTIVE
              </div>
            </div>
          </div>

          {/* PRIMARY CONFIDENCE MATRIX */}
          <div className="relative z-10 border border-green-500/20 bg-green-500/5 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] text-[#666] tracking-widest">
                  PRIMARY SIGNAL
                </div>
                <div className="text-2xl font-bold text-green-400 mt-2">
                  {signal.direction} SOL
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-[#666]">CONFIDENCE</div>
                <div className="text-2xl font-bold text-white mt-2">
                  {signal.confidence}%
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full h-2 rounded-full bg-[#1A1A1A] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-300 rounded-full shadow-[0_0_20px_rgba(74,222,128,0.5)] transition-all duration-700"
                  style={{ width: `${signal.confidence}%` }}
                />
              </div>
            </div>
          </div>

          {/* CONTEXT SUMMARY ENGINE */}
          <div className="relative z-10 mt-4 border border-[#1A1A1A] rounded-2xl bg-[#101010] p-4">
            <div className="text-[10px] tracking-widest text-[#666] mb-4">
              MARKET CONTEXT ENGINE
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-[#666]">Sentiment Index</span>
                <span className="text-green-400 font-bold">
                  {intel.sentiment}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#666]">Funding Rate</span>
                <span className="text-orange-400 font-bold">
                  {intel.funding}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#666]">Volume Spike</span>
                <span className="text-cyan-400 font-bold">
                  {intel.volumeSpike ? "ACTIVE" : "NORMAL"}
                </span>
              </div>
            </div>
          </div>

          {/* AI REASONING ARTIFACTS */}
          <div className="relative z-10 mt-4 border border-[#1A1A1A] rounded-2xl bg-[#101010] p-4 h-[190px] overflow-hidden">
            <div className="text-[10px] tracking-widest text-[#666] mb-4">
              MARKET REASONING
            </div>
            <div className="space-y-3 text-sm h-full overflow-hidden">
              <div className="flex items-start gap-3 text-[#AAA]">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5" />
                <div className="line-clamp-3 leading-relaxed">{reasoning}</div>
              </div>
              <div className="flex items-start gap-3 text-[#777]">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5" />
                <div>Sentiment Index: {intel.sentiment}/100</div>
              </div>
              <div className="flex items-start gap-3 text-[#777]">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5" />
                <div>Funding Rate: {intel.funding}%</div>
              </div>
              <div className="flex items-start gap-3 text-[#777]">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-1.5" />
                <div>
                  Volume Spike: {intel.volumeSpike ? "Detected" : "Normal"}
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-4 grid grid-cols-2 gap-3">
            <div className="border border-yellow-500/10 bg-yellow-500/5 rounded-xl p-4">
              <div className="text-[10px] text-[#666] tracking-widest">
                RISK
              </div>
              <div className="text-lg font-bold text-yellow-400 mt-2">
                {signal.status}
              </div>
            </div>
            <div className="border border-cyan-500/10 bg-cyan-500/5 rounded-xl p-4">
              <div className="text-[10px] text-[#666] tracking-widest">
                LATENCY
              </div>
              <div className="text-lg font-bold text-cyan-400 mt-2">12MS</div>
            </div>
          </div>

          {/* SOSOVALUE DATA EXTENSION */}
          <div className="relative z-10 mt-4 border border-orange-500/10 bg-orange-500/5 rounded-2xl p-4 overflow-hidden">
            <div className="absolute inset-0 bg-orange-500/5 blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] tracking-[0.2em] text-orange-400 uppercase">
                    SoSoValue Intelligence
                  </div>
                  <div className="text-sm font-bold mt-2">
                    Market Insight Feed
                  </div>
                </div>
                <div className="px-2 py-1 rounded-full border border-orange-500/20 bg-orange-500/10 text-[10px] text-orange-300">
                  LIVE API
                </div>
              </div>
              <div className="mt-4 text-sm text-[#D0D0D0] leading-relaxed">
                {intel.summary}
              </div>
            </div>
          </div>

          {/* POSITIONS & ROUTER CHECKS */}
          <div className="relative z-10 mt-4 border border-[#1A1A1A] rounded-2xl bg-[#101010] p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] tracking-widest text-[#666]">
                  EXECUTION STATUS
                </div>
                <div className="text-sm text-green-400 font-bold mt-2">
                  READY FOR ROUTING
                </div>
              </div>
              <div className="px-3 py-1 rounded-full border border-orange-500/20 bg-orange-500/10 text-[10px] text-orange-400">
                SoDEX
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
              <div>
                <div className="text-[#666]">ENTRY</div>
                <div className="text-white mt-1">$182.4</div>
              </div>
              <div>
                <div className="text-[#666]">SL</div>
                <div className="text-red-400 mt-1">$178</div>
              </div>
              <div>
                <div className="text-[#666]">TP</div>
                <div className="text-green-400 mt-1">$194</div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM METADATA MODULE PANEL */}
        <div className="md:col-span-12 grid md:grid-cols-3 gap-4">
          <div className="border border-[#1A1A1A] bg-[#0D0D0D]/80 backdrop-blur-xl rounded-2xl p-4">
            <div className="text-xs text-[#7A7A7A]">PORTFOLIO</div>
            <div className="text-2xl font-bold mt-2">$128,450</div>
          </div>
          <div className="border border-[#1A1A1A] bg-[#0D0D0D]/80 backdrop-blur-xl rounded-2xl p-4">
            <div className="text-xs text-[#7A7A7A]">PNL</div>
            <div className="text-2xl font-bold mt-2 text-green-400">+14.2%</div>
          </div>
          <div className="border border-[#1A1A1A] bg-[#0D0D0D]/80 backdrop-blur-xl rounded-2xl p-4">
            <div className="text-xs text-[#7A7A7A]">STATUS</div>
            <div className="text-2xl font-bold mt-2 text-green-400">LIVE</div>
          </div>
        </div>
      </div>{" "}
      {/* This closes the outer layout grid cleanly */}
      {/* TELEMETRY AGENT INTERFACES */}
      <div className="px-6 pb-6 relative z-10">
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <AISignalPanel />
          <WorkflowPipeline />
          <ExecutionSimulation />
          <LiveTerminalLogs />
        </div>
      </div>
      {/* LIFECYCLE MONITOR SYSTEM */}
      <div className="px-6 pb-6 relative z-10">
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-[620px] border border-[#1A1A1A] rounded-2xl bg-[#0D0D0D]/80 backdrop-blur-xl overflow-hidden shadow-[0_0_40px_rgba(255,120,0,0.05)]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#1A1A1A]">
              <div>
                <div className="text-xs tracking-[0.2em] text-[#7A7A7A] uppercase">
                  Autonomous Agent Activity
                </div>
                <div className="text-lg font-bold mt-2">
                  SHADOW EXECUTION STREAM
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <div className="text-[10px] tracking-widest text-green-400">
                  LIVE FEED
                </div>
              </div>
            </div>

            <div className="h-[520px] p-5 overflow-y-auto">
              <div className="space-y-3 text-sm font-mono">
                {logs.length === 0 ? (
                  <div className="border border-[#1A1A1A] bg-[#101010] rounded-xl px-4 py-6 text-center text-[#666]">
                    Waiting for live agent activity...
                  </div>
                ) : (
                  logs.slice(0, 6).map((log, i) => (
                    <div
                      key={i}
                      className="group border border-[#1A1A1A] bg-[#101010] rounded-xl px-4 py-3 flex items-start justify-between hover:border-orange-500/20 transition-colors duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-2 h-2 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                        <div className="text-[#CCC] group-hover:text-white transition leading-relaxed">
                          {log}
                        </div>
                      </div>
                      <div className="text-[10px] text-green-400 tracking-widest shrink-0">
                        LIVE
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <ExecutionLifecycle />
        </div>
      </div>
      <div className="border-t border-[#1A1A1A] px-6 py-4 text-xs text-[#7A7A7A] relative z-10">
        QUANT OPS MODE / SIMULATION LAYER ACTIVE
      </div>
    </main>
  );
}
