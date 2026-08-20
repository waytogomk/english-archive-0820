import Link from "next/link";
import Image from "next/image";
import { LearningIcon } from "@/components/learning-icon";
import { SiteHeader } from "@/components/site-header";
import { StatusPill } from "@/components/status-pill";
import { books } from "@/lib/demo-data";

export default function OriginalReadingPage() {
  return <>
    <SiteHeader />
    <main className="inner-main">
      <section className="page-intro yellow-intro">
        <div><Link className="back-link" href="/">← 홈</Link><span className="eyebrow">ORIGINAL READING</span><h1>원서리딩</h1><p>책을 고르고 Chapter별 Reading Quiz로 내용을 정확하게 확인하세요.</p></div>
        <span className="intro-icon"><LearningIcon name="reading" /></span>
      </section>
      <section className="book-grid">
        {books.map(book => <article className="book-card" key={book.id}>
          <div className="book-cover"><Image src={book.cover} alt={`${book.title} 책 표지`} fill sizes="(max-width: 620px) 115px, 190px" /></div>
          <div className="book-copy">
            <StatusPill status={book.status} /><h2>{book.title}</h2><p>{book.author}</p>
            <div className="book-meta"><span>{book.range}</span><span>{book.questions ? `${book.questions}문제` : "자료 준비 중"}</span></div>
            {book.questions ? <Link className="button button-dark button-full" href="/quiz/demo?type=novel">Reading Quiz 시작</Link> : <button className="button button-disabled button-full" disabled>Coming soon</button>}
          </div>
        </article>)}
      </section>
    </main>
  </>;
}
