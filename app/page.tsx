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
        {/* AI-generated ambient background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: 'url(/assets/backgrounds/hero-ambient.png)' }}
        />
        {/* Gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-canvas/60 via-canvas/40 to-canvas/80" />
        
        <div className="text-center container-default relative z-10">
          <h1 className="reveal text-display-xl text-ink font-heading px-2">
            Build AI Your Way
          </h1>
          
          <p className="reveal mt-6 md:mt-8 text-body-large text-ink max-w-2xl mx-auto px-4" style={{transitionDelay: '0.1s'}}>
            Amplifier is the open-source framework for people who want full control over how their AI agents work. Clear, visible, and designed to grow with your vision.
          </p>
          
          <div className="reveal mt-8 md:mt-10" style={{transitionDelay: '0.2s'}}>
            <CodeBlock code="pip install amplifier" className="max-w-xs mx-auto" />
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 2 - The wall you've hit
          ============================================ */}
      <section className="section-feature section-dark">
        <div className="container-default">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="reveal text-headline text-on-dark">
              AI tools today are elaborate black boxes.
            </h2>
          </div>
          
          <div className="reveal-stagger grid md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-on-dark mb-2">You can't see inside</h3>
              <p className="text-on-dark-secondary text-sm leading-relaxed">
                When something breaks, you're left guessing. No way to trace what it tried, what it saw, or why it went wrong.
              </p>
            </div>
            
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-on-dark mb-2">You can't change anything</h3>
              <p className="text-on-dark-secondary text-sm leading-relaxed">
                Locked into their model, their tools, their decisions. A better model comes out? Too bad.
              </p>
            </div>
            
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-on-dark mb-2">You can't make it yours</h3>
              <p className="text-on-dark-secondary text-sm leading-relaxed">
                Generic prompts. Generic behavior. No way to encode your expertise, your standards, your way of working.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 3 - The solution
          ============================================ */}
      <section className="section-feature section-gradient-flow">
        <div className="container-default">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="reveal text-headline text-ink">
              Amplifier lets you encode your perspective into AI that's visible, verifiable, and yours.
            </h2>
            <p className="reveal mt-4 text-body-large text-ink-slate max-w-2xl mx-auto" style={{transitionDelay: '0.1s'}}>
              Providers, tools, and behaviors snap together like building blocks. Swap one without touching the rest. Combine them into bundles that work the way you think.
            </p>
          </div>
          
          {/* Horizontal scroll on mobile, grid on desktop */}
          <div className="reveal-stagger scroll-container scroll-container-grid max-w-5xl mx-auto">
            {/* Provider */}
            <div className="scroll-card feature-tile feature-tile-gradient p-6 md:p-8 soft-glow md:w-auto">
              <h3 className="text-xl font-semibold text-ink mb-3">Providers</h3>
              <p className="text-ink-slate text-sm mb-4">
                The brain. Claude, GPT-4, Ollama, or run your own local model. Switch between them without changing anything else.
              </p>
              <code className="text-xs bg-canvas-mist px-2 py-1 rounded-lg font-mono text-ink-slate">
                providers: [anthropic, ollama]
              </code>
            </div>
            
            {/* Tools */}
            <div className="scroll-card feature-tile feature-tile-gradient p-6 md:p-8 soft-glow md:w-auto">
              <h3 className="text-xl font-semibold text-ink mb-3">Tools</h3>
              <p className="text-ink-slate text-sm mb-4">
                The hands. Filesystem access, bash commands, web search, GitHub integration. Add only what you need.
              </p>
              <code className="text-xs bg-canvas-mist px-2 py-1 rounded-lg font-mono text-ink-slate">
                tools: [filesystem, bash, grep]
              </code>
            </div>
            
            {/* Behaviors */}
            <div className="scroll-card feature-tile feature-tile-gradient p-6 md:p-8 soft-glow md:w-auto">
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
          SECTION 4 - Demo
          ============================================ */}
      <section className="section-feature section-stone">
        <div className="container-narrow">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="reveal text-headline text-ink">
              Here's how it works.
            </h2>
            <p className="reveal mt-4 text-ink-slate max-w-xl mx-auto" style={{transitionDelay: '0.1s'}}>
              One command loads your bundle, connects to your model, and gets to work. You see everything it does.
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
          SECTION 5 - Benefits
          ============================================ */}
      <section className="section-feature section-dark-gradient">
        <div className="container-default">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="reveal text-headline text-on-dark">
              AI that plans before it acts, validates as it goes, and shows you why.
            </h2>
            <p className="reveal mt-4 text-on-dark-secondary max-w-2xl mx-auto" style={{transitionDelay: '0.1s'}}>
              Amplifier agents think before they build. They track their own progress, check their work continuously, and coordinate like a team. You see every decision, every step, every reason.
            </p>
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
          SECTION 6 - Ecosystem
          ============================================ */}
      <section className="section-feature section-light-glow">
        <div className="container-default text-center">
          <h2 className="reveal text-headline text-ink">
            What you build can be shared and scaled—while staying personal for everyone who uses it.
          </h2>
          
          <p className="reveal mt-4 text-body-large text-ink-slate max-w-2xl mx-auto" style={{transitionDelay: '0.1s'}}>
            Package what works into a bundle. Share it with your team or publish it for everyone. 
            Each person gets the same foundation with room to make it their own. Infinitely scalable, individually yours.
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
          SECTION 7 - CTA
          ============================================ */}
      <section className="section-feature section-dark">
        <div className="container-narrow text-center">
          <h2 className="reveal text-headline text-on-dark">
            Get started now.
          </h2>
          
          <p className="reveal mt-4 text-on-dark-secondary max-w-lg mx-auto" style={{transitionDelay: '0.1s'}}>
            Install Amplifier, connect a model, run your first command. Takes about a minute.
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
