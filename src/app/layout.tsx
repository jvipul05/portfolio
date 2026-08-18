import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const description = "Portfolio of Vipul Jain — Software Developer focused on Java, Spring Boot, System Design, Cloud and AI Engineering.";
export const metadata: Metadata = { metadataBase: new URL("https://vipul-jain.dev"), title: "Vipul Jain | Software Developer | Java Backend Engineer", description, openGraph: { title: "Vipul Jain | Software Developer | Java Backend Engineer", description, type: "website", url: "/" }, twitter: { card: "summary_large_image", title: "Vipul Jain | Software Developer | Java Backend Engineer", description }, icons: { icon: "/favicon.svg" } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" className="dark"><body className={`${geistSans.variable} ${geistMono.variable} antialiased grid-bg`}>{children}</body></html>; }
