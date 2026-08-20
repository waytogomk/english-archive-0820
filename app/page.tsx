import Link from "next/link";
import Image from "next/image";
import { CourseCard } from "@/components/course-card";
import { SiteHeader } from "@/components/site-header";
import { StatusPill } from "@/components/status-pill";

export default function HomePage() {
  return <>
    <SiteHeader />
    <main>
      <section className="hero hero-image-shell" aria-label="English Archive 학습 소개">
        <div className="hero-image-canvas">
          <Image
            className="hero-front-image"
            src="/images/english-archive-hero.png"
            width={1407}
            height={768}
            preload
            sizes="(max-width: 620px) 730px, (max-width: 1400px) 100vw, 1400px"
            alt="어린이 원서 읽기와 문법·시험 대비 학습을 소개하는 English Archive 메인 화면"
          />
          <Link className="hero-image-link" href="#courses" aria-label="학습 메뉴 둘러보기" />
        </div>
      </section>

      <section className="section program-section" id="courses">
        <div className="section-heading">
          <div><span className="eyebrow">CHOOSE YOUR STUDY</span><h2>오늘 집중할 학습을 선택하세요.</h2></div>
          <p>최근 기록과 진행 상태가 자동으로 이어집니다.</p>
        </div>
        <div className="course-grid">
          <CourseCard href="/exam-prep" title="중고등 내신" eyebrow="EXAM PREPARATION" description="학교별 내신과 문법학습으로 시험범위를 집중적으로 준비합니다." status="in-progress" art="school" tone="lime" number="01" />
          <CourseCard href="/novel-study" title="원서리딩" eyebrow="ORIGINAL READING" description="책과 Chapter를 선택해 Reading Quiz를 풉니다." status="in-progress" art="novel" tone="yellow" number="02" />
        </div>
      </section>

      <section className="dashboard-row">
        <article className="recent-card">
          <div className="card-title"><div><span className="eyebrow">RECENT STUDY</span><h2>최근 학습</h2></div><Link href="/progress">전체 보기 →</Link></div>
          <div className="recent-item"><div className="recent-icon">✓</div><div><strong>Gangsta Granny · Ch. 1–11</strong><small>20문제 중 12문제 완료</small></div><StatusPill status="in-progress" /></div>
          <div className="progress-track"><span style={{ width: "60%" }} /></div>
        </article>
        <article className="fridge-preview">
          <div><span className="eyebrow">TEACHER&apos;S TREAT FRIDGE</span><h2>공부하고,<br />내 간식은 내가 골라요!</h2><p>선택 가능한 보상권 <strong>1개</strong></p><Link className="button button-dark" href="/treat-fridge">냉장고 열기</Link></div>
          <Image className="fridge-photo" src="/images/treat-fridge-kawaii-transparent.png" width={1024} height={1536} alt="스무 가지 귀여운 간식이 담긴 보상 냉장고" />
        </article>
      </section>
    </main>
    <footer className="site-footer">
      <div className="footer-contact">
        <strong>Contact</strong>
        <span>Email: <a href="mailto:eng_archive@gmail.com">eng_archive@gmail.com</a></span>
        <span>Mobile: <a href="tel:+821034535158">010.3453.5158</a></span>
      </div>
      <div className="footer-bottom">
        <span>2026 English Archive. Inc. All rights reserved.</span>
        <Link href="/admin">관리자</Link>
      </div>
    </footer>
  </>;
}
