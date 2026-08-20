import Link from "next/link";
import Image from "next/image";
import { StatusPill } from "@/components/status-pill";

export default function HomePage() {
  return <>
    <main>
      <section className="hero hero-image-shell" aria-label="English Archive 학습 소개">
        <div className="hero-image-canvas">
          <Image
            className="hero-front-image"
            src="/images/english-archive-hero-refined.png"
            width={1698}
            height={926}
            preload
            sizes="(max-width: 620px) 730px, (max-width: 1400px) 100vw, 1400px"
            alt="어린이 원서 읽기와 문법·시험 대비 학습을 소개하는 English Archive 메인 화면"
          />
          <div className="hero-copy-overlay">
            <h1>ENGLISH ARCHIVE</h1>
            <p>필요할 때 꺼내 푸는 나만의 영어 학습 아카이브</p>
            <small>초등 고학년부터 중등 내신까지, 내 속도에 맞춰 필요한 자료를 언제든 찾아보세요.</small>
          </div>
          <Link className="hero-panel-link hero-panel-link-novel" href="/novel-study" aria-label="원서리딩 학습으로 이동" />
          <Link className="hero-panel-link hero-panel-link-exam" href="/exam-prep" aria-label="중고등 내신 학습으로 이동" />
        </div>
      </section>

      <section className="dashboard-row">
        <article className="notice-card">
          <div className="card-title"><h2>Notice</h2><span>새 소식</span></div>
          <ul className="notice-list">
            <li><b>NEW</b><div><strong>Gangsta Granny Reading Quiz</strong><small>Chapter별 퀴즈가 업데이트되었어요.</small></div></li>
            <li><b>TIP</b><div><strong>학습하고 간식 쿠폰 받기</strong><small>완료한 학습이 쌓이면 원하는 간식을 고를 수 있어요.</small></div></li>
          </ul>
        </article>
        <article className="recent-card">
          <div className="card-title"><h2>Recent Lesson</h2><Link href="/progress">전체 보기 →</Link></div>
          <div className="recent-item"><div className="recent-icon">✓</div><div><strong>Gangsta Granny · Ch. 1–11</strong><small>20문제 중 12문제 완료</small></div><StatusPill status="in-progress" /></div>
          <div className="progress-track"><span style={{ width: "60%" }} /></div>
        </article>
        <article className="fridge-preview">
          <div><span className="eyebrow">TEACHER&apos;S TREAT FRIDGE</span><h2>Study Hard,<br />Snack Smart</h2><p className="reward-coupon"><strong>1</strong><span>쿠폰</span></p><Link className="button button-dark" href="/treat-fridge">Open</Link></div>
          <Image className="fridge-reference-art" src="/images/treat-fridge-reference-card.png" width={1024} height={577} alt="귀여운 간식이 가득 들어 있는 열린 냉장고" />
        </article>
      </section>
    </main>
    <footer className="site-footer">
      <div className="footer-contact">
        <strong>Contact</strong>
        <span>Email: <a href="mailto:eng_archive@gmail.com">eng_archive@gmail.com</a></span>
      </div>
      <div className="footer-bottom">
        <span>2026 English Archive. Inc. All rights reserved.</span>
        <Link href="/admin">관리자</Link>
      </div>
    </footer>
  </>;
}
