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
          ============================================ */}
      <section className="section-feature section-gradient-flow">
        <div className="container-default">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="reveal text-headline text-ink">
              A bundle is your perspective, written down.
            </h2>
            <p className="reveal mt-4 text-body-large text-ink-slate max-w-2xl mx-auto" style={{transitionDelay: '0.1s'}}>
              It's a file that defines how your AI agent thinks and works. You write it. You own it. You can share it.
            </p>
          </div>
          
          {/* Show actual bundle - THIS is encoding your perspective */}
          <div className="reveal max-w-3xl mx-auto" style={{transitionDelay: '0.2s'}}>
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
            <p className="mt-4 text-center text-ink-fog text-sm">
              This file IS the agent. Read it, change it, share it.
            </p>
          </div>
          
          {/* What goes into a bundle */}
          <div className="reveal-stagger mt-12 md:mt-16 grid md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
            <div className="text-center p-4">
              <h3 className="text-lg font-semibold text-ink mb-2">Providers</h3>
              <p className="text-ink-slate text-sm">
                Which model to use. Claude, GPT-4, Ollama, or your own. Swap anytime.
              </p>
            </div>
            
            <div className="text-center p-4">
              <h3 className="text-lg font-semibold text-ink mb-2">Tools</h3>
              <p className="text-ink-slate text-sm">
                What it can do. Read files, run commands, search the web. Add only what you need.
              </p>
            </div>
            
            <div className="text-center p-4">
              <h3 className="text-lg font-semibold text-ink mb-2">Instructions</h3>
              <p className="text-ink-slate text-sm">
                How it thinks. Your expertise, your standards, your workflow—written in plain text.
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
