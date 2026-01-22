'use client'

import { useState, useEffect } from 'react'
import ChladniWebGL from '@/components/ChladniWebGL'

const SECTIONS = [
  { id: 'hero', name: 'Hero', description: 'Open Field' },
  { id: 'problem', name: 'Problem', description: 'Scattered Chaos' },
  { id: 'differentiation', name: 'Differentiation', description: 'Three Pillars' },
  { id: 'platform', name: 'Platform', description: 'Four Quadrants' },
  { id: 'demo', name: 'Demo', description: 'Dynamic Action' },
  { id: 'bundles', name: 'Bundles', description: 'Simple Unity' },
  { id: 'ecosystem', name: 'Ecosystem', description: 'Network Resonance' },
  { id: 'cta', name: 'CTA', description: 'Convergence' },
]

// Pattern definitions (from ChladniWebGL component)
const PATTERN_INFO: Record<string, any> = {
  hero: {
    id: 'hero',
    name: 'Open Field',
    params: { n: 2, m: 2, strength: 0.3 },
    color: '#6366F1',
    opacity: 0.2,
    particleSize: 1.5,
  },
  problem: {
    id: 'problem',
    name: 'Scattered Chaos',
    params: { n: 7, m: 11, strength: 0.8 },
    color: '#999999',
    opacity: 0.25,
    particleSize: 1.0,
  },
  differentiation: {
    id: 'differentiation',
    name: 'Three Pillars',
    params: { n: 3, m: 1, strength: 0.6 },
    color: '#6366F1',
    glowColor: '#818CF8',
    opacity: 0.3,
    particleSize: 1.8,
  },
  platform: {
    id: 'platform',
    name: 'Four Quadrants',
    params: { n: 2, m: 2, strength: 0.5 },
    color: '#6366F1',
    opacity: 0.35,
    particleSize: 1.6,
  },
  demo: {
    id: 'demo',
    name: 'Dynamic Action',
    params: { n: 4, m: 3, strength: 0.7 },
    color: '#8B5CF6',
    opacity: 0.3,
    particleSize: 1.4,
  },
  bundles: {
    id: 'bundles',
    name: 'Simple Unity',
    params: { n: 1, m: 1, strength: 0.4 },
    color: '#6366F1',
    opacity: 0.35,
    particleSize: 2.0,
  },
  ecosystem: {
    id: 'ecosystem',
    name: 'Network Resonance',
    params: { n: 5, m: 3, strength: 0.6 },
    color: '#8B5CF6',
    opacity: 0.4,
    particleSize: 1.2,
  },
  cta: {
    id: 'cta',
    name: 'Convergence',
    params: { n: 1, m: 1, strength: 0.5 },
    color: '#6366F1',
    glowColor: '#818CF8',
    opacity: 0.4,
    particleSize: 2.2,
  },
}

export default function TestParticles() {
  const [currentSection, setCurrentSection] = useState('hero')
  const [showInfo, setShowInfo] = useState(true)

  useEffect(() => {
    // Trigger section change in ChladniWebGL
    const section = document.querySelector(`[data-section="${currentSection}"]`)
    if (section) {
      section.scrollIntoView({ behavior: 'instant' })
    }
  }, [currentSection])

  const currentPattern = PATTERN_INFO[currentSection]

  return (
    <div className="min-h-screen bg-stone-50">
      {/* ChladniWebGL Background */}
      <ChladniWebGL />

      {/* Test UI Overlay */}
      <div className="relative z-10">
        {/* Header */}
        <div className="bg-white/95 backdrop-blur border-b border-stone-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-stone-900">Particle Pattern Test Lab</h1>
                <p className="text-sm text-stone-600 mt-1">Click sections below to preview particle behaviors</p>
              </div>
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 rounded-lg text-sm font-medium text-stone-700 transition-colors"
              >
                {showInfo ? 'Hide' : 'Show'} Info Panel
              </button>
            </div>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="bg-white/90 backdrop-blur border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex overflow-x-auto gap-2 py-3">
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setCurrentSection(section.id)}
                  className={`
                    flex-shrink-0 px-6 py-3 rounded-lg font-medium transition-all duration-200
                    ${currentSection === section.id
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }
                  `}
                >
                  <div className="text-left">
                    <div className="font-semibold">{section.name}</div>
                    <div className={`text-xs mt-0.5 ${currentSection === section.id ? 'text-indigo-200' : 'text-stone-500'}`}>
                      {section.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Info Panel */}
        {showInfo && currentPattern && (
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="bg-white/95 backdrop-blur rounded-xl shadow-lg border border-stone-200 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Pattern Name */}
                <div>
                  <h3 className="text-xs font-medium text-stone-500 uppercase tracking-wide mb-2">Pattern Name</h3>
                  <p className="text-2xl font-bold text-stone-900">{currentPattern.name}</p>
                  <p className="text-sm text-stone-600 mt-1">Section: {currentSection}</p>
                </div>

                {/* Chladni Parameters */}
                <div>
                  <h3 className="text-xs font-medium text-stone-500 uppercase tracking-wide mb-2">Chladni Parameters</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-stone-600">n (horizontal):</span>
                      <span className="font-mono font-semibold text-stone-900">{currentPattern.params.n}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-stone-600">m (vertical):</span>
                      <span className="font-mono font-semibold text-stone-900">{currentPattern.params.m}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-stone-600">Strength:</span>
                      <span className="font-mono font-semibold text-stone-900">{currentPattern.params.strength}</span>
                    </div>
                  </div>
                </div>

                {/* Visual Properties */}
                <div>
                  <h3 className="text-xs font-medium text-stone-500 uppercase tracking-wide mb-2">Visual Properties</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-stone-600">Color:</span>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-6 h-6 rounded border border-stone-300"
                          style={{ backgroundColor: currentPattern.color }}
                        />
                        <span className="font-mono text-xs text-stone-900">{currentPattern.color}</span>
                      </div>
                    </div>
                    {currentPattern.glowColor && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-stone-600">Glow:</span>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-6 h-6 rounded border border-stone-300"
                            style={{ backgroundColor: currentPattern.glowColor }}
                          />
                          <span className="font-mono text-xs text-stone-900">{currentPattern.glowColor}</span>
                        </div>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-stone-600">Opacity:</span>
                      <span className="font-mono font-semibold text-stone-900">{currentPattern.opacity}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-stone-600">Particle Size:</span>
                      <span className="font-mono font-semibold text-stone-900">{currentPattern.particleSize}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Reference */}
                <div>
                  <h3 className="text-xs font-medium text-stone-500 uppercase tracking-wide mb-2">Quick Reference</h3>
                  <div className="text-xs text-stone-600 space-y-1.5">
                    <p><strong>n, m:</strong> Control pattern complexity</p>
                    <p><strong>Strength:</strong> Pull force (0-1)</p>
                    <p><strong>Opacity:</strong> Particle visibility</p>
                    <p><strong>Size:</strong> Particle scale</p>
                  </div>
                </div>
              </div>

              {/* Pattern Formula */}
              <div className="mt-6 pt-6 border-t border-stone-200">
                <h3 className="text-xs font-medium text-stone-500 uppercase tracking-wide mb-2">Chladni Formula</h3>
                <p className="font-mono text-sm text-stone-700 bg-stone-50 p-3 rounded">
                  cos(n·π·x) · cos(m·π·y) - cos(m·π·x) · cos(n·π·y) = 0
                </p>
                <p className="text-xs text-stone-500 mt-2">
                  This mathematical formula creates the standing wave patterns. Higher n/m values create more complex patterns.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Invisible section markers for ChladniWebGL intersection observer */}
        <div className="invisible">
          {SECTIONS.map((section) => (
            <div
              key={section.id}
              data-section={section.id}
              className="h-screen"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
