'use client'

import { useState } from 'react'
import ChladniWebGLTest from '@/components/ChladniWebGLTest'

export default function TestParticlesPage() {
  const [currentPattern, setCurrentPattern] = useState<'hero' | 'problem' | 'differentiation' | 'platform' | 'demo' | 'bundles'>('hero')

  const patterns = {
    hero: {
      n: 3,
      m: 5,
      strength: 0.5,
      color: '#00ff88',
      opacity: 0.6,
      particleSize: 2,
      label: 'Hero - Dynamic Potential',
    },
    problem: {
      n: 7,
      m: 9,
      strength: 0.7,
      color: '#ff4444',
      opacity: 0.7,
      particleSize: 2,
      label: 'Problem - Trapped in Chains',
    },
    differentiation: {
      n: 2,
      m: 5,
      strength: 0.6,
      color: '#00d4ff',
      opacity: 0.65,
      particleSize: 2,
      label: 'Differentiation - Breaking Free',
    },
    platform: {
      n: 4,
      m: 6,
      strength: 0.65,
      color: '#7c3aed',
      opacity: 0.7,
      particleSize: 2,
      label: 'Platform - Organized Power',
    },
    demo: {
      n: 1,
      m: 3,
      strength: 0.5,
      color: '#fbbf24',
      opacity: 0.6,
      particleSize: 2,
      label: 'Demo - Grounded Foundation',
    },
    bundles: {
      n: 5,
      m: 7,
      strength: 0.7,
      color: '#ec4899',
      opacity: 0.7,
      particleSize: 2,
      label: 'Bundles - Refined Elegance',
    }
  }

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Particles */}
      <ChladniWebGLTest params={patterns[currentPattern]} />

      {/* Controls - centered at bottom */}
      <div className="fixed bottom-12 left-0 right-0 z-10 flex justify-center gap-3 px-4">
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl">
          {(Object.keys(patterns) as Array<keyof typeof patterns>).map((key) => (
            <button
              key={key}
              onClick={() => setCurrentPattern(key)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                currentPattern === key
                  ? 'bg-white text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Label - top center */}
      <div className="fixed top-12 left-0 right-0 z-10 flex justify-center px-4">
        <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg max-w-2xl text-center">
          <h1 className="text-white text-xl md:text-2xl font-bold">
            {patterns[currentPattern].label}
          </h1>
          <p className="text-white/60 text-sm mt-1">
            n={patterns[currentPattern].n}, m={patterns[currentPattern].m}
          </p>
        </div>
      </div>
    </div>
  )
}
