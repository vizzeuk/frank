"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

/* ─── Types ─── */
type TabId = "talent" | "training" | "coaching";

interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
  type: "input" | "process" | "output";
  highlight?: boolean;
}

interface GraphEdge {
  from: string;
  to: string;
}

interface TabData {
  id: TabId;
  label: string;
  triggerLabel: string;
  triggerDetail: string;
  terminalLines: string[];
  nodes: GraphNode[];
  edges: GraphEdge[];
}

/* ─── Tab data ─── */
const TABS: TabData[] = [
  {
    id: "talent",
    label: "SELECCIÓN DE TALENTO",
    triggerLabel: "Entrevista iniciada",
    triggerDetail: "María G. · Rol: Senior PM",
    terminalLines: [
      "> Conectando con sesión #47...",
      "> Candidata: María García  |  Rol: Senior PM",
      "> Cargando línea base individual...  ✓",
      "",
      "> Procesando fragmento  00:00 – 00:03.8",
      "  stress_index    →  0.34   (umbral: 0.65)  ✓",
      '  vocal_affect    →  "focus"  (confianza alta)',
      "  pause_ratio     →  0.18   (óptimo: 0.12–0.22)  ✓",
      "  pitch_variance  →  87.4 Hz",
      "",
      "> Score de aptitud comunicativa:  7.8 / 10",
      "> Estado:  RECOMENDADA  para siguiente fase",
    ],
    nodes: [
      { id: "session", label: "ENTREVISTA #47", x: 12, y: 12, type: "input" },
      { id: "candidate", label: "CANDIDATA: MARÍA G.", x: 58, y: 8, type: "input" },
      { id: "baseline", label: "LÍNEA BASE VOCAL", x: 12, y: 42, type: "process" },
      { id: "analysis", label: "ANÁLISIS VOCAL", x: 55, y: 40, type: "process", highlight: true },
      { id: "affect", label: "AFECTO: CONFIANZA", x: 12, y: 70, type: "process" },
      { id: "score", label: "SCORE: 7.8/10", x: 55, y: 70, type: "output", highlight: true },
      { id: "result", label: "APTA · SIGUIENTE FASE", x: 30, y: 92, type: "output" },
    ],
    edges: [
      { from: "session", to: "analysis" },
      { from: "candidate", to: "analysis" },
      { from: "baseline", to: "analysis" },
      { from: "analysis", to: "affect" },
      { from: "analysis", to: "score" },
      { from: "affect", to: "result" },
      { from: "score", to: "result" },
    ],
  },
  {
    id: "training",
    label: "CAPACITACIÓN DE EQUIPOS",
    triggerLabel: "Sesión de práctica",
    triggerDetail: "Carlos M. · Módulo: Feedback difícil",
    terminalLines: [
      "> Sesión #12  |  Carlos M.",
      "> Módulo: Feedback en conversación difícil",
      "> Comparando vs. línea base — Sesión #1...",
      "",
      "  estrés vocal    →  41%  →  22%   (↓ 46%)  ✓",
      "  pausas estrat.  →  1.2  →  3.8 /min  (↑ 217%)  ✓",
      "  confianza proy. →  5.1  →  7.9   (↑ 55%)  ✓",
      "  ritmo de habla  →  168  →  142 ppm  ✓",
      "",
      "> Alerta: velocidad elevada en t=1:23",
      "> Sugerencia: Pausa pre-respuesta  0.3s → 0.9s",
    ],
    nodes: [
      { id: "session12", label: "SESIÓN #12", x: 12, y: 10, type: "input" },
      { id: "module", label: "MÓDULO: FEEDBACK", x: 58, y: 8, type: "input" },
      { id: "baseline2", label: "SESIÓN #1 (BASE)", x: 12, y: 40, type: "process" },
      { id: "compare", label: "ANÁLISIS COMPARATIVO", x: 52, y: 38, type: "process", highlight: true },
      { id: "delta", label: "DELTA: +55% CONFIANZA", x: 12, y: 68, type: "output" },
      { id: "alert", label: "ALERTA: RITMO ELEVADO", x: 55, y: 68, type: "process", highlight: true },
      { id: "plan", label: "PLAN ACTUALIZADO", x: 30, y: 90, type: "output" },
    ],
    edges: [
      { from: "session12", to: "compare" },
      { from: "module", to: "compare" },
      { from: "baseline2", to: "compare" },
      { from: "compare", to: "delta" },
      { from: "compare", to: "alert" },
      { from: "delta", to: "plan" },
      { from: "alert", to: "plan" },
    ],
  },
  {
    id: "coaching",
    label: "EXECUTIVE COACHING",
    triggerLabel: "Sesión ejecutiva",
    triggerDetail: "Ana Torres · CEO · Inversores",
    terminalLines: [
      "> Perfil ejecutivo  |  Ana Torres  |  CEO",
      "> Simulación: Presentación a inversores",
      "> Analizando performance en tiempo real...",
      "",
      "  autoridad_vocal →  8.4/10  ✓",
      "  control_emoc.   →  7.9/10  ✓",
      "  engagement       →  6.2/10  ⚠  (umbral: 7.0)",
      "  credibilidad     →  8.1/10  ✓",
      "",
      "> Alerta: descenso de tono en puntos clave",
      "> Insight: Mayor énfasis en métricas financieras",
    ],
    nodes: [
      { id: "exec", label: "ANA TORRES · CEO", x: 12, y: 10, type: "input" },
      { id: "sim", label: "SIMULACIÓN INVERSORES", x: 55, y: 8, type: "input" },
      { id: "realtime", label: "ANÁLISIS EN VIVO", x: 12, y: 40, type: "process", highlight: true },
      { id: "engagement", label: "ENGAGEMENT: 6.2 ⚠", x: 55, y: 40, type: "process", highlight: true },
      { id: "authority", label: "AUTORIDAD: 8.4 ✓", x: 12, y: 70, type: "output" },
      { id: "alert2", label: "ALERTA: TONO", x: 55, y: 70, type: "process" },
      { id: "report", label: "REPORTE EJECUTIVO", x: 30, y: 90, type: "output" },
    ],
    edges: [
      { from: "exec", to: "realtime" },
      { from: "sim", to: "realtime" },
      { from: "realtime", to: "engagement" },
      { from: "realtime", to: "authority" },
      { from: "engagement", to: "alert2" },
      { from: "authority", to: "report" },
      { from: "alert2", to: "report" },
    ],
  },
];

/* ─── Terminal Panel ─── */
function TerminalPanel({ tab }: { tab: TabData }) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [lineIndex, setLineIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setVisibleLines([]);
    setLineIndex(0);
  }, [tab.id]);

  useEffect(() => {
    if (lineIndex >= tab.terminalLines.length) return;
    const delay = tab.terminalLines[lineIndex] === "" ? 80 : 120;
    timerRef.current = setTimeout(() => {
      setVisibleLines((prev) => [...prev, tab.terminalLines[lineIndex]]);
      setLineIndex((prev) => prev + 1);
    }, delay);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [lineIndex, tab.terminalLines, tab.id]);

  return (
    <div className="relative h-full flex flex-col bg-[#0C1522] overflow-hidden">
      {/* Terminal top bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 flex-shrink-0">
        <div className="flex gap-1.5">
          {["#FF5F56", "#FFBD2E", "#27C93F"].map((c, i) => (
            <div key={i} className="w-3 h-3 rounded-full" style={{ background: c, opacity: 0.8 }} />
          ))}
        </div>
        <span className="text-[11px] text-white/25" style={{ fontFamily: "var(--font-dm-mono)" }}>
          frank.ai / vocal-analysis
        </span>
        <div className="w-16" />
      </div>

      {/* Code output */}
      <div className="flex-1 overflow-hidden px-5 py-4">
        <div className="flex flex-col gap-0.5">
          {visibleLines.map((line, i) => (
            <div key={i}>
              {line === "" ? (
                <div className="h-3" />
              ) : (
                <span
                  className={`text-[12.5px] leading-relaxed block ${
                    line.startsWith(">")
                      ? "text-[#A2D2FF]"
                      : line.includes("✓")
                      ? "text-[#B7E4C7]"
                      : line.includes("⚠") || line.includes("Alerta")
                      ? "text-[#FFD580]"
                      : line.includes("Sugerencia") || line.includes("Insight")
                      ? "text-[#A2D2FF]/70"
                      : "text-white/55"
                  }`}
                  style={{ fontFamily: "var(--font-dm-mono)" }}
                >
                  {line}
                </span>
              )}
            </div>
          ))}
          {lineIndex < tab.terminalLines.length && (
            <span className="text-[#A2D2FF] cursor-blink text-sm" style={{ fontFamily: "var(--font-dm-mono)" }}>
              _
            </span>
          )}
        </div>
      </div>

      {/* Trigger card */}
      <div className="absolute bottom-5 left-4">
        <motion.div
          key={tab.id}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="rounded-[16px] px-4 py-3 border"
          style={{
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(12px)",
            borderColor: "rgba(162,210,255,0.18)",
            maxWidth: "220px",
          }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-5 h-5 rounded-full bg-[#A2D2FF]/30 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#A2D2FF] animate-pulse" />
            </div>
            <span className="text-[10px] font-semibold text-white/50 uppercase tracking-wider" style={{ fontFamily: "var(--font-dm-mono)" }}>
              Frank Studio
            </span>
            <span className="text-[10px] text-white/25" style={{ fontFamily: "var(--font-dm-mono)" }}>
              Ahora
            </span>
          </div>
          <p className="text-xs text-white/75 leading-relaxed font-medium">
            {tab.triggerDetail}
          </p>
        </motion.div>

        {/* DISPARADOR label */}
        <div className="flex items-center gap-1.5 mt-2 ml-1">
          <div className="w-4 h-px bg-white/25" />
          <span className="text-[9px] font-bold tracking-[0.15em] text-white/25 uppercase" style={{ fontFamily: "var(--font-dm-mono)" }}>
            Disparador
          </span>
        </div>
      </div>

      {/* ANÁLISIS label */}
      <div className="absolute top-16 right-4">
        <span className="text-[9px] font-bold tracking-[0.15em] text-white/25 uppercase" style={{ fontFamily: "var(--font-dm-mono)" }}>
          Análisis Vocal
        </span>
        <div className="w-full h-px bg-white/20 mt-1" />
      </div>
    </div>
  );
}

/* ─── Neural Graph Panel ─── */
function NeuralGraphPanel({ tab }: { tab: TabData }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 300, h: 400 });

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

  const getPos = (node: GraphNode) => ({
    x: (node.x / 100) * dims.w,
    y: (node.y / 100) * dims.h,
  });

  const nodeColors = {
    input: { bg: "rgba(27,38,59,0.06)", border: "rgba(27,38,59,0.15)", text: "#1B263B" },
    process: { bg: "rgba(162,210,255,0.12)", border: "rgba(91,170,255,0.3)", text: "#A2D2FF" },
    output: { bg: "rgba(183,228,199,0.18)", border: "rgba(47,158,106,0.3)", text: "#2F9E6A" },
  };

  return (
    <div
      ref={containerRef}
      className="relative flex-1 bg-[#F5F0E8] overflow-hidden"
      style={{ minHeight: 380 }}
    >
      {/* SVG edges */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        <defs>
          <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
            <polygon points="0 0, 6 2, 0 4" fill="rgba(36,121,199,0.35)" />
          </marker>
        </defs>
          {tab.edges.map((edge, i) => {
            const fromNode = tab.nodes.find((n) => n.id === edge.from);
            const toNode = tab.nodes.find((n) => n.id === edge.to);
            if (!fromNode || !toNode) return null;
            const from = getPos(fromNode);
            const to = getPos(toNode);
            const cx = (from.x + to.x) / 2;
            return (
              <motion.path
                key={`${tab.id}-${i}`}
                d={`M${from.x},${from.y} Q${cx},${from.y} ${to.x},${to.y}`}
                fill="none"
                stroke="rgba(36,121,199,0.25)"
                strokeWidth="1"
                strokeDasharray="4 3"
                markerEnd="url(#arrowhead)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: i * 0.07 }}
              />
            );
          })}
      </svg>

      {/* Nodes */}
      <AnimatePresence>
        {tab.nodes.map((node, i) => {
          const pos = getPos(node);
          const colors = nodeColors[node.type];
          return (
            <motion.div
              key={`${tab.id}-${node.id}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className={`absolute flex items-center justify-center ${node.highlight ? "node-pulse" : ""}`}
              style={{
                left: pos.x,
                top: pos.y,
                transform: "translate(-50%, -50%)",
                zIndex: 2,
              }}
            >
              <div
                className="px-3 py-1.5 rounded-lg text-center whitespace-nowrap"
                style={{
                  background: colors.bg,
                  border: `1px solid ${colors.border}`,
                  boxShadow: node.highlight ? `0 0 12px ${colors.border}` : "none",
                }}
              >
                <span
                  className="text-[10px] font-bold tracking-wide"
                  style={{ color: colors.text, fontFamily: "var(--font-dm-mono)" }}
                >
                  {node.label}
                </span>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* RESULTADO label */}
      <div className="absolute bottom-4 right-4 flex items-center gap-1.5">
        <div className="h-px w-4 bg-[#2F9E6A]/40" />
        <span
          className="text-[9px] font-bold tracking-[0.15em] text-[#2F9E6A]/60 uppercase"
          style={{ fontFamily: "var(--font-dm-mono)" }}
        >
          Resultado
        </span>
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(36,121,199,0.08) 1px, transparent 0)",
          backgroundSize: "28px 28px",
          zIndex: 0,
        }}
      />
    </div>
  );
}

/* ─── Main Section ─── */
export default function B2BSection() {
  const [activeTabId, setActiveTabId] = useState<TabId>("talent");
  const activeTab = TABS.find((t) => t.id === activeTabId)!;

  const stats = [
    { value: "$1.2M", label: "Costo promedio de una mala contratación senior" },
    { value: "73%", label: "De líderes fracasan por Human Skills, no por expertise técnico" },
    { value: "0 métricas", label: "Tienen la mayoría de programas de capacitación actuales" },
  ];

  return (
    <section id="empresa" className="relative py-28 px-6 bg-white overflow-hidden">
      {/* Subtle top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-[#A2D2FF]/30 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5F0E8] border border-[#A2D2FF]/30 mb-6">
            <span className="text-xs font-semibold text-[#A2D2FF]">Para Directores de RRHH y Talent</span>
          </div>
          <h2
            className="text-4xl md:text-6xl font-bold mb-5 text-[#1B263B] tracking-tight leading-[1.05]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Convierte la intuición
            <br />
            <span className="inline-block bg-[#A2D2FF] text-[#1B263B] px-3 rounded-[10px]">en datos objetivos.</span>
          </h2>
          <p className="text-lg text-[#1B263B]/50 max-w-2xl mx-auto leading-relaxed">
            Filtra talento y capacita equipos con métricas objetivas de inteligencia interpersonal. Sin sesgos de género, cultura ni entrevistador.
          </p>
        </motion.div>

        {/* ─── Main showcase (Sanity-inspired) ─── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="mb-16 rounded-[24px] overflow-hidden border border-[#A2D2FF]/20 shadow-xl"
          style={{ boxShadow: "0 8px 48px rgba(27,38,59,0.1), 0 2px 8px rgba(27,38,59,0.06)" }}
        >
          {/* Main panels */}
          <div className="flex flex-col lg:flex-row" style={{ minHeight: 420 }}>
            {/* Terminal (dark) */}
            <div className="lg:w-[58%] flex-shrink-0" style={{ minHeight: 380 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTabId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="h-full"
                  style={{ minHeight: 380 }}
                >
                  <TerminalPanel tab={activeTab} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Divider */}
            <div className="w-px bg-gradient-to-b from-white/10 via-white/5 to-white/10 hidden lg:block" />

            {/* Graph (light) */}
            <div className="flex-1 flex" style={{ minHeight: 380 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTabId + "-graph"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex-1 flex"
                >
                  <NeuralGraphPanel tab={activeTab} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Tab bar */}
          <div className="flex border-t border-[#A2D2FF]/15 bg-[#F5F0E8]/60 overflow-x-auto">
            {TABS.map((tab, i) => (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`relative flex items-center gap-2 px-6 py-4 text-xs font-bold tracking-[0.1em] whitespace-nowrap transition-colors duration-200 flex-1 justify-center ${
                  activeTabId === tab.id
                    ? "text-[#1B263B] bg-white border-r border-[#A2D2FF]/15"
                    : "text-[#1B263B]/35 hover:text-[#1B263B]/65"
                } ${i < TABS.length - 1 ? "border-r border-[#A2D2FF]/10" : ""}`}
                style={{ fontFamily: "var(--font-dm-mono)" }}
              >
                {activeTabId === tab.id && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A2D2FF]"
                  />
                )}
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ─── Stats + Value props ─── */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="flex flex-col gap-4"
          >
            <h3 className="text-sm font-semibold text-[#1B263B]/35 uppercase tracking-widest mb-2" style={{ fontFamily: "var(--font-dm-mono)" }}>
              El problema que resolvemos
            </h3>
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="flex items-start gap-4 p-5 rounded-[20px] bg-[#F5F0E8] border border-[#A2D2FF]/15"
              >
                <span
                  className="text-2xl font-bold text-[#1B263B] flex-shrink-0 leading-none pt-0.5"
                  style={{ fontFamily: "var(--font-dm-mono)" }}
                >
                  {s.value}
                </span>
                <p className="text-sm text-[#1B263B]/50 leading-relaxed">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Value props */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="flex flex-col gap-6"
          >
            <h3 className="text-sm font-semibold text-[#1B263B]/35 uppercase tracking-widest mb-2" style={{ fontFamily: "var(--font-dm-mono)" }}>
              Lo que Frank entrega
            </h3>
            {[
              {
                title: "Métricas objetivas y auditables",
                desc: "Cada decisión de talento respaldada por datos paralingüísticos, no por corazonadas.",
                icon: (
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className="w-4 h-4">
                    <rect x="3" y="12" width="3" height="5" rx="1" />
                    <rect x="8.5" y="8" width="3" height="9" rx="1" />
                    <rect x="14" y="4" width="3" height="13" rx="1" />
                  </svg>
                ),
              },
              {
                title: "Libre de sesgo cultural y de género",
                desc: "La Línea Base Individual de Frank elimina los sesgos que afectan a herramientas genéricas.",
                icon: (
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className="w-4 h-4">
                    <circle cx="10" cy="10" r="7" />
                    <path d="M7 10l2 2 4-4" />
                  </svg>
                ),
              },
              {
                title: "ROI medible desde la primera sesión",
                desc: "Dashboard de evolución por empleado. Reportes exportables para comités directivos.",
                icon: (
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className="w-4 h-4">
                    <path d="M3 14l4-4 4 3 5-7" />
                  </svg>
                ),
              },
            ].map((prop) => (
              <div key={prop.title} className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded-[10px] flex items-center justify-center bg-[#A2D2FF]/15 text-[#1B263B] flex-shrink-0 border border-[#A2D2FF]/30">
                  {prop.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1B263B]/85 mb-1">{prop.title}</h4>
                  <p className="text-sm text-[#1B263B]/45 leading-relaxed">{prop.desc}</p>
                </div>
              </div>
            ))}

            <motion.a
              href="#waitlist"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="self-start mt-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-[#1B263B] hover:bg-[#A2D2FF] transition-colors duration-300 shadow-sm"
            >
              Solicitar demo empresarial
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
