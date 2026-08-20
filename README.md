# ENGLISH ARCHIVE

중·고등 내신, 문법학습, 원서리딩과 학습 보상을 한곳에서 제공하는 모바일 우선 영어학습 웹사이트입니다.

## 로컬 실행

```powershell
pnpm install
pnpm dev
```

브라우저에서 `http://localhost:3000`으로 접속합니다.

## 확인 명령

```powershell
pnpm run lint
pnpm run build
```

## Vercel 배포

1. 이 GitHub 저장소를 Vercel에 연결합니다.
2. Framework Preset은 `Next.js`를 선택합니다.
3. Install Command는 `pnpm install`, Build Command는 `pnpm run build`를 사용합니다.
4. Output Directory는 Next.js 기본값을 유지합니다.
5. 실제 인증·저장 기능을 연결할 때 `.env.example`의 환경변수를 Vercel Project Settings에 등록합니다.

`.env`, `.next`, `node_modules`, 로컬 `data`와 업로드 원본은 Git에 포함하지 않습니다.

## 현재 구현

- 학생 홈: 중고등 내신, 원서리딩, 최근 학습, Teacher's Treat Fridge
- 중고등 내신: 학교별 내신, 문법학습
- 학교별 내신: 기출 모의고사, 학교별 어휘학습
- 문법 15문제와 오답 재학습 UI
- 원서리딩 실제 책 표지와 Reading Quiz 진입
- 20가지 간식 선택 보상 UI
- 관리자 대시보드와 업로드·생성·검수 흐름 프로토타입

제품 요구사항은 [`PRD.md`](./PRD.md), 디자인 기준은 [`DESIGN.md`](./DESIGN.md)를 참고하세요.

현재는 UI 프로토타입입니다. 실제 운영 전 Supabase 인증·DB·Storage, 서버 채점, OCR/AI 생성, 관리자 권한과 배포 워크플로 연결이 필요합니다.
