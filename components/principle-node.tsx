'use client';

import { PrincipleKey, Principle } from '@/lib/solid-data';

interface PrincipleNodeProps {
  id: PrincipleKey;
  principle: Principle;
  isActive: boolean;
  x: number;
  y: number;
  onClick: () => void;
}

/**
 * PrincipleNode Component
 * Renders a single SOLID principle as a circular button positioned on a circle
 * Demonstrates Single Responsibility - only handles rendering a principle node
 */
export function PrincipleNode({
  id,
  principle,
  isActive,
  x,
  y,
  onClick
}: PrincipleNodeProps) {
  return (
    <button
      onClick={onClick}
      style={{ transform: `translate(${x}px, ${y}px)` }}
      className={`absolute w-16 h-16 rounded-full flex flex-col items-center justify-center transition-all duration-300 border-4 z-10
        ${isActive ? `${principle.color} border-white scale-110 shadow-lg` : 'bg-slate-700 border-slate-600 hover:border-slate-400'}
      `}
      aria-label={`${principle.full} principle`}
      aria-pressed={isActive}
    >
      <span className="text-xl font-bold leading-none">{id}</span>
      <span className="text-[10px] font-semibold">{principle.title}</span>
    </button>
  );
}
