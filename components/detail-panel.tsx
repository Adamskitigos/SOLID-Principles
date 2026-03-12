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
      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden flex flex-col animate-in fade-in slide-in-from-right-4 duration-300 shadow-xl">
        <div className={`p-6 md:p-8 ${principle.color} text-white`}>
          <div className="flex justify-between items-start gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight drop-shadow-sm">{principle.full} ({activeNode})</h2>
              <p className="text-white mt-2 text-lg font-medium opacity-90 drop-shadow-sm">{principle.description}</p>
            </div>
            <div className="w-14 h-14 rounded-full border-4 border-white/20 flex items-center justify-center font-bold text-2xl flex-shrink-0 bg-white/10 shadow-inner">
              {activeNode}
            </div>
          </div>
          
          {principle.concept && (
            <div className="mt-8 p-5 bg-black/20 rounded-xl border border-white/10 backdrop-blur-md shadow-inner transition-all hover:bg-black/30 animate-in slide-in-from-bottom-2 fade-in duration-500">
              <div className="flex items-center gap-2 mb-3 font-semibold">
                <Zap size={20} className="text-yellow-300 drop-shadow-md" />
                <h4 className="text-white text-lg drop-shadow-sm">{principle.concept.title}</h4>
              </div>
              <p className="text-white/95 text-base leading-relaxed">
                {principle.concept.description}
              </p>
              {principle.concept.highlights && (
                <ul className="mt-4 space-y-2">
                  {principle.concept.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-white/95 bg-white/10 rounded-lg p-3 border border-white/5 shadow-sm transition hover:bg-white/15">
                      <span className="text-yellow-300 font-bold mt-0.5">•</span>
                      <span className="leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
        
        <div className="px-6 py-4 bg-slate-800/80 border-b border-slate-700/80 backdrop-blur-sm">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <ShieldAlert size={14} /> Sequence & Impact Analysis
          </h3>
        </div>

        <div className="p-6 space-y-6 bg-slate-800">
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
            <pre className="bg-slate-950 p-4 rounded-xl overflow-x-auto text-sm font-mono border border-slate-900 shadow-inner">
              <code>
                {activeCascade.code.split('\n').map((line, i) => {
                  let className = "text-blue-300";
                  let isTag = false;
                  
                  if (line.trim().startsWith('// --- PROBLEM')) {
                    className = "text-rose-400 font-bold border border-rose-900/50 bg-rose-950/50 px-3 py-1 rounded-md mt-0 mb-3 inline-block shadow-sm";
                    isTag = true;
                  } else if (line.trim().startsWith('// --- SOLUTION')) {
                    className = "text-emerald-400 font-bold border border-emerald-900/50 bg-emerald-950/50 px-3 py-1 rounded-md mt-6 mb-3 inline-block shadow-sm";
                    isTag = true;
                  } else if (line.trim().startsWith('//')) {
                    className = "text-slate-500 italic";
                  }
                  
                  if (isTag) {
                    return (
                      <div key={i} className="w-full">
                        <span className={className}>{line.replace('// --- ', '').replace(' ---', '')}</span>
                      </div>
                    );
                  }
                  
                  return (
                    <div key={i} className={className} style={{ minHeight: '1.25rem' }}>
                      {line}
                    </div>
                  );
                })}
              </code>
            </pre>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
