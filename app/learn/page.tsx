'use client'

import { useState } from 'react'
import RevealOnScroll, { RevealStagger } from '@/components/RevealOnScroll'
import LearnCard, { Deck, DeckCategory } from '@/components/LearnCard'

// Base URL for deck hosting (amplifier-stories GitHub Pages)
const DECKS_BASE_URL = 'https://microsoft.github.io/amplifier-stories/docs'

const decks: Deck[] = [
  // Getting Started / Intro
  {
    id: 'what-is-amplifier',
    title: 'What is Amplifier?',
    description: 'An introduction to Amplifier\'s core concepts, architecture, and what makes it different from other AI tools.',
    category: 'intro',
    href: `${DECKS_BASE_URL}/what-is-amplifier.html`,
  },
  {
    id: 'getting-started',
    title: 'Getting Started Guide',
    description: 'Step-by-step walkthrough to install Amplifier, configure your first provider, and run your first command.',
    category: 'intro',
    href: `${DECKS_BASE_URL}/getting-started-guide.html`,
  },
  {
    id: 'bundles-and-agents',
    title: 'Bundles & Agents',
    description: 'Learn how bundles compose providers, tools, and behaviors into shareable agent configurations.',
    category: 'intro',
    href: `${DECKS_BASE_URL}/bundles-and-agents.html`,
  },
  {
    id: 'best-practices',
    title: 'Best Practices & Patterns',
    description: 'Common patterns and best practices for building effective agents with Amplifier.',
    category: 'intro',
    href: `${DECKS_BASE_URL}/best-practices-patterns.html`,
  },
  
  // Platform Features
  {
    id: 'shadow-environments',
    title: 'Shadow Environments',
    description: 'Isolated sandbox environments for testing changes safely before deployment.',
    category: 'platform',
    href: `${DECKS_BASE_URL}/shadow-environments-deck.html`,
    isNew: true,
  },
  {
    id: 'session-forking',
    title: 'Session Forking',
    description: 'Fork sessions to explore multiple approaches in parallel without losing context.',
    category: 'platform',
    href: `${DECKS_BASE_URL}/session-forking-deck.html`,
  },
  {
    id: 'recipes-workflows',
    title: 'Recipes & Workflows',
    description: 'Define multi-step workflows with approval gates, context flow, and resumability.',
    category: 'platform',
    href: `${DECKS_BASE_URL}/recipes-workflows.html`,
  },
  {
    id: 'context-inheritance',
    title: 'Context Inheritance',
    description: 'How context flows between parent and child sessions for coordinated agent work.',
    category: 'platform',
    href: `${DECKS_BASE_URL}/context-inheritance-deck.html`,
  },
  {
    id: 'amplifier-modes',
    title: 'Amplifier Modes',
    description: 'Runtime behavior overlays that modify agent operation without changing bundles.',
    category: 'platform',
    href: `${DECKS_BASE_URL}/amplifier-modes-deck.html`,
  },
  
  // Tools
  {
    id: 'database-tool',
    title: 'Database Tool',
    description: 'Query and interact with databases directly from your agent sessions.',
    category: 'tool',
    href: `${DECKS_BASE_URL}/database-tool-deck.html`,
  },
  {
    id: 'diagrams-tool',
    title: 'Diagrams Tool',
    description: 'Generate architecture diagrams, flowcharts, and visual documentation.',
    category: 'tool',
    href: `${DECKS_BASE_URL}/diagrams-tool-deck.html`,
  },
  {
    id: 'github-actions',
    title: 'GitHub Actions Tool',
    description: 'Trigger and monitor GitHub Actions workflows from your agent.',
    category: 'tool',
    href: `${DECKS_BASE_URL}/github-actions-tool-deck.html`,
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Send notifications to Teams, Slack, or other channels from agent workflows.',
    category: 'tool',
    href: `${DECKS_BASE_URL}/notifications-deck.html`,
  },
  
  // Developer Experience
  {
    id: 'vibecoding',
    title: 'Vibe Coding',
    description: 'The art of fluid, natural collaboration between developer and AI assistant.',
    category: 'devex',
    href: `${DECKS_BASE_URL}/vibecoding-deck.html`,
  },
  {
    id: 'cost-optimization',
    title: 'Cost Optimization',
    description: 'Strategies for managing API costs while maintaining agent effectiveness.',
    category: 'devex',
    href: `${DECKS_BASE_URL}/cost-optimization-deck.html`,
  },
  {
    id: 'lazy-module-activation',
    title: 'Lazy Module Activation',
    description: 'Performance optimization through on-demand module loading.',
    category: 'devex',
    href: `${DECKS_BASE_URL}/lazy-module-activation-deck.html`,
  },
  {
    id: 'superpowers',
    title: 'Agent Superpowers',
    description: 'Advanced capabilities that make Amplifier agents exceptionally powerful.',
    category: 'devex',
    href: `${DECKS_BASE_URL}/superpowers-deck.html`,
  },
  
  // Showcase
  {
    id: 'cortex',
    title: 'Cortex',
    description: 'A showcase of Amplifier powering intelligent document processing workflows.',
    category: 'showcase',
    href: `${DECKS_BASE_URL}/cortex-amplifier-presentation.html`,
  },
  {
    id: 'attention-firewall',
    title: 'Attention Firewall',
    description: 'Security-focused agent that monitors and protects against prompt injection.',
    category: 'showcase',
    href: `${DECKS_BASE_URL}/attention-firewall-deck.html`,
  },
  
  // Enterprise
  {
    id: 'ecosystem-audit',
    title: 'Ecosystem Audit',
    description: 'Comprehensive audit capabilities for enterprise Amplifier deployments.',
    category: 'enterprise',
    href: `${DECKS_BASE_URL}/ecosystem-audit-deck.html`,
  },
  {
    id: 'm365-sandbox',
    title: 'M365 Enterprise Sandbox',
    description: 'Secure sandbox environment for Microsoft 365 enterprise integration.',
    category: 'enterprise',
    href: `${DECKS_BASE_URL}/m365-enterprise-sandbox-deck.html`,
  },
  
  // Philosophy
  {
    id: 'deliberate-development',
    title: 'Deliberate Development',
    description: 'The philosophy behind Amplifier\'s design: intentional, transparent, composable.',
    category: 'philosophy',
    href: `${DECKS_BASE_URL}/deliberate-development-deck.html`,
  },
  {
    id: 'vision-roadmap',
    title: 'Vision & Roadmap',
    description: 'Where Amplifier is heading and the principles guiding its evolution.',
    category: 'philosophy',
    href: `${DECKS_BASE_URL}/vision-roadmap.html`,
  },
]

const categoryFilters: { value: DeckCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'intro', label: 'Getting Started' },
  { value: 'platform', label: 'Platform' },
  { value: 'tool', label: 'Tools' },
  { value: 'devex', label: 'Developer Experience' },
  { value: 'showcase', label: 'Showcase' },
  { value: 'enterprise', label: 'Enterprise' },
  { value: 'philosophy', label: 'Philosophy' },
]

export default function LearnPage() {
  const [activeFilter, setActiveFilter] = useState<DeckCategory | 'all'>('all')
  
  const filteredDecks = activeFilter === 'all' 
    ? decks 
    : decks.filter(deck => deck.category === activeFilter)

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="section gradient-radial">
        <div className="container-content">
          <RevealOnScroll>
            <h1 className="text-display text-ink max-w-3xl">
              Learn Amplifier.
            </h1>
          </RevealOnScroll>
          
          <RevealOnScroll delay={100}>
            <p className="mt-6 text-body-lg text-ink-slate max-w-2xl">
              Slide decks, guides, and deep dives. Learn the fundamentals, 
              explore advanced features, or see what's new.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Filter bar */}
      <section className="border-b border-canvas-mist sticky top-16 bg-canvas/80 backdrop-blur-md z-40">
        <div className="container-wide py-3 sm:py-4">
          {/* Gradient fade hints for horizontal scroll on mobile */}
          <div className="relative">
            {/* Left fade - hidden initially, shown via JS if needed */}
            <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-canvas/80 to-transparent z-10 pointer-events-none hidden sm:hidden" aria-hidden="true" />
            {/* Right fade - visible hint that more content exists */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-canvas/80 to-transparent z-10 pointer-events-none sm:hidden" aria-hidden="true" />
            
            <div 
              className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 -mb-2 snap-x snap-mandatory sm:snap-none"
              role="tablist"
              aria-label="Filter decks by category"
            >
              {categoryFilters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  role="tab"
                  aria-selected={activeFilter === filter.value}
                  aria-controls="deck-grid"
                  className={`px-4 py-2.5 min-h-[44px] rounded-full text-sm font-medium whitespace-nowrap 
                             transition-all duration-200 snap-start
                             focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2
                             active:scale-95 ${
                    activeFilter === filter.value
                      ? 'bg-signal text-white shadow-sm'
                      : 'bg-canvas-stone text-ink-slate hover:bg-canvas-mist hover:text-ink active:bg-canvas-mist'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Deck grid */}
      <section className="section">
        <div className="container-wide">
          <RevealStagger 
            id="deck-grid"
            role="tabpanel"
            aria-label={`${activeFilter === 'all' ? 'All' : categoryFilters.find(f => f.value === activeFilter)?.label} decks`}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {filteredDecks.map((deck) => (
              <LearnCard key={deck.id} deck={deck} />
            ))}
          </RevealStagger>
          
          {filteredDecks.length === 0 && (
            <div className="text-center py-16">
              <p className="text-ink-slate">No decks found for this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section border-t border-canvas-mist bg-canvas-stone">
        <div className="container-content text-center">
          <RevealOnScroll>
            <h2 className="text-title text-ink">Ready to build?</h2>
            <p className="mt-4 text-ink-slate max-w-xl mx-auto">
              Take what you've learned and start building. Amplifier is ready when you are.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/build" className="btn-primary">
                Get started
              </a>
              <a 
                href="https://github.com/microsoft/amplifier" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                View on GitHub
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  )
}
