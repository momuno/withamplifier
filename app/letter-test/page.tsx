'use client'

import { useEffect, useRef, useState } from 'react'
import { letterShapeForce, getAShapeSegments } from '@/lib/letter-attractor'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
}

export default function LetterTestPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>(0)
  
  const [strength, setStrength] = useState(0.8)
  const [damping, setDamping] = useState(0.92)
  const [jitter, setJitter] = useState(0.002)
  const [particleSize, setParticleSize] = useState(2)
  const [color, setColor] = useState('#D9846B')
  const [bgColor, setBgColor] = useState('#0D1E28')
  const [showGuide, setShowGuide] = useState(false)
  const [initialized, setInitialized] = useState(false)
  
  // Initialize particles once
  useEffect(() => {
    const particles: Particle[] = []
    for (let i = 0; i < 15000; i++) {
      particles.push({
        x: Math.random(),
        y: Math.random(),
        vx: 0,
        vy: 0,
        size: particleSize * (0.8 + Math.random() * 0.4)
      })
    }
    particlesRef.current = particles
    setInitialized(true)
  }, [])
  
  // Animation loop
  useEffect(() => {
    if (!initialized) return
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const width = canvas.width
    const height = canvas.height
    
    function animate() {
      if (!ctx) return
      
      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, width, height)
      
      if (showGuide) {
        ctx.strokeStyle = 'rgba(255,255,255,0.2)'
        ctx.lineWidth = 2
        const segments = getAShapeSegments()
        for (const seg of segments) {
          ctx.beginPath()
          ctx.moveTo(seg.x1 * width, seg.y1 * height)
          ctx.lineTo(seg.x2 * width, seg.y2 * height)
          ctx.stroke()
        }
      }
      
      const particles = particlesRef.current
      ctx.fillStyle = color
      
      for (const p of particles) {
        const [fx, fy] = letterShapeForce(p.x, p.y, strength)
        
        p.vx += fx * 0.01
        p.vy += fy * 0.01
        p.vx += (Math.random() - 0.5) * jitter
        p.vy += (Math.random() - 0.5) * jitter
        p.vx *= damping
        p.vy *= damping
        p.x += p.vx
        p.y += p.vy
        
        if (p.x < 0) p.x = 1
        if (p.x > 1) p.x = 0
        if (p.y < 0) p.y = 1
        if (p.y > 1) p.y = 0
        
        ctx.globalAlpha = 0.6
        ctx.beginPath()
        ctx.arc(p.x * width, p.y * height, particleSize, 0, Math.PI * 2)
        ctx.fill()
      }
      
      ctx.globalAlpha = 1
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animate()
    return () => cancelAnimationFrame(animationRef.current)
  }, [initialized, strength, damping, jitter, color, bgColor, showGuide, particleSize])
  
  const scatter = () => {
    particlesRef.current.forEach(p => {
      p.x = Math.random()
      p.y = Math.random()
      p.vx = 0
      p.vy = 0
    })
  }
  
  return (
    <div className="min-h-screen bg-black flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <canvas ref={canvasRef} width={800} height={800} className="border border-gray-800 rounded-lg"/>
      </div>
      
      <div className="w-80 bg-gray-900 p-6 overflow-y-auto">
        <h1 className="text-xl font-bold text-white mb-6">Letter "A" Particles</h1>
        
        <div className="space-y-5">
          <div>
            <label className="text-sm text-gray-400 block mb-1">Strength: {strength.toFixed(2)}</label>
            <input type="range" min="0.1" max="2" step="0.05" value={strength} onChange={(e) => setStrength(parseFloat(e.target.value))} className="w-full"/>
          </div>
          
          <div>
            <label className="text-sm text-gray-400 block mb-1">Damping: {damping.toFixed(3)}</label>
            <input type="range" min="0.8" max="0.99" step="0.005" value={damping} onChange={(e) => setDamping(parseFloat(e.target.value))} className="w-full"/>
          </div>
          
          <div>
            <label className="text-sm text-gray-400 block mb-1">Jitter: {jitter.toFixed(4)}</label>
            <input type="range" min="0.0005" max="0.01" step="0.0005" value={jitter} onChange={(e) => setJitter(parseFloat(e.target.value))} className="w-full"/>
          </div>
          
          <div>
            <label className="text-sm text-gray-400 block mb-1">Particle Size: {particleSize.toFixed(1)}</label>
            <input type="range" min="0.5" max="5" step="0.5" value={particleSize} onChange={(e) => setParticleSize(parseFloat(e.target.value))} className="w-full"/>
          </div>
          
          <div>
            <label className="text-sm text-gray-400 block mb-2">Color</label>
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-full h-10 rounded"/>
          </div>
          
          <div>
            <label className="text-sm text-gray-400 block mb-2">Background</label>
            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-full h-10 rounded"/>
          </div>
          
          <div className="flex items-center gap-2">
            <input type="checkbox" id="showGuide" checked={showGuide} onChange={(e) => setShowGuide(e.target.checked)}/>
            <label htmlFor="showGuide" className="text-sm text-gray-400">Show guide lines</label>
          </div>
          
          <button onClick={scatter} className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded">
            Scatter Particles
          </button>
        </div>
      </div>
    </div>
  )
}
