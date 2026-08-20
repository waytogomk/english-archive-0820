import Link from "next/link";
import Image from "next/image";
import { CourseCard } from "@/components/course-card";
import { SiteHeader } from "@/components/site-header";
import { StatusPill } from "@/components/status-pill";

export default function HomePage() {
  return <>
    <SiteHeader />
    <main>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow hero-eyebrow">Build your academic confidence!</span>
          <h1>필요할 때 꺼내 푸는<br /><em>나만의 영어 보물창고, <span className="hero-brand-display">English Archive!</span></em></h1>
          <p>학교 시험부터 문법, 원서리딩까지.<br />풀고, 확인하고, 내 실력을 차곡차곡 쌓아보세요.</p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/exam-prep">오늘 학습 시작</Link>
            <Link className="button button-light" href="#courses">학습 메뉴 보기</Link>
          </div>
        </div>
        <div className="hero-study-board">
          <div className="study-board-top">
            <div><strong>Today&apos;s Focus</strong><span>이번 주 학습 계획</span></div>
          </div>
          <div className="focus-score">
            <span>이번 주 학습</span>
            <strong>8<small> / 10 sets</small></strong>
            <div className="focus-track"><i /></div>
          </div>
          <ul>
            <li><span className="task-check">✓</span><div><strong>학교별 어휘</strong><small>1–25 완료</small></div><b>100%</b></li>
            <li><span className="task-number">02</span><div><strong>관계사 오답 재학습</strong><small>4문제 남음</small></div><b>진행 중</b></li>
            <li><span className="task-number">03</span><div><strong>원서리딩 Reading Quiz</strong><small>Gangsta Granny</small></div><b>시작 전</b></li>
          </ul>
          <i className="board-star">✦</i>
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
