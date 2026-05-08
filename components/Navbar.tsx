import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-[#1A1A1A] bg-black/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
        {/* LOGO */}
        <Link
          href="/"
          className="text-white text-lg font-semibold tracking-tight"
        >
          ShadowAlpha
        </Link>

        {/* MENU */}
        <div className="flex items-center gap-8 text-sm">
          <Link
            href="/features"
            className="text-[#7A7A7A] hover:text-[#FF6B00] transition-colors"
          >
            Features
          </Link>

          <Link
            href="/architecture"
            className="text-[#7A7A7A] hover:text-[#FF6B00] transition-colors"
          >
            Architecture
          </Link>

          <Link
            href="/roadmap"
            className="text-[#7A7A7A] hover:text-[#FF6B00] transition-colors"
          >
            Roadmap
          </Link>

          <Link
            href="/github"
            className="text-[#7A7A7A] hover:text-[#FF6B00] transition-colors"
          >
            GitHub
          </Link>
        </div>
      </div>
    </nav>
  );
}
