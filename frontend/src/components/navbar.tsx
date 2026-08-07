import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logoAsset from "@/assets/dch-logo.png";

const links = [
  { label: "Home", href: "#home" },
  { label: "Solutions", href: "#solutions" },
  { label: "Industries", href: "#industries" },
  { label: "About", href: "#about" },
  { label: "Pricing", href: "#pricing" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 md:px-6 py-3 transition-all duration-500 ${
            scrolled ? "glass-strong shadow-elegant" : "bg-transparent border border-transparent"
          }`}
        >
          <Link to="/" className="flex items-center gap-3 group min-w-0">
            <img
              src={logoAsset}
              alt="Digital Creators Hub"
              className="h-11 w-11 md:h-12 md:w-12 rounded-full object-contain shrink-0 drop-shadow-[0_0_18px_rgba(120,130,255,0.35)]"
            />
            <span className="text-white font-semibold text-[15px] md:text-base leading-tight truncate">
              Digital Creators <span className="text-gradient">Hub</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-white/70 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a href="#contact" className="text-sm text-white/80 hover:text-white transition">
              Sign in
            </a>
            <a
              href="#contact"
              className="relative inline-flex items-center gap-2 rounded-xl bg-gradient-primary px-4 py-2.5 text-sm font-medium text-white shadow-glow hover:shadow-elegant transition"
            >
              Book Free Demo
            </a>
          </div>

          <button
            className="lg:hidden text-white p-2"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden mt-2 glass-strong rounded-2xl p-4 space-y-1 animate-fade-in">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-white/80 hover:bg-white/5"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-2 block text-center rounded-xl bg-gradient-primary px-4 py-2.5 text-sm font-medium text-white"
            >
              Book Free Demo
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
