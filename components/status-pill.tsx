import type { LearningStatus } from "@/lib/demo-data";

const labels: Record<LearningStatus, string> = {
  "not-started": "학습 전",
  "in-progress": "학습 중",
  completed: "학습 완료",
  review: "재학습 필요",
};

export function StatusPill({ status }: { status: LearningStatus }) {
  return <span className={`status-pill status-${status}`}><span aria-hidden="true" />{labels[status]}</span>;
}
