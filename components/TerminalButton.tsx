"use client";

export default function TerminalButton() {
  return (
    <button
      className="
        rounded-2xl
        bg-[#FF6B00]
        px-6 py-3
        font-medium
        shadow-[0_0_30px_rgba(255,107,0,0.25)]
      "
      onClick={() => (window.location.href = "/terminal")}
    >
      Try Terminal
    </button>
  );
}
