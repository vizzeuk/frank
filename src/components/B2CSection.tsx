"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

/* ─── Mock UI: Step 1 — ADN Vocal ─── */
function VoiceCaptureUI() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  const bars = Array.from({ length: 40 }, (_, i) => {
    const x = i / 40;
    return Math.abs(Math.sin(x * Math.PI * 5) * 65 + Math.sin(x * Math.PI * 11) * 25) + 10;
  });

  const phases = [
    { label: "Calibrando tono base", done: true },
    { label: "Midiendo ritmo natural", done: phase >= 1 },
    { label: "Detectando pausas", done: phase >= 2 },
    { label: "Mapeando variación tonal", done: phase >= 3 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + 1.8, 100);
        setPhase(Math.floor(next / 26));
        return next;
      });
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col bg-[#1a1a1a]">
      {/* App header */}
      <div className="px-5 py-3.5 border-b border-[#e07a3f]/12 bg-[#111111] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-[5px] bg-[#e07a3f] flex items-center justify-center">
            <svg viewBox="0 0 12 8" fill="none" className="w-3 h-2.5">
              {[0, 2.5, 5, 7.5, 10].map((x, i) => (
                <rect key={i} x={x} y={[1, 0, 0.5, 0, 1][i]} width="1.5" height={[6, 8, 7, 8, 6][i]} rx="0.75" fill="#f5f0e8" />
              ))}
            </svg>
          </div>
          <span className="text-xs font-bold text-[#f5f0e8]" style={{ fontFamily: "var(--font-dm-sans)" }}>
            frank
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-950/40 border border-red-800/40">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[9px] font-bold text-red-400 uppercase tracking-wide" style={{ fontFamily: "var(--font-dm-mono)" }}>
            Grabando
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-between px-5 py-5 gap-4">
        {/* Waveform */}
        <div className="flex-1 flex items-center justify-center w-full">
          <div className="wave-container flex items-end gap-[2.5px] h-16 w-full">
            {bars.map((h, i) => (
              <div
                key={i}
                className="wave-bar rounded-full flex-1"
                style={{
                  height: `${h}%`,
                  background: "#e07a3f",
                  opacity: 0.4 + (h / 100) * 0.6,
                  animationDelay: `${(i * 0.04).toFixed(2)}s`,
                  animationDuration: `${1.4 + Math.random() * 0.4}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full space-y-1.5">
          <div className="flex justify-between">
            <span className="text-[10px] font-medium text-[#f5f0e8]/40" style={{ fontFamily: "var(--font-dm-mono)" }}>
              Analizando ADN vocal...
            </span>
            <span className="text-[10px] font-bold text-[#e07a3f]" style={{ fontFamily: "var(--font-dm-mono)" }}>
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-[#e07a3f]/12 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#e07a3f] to-[#b05a25]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Phase checklist */}
        <div className="w-full space-y-2">
          {phases.map((p, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: p.done ? "#e07a3f" : "rgba(245,240,232,0.06)",
                  border: p.done ? "none" : "1px solid rgba(245,240,232,0.10)",
                }}
              >
                {p.done && (
                  <svg viewBox="0 0 8 8" className="w-2.5 h-2.5">
                    <path d="M1.5 4l2 2 3-3.5" stroke="#0f0f0f" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {!p.done && i === phase && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#e07a3f] animate-pulse" />
                )}
              </div>
              <span
                className="text-[11px]"
                style={{
                  color: p.done ? "#e07a3f" : i === phase ? "#d4a96a" : "rgba(245,240,232,0.30)",
                  fontFamily: "var(--font-dm-mono)",
                }}
              >
                {p.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Mock UI: Step 2 — Simulación ─── */
const MESSAGES = [
  {
    role: "ai" as const,
    text: '"Tu performance del último trimestre no justifica un aumento del 30%. El máximo que puedo ofrecer es un 12%."',
    metrics: { stress: 72, confidence: 41 },
  },
  {
    role: "user" as const,
    text: '"Entiendo tu perspectiva. Tengo datos concretos que muestran un impacto del 2.4M en retención..."',
    metrics: { stress: 54, confidence: 68 },
  },
  {
    role: "ai" as const,
    text: '"Los números son interesantes. ¿Qué propones exactamente?"',
    metrics: { stress: 38, confidence: 76 },
  },
];

function ConversationUI() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount >= MESSAGES.length) return;
    const t = setTimeout(() => setVisibleCount((c) => c + 1), visibleCount === 0 ? 400 : 1600);
    return () => clearTimeout(t);
  }, [visibleCount]);

  const latest = MESSAGES[visibleCount - 1];

  return (
    <div className="h-full flex flex-col bg-[#1a1a1a]">
      {/* Header */}
      <div className="px-5 py-3.5 border-b border-[#e07a3f]/12 bg-[#111111]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-[#f5f0e8]" style={{ fontFamily: "var(--font-dm-sans)" }}>
              frank — Negociación de salario
            </p>
            <p className="text-[10px] text-[#f5f0e8]/35 mt-0.5" style={{ fontFamily: "var(--font-dm-mono)" }}>
              IA: Modo Agresivo · Nivel 3
            </p>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#e07a3f]/10 border border-[#e07a3f]/25">
            <div className="w-1.5 h-1.5 rounded-full bg-[#e07a3f] animate-pulse" />
            <span className="text-[9px] font-bold text-[#e07a3f]" style={{ fontFamily: "var(--font-dm-mono)" }}>
              En vivo
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 flex flex-col gap-2.5 px-4 py-3 overflow-hidden">
        <AnimatePresence>
          {MESSAGES.slice(0, visibleCount).map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className="max-w-[80%] px-3 py-2 rounded-[14px] text-[10px] leading-relaxed font-medium"
                style={{
                  background: msg.role === "ai" ? "#222222" : "#e07a3f",
                  color: msg.role === "ai" ? "#f5f0e8" : "#0f0f0f",
                  border: msg.role === "ai" ? "1px solid rgba(224,122,63,0.15)" : "none",
                  fontFamily: "var(--font-dm-sans)",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                }}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Live metrics */}
      {latest && (
        <div className="px-4 py-3 border-t border-[#e07a3f]/12 bg-[#111111]/80 space-y-2">
          <p className="text-[9px] font-bold text-[#f5f0e8]/30 uppercase tracking-wider" style={{ fontFamily: "var(--font-dm-mono)" }}>
            Frank · Análisis paralingüístico
          </p>
          {[
            { label: "Estrés", value: latest.metrics.stress, warn: latest.metrics.stress > 60 },
            { label: "Confianza", value: latest.metrics.confidence, good: latest.metrics.confidence > 60 },
          ].map((m) => (
            <div key={m.label} className="flex items-center gap-2">
              <span className="text-[10px] text-[#f5f0e8]/45 w-14 flex-shrink-0" style={{ fontFamily: "var(--font-dm-mono)" }}>
                {m.label}
              </span>
              <div className="flex-1 h-1.5 rounded-full bg-[#f5f0e8]/06 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${m.value}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  style={{
                    background: m.warn ? "#FF6B6B" : m.good ? "#d4a96a" : "#e07a3f",
                  }}
                />
              </div>
              <span
                className="text-[10px] font-bold w-8 text-right"
                style={{
                  color: m.warn ? "#FF6B6B" : m.good ? "#d4a96a" : "#e07a3f",
                  fontFamily: "var(--font-dm-mono)",
                }}
              >
                {m.value}%
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Mic button */}
      <div className="px-4 py-3 border-t border-[#e07a3f]/12 bg-[#111111] flex items-center gap-3">
        <div className="flex-1 h-7 rounded-full bg-[#0f0f0f] border border-[#e07a3f]/15 flex items-center px-3">
          <span className="text-[10px] text-[#f5f0e8]/25" style={{ fontFamily: "var(--font-dm-mono)" }}>
            Habla ahora...
          </span>
        </div>
        <div className="w-7 h-7 rounded-full bg-[#e07a3f] flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 14 14" fill="none" stroke="#0f0f0f" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
            <rect x="5" y="1" width="4" height="7" rx="2" />
            <path d="M2 7a5 5 0 0010 0" />
            <line x1="7" y1="12" x2="7" y2="13.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ─── Mock UI: Step 3 — Dashboard ─── */
const METRICS_DATA = [
  { label: "Confianza vocal", sessions: [42, 51, 58, 63, 71, 78], color: "#e07a3f", unit: "/100" },
  { label: "Estrés detectado", sessions: [78, 71, 63, 54, 44, 32], color: "#FF6B6B", inverse: true, unit: "%" },
  { label: "Pausas estratégicas", sessions: [28, 35, 42, 51, 60, 72], color: "#d4a96a", unit: "/min" },
  { label: "Ritmo de habla", sessions: [168, 155, 148, 143, 140, 138], color: "#9B59B6", inverse: true, unit: "ppm" },
];

function DashboardUI() {
  return (
    <div className="h-full flex flex-col bg-[#1a1a1a]">
      {/* Header */}
      <div className="px-5 py-3.5 border-b border-[#e07a3f]/12 bg-[#111111] flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-[#f5f0e8]" style={{ fontFamily: "var(--font-dm-sans)" }}>
            frank — Dashboard de Performance
          </p>
          <p className="text-[10px] text-[#f5f0e8]/35" style={{ fontFamily: "var(--font-dm-mono)" }}>
            12 sesiones · Semana 1–6
          </p>
        </div>
        <div className="px-2.5 py-1 rounded-full bg-[#e07a3f]/12 border border-[#e07a3f]/25">
          <span className="text-[9px] font-bold text-[#e07a3f]" style={{ fontFamily: "var(--font-dm-mono)" }}>
            +34% global
          </span>
        </div>
      </div>

      {/* Metrics */}
      <div className="flex-1 flex flex-col gap-3 px-4 py-4 overflow-hidden">
        {METRICS_DATA.map((metric, mi) => {
          const last = metric.sessions[metric.sessions.length - 1];
          const first = metric.sessions[0];
          const pct = Math.round(Math.abs(((last - first) / first) * 100));
          const improved = metric.inverse ? last < first : last > first;
          const maxVal = Math.max(...metric.sessions);
          const minVal = Math.min(...metric.sessions);
          const range = maxVal - minVal || 1;

          return (
            <div key={metric.label}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-semibold text-[#f5f0e8]/65" style={{ fontFamily: "var(--font-dm-mono)" }}>
                  {metric.label}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold" style={{ color: metric.color, fontFamily: "var(--font-dm-mono)" }}>
                    {last}{metric.unit}
                  </span>
                  <span
                    className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{
                      color: improved ? "#d4a96a" : "#FF6B6B",
                      background: improved ? "rgba(212,169,106,0.1)" : "rgba(255,107,107,0.1)",
                      fontFamily: "var(--font-dm-mono)",
                    }}
                  >
                    {improved ? "↑" : "↓"}{pct}%
                  </span>
                </div>
              </div>
              {/* Mini sparkline */}
              <div className="flex items-end gap-1 h-8">
                {metric.sessions.map((val, i) => {
                  const normalized = (val - minVal) / range;
                  const h = metric.inverse ? 1 - normalized : normalized;
                  return (
                    <motion.div
                      key={i}
                      className="flex-1 rounded-sm"
                      style={{ background: metric.color, opacity: 0.3 + h * 0.7 }}
                      initial={{ height: 0 }}
                      animate={{ height: `${Math.max(h * 100, 10)}%` }}
                      transition={{ duration: 0.5, delay: mi * 0.08 + i * 0.04, ease: "easeOut" }}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between mt-0.5">
                <span className="text-[8px] text-[#f5f0e8]/20" style={{ fontFamily: "var(--font-dm-mono)" }}>Sem. 1</span>
                <span className="text-[8px] text-[#f5f0e8]/20" style={{ fontFamily: "var(--font-dm-mono)" }}>Sem. 6</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Insight */}
      <div className="px-4 pb-4">
        <div className="px-3 py-2.5 rounded-[12px] bg-[#e07a3f]/08 border border-[#e07a3f]/20">
          <p className="text-[10px] text-[#e07a3f] font-medium leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)" }}>
            Próximo foco: Reduce el ritmo de habla en los primeros 30 segundos de cada conversación difícil.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Step definition ─── */
const STEPS = [
  {
    number: "01",
    title: "Onboarding de ADN Vocal",
    subtitle: "Tu huella de voz única",
    description:
      "Frank aprende tu ritmo natural, tonalidad y patrones de pausa en una sesión de 4 minutos. Tus datos son encriptados y utilizados para la personalización de tu experiencia.",
    duration: "4 minutos",
    benefit: "Línea Base sin sesgos",
    color: "#e07a3f",
    bg: "rgba(224,122,63,0.08)",
    border: "rgba(224,122,63,0.22)",
  },
  {
    number: "02",
    title: "Inmersión en Alta Presión",
    subtitle: "Simulador de vuelo conversacional",
    description:
      "Practica con interlocutores de IA calibrados: agresivos, empáticos, evasivos. Feedback paralingüístico en tiempo real.",
    duration: "5–10 min / Sesión",
    benefit: "Errores sin consecuencias",
    color: "#d4a96a",
    bg: "rgba(212,169,106,0.08)",
    border: "rgba(212,169,106,0.20)",
  },
  {
    number: "03",
    title: "Dashboard de Performance",
    subtitle: "Análisis y evolución profundos",
    description:
      "Visualiza tu evolución en múltiple ejes paralingüísticos. Identifica exactamente en qué momento cometes los errores. Comparate con sesiones anteriores.",
    duration: "Post-sesión",
    benefit: "Mejora medible y accionable",
    color: "#c07848",
    bg: "rgba(192,120,72,0.08)",
    border: "rgba(192,120,72,0.20)",
  },
];

const VIEWS = [VoiceCaptureUI, ConversationUI, DashboardUI];

export default function B2CSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="producto" className="relative py-28 px-6 bg-[#0f0f0f] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-px bg-gradient-to-r from-transparent via-[#e07a3f]/20 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a1a1a] border border-[#e07a3f]/25 mb-6 shadow-sm">
            <span className="text-xs font-semibold text-[#e07a3f]">Para profesionales y líderes</span>
          </div>
          <h2
            className="text-4xl md:text-6xl font-bold mb-5 tracking-tight leading-[1.05] text-[#f5f0e8]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Tu camino al dominio
            <br />
            <span className="inline-block bg-[#e07a3f] text-[#0f0f0f] px-3 rounded-[10px]">interpersonal.</span>
          </h2>
          <p className="text-lg text-[#f5f0e8]/50 max-w-xl mx-auto">
            Tres pasos. Sin certificaciones vacías. Solo práctica deliberada con feedback real de tu propia voz.
          </p>
        </motion.div>

        {/* Main layout */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left: Step selector */}
          <div className="flex flex-col gap-3">
            {STEPS.map((s, i) => (
              <motion.button
                key={s.number}
                onClick={() => setActiveStep(i)}
                onMouseEnter={() => setActiveStep(i)}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className={`text-left rounded-[22px] border transition-all duration-300 overflow-hidden ${
                  activeStep === i ? "shadow-md" : "hover:border-[#e07a3f]/30"
                }`}
                style={{
                  background: activeStep === i ? s.bg : "#1a1a1a",
                  borderColor: activeStep === i ? s.border : "rgba(224,122,63,0.12)",
                  boxShadow: activeStep === i ? `0 4px 24px ${s.color}15` : undefined,
                }}
              >
                <div className="flex items-start gap-4 p-5">
                  {/* Step badge */}
                  <div
                    className="w-10 h-10 rounded-[12px] flex items-center justify-center flex-shrink-0 font-bold text-sm"
                    style={{
                      background: activeStep === i ? s.color : "rgba(245,240,232,0.06)",
                      color: activeStep === i ? "#0f0f0f" : "rgba(245,240,232,0.25)",
                      fontFamily: "var(--font-dm-mono)",
                    }}
                  >
                    {s.number}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3
                        className="text-base font-bold leading-tight"
                        style={{
                          color: activeStep === i ? "#f5f0e8" : "rgba(245,240,232,0.55)",
                          fontFamily: "var(--font-dm-sans)",
                        }}
                      >
                        {s.title}
                      </h3>
                    </div>
                    <p
                      className="text-xs mb-3 leading-relaxed"
                      style={{
                        color: activeStep === i ? "rgba(245,240,232,0.65)" : "rgba(245,240,232,0.35)",
                      }}
                    >
                      {s.description}
                    </p>
                    <div className="flex items-center gap-3">
                      <div
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold"
                        style={{
                          background: `${s.color}12`,
                          color: s.color,
                          border: `1px solid ${s.color}25`,
                          fontFamily: "var(--font-dm-mono)",
                        }}
                      >
                        <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-3 h-3">
                          <circle cx="6" cy="6" r="4.5" />
                          <polyline points="6,3.5 6,6 7.5,7" />
                        </svg>
                        {s.duration}
                      </div>
                      <div
                        className="flex items-center gap-1 text-[10px] font-semibold"
                        style={{ color: s.color, fontFamily: "var(--font-dm-mono)" }}
                      >
                        <svg viewBox="0 0 10 10" className="w-2.5 h-2.5">
                          <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {s.benefit}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}

            {/* Bottom copy */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-2 p-5 rounded-[20px] bg-[#1a1a1a] border border-[#e07a3f]/15"
            >
              <p className="text-sm text-[#f5f0e8]/50 leading-relaxed">
                Los pilotos de aviación entrenan miles de horas en simuladores antes de volar con pasajeros.{" "}
                <span className="text-[#e07a3f] font-semibold">Frank es tu simulador de vuelo para conversaciones de alto riesgo.</span>
              </p>
            </motion.div>
          </div>

          {/* Right: Mock product UI */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="lg:sticky lg:top-28"
          >
            {/* Browser frame */}
            <div
              className="rounded-[24px] overflow-hidden border border-[#e07a3f]/18"
              style={{ boxShadow: "0 12px 48px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)" }}
            >
              {/* Browser chrome */}
              <div className="bg-[#222222] border-b border-[#e07a3f]/12 px-4 py-3 flex items-center gap-3">
                <div className="flex gap-1.5">
                  {["#FF5F56", "#FFBD2E", "#27C93F"].map((c, i) => (
                    <div key={i} className="w-3 h-3 rounded-full" style={{ background: c, opacity: 0.75 }} />
                  ))}
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-[#1a1a1a]/80 border border-[#e07a3f]/15 max-w-48 w-full">
                    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" className="w-2.5 h-2.5 text-[#f5f0e8]/30">
                      <rect x="1.5" y="1.5" width="9" height="9" rx="2" />
                    </svg>
                    <span className="text-[9px] text-[#f5f0e8]/30 font-medium" style={{ fontFamily: "var(--font-dm-mono)" }}>
                      app.frank.ai
                    </span>
                  </div>
                </div>
                <div className="w-16" />
              </div>

              {/* App content — changes per step */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ height: 420 }}
                >
                  {(() => {
                    const View = VIEWS[activeStep];
                    return <View />;
                  })()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Step label below frame */}
            <div className="flex items-center justify-center gap-6 mt-4">
              {STEPS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  onMouseEnter={() => setActiveStep(i)}
                  className="flex flex-col items-center gap-1.5 group"
                >
                  <motion.div
                    animate={{ width: activeStep === i ? 28 : 8, background: activeStep === i ? s.color : "rgba(245,240,232,0.12)" }}
                    className="h-1 rounded-full transition-all duration-300"
                  />
                  <span
                    className="text-[9px] font-bold uppercase tracking-wider transition-colors"
                    style={{
                      color: activeStep === i ? s.color : "rgba(245,240,232,0.25)",
                      fontFamily: "var(--font-dm-mono)",
                    }}
                  >
                    Paso {s.number}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
