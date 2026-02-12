'use client'

import { useState } from 'react'
import AmplifierArchitectureDiagram from '@/components/diagrams/AmplifierArchitectureDiagram'
import AmplifierValueDiagram from '@/components/diagrams/AmplifierValueDiagram'
import AmplifierLandscapeDiagram from '@/components/diagrams/AmplifierLandscapeDiagram'

export default function DiagramTestPage() {
  const [view, setView] = useState<'landscape' | 'value' | 'architecture'>('landscape')
  
  return (
    <div className="min-h-screen bg-[#0a0a0a] py-16 px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Toggle */}
        <div className="flex justify-center gap-2 mb-12">
          <button
            onClick={() => setView('landscape')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              view === 'landscape' 
                ? 'bg-[#2CBFD9] text-black' 
                : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
          >
            Isometric Landscape
          </button>
          <button
            onClick={() => setView('value')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              view === 'value' 
                ? 'bg-[#5B4DE3] text-white' 
                : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
          >
            Value Story
          </button>
          <button
            onClick={() => setView('architecture')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              view === 'architecture' 
                ? 'bg-[#5B4DE3] text-white' 
                : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
          >
            Architecture
          </button>
        </div>
        
        {view === 'landscape' ? (
          <AmplifierLandscapeDiagram />
        ) : view === 'value' ? (
          <AmplifierValueDiagram />
        ) : (
          <>
            <h1 className="text-3xl font-bold text-white text-center mb-4">
              Amplifier Architecture
            </h1>
            <p className="text-white/60 text-center mb-12 max-w-2xl mx-auto">
              A modular kernel for AI agents. The center stays still so the edges can move fast.
            </p>
            
            <AmplifierArchitectureDiagram />
            
            <div className="mt-16 grid md:grid-cols-2 gap-8 text-white/80">
              <div className="bg-white/5 rounded-xl p-6">
                <h3 className="font-semibold text-white mb-3">What the Kernel provides</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Session lifecycle management</li>
                  <li>• Module loading & protocol validation</li>
                  <li>• Event dispatch & hook registration</li>
                  <li>• Stable contracts (never break)</li>
                </ul>
                <p className="mt-4 text-xs text-white/50">MECHANISMS only. No opinions.</p>
              </div>
              
              <div className="bg-white/5 rounded-xl p-6">
                <h3 className="font-semibold text-white mb-3">What Modules provide</h3>
                <ul className="space-y-2 text-sm">
                  <li>• <span className="text-emerald-400">Providers</span> — LLM connections (Claude, GPT, etc.)</li>
                  <li>• <span className="text-amber-400">Tools</span> — Capabilities (filesystem, bash, web)</li>
                  <li>• <span className="text-pink-400">Orchestrators</span> — Agent loop strategy</li>
                  <li>• <span className="text-cyan-400">Hooks</span> — Observability (logging, approval)</li>
                  <li>• <span className="text-orange-400">Context</span> — Conversation memory</li>
                </ul>
                <p className="mt-4 text-xs text-white/50">POLICIES. Compete at edges.</p>
              </div>
            </div>
          </>
        )}
        
        <div className="mt-12 text-center">
          <p className="text-white/40 text-sm">
            {view === 'value' 
              ? "AI that amplifies your abilities instead of just assisting them."
              : "Swap any piece. See every decision. Works today, works tomorrow."
            }
          </p>
        </div>
      </div>
    </div>
  )
}
