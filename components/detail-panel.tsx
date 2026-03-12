'use client';

import { Code, Info, ShieldAlert, Zap } from 'lucide-react';
import { Cascade, PrincipleKey, PRINCIPLES } from '@/lib/solid-data';

interface DetailPanelProps {
  activeNode: PrincipleKey | null;
  activeCascade: Cascade | null;
  breaks: Cascade[];
  affectedBy: Cascade[];
}

/**
 * DetailPanel Component
 * Renders detailed information based on active selection
 * Demonstrates Open/Closed Principle - extensible through conditional rendering
 */
export function DetailPanel({
  activeNode,
  activeCascade,
  breaks,
  affectedBy
}: DetailPanelProps) {
  if (!activeNode && !activeCascade) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-slate-800/30 rounded-2xl border border-dashed border-slate-700">
        <Info className="text-slate-600 mb-4" size={48} />
        <p className="text-slate-400">
          Click a Principle node to see its upstream/downstream impacts,
          <br />
          or select a Cascade to see the code mechanism.
        </p>
      </div>
    );
  }

  if (activeNode) {
    const principle = PRINCIPLES[activeNode];
    return (
      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
        <div className={`p-6 ${principle.color}`}>
          <h2 className="text-2xl font-bold">{principle.full} ({activeNode})</h2>
          <p className="text-white/80 mt-1">Impact Analysis</p>
        </div>
        <div className="p-6 space-y-6">
          <section>
            <div className="flex items-center gap-2 mb-3 text-rose-400 font-semibold">
              <ShieldAlert size={18} />
              <h3>If you violate {activeNode}...</h3>
            </div>
            <div className="space-y-3">
              {breaks.map(c => (
                <div key={c.id} className="bg-slate-900 p-4 rounded-xl border border-rose-900/30">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-rose-400">Breaks {c.to}:</span>
                    <span className="font-medium">{c.label}</span>
                  </div>
                  <p className="text-sm text-slate-400">{c.description}</p>
                </div>
              ))}
              {breaks.length === 0 && (
                <p className="text-sm text-slate-500 italic">No direct downstream breaks mapped.</p>
              )}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-3 text-blue-400 font-semibold">
              <Zap size={18} />
              <h3>Upstream influences on {activeNode}</h3>
            </div>
            <div className="space-y-3">
              {affectedBy.map(c => (
                <div key={c.id} className="bg-slate-900 p-4 rounded-xl border border-blue-900/30">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-blue-400">Affected by {c.from}:</span>
                    <span className="font-medium">{c.label}</span>
                  </div>
                  <p className="text-sm text-slate-400">{c.description}</p>
                </div>
              ))}
              {affectedBy.length === 0 && (
                <p className="text-sm text-slate-500 italic">No direct upstream influences mapped.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (activeCascade) {
    return (
      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        <div className="p-6 bg-slate-750 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              <div className={`w-10 h-10 rounded-full border-2 border-slate-800 flex items-center justify-center font-bold ${PRINCIPLES[activeCascade.from].color}`}>
                {activeCascade.from}
              </div>
              <div className={`w-10 h-10 rounded-full border-2 border-slate-800 flex items-center justify-center font-bold ${PRINCIPLES[activeCascade.to].color}`}>
                {activeCascade.to}
              </div>
            </div>
            <h2 className="text-xl font-bold">{activeCascade.label}</h2>
          </div>
          <Zap className="text-yellow-400" />
        </div>
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-slate-500 uppercase mb-2">Architectural Logic</h3>
            <p className="text-slate-300 leading-relaxed">{activeCascade.description}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-500 uppercase mb-2 flex items-center gap-2">
              <Code size={14} /> C# Mechanism Example
            </h3>
            <pre className="bg-slate-950 p-4 rounded-xl overflow-x-auto text-sm font-mono border border-slate-900">
              <code className="text-blue-300">{activeCascade.code}</code>
            </pre>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
