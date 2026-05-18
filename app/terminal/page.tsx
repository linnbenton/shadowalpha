"use client";

import Link from "next/link";

import { createChart, ColorType } from "lightweight-charts";

import { useEffect, useRef, useState } from "react";

import { connectBinanceWS } from "@/lib/binance";

export default function TerminalPage() {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const [marketPrice, setMarketPrice] = useState(182.42);
  const [intel, setIntel] = useState<any>(null);

  const [signal, setSignal] = useState({
    direction: "LONG",
    confidence: 87,
    status: "BULLISH",
  });

  const [reasoning, setReasoning] = useState(
    "Monitoring volatility structure...",
  );

  const [marketContext, setMarketContext] = useState({
    sentiment: 74,
    funding: 0.012,
    volumeSpike: true,
  });

  const [logs, setLogs] = useState<string[]>([]);

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
        vertLines: {
          color: "rgba(255,255,255,0.05)",
        },

        horzLines: {
          color: "rgba(255,255,255,0.05)",
        },
      },

      width: chartContainerRef.current.clientWidth,

      height: 320,
    });

    const series = chart.addCandlestickSeries({
      upColor: "#22c55e",
      downColor: "#ef4444",

      borderVisible: false,

      wickUpColor: "#22c55e",
      wickDownColor: "#ef4444",
    });

    const ws = connectBinanceWS((candle) => {
      series.update(candle);

      const close = candle.close;

      setMarketPrice(close);

      // SIMPLE SIGNAL ENGINE
      const bullishContext =
        marketContext.sentiment > 70 &&
        marketContext.funding > 0 &&
        marketContext.volumeSpike;

      if (close > 182 && bullishContext) {
        setSignal({
          direction: "LONG",
          confidence: 91,
          status: "BULLISH",
        });

        setReasoning(
          "AI detected bullish continuation supported by positive funding, strong sentiment, and rising market participation.",
        );

        setLogs((prev) => [
          `[${new Date().toLocaleTimeString()}] LONG signal triggered on SOL/USD`,
          ...prev.slice(0, 7),
        ]);
      } else {
        setSignal({
          direction: "SHORT",
          confidence: 68,
          status: "DEFENSIVE",
        });

        setReasoning(
          "Risk engine detected weakening momentum and unstable participation structure.",
        );

        setLogs((prev) => [
          `[${new Date().toLocaleTimeString()}] Defensive mode activated`,
          ...prev.slice(0, 7),
        ]);
      }
    });

    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current?.clientWidth,
      });
    };

    return () => {
      window.addEventListener("resize", handleResize);
      ws.close();
      chart.remove();
    };
  }, []);

  useEffect(() => {
    const fetchIntel = async () => {
      try {
        const res = await fetch("/api/intel");

        const data = await res.json();

        setIntel(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchIntel();

    const interval = setInterval(fetchIntel, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen text-white font-mono relative overflow-hidden bg-black">
      {/* PREMIUM GRADIENT LAYERS */}

      {/* ORANGE CORE GLOW */}
      <div className="absolute w-[900px] h-[900px] bg-orange-500 blur-[160px] opacity-20 rounded-full top-[-200px] left-1/2 -translate-x-1/2 pointer-events-none" />

      {/* WHITE DEPTH FOG */}
      <div className="absolute w-[800px] h-[800px] bg-white blur-[200px] opacity-[0.04] rounded-full bottom-[-300px] right-[-200px] pointer-events-none" />

      {/* SECOND ORANGE ACCENT */}
      <div className="absolute w-[600px] h-[600px] bg-orange-400 blur-[180px] opacity-10 rounded-full bottom-20 left-[-200px] pointer-events-none" />

      {/* GRID OVERLAY */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* TOP BAR */}
      <div className="border-b border-[#1A1A1A] px-6 py-4 flex justify-between items-center relative z-10">
        <Link
          href="/"
          className="text-xs text-[#7A7A7A] hover:text-white transition"
        >
          ← BACK
        </Link>

        <div className="text-sm text-[#FFA500] tracking-[0.2em]">
          SHADOWALPHA / QUANT OPS TERMINAL
        </div>

        <div className="text-xs text-green-400 animate-pulse">
          ● LIVE SYSTEM ACTIVE
        </div>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-12 gap-4 p-6 relative z-10">
        {/* MARKET CORE */}
        <div className="md:col-span-8 border border-[#1A1A1A] rounded-2xl bg-[#0D0D0D]/80 backdrop-blur-xl p-5 shadow-[0_0_60px_rgba(255,120,0,0.08)]">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs text-[#7A7A7A]">MARKET STRUCTURE</div>

            <div className="text-[10px] text-orange-400 tracking-widest">
              INSTITUTIONAL FLOW
            </div>
          </div>

          {/* COINS */}
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="p-4 border border-[#1A1A1A] rounded-xl bg-gradient-to-b from-[#111] to-[#0A0A0A]">
              BTC
              <div className="text-green-400 mt-2 text-sm font-bold">+2.4%</div>
            </div>

            <div className="p-4 border border-[#1A1A1A] rounded-xl bg-gradient-to-b from-[#111] to-[#0A0A0A]">
              ETH
              <div className="text-red-400 mt-2 text-sm font-bold">-0.8%</div>
            </div>

            <div className="p-4 border border-[#1A1A1A] rounded-xl bg-gradient-to-b from-[#111] to-[#0A0A0A]">
              SOL
              <div className="text-green-400 mt-2 text-sm font-bold">+5.1%</div>
            </div>
          </div>

          {/* PREMIUM MARKET ENGINE */}
          <div className="mt-5 border border-[#1A1A1A] rounded-2xl bg-gradient-to-b from-[#101010] to-black relative overflow-hidden">
            {/* GRID */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* ORANGE GLOW */}
            <div className="absolute inset-0 bg-orange-500/5 blur-3xl pointer-events-none" />

            {/* HEADER */}
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

                <div className="text-[11px] text-[#666] mt-1">+5.12% TODAY</div>
              </div>
            </div>

            {/* CHART WRAPPER */}
            <div className="relative h-[360px] mt-4">
              {/* CHART */}
              <div ref={chartContainerRef} className="absolute inset-0 z-10" />

              {/* VOLUME OVERLAY */}
              <div className="absolute bottom-0 left-0 right-0 h-16 px-3 flex items-end gap-[2px] opacity-20 pointer-events-none z-20">
                {[20, 35, 30, 55, 40, 70, 50, 90, 60, 95, 70, 100].map(
                  (v, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-orange-400 rounded-t-sm"
                      style={{
                        height: `${v}%`,
                      }}
                    />
                  ),
                )}
              </div>

              {/* BOTTOM FADE */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
            </div>

            {/* FOOTER STATS */}
            <div className="relative z-20 border-t border-[#1A1A1A] px-5 py-4 flex items-center justify-between text-[11px] text-[#666]">
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
        </div>

        {/* AI ENGINE */}
        <div className="md:col-span-4 border border-[#1A1A1A] rounded-2xl bg-[#0D0D0D]/80 backdrop-blur-xl p-5 shadow-[0_0_40px_rgba(255,120,0,0.05)] relative overflow-hidden">
          {/* BG GLOW */}
          <div className="absolute inset-0 bg-orange-500/5 blur-3xl pointer-events-none" />

          {/* HEADER */}
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

          {/* SIGNAL CARD */}
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

            {/* SIGNAL STRENGTH */}
            <div className="mt-4">
              <div className="w-full h-2 rounded-full bg-[#1A1A1A] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-300 rounded-full shadow-[0_0_20px_rgba(74,222,128,0.5)] transition-all duration-700"
                  style={{
                    width: `${signal.confidence}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* AI REASONING */}
          <div className="relative z-10 mt-4 border border-[#1A1A1A] rounded-2xl bg-[#101010] p-4">
            <div className="text-[10px] tracking-widest text-[#666] mb-4">
              MARKET REASONING
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3 text-[#AAA]">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5" />

                <div>{reasoning}</div>
              </div>

              <div className="flex items-start gap-3 text-[#777]">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5" />

                <div>Sentiment Index: {marketContext.sentiment}/100</div>
              </div>

              <div className="flex items-start gap-3 text-[#777]">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5" />

                <div>Funding Rate: {marketContext.funding}%</div>
              </div>

              <div className="flex items-start gap-3 text-[#777]">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-1.5" />

                <div>
                  Volume Spike:{" "}
                  {marketContext.volumeSpike ? "Detected" : "Normal"}
                </div>
              </div>
            </div>
          </div>

          {/* RISK ENGINE */}
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

          {/* MARKET INTELLIGENCE */}
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
                {intel?.summary ||
                  "Waiting for structured market intelligence feed..."}
              </div>
            </div>
          </div>

          {/* EXECUTION STATUS */}
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

            {/* POSITION DATA */}
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

        {/* BOTTOM PANEL */}
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
      </div>

      {/* LIVE AGENT FEED */}
      <div className="md:col-span-12 border border-[#1A1A1A] rounded-2xl bg-[#0D0D0D]/80 backdrop-blur-xl overflow-hidden shadow-[0_0_40px_rgba(255,120,0,0.05)]">
        {/* HEADER */}
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

        {/* LOG STREAM */}
        <div className="p-5 space-y-3 text-xs font-mono">
          {logs.length === 0 ? (
            <div className="border border-[#1A1A1A] bg-[#101010] rounded-xl px-4 py-6 text-center text-[#666]">
              Waiting for live agent activity...
            </div>
          ) : (
            logs.map((log, i) => (
              <div
                key={i}
                className="group border border-[#1A1A1A] bg-[#101010] rounded-xl px-4 py-3 flex items-start justify-between hover:border-orange-500/20 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  {/* STATUS DOT */}
                  <div className="relative mt-1">
                    <div className="w-2 h-2 rounded-full bg-orange-400" />

                    <div className="absolute inset-0 w-2 h-2 rounded-full bg-orange-400 animate-ping opacity-40" />
                  </div>

                  {/* LOG CONTENT */}
                  <div className="text-[#CCC] group-hover:text-white transition leading-relaxed">
                    {log}
                  </div>
                </div>

                {/* STATUS */}
                <div className="text-[10px] text-green-400 tracking-widest">
                  LIVE
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* FOOTER STATUS */}
      <div className="border-t border-[#1A1A1A] px-6 py-4 text-xs text-[#7A7A7A] relative z-10">
        QUANT OPS MODE / SIMULATION LAYER ACTIVE
      </div>
    </main>
  );
}
