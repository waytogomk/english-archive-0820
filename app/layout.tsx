import type { Metadata } from "next";
import "./globals.css";
import "./revisions.css";

export const metadata: Metadata = {
  title: "English Archive",
  description: "중고등 내신, 문법학습, 원서리딩을 한곳에서 관리하세요.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
