type IconName = "exam" | "reading" | "school" | "grammar" | "mock" | "vocabulary";

export function LearningIcon({ name, className = "" }: { name: IconName; className?: string }) {
  const common = {
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
  };

  if (name === "reading") {
    return <svg {...common}><path d="M7 11.5c6.5-1.7 12.2-.4 17 3.7v24.3c-4.8-4.1-10.5-5.4-17-3.7V11.5Z" /><path d="M41 11.5c-6.5-1.7-12.2-.4-17 3.7v24.3c4.8-4.1 10.5-5.4 17-3.7V11.5Z" /><path d="M12 18c3-.3 5.8.4 8.3 2M12 24c3-.3 5.8.4 8.3 2M36 18c-3-.3-5.8.4-8.3 2" /></svg>;
  }

  if (name === "school") {
    return <svg {...common}><path d="m6 19 18-10 18 10" /><path d="M10 20v17h28V20M6 39h36" /><path d="M17 24v8M24 24v8M31 24v8" /><path d="M21 37v-5h6v5" /></svg>;
  }

  if (name === "grammar") {
    return <svg {...common}><path d="M8 10h32v28H8z" /><path d="M14 17h20M14 23h13M14 29h8" /><path d="m30 31 3 3 6-8" /></svg>;
  }

  if (name === "mock") {
    return <svg {...common}><path d="M14 7h20v6H14z" /><path d="M10 11h28v30H10z" /><path d="m15 22 2.5 2.5L22 19M26 21h7M15 31h18" /></svg>;
  }

  if (name === "vocabulary") {
    return <svg {...common}><path d="M9 12h24a6 6 0 0 1 6 6v18H15a6 6 0 0 1-6-6V12Z" /><path d="M15 8v24a4 4 0 0 0 4 4M22 18h10M22 24h8" /></svg>;
  }

  return <svg {...common}><path d="M14 7h20v6H14z" /><path d="M10 11h28v30H10z" /><path d="M16 21h16M16 28h16M16 35h10" /></svg>;
}

