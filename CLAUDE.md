@AGENTS.md

# Frank — Contexto del Proyecto

## Producto
Frank es una **Plataforma de Inteligencia Interpersonal** que opera a través de conversaciones de voz en tiempo real con interlocutores de IA. Su propuesta central: simular escenarios laborales de alta presión para que el usuario practique habilidades interpersonales en un entorno controlado antes de enfrentar situaciones análogas en contextos reales.

Tagline operativo: **"Simulador de vuelo para conversaciones de alto riesgo."**
Promesa: **"Comete el error antes de que cueste caro."**

## Marco Metodológico (v1.0)

### Tres pilares científicos
1. **Scherer (1986, 2003)** — Teoría de expresión vocal del afecto: cadena causal entre estado emocional → sistema nervioso autónomo → musculatura fonadora → parámetros acústicos medibles. Valida que lo que Frank mide tiene mecanismo causal, no solo correlacional.
2. **Ambady & Rosenthal (1992)** — "Thin slices": evaluadores entrenados predicen efectividad comunicacional con 30s de audio, sin contenido verbal. Los parámetros paralingüísticos son **predictores centrales** de percepción interpersonal, no periféricos.
3. **Yerkes-Dodson + neurociencia del rendimiento** — El aprendizaje de habilidades complejas requiere estrés moderado (activación HPA sin colapso cognitivo). Las métricas extraídas bajo presión simulada son más pedagógicamente valiosas que las de condición neutra.

### Diferenciador central: Línea Base Individual
Frank **no compara al usuario con estándares externos** (género, dialecto, cultura). Aprende los patrones vocales del usuario en condición neutra (onboarding 5–7 min en tres segmentos) y expresa todas las métricas como delta: `ΔM = ((Mₛ − M₀) / M₀) × 100`.

### Métricas (Grupo A — uso sistemático)
- **ΔF0** (variación de pitch): indicador más robusto de arousal emocional. Compresión (voz plana) o variación caótica = regulación comprometida.
- **Distribución de pausas**: predictor de carga cognitiva bajo presión. Posición y duración en el turno, vs. basal individual.
- **Velocidad de emisión** (sílabas/seg): aceleración sostenida en desacuerdo = activación simpática comprometida.

### Mapeo métrica → competencia → recomendación
- Aceleración >20% en desacuerdo → Regulación emocional → Pausa intencional 1-2s pre-respuesta
- Compresión F0 >30% bajo presión → Presencia vocal → Modulación intencional del pitch
- Pausa >3s al inicio de confrontación → Gestión del conflicto → Exposición gradual
- Reducción sostenida de intensidad → Asertividad → Mantenimiento de intensidad en desacuerdo legítimo

## Diseño Visual
Ver `DESIGN.md` para tokens completos. Resumen:
- **Void** `#0f0f0f` — fondo principal
- **Base** `#1a1a1a` — superficies secundarias (cards, paneles)
- **Warm White** `#f5f0e8` — texto principal
- **Ember** `#e07a3f` — acento primario (CTAs, highlights, estados activos)
- **Deep Ember** `#b05a25` — hover, variantes más oscuras
- **Warm Amber** `#d4a96a` — acento secundario (métricas positivas, separación visual)
- Tipografía: DM Sans (display/body) + DM Mono (datos/código/tags)

## Segmentos de usuario
- **B2C**: Profesionales y líderes que quieren desarrollar Human Skills sin riesgos reales. Onboarding 8 min → sesiones 15–45 min → dashboard post-sesión.
- **B2B**: Directores de RRHH y Talent. Casos: selección de talento, capacitación de equipos, executive coaching. Integración con HRIS (SAP, Workday, BambooHR).

## Stack técnico
- Next.js 16 + TypeScript + Tailwind v4 + Framer Motion
- Audio: Hume AI (análisis de afecto, 6 ejes) + ElevenLabs (síntesis de interlocutores hiperrealistas)
- Latencia sub-200ms. Audio convertido a vectores numéricos — nunca almacenado como grabación.

## Convenciones de copy
- No usar emojis. Usar iconos SVG.
- Términos técnicos que deben aparecer como son: "paralingüística", "línea base individual", "variación de pitch", "pausas estratégicas".
- Tono: riguroso pero accesible. Confianza técnica sin jerga innecesaria.
- El usuario no "mejora su voz" — "desarrolla regulación emocional bajo presión" y "aumenta autoridad percibida".
