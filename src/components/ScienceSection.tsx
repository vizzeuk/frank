"use client";

import { motion } from "framer-motion";

type IconProps = { className?: string; color?: string };

function BarChartIcon({ className, color }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke={color ?? "currentColor"} strokeWidth="1.6" strokeLinecap="round" className={className}>
      <rect x="2" y="12" width="3" height="5" rx="1" />
      <rect x="8" y="7" width="3" height="10" rx="1" />
      <rect x="14" y="3" width="3" height="14" rx="1" />
    </svg>
  );
}

function BrainIcon({ className, color }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke={color ?? "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M7 9.5C7 7.5 8.5 6 10 6s3 1.5 3 3.5V13c0 1.1-.9 2-2 2H9c-1.1 0-2-.9-2-2V9.5z" />
      <path d="M7 9.5C6 9.5 4.5 10 4.5 12S5.5 14 7 14" />
      <path d="M13 9.5c1 0 2.5.5 2.5 2.5S14.5 14 13 14" />
      <path d="M10 6V4" />
      <circle cx="10" cy="3.5" r="0.5" fill={color ?? "currentColor"} />
    </svg>
  );
}

function LayersIcon({ className, color }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke={color ?? "currentColor"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="10,2 18,6.5 10,11 2,6.5" />
      <path d="M2 11l8 4.5L18 11" />
      <path d="M2 15.5l8 4.5 8-4.5" />
    </svg>
  );
}

const PILLARS = [
  {
    icon: BrainIcon,
    title: "Paralingüística de Scherer",
    description:
      "Frank implementa el modelo de Klaus R. Scherer sobre Vocal Affect Bursts para decodificar el estado emocional con mayor precisión que el análisis de texto.",
    tag: "Fundamento teórico",
    color: "#e07a3f",
    bg: "rgba(224,122,63,0.08)",
  },
  {
    icon: LayersIcon,
    title: "Línea Base Individual",
    description:
      "En lugar de compararte con poblaciones genéricas, Frank aprende TU voz. Cualquier desviación de tu patrón es detectada como señal, eliminando sesgos de género, cultura e idioma.",
    tag: "Anti-sesgo",
    color: "#d4a96a",
    bg: "rgba(212,169,106,0.08)",
  },
  {
    icon: BarChartIcon,
    title: "Stack: Hume AI + ElevenLabs",
    description:
      "Procesamos audio con Hume AI para análisis de afecto y ElevenLabs para síntesis de interlocutores de IA hiperrealistas. La inferencia ocurre en tiempo real bajo latencia sub-200ms.",
    tag: "Infraestructura",
    color: "#e07a3f",
    bg: "rgba(224,122,63,0.08)",
  },
];

const PIPELINE = [
  { phase: "Captura", detail: "Audio → PCM 16kHz → preprocessing", color: "#e07a3f" },
  { phase: "Inferencia", detail: "Hume Vocal Analysis → 6 ejes de afecto", color: "#d4a96a" },
  { phase: "Normalización", detail: "Comparación vs. Línea Base propia", color: "#e07a3f" },
  { phase: "Insight", detail: "Feedback accionable — latencia < 200ms", color: "#d4a96a" },
];

export default function ScienceSection() {
  return (
    <section id="ciencia" className="relative py-28 px-6 bg-[#0f0f0f] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-px bg-gradient-to-r from-transparent via-[#e07a3f]/25 to-transparent" />
      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #f5f0e8 1px, transparent 0)", backgroundSize: "44px 44px" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a1a1a] border border-[#e07a3f]/25 shadow-sm mb-6">
            <span className="text-xs font-semibold text-[#f5f0e8]">Rigor científico</span>
          </div>
          <h2
            className="text-4xl md:text-6xl font-bold mb-5 text-[#f5f0e8] tracking-tight leading-[1.05]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            No es magia.
            <br />
            <span className="inline-block bg-[#e07a3f] text-[#0f0f0f] px-3 rounded-[10px]">Es ciencia paralingüística.</span>
          </h2>
          <p className="text-lg text-[#f5f0e8]/50 max-w-2xl mx-auto leading-relaxed">
            Frank no mide lo que dices. Mide{" "}
            <span className="text-[#e07a3f] font-semibold">cómo lo dices</span>{" "}
            — el 55% de la comunicación que los modelos de lenguaje ignoran.
          </p>
        </motion.div>

        {/* Pillars */}
        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className="group p-7 rounded-[24px] bg-[#1a1a1a] border border-[#e07a3f]/12 hover:border-[#e07a3f]/35 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-11 h-11 rounded-[12px] flex items-center justify-center"
                    style={{ background: pillar.bg, border: `1px solid ${pillar.color}25` }}
                  >
                    <Icon className="w-5 h-5" color={pillar.color} />
                  </div>
                  <span
                    className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{
                      color: pillar.color,
                      background: pillar.bg,
                      fontFamily: "var(--font-dm-mono)",
                    }}
                  >
                    {pillar.tag}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#f5f0e8]/90 mb-2.5" style={{ fontFamily: "var(--font-dm-sans)" }}>
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#f5f0e8]/50 leading-relaxed">{pillar.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="bg-[#1a1a1a] rounded-[24px] border border-[#e07a3f]/15 p-8 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-[#e07a3f]/10 border border-[#e07a3f]/25 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#e07a3f]" />
            </div>
            <h3 className="text-base font-bold text-[#f5f0e8]/85" style={{ fontFamily: "var(--font-dm-sans)" }}>
              Pipeline de análisis — Tiempo real
            </h3>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-0">
            {PIPELINE.map((item, i) => (
              <div key={item.phase} className="flex md:flex-col md:flex-1 items-center md:items-start gap-4 md:gap-0">
                <div className="flex md:flex-row items-center gap-3 md:mb-4 md:w-full">
                  <div
                    className="w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0 font-bold text-sm"
                    style={{
                      background: `${item.color}12`,
                      border: `1px solid ${item.color}25`,
                      color: item.color,
                      fontFamily: "var(--font-dm-mono)",
                    }}
                  >
                    {i + 1}
                  </div>
                  {i < PIPELINE.length - 1 && (
                    <div className="hidden md:flex flex-1 items-center gap-1 ml-1">
                      <div className="flex-1 h-px bg-gradient-to-r from-[#e07a3f]/40 to-[#e07a3f]/10" />
                      <div className="w-1 h-1 rounded-full bg-[#e07a3f]/40" />
                    </div>
                  )}
                </div>
                <div className="md:pr-4">
                  <p className="text-sm font-bold mb-1" style={{ color: item.color, fontFamily: "var(--font-dm-sans)" }}>
                    {item.phase}
                  </p>
                  <p className="text-xs text-[#f5f0e8]/40 leading-relaxed" style={{ fontFamily: "var(--font-dm-mono)" }}>
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Privacy note */}
          <div className="mt-8 pt-6 border-t border-[#e07a3f]/12 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div
              className="px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5"
              style={{
                background: "rgba(224,122,63,0.10)",
                border: "1px solid rgba(224,122,63,0.20)",
                color: "#e07a3f",
                fontFamily: "var(--font-dm-mono)",
              }}
            >
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                <path d="M7 1L2 4v4c0 3.25 2.25 6.1 5 6.85C9.75 14.1 12 11.25 12 8V4L7 1z" />
                <path d="M4.5 7l2 2 3-3" />
              </svg>
              Privacidad por diseño
            </div>
            <p className="text-xs text-[#f5f0e8]/40 leading-relaxed">
              Tus datos de voz son convertidos a{" "}
              <span className="text-[#e07a3f] font-semibold">vectores numéricos</span>, no almacenados como grabaciones. Nadie escucha tu audio — ni nosotros.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
