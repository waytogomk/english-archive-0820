import Link from "next/link";
import { LearningIcon } from "@/components/learning-icon";
import { StatusPill } from "@/components/status-pill";
import type { LearningStatus } from "@/lib/demo-data";

const icons = { school: "exam", grammar: "grammar", novel: "reading" } as const;

export function CourseCard({ href, title, eyebrow, description, status, art, tone, number }: { href: string; title: string; eyebrow: string; description: string; status: LearningStatus; art: keyof typeof icons; tone: string; number: string }) {
  return <article className={`course-card course-${tone}`}>
    <div className="course-card-top">
      <span className="course-number">{number}</span>
      <span className="course-icon"><LearningIcon name={icons[art]} /></span>
    </div>
    <div className="course-copy">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="course-card-bottom"><StatusPill status={status}/><Link className="text-link" href={href}>학습 둘러보기 <span aria-hidden="true">→</span></Link></div>
    </div>
  </article>;
}
