"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import { PhantomWalletName } from "@solana/wallet-adapter-wallets";

import { Connection, SystemProgram, Transaction } from "@solana/web3.js";

type Coin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
};

type Signal = {
  signal: "LONG" | "SHORT" | "NEUTRAL";
  trend: string;
  confidence: number;
  score: number;
};

type Risk = {
  level: string;
  color: string;
  score: number;
};

type Execution = {
  hash: string;
  asset: string;
  side: string;
  status: string;
};

export default function Home() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [ticks, setTicks] = useState<number[]>([]);
  const safeCoins = coins?.length ? coins : [];
  const [signal, setSignal] = useState<Signal | null>(null);
  const [risk, setRisk] = useState<Risk | null>(null);
  const [execution, setExecution] = useState<Execution | null>(null);
  const [executing, setExecuting] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [autoMode, setAutoMode] = useState(false);
  const [lastAutoTx, setLastAutoTx] = useState<number>(0);
  const [isLoopRunning, setIsLoopRunning] = useState(false);
  const [lastTradeTime, setLastTradeTime] = useState(0);
  const { connected, publicKey, connect, disconnect, select, sendTransaction } =
    useWallet();

  async function fetchMarket() {
    try {
      const res = await fetch("/api/market", {
        cache: "no-store",
      });

      const json = await res.json();

      console.log(json);

      if (json?.success && Array.isArray(json.data)) {
        setCoins(json.data.slice(0, 3));
        setSignal(json.signal);
        setRisk(json.risk);
      }
    } catch (err) {
      console.log("market fetch retry...");
      console.log("COINS:", coins);
      console.log("SIGNAL:", signal);
    }
  }

  const executeTrade = async () => {
    try {
      setExecuting(true);

      if (!publicKey) throw new Error("Wallet not connected");
      if (!connected || executing) return;
      if (!connected || !publicKey) return;

      const connection = new Connection(
        "https://api.devnet.solana.com",
        "confirmed",
      );

      const transaction = new Transaction();

      transaction.add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: publicKey, // simulation self-transfer
          lamports: Math.floor(0.001 * LAMPORTS_PER_SOL),
        }),
      );

      const { blockhash } = await connection.getLatestBlockhash();

      transaction.feePayer = publicKey;
      transaction.recentBlockhash = blockhash;

      const signature = await sendTransaction(transaction, connection);

      await connection.confirmTransaction(signature, "confirmed");

      setTxHash(signature);
    } catch (err) {
      console.log("TX ERROR:", err);
    } finally {
      setExecuting(false);
    }
  };

  useEffect(() => {
    fetchMarket();

    const interval = setInterval(() => {
      fetchMarket();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!coins.length) return;

      const btc = coins.find((c) => c.symbol === "btc");
      if (!btc) return;

      const price = btc.current_price;

      setTicks((prev) => {
        const updated = [...prev, price];

        // keep last 20 points
        return updated.slice(-20);
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [coins]);

  useEffect(() => {
    if (!autoMode) return;

    let interval: NodeJS.Timeout;

    const runLoop = async () => {
      const now = Date.now();

      // ⛔ cooldown 15 detik
      if (now - lastTradeTime < 15000) return;

      // ⛔ prevent double execution
      if (isLoopRunning) return;

      try {
        setIsLoopRunning(true);

        const res = await fetch("/api/market");
        const json = await res.json();

        if (!json?.signal) return;

        const confidence = json.signal.confidence;

        // 🎯 only trade when strong signal
        if (confidence > 80) {
          await executeTrade();
          setLastTradeTime(Date.now());
        }
      } catch (err) {
        console.error("AUTO LOOP ERROR:", err);
      } finally {
        setIsLoopRunning(false);
      }
    };

    interval = setInterval(runLoop, 8000); // check tiap 8 detik

    return () => clearInterval(interval);
  }, [autoMode, isLoopRunning, lastTradeTime]);

  return (
    <main className="min-h-screen text-white bg-black relative overflow-hidden">
      {/* ORANGE CORE GLOW */}
      <div className="absolute w-[900px] h-[900px] bg-orange-500 blur-[180px] opacity-15 rounded-full top-[-250px] left-1/2 -translate-x-1/2 pointer-events-none" />

      {/* WHITE INSTITUTIONAL FOG */}
      <div className="absolute w-[900px] h-[900px] bg-white blur-[220px] opacity-[0.05] rounded-full bottom-[-300px] right-[-200px] pointer-events-none" />
      <Navbar />

      {/* HERO (Product Hunt STYLE) */}
      <section className="max-w-7xl mx-auto px-6 py-28 text-center">
        <h1 className="mt-8 text-6xl md:text-7xl font-bold leading-tight">
          Autonomous Execution Infrastructure for Onchain Markets
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-xl text-[#7A7A7A]">
          AI agents that unify market intelligence, decision-making, and
          execution into a single trading system for single-operator funds.
        </p>
      </section>

      {/* METRICS BAR (Product Hunt credibility layer) */}
      <section className="border-y border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 text-center text-sm text-[#7A7A7A]">
          <div>
            <div className="text-white font-bold">&lt;50ms</div>
            Execution latency
          </div>

          <div>
            <div className="text-white font-bold">AI Agents</div>
            Multi-agent inference system
          </div>

          <div>
            <div className="text-white font-bold">24/7</div>
            Continuous market coverage
          </div>

          <div>
            <div className="text-white font-bold">Onchain</div>
            Onchain execution layer
          </div>
        </div>
      </section>

      {/* PROBLEM (VC SLIDE 1) */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold">The Problem</h2>

          <p className="mt-6 text-[#7A7A7A] leading-relaxed">
            Crypto trading is fragmented across tools that don’t communicate —
            forcing operators to manually interpret signals, manage risk, and
            execute trades under high volatility pressure.
          </p>
        </div>
      </section>

      {/* SOLUTION (VC SLIDE 2) */}
      <section className="border-t border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold">The Solution</h2>

            <p className="mt-6 text-[#7A7A7A] leading-relaxed">
              ShadowAlpha converts market data into autonomous execution through
              AI agents that continuously evaluate signals, risk, and liquidity
              conditions in real time.
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCT MODULES */}
      <section className="border-t border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold">Core System Modules</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-14">
            {[
              {
                title: "Intelligence Engine",
                desc: "Continuously processes onchain flows, narratives, and market structure into machine-readable signals.",
              },
              {
                title: "Decision Layer",
                desc: "Multi-agent system that evaluates probability, risk exposure, and trade validity.",
              },
              {
                title: "Execution Engine",
                desc: "Low-latency execution system optimized for automated DeFi and CEX routing.",
              },
            ].map((m) => (
              <div
                key={m.title}
                className="border border-[#1A1A1A] bg-[#0D0D0D] rounded-3xl p-6"
              >
                <div className="text-xl font-semibold">{m.title}</div>
                <p className="text-[#7A7A7A] mt-4">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🏦 QUANT HEDGE FUND TERMINAL */}
      <section className="border-t border-[#1A1A1A] relative overflow-hidden font-mono">
        {/* DARK MARKET AMBIENCE */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#05070d] to-black opacity-80" />
        <div className="absolute w-[800px] h-[800px] bg-cyan-500 blur-3xl opacity-10 rounded-full top-24 left-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-6 py-28 relative">
          {/* HEADER (Terminal feel) */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                EXECUTION CONTROL LAYER
              </h2>
              <p className="text-[#7A7A7A] text-sm mt-2">
                Autonomous trading system operating in real-time market
                conditions
              </p>
            </div>

            <div className="text-xs text-green-400 animate-pulse">
              ● LIVE MARKET FEED ACTIVE
            </div>
          </div>

          {/* MAIN GRID */}
          <div className="mt-12 grid md:grid-cols-12 gap-6">
            {/* LEFT: MARKET TAPE */}
            <div className="md:col-span-7 border border-[#1A1A1A] bg-[#0D0D0D] rounded-2xl p-5">
              <div className="text-xs text-[#7A7A7A] mb-4">
                MARKET TAPE / REAL-TIME FLOW
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-green-400">
                  <span>BTC PERP LONG FLOW</span>
                  <span>+12.4M</span>
                </div>

                <div className="flex justify-between text-red-400">
                  <span>ETH LIQUIDATIONS</span>
                  <span>-8.1M</span>
                </div>

                <div className="flex justify-between text-green-400">
                  <span>SOL SMART MONEY ACCUMULATION</span>
                  <span>+5.7M</span>
                </div>

                <div className="flex justify-between text-[#7A7A7A]">
                  <span>MARKET SENTIMENT INDEX</span>
                  <span>0.73 BULLISH</span>
                </div>
              </div>

              {/* LIVE QUANT PRICE GRID */}

              <div className="mt-6 border border-[#1A1A1A] rounded-xl p-4 overflow-hidden">
                {/* HEADER */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-[#555]">
                      QUANT PRICE ACTION GRID
                    </div>
                    ```
                    <div className="text-[10px] text-[#333] mt-1">
                      live simulated execution flow
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-cyan-400">
                      BTC ${safeCoins[0]?.current_price?.toLocaleString()}
                    </div>

                    <div
                      className={`text-[10px] mt-1 ${
                        (safeCoins[0]?.price_change_percentage_24h ?? 0) >= 0
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {(safeCoins[0]?.price_change_percentage_24h ?? 0).toFixed(
                        2,
                      )}
                      %
                    </div>
                  </div>
                  ```
                </div>

                {/* LIVE BARS */}
                <div className="mt-6 h-56 flex items-end gap-1">
                  {ticks.map((tick, index) => {
                    const normalizedHeight = ((tick % 5000) / 5000) * 100;

                    return (
                      <div
                        key={index}
                        className={`
          flex-1
          rounded-t-md
          transition-all
          duration-500

          ${index % 2 === 0 ? "bg-cyan-400/70" : "bg-[#FF6B00]/70"}
        `}
                        style={{
                          height: `${Math.max(normalizedHeight, 10)}%`,
                        }}
                      />
                    );
                  })}
                </div>

                {/* FOOTER */}

                <div className="mt-4 flex items-center justify-between text-[10px] text-[#444]">
                  <div>LIVE EXECUTION FLOW</div>
                  ```
                  <div>
                    {signal?.signal || "NEUTRAL"} • CONFIDENCE{" "}
                    {signal?.confidence || 0}%
                  </div>
                  ```
                </div>
              </div>
            </div>

            {/* RIGHT: AI QUANT DECISION ENGINE */}
            <div className="md:col-span-5 border border-[#1A1A1A] bg-[#0D0D0D] rounded-2xl p-5">
              <div className="text-xs text-[#7A7A7A] mb-4">
                AI QUANT DECISION ENGINE
              </div>

              <div className="space-y-4 text-xs">
                <div className="border border-cyan-500/20 p-4 rounded-xl">
                  🤖 MODEL: MULTI-AGENT CONSENSUS
                  <div className="text-[#7A7A7A] mt-1">
                    signal aggregation from 12 strategies
                  </div>
                </div>

                <div className="border border-green-500/20 p-4 rounded-xl">
                  🟢 TRADE SIGNAL: LONG SOL
                  <div className="text-[#7A7A7A] mt-1">
                    edge probability: 78%
                  </div>
                </div>

                <div className="border border-yellow-500/20 p-4 rounded-xl">
                  ⚠ RISK ENGINE
                  <div className="text-[#7A7A7A] mt-1">
                    exposure within safe threshold
                  </div>
                </div>

                <div className="border border-[#1A1A1A] p-4 rounded-xl">
                  📊 PORTFOLIO ALLOCATION
                  <div className="text-[#7A7A7A] mt-1">
                    BTC 42% / ETH 28% / SOL 18% / STABLE 12%
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM: FUND METRICS */}
            <div className="md:col-span-12 grid md:grid-cols-4 gap-4 mt-4">
              <div className="border border-[#1A1A1A] bg-[#0D0D0D] rounded-2xl p-4">
                <div className="text-xs text-[#7A7A7A]">AUM</div>
                <div className="text-xl font-bold mt-2">$12.8M</div>
              </div>

              <div className="border border-[#1A1A1A] bg-[#0D0D0D] rounded-2xl p-4">
                <div className="text-xs text-[#7A7A7A]">DAILY PNL</div>
                <div className="text-xl font-bold mt-2 text-green-400">
                  +3.42%
                </div>
              </div>

              <div className="border border-[#1A1A1A] bg-[#0D0D0D] rounded-2xl p-4">
                <div className="text-xs text-[#7A7A7A]">SHARPE</div>
                <div className="text-xl font-bold mt-2">2.31</div>
              </div>

              <div className="border border-[#1A1A1A] bg-[#0D0D0D] rounded-2xl p-4">
                <div className="text-xs text-[#7A7A7A]">MAX DRAWDOWN</div>
                <div className="text-xl font-bold mt-2 text-red-400">-6.8%</div>
              </div>
            </div>
          </div>

          {/* FOOTER STATUS BAR */}
          <div className="mt-10 text-xs text-green-400 animate-pulse">
            ● QUANT SYSTEM ONLINE — AUTONOMOUS EXECUTION ENABLED
          </div>
        </div>
      </section>

      {/* 🧭 TERMINAL CTA BRIDGE */}
      <section className="border-t border-[#1A1A1A] relative">
        {/* subtle glow */}
        <div className="absolute w-[500px] h-[500px] bg-orange-500 blur-3xl opacity-10 rounded-full top-10 left-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-6 py-16 relative">
          {/* CENTERED CTA BLOCK */}
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-semibold">
              Access the Execution Layer
            </h3>

            <p className="text-[#7A7A7A] mt-3 text-sm leading-relaxed">
              Enter the institutional terminal or explore a live simulation of
              AI-driven on-chain trading operations.
            </p>

            {/* BUTTONS */}
            <div className="mt-6 flex items-center justify-center gap-4">
              <Link
                href="/terminal"
                className="
                  rounded-2xl
                  bg-[#FF6B00]
                  px-6 py-3
                  font-medium
                  shadow-[0_0_30px_rgba(255,107,0,0.25)]
                "
              >
                Try Terminal
              </Link>

              <button className="rounded-2xl border border-[#1A1A1A] bg-[#0D0D0D] px-6 py-3">
                View Demo
              </button>

              <button
                onClick={async () => {
                  try {
                    if (connected) {
                      await disconnect();
                      return;
                    }

                    select(PhantomWalletName);

                    // TAMBAHAN PENTING
                    await connect();
                  } catch (err) {
                    console.log(err);
                  }
                }}
                className="
                  relative
                  overflow-hidden

                  rounded-2xl
                  border border-orange-400/20

                  bg-[#FF6B00]

                  px-6 py-3
                  text-sm
                  font-medium
                  text-white

                  transition-all
                  duration-300

                  hover:scale-105
                  hover:bg-[#ff7b1a]

                  shadow-[0_0_30px_rgba(255,107,0,0.35)]
                "
              >
                <span className="relative z-10">
                  {connected ? "Disconnect Wallet" : "Connect Wallet"}
                </span>

                <div
                  className="
                    absolute
                    inset-0

                    bg-gradient-to-r
                    from-transparent
                    via-white/20
                    to-transparent

                    -translate-x-full
                    animate-[shine_2.5s_linear_infinite]
                  "
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 🏦 INSTITUTIONAL TRADING DASHBOARD */}
      <section className="border-t border-[#1A1A1A] relative overflow-hidden">
        {/* ambient glow */}
        <div className="absolute w-[700px] h-[700px] bg-cyan-500 blur-3xl opacity-10 rounded-full top-20 left-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-6 py-28 relative">
          {/* HEADER */}
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold">
              Institutional Trading Command Center
            </h2>

            <p className="text-[#7A7A7A] mt-4">
              A unified on-chain finance workspace for signal detection,
              portfolio management, and autonomous execution — built for
              single-operator funds.
            </p>
          </div>

          {/* DASHBOARD GRID */}
          <div className="mt-16 grid md:grid-cols-12 gap-6">
            {/* LEFT: MARKET OVERVIEW */}
            <div className="md:col-span-8 border border-[#1A1A1A] bg-[#0D0D0D] rounded-3xl p-6">
              <div className="text-sm text-[#7A7A7A]">MARKET OVERVIEW</div>

              {/* EMPTY STATE (WAJIB) */}
              {safeCoins.length === 0 && (
                <div className="mt-4 text-[#555] text-xs">
                  Waiting for market data...
                </div>
              )}

              {/* GRID DATA */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {safeCoins.map((coin) => {
                  const isPositive =
                    (coin.price_change_percentage_24h ?? 0) >= 0;

                  return (
                    <div
                      key={coin.id}
                      className="p-3 border border-[#1A1A1A] rounded-xl hover:border-[#2A2A2A] transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-white">{coin.name}</div>

                        <div className="text-[10px] text-green-400 animate-pulse">
                          ● LIVE
                        </div>
                      </div>

                      <div className="text-xs text-[#7A7A7A] mt-2">
                        ${coin.current_price}
                      </div>

                      <div
                        className={`text-xs mt-1 ${
                          isPositive ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {isPositive ? "▲" : "▼"}{" "}
                        {(coin.price_change_percentage_24h ?? 0).toFixed(2)}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* LIVE MARKET FLOW CHART */}
              <div className="mt-6 border border-[#1A1A1A] rounded-2xl p-4 overflow-hidden">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-[#555]">
                      MARKET TAPE / REAL-TIME FLOW
                    </div>

                    <div className="text-[10px] text-[#333] mt-1">
                      simulated institutional price engine
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-cyan-400">
                      BTC ${safeCoins[0]?.current_price?.toLocaleString()}
                    </div>

                    <div
                      className={`text-[10px] mt-1 ${
                        (safeCoins[0]?.price_change_percentage_24h ?? 0) >= 0
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {(safeCoins[0]?.price_change_percentage_24h ?? 0).toFixed(
                        2,
                      )}
                      %
                    </div>
                  </div>
                </div>

                {/* LIVE FLOW BARS */}
                <div className="mt-6 h-40 flex items-end gap-1">
                  {ticks.map((tick, index) => (
                    <div
                      key={index}
                      className={`
          flex-1 rounded-t-md transition-all duration-500

          ${index % 2 === 0 ? "bg-cyan-400/70" : "bg-[#FF6B00]/70"}
        `}
                      style={{
                        height: `${(tick % 100) + 15}%`,
                      }}
                    />
                  ))}
                </div>

                {/* FLOW FOOTER */}
                <div className="mt-4 flex items-center justify-between text-[10px] text-[#444]">
                  <div>LIVE SIGNAL FLOW</div>

                  <div>
                    {signal?.signal || "NEUTRAL"} • SCORE {signal?.score || 0}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: AI SIGNAL PANEL */}
            <div className="md:col-span-4 border border-[#1A1A1A] bg-[#0D0D0D] rounded-3xl p-6">
              <div className="text-sm text-[#7A7A7A]">AI SIGNAL ENGINE</div>

              <div className="mt-6 space-y-4 text-xs">
                {signal && (
                  <div className="p-4 border border-green-500/20 rounded-2xl">
                    🟢 {signal.signal}
                    <div className="text-[#7A7A7A] mt-2">{signal.trend}</div>
                    <div className="text-cyan-400 mt-2">
                      confidence: {signal.confidence}%
                    </div>
                  </div>
                )}

                {risk && (
                  <div className="p-4 border border-yellow-500/20 rounded-2xl">
                    ⚠ {risk.level}
                    <div className="text-[#7A7A7A] mt-2">
                      volatility exposure analysis
                    </div>
                    <div className="text-yellow-400 mt-2">
                      risk score: {risk.score}/100
                    </div>
                  </div>
                )}

                <div className="p-4 border border-cyan-500/20 rounded-2xl">
                  🤖 AI CONFIDENCE: 87%
                </div>
              </div>
            </div>

            {/* BOTTOM: PORTFOLIO + EXECUTION */}
            <div className="md:col-span-12 grid md:grid-cols-3 gap-6">
              <div className="border border-[#1A1A1A] bg-[#0D0D0D] rounded-3xl p-6">
                <div className="text-sm text-[#7A7A7A]">PORTFOLIO VALUE</div>
                <div className="text-2xl font-bold mt-4 flex items-center gap-2">
                  $128,450
                  <span className="text-green-400 text-xs animate-pulse">
                    ●
                  </span>
                </div>
                <div className="text-green-400 text-xs mt-2">+14.2% 7D</div>
              </div>

              <div className="border border-[#1A1A1A] bg-[#0D0D0D] rounded-3xl p-6">
                <div className="text-sm text-[#7A7A7A]">ACTIVE POSITIONS</div>
                <div className="text-2xl font-bold mt-4">7</div>
                <div className="text-[#7A7A7A] text-xs mt-2">
                  3 LONG / 4 SHORT
                </div>
              </div>

              <div className="border border-[#1A1A1A] bg-[#0D0D0D] rounded-3xl p-6">
                <div className="text-sm text-[#7A7A7A]">EXECUTION STATUS</div>

                <div className="mt-3 text-xs text-cyan-400">
                  MODE: {autoMode ? "AUTONOMOUS" : "MANUAL"}
                </div>

                <div
                  className={`
      text-2xl
      font-bold
      mt-4
      ${executing ? "text-yellow-400" : "text-green-400"}
    `}
                >
                  {executing ? "EXECUTING" : "LIVE"}
                </div>

                <div className="text-[#7A7A7A] text-xs mt-2">
                  {executing
                    ? "Broadcasting transaction to devnet..."
                    : txHash
                      ? "On-chain execution confirmed"
                      : "Listening to market signals..."}
                </div>

                {txHash && (
                  <a
                    href={`https://explorer.solana.com/tx/${txHash}?cluster=devnet`}
                    target="_blank"
                    className="text-cyan-400 text-xs mt-4 block"
                  >
                    View Latest Transaction →
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* EXECUTION TERMINAL */}
          <div className="md:col-span-12 border border-[#1A1A1A] bg-[#0D0D0D] rounded-3xl p-6">
            {/* HEADER */}
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="text-sm text-[#7A7A7A]">
                  AUTONOMOUS EXECUTION ENGINE
                </div>

                <div className="text-xs text-[#555] mt-2">
                  simulated devnet execution layer
                </div>
              </div>

              {/* ACTIONS ROW */}
              <div className="flex items-center gap-3 flex-wrap">
                {/* EXECUTE */}
                <button
                  onClick={executeTrade}
                  disabled={!connected || executing}
                  className="
          rounded-2xl
          bg-[#FF6B00]
          px-5 py-3
          text-sm
          disabled:opacity-40
          transition-all duration-300
        "
                >
                  {executing
                    ? "Executing..."
                    : connected
                      ? "Execute Trade"
                      : "Connect Wallet"}
                </button>

                {/* AUTO MODE */}
                <button
                  onClick={() => setAutoMode(!autoMode)}
                  className={`
          rounded-2xl
          px-5 py-3
          text-sm
          border
          transition-all duration-300

          ${
            autoMode
              ? "bg-green-500/10 border-green-500 text-green-400 shadow-md shadow-green-500/20"
              : "bg-red-500/10 border-red-500 text-red-400"
          }
        `}
                >
                  {autoMode ? "🟢 AUTO MODE ON" : "🔴 AUTO MODE OFF"}
                </button>

                {/* TX */}
                {txHash ? (
                  <a
                    href={`https://explorer.solana.com/tx/${txHash}?cluster=devnet`}
                    target="_blank"
                    className="text-cyan-400 text-xs px-4 py-2 border border-cyan-500/20 rounded-xl hover:bg-cyan-500/10 transition"
                  >
                    View TX →
                  </a>
                ) : (
                  <div className="text-xs text-[#555] px-4 py-2">No TX yet</div>
                )}
              </div>
            </div>

            {/* EXECUTION RESULT */}
            {execution && (
              <div className="mt-6 border border-green-500/20 rounded-2xl p-4 text-xs">
                <div className="text-green-400">● {execution.status}</div>

                <div className="mt-2 text-[#7A7A7A]">
                  asset: {execution.asset}
                </div>

                <div className="text-[#7A7A7A]">side: {execution.side}</div>

                <div className="text-cyan-400 mt-3 break-all">
                  <a
                    href={`https://explorer.solana.com/tx/${execution.hash}?cluster=devnet`}
                    target="_blank"
                    className="text-cyan-400 underline break-all"
                  >
                    {execution.hash}
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* FOOT NOTE */}
          <div className="mt-12 text-xs text-[#7A7A7A]">
            Built for one-person funds operating institutional-grade on-chain
            strategies.
          </div>
        </div>
      </section>

      {/* MARKET (VC SLIDE) */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold">Target Users</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-14">
          {["Hedge Funds", "Prop Trading Teams", "Onchain Analysts"].map(
            (t) => (
              <div
                key={t}
                className="border border-[#1A1A1A] bg-[#0D0D0D] rounded-3xl p-6"
              >
                <div className="text-xl font-semibold">{t}</div>
                <p className="text-[#7A7A7A] mt-4">
                  Built for hedge funds, prop trading desks, and onchain quant
                  operators deploying systematic strategies
                </p>
              </div>
            ),
          )}
        </div>
      </section>

      {/* FINAL CTA (PRODUCT HUNT + VC CLOSE) */}
      <section className="border-t border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6 py-28 text-center">
          <h2 className="text-4xl font-bold">
            Request Early Access to Execution Layer
          </h2>

          <p className="text-[#7A7A7A] mt-4 max-w-2xl mx-auto">
            Access is limited to selected operators validating autonomous
            trading infrastructure systems.
          </p>

          <button className="mt-10 rounded-2xl bg-[#FF6B00] px-8 py-4 font-medium shadow-[0_0_40px_rgba(255,107,0,0.25)]">
            Request Access
          </button>
        </div>
      </section>
    </main>
  );
}
