import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans-var",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono-var",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Frank — Simulador de Vuelo para Conversaciones Humanas",
  description:
    "La primera IA que entrena tus Human Skills analizando tu voz, no solo tus palabras. Sin sesgos culturales. Sin riesgos reales.",
  icons: {
    icon: "/logo-frank/icon-frank.png",
    apple: "/logo-frank/icon-frank.png",
  },
  openGraph: {
    title: "Frank — Simulador de Vuelo para Conversaciones Humanas",
    description:
      "Comete el error antes de que cueste caro. Entrenamiento paralingüístico con IA.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${dmSans.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
