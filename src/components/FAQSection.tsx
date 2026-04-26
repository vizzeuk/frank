"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const FAQS = [
  {
    question: "¿Cómo protege Frank mis datos de voz?",
    answer:
      "Tu audio nunca se almacena como grabación. En el momento de la captura, Frank convierte la señal acústica en vectores numéricos de alta dimensión. Estos vectores son cifrados con AES-256 y vinculados exclusivamente a tu cuenta. Es técnicamente imposible reconstruir tu voz a partir de los datos que guardamos.",
    tag: "Privacidad",
    tagColor: "#e07a3f",
    tagBg: "rgba(224,122,63,0.10)",
  },
  {
    question: "¿Funciona en cualquier idioma y acento?",
    answer:
      "Sí. Gracias al sistema de Línea Base Individual, Frank no compara tu voz con ningún estándar global — aprende TUS patrones en TU idioma. El análisis paralingüístico trasciende el idioma: el estrés vocal suena igual en Caracas que en Tokio.",
    tag: "Alcance global",
    tagColor: "#d4a96a",
    tagBg: "rgba(212,169,106,0.10)",
  },
  {
    question: "¿Qué diferencia a Frank de apps de coaching de voz?",
    answer:
      "Las apps genéricas te comparan con estándares de 'habla perfecta' definidos por poblaciones occidentales de habla inglesa. Frank no tiene un ideal externo. Analiza tu desviación de tu propio baseline en conversaciones de alta presión, en tiempo real.",
    tag: "Diferenciador",
    tagColor: "#d4a96a",
    tagBg: "rgba(212,169,106,0.10)",
  },
  {
    question: "¿Cuántas sesiones necesito antes de ver resultados?",
    answer:
      "Usuarios reportan cambios perceptibles a partir de la tercera sesión (90 minutos de práctica total). Los datos del Dashboard muestran evolución desde la primera sesión. Cambios de comportamiento medibles en contextos reales aparecen entre las semanas 3 y 6 de uso consistente.",
    tag: "Resultados",
    tagColor: "#e07a3f",
    tagBg: "rgba(224,122,63,0.10)",
  },
  {
    question: "¿Puedo usar Frank si tengo una voz atípica?",
    answer:
      "Absolutamente. El diseño de Línea Base Individual fue concebido precisamente para eliminar este sesgo. Frank no juzga tu voz — aprende de ella. Usuarios con disfluencias, acentos marcados o condiciones como disartria leve han encontrado Frank especialmente valioso.",
    tag: "Inclusividad",
    tagColor: "#e07a3f",
    tagBg: "rgba(224,122,63,0.10)",
  },
  {
    question: "¿Cuál es el modelo de precios para empresas?",
    answer:
      "Ofrecemos licencias por asiento para equipos de 10+ personas, con dashboard centralizado de RRHH, reportes de evolución por área y acceso a API para integración con HRIS (SAP, Workday, BambooHR). Los precios dependen del tamaño del equipo. Agenda una demo y enviamos propuesta en 24h.",
    tag: "Empresas",
    tagColor: "#d4a96a",
    tagBg: "rgba(212,169,106,0.10)",
  },
];

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: (typeof FAQS)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`rounded-[18px] border transition-all duration-300 overflow-hidden ${
        isOpen
          ? "border-[#e07a3f]/35 bg-[#1a1a1a]"
          : "border-[#e07a3f]/12 bg-[#1a1a1a]/60 hover:border-[#e07a3f]/25 hover:bg-[#1a1a1a]"
      }`}
    >
      <button onClick={onToggle} className="w-full flex items-start gap-4 px-5 py-5 text-left">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
              style={{
                color: faq.tagColor,
                background: faq.tagBg,
                fontFamily: "var(--font-dm-mono)",
              }}
            >
              {faq.tag}
            </span>
          </div>
          <span className="text-sm font-bold text-[#f5f0e8]/85 leading-snug" style={{ fontFamily: "var(--font-dm-sans)" }}>
            {faq.question}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.22 }}
          className="flex-shrink-0 mt-0.5 w-7 h-7 rounded-full border border-[#e07a3f]/25 flex items-center justify-center"
          style={{ background: isOpen ? "rgba(224,122,63,0.12)" : "transparent" }}
        >
          <svg viewBox="0 0 10 10" className="w-2.5 h-2.5 text-[#e07a3f]">
            <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm text-[#f5f0e8]/55 leading-relaxed">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-28 px-6 bg-[#0f0f0f] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-px bg-gradient-to-r from-transparent via-[#e07a3f]/20 to-transparent" />

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="text-center mb-12"
        >
          <h2
            className="text-4xl md:text-5xl font-bold mb-4 text-[#f5f0e8] tracking-tight"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Preguntas frecuentes
          </h2>
          <p className="text-base text-[#f5f0e8]/45">
            ¿Algo que no está aquí?{" "}
            <a href="mailto:hola@frank.ai" className="text-[#f5f0e8] underline font-medium hover:text-[#e07a3f]">
              Escríbenos
            </a>
          </p>
        </motion.div>

        {/* FAQ items */}
        <div className="flex flex-col gap-2.5">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            >
              <FAQItem
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
