'use client';

import { ArrowRight, Zap } from 'lucide-react';
import { Cascade, PRINCIPLES } from '@/lib/solid-data';

interface CascadeButtonProps {
  cascade: Cascade;
  isActive: boolean;
  onClick: () => void;
}

/**
 * CascadeButton Component
 * Renders a cascade relationship button
 * Demonstrates Interface Segregation - only shows what's necessary
 */
export function CascadeButton({ cascade, isActive, onClick }: CascadeButtonProps) {
  const fromPrinciple = PRINCIPLES[cascade.from];
  const toPrinciple = PRINCIPLES[cascade.to];

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between p-3 rounded-lg text-sm transition-all border
        ${isActive ? 'bg-slate-700 border-blue-500' : 'bg-slate-800 border-slate-700 hover:bg-slate-750'}
      `}
      aria-label={`${cascade.label}: from ${cascade.from} to ${cascade.to}`}
      aria-pressed={isActive}
    >
      <div className="flex items-center gap-3">
        <span className={`w-8 h-6 rounded flex items-center justify-center font-bold text-xs ${fromPrinciple.color}`}>
          {cascade.from}
        </span>
        <ArrowRight size={14} className="text-slate-500" />
        <span className={`w-8 h-6 rounded flex items-center justify-center font-bold text-xs ${toPrinciple.color}`}>
          {cascade.to}
        </span>
        <span className="ml-2 font-medium">{cascade.label}</span>
      </div>
      <Zap size={14} className={isActive ? 'text-yellow-400' : 'text-slate-600'} />
    </button>
  );
}
