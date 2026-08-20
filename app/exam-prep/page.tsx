import Link from "next/link";
import { LearningIcon } from "@/components/learning-icon";
import { SiteHeader } from "@/components/site-header";
import { StatusPill } from "@/components/status-pill";

export default function ExamPrepPage() {
  return <>
    <SiteHeader />
    <main className="inner-main">
      <section className="page-intro exam-prep-intro">
        <div>
          <Link className="back-link" href="/">← 홈</Link>
          <span className="eyebrow">Test Prep</span>
          <h1>중고등 내신</h1>
          <p>학교 시험에 맞춘 실전 학습과 핵심 문법을 체계적으로 준비하세요.</p>
        </div>
        <span className="intro-icon"><LearningIcon name="exam" /></span>
      </section>
      <section className="exam-menu-grid">
        <article className="exam-menu-card exam-school-card">
          <div className="exam-menu-head"><span className="menu-step">01</span><span className="menu-icon"><LearningIcon name="school" /></span></div>
          <div><span className="eyebrow">SCHOOL ARCHIVE</span><h2>학교별 내신</h2><p>학교를 선택한 후 기출 모의고사와 학교별 어휘학습을 진행합니다.</p><StatusPill status="in-progress" /><Link className="button button-dark button-full" href="/school">학교 선택하기</Link></div>
        </article>
        <article className="exam-menu-card exam-grammar-card">
          <div className="exam-menu-head"><span className="menu-step">02</span><span className="menu-icon"><LearningIcon name="grammar" /></span></div>
          <div><span className="eyebrow">GRAMMAR TRAINING</span><h2>문법학습</h2><p>관계사, 분사, to부정사 등 문법별 15문제와 오답 재학습을 진행합니다.</p><StatusPill status="review" /><Link className="button button-dark button-full" href="/grammar">문법 선택하기</Link></div>
        </article>
      </section>
    </main>
  </>;
}
