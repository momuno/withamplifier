'use client'

import { useState } from 'react'
import ChladniWebGLTest from '@/components/ChladniWebGLTest'

const SECTION_PRESETS = {
  hero: { n: 2, m: 2, strength: 0.3, color: '#6366F1', opacity: 0.2, particleSize: 1.5 },
  problem: { n: 7, m: 11, strength: 0.8, color: '#999999', opacity: 0.25, particleSize: 1.0 },
  differentiation: { n: 3, m: 1, strength: 0.6, color: '#6366F1', opacity: 0.3, particleSize: 1.8 },
  platform: { n: 2, m: 2, strength: 0.5, color: '#6366F1', opacity: 0.35, particleSize: 1.6 },
  demo: { n: 4, m: 3, strength: 0.7, color: '#8B5CF6', opacity: 0.3, particleSize: 1.4 },
  bundles: { n: 1, m: 1, strength: 0.4, color: '#6366F1', opacity: 0.35, particleSize: 2.0 },
  ecosystem: { n: 5, m: 3, strength: 0.6, color: '#8B5CF6', opacity: 0.4, particleSize: 1.2 },
  cta: { n: 1, m: 1, strength: 0.5, color: '#6366F1', opacity: 0.4, particleSize: 2.2 },
}

const SECTIONS = [
  { id: 'hero', name: 'Hero' },
  { id: 'problem', name: 'Problem' },
  { id: 'differentiation', name: 'Differentiation' },
  { id: 'platform', name: 'Platform' },
  { id: 'demo', name: 'Demo' },
  { id: 'bundles', name: 'Bundles' },
  { id: 'ecosystem', name: 'Ecosystem' },
  { id: 'cta', name: 'CTA' },
]

export default function TestParticles() {
  const [params, setParams] = useState(SECTION_PRESETS.hero)
  const [currentPreset, setCurrentPreset] = useState('hero')

  const loadPreset = (presetId: string) => {
    console.log('[TestParticles] Loading preset:', presetId)
    setCurrentPreset(presetId)
    setParams(SECTION_PRESETS[presetId as keyof typeof SECTION_PRESETS])
  }

  const updateParam = (key: string, value: number | string) => {
    console.log('[TestParticles] Updating param:', key, '=', value)
    setParams(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-stone-50">
      {/* Particle Background */}
      <ChladniWebGLTest params={params} />

      {/* Controls Overlay */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="bg-white/95 backdrop-blur border-b border-stone-200 shadow-sm flex-shrink-0">
          <div className="px-6 py-3">
            <h1 className="text-lg font-bold text-stone-900">Particle Pattern Test Lab</h1>
          </div>
        </div>

        {/* Section Presets */}
        <div className="bg-white/90 backdrop-blur border-b border-stone-200 flex-shrink-0">
          <div className="px-6 py-3 flex gap-2 overflow-x-auto">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => loadPreset(section.id)}
                className={`
                  flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${currentPreset === section.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }
                `}
              >
                {section.name}
              </button>
            ))}
          </div>
        </div>

        {/* Parameter Controls */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="bg-white/95 backdrop-blur rounded-xl shadow-lg border border-stone-200 p-6 max-w-4xl">
            <h2 className="text-sm font-bold text-stone-900 mb-4">Live Parameter Controls</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Chladni n */}
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-2">
                  n (horizontal): <span className="font-mono font-bold text-indigo-600">{params.n}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="12"
                  step="1"
                  value={params.n}
                  onChange={(e) => updateParam('n', parseInt(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-[10px] text-stone-500 mt-1">
                  <span>1</span>
                  <span>12</span>
                </div>
              </div>

              {/* Chladni m */}
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-2">
                  m (vertical): <span className="font-mono font-bold text-indigo-600">{params.m}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="12"
                  step="1"
                  value={params.m}
                  onChange={(e) => updateParam('m', parseInt(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-[10px] text-stone-500 mt-1">
                  <span>1</span>
                  <span>12</span>
                </div>
              </div>

              {/* Strength */}
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-2">
                  Strength: <span className="font-mono font-bold text-indigo-600">{params.strength.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={params.strength}
                  onChange={(e) => updateParam('strength', parseFloat(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-[10px] text-stone-500 mt-1">
                  <span>0</span>
                  <span>1</span>
                </div>
              </div>

              {/* Opacity */}
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-2">
                  Opacity: <span className="font-mono font-bold text-indigo-600">{params.opacity.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={params.opacity}
                  onChange={(e) => updateParam('opacity', parseFloat(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-[10px] text-stone-500 mt-1">
                  <span>0</span>
                  <span>1</span>
                </div>
              </div>

              {/* Particle Size */}
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-2">
                  Particle Size: <span className="font-mono font-bold text-indigo-600">{params.particleSize.toFixed(1)}</span>
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="4"
                  step="0.1"
                  value={params.particleSize}
                  onChange={(e) => updateParam('particleSize', parseFloat(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-[10px] text-stone-500 mt-1">
                  <span>0.5</span>
                  <span>4</span>
                </div>
              </div>

              {/* Color */}
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-2">
                  Color: <span className="font-mono font-bold text-indigo-600">{params.color}</span>
                </label>
                <div className="flex gap-2 items-center">
                  <input
                    type="color"
                    value={params.color}
                    onChange={(e) => updateParam('color', e.target.value)}
                    className="w-12 h-8 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={params.color}
                    onChange={(e) => updateParam('color', e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs font-mono border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Formula Reference */}
            <div className="mt-6 pt-6 border-t border-stone-200">
              <h3 className="text-xs font-medium text-stone-500 uppercase tracking-wide mb-2">Chladni Formula</h3>
              <p className="font-mono text-xs text-stone-700 bg-stone-50 p-3 rounded">
                cos(n·π·x) · cos(m·π·y) - cos(m·π·x) · cos(n·π·y) = 0
              </p>
              <p className="text-[10px] text-stone-500 mt-2">
                Adjust n and m to control pattern complexity. Higher values create more nodal lines.
                Strength controls how forcefully particles are pulled to the pattern.
              </p>
            </div>

            {/* Current Values Display */}
            <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
              <h3 className="text-xs font-medium text-indigo-900 mb-2">Current Configuration</h3>
              <pre className="text-[10px] font-mono text-indigo-800">
{JSON.stringify(params, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
