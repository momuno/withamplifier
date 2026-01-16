'use client'

import Link from 'next/link'
import { useEffect } from 'react'
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
        rootMargin: '0px 0px -10% 0px',
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
          HERO - The Promise (with Gemini-style gradient)
          ============================================ */}
      <section className="section-hero relative overflow-hidden">
        {/* Subtle gradient orbs for depth */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 gradient-orb gradient-orb-primary opacity-30" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 gradient-orb gradient-orb-warm opacity-20" />
        
        <div className="text-center container-default relative z-10">
          <h1 className="reveal text-display-xl text-ink font-heading px-2">
            Yours for the making.
          </h1>
          
          <p className="reveal mt-6 md:mt-8 text-body-large text-ink-slate max-w-2xl mx-auto px-4" style={{transitionDelay: '0.1s'}}>
            A modular AI agent framework. See how it thinks. Swap what you want. 
            Keep what works. Build something that's actually yours.
          </p>
          
          <div className="reveal mt-8 md:mt-10" style={{transitionDelay: '0.2s'}}>
            <CodeBlock code="pip install amplifier" className="max-w-xs mx-auto" />
          </div>
        </div>
      </section>

      {/* ============================================
          THE PROBLEM - Why This Matters
          ============================================ */}
      <section className="section-feature section-dark">
        <div className="container-default">
          <div className="text-center mb-12 md:mb-16">
            <p className="reveal text-eyebrow mb-4">The problem</p>
            <h2 className="reveal text-display text-on-dark" style={{transitionDelay: '0.1s'}}>
              Most AI tools are black boxes.
            </h2>
          </div>
          
          <div className="reveal-stagger grid md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-on-dark mb-2">You can't see why</h3>
              <p className="text-on-dark-secondary text-sm leading-relaxed">
                When something goes wrong, you're guessing. No visibility into decisions, prompts, or tool calls.
              </p>
            </div>
            
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-on-dark mb-2">You can't change anything</h3>
              <p className="text-on-dark-secondary text-sm leading-relaxed">
                Want a different model? Different tools? You're stuck with what they decided to give you.
              </p>
            </div>
            
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-on-dark mb-2">You can't make it yours</h3>
              <p className="text-on-dark-secondary text-sm leading-relaxed">
                Generic instructions. Generic personality. No way to encode how you actually work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          THE ARCHITECTURE - How It Works (with gradient flow)
          ============================================ */}
      <section className="section-feature section-gradient-flow">
        <div className="container-default">
          <div className="text-center mb-12 md:mb-16">
            <p className="reveal text-eyebrow mb-4">The approach</p>
            <h2 className="reveal text-headline text-ink" style={{transitionDelay: '0.1s'}}>
              Everything is a swappable piece.
            </h2>
            <p className="reveal mt-4 text-body-large text-ink-slate max-w-2xl mx-auto" style={{transitionDelay: '0.15s'}}>
              Providers, tools, and behaviors snap together into bundles. Change one piece without touching the rest.
            </p>
          </div>
          
          <div className="reveal-stagger grid md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            {/* Provider */}
            <div className="feature-tile feature-tile-gradient p-6 md:p-8 soft-glow">
              <h3 className="text-xl font-semibold text-ink mb-3">Providers</h3>
              <p className="text-ink-slate text-sm mb-4">
                The brain. Claude, GPT-4, Ollama, or run your own local model. Switch between them without changing anything else.
              </p>
              <code className="text-xs bg-canvas-mist px-2 py-1 rounded-lg font-mono text-ink-slate">
                providers: [anthropic, ollama]
              </code>
            </div>
            
            {/* Tools */}
            <div className="feature-tile feature-tile-gradient p-6 md:p-8 soft-glow">
              <h3 className="text-xl font-semibold text-ink mb-3">Tools</h3>
              <p className="text-ink-slate text-sm mb-4">
                The hands. Filesystem access, bash commands, web search, GitHub integration. Add only what you need.
              </p>
              <code className="text-xs bg-canvas-mist px-2 py-1 rounded-lg font-mono text-ink-slate">
                tools: [filesystem, bash, grep]
              </code>
            </div>
            
            {/* Behaviors */}
            <div className="feature-tile feature-tile-gradient p-6 md:p-8 soft-glow">
              <h3 className="text-xl font-semibold text-ink mb-3">Behaviors</h3>
              <p className="text-ink-slate text-sm mb-4">
                The personality. Instructions, expertise, and guardrails that shape how it works. Your workflow, encoded.
              </p>
              <code className="text-xs bg-canvas-mist px-2 py-1 rounded-lg font-mono text-ink-slate">
                behaviors: [security-focused]
              </code>
            </div>
          </div>
          
          {/* Bundle = Result */}
          <div className="reveal mt-10 md:mt-14 text-center" style={{transitionDelay: '0.4s'}}>
            <div className="inline-block p-6 md:p-8 rounded-3xl glass-card shadow-soft">
              <h3 className="text-xl font-semibold text-ink mb-3">Bundle</h3>
              <p className="text-ink-slate text-sm max-w-md">
                Combine providers + tools + behaviors into a shareable package. 
                Install someone else's bundle, or publish your own.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SEE IT RUN - Proof It Works
          ============================================ */}
      <section className="section-feature section-stone">
        <div className="container-narrow">
          <div className="text-center mb-10 md:mb-12">
            <p className="reveal text-eyebrow mb-4">In action</p>
            <h2 className="reveal text-headline text-ink" style={{transitionDelay: '0.1s'}}>
              One command. Real work.
            </h2>
            <p className="reveal mt-4 text-ink-slate" style={{transitionDelay: '0.15s'}}>
              Load a bundle, connect to a model, get results.
            </p>
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
              <div className="terminal-body terminal-responsive whitespace-pre overflow-x-auto text-sm">
{`$ amplifier run "Review this PR for security issues"

→ Loading bundle: security-reviewer
→ Provider: claude-sonnet-4-20250514
→ Tools: filesystem, grep, ast-analysis

◐ Analyzing changes in src/auth.py...
◐ Checking for common vulnerabilities...

⚠ Found 2 issues:

1. SQL Injection Risk (Line 47)
   user_query = f"SELECT * FROM users WHERE id = {user_id}"
   → Use parameterized queries instead

2. Missing Input Validation (Line 23)
   password field accepts any length
   → Add length limits to prevent DoS

✓ Review complete. 2 issues found, 0 false positives.`}
              </div>
            </div>
          </div>
          
          <div className="reveal mt-8 text-center" style={{transitionDelay: '0.3s'}}>
            <Link href="/explore" className="link-apple">
              Try more examples
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================
          WHY IT MATTERS - The Real Benefits
          ============================================ */}
      <section className="section-feature section-dark-gradient">
        <div className="container-default">
          <div className="text-center mb-12 md:mb-16">
            <p className="reveal text-eyebrow mb-4">Why this matters</p>
            <h2 className="reveal text-headline text-on-dark" style={{transitionDelay: '0.1s'}}>
              Your investment compounds.
            </h2>
          </div>
          
          <div className="reveal-stagger grid md:grid-cols-2 gap-5 md:gap-6 max-w-4xl mx-auto">
            <div className="benefit-card">
              <h3 className="text-xl md:text-[22px] font-semibold text-on-dark mb-3 tracking-tight">Debug with confidence</h3>
              <p className="text-on-dark-muted text-[15px] md:text-base leading-relaxed">
                See every prompt, every tool call, every decision. When something goes wrong, you can trace exactly why.
              </p>
            </div>
            
            <div className="benefit-card">
              <h3 className="text-xl md:text-[22px] font-semibold text-on-dark mb-3 tracking-tight">Iterate without limits</h3>
              <p className="text-on-dark-muted text-[15px] md:text-base leading-relaxed">
                New model comes out? Swap it in. Need a custom tool? Write one. Your investment in learning compounds.
              </p>
            </div>
            
            <div className="benefit-card">
              <h3 className="text-xl md:text-[22px] font-semibold text-on-dark mb-3 tracking-tight">Share what works</h3>
              <p className="text-on-dark-muted text-[15px] md:text-base leading-relaxed">
                Package your setup as a bundle. Share it with your team. Publish it for others. No vendor lock-in.
              </p>
            </div>
            
            <div className="benefit-card">
              <h3 className="text-xl md:text-[22px] font-semibold text-on-dark mb-3 tracking-tight">Security you control</h3>
              <p className="text-on-dark-muted text-[15px] md:text-base leading-relaxed">
                Run models locally. Inspect every API call. Add approval gates for sensitive operations. Your data, your rules.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          ECOSYSTEM - Built By Many (with subtle warmth)
          ============================================ */}
      <section className="section-feature section-light-glow">
        <div className="container-default text-center">
          <p className="reveal text-eyebrow mb-4">The ecosystem</p>
          
          <h2 className="reveal text-headline text-ink" style={{transitionDelay: '0.1s'}}>
            Share what works. Use what others share.
          </h2>
          
          <p className="reveal mt-6 text-body-large text-ink-slate max-w-2xl mx-auto" style={{transitionDelay: '0.2s'}}>
            Package your setup as a bundle. Share it with your team or the community. 
            Use bundles others have built. The ecosystem grows because people contribute back.
          </p>
          
          {/* Example bundles */}
          <div className="reveal-stagger mt-10 flex flex-wrap justify-center gap-3" style={{transitionDelay: '0.3s'}}>
            {['documentation-writer', 'security-reviewer', 'code-explorer', 'test-generator', 'api-designer', 'data-analyst'].map((bundle) => (
              <span key={bundle} className="px-4 py-2 rounded-full bg-canvas-stone text-ink-slate text-sm">
                {bundle}
              </span>
            ))}
          </div>
          
          <div className="reveal mt-10" style={{transitionDelay: '0.4s'}}>
            <Link href="/explore" className="btn-apple">
              Explore bundles
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================
          GET STARTED - Clear Action
          ============================================ */}
      <section className="section-feature section-dark">
        <div className="container-narrow text-center">
          <h2 className="reveal text-headline text-on-dark">
            Start in under a minute.
          </h2>
          
          <p className="reveal mt-4 text-on-dark-secondary" style={{transitionDelay: '0.1s'}}>
            Install, add a provider, run your first command.
          </p>
          
          <div className="reveal mt-8" style={{transitionDelay: '0.15s'}}>
            <CodeBlock code="pip install amplifier" className="max-w-xs mx-auto" />
          </div>
          
          <div className="reveal mt-8 flex flex-col sm:flex-row gap-3 justify-center px-4" style={{transitionDelay: '0.2s'}}>
            <Link href="/build" className="btn-apple w-full sm:w-auto">
              Quick Start Guide
            </Link>
            <a 
              href="https://github.com/microsoft/amplifier" 
              className="btn-apple-secondary w-full sm:w-auto"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          </div>
          
          <p className="reveal mt-8 text-sm text-on-dark-tertiary" style={{transitionDelay: '0.3s'}}>
            Questions? <Link href="/support" className="text-link-blue hover:underline">Get support</Link>
          </p>
        </div>
      </section>
    </div>
  )
}
