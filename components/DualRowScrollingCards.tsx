'use client'

import { useEffect, useRef, useState } from 'react'

interface BundleCard {
  name: string
  type: string
  description: string
  author: string
  authorAvatar: string
  stars: number
  validated?: boolean
}

interface DualRowScrollingCardsProps {
  cards: BundleCard[]
}

export default function DualRowScrollingCards({ cards }: DualRowScrollingCardsProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      
      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calculate progress as section moves through viewport
      // 0 = just entering viewport from bottom
      // 1 = just leaving viewport from top
      const sectionTop = rect.top
      const sectionHeight = rect.height
      
      // Start tracking when section enters viewport
      if (sectionTop < windowHeight && sectionTop + sectionHeight > 0) {
        // Progress from 0 to 1 as section scrolls through viewport
        const progress = (windowHeight - sectionTop) / (windowHeight + sectionHeight)
        setScrollProgress(Math.max(0, Math.min(1, progress)))
      }
    }
    
    handleScroll() // Initial calculation
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])
  
  // Split cards into two rows
  const midpoint = Math.ceil(cards.length / 2)
  const topRowCards = cards.slice(0, midpoint)
  const bottomRowCards = cards.slice(midpoint)
  
  // Calculate transform based on scroll progress
  // Top row: moves left to right (positive translation)
  // Bottom row: moves right to left (negative translation)
  const maxTranslation = 400 // Maximum pixels to translate
  const topRowTransform = scrollProgress * maxTranslation
  const bottomRowTransform = -scrollProgress * maxTranslation
  
  return (
    <div ref={sectionRef} className="space-y-3 lg:space-y-4 overflow-hidden">
      {/* Top Row - Scrolls Left to Right */}
      <div 
        className="flex gap-3 lg:gap-4 will-change-transform transition-transform duration-100 ease-linear"
        style={{ 
          transform: `translateX(${topRowTransform}px)`,
          maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)'
        }}
      >
        {/* Duplicate cards for seamless appearance at edges */}
        {[...topRowCards, ...topRowCards].map((card, i) => (
          <BundleCard key={`top-${card.name}-${i}`} card={card} />
        ))}
      </div>
      
      {/* Bottom Row - Scrolls Right to Left */}
      <div 
        className="flex gap-3 lg:gap-4 will-change-transform transition-transform duration-100 ease-linear"
        style={{ 
          transform: `translateX(${bottomRowTransform}px)`,
          maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)'
        }}
      >
        {/* Duplicate cards for seamless appearance at edges */}
        {[...bottomRowCards, ...bottomRowCards].map((card, i) => (
          <BundleCard key={`bottom-${card.name}-${i}`} card={card} />
        ))}
      </div>
    </div>
  )
}

function BundleCard({ card }: { card: BundleCard }) {
  return (
    <div className="flex-shrink-0 w-72 lg:w-80 p-4 lg:p-5 rounded-xl bg-canvas border border-canvas-mist shadow-soft-sm hover:shadow-soft hover:border-signal-glow transition-all duration-300 cursor-pointer">
      {/* Header with name and type */}
      <div className="flex justify-between items-start gap-3 mb-3">
        <h3 className="font-mono text-sm text-ink font-medium truncate flex-1">
          {card.name}
        </h3>
        <span className="flex-shrink-0 px-2 py-1 bg-canvas-stone rounded text-[10px] text-ink-fog uppercase tracking-wider">
          {card.type}
        </span>
      </div>
      
      {/* Description */}
      <p className="text-xs text-ink-slate leading-relaxed mb-3" style={{
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      }}>
        {card.description}
      </p>
      
      {/* Validation badge */}
      {card.validated && (
        <div className="mb-3">
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-success/10 text-success rounded text-[10px] font-medium">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Validated
          </span>
        </div>
      )}
      
      {/* Metadata with avatar */}
      <div className="flex justify-between items-center pt-3 border-t border-canvas-mist text-[11px]">
        <div className="flex items-center gap-2">
          <img 
            src={card.authorAvatar} 
            alt={card.author}
            className="w-5 h-5 rounded-full border border-canvas-mist"
          />
          <span className="text-signal font-medium">@{card.author}</span>
        </div>
        <div className="flex items-center gap-1 text-ink-fog">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {card.stars}
        </div>
      </div>
    </div>
  )
}
