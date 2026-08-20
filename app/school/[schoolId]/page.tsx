import Link from "next/link";
import { notFound } from "next/navigation";
import { LearningIcon } from "@/components/learning-icon";
import { SiteHeader } from "@/components/site-header";
import { StatusPill } from "@/components/status-pill";
import { schoolContents, schools } from "@/lib/demo-data";

const iconMap = { vocabulary: "vocabulary", grammar: "grammar", exam: "mock" } as const;

export default async function SchoolDetail({ params }: { params: Promise<{schoolId:string}> }) {
  const { schoolId } = await params;
  const school = schools.find(item=>item.id===schoolId);
  if(!school) notFound();
  return <><SiteHeader/><main className="inner-main"><section className="simple-intro"><Link className="back-link" href="/school">← 학교 선택</Link><span className="eyebrow">MY SCHOOL ARCHIVE</span><h1>{school.name}</h1><p>이번 시험에 필요한 학습을 골라 시작하세요.</p></section><section className="content-grid">{schoolContents.map((item,index)=><article className="content-card" key={item.title}><div className="content-card-top"><span className="content-step">{String(index+1).padStart(2,"0")}</span><span className="content-icon"><LearningIcon name={iconMap[item.art as keyof typeof iconMap]}/></span></div><div className="content-card-body"><div className="content-meta"><span>{item.meta}</span><StatusPill status={item.status}/></div><h2>{item.title}</h2><p>{item.description}</p><Link className="button button-dark button-full" href={item.href}>학습 세트 보기</Link></div></article>)}</section></main></>;
}
