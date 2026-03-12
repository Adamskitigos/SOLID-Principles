'use client';

import { useMemo, useState } from 'react';
import { Cascade, PrincipleKey, CASCADES } from '@/lib/solid-data';
import { PrinciplesCircle } from './principles-circle';
import { CascadesList } from './cascades-list';
import { DetailPanel } from './detail-panel';

/**
 * SOLIDCascadeMap Component
 * Main orchestrator component that manages state and coordinates child components
 * Demonstrates Single Responsibility - orchestrates component interaction
 */
export function SOLIDCascadeMap() {
  const [activeNode, setActiveNode] = useState<PrincipleKey | null>(null);
  const [activeCascade, setActiveCascade] = useState<Cascade | null>(null);

  // Compute which cascades affect the active node
  const connections = useMemo(() => {
    if (activeNode) {
      return {
        breaks: CASCADES.filter(c => c.from === activeNode),
        affectedBy: CASCADES.filter(c => c.to === activeNode)
      };
    }
    return { breaks: [], affectedBy: [] };
  }, [activeNode]);

  const handleNodeClick = (key: PrincipleKey) => {
    setActiveNode(key === activeNode ? null : key);
    setActiveCascade(null);
  };

  const handleCascadeClick = (cascade: Cascade) => {
    setActiveCascade(cascade);
    setActiveNode(null);
  };

  return (
    <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Graph Section */}
      <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-8 bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
        <PrinciplesCircle activeNode={activeNode} onNodeClick={handleNodeClick} />
        <CascadesList
          cascades={CASCADES}
          activeCascadeId={activeCascade?.id ?? null}
          onCascadeClick={handleCascadeClick}
        />
      </div>

      {/* Info Panel Section */}
      <div className="lg:col-span-7 space-y-6">
        <DetailPanel
          activeNode={activeNode}
          activeCascade={activeCascade}
          breaks={connections.breaks}
          affectedBy={connections.affectedBy}
        />
      </div>
    </main>
  );
}
