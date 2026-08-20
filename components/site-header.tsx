"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteHeader({ admin = false }: { admin?: boolean }) {
  const pathname = usePathname();
  const examActive = pathname.startsWith("/exam-prep") || pathname.startsWith("/school") || pathname.startsWith("/grammar");
  const readingActive = pathname.startsWith("/novel-study");
  const treatActive = pathname.startsWith("/treat-fridge");

  return <header className="site-header">
    <div className="header-inner">
      <Link className="brand brand-typographic" href={admin ? "/admin" : "/"} aria-label="English Archive 홈">
        <span>ENGLISH</span><span>ARCHIVE</span>
      </Link>
      <nav aria-label="주요 메뉴">
        {admin ? <><Link href="/admin">대시보드</Link><Link href="/">학생 화면</Link></> : <>
          <Link className={examActive ? "active" : undefined} aria-current={examActive ? "page" : undefined} href="/exam-prep">중고등 내신</Link>
          <Link className={readingActive ? "active" : undefined} aria-current={readingActive ? "page" : undefined} href="/novel-study">원서리딩</Link>
          <Link className={`nav-treat${treatActive ? " active" : ""}`} aria-current={treatActive ? "page" : undefined} href="/treat-fridge">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10h16v10H4zM3 7h18v4H3zM12 7v13M12 7H8.7a2.2 2.2 0 1 1 2.1-2.9L12 7Zm0 0h3.3a2.2 2.2 0 1 0-2.1-2.9L12 7Z" /></svg>
            <span>Treat Fridge</span>
          </Link>
        </>}
      </nav>
    </div>
  </header>;
}
