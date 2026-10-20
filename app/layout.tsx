import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import { heroHeadline } from "@/lib/content";
const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight", display: "swap" });
export const metadata: Metadata = { title: "ZURY CORRETORA", description: heroHeadline };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="pt-BR" className={interTight.variable}><body>{children}</body></html>; }
