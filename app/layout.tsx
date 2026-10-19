import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight", display: "swap" });
export const metadata: Metadata = { title: "ZURY CORRETORA", description: "Proteção com valor além de preço." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="pt-BR" className={interTight.variable} data-scroll-behavior="smooth"><body>{children}</body></html>; }
