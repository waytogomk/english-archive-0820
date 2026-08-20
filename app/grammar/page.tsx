import Link from "next/link";
import { LearningIcon } from "@/components/learning-icon";
import { SiteHeader } from "@/components/site-header";
import { StatusPill } from "@/components/status-pill";
import { grammarTopics } from "@/lib/demo-data";

export default function GrammarPage() {
  return <>
    <SiteHeader />
    <main className="inner-main">
      <section className="page-intro lavender-intro">
        <div><Link className="back-link" href="/exam-prep">← 중고등 내신</Link><span className="eyebrow">GRAMMAR TRAINING</span><h1>문법학습</h1><p>아이템별 15문제를 풀고, 틀린 문제는 오답 재학습으로 완성해요.</p></div>
        <span className="intro-icon"><LearningIcon name="grammar" /></span>
      </section>
      <section className="topic-list">
        {grammarTopics.map((topic, index) => <article className="topic-card" key={topic.id}>
          <span className="topic-index">{String(index + 1).padStart(2, "0")}</span>
          <div className="topic-copy">
            <div><h2>{topic.title}</h2><p>{topic.description}</p></div>
            <div className="topic-status"><StatusPill status={topic.status} />{topic.score > 0 && <span>최근 점수 <strong>{topic.score}점</strong></span>}</div>
          </div>
          <Link className="circle-arrow" href="/quiz/demo?type=grammar" aria-label={`${topic.title} 학습 시작`}>→</Link>
        </article>)}
      </section>
      <aside className="review-banner"><div><span className="eyebrow">WRONG ANSWER REVIEW</span><h2>틀린 문제 4개가 기다리고 있어요.</h2><p>다시 맞히면 재학습 완료로 바뀝니다.</p></div><Link className="button button-dark" href="/quiz/demo?type=review">오답 재학습</Link></aside>
    </main>
  </>;
}
