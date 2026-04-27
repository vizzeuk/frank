"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const FAQS = [
  {
    question: "¿Cómo funciona una sesión de Frank?",
    answer:
      "Eliges un escenario: una evaluación de desempeño, una negociación, un cliente difícil. El interlocutor de IA reacciona en tiempo real con la presión emocional del contexto. Al terminar, el Dashboard descompone tu desempeño: tono, ritmo, pausas, coherencia bajo estrés. No hay script correcto. Te mostramos tu comportamiento real y cómo evoluciona.",
    tag: "Producto",
    tagColor: "#e07a3f",
    tagBg: "rgba(224,122,63,0.10)",
  },
  {
    question: "¿Cómo protege Frank mis datos de voz?",
    answer:
      "Tus grabaciones no se comparten, no se venden y no se usan para entrenar modelos de terceros. El análisis ocurre en servidores encriptados y tú controlas tu historial desde la cuenta. Si quieres borrar todo, es un clic.",
    tag: "Privacidad",
    tagColor: "#e07a3f",
    tagBg: "rgba(224,122,63,0.10)",
  },
  {
    question: "¿Funciona en cualquier idioma?",
    answer:
      "Sí. Frank analiza cómo hablas, no qué dices. El sistema mide patrones acústicos: tensión vocal, ritmo, pausas, variación de tono. Esos fenómenos no dependen del idioma. Lo que Frank aprende de tu voz en español funciona igual que lo que aprendería en inglés, portugués o cualquier otro idioma. No hay un acento correcto ni un estándar de referencia externo.",
    tag: "Alcance global",
    tagColor: "#d4a96a",
    tagBg: "rgba(212,169,106,0.10)",
  },
  {
    question: "¿Qué diferencia a Frank de apps de coaching de voz?",
    answer:
      "Las apps de coaching miden tu voz contra un estándar de \"habla perfecta\" diseñado para otro idioma, otra cultura y otro contexto. Frank no tiene ideal externo. Mide tu desviación respecto a tu propio baseline, en conversaciones de alta presión, en tiempo real. La comparación eres tú ayer versus tú hoy.",
    tag: "Diferenciador",
    tagColor: "#d4a96a",
    tagBg: "rgba(212,169,106,0.10)",
  },
  {
    question: "¿Cuántas sesiones necesito antes de ver resultados?",
    answer:
      "Desde la primera sesión el Dashboard ya te está mostrando datos: cómo varía tu tono bajo presión, dónde aparecen las pausas, qué pasa con tu ritmo cuando la conversación se complica. No tienes que esperar para saber si algo está cambiando. Lo que tarda más en llegar son los cambios de comportamiento fuera de Frank, en conversaciones reales. Ese tipo de transferencia depende de la consistencia de práctica, no del número de sesiones.",
    tag: "Resultados",
    tagColor: "#e07a3f",
    tagBg: "rgba(224,122,63,0.10)",
  },
  {
    question: "¿Puedo usar Frank si tengo una voz atípica?",
    answer:
      "Sí, y no es un eufemismo. Frank no tiene una voz ideal en la cabeza. El sistema aprende tus patrones específicos y mide variaciones respecto a ellos. Un acento marcado, una disfluencia o cualquier particularidad vocal no son ruido para Frank, son el punto de partida.",
    tag: "Inclusividad",
    tagColor: "#e07a3f",
    tagBg: "rgba(224,122,63,0.10)",
  },
  {
    question: "¿Frank reemplaza al coaching humano?",
    answer:
      "No, y no pretende hacerlo. Frank resuelve el problema del volumen de práctica: ningún coach puede darte 40 conversaciones difíciles por semana. Frank sí.",
    tag: "Alcance",
    tagColor: "#d4a96a",
    tagBg: "rgba(212,169,106,0.10)",
  },
  {
    question: "¿Cuál es el modelo de precios para empresas?",
    answer:
      "Ofrecemos licencias por asiento para equipos de 10 o más personas, con dashboard centralizado de RRHH, reportes de evolución por área y acceso a API para integración con HRIS (SAP, Workday, BambooHR). Los precios dependen del tamaño del equipo. Agenda una demo y coordinamos desde ahí.",
    tag: "Empresas",
    tagColor: "#d4a96a",
    tagBg: "rgba(212,169,106,0.10)",
  },
  {
    question: "¿Necesito experiencia técnica para usar Frank?",
    answer:
      "Nada. Si puedes hacer una llamada, puedes usar Frank. La única tecnología que necesitas es tu voz.",
    tag: "Accesibilidad",
    tagColor: "#e07a3f",
    tagBg: "rgba(224,122,63,0.10)",
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

        <div className="flex flex-col gap-2.5">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
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
