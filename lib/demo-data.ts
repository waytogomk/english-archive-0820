export type LearningStatus = "not-started" | "in-progress" | "completed" | "review";

export const schools = [
  { id: "sehwa", name: "세화여중", sets: 7, progress: 42 },
  { id: "sunhwa", name: "선화여중", sets: 3, progress: 0 },
  { id: "daewon", name: "대원외고", sets: 2, progress: 0 },
];

export const grammarTopics = [
  { id: "relative", title: "관계사", description: "who, which, that의 쓰임", status: "review" as LearningStatus, score: 73 },
  { id: "participle", title: "분사", description: "현재분사와 과거분사", status: "in-progress" as LearningStatus, score: 40 },
  { id: "infinitive", title: "to부정사", description: "명사·형용사·부사적 용법", status: "not-started" as LearningStatus, score: 0 },
];

export const books = [
  { id: "gangsta-granny", title: "Gangsta Granny", author: "David Walliams", range: "Ch. 1–22", questions: 20, status: "in-progress" as LearningStatus, cover: "/images/books/gangsta-granny.jpg" },
  { id: "wonder", title: "Wonder", author: "R. J. Palacio", range: "Coming soon", questions: 0, status: "not-started" as LearningStatus, cover: "/images/books/wonder.jpg" },
];

export const treats = [
  { name: "떡볶이", spriteIndex: 0 },
  { name: "망고", spriteIndex: 1 },
  { name: "수박", spriteIndex: 2 },
  { name: "아이스크림", spriteIndex: 3 },
  { name: "초콜릿", spriteIndex: 4 },
  { name: "콜라", spriteIndex: 5 },
  { name: "오렌지 주스", spriteIndex: 6 },
  { name: "소시지", spriteIndex: 7 },
  { name: "젤리", spriteIndex: 8 },
  { name: "쿠키", spriteIndex: 9 },
  { name: "햄버거", spriteIndex: 10 },
  { name: "피자", spriteIndex: 11 },
  { name: "감자튀김", spriteIndex: 12 },
  { name: "치킨", spriteIndex: 13 },
  { name: "도넛", spriteIndex: 14 },
  { name: "컵케이크", spriteIndex: 15 },
  { name: "딸기 케이크", spriteIndex: 16 },
  { name: "버블티", spriteIndex: 17 },
  { name: "팝콘", spriteIndex: 18 },
  { name: "프레첼", spriteIndex: 19 },
];

export const schoolContents = [
  { href: "/quiz/demo?type=mock", title: "기출 모의고사", description: "지난 기출 유형과 이번 시험범위로 실전 연습", meta: "25문제", status: "not-started" as LearningStatus, art: "exam" },
  { href: "/quiz/demo?type=vocabulary", title: "학교별 어휘학습", description: "25–50문제씩 나누어 문제별 바로 피드백", meta: "4개 세트", status: "in-progress" as LearningStatus, art: "vocabulary" },
];
