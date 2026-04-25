"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const FAQS = [
  {
    question: "¿Cómo protege Frank mis datos de voz?",
    answer:
      "Tu audio nunca se almacena como grabación. En el momento de la captura, Frank convierte la señal acústica en vectores numéricos de alta dimensión. Estos vectores son cifrados con AES-256 y vinculados exclusivamente a tu cuenta. Es técnicamente imposible reconstruir tu voz a partir de los datos que guardamos.",
    tag: "Privacidad",
    tagColor: "#2F9E6A",
    tagBg: "rgba(47,158,106,0.1)",
  },
  {
    question: "¿Funciona en cualquier idioma y acento?",
    answer:
      "Sí. Gracias al sistema de Línea Base Individual, Frank no compara tu voz con ningún estándar global — aprende TUS patrones en TU idioma. El análisis paralingüístico trasciende el idioma: el estrés vocal suena igual en Caracas que en Tokio.",
    tag: "Alcance global",
    tagColor: "#A2D2FF",
    tagBg: "rgba(36,121,199,0.1)",
  },
  {
    question: "¿Qué diferencia a Frank de apps de coaching de voz?",
    answer:
      "Las apps genéricas te comparan con estándares de 'habla perfecta' definidos por poblaciones occidentales de habla inglesa. Frank no tiene un ideal externo. Analiza tu desviación de tu propio baseline en conversaciones de alta presión, en tiempo real.",
    tag: "Diferenciador",
    tagColor: "#A2D2FF",
    tagBg: "rgba(36,121,199,0.1)",
  },
  {
    question: "¿Cuántas sesiones necesito antes de ver resultados?",
    answer:
      "Usuarios reportan cambios perceptibles a partir de la tercera sesión (90 minutos de práctica total). Los datos del Dashboard muestran evolución desde la primera sesión. Cambios de comportamiento medibles en contextos reales aparecen entre las semanas 3 y 6 de uso consistente.",
    tag: "Resultados",
    tagColor: "#2F9E6A",
    tagBg: "rgba(47,158,106,0.1)",
  },
  {
    question: "¿Puedo usar Frank si tengo una voz atípica?",
    answer:
      "Absolutamente. El diseño de Línea Base Individual fue concebido precisamente para eliminar este sesgo. Frank no juzga tu voz — aprende de ella. Usuarios con disfluencias, acentos marcados o condiciones como disartria leve han encontrado Frank especialmente valioso.",
    tag: "Inclusividad",
    tagColor: "#2F9E6A",
    tagBg: "rgba(47,158,106,0.1)",
  },
  {
    question: "¿Cuál es el modelo de precios para empresas?",
    answer:
      "Ofrecemos licencias por asiento para equipos de 10+ personas, con dashboard centralizado de RRHH, reportes de evolución por área y acceso a API para integración con HRIS (SAP, Workday, BambooHR). Los precios dependen del tamaño del equipo. Agenda una demo y enviamos propuesta en 24h.",
    tag: "Empresas",
    tagColor: "#A2D2FF",
    tagBg: "rgba(36,121,199,0.1)",
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
        isOpen ? "border-[#A2D2FF]/40 bg-white shadow-sm" : "border-[#A2D2FF]/15 bg-white/60 hover:border-[#A2D2FF]/30 hover:bg-white"
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
          <span className="text-sm font-bold text-[#1B263B]/85 leading-snug" style={{ fontFamily: "var(--font-dm-sans)" }}>
            {faq.question}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.22 }}
          className="flex-shrink-0 mt-0.5 w-7 h-7 rounded-full border border-[#A2D2FF]/30 flex items-center justify-center"
          style={{ background: isOpen ? "#EBF5FF" : "transparent" }}
        >
          <svg viewBox="0 0 10 10" className="w-2.5 h-2.5 text-[#A2D2FF]">
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
            <p className="px-5 pb-5 text-sm text-[#1B263B]/55 leading-relaxed">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-28 px-6 bg-white overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-px bg-gradient-to-r from-transparent via-[#A2D2FF]/25 to-transparent" />

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
            className="text-4xl md:text-5xl font-bold mb-4 text-[#1B263B] tracking-tight"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Preguntas frecuentes
          </h2>
          <p className="text-base text-[#1B263B]/45">
            ¿Algo que no está aquí?{" "}
            <a href="mailto:hola@frank.ai" className="text-[#1B263B] underline font-medium hover:text-[#A2D2FF]">
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

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.25, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="mt-12 p-8 rounded-[24px] bg-[#F5F0E8] border border-[#A2D2FF]/20 text-center"
        >
          <div className="w-12 h-12 rounded-[14px] bg-[#1B263B] flex items-center justify-center mx-auto mb-4">
            <svg viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M10 2v4M10 14v4M4.22 4.22l2.83 2.83M12.95 12.95l2.83 2.83M2 10h4M14 10h4M4.22 15.78l2.83-2.83M12.95 7.05l2.83-2.83" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-[#1B263B]/90 mb-2" style={{ fontFamily: "var(--font-dm-sans)" }}>
            Listo para entrenar diferente
          </h3>
          <p className="text-sm text-[#1B263B]/45 mb-6 max-w-sm mx-auto">
            Únete al waitlist. Primera sesión gratuita. Sin tarjeta de crédito requerida.
          </p>
          <motion.a
            href="#waitlist"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex px-7 py-3.5 rounded-full font-semibold text-sm text-white bg-[#1B263B] hover:bg-[#A2D2FF] transition-colors duration-300 shadow-sm"
          >
            Reservar mi lugar
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
