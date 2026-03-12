'use client';

import { Network } from 'lucide-react';
import { PrincipleKey, PRINCIPLES } from '@/lib/solid-data';
import { PrincipleNode } from './principle-node';

interface PrinciplesCircleProps {
  activeNode: PrincipleKey | null;
  onNodeClick: (key: PrincipleKey) => void;
}

/**
 * PrinciplesCircle Component
 * Renders all five SOLID principles in a circular arrangement
 * Demonstrates Dependency Inversion - depends on abstraction (principle data) not specific implementations
 */
export function PrinciplesCircle({ activeNode, onNodeClick }: PrinciplesCircleProps) {
  const principleKeys: PrincipleKey[] = ['S', 'O', 'L', 'I', 'D'];
  const RADIUS = 110;

  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      {principleKeys.map((key, i) => {
        const angle = (i * (360 / 5) - 90) * (Math.PI / 180);
        const x = Math.cos(angle) * RADIUS;
        const y = Math.sin(angle) * RADIUS;

        return (
          <PrincipleNode
            key={key}
            id={key}
            principle={PRINCIPLES[key]}
            isActive={activeNode === key}
            x={x}
            y={y}
            onClick={() => onNodeClick(key === activeNode ? null : key)}
          />
        );
      })}
      <div className="w-16 h-16 bg-slate-900/50 rounded-full flex items-center justify-center border border-dashed border-slate-600">
        <Network className="text-slate-600" size={24} aria-hidden="true" />
      </div>
    </div>
  );
}
