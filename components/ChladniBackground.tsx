'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import { 
  SECTION_PATTERNS, 
  chladniForce, 
  interpolateForce,
  generateParticles,
  type PatternConfig,
  type ChladniParams
} from '@/lib/chladni'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
}

interface SectionConfig {
  id: string
  pattern: PatternConfig
  isDark: boolean
}

// Map section IDs to their configurations
const SECTION_CONFIGS: SectionConfig[] = [
  { id: 'hero', pattern: SECTION_PATTERNS.hero, isDark: false },
  { id: 'differentiation', pattern: SECTION_PATTERNS.differentiation, isDark: true },
  { id: 'platform', pattern: SECTION_PATTERNS.platform, isDark: false },
  { id: 'demo', pattern: SECTION_PATTERNS.demo, isDark: false },
  { id: 'bundles', pattern: SECTION_PATTERNS.bundles, isDark: false },
  { id: 'impact', pattern: SECTION_PATTERNS.impact, isDark: true },
  { id: 'contrast', pattern: SECTION_PATTERNS.contrast, isDark: false },
  { id: 'ecosystem', pattern: SECTION_PATTERNS.ecosystem, isDark: false },
  { id: 'cta', pattern: SECTION_PATTERNS.cta, isDark: true },
]

interface ChladniBackgroundProps {
  className?: string
}

export default function ChladniBackground({ className = '' }: ChladniBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(0)
  const mouseRef = useRef<{ x: number; y: number } | null>(null)
  
  // Current and target pattern state
  const currentPatternRef = useRef<ChladniParams>({ n: 1, m: 2 })
  const targetPatternRef = useRef<ChladniParams>({ n: 1, m: 2 })
  const transitionRef = useRef<number>(1) // 0 = transitioning, 1 = stable
  const currentColorRef = useRef<string>('#6366F1')
  const currentOpacityRef = useRef<number>(0.3)
  const isDarkRef = useRef<boolean>(false)
  
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Initialize particles
  useEffect(() => {
    const checkMobile = () => window.innerWidth < 768
    const checkReducedMotion = () => 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    setIsMobile(checkMobile())
    setIsReducedMotion(checkReducedMotion())
    
    const particleCount = checkMobile() ? 400 : 1000
    particlesRef.current = generateParticles(particleCount)
    
    const handleResize = () => {
      setIsMobile(checkMobile())
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Set up section observers
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          const sectionId = entry.target.getAttribute('data-section')
          const config = SECTION_CONFIGS.find(s => s.id === sectionId)
          
          if (config) {
            // Start transition to new pattern
            currentPatternRef.current = { ...targetPatternRef.current }
            targetPatternRef.current = config.pattern.params
            transitionRef.current = 0
            
            // Update colors
            currentColorRef.current = config.pattern.color
            currentOpacityRef.current = config.pattern.opacity
            isDarkRef.current = config.isDark
          }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, {
      threshold: [0.3, 0.5, 0.7],
      rootMargin: '-10% 0px -10% 0px'
    })

    // Observe all sections with data-section attribute
    const sections = document.querySelectorAll('[data-section]')
    sections.forEach(section => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current
      if (!canvas) return
      
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current = null
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // Animation loop
  const animate = useCallback((timestamp: number) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    // Throttle to 30fps on mobile
    const targetFps = isMobile ? 30 : 60
    const frameInterval = 1000 / targetFps
    
    if (timestamp - lastTimeRef.current < frameInterval) {
      animationRef.current = requestAnimationFrame(animate)
      return
    }
    
    const deltaTime = Math.min((timestamp - lastTimeRef.current) / 1000, 0.1)
    lastTimeRef.current = timestamp

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Update transition progress
    if (transitionRef.current < 1) {
      transitionRef.current = Math.min(transitionRef.current + deltaTime * 0.7, 1)
    }

    const particles = particlesRef.current
    const current = currentPatternRef.current
    const target = targetPatternRef.current
    const t = transitionRef.current
    const mouse = mouseRef.current

    // Physics constants
    const forceStrength = 2.5
    const damping = 0.92
    const cursorRadius = 0.12 // Normalized radius of cursor influence
    const cursorForce = 0.015

    // Update and draw particles
    for (const particle of particles) {
      // Get Chladni force (interpolated during transition)
      let [fx, fy] = interpolateForce(
        particle.x, 
        particle.y, 
        current, 
        target, 
        t, 
        forceStrength
      )

      // Add cursor repulsion
      if (mouse) {
        const dx = particle.x - mouse.x
        const dy = particle.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        if (dist < cursorRadius && dist > 0.001) {
          const repelStrength = (1 - dist / cursorRadius) * cursorForce
          fx += (dx / dist) * repelStrength
          fy += (dy / dist) * repelStrength
        }
      }

      // Add slight chaos during transitions
      if (t < 0.3) {
        const chaos = (0.3 - t) * 0.01
        fx += (Math.random() - 0.5) * chaos
        fy += (Math.random() - 0.5) * chaos
      }

      // Update velocity with damping
      particle.vx = (particle.vx + fx * deltaTime) * damping
      particle.vy = (particle.vy + fy * deltaTime) * damping

      // Update position
      particle.x += particle.vx
      particle.y += particle.vy

      // Wrap around edges
      if (particle.x < 0) particle.x = 1
      if (particle.x > 1) particle.x = 0
      if (particle.y < 0) particle.y = 1
      if (particle.y > 1) particle.y = 0

      // Draw particle
      const screenX = particle.x * canvas.width
      const screenY = particle.y * canvas.height
      
      ctx.beginPath()
      ctx.arc(screenX, screenY, particle.size, 0, Math.PI * 2)
      ctx.fillStyle = currentColorRef.current
      ctx.globalAlpha = currentOpacityRef.current
      ctx.fill()
    }

    ctx.globalAlpha = 1

    animationRef.current = requestAnimationFrame(animate)
  }, [isMobile])

  // Start animation
  useEffect(() => {
    if (isReducedMotion) return

    const canvas = canvasRef.current
    if (!canvas) return

    // Set canvas size
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      
      const ctx = canvas.getContext('2d')
      if (ctx) ctx.scale(dpr, dpr)
    }

    resize()
    window.addEventListener('resize', resize)
    
    lastTimeRef.current = performance.now()
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationRef.current)
    }
  }, [animate, isReducedMotion])

  // Reduced motion fallback
  if (isReducedMotion) {
    return (
      <div 
        className={`fixed inset-0 pointer-events-none ${className}`}
        style={{ 
          background: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.05) 0%, transparent 70%)',
          zIndex: 0
        }}
      />
    )
  }

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
