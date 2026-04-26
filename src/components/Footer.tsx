import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    {
      label: "LinkedIn",
      href: "#",
      path: "M4 9h2v7H4zM5 7a1 1 0 110-2 1 1 0 010 2zM10 9h2v1.5a2.5 2.5 0 015 0V16h-2v-5a.5.5 0 00-1 0v5h-2V9z",
    },
    {
      label: "Instagram",
      href: "#",
      path: "M11 3H5a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V5a2 2 0 00-2-2zM8 10a2 2 0 110-4 2 2 0 010 4zm3.5-5.5a.75.75 0 100-1.5.75.75 0 000 1.5z",
    },
  ];

  return (
    <footer className="bg-[#0a0a0a] text-[#f5f0e8]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#f5f0e8]/08 to-transparent mb-10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center sm:items-start gap-3">
            <Image
              src="/logo-frank/BLANCO FRANK..png"
              alt="Frank"
              width={0}
              height={0}
              sizes="100vw"
              className="h-8 w-auto object-contain"
            />
            <p className="text-xs text-[#f5f0e8]/30 leading-relaxed max-w-xs text-center sm:text-left" style={{ fontFamily: "var(--font-dm-sans)" }}>
              Inteligencia Interpersonal potenciada por análisis paralingüístico. Entrena tus Human Skills con datos, no suposiciones.
            </p>
          </div>

          {/* Right side */}
          <div className="flex flex-col items-center sm:items-end gap-4">
            {/* Social icons */}
            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-full border border-[#f5f0e8]/10 flex items-center justify-center text-[#f5f0e8]/25 hover:text-[#e07a3f] hover:border-[#e07a3f]/30 transition-all duration-200"
                >
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
            <p className="text-xs text-[#f5f0e8]/20" style={{ fontFamily: "var(--font-dm-sans)" }}>
              {year} Frank. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
