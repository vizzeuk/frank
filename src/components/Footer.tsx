function WaveIcon() {
  const heights = [4, 7, 10, 12, 10, 7, 4];
  return (
    <svg viewBox="0 0 28 16" fill="none" className="w-4 h-3.5">
      {heights.map((h, i) => (
        <rect key={i} x={i * 4} y={(12 - h) / 2} width="2.5" height={h} rx="1.25" fill="currentColor" />
      ))}
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  const cols = {
    Producto: ["Cómo funciona", "Para Empresas", "Para Individuos", "Precios"],
    Ciencia: ["Metodología", "Paralingüística", "Investigación", "Blog"],
    Legal: ["Privacidad", "Términos", "Cookies", "GDPR"],
  };

  return (
    <footer className="bg-[#0a0a0a] text-[#f5f0e8]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-[7px] bg-[#e07a3f]/15 flex items-center justify-center text-[#e07a3f]">
                <WaveIcon />
              </div>
              <span className="text-lg font-bold text-[#f5f0e8]" style={{ fontFamily: "var(--font-dm-sans)" }}>
                frank<span className="text-[#e07a3f]">.</span>
              </span>
            </div>
            <p className="text-sm text-[#f5f0e8]/35 leading-relaxed max-w-xs mb-5" style={{ fontFamily: "var(--font-dm-sans)" }}>
              Inteligencia Interpersonal potenciada por análisis paralingüístico. Entrena tus Human Skills con datos, no suposiciones.
            </p>

            {/* Privacy badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium"
              style={{
                background: "rgba(224,122,63,0.08)",
                border: "1px solid rgba(224,122,63,0.18)",
                color: "#e07a3f",
                fontFamily: "var(--font-dm-mono)",
              }}
            >
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                <path d="M7 1L2 4v4c0 3.25 2.25 6.1 5 6.85C9.75 14.1 12 11.25 12 8V4L7 1z" />
                <path d="M4.5 7l2 2 3-3" />
              </svg>
              Datos como vectores, no grabaciones
            </div>
          </div>

          {/* Links */}
          {Object.entries(cols).map(([category, items]) => (
            <div key={category}>
              <h4
                className="text-[10px] font-bold uppercase tracking-widest text-[#f5f0e8]/30 mb-4"
                style={{ fontFamily: "var(--font-dm-mono)" }}
              >
                {category}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-[#f5f0e8]/30 hover:text-[#e07a3f] transition-colors duration-200"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#f5f0e8]/08 to-transparent mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#f5f0e8]/20" style={{ fontFamily: "var(--font-dm-sans)" }}>
            {year} Frank. Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-4">
            <span className="text-xs text-[#f5f0e8]/15 hidden sm:block" style={{ fontFamily: "var(--font-dm-mono)" }}>
              Scherer Lab · Hume AI · ElevenLabs
            </span>

            {/* Social */}
            <div className="flex gap-2">
              {[
                { label: "X", path: "M4 4l12 12M16 4L4 16" },
                { label: "in", path: "M4 9h2v7H4zM5 7a1 1 0 110-2 1 1 0 010 2zM10 9h2v1.5a2.5 2.5 0 015 0V16h-2v-5a.5.5 0 00-1 0v5h-2V9z" },
                { label: "gh", path: "M8 2C4.69 2 2 4.69 2 8c0 2.65 1.72 4.9 4.1 5.69.3.06.41-.13.41-.29v-1c-1.67.36-2.02-.8-2.02-.8-.27-.7-.67-.88-.67-.88-.55-.37.04-.36.04-.36.61.04.93.62.93.62.54.92 1.41.65 1.76.5.05-.39.21-.65.38-.8-1.34-.15-2.74-.67-2.74-2.98 0-.66.24-1.2.62-1.62-.06-.15-.27-.77.06-1.6 0 0 .5-.16 1.65.62A5.7 5.7 0 018 5.8c.51 0 1.02.07 1.5.2 1.15-.78 1.65-.62 1.65-.62.33.83.12 1.45.06 1.6.39.42.62.96.62 1.62 0 2.32-1.41 2.83-2.75 2.98.22.19.41.56.41 1.13v1.67c0 .16.11.35.42.29C12.28 12.9 14 10.65 14 8c0-3.31-2.69-6-6-6z" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  className="w-8 h-8 rounded-full border border-[#f5f0e8]/10 flex items-center justify-center text-[#f5f0e8]/25 hover:text-[#e07a3f] hover:border-[#e07a3f]/30 transition-all duration-200"
                  aria-label={s.label}
                >
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
