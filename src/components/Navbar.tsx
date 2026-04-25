"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function WaveIcon({ className }: { className?: string }) {
  const heights = [4, 7, 10, 12, 10, 7, 4];
  return (
    <svg viewBox="0 0 28 16" fill="none" className={className}>
      {heights.map((h, i) => (
        <rect
          key={i}
          x={i * 4}
          y={(12 - h) / 2}
          width="2.5"
          height={h}
          rx="1.25"
          fill="currentColor"
        />
      ))}
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Producto", href: "#producto" },
    { label: "Empresa", href: "#empresa" },
    { label: "Ciencia", href: "#ciencia" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? "py-3 bg-[#FAF8F4]/90 backdrop-blur-xl border-b border-[#A2D2FF]/20 shadow-sm"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-[8px] bg-[#1B263B] flex items-center justify-center group-hover:bg-[#A2D2FF] transition-colors duration-300">
            <WaveIcon className="w-4 h-3.5 text-[#A2D2FF]" />
          </div>
          <span className="text-lg font-bold tracking-tight text-[#1B263B]" style={{ fontFamily: "var(--font-dm-sans)" }}>
            frank<span className="text-[#A2D2FF]">.</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#1B263B]/55 hover:text-[#A2D2FF] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <motion.a
            href="#waitlist"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="px-5 py-2.5 rounded-full text-sm font-semibold text-[#1B263B] bg-[#A2D2FF] hover:bg-[#B7E4C7] transition-colors duration-300"
          >
            Unirme al Waitlist
          </motion.a>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            className="block w-5 h-0.5 bg-[#1B263B]"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-5 h-0.5 bg-[#1B263B]"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            className="block w-5 h-0.5 bg-[#1B263B]"
          />
        </button>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={menuOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.28, ease: "easeInOut" }}
        className="md:hidden overflow-hidden bg-[#FAF8F4]/95 backdrop-blur-xl border-t border-[#A2D2FF]/15"
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-[#1B263B]/65 hover:text-[#A2D2FF] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#waitlist"
            onClick={() => setMenuOpen(false)}
            className="mt-2 px-5 py-3 rounded-full text-sm font-semibold text-white bg-[#1B263B] text-center"
          >
            Unirme al Waitlist
          </a>
        </div>
      </motion.div>
    </motion.nav>
  );
}
