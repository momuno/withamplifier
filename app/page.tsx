'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { useViewportHeight } from '@/hooks/useViewportHeight'
import { CodeBlock } from '@/components/CopyButton'
import { EmergenceField } from '@/components/EmergenceField'

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
          HERO - The Promise (with animated emergence field)
          ============================================ */}
      <section className="section-hero relative overflow-hidden">
        {/* Animated mesh gradient background - "emerging technology" */}
        <EmergenceField 
          opacity={0.7}
          blur={80}
          speed={0.0004}
        />
        {/* Gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-canvas/40 via-transparent to-canvas/60" />
        
        <div className="text-center container-default relative z-10">
          <h1 className="reveal text-display-xl text-ink font-heading px-2">
            Build AI Your Way
          </h1>
          
          <p className="reveal mt-6 md:mt-8 text-body-large text-ink max-w-2xl mx-auto px-4" style={{transitionDelay: '0.1s'}}>
            Your AI agent is a file you can read, write, and share. Not a black box you rent—a tool you own.
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
              Most AI tools don't let you see how they work.
            </h2>
          </div>
          
          <div className="reveal-stagger grid md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-on-dark mb-2">You can't read it</h3>
              <p className="text-on-dark-secondary text-sm leading-relaxed">
                The prompts, the logic, the rules it follows—hidden. When it breaks, you guess why.
              </p>
            </div>
            
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-on-dark mb-2">You can't change it</h3>
              <p className="text-on-dark-secondary text-sm leading-relaxed">
                Their model, their tools, their decisions. Want to swap the model or add a capability? You can't.
              </p>
            </div>
            
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-on-dark mb-2">You can't share it</h3>
              <p className="text-on-dark-secondary text-sm leading-relaxed">
                Your setup, your learnings, your workflow—locked in their system. Can't hand it to a teammate as a file.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 3 - The solution: A bundle IS your perspective
          Apple-style split layout: text left (35%), code right (65%)
          ============================================ */}
      <section className="section-feature section-gradient-flow">
        <div className="container-wide">
          {/* Split layout on large screens */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12 xl:gap-20">
            {/* Text column - constrained width for readability */}
            <div className="lg:w-[35%] xl:w-[32%] lg:flex-shrink-0">
              <div className="max-w-lg lg:max-w-none">
                <h2 className="reveal text-headline text-ink">
                  A bundle is your perspective, written down.
                </h2>
                <p className="reveal mt-4 text-body-large text-ink-slate" style={{transitionDelay: '0.1s'}}>
                  It's a file that defines how your AI agent thinks and works. You write it. You own it. You can share it.
                </p>
                
                {/* What goes into a bundle - stacked on all screens */}
                <div className="reveal-stagger mt-8 lg:mt-10 space-y-4" style={{transitionDelay: '0.2s'}}>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-signal-soft flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-signal text-sm font-semibold">P</span>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-ink">Providers</h3>
                      <p className="text-ink-slate text-sm mt-0.5">Claude, GPT-4, Ollama, or your own. Swap anytime.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-signal-soft flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-signal text-sm font-semibold">T</span>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-ink">Tools</h3>
                      <p className="text-ink-slate text-sm mt-0.5">Read files, run commands, search the web. Add only what you need.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-signal-soft flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-signal text-sm font-semibold">I</span>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-ink">Instructions</h3>
                      <p className="text-ink-slate text-sm mt-0.5">Your expertise, your standards, your workflow—written in plain text.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Code column - expands on large screens */}
            <div className="mt-10 lg:mt-0 lg:flex-1 lg:min-w-0">
              <div className="reveal" style={{transitionDelay: '0.3s'}}>
                <div className="rounded-2xl overflow-hidden border border-canvas-mist shadow-soft">
                  <div className="bg-canvas-stone px-4 py-2 border-b border-canvas-mist flex items-center gap-2">
                    <span className="text-xs font-mono text-ink-slate">security-reviewer.md</span>
                    <span className="text-xs text-ink-fog">— this is a bundle</span>
                  </div>
                  <div className="bg-canvas p-4 md:p-6 font-mono text-sm leading-relaxed overflow-x-auto">
                    <pre className="text-ink-slate"><code>{`---
bundle:
  name: security-reviewer
  version: 1.0.0

providers:
  - anthropic           # Use Claude

tools:
  - filesystem          # Read code
  - grep                # Search patterns
  - ast-analysis        # Parse syntax

behaviors:
  - secure-by-default   # Security-first mindset
---

# Security Reviewer

You are a security expert reviewing code changes.

## Your perspective:
- Assume all input is malicious
- Flag SQL injection, XSS, auth bypasses
- Check for secrets in code
- Verify input validation exists

## How you work:
1. Read the changed files
2. Identify attack surfaces
3. Report issues with line numbers
4. Suggest specific fixes`}</code></pre>
                  </div>
                </div>
                <p className="mt-4 text-center lg:text-left text-ink-fog text-sm">
                  This file IS the agent. Read it, change it, share it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 4 - Demo
          Apple-style split: text left, terminal right (larger)
          ============================================ */}
      <section className="section-feature section-stone">
        <div className="container-wide">
          {/* Split layout on large screens - reverse order for visual balance */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12 xl:gap-20">
            {/* Text column */}
            <div className="lg:w-[32%] xl:w-[28%] lg:flex-shrink-0 lg:order-1">
              <div className="max-w-lg lg:max-w-none text-center lg:text-left">
                <h2 className="reveal text-headline text-ink">
                  Here's how it works.
                </h2>
                <p className="reveal mt-4 text-body-large text-ink-slate" style={{transitionDelay: '0.1s'}}>
                  One command loads your bundle, connects to your model, and gets to work. You see everything it does.
                </p>
                
                {/* Key points */}
                <div className="reveal mt-6 space-y-3" style={{transitionDelay: '0.2s'}}>
                  <div className="flex items-center gap-2 justify-center lg:justify-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-signal"></span>
                    <span className="text-sm text-ink-slate">Loads your bundle automatically</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center lg:justify-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-signal"></span>
                    <span className="text-sm text-ink-slate">Shows every tool call and decision</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center lg:justify-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-signal"></span>
                    <span className="text-sm text-ink-slate">Works in your terminal or IDE</span>
                  </div>
                </div>
                
                <div className="reveal mt-8" style={{transitionDelay: '0.3s'}}>
                  <Link href="/explore" className="link-apple">
                    Try more examples
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Terminal column - larger on desktop */}
            <div className="mt-10 lg:mt-0 lg:flex-1 lg:min-w-0 lg:order-2">
              <div className="reveal" style={{transitionDelay: '0.25s'}}>
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
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 5 - Benefits
          Wider grid on large screens, asymmetric layout
          ============================================ */}
      <section className="section-feature section-dark-gradient">
        <div className="container-wide">
          {/* Asymmetric layout: narrow headline, wide grid */}
          <div className="lg:flex lg:gap-16 xl:gap-24">
            {/* Headline column - stays readable width */}
            <div className="lg:w-[38%] xl:w-[35%] lg:flex-shrink-0">
              <div className="text-center lg:text-left mb-12 lg:mb-0">
                <h2 className="reveal text-headline text-on-dark">
                  AI that plans before it acts, validates as it goes, and shows you why.
                </h2>
                <p className="reveal mt-4 text-on-dark-secondary max-w-xl lg:max-w-none" style={{transitionDelay: '0.1s'}}>
                  Amplifier agents think before they build. They track their own progress, check their work continuously, and coordinate like a team. You see every decision, every step, every reason.
                </p>
              </div>
            </div>
            
            {/* Benefits grid - expands on large screens */}
            <div className="lg:flex-1">
              <div className="reveal-stagger grid sm:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
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
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 6 - Ecosystem
          Split layout: text left, bundle showcase right
          ============================================ */}
      <section className="section-feature section-light-glow">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16 xl:gap-24">
            {/* Text column */}
            <div className="lg:w-[40%] xl:w-[38%] lg:flex-shrink-0">
              <div className="text-center lg:text-left">
                <h2 className="reveal text-headline text-ink">
                  What you build can be shared and scaled—while staying personal for everyone who uses it.
                </h2>
                
                <p className="reveal mt-4 text-body-large text-ink-slate max-w-xl lg:max-w-none" style={{transitionDelay: '0.1s'}}>
                  Package what works into a bundle. Share it with your team or publish it for everyone. 
                  Each person gets the same foundation with room to make it their own.
                </p>
                
                <div className="reveal mt-8" style={{transitionDelay: '0.2s'}}>
                  <Link href="/explore" className="btn-apple">
                    Explore bundles
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Bundle showcase - visual grid on large screens */}
            <div className="mt-12 lg:mt-0 lg:flex-1">
              <div className="reveal-stagger" style={{transitionDelay: '0.3s'}}>
                {/* Staggered bundle cards with visual hierarchy */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 lg:gap-4">
                  {[
                    { name: 'security-reviewer', desc: 'Find vulnerabilities' },
                    { name: 'documentation-writer', desc: 'Generate docs' },
                    { name: 'code-explorer', desc: 'Navigate codebases' },
                    { name: 'test-generator', desc: 'Write test suites' },
                    { name: 'api-designer', desc: 'Design REST APIs' },
                    { name: 'data-analyst', desc: 'Analyze datasets' },
                  ].map((bundle, i) => (
                    <div 
                      key={bundle.name} 
                      className={`p-4 lg:p-5 rounded-xl bg-canvas border border-canvas-mist shadow-soft-sm hover:shadow-soft hover:border-signal-glow transition-all duration-300 ${i === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
                    >
                      <div className="font-mono text-sm text-ink font-medium truncate">{bundle.name}</div>
                      <div className="text-xs text-ink-fog mt-1">{bundle.desc}</div>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-center lg:text-left text-ink-fog text-sm">
                  And many more in the community registry
                </p>
              </div>
            </div>
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
