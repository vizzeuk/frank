# Frank — Design System

## Brand Identity: Ember Dark

### Color Palette

| Token | Hex | Uso |
|-------|-----|-----|
| Void | `#0f0f0f` | Fondo principal (body, hero, secciones alternadas) |
| Base | `#1a1a1a` | Superficies secundarias: cards, paneles, secciones alternadas |
| Warm White | `#f5f0e8` | Texto principal, foreground |
| Ember | `#e07a3f` | Acento primario: CTAs, highlights, iconos activos, bordes de foco |
| Deep Ember | `#b05a25` | Hover states, variante más oscura del Ember |
| Warm Amber | `#d4a96a` | Acento secundario: métricas positivas, separación visual, tags alternativos |

### Opacidades estándar (Ember sobre fondo oscuro)
- Fondo sutil: `rgba(224,122,63,0.08)` — bg de tags, badges, hover states
- Borde: `rgba(224,122,63,0.20–0.35)` — bordes de cards activos
- Borde sutil: `rgba(224,122,63,0.12–0.15)` — bordes de cards en reposo
- Glow: `rgba(224,122,63,0.15)` — box-shadow accent

### Texto con opacidad (Warm White sobre fondo oscuro)
- Principal: `#f5f0e8` o `rgba(245,240,232,1.0)`
- Secundario: `rgba(245,240,232,0.60)` — subtítulos, descripciones
- Muted: `rgba(245,240,232,0.40)` — labels, placeholders
- Muy sutil: `rgba(245,240,232,0.25)` — separadores de texto

---

## Typography

| Variable | Fuente | Uso |
|----------|--------|-----|
| `var(--font-dm-sans)` | DM Sans | Headings, body, CTAs |
| `var(--font-dm-mono)` | DM Mono | Datos, etiquetas técnicas, terminal, timestamps |

**Escala tipográfica (headings)**
- Hero h1: `text-5xl md:text-6xl lg:text-7xl`, `font-bold`, `leading-[0.95]`
- Section h2: `text-4xl md:text-6xl`, `font-bold`, `tracking-tight`, `leading-[1.05]`
- Card h3: `text-base`, `font-bold`
- Labels técnicos: `text-[9px]–text-[11px]`, `font-bold`, `uppercase`, `tracking-widest`

**Highlight block** (texto de énfasis en h2):
```
<span className="inline-block bg-[#e07a3f] text-[#0f0f0f] px-3 rounded-[10px]">
  texto aquí
</span>
```

---

## Components

### Cards
```css
bg-[#1a1a1a] border border-[#e07a3f]/12 rounded-[24px]
hover: border-[#e07a3f]/30 shadow-md
active/open: border-[#e07a3f]/35
```

### Badges / Pills
```css
/* Ember */
bg-[#e07a3f]/08 border border-[#e07a3f]/25 text-[#e07a3f]
rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-widest

/* Neutral */
bg-[#f5f0e8]/05 border border-[#f5f0e8]/10 text-[#f5f0e8]/50
```

### Buttons — Primary CTA
```css
bg-[#e07a3f] hover:bg-[#b05a25] text-[#f5f0e8]
px-6 py-3 rounded-full font-semibold text-sm
transition-colors duration-300
```

### Buttons — Secondary CTA
```css
bg-[#1a1a1a] border border-[#e07a3f]/25 text-[#f5f0e8]
hover:border-[#e07a3f]/50
```

### Section Alternation
- Hero, B2C, Science, FAQ: `bg-[#0f0f0f]`
- B2B: `bg-[#1a1a1a]`
- Footer: `bg-[#0a0a0a]`

### Terminal (B2B showcase)
```css
bg: #0a0a0a
prompt ">": text-[#e07a3f]
success "✓": text-[#d4a96a]
warning "⚠": text-[#FFD580]
muted: rgba(245,240,232,0.55)
```

### Glassmorphism (dark theme)
```css
background: rgba(26,26,26,0.85)
backdrop-filter: blur(20px)
border: 1px solid rgba(224,122,63,0.15)
```

---

## Animations

| Clase | Propósito |
|-------|-----------|
| `.wave-bar` | Ondas de voz, animación idle/active |
| `.cursor-blink` | Cursor terminal |
| `.node-pulse` | Nodos destacados en el grafo neural |

**Easing estándar Framer Motion**: `[0.22, 1, 0.36, 1] as [number, number, number, number]`

---

## Spacing & Radius

- Sections: `py-28 px-6`
- Section container: `max-w-7xl mx-auto`
- Cards grandes: `rounded-[24px]` o `rounded-[28px]`
- Cards pequeñas: `rounded-[18px]` o `rounded-[20px]`
- Pills/tags: `rounded-full`
- Icon containers: `rounded-[10px]`–`rounded-[14px]`
