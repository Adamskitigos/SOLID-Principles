'use client';

import { Network } from 'lucide-react';
import { PrincipleKey, PRINCIPLES, CASCADES } from '@/lib/solid-data';
import { PrincipleNode } from './principle-node';

interface PrinciplesCircleProps {
  activeNode: PrincipleKey | null;
  onNodeClick: (key: PrincipleKey) => void;
}

/**
 * PrinciplesCircle Component
 * Renders all five SOLID principles in a circular arrangement with animated interactive paths
 */
export function PrinciplesCircle({ activeNode, onNodeClick }: PrinciplesCircleProps) {
  const principleKeys: PrincipleKey[] = ['S', 'O', 'L', 'I', 'D'];
  const RADIUS = 110;

  // Pre-calculate node positions mathematically
  const nodePositions = principleKeys.reduce((acc, key, i) => {
    const angle = (i * (360 / 5) - 90) * (Math.PI / 180);
    acc[key] = {
      x: Math.cos(angle) * RADIUS,
      y: Math.sin(angle) * RADIUS
    };
    return acc;
  }, {} as Record<PrincipleKey, { x: number; y: number }>);

  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* SVG Interactive Lines Layer */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ overflow: 'visible' }}>
        <g transform="translate(128, 128)">
          {CASCADES.map((cascade) => {
            const startNode = nodePositions[cascade.from];
            const endNode = nodePositions[cascade.to];
            const isFromActive = activeNode === cascade.from;
            const isToActive = activeNode === cascade.to;
            const isActive = isFromActive || isToActive;

            // Dim paths not involving the active node
            const isDimmed = activeNode !== null && !isActive;

            let strokeClass = "stroke-slate-700/30";
            let strokeWidth = 1.5;
            let displayDashArray = "0";

            if (isFromActive) {
              // Active node BREAKS this downstream (Red)
              strokeClass = "stroke-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]";
              strokeWidth = 3;
              displayDashArray = "6 6";
            } else if (isToActive) {
              // Active node is AFFECTED BY this upstream (Blue)
              strokeClass = "stroke-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]";
              strokeWidth = 3;
              displayDashArray = "6 6";
            } else if (!isDimmed) {
              strokeClass = "stroke-slate-600/50";
            }

            return (
              <line
                key={cascade.id}
                x1={startNode.x}
                y1={startNode.y}
                x2={endNode.x}
                y2={endNode.y}
                className={`transition-all duration-500 ease-in-out ${strokeClass}`}
                strokeWidth={strokeWidth}
                strokeDasharray={displayDashArray}
              >
                {isActive && (
                  <animate
                    attributeName="stroke-dashoffset"
                    from="24"
                    to="0"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                )}
              </line>
            );
          })}
        </g>
      </svg>

      {/* Central Hub Icon */}
      <div className={`absolute w-16 h-16 rounded-full flex items-center justify-center border transition-all duration-500 z-10 ${activeNode
          ? 'bg-slate-900/90 border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.2)] backdrop-blur-md'
          : 'bg-slate-900/50 border-dashed border-slate-600'
        }`}>
        <Network
          className={`transition-colors duration-500 ${activeNode ? 'text-indigo-400' : 'text-slate-600'}`}
          size={24}
        />
      </div>

      {/* Principle Nodes */}
      {principleKeys.map((key) => {
        const { x, y } = nodePositions[key];
        return (
          <PrincipleNode
            key={key}
            id={key}
            principle={PRINCIPLES[key]}
            isActive={activeNode === key}
            x={x}
            y={y}
            onClick={() => onNodeClick(key)}
          />
        );
      })}
    </div>
  );
}
