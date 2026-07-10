"use client";

import { useRef, type ReactNode } from "react";

export function MagneticButton({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    node.style.transform = `translate(${x * 0.28}px, ${y * 0.34}px)`;
  };

  const handleLeave = () => {
    const node = ref.current;
    if (!node) return;
    node.style.transform = "translate(0, 0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={{ display: "inline-flex", transition: "transform 0.35s cubic-bezier(0.2, 0.7, 0.2, 1)" }}
    >
      {children}
    </div>
  );
}
