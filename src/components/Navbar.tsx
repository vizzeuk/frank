"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? "py-3 bg-[#0f0f0f]/90 backdrop-blur-xl border-b border-[#e07a3f]/15 shadow-sm"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <a href="#" className="block w-fit">
          <Image
            src="/logo-frank/BLANCO FRANK..png"
            alt="Frank"
            width={0}
            height={0}
            sizes="100vw"
            className="h-8 w-auto object-contain"
            priority
          />
        </a>
      </div>
    </motion.nav>
  );
}
