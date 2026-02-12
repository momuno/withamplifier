'use client'

import { useState, useCallback, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import ChladniWebGLTest from '@/components/ChladniWebGLTest'
import { PARTICLE_SECTIONS } from '@/lib/particle-config'

// Helper to get number from URL params with fallback
function getParam(params: URLSearchParams, key: string, fallback: number): number {
  const val = params.get(key)
  if (val === null) return fallback
  const parsed = parseFloat(val)
  return isNaN(parsed) ? fallback : parsed
}

// Helper to get string from URL params with fallback  
function getStringParam(params: URLSearchParams, key: string, fallback: string): string {
  return params.get(key) ?? fallback
}

// Slider component for consistent styling
function Slider({ 
  label, 
  value, 
  onChange, 
  min, 
  max, 
  step,
  description
}: { 
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step: number
  description?: string
}) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <label className="text-sm font-medium text-white">{label}</label>
        <span className="text-xs font-mono text-gray-400 bg-gray-800 px-2 py-0.5 rounded">
          {value.toFixed(step < 0.01 ? 4 : step < 1 ? 2 : 0)}
        </span>
      </div>
      {description && (
        <p className="text-xs text-gray-500 mb-2">{description}</p>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  )
}

export default function ChladniTestPage() {
  const searchParams = useSearchParams()
  
  // Start with the learn-hero defaults
  const baseParams = PARTICLE_SECTIONS['learn-hero']
  
  // Initialize from URL params (persisted across reload) or use defaults
  const [n, setN] = useState(() => getParam(searchParams, 'n', baseParams.n))
  const [m, setM] = useState(() => getParam(searchParams, 'm', baseParams.m))
  const [strength, setStrength] = useState(() => getParam(searchParams, 'strength', baseParams.strength))
  const [opacity, setOpacity] = useState(() => getParam(searchParams, 'opacity', baseParams.opacity))
  const [particleSize, setParticleSize] = useState(() => getParam(searchParams, 'particleSize', baseParams.particleSize))
  const [color, setColor] = useState(() => getStringParam(searchParams, 'color', baseParams.color))
  
  // Tuning params (previously hardcoded)
  const [damping, setDamping] = useState(() => getParam(searchParams, 'damping', 0.95))
  const [jitterStrength, setJitterStrength] = useState(() => getParam(searchParams, 'jitterStrength', 0.0003))
  const [lerpSpeed, setLerpSpeed] = useState(() => getParam(searchParams, 'lerpSpeed', 0.02))
  const [particleCount, setParticleCount] = useState(() => getParam(searchParams, 'particleCount', 50000))
  
  // Track if particle count changed (needs reload to apply)
  const [initialParticleCount] = useState(() => getParam(searchParams, 'particleCount', 50000))
  const particleCountChanged = particleCount !== initialParticleCount
  
  // Sync state to URL params (so reload preserves settings)
  useEffect(() => {
    const params = new URLSearchParams()
    params.set('n', n.toString())
    params.set('m', m.toString())
    params.set('strength', strength.toString())
    params.set('opacity', opacity.toString())
    params.set('particleSize', particleSize.toString())
    params.set('color', color)
    params.set('damping', damping.toString())
    params.set('jitterStrength', jitterStrength.toString())
    params.set('lerpSpeed', lerpSpeed.toString())
    params.set('particleCount', particleCount.toString())
    
    // Update URL without adding to history
    window.history.replaceState(null, '', `?${params.toString()}`)
  }, [n, m, strength, opacity, particleSize, color, damping, jitterStrength, lerpSpeed, particleCount])
  
  // Apply particle count change (requires reload)
  const applyParticleCount = useCallback(() => {
    window.location.reload()
  }, [])

  // Build the params objects
  const params = {
    n,
    m,
    strength,
    color,
    opacity,
    particleSize,
  }

  const tuning = {
    damping,
    jitterStrength,
    lerpSpeed,
    particleCount,
  }

  // Copy current settings to clipboard
  const copySettings = useCallback(() => {
    const settings = {
      params: { n, m, strength, color, opacity, particleSize },
      tuning: { damping, jitterStrength, lerpSpeed, particleCount }
    }
    navigator.clipboard.writeText(JSON.stringify(settings, null, 2))
    alert('Settings copied to clipboard!')
  }, [n, m, strength, color, opacity, particleSize, damping, jitterStrength, lerpSpeed, particleCount])

  // Reset to defaults
  const resetToDefaults = useCallback(() => {
    setN(baseParams.n)
    setM(baseParams.m)
    setStrength(baseParams.strength)
    setOpacity(baseParams.opacity)
    setParticleSize(baseParams.particleSize)
    setColor(baseParams.color)
    setDamping(0.95)
    setJitterStrength(0.0003)
    setLerpSpeed(0.02)
    setParticleCount(50000)
  }, [baseParams])

  // Apply suggested "less settled" settings
  const applyLessSettled = useCallback(() => {
    setDamping(0.88)
    setJitterStrength(0.0015)
    setStrength(0.4)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* The Chladni effect canvas */}
      <ChladniWebGLTest params={params} tuning={tuning} />

      {/* Control panel - fixed on right side */}
      <div className="fixed right-4 top-4 bottom-4 w-80 bg-gray-900/95 backdrop-blur-sm rounded-xl p-4 overflow-y-auto z-50 border border-gray-800">
        <h1 className="text-lg font-bold mb-4 text-green-400">Chladni Tuning</h1>
        
        {/* Quick presets */}
        <div className="mb-6 flex gap-2">
          <button
            onClick={resetToDefaults}
            className="flex-1 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded text-xs font-medium transition-colors"
          >
            Reset Defaults
          </button>
          <button
            onClick={applyLessSettled}
            className="flex-1 px-3 py-2 bg-green-800 hover:bg-green-700 rounded text-xs font-medium transition-colors"
          >
            Less Settled
          </button>
        </div>

        {/* Physics / Tuning Section */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide border-b border-gray-700 pb-2">
            Physics (Key Controls)
          </h2>
          
          <Slider
            label="Damping"
            value={damping}
            onChange={setDamping}
            min={0.8}
            max={0.99}
            step={0.01}
            description="Lower = more floaty, particles keep moving longer"
          />
          
          <Slider
            label="Jitter Strength"
            value={jitterStrength}
            onChange={setJitterStrength}
            min={0.0001}
            max={0.005}
            step={0.0001}
            description="Higher = softer patterns, less harsh lines"
          />
          
          <Slider
            label="Force Strength"
            value={strength}
            onChange={setStrength}
            min={0.1}
            max={1.5}
            step={0.05}
            description="How strongly particles are pulled to nodal lines"
          />
          
          <Slider
            label="Lerp Speed"
            value={lerpSpeed}
            onChange={setLerpSpeed}
            min={0.005}
            max={0.1}
            step={0.005}
            description="Pattern transition smoothness when n/m change"
          />
        </div>

        {/* Pattern Section */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide border-b border-gray-700 pb-2">
            Pattern
          </h2>
          
          <Slider
            label="N (horizontal)"
            value={n}
            onChange={setN}
            min={1}
            max={12}
            step={1}
            description="Pattern complexity in X direction"
          />
          
          <Slider
            label="M (vertical)"
            value={m}
            onChange={setM}
            min={1}
            max={12}
            step={1}
            description="Pattern complexity in Y direction"
          />
        </div>

        {/* Visual Section */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide border-b border-gray-700 pb-2">
            Visual
          </h2>
          
          <Slider
            label="Opacity"
            value={opacity}
            onChange={setOpacity}
            min={0.05}
            max={0.6}
            step={0.01}
          />
          
          <Slider
            label="Particle Size"
            value={particleSize}
            onChange={setParticleSize}
            min={0.5}
            max={4}
            step={0.1}
          />
          
          <Slider
            label="Particle Count"
            value={particleCount}
            onChange={setParticleCount}
            min={10000}
            max={100000}
            step={5000}
            description="More particles = denser pattern"
          />
          {particleCountChanged && (
            <button
              onClick={applyParticleCount}
              className="w-full mb-4 px-3 py-2 bg-yellow-600 hover:bg-yellow-500 rounded text-sm font-medium transition-colors"
            >
              Apply Particle Count & Reload
            </button>
          )}
          
          <div className="mb-4">
            <label className="text-sm font-medium text-white block mb-2">Color</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full h-10 rounded cursor-pointer bg-transparent"
            />
          </div>
        </div>

        {/* Export button */}
        <button
          onClick={copySettings}
          className="w-full px-4 py-3 bg-green-600 hover:bg-green-500 rounded-lg font-medium transition-colors"
        >
          Copy Settings to Clipboard
        </button>

        {/* Current values display */}
        <div className="mt-4 p-3 bg-gray-800 rounded-lg">
          <h3 className="text-xs font-semibold text-gray-400 mb-2">Current Tuning Values</h3>
          <pre className="text-xs text-gray-300 font-mono overflow-x-auto">
{`damping: ${damping}
jitter: ${jitterStrength}
strength: ${strength}
lerpSpeed: ${lerpSpeed}`}
          </pre>
        </div>
      </div>

      {/* Info overlay - bottom left */}
      <div className="fixed left-4 bottom-4 bg-gray-900/80 backdrop-blur-sm rounded-lg p-4 max-w-md z-50 border border-gray-800">
        <h2 className="text-sm font-semibold text-green-400 mb-2">Tuning Guide</h2>
        <ul className="text-xs text-gray-400 space-y-1">
          <li><strong className="text-white">Settling too fast?</strong> Lower damping (try 0.88-0.92)</li>
          <li><strong className="text-white">Thin harsh lines?</strong> Increase jitter (try 0.001-0.002)</li>
          <li><strong className="text-white">Too aggressive?</strong> Lower strength (try 0.3-0.5)</li>
          <li><strong className="text-white">Want more motion?</strong> Combine low damping + high jitter</li>
        </ul>
      </div>
    </div>
  )
}
