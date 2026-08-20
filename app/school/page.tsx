import Link from "next/link";
import { LearningIcon } from "@/components/learning-icon";
import { SiteHeader } from "@/components/site-header";
import { schools } from "@/lib/demo-data";

export default function SchoolPage() {
  return <><SiteHeader/><main className="inner-main"><section className="page-intro"><div><Link className="back-link" href="/exam-prep">← 중고등 내신</Link><span className="eyebrow">SCHOOL EXAM</span><h1>학교별 내신</h1><p>학교를 선택하면 기출 모의고사와 학교별 어휘학습을 확인할 수 있어요.</p></div><span className="intro-icon"><LearningIcon name="school"/></span></section><section className="list-section"><div className="section-heading compact"><div><span className="eyebrow">CHOOSE YOUR SCHOOL</span><h2>학교를 선택하세요</h2></div></div><div className="school-grid">{schools.map((school,index)=><Link className="school-card" href={`/school/${school.id}`} key={school.id}><span className={`school-number school-number-${index+1}`}>{String(index+1).padStart(2,"0")}</span><div><h3>{school.name}</h3><p>학습 세트 {school.sets}개</p>{school.progress>0?<div className="mini-progress"><span style={{width:`${school.progress}%`}}/></div>:<small>새로운 학습을 시작해보세요.</small>}</div><span className="circle-arrow">→</span></Link>)}</div></section></main></>;
}
