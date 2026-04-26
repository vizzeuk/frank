"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

/* ─── Stars ─── */
const STARS = Array.from({ length: 80 }, (_, i) => ({
  x: (i * 137.508) % 100,
  y: (i * 97.321) % 80,
  size: 1 + (i % 3) * 0.5,
  opacity: 0.10 + (i % 7) * 0.06,
}));

function StarField() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {STARS.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[#f5f0e8]"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, opacity: s.opacity }}
        />
      ))}
    </div>
  );
}

/* ─── Planet ─── */
function Planet() {
  return (
    <>
      {/* Warm glow halo */}
      <div
        className="absolute bottom-0 left-1/2 pointer-events-none"
        style={{
          width: "160vw",
          height: "50vw",
          transform: "translateX(-50%)",
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(224,122,63,0.22) 0%, rgba(224,122,63,0.07) 50%, transparent 72%)",
        }}
      />
      {/* Planet body — overflow hidden clips the atmospheric layers to the sphere */}
      <div
        className="absolute bottom-0 left-1/2 pointer-events-none"
        style={{
          width: "clamp(600px, 160vw, 3200px)",
          height: "clamp(600px, 160vw, 3200px)",
          borderRadius: "50%",
          transform: "translate(-50%, 88%)",
          background:
            "radial-gradient(ellipse at 50% 16%, #221208 0%, #151008 25%, #0e0e0e 55%, #0a0a0a 100%)",
          border: "1px solid rgba(224,122,63,0.12)",
          boxShadow: "0 -6px 60px rgba(224,122,63,0.14), 0 -1px 0 rgba(224,122,63,0.20)",
          overflow: "hidden",
        }}
      >
        {/* Atmospheric bands — very subtle horizontal drift */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent 0%, transparent 22%, rgba(224,122,63,0.020) 22.6%, transparent 23%)",
            animation: "drift-surface 30s linear infinite",
          }}
        />
        {/* Secondary bands at different speed — adds depth */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent 0%, transparent 38%, rgba(212,169,106,0.014) 38.5%, transparent 39%)",
            animation: "drift-surface 48s linear infinite reverse",
          }}
        />
        {/* Terminator — soft shadow on one side to suggest lit hemisphere */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 22% 38%, transparent 30%, rgba(0,0,0,0.40) 78%)",
          }}
        />
      </div>
    </>
  );
}

/* ─── Orbit Ring ─── */
function OrbitRing() {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 pointer-events-none hidden lg:block"
      style={{ height: 80, zIndex: 4 }}
    >
      <svg
        width="100%"
        height="80"
        viewBox="0 0 1000 80"
        preserveAspectRatio="none"
        style={{ overflow: "visible" }}
      >
        {/* Orbit ellipse — dashed ring around top of planet */}
        <ellipse
          cx="500" cy="80" rx="490" ry="80"
          fill="none"
          stroke="rgba(224,122,63,0.13)"
          strokeWidth="0.8"
          strokeDasharray="4 9"
        />
        {/* Primary glowing dot */}
        <circle r="3.5" fill="#e07a3f" opacity="0.95">
          <filter id="orbitGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <animateMotion
            dur="18s"
            repeatCount="indefinite"
            path="M 10 80 A 490 80 0 0 1 990 80"
          />
        </circle>
        {/* Trailing comet tail */}
        <circle r="2" fill="#e07a3f" opacity="0.45">
          <animateMotion
            dur="18s"
            repeatCount="indefinite"
            begin="-0.6s"
            path="M 10 80 A 490 80 0 0 1 990 80"
          />
        </circle>
        <circle r="1.2" fill="#e07a3f" opacity="0.20">
          <animateMotion
            dur="18s"
            repeatCount="indefinite"
            begin="-1.1s"
            path="M 10 80 A 490 80 0 0 1 990 80"
          />
        </circle>
      </svg>
    </div>
  );
}

/* ─── Neural Network on planet ─── */
type CardPos = "right" | "left" | "above" | "below";

const NET_NODES = [
  {
    id: "core",   label: "",          desc: "",                          unit: "",                      insight: "",
    x: 50, y: 84, isCore: true, color: "#e07a3f", cardPos: "above" as CardPos,
  },
  {
    id: "f0",     label: "ΔF0",       desc: "Indicador de arousal",      unit: "Variación de pitch",
    insight: "Compresión >30% bajo presión indica regulación emocional comprometida",
    x: 18, y: 54, color: "#e07a3f", cardPos: "right" as CardPos,
  },
  {
    id: "pause",  label: "Pausas",    desc: "Predictor de carga cognitiva", unit: "Distribución temporal",
    insight: "Pausa >3s al inicio de confrontación → trabajar gestión del conflicto",
    x: 30, y: 32, color: "#d4a96a", cardPos: "right" as CardPos,
  },
  {
    id: "rhythm", label: "Ritmo",     desc: "Velocidad de emisión",      unit: "Sílabas por segundo",
    insight: "Aceleración sostenida >20% en desacuerdo = activación simpática elevada",
    x: 45, y: 18, color: "#e07a3f", cardPos: "below" as CardPos,
  },
  {
    id: "stress", label: "Estrés",    desc: "Activación del eje HPA",    unit: "Respuesta simpática",
    insight: "Correlaciona con variabilidad de ritmo y micro-pausas involuntarias",
    x: 56, y: 18, color: "#d4a96a", cardPos: "below" as CardPos,
  },
  {
    id: "conf",   label: "Confianza", desc: "Presencia vocal proyectada", unit: "Intensidad sostenida",
    insight: "Reducción de intensidad en desacuerdo legítimo → trabajar asertividad",
    x: 70, y: 32, color: "#e07a3f", cardPos: "left" as CardPos,
  },
  {
    id: "pitch",  label: "Pitch",     desc: "Variación tonal dinámica",  unit: "Rango F0 activo",
    insight: "Voz plana o caótica bajo presión = regulación vocal comprometida",
    x: 82, y: 54, color: "#d4a96a", cardPos: "left" as CardPos,
  },
];

const NET_EDGES = [
  ["core", "f0"], ["core", "pause"], ["core", "rhythm"],
  ["core", "stress"], ["core", "conf"], ["core", "pitch"],
  ["f0", "pause"], ["conf", "pitch"], ["rhythm", "stress"],
];

function NodeCard({ node, visible }: { node: (typeof NET_NODES)[0]; visible: boolean }) {
  const pos = node.cardPos;

  const baseStyle: React.CSSProperties = {
    position: "absolute",
    background: "rgba(12,12,12,0.97)",
    border: `1px solid ${node.color}45`,
    borderRadius: 14,
    padding: "10px 13px",
    pointerEvents: "none",
    zIndex: 30,
    width: 200,
    boxShadow: `0 8px 28px rgba(0,0,0,0.6), 0 0 16px ${node.color}14`,
  };

  const posStyle: React.CSSProperties =
    pos === "right"  ? { left: "calc(100% + 14px)", top: "50%", transform: "translateY(-50%)" } :
    pos === "left"   ? { right: "calc(100% + 14px)", top: "50%", transform: "translateY(-50%)" } :
    pos === "below"  ? { top: "calc(100% + 14px)", left: "50%", transform: "translateX(-50%)" } :
                       { bottom: "calc(100% + 14px)", left: "50%", transform: "translateX(-50%)" };

  const motionInit =
    pos === "right"  ? { opacity: 0, x: -8, scale: 0.95 } :
    pos === "left"   ? { opacity: 0, x:  8, scale: 0.95 } :
    pos === "below"  ? { opacity: 0, y: -6, scale: 0.95 } :
                       { opacity: 0, y:  6, scale: 0.95 };

  const motionAnim = { opacity: 1, x: 0, y: 0, scale: 1 };

  return (
    <AnimatePresence>
      {visible && node.desc && (
        <motion.div
          initial={motionInit}
          animate={motionAnim}
          exit={{ ...motionInit, transition: { duration: 0.1 } }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          style={{ ...baseStyle, ...posStyle }}
        >
          {/* Label row */}
          <div className="flex items-center gap-2 mb-1.5">
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: node.color, flexShrink: 0 }} />
            <span style={{
              color: node.color,
              fontSize: 10,
              fontWeight: 700,
              fontFamily: "var(--font-dm-mono)",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
            }}>
              {node.label}
            </span>
            <span style={{
              marginLeft: "auto",
              color: `${node.color}70`,
              fontSize: 9,
              fontFamily: "var(--font-dm-mono)",
            }}>
              {node.unit}
            </span>
          </div>

          {/* Description */}
          <div style={{
            color: "#f5f0e8",
            fontSize: 11.5,
            fontFamily: "var(--font-dm-sans)",
            fontWeight: 500,
            lineHeight: 1.4,
            marginBottom: 8,
          }}>
            {node.desc}
          </div>

          {/* Insight */}
          <div style={{
            color: "#f5f0e8",
            fontSize: 9.5,
            fontFamily: "var(--font-dm-mono)",
            lineHeight: 1.5,
            padding: "6px 8px",
            background: `${node.color}12`,
            borderLeft: `2px solid ${node.color}60`,
            borderRadius: "0 6px 6px 0",
          }}>
            {node.insight}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NeuralNet() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 1000, h: 220 });
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setDims({ w: containerRef.current.offsetWidth, h: containerRef.current.offsetHeight });
      }
    };
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const getPos = (node: (typeof NET_NODES)[0]) => ({
    x: (node.x / 100) * dims.w,
    y: (node.y / 100) * dims.h,
  });

  return (
    <div
      ref={containerRef}
      className="absolute bottom-0 left-0 right-0 hidden lg:block"
      style={{ height: 220, zIndex: 5 }}
    >
      {/* Edges */}
      <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
        {NET_EDGES.map(([fromId, toId], i) => {
          const fromNode = NET_NODES.find((n) => n.id === fromId)!;
          const toNode   = NET_NODES.find((n) => n.id === toId)!;
          const from = getPos(fromNode);
          const to   = getPos(toNode);
          const isActive = hovered === fromId || hovered === toId;
          return (
            <motion.line
              key={i}
              x1={from.x} y1={from.y}
              x2={to.x}   y2={to.y}
              stroke={isActive ? "rgba(224,122,63,0.75)" : "rgba(224,122,63,0.22)"}
              strokeWidth={isActive ? 1.3 : 0.85}
              strokeDasharray="3 5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, strokeDashoffset: [0, -32] }}
              transition={{
                opacity: { delay: 0.9 + i * 0.07, duration: 0.5 },
                strokeDashoffset: { duration: 4 + i * 0.25, repeat: Infinity, ease: "linear" },
              }}
            />
          );
        })}
      </svg>

      {/* Nodes */}
      {NET_NODES.map((node, i) => {
        const pos   = getPos(node);
        const isHov = hovered === node.id;
        return (
          <motion.div
            key={node.id}
            className="absolute"
            style={{ left: pos.x, top: pos.y, transform: "translate(-50%, -50%)", zIndex: 10 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 + i * 0.09, duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
            onMouseEnter={() => setHovered(node.id)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Rich info card */}
            <NodeCard node={node} visible={isHov} />

            {node.isCore ? (
              <div
                className="node-pulse w-4 h-4 rounded-full cursor-default"
                style={{ background: "#e07a3f", boxShadow: "0 0 20px rgba(224,122,63,0.75)" }}
              />
            ) : (
              <div className="flex flex-col items-center cursor-pointer" style={{ position: "relative" }}>
                {/* Sonar ring — periodic attention ping */}
                <div
                  style={{
                    position: "absolute",
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    border: `1px solid ${node.color}`,
                    top: "50%",
                    left: "50%",
                    animation: `node-ring 3.6s ease-out ${i * 0.55}s infinite`,
                    pointerEvents: "none",
                  }}
                />
                {/* Second ring — offset for depth */}
                <div
                  style={{
                    position: "absolute",
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    border: `1px solid ${node.color}70`,
                    top: "50%",
                    left: "50%",
                    animation: `node-ring 3.6s ease-out ${i * 0.55 + 0.8}s infinite`,
                    pointerEvents: "none",
                  }}
                />
                {/* Node dot */}
                <motion.div
                  animate={isHov ? {} : { opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2.6 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    width: isHov ? 12 : 9,
                    height: isHov ? 12 : 9,
                    borderRadius: "50%",
                    background: isHov ? node.color : `${node.color}70`,
                    boxShadow: isHov ? `0 0 14px ${node.color}, 0 0 28px ${node.color}50` : `0 0 6px ${node.color}40`,
                    transition: "width 0.2s ease, height 0.2s ease, background 0.2s ease, box-shadow 0.2s ease",
                    position: "relative",
                    zIndex: 2,
                  }}
                />
                {/* Label */}
                <span
                  className="mt-1.5 uppercase tracking-wider whitespace-nowrap transition-all duration-200"
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    fontFamily: "var(--font-dm-mono)",
                    color: isHov ? node.color : `${node.color}70`,
                    letterSpacing: "0.12em",
                  }}
                >
                  {node.label}
                </span>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─── Voice Wave ─── */
function VoiceWave() {
  const bars = Array.from({ length: 48 }, (_, i) => {
    const x = i / 48;
    const h = Math.abs(Math.sin(x * Math.PI * 4.5) * 68 + Math.sin(x * Math.PI * 9) * 22) + 8;
    return Math.min(Math.max(h, 6), 100);
  });
  return (
    <div className="wave-container flex items-end justify-center gap-[3px] h-8 cursor-default select-none w-56">
      {bars.map((h, i) => (
        <div
          key={i}
          className="wave-bar rounded-full"
          style={{
            width: "3px",
            height: `${h}%`,
            background: "#e07a3f",
            opacity: 0.25 + (h / 100) * 0.50,
            animationDelay: `${(i * 0.038).toFixed(2)}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Main ─── */
export default function HeroSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "hero-waitlist", timestamp: new Date().toISOString() }),
      });
      if (!res.ok) {
        setStatus("error");
      } else {
        setStatus("done");
      }
    } catch (err) {
      console.error("[waitlist] fetch error:", err);
      setStatus("error");
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-40 sm:pb-44 md:pb-48 lg:pb-56 overflow-hidden bg-[#0a0a0a]">
      <StarField />
      <Planet />
      <OrbitRing />
      <NeuralNet />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto w-full">

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4.25rem] 2xl:text-[5rem] font-bold leading-[1.05] tracking-tight text-[#f5f0e8] mb-5"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Comete el error
          <br />
          antes de que{" "}
          <span
            className="inline-block px-3 py-1 rounded-[12px] text-[#0f0f0f]"
            style={{ background: "#e07a3f" }}
          >
            cueste caro.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.14, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          className="text-sm sm:text-base lg:text-lg text-[#f5f0e8]/50 max-w-xl leading-relaxed mb-7"
        >
          La primera IA que entrena tus Human Skills analizando tu{" "}
          <strong className="text-[#f5f0e8] font-semibold">voz</strong>, no solo tus palabras.
          Sin sesgos culturales. Sin riesgos reales.
        </motion.p>

        {/* Voice wave */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.22 }}
          className="flex flex-col items-center gap-2 mb-8"
        >
          <VoiceWave />
          <p className="text-[9px] text-[#f5f0e8]/20 tracking-[0.2em] uppercase" style={{ fontFamily: "var(--font-dm-mono)" }}>
            Análisis paralingüístico · Tiempo real
          </p>
        </motion.div>

        {/* Waitlist form */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          className="w-full max-w-xs sm:max-w-sm md:max-w-md"
        >
          {status === "error" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 px-5 py-4 rounded-[16px] bg-red-500/10 border border-red-500/25"
            >
              <p className="text-sm text-[#f5f0e8]/80">
                Algo salió mal.{" "}
                <button onClick={() => setStatus("idle")} className="underline hover:text-[#e07a3f]">
                  Intentar de nuevo
                </button>
              </p>
            </motion.div>
          ) : status === "done" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 px-5 py-4 rounded-[16px] bg-[#e07a3f]/10 border border-[#e07a3f]/25"
            >
              <div className="w-6 h-6 rounded-full bg-[#e07a3f] flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 12 12" className="w-3 h-3">
                  <path d="M2 6l3 3 5-5" stroke="#0f0f0f" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-sm text-[#f5f0e8] font-semibold">
                Estás en la lista. Te avisamos cuando abramos.
              </p>
            </motion.div>
          ) : (
            <form id="waitlist" onSubmit={handleSubmit}>
              <div
                className="flex items-center rounded-[16px] bg-[#1a1a1a] border border-[#e07a3f]/20 p-1.5"
                style={{ boxShadow: "0 0 0 1px rgba(224,122,63,0.06), 0 4px 24px rgba(0,0,0,0.3)" }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className="flex-1 bg-transparent px-4 py-2.5 text-sm text-[#f5f0e8] placeholder:text-[#f5f0e8]/28 outline-none min-w-0"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={status === "loading"}
                  className="flex-shrink-0 px-5 py-2.5 rounded-[11px] text-sm font-bold text-[#f5f0e8] bg-[#e07a3f] hover:bg-[#b05a25] transition-colors duration-300 disabled:opacity-60 whitespace-nowrap"
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    boxShadow: "0 0 22px rgba(224,122,63,0.38), 0 4px 12px rgba(224,122,63,0.20)",
                  }}
                >
                  {status === "loading" ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" strokeDasharray="40" strokeDashoffset="10" />
                      </svg>
                      Un momento...
                    </span>
                  ) : (
                    "Reservar mi lugar →"
                  )}
                </motion.button>
              </div>
              <p className="text-center text-[10px] text-[#f5f0e8]/22 mt-3" style={{ fontFamily: "var(--font-dm-mono)" }}>
                Sin tarjeta · Sin compromiso · 100% privado
              </p>
            </form>
          )}
        </motion.div>

      </div>
    </section>
  );
}
