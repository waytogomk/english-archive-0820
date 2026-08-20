import Link from "next/link";

export function SiteHeader({ admin = false }: { admin?: boolean }) {
  return <header className="site-header">
    <div className="header-inner">
      <Link className="brand brand-typographic" href={admin ? "/admin" : "/"} aria-label="English Archive 홈">
        <span>ENGLISH</span><span>ARCHIVE</span>
      </Link>
      <nav aria-label="주요 메뉴">
        {admin ? <><Link href="/admin">대시보드</Link><Link href="/">학생 화면</Link></> : <><Link href="/exam-prep">중고등 내신</Link><Link href="/novel-study">원서리딩</Link><Link className="nav-treat" href="/treat-fridge">TREAT FRIDGE</Link></>}
      </nav>
    </div>
  </header>;
}
