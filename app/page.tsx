'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { useViewportHeight } from '@/hooks/useViewportHeight'
import { CodeBlock } from '@/components/CopyButton'

export default function Home() {
  useViewportHeight()
  
  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { 
        rootMargin: '0px 0px -15% 0px',
        threshold: 0.1 
      }
    )
    
    document.querySelectorAll('.reveal, .reveal-stagger, .reveal-scale').forEach(el => {
      observer.observe(el)
    })
    
    return () => observer.disconnect()
  }, [])
  
  return (
    <div className="pt-16">
      {/* ============================================
          SECTION 1: HERO
          Apple pattern: 70% whitespace, ONE idea
          ============================================ */}
      <section className="section-hero">
        <div className="text-center container-default">
          <h1 className="reveal text-display-xl text-ink font-heading px-2">
            Yours for the making.
          </h1>
          
          <p className="reveal mt-6 md:mt-8 text-body-large text-ink-slate max-w-xl mx-auto px-4" style={{transitionDelay: '0.1s'}}>
            A modular AI agent framework you can see through, take apart, and make your own.
          </p>
        </div>
      </section>

      {/* ============================================
          SECTION 2: THE PROBLEM (Dark, dramatic)
          Apple pattern: Dark background, emotional impact
          ============================================ */}
      <section className="section-feature section-dark">
        <div className="container-narrow text-center">
          <p className="reveal text-eyebrow mb-4">The problem</p>
          
          <h2 className="reveal text-display text-on-dark" style={{transitionDelay: '0.1s'}}>
            Black boxes everywhere.
          </h2>
          
          <p className="reveal mt-8 text-body-large text-on-dark-secondary max-w-lg mx-auto" style={{transitionDelay: '0.2s'}}>
            Most AI tools hide how they work. You can't see inside, can't change what matters, can't make it yours.
          </p>
        </div>
      </section>

      {/* ============================================
          SECTION 3: THE SOLUTION (Light, breathing room)
          Apple pattern: Contrast from dark, simple statement
          ============================================ */}
      <section className="section-feature section-light">
        <div className="container-narrow text-center">
          <p className="reveal text-eyebrow mb-4">Amplifier</p>
          
          <h2 className="reveal text-display text-ink" style={{transitionDelay: '0.1s'}}>
            See everything. Change anything.
          </h2>
          
          <p className="reveal mt-8 text-body-large text-ink-slate max-w-lg mx-auto" style={{transitionDelay: '0.2s'}}>
            Swap the model. Add a tool. Rewrite the behavior. Every piece is visible, every piece is yours.
          </p>
        </div>
      </section>

      {/* ============================================
          SECTION 4: HOW IT WORKS (Dark, technical depth)
          Apple pattern: Dark for "power" sections
          ============================================ */}
      <section className="section-feature section-dark-gradient">
        <div className="container-default">
          <div className="text-center mb-8 md:mb-16">
            <p className="reveal text-eyebrow mb-3 md:mb-4">How it works</p>
            <h2 className="reveal text-headline text-on-dark" style={{transitionDelay: '0.1s'}}>
              Three pieces. Infinite combinations.
            </h2>
          </div>
          
          {/* Feature tiles - NO borders, NO shadows */}
          <div className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 max-w-4xl mx-auto">
            <div className="feature-tile feature-tile-dark">
              <div className="feature-tile-content text-center">
                <div className="text-4xl mb-6">⚡</div>
                <h3 className="text-subtitle text-on-dark mb-3">Providers</h3>
                <p className="text-on-dark-secondary">
                  Claude, GPT-4, Ollama, or your own. Switch without rewriting.
                </p>
              </div>
            </div>
            
            <div className="feature-tile feature-tile-dark">
              <div className="feature-tile-content text-center">
                <div className="text-4xl mb-6">🔧</div>
                <h3 className="text-subtitle text-on-dark mb-3">Tools</h3>
                <p className="text-on-dark-secondary">
                  Filesystem, bash, web search. Add what you need.
                </p>
              </div>
            </div>
            
            <div className="feature-tile feature-tile-dark">
              <div className="feature-tile-content text-center">
                <div className="text-4xl mb-6">🎯</div>
                <h3 className="text-subtitle text-on-dark mb-3">Behaviors</h3>
                <p className="text-on-dark-secondary">
                  Instructions that shape how it works. Your expertise, encoded.
                </p>
              </div>
            </div>
          </div>
          
          {/* The bundle - result */}
          <div className="reveal mt-12 text-center" style={{transitionDelay: '0.4s'}}>
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-signal/10 border border-signal/30">
              <span className="text-2xl">📦</span>
              <span className="text-on-dark font-medium">Bundle = A complete capability you can share</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 5: SEE IT RUN (Light, proof)
          Apple pattern: Light for "show" sections
          ============================================ */}
      <section className="section-feature section-stone">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <p className="reveal text-eyebrow mb-4">In action</p>
            <h2 className="reveal text-headline text-ink" style={{transitionDelay: '0.1s'}}>
              Real work, real results.
            </h2>
          </div>
          
          <div className="reveal" style={{transitionDelay: '0.2s'}}>
            <div className="terminal">
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="terminal-dot" />
                  <span className="terminal-dot" />
                  <span className="terminal-dot active" />
                </div>
              </div>
              <div className="terminal-body terminal-responsive whitespace-pre overflow-x-auto">
{`$ amplifier run "Document this codebase"

→ Loading bundle: documentation-writer
→ Provider: claude-sonnet-4-20250514

◐ Reading project structure...
✓ Found 47 source files
◐ Writing documentation...
✓ README.md created
✓ API.md created
✓ ARCHITECTURE.md created

✓ Complete (3 files, 2,847 words)`}
              </div>
            </div>
          </div>
          
          <div className="reveal mt-10 text-center" style={{transitionDelay: '0.3s'}}>
            <Link href="/explore" className="link-apple">
              See more examples
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 6: THE ECOSYSTEM (Dark, community)
          Apple pattern: Dark for "scale" messaging
          ============================================ */}
      <section className="section-feature section-dark">
        <div className="container-default text-center">
          <p className="reveal text-eyebrow mb-4">The ecosystem</p>
          
          <h2 className="reveal text-display text-on-dark" style={{transitionDelay: '0.1s'}}>
            Built by many.
          </h2>
          
          <p className="reveal mt-8 text-body-large text-on-dark-secondary max-w-lg mx-auto" style={{transitionDelay: '0.2s'}}>
            People build bundles for their own needs, then share them back. More perspectives, better tools.
          </p>
          
          <div className="reveal mt-12" style={{transitionDelay: '0.3s'}}>
            <Link href="/explore" className="btn-apple">
              Explore bundles
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 7: GET STARTED (Light, action)
          Apple pattern: Clear, simple CTA
          ============================================ */}
      <section className="section-feature section-light">
        <div className="container-narrow text-center">
          <h2 className="reveal text-headline text-ink">
            Start building.
          </h2>
          
          <div className="reveal mt-10" style={{transitionDelay: '0.1s'}}>
            <CodeBlock code="pip install amplifier" className="max-w-sm mx-auto" />
          </div>
          
          <div className="reveal mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4" style={{transitionDelay: '0.2s'}}>
            <Link href="/build" className="btn-apple w-full sm:w-auto">
              Quick Start Guide
            </Link>
            <Link 
              href="https://github.com/microsoft/amplifier" 
              className="btn-apple-secondary w-full sm:w-auto"
              target="_blank"
              rel="noopener noreferrer"
            >
              Documentation
            </Link>
          </div>
          
          <p className="reveal mt-10 text-sm text-ink-fog" style={{transitionDelay: '0.3s'}}>
            Questions?{' '}
            <Link href="/support" className="link-apple text-sm">
              Get support
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}
