"use client";

import { motion } from "framer-motion";
import { useState } from "react";

/* ─── Voice Wave ─── */
function VoiceWave() {
  const bars = Array.from({ length: 48 }, (_, i) => {
    const x = i / 48;
    const h = Math.abs(Math.sin(x * Math.PI * 4.5) * 68 + Math.sin(x * Math.PI * 9) * 22) + 8;
    return Math.min(Math.max(h, 6), 100);
  });

  return (
    <div className="wave-container flex items-end justify-center gap-[3px] h-14 cursor-default select-none">
      {bars.map((h, i) => (
        <div
          key={i}
          className="wave-bar rounded-full"
          style={{
            width: "3px",
            height: `${h}%`,
            background: "#e07a3f",
            opacity: 0.35 + (h / 100) * 0.65,
            animationDelay: `${(i * 0.038).toFixed(2)}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Waitlist Card (right column) ─── */
function WaitlistCard() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setTimeout(() => setStatus("done"), 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 32 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className="w-full rounded-[28px] bg-[#1a1a1a] border border-[#e07a3f]/25 p-8"
      style={{ boxShadow: "0 4px 40px rgba(224,122,63,0.10), 0 1px 6px rgba(0,0,0,0.3)" }}
    >
      {/* Card header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#f5f0e8] mb-1.5" style={{ fontFamily: "var(--font-dm-sans)" }}>
          Reserva tu lugar gratis
        </h2>
        <p className="text-sm text-[#f5f0e8]/45 leading-relaxed">
          Primera sesión gratuita. Sin tarjeta de crédito. Acceso anticipado con beneficios exclusivos.
        </p>
      </div>

      {/* Form */}
      {status === "done" ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3 px-4 py-4 rounded-[18px] bg-[#e07a3f]/10 border border-[#e07a3f]/25"
        >
          <div className="w-7 h-7 rounded-full bg-[#e07a3f] flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 12 12" className="w-3.5 h-3.5">
              <path d="M2 6l3 3 5-5" stroke="#0f0f0f" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-sm text-[#f5f0e8] font-semibold">
            Estás en la lista. Te avisamos cuando abramos.
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} id="waitlist" className="flex flex-col gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
            className="w-full px-4 py-3.5 rounded-[14px] bg-[#0f0f0f] border border-[#e07a3f]/20 text-[#f5f0e8] placeholder:text-[#f5f0e8]/30 text-sm outline-none focus:border-[#e07a3f] focus:ring-3 focus:ring-[#e07a3f]/15 transition-all duration-200"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            disabled={status === "loading"}
            className="w-full px-6 py-3.5 rounded-[14px] text-sm font-bold text-[#f5f0e8] bg-[#e07a3f] hover:bg-[#b05a25] transition-colors duration-300 disabled:opacity-60"
            style={{
              fontFamily: "var(--font-dm-sans)",
              boxShadow: "0 0 22px rgba(224,122,63,0.35), 0 4px 12px rgba(224,122,63,0.18)",
            }}
          >
            {status === "loading" ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" strokeDasharray="40" strokeDashoffset="10" />
                </svg>
                Un momento...
              </span>
            ) : (
              "Reservar mi lugar →"
            )}
          </motion.button>
          <p className="text-center text-[10px] text-[#f5f0e8]/30" style={{ fontFamily: "var(--font-dm-mono)" }}>
            Sin tarjeta · Sin compromiso · 100% privado
          </p>
        </form>
      )}

      {/* Divider */}
      <div className="h-px bg-[#e07a3f]/12 my-6" />

      {/* Voice wave */}
      <div>
        <VoiceWave />
        <p className="mt-2 text-center text-[9px] text-[#f5f0e8]/25 tracking-[0.18em] uppercase" style={{ fontFamily: "var(--font-dm-mono)" }}>
          Análisis paralingüístico · Tiempo real
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Background decoration ─── */
function BgDecoration() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-[-10%] right-[-5%] w-[420px] h-[420px] rounded-full bg-[#e07a3f]/08 blur-[100px]" />
      <div className="absolute bottom-[5%] left-[-3%] w-[320px] h-[320px] rounded-full bg-[#e07a3f]/05 blur-[80px]" />
      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #f5f0e8 1px, transparent 0)",
          backgroundSize: "36px 36px",
        }}
      />
    </div>
  );
}

const fadeLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: (delay: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.65,
      delay,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center px-6 pt-20 pb-16 overflow-hidden bg-[#0f0f0f]">
      <BgDecoration />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* ── Left: Text content ── */}
          <div className="flex flex-col gap-7">
            {/* Headline */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              animate="visible"
              custom={0.05}
            >
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight text-[#f5f0e8]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Comete el error
                <br />
                antes de que
                <br />
                <span
                  className="inline-block px-3 py-1 rounded-[12px] text-[#0f0f0f]"
                  style={{ background: "#e07a3f" }}
                >
                  cueste caro.
                </span>
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              variants={fadeLeft}
              initial="hidden"
              animate="visible"
              custom={0.18}
              className="text-lg text-[#f5f0e8]/55 max-w-lg leading-relaxed"
            >
              La primera IA que entrena tus Human Skills analizando tu{" "}
              <strong className="text-[#f5f0e8] font-semibold">voz</strong>, no solo tus palabras.
              Sin sesgos culturales. Sin riesgos reales.
            </motion.p>

            {/* Quote / social proof */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              animate="visible"
              custom={0.32}
              className="flex items-start gap-3 p-4 rounded-[16px] bg-[#1a1a1a] border border-[#e07a3f]/15 max-w-sm"
            >
              <div className="w-8 h-8 rounded-full bg-[#e07a3f]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg viewBox="0 0 16 16" fill="none" stroke="#f5f0e8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M8 14A6 6 0 108 2a6 6 0 000 12z" />
                  <path d="M8 8V5M8 10.5v.5" />
                </svg>
              </div>
              <p className="text-xs text-[#f5f0e8]/50 leading-relaxed">
                Los pilotos entrenan en simuladores antes de volar con pasajeros.{" "}
                <span className="text-[#f5f0e8] font-semibold">Frank es tu simulador para conversaciones de alto riesgo.</span>
              </p>
            </motion.div>
          </div>

          {/* ── Right: Waitlist card ── */}
          <div>
            <WaitlistCard />
          </div>

        </div>
      </div>
    </section>
  );
}
