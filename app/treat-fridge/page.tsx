"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { treats } from "@/lib/demo-data";

export default function TreatFridgePage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  return <>
    <SiteHeader />
    <main className="inner-main">
      <section className="treat-hero">
        <div>
          <Link className="back-link" href="/">← 홈</Link>
          <span className="eyebrow">TEACHER&apos;S TREAT FRIDGE</span>
          <h1>Study, earn,<br />and pick your treat!</h1>
          <p>선택 가능한 보상권이 <strong>1개</strong> 있어요. 먹고 싶은 간식을 직접 골라보세요.</p>
        </div>
        <Image className="treat-hero-photo" src="/images/treat-fridge-kawaii-transparent.png" width={1024} height={1536} alt="스무 가지 귀여운 간식이 담긴 보상 냉장고" />
      </section>
      <section className="treat-picker">
        <div className="section-heading compact"><div><span className="eyebrow">PICK ONE</span><h2>오늘의 간식은?</h2></div><p>선택 전에는 언제든 바꿀 수 있어요.</p></div>
        <div className="treat-grid">
          {treats.map(treat => { const column = treat.spriteIndex % 5; const row = Math.floor(treat.spriteIndex / 5); return <button key={treat.name} className={`treat-item ${selected === treat.name ? "selected" : ""}`} onClick={() => { setSelected(treat.name); setConfirmed(false); }} aria-pressed={selected === treat.name}>
            <span className="treat-sprite" style={{ backgroundPosition: `${column * 25}% ${row * (100 / 3)}%` }} aria-hidden="true"/><strong>{treat.name}</strong>{selected === treat.name && <i>✓</i>}
          </button>})}
        </div>
        <div className="reward-action">
          <div>{confirmed ? <><strong>선택 완료!</strong><span>{selected} 보상이 내 냉장고에 저장됐어요.</span></> : selected ? <><strong>{selected}을(를) 골랐어요.</strong><span>이 간식으로 확정할까요?</span></> : <><strong>간식을 하나 골라주세요.</strong><span>다음 보상은 미리 정해져 있지 않아요.</span></>}</div>
          <button className="button button-dark" disabled={!selected || confirmed} onClick={() => setConfirmed(true)}>{confirmed ? "선택 완료" : "이 간식으로 선택"}</button>
        </div>
      </section>
    </main>
  </>;
}
