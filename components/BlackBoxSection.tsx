'use client'

import { useEffect, useState, useRef, useCallback } from 'react'

const HEADLINE = 'Most AI tools are black boxes.'

const LINES = [
  "They work. They respond. But you don't understand what's happening behind the scenes.",
  "They lock you to one model. Hide how they work. Keep your setup trapped in their system.",
  "When something breaks, you're guessing. When something better comes along, you start over.",
]

// Scroll thresholds that TRIGGER each line (0-1)
const TRIGGERS = {
  headline: 0.05,
  line1: 0.25,
  line2: 0.50,
  line3: 0.75,
}

// Check for reduced motion preference
function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false)
  
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  
  return reducedMotion
}

// Easing for headline
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

// Simple fade-in line - triggers once, fades in smoothly
function FadeInLine({ 
  text, 
  triggered,
  className = '' 
}: { 
  text: string
  triggered: boolean
  className?: string 
}) {
  const [hasTriggered, setHasTriggered] = useState(false)
  
  useEffect(() => {
    if (triggered && !hasTriggered) {
      setHasTriggered(true)
    }
  }, [triggered, hasTriggered])
  
  return (
    <p 
      className={className}
      style={{ 
        opacity: hasTriggered ? 0.75 : 0,
        transform: `translateY(${hasTriggered ? 0 : 12}px)`,
        transition: 'opacity 400ms ease-out, transform 400ms ease-out',
        textWrap: 'balance',
      }}
    >
      {text}
    </p>
  )
}

export function BlackBoxSection() {
  const reducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isPast, setIsPast] = useState(false)
  const rafRef = useRef<number | null>(null)

  // Track what's been triggered
  const [triggered, setTriggered] = useState({
    headline: false,
    line1: false,
    line2: false,
    line3: false,
  })

  const updateProgress = useCallback(() => {
    const section = sectionRef.current
    if (!section) return

    const rect = section.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const sectionHeight = rect.height
    
    const scrollableDistance = sectionHeight - viewportHeight
    const scrolledPast = -rect.top
    
    const newProgress = Math.max(0, Math.min(1, scrolledPast / scrollableDistance))
    const nowActive = rect.top <= 0 && rect.bottom >= viewportHeight
    const nowPast = rect.bottom < viewportHeight
    
    setProgress(newProgress)
    setIsActive(nowActive)
    setIsPast(nowPast)
    
    // Check triggers
    setTriggered(prev => ({
      headline: prev.headline || newProgress >= TRIGGERS.headline,
      line1: prev.line1 || newProgress >= TRIGGERS.line1,
      line2: prev.line2 || newProgress >= TRIGGERS.line2,
      line3: prev.line3 || newProgress >= TRIGGERS.line3,
    }))
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(updateProgress)
    }

    updateProgress()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [updateProgress])

  // Headline opacity (clamped at 1 once fully revealed)
  const headlineOpacity = triggered.headline 
    ? Math.min(1, easeOutCubic(Math.min(1, (progress - TRIGGERS.headline) / 0.15)))
    : 0
  const headlineY = (1 - headlineOpacity) * 30

  // Reduced motion: show all content immediately
  if (reducedMotion) {
    return (
      <section
        id="problem"
        data-section="problem"
        data-theme="dark"
        className="section-feature bg-[rgba(10,10,10,0.85)]"
      >
        <div className="container-narrow text-center">
          <h2 className="text-headline text-on-dark">{HEADLINE}</h2>
          {LINES.map((line, i) => (
            <p key={i} className="mt-5 text-body-large text-on-dark-secondary max-w-2xl mx-auto" style={{ textWrap: 'balance' }}>
              {line}
            </p>
          ))}
        </div>
      </section>
    )
  }

  // Content block
  const contentBlock = (
    <div className="container-narrow text-center px-6">
      <h2
        className="text-headline text-on-dark"
        style={{
          opacity: headlineOpacity,
          transform: `translateY(${headlineY}px)`,
        }}
      >
        {HEADLINE}
      </h2>
      
      <FadeInLine
        text={LINES[0]}
        triggered={triggered.line1}
        className="mt-6 text-body-large text-on-dark-secondary max-w-2xl mx-auto"
      />
      <FadeInLine
        text={LINES[1]}
        triggered={triggered.line2}
        className="mt-5 text-body-large text-on-dark-secondary max-w-2xl mx-auto"
      />
      <FadeInLine
        text={LINES[2]}
        triggered={triggered.line3}
        className="mt-5 text-body-large text-on-dark-secondary max-w-2xl mx-auto"
      />
    </div>
  )

  return (
    <>
      {/* Tall section - transparent to let particles through */}
      <section
        ref={sectionRef}
        id="problem"
        data-section="problem"
        data-theme="dark"
        className="relative"
        style={{ height: '400vh' }}
      >
        {/* Static content at bottom - only visible AFTER scrolling past */}
        {isPast && (
          <div className="absolute bottom-0 left-0 right-0 h-screen flex items-center justify-center bg-[rgba(10,10,10,0.85)]">
            {contentBlock}
          </div>
        )}
      </section>
      
      {/* Fixed overlay - visible ONLY while actively scrolling through */}
      {isActive && (
        <div 
          className="fixed inset-0 z-40 flex items-center justify-center bg-[rgba(10,10,10,0.85)]"
        >
          {contentBlock}
          
          {/* Progress bar */}
          <div 
            className="absolute bottom-0 left-0 h-[2px] bg-signal/60"
            style={{ width: `${progress * 100}%` }}
          />
          
          {/* Debug */}
          <div className="absolute top-4 left-4 text-xs text-white/50 font-mono">
            {(progress * 100).toFixed(0)}%
          </div>
        </div>
      )}
    </>
  )
}
