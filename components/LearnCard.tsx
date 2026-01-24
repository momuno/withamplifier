'use client'

import Link from 'next/link'

export type DeckCategory = 
  | 'intro' 
  | 'showcase' 
  | 'platform' 
  | 'tool' 
  | 'devex' 
  | 'enterprise' 
  | 'philosophy'

export interface Deck {
  id: string
  title: string
  description: string
  category: DeckCategory
  href: string
  isNew?: boolean
}

const categoryLabels: Record<DeckCategory, string> = {
  intro: 'Getting Started',
  showcase: 'Showcase',
  platform: 'Platform',
  tool: 'Tools',
  devex: 'Developer Experience',
  enterprise: 'Enterprise',
  philosophy: 'Philosophy',
}

// Using Tailwind classes consistent with updates/page.tsx pattern
const categoryStyles: Record<DeckCategory, string> = {
  intro: 'bg-signal-soft text-signal',
  showcase: 'bg-green-100 text-green-700',
  platform: 'bg-blue-100 text-blue-700',
  tool: 'bg-amber-100 text-amber-700',
  devex: 'bg-pink-100 text-pink-700',
  enterprise: 'bg-purple-100 text-purple-700',
  philosophy: 'bg-violet-100 text-violet-700',
}

export default function LearnCard({ deck }: { deck: Deck }) {
  return (
    <Link
      href={deck.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block p-5 sm:p-5 rounded-gentle bg-canvas border border-canvas-mist 
                 hover:border-signal-glow hover:shadow-lift transition-all duration-300
                 hover:-translate-y-0.5
                 active:scale-[0.98] active:bg-canvas-stone
                 focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className={`px-2.5 py-1 rounded text-micro font-medium ${categoryStyles[deck.category]}`}>
          {categoryLabels[deck.category]}
        </span>
        {deck.isNew && (
          <span className="px-2 py-0.5 rounded text-micro font-medium bg-signal-soft text-signal">
            New
          </span>
        )}
      </div>
      
      <h3 className="text-subheading text-ink group-hover:text-signal transition-colors duration-200">
        {deck.title}
      </h3>
      
      <p className="mt-2 text-ink-slate text-sm leading-relaxed line-clamp-2">
        {deck.description}
      </p>
      
      {/* Always visible on mobile (no hover), fade in on desktop hover */}
      <div className="mt-4 flex items-center text-signal text-sm font-medium 
                      opacity-100 sm:opacity-0 sm:group-hover:opacity-100 
                      transition-opacity duration-200">
        <span>View deck</span>
        <svg 
          className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        {/* External link indicator */}
        <svg 
          className="w-3.5 h-3.5 ml-1.5 opacity-60" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>
    </Link>
  )
}
