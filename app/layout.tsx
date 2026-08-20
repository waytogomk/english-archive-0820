import type { Metadata } from "next";
import { Fraunces, Google_Sans, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import "./revisions.css";

const googleSans = Google_Sans({
  subsets: ["latin"],
  variable: "--font-google-sans",
  display: "swap",
  adjustFontFallback: false,
});

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

const fraunces = Fraunces({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "English Archive",
  description: "중고등 내신, 문법학습, 원서리딩을 한곳에서 관리하세요.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko" className={`${googleSans.variable} ${notoSansKr.variable} ${fraunces.variable}`}><body>{children}</body></html>;
}
