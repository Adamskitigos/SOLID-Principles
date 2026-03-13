'use client';

import { Code, Info, ShieldAlert, Zap, HelpCircle, CheckCircle2 } from 'lucide-react';
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

          {/* New Diagnostic Questions Section */}
          {principle.diagnosticQuestions && (
            <div className="mt-6 p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl border border-slate-700 shadow-xl backdrop-blur-md animate-in slide-in-from-bottom-3 fade-in duration-500 relative overflow-hidden group">
              <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 bg-indigo-500/20 rounded-lg border border-indigo-500/30 shadow-sm">
                    <HelpCircle size={20} className="text-indigo-400 drop-shadow-md" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-100 tracking-tight">Key Diagnostic Questions</h4>
                </div>
                <ul className="space-y-3">
                  {principle.diagnosticQuestions.map((question, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-sm bg-slate-950/40 rounded-xl p-4 border border-slate-700/40 shadow-sm transition-all duration-300 hover:bg-slate-800 hover:-translate-y-0.5 hover:shadow-md hover:border-slate-600">
                      <div className="mt-0.5 text-indigo-400/80 font-bold bg-indigo-950/50 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 border border-indigo-500/20 shadow-inner">
                        {idx + 1}
                      </div>
                      <span className="leading-relaxed text-slate-300 font-medium">{question}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* New LSP Table Section */}
          {principle.lspTable && (
            <div className="mt-6 animate-in slide-in-from-bottom-4 fade-in duration-700 relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative overflow-hidden rounded-2xl border border-slate-700 shadow-2xl bg-slate-900/80 backdrop-blur-sm">
                <div className="bg-slate-800/90 p-4 border-b border-slate-700/80 flex items-center justify-center gap-2">
                  <CheckCircle2 size={16} className="text-purple-400" />
                  <h4 className="uppercase tracking-[0.2em] text-xs font-bold text-slate-300">LSP Contract Rules</h4>
                </div>
                <div className="grid grid-cols-1">
                  {principle.lspTable.rules.map((rule, idx) => (
                    <div key={idx} className="group/row flex flex-col sm:flex-row border-b border-slate-700/50 last:border-0 transition-colors duration-300 hover:bg-slate-800/60">
                      <div className="p-4 sm:w-1/3 bg-slate-800/30 font-semibold text-slate-200 border-r border-slate-700/30 flex items-center transition-colors group-hover/row:text-purple-300">
                        {rule.name}
                      </div>
                      <div className="p-4 sm:w-2/3 text-slate-400 text-sm flex items-center leading-relaxed">
                        {rule.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
