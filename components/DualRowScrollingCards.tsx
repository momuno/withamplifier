'use client'

import { useEffect, useRef, useState } from 'react'

interface BundleCard {
  name: string
  type: string
  description: string
  author: string
  authorAvatar: string
  repoUrl: string
  badge?: 'validated' | 'experimental' | 'popular'
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
      const sectionTop = rect.top
      const sectionHeight = rect.height
      
      // Only start tracking when section enters the viewport
      // Progress = 0 when section top is at bottom of viewport
      // Progress = 1 when section bottom reaches top of viewport
      if (sectionTop < windowHeight && sectionTop + sectionHeight > 0) {
        // Start from 0 when section top hits 80% down the viewport
        const triggerPoint = windowHeight * 0.8
        
        if (sectionTop < triggerPoint) {
          // Calculate progress only after trigger point
          const scrollDistance = triggerPoint - sectionTop
          const totalDistance = sectionHeight + (windowHeight * 0.8)
          const progress = scrollDistance / totalDistance
          
          setScrollProgress(Math.max(0, Math.min(1, progress)))
        } else {
          // Before trigger point, progress is 0
          setScrollProgress(0)
        }
      }
    }
    
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])
  
  // Duplicate cards many times to ensure no visible edges during scroll
  // Need enough cards to cover viewport + full scroll range on both sides
  const expandedCards = [...cards, ...cards, ...cards, ...cards, ...cards, ...cards]
  const midpoint = Math.ceil(expandedCards.length / 2)
  const topRowCards = expandedCards.slice(0, midpoint)
  const bottomRowCards = expandedCards.slice(midpoint)
  
  // Start cards off-screen and bring them into view as user scrolls
  // Top row: starts off-screen left (-800px), moves right to +400px
  // Bottom row: starts off-screen right (+800px), moves left to -400px
  const startOffset = -800
  const endOffset = 400
  const totalRange = endOffset - startOffset
  
  const topRowTransform = startOffset + (scrollProgress * totalRange)
  const bottomRowTransform = -startOffset - (scrollProgress * totalRange)
  
  return (
    <div ref={sectionRef} className="space-y-3 lg:space-y-4">
      {/* Top Row - Scrolls Left to Right */}
      <div 
        className="relative overflow-hidden"
        style={{ 
          maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)'
        }}
      >
        <div 
          className="flex gap-3 lg:gap-4 will-change-transform transition-transform duration-100 ease-linear"
          style={{ transform: `translateX(${topRowTransform}px)` }}
        >
          {topRowCards.map((card, i) => (
            <BundleCard key={`top-${card.name}-${i}`} card={card} />
          ))}
        </div>
      </div>
      
      {/* Bottom Row - Scrolls Right to Left */}
      <div 
        className="relative overflow-hidden"
        style={{ 
          maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)'
        }}
      >
        <div 
          className="flex gap-3 lg:gap-4 will-change-transform transition-transform duration-100 ease-linear"
          style={{ transform: `translateX(${bottomRowTransform}px)` }}
        >
          {bottomRowCards.map((card, i) => (
            <BundleCard key={`bottom-${card.name}-${i}`} card={card} />
          ))}
        </div>
      </div>
    </div>
  )
}

function BundleCard({ card }: { card: BundleCard }) {
  const iconMap: Record<string, JSX.Element> = {
    agent: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    tool: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    bundle: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    )
  }
  
  return (
    <a 
      href={card.repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="community-card"
    >
      <div className="community-card__header">
        <span className={`community-card__icon community-card__icon--${card.type}`}>
          {iconMap[card.type] || iconMap.bundle}
        </span>
        {card.badge && (
          <div className="community-card__badges">
            <span className={`community-card__badge community-card__badge--${card.badge}`}>
              {card.badge.charAt(0).toUpperCase() + card.badge.slice(1)}
            </span>
          </div>
        )}
      </div>
      
      <h3 className="community-card__name">{card.name}</h3>
      <p className="community-card__description">{card.description}</p>
      
      <div className="community-card__footer">
        <div className="community-card__author">
          <img 
            alt={card.author}
            className="community-card__avatar"
            loading="lazy"
            src={card.authorAvatar}
          />
          <span className="community-card__author-name">@{card.author}</span>
        </div>
        <span className="community-card__action">View →</span>
      </div>
    </a>
  )
}
