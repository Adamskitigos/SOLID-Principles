'use client';

import { Cascade } from '@/lib/solid-data';
import { CascadeButton } from './cascade-button';

interface CascadesListProps {
  cascades: Cascade[];
  activeCascadeId: string | null;
  onCascadeClick: (cascade: Cascade) => void;
}

/**
 * CascadesList Component
 * Renders all cascade relationships in a scrollable list
 * Demonstrates Liskov Substitution - safely substitutable behavior through consistent interface
 */
export function CascadesList({
  cascades,
  activeCascadeId,
  onCascadeClick
}: CascadesListProps) {
  return (
    <div className="w-full space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
        The 9 Critical Cascades
      </h3>
      <div className="grid grid-cols-1 gap-2 max-h-96 overflow-y-auto">
        {cascades.map(cascade => (
          <CascadeButton
            key={cascade.id}
            cascade={cascade}
            isActive={activeCascadeId === cascade.id}
            onClick={() => onCascadeClick(cascade)}
          />
        ))}
      </div>
    </div>
  );
}
