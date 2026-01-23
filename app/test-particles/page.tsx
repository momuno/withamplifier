'use client'

import { useState } from 'react'
import ChladniWebGLTest from '@/components/ChladniWebGLTest'

export default function TestParticlesPage() {
  const [currentPattern, setCurrentPattern] = useState<'hero' | 'problem'>('hero')

  const patterns = {
    hero: {
      n: 3,
      m: 5,
      strength: 0.5,
      color: '#00ff88',
      opacity: 0.6,
      particleSize: 2,
    },
    problem: {
      n: 7,
      m: 9,
      strength: 0.7,
      color: '#ff4444',
      opacity: 0.7,
      particleSize: 2,
    }
  }

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Particles */}
      <ChladniWebGLTest params={patterns[currentPattern]} />

      {/* Controls - centered at bottom */}
      <div className="fixed bottom-12 left-0 right-0 z-10 flex justify-center gap-4">
        <button
          onClick={() => setCurrentPattern('hero')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            currentPattern === 'hero'
              ? 'bg-white text-black'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          Hero
        </button>
        <button
          onClick={() => setCurrentPattern('problem')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            currentPattern === 'problem'
              ? 'bg-white text-black'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          Problem (Chains)
        </button>
      </div>

      {/* Label - top center */}
      <div className="fixed top-12 left-0 right-0 z-10 flex justify-center">
        <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
          <h1 className="text-white text-2xl font-bold">
            {currentPattern === 'hero' ? 'Hero Pattern' : 'Problem Pattern (Chains)'}
          </h1>
          <p className="text-white/60 text-sm mt-1">
            {currentPattern === 'hero' 
              ? 'n=3, m=5 - Dynamic potential, open and inviting'
              : 'n=9, m=13 - Dense chains, trapped and constrained'
            }
          </p>
        </div>
      </div>
    </div>
  )
}
