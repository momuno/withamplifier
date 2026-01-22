'use client'

import Link from 'next/link'
import ScrollingCards from '@/components/ScrollingCards'
import { useEffect } from 'react'
import { useViewportHeight } from '@/hooks/useViewportHeight'
import { CodeBlock } from '@/components/CopyButton'
import ChladniWebGL from '@/components/ChladniWebGL'

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
      {/* Chladni pattern background - runs throughout site */}
      <ChladniWebGL />
      
      {/* ============================================
          SECTION 1: HERO - The Promise
          Light, open, welcoming
          ============================================ */}
      <section data-section="hero" data-theme="light" className="section-feature section-light-glow relative overflow-hidden">
        
        <div className="text-center container-default relative z-10">
          <h1 className="reveal text-display-xl text-ink font-heading px-2">
            Build your way<br />with Amplifier
          </h1>
          
          <p className="reveal mt-6 md:mt-8 text-body-large text-ink max-w-2xl mx-auto px-4" style={{transitionDelay: '0.1s'}}>
            Your AI agent is a file you can read, write, and share. Not a black box you rent. A tool you own.
          </p>
          
          <div className="reveal mt-8 md:mt-10" style={{transitionDelay: '0.2s'}}>
            <CodeBlock code="uv tool install git+https://github.com/microsoft/amplifier" className="max-w-lg mx-auto" />
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 2: THE PROBLEM - Trapped in black boxes
          BLACK section - should feel constraining, unclear, dark
          Ends with the problem, not the solution
          ============================================ */}
      <section data-section="problem" data-theme="dark" className="section-feature bg-[#0A0A0A]">
        <div className="container-narrow text-center">
          <h2 className="reveal text-headline text-on-dark">
            Most AI tools are black boxes.
          </h2>
          <p className="reveal mt-4 text-body-large text-on-dark-secondary max-w-2xl mx-auto" style={{transitionDelay: '0.1s'}}>
            They work. They respond. But you don't understand what's happening behind the scenes.
          </p>
          <p className="reveal mt-6 text-body-large text-on-dark-secondary max-w-2xl mx-auto" style={{transitionDelay: '0.2s'}}>
            They lock you to one model. Hide how they work. Keep your setup trapped in their system. When something breaks, you're guessing. When something better comes along, you start over.
          </p>
        </div>
      </section>

      {/* ============================================
          SECTION 3: DIFFERENTIATION - The Answer / Breaking Free
          Light gradient - ray of light emerging from darkness
          Explicit callback to Problem section's "Open. Visible. Yours."
          ============================================ */}
      <section data-section="differentiation" data-theme="light" className="section-feature section-gradient-flow">
        <div className="container-default">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="reveal text-headline text-on-dark">
              Here's how Amplifier is different.
            </h2>
            <p className="reveal mt-3 text-display-sm text-on-dark max-w-2xl mx-auto" style={{transitionDelay: '0.05s'}}>
              Open. Visible. Yours.
            </p>
            <p className="reveal mt-4 text-on-dark-secondary max-w-2xl mx-auto" style={{transitionDelay: '0.1s'}}>
              You see everything. You can change anything. And it works with whatever model you choose.
            </p>
          </div>
          
          <div className="reveal-stagger grid md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
            <div className="text-center md:text-left">
              <div className="w-10 h-10 rounded-xl bg-signal/20 flex items-center justify-center mx-auto md:mx-0 mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-signal">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M12 1v6m0 6v10"></path>
                  <path d="m4.93 4.93 4.24 4.24m5.66 5.66 4.24 4.24"></path>
                  <path d="M1 12h6m6 0h10"></path>
                  <path d="m4.93 19.07 4.24-4.24m5.66-5.66 4.24-4.24"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-on-dark mb-2">Use any model</h3>
              <p className="text-on-dark-secondary text-sm leading-relaxed">
                Claude, GPT-4, Gemini, Llama, or your own. Switch with one line. No lock-in, ever.
              </p>
            </div>
            
            <div className="text-center md:text-left">
              <div className="w-10 h-10 rounded-xl bg-signal/20 flex items-center justify-center mx-auto md:mx-0 mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-signal">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-on-dark mb-2">See everything</h3>
              <p className="text-on-dark-secondary text-sm leading-relaxed">
                Every prompt, every decision, every tool call. Nothing hidden. Debug in minutes, not hours.
              </p>
            </div>
            
            <div className="text-center md:text-left">
              <div className="w-10 h-10 rounded-xl bg-signal/20 flex items-center justify-center mx-auto md:mx-0 mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-signal">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-on-dark mb-2">Own your setup</h3>
              <p className="text-on-dark-secondary text-sm leading-relaxed">
                Take it anywhere. Modify anything. No vendor lock-in, no hidden dependencies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 4: THE PLATFORM - Everything you get
          Light, clear, organized - shows breadth and completeness
          ============================================ */}
      <section data-section="platform" data-theme="light" className="section-feature section-light-glow">
        <div className="container-wide">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="reveal text-headline text-ink">
              Everything you need to build AI agents.
            </h2>
            <p className="reveal mt-4 text-body-large text-ink-slate max-w-2xl mx-auto" style={{transitionDelay: '0.1s'}}>
              A complete platform, not just a wrapper. Providers, tools, agents, and workflows that work together.
            </p>
          </div>
          
          <div className="reveal-stagger grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {/* Providers */}
            <div className="p-6 rounded-2xl bg-canvas border border-canvas-mist shadow-soft">
              <div className="w-12 h-12 rounded-xl bg-signal-soft flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-signal">
                  <path d="M12 22v-5"></path>
                  <path d="M9 8V2"></path>
                  <path d="M15 8V2"></path>
                  <path d="M18 8v4a6 6 0 01-12 0V8h12z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-ink mb-2">Providers</h3>
              <p className="text-ink-slate text-sm leading-relaxed mb-3">
                Connect to any LLM. Anthropic, OpenAI, Google, Azure, AWS, Ollama, or bring your own.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs px-2 py-0.5 bg-canvas-stone rounded-full text-ink-slate">Claude</span>
                <span className="text-xs px-2 py-0.5 bg-canvas-stone rounded-full text-ink-slate">GPT-4</span>
                <span className="text-xs px-2 py-0.5 bg-canvas-stone rounded-full text-ink-slate">Gemini</span>
                <span className="text-xs px-2 py-0.5 bg-canvas-stone rounded-full text-ink-slate">Llama</span>
              </div>
            </div>
            
            {/* Tools */}
            <div className="p-6 rounded-2xl bg-canvas border border-canvas-mist shadow-soft">
              <div className="w-12 h-12 rounded-xl bg-signal-soft flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-signal">
                  <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-ink mb-2">Tools</h3>
              <p className="text-ink-slate text-sm leading-relaxed mb-3">
                Give your agent capabilities. File access, web search, code execution, or build your own.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs px-2 py-0.5 bg-canvas-stone rounded-full text-ink-slate">filesystem</span>
                <span className="text-xs px-2 py-0.5 bg-canvas-stone rounded-full text-ink-slate">bash</span>
                <span className="text-xs px-2 py-0.5 bg-canvas-stone rounded-full text-ink-slate">web</span>
                <span className="text-xs px-2 py-0.5 bg-canvas-stone rounded-full text-ink-slate">grep</span>
              </div>
            </div>
            
            {/* Agents */}
            <div className="p-6 rounded-2xl bg-canvas border border-canvas-mist shadow-soft">
              <div className="w-12 h-12 rounded-xl bg-signal-soft flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-signal">
                  <circle cx="12" cy="8" r="5"></circle>
                  <path d="M20 21a8 8 0 00-16 0"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-ink mb-2">Agents</h3>
              <p className="text-ink-slate text-sm leading-relaxed mb-3">
                Specialized personas for specific tasks. Security reviewers, writers, architects, analysts.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs px-2 py-0.5 bg-canvas-stone rounded-full text-ink-slate">explorer</span>
                <span className="text-xs px-2 py-0.5 bg-canvas-stone rounded-full text-ink-slate">architect</span>
                <span className="text-xs px-2 py-0.5 bg-canvas-stone rounded-full text-ink-slate">reviewer</span>
              </div>
            </div>
            
            {/* Recipes */}
            <div className="p-6 rounded-2xl bg-canvas border border-canvas-mist shadow-soft">
              <div className="w-12 h-12 rounded-xl bg-signal-soft flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-signal">
                  <path d="M4 19.5v-15A2.5 2.5 0 016.5 2H20v20H6.5a2.5 2.5 0 010-5H20"></path>
                  <path d="M8 7h6"></path>
                  <path d="M8 11h8"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-ink mb-2">Recipes</h3>
              <p className="text-ink-slate text-sm leading-relaxed mb-3">
                Multi-step workflows with checkpoints. Chain agents together, add approval gates, resume anytime.
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs px-2 py-0.5 bg-canvas-stone rounded-full text-ink-slate">code-review</span>
                <span className="text-xs px-2 py-0.5 bg-canvas-stone rounded-full text-ink-slate">deploy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 5: HOW IT WORKS - Demo
          Neutral stone - grounded, practical, real
          ============================================ */}
      <section data-section="demo" data-theme="light" className="section-feature section-stone">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12 xl:gap-20">
            {/* Text column */}
            <div className="lg:w-[32%] xl:w-[28%] lg:flex-shrink-0 lg:order-1">
              <div className="max-w-lg lg:max-w-none text-center lg:text-left">
                <h2 className="reveal text-headline text-ink">
                  See it in action.
                </h2>
                <p className="reveal mt-4 text-body-large text-ink-slate" style={{transitionDelay: '0.1s'}}>
                  One command. Full visibility. Watch your agent think, decide, and act.
                </p>
                
                <div className="reveal mt-6 space-y-3" style={{transitionDelay: '0.2s'}}>
                  <div className="flex items-center gap-2 justify-center lg:justify-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-signal"></span>
                    <span className="text-sm text-ink-slate">Every tool call logged</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center lg:justify-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-signal"></span>
                    <span className="text-sm text-ink-slate">Every decision explained</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center lg:justify-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-signal"></span>
                    <span className="text-sm text-ink-slate">Swap models mid-session</span>
                  </div>
                </div>
                
                <div className="reveal mt-8" style={{transitionDelay: '0.3s'}}>
                  <Link href="/build" className="link-apple">
                    Try it yourself
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Terminal column */}
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

→ Provider: claude-sonnet-4 (anthropic)
→ Tools: filesystem, grep, ast-analysis

◐ Reading changed files...
◐ Analyzing src/auth.py for vulnerabilities...

⚠ Found 2 issues:

1. SQL Injection Risk (Line 47)
   user_query = f"SELECT * FROM users WHERE id = {user_id}"
   → Use parameterized queries instead

2. Missing Input Validation (Line 23)
   → Add length limits to prevent DoS

✓ Review complete. 2 issues, 0 false positives.

$ amplifier provider use openai  # Switch to GPT-4
✓ Provider updated. Next run will use gpt-4.`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 6: THE BUNDLE PATTERN - One file, compounding benefits
          Light - clean, elegant, simple beauty
          ============================================ */}
      <section data-section="bundles" data-theme="light" className="section-feature section-light-glow">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12 xl:gap-20">
            {/* Text column */}
            <div className="lg:w-[35%] xl:w-[32%] lg:flex-shrink-0">
              <div className="max-w-lg lg:max-w-none">
                <h2 className="reveal text-headline text-ink">
                  Package it as a bundle.
                </h2>
                <p className="reveal mt-4 text-body-large text-ink-slate" style={{transitionDelay: '0.1s'}}>
                  A bundle captures your entire setup. Providers, tools, behaviors, instructions. Everything in plain text.
                </p>
                <p className="reveal mt-3 text-body-large text-ink" style={{transitionDelay: '0.15s'}}>
                  The more you use it, the more it becomes yours.
                </p>
              </div>
            </div>
            
            {/* Code column */}
            <div className="mt-10 lg:mt-0 lg:flex-1 lg:min-w-0">
              <div className="reveal" style={{transitionDelay: '0.2s'}}>
                <div className="rounded-2xl overflow-hidden border border-canvas-mist shadow-soft">
                  <div className="bg-canvas-stone px-4 py-2 border-b border-canvas-mist flex items-center gap-2">
                    <span className="text-xs font-mono text-ink-slate">security-reviewer.md</span>
                  </div>
                  <div className="bg-canvas p-4 md:p-6 font-mono text-sm leading-relaxed overflow-x-auto">
                    <pre className="text-ink-slate"><code>{`---
bundle:
  name: security-reviewer
  version: 1.0.0

providers:
  - anthropic           # Or openai, google, ollama...

tools:
  - filesystem          # Read code
  - grep                # Search patterns

behaviors:
  - secure-by-default   # Security-first mindset
---

# Security Reviewer

You review code for vulnerabilities.

## Focus on:
- SQL injection, XSS, auth bypasses
- Secrets in code
- Missing input validation`}</code></pre>
                  </div>
                </div>
                <p className="mt-4 text-center lg:text-left text-ink-fog text-sm">
                  42 lines. That's the entire agent.
                </p>
              </div>
            </div>
          </div>
          
          {/* Benefits grid */}
          <div className="mt-16 lg:mt-20">
            <div className="reveal-stagger grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
              <div className="p-5 rounded-xl bg-canvas border border-canvas-mist">
                <h3 className="text-lg font-semibold text-ink mb-2">Debug in minutes</h3>
                <p className="text-ink-slate text-sm leading-relaxed">
                  Every tool call logged. When it breaks, trace the exact line that failed.
                </p>
              </div>
              
              <div className="p-5 rounded-xl bg-canvas border border-canvas-mist">
                <h3 className="text-lg font-semibold text-ink mb-2">Swap anything</h3>
                <p className="text-ink-slate text-sm leading-relaxed">
                  Change models, tools, providers. Your setup evolves as fast as AI does.
                </p>
              </div>
              
              <div className="p-5 rounded-xl bg-canvas border border-canvas-mist">
                <h3 className="text-lg font-semibold text-ink mb-2">Share like code</h3>
                <p className="text-ink-slate text-sm leading-relaxed">
                  Git push. PR review. Hand it to a teammate. No screenshots, no wikis.
                </p>
              </div>
              
              <div className="p-5 rounded-xl bg-canvas border border-canvas-mist">
                <h3 className="text-lg font-semibold text-ink mb-2">Your data stays yours</h3>
                <p className="text-ink-slate text-sm leading-relaxed">
                  Run locally. Inspect every call. Add approval gates. Nothing leaves without your say.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 7: ECOSYSTEM - Community bundles
          Light gradient - abundant, connected, network
          ============================================ */}
      <section data-section="ecosystem" data-theme="light" className="section-feature section-gradient-flow">
        <div className="container-wide">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="reveal text-headline text-ink">
              Start with what works.
            </h2>
            
            <p className="reveal mt-4 text-body-large text-ink-slate max-w-2xl mx-auto" style={{transitionDelay: '0.1s'}}>
              Install a bundle from the community. Make it yours. Share what you build.
            </p>
            
            <div className="reveal mt-8" style={{transitionDelay: '0.2s'}}>
              <Link href="/explore" className="btn-apple">
                Explore bundles
              </Link>
            </div>
          </div>
          
          <div className="reveal" style={{transitionDelay: '0.3s'}}>
            <ScrollingCards cards={[
              {
                name: 'security-reviewer',
                type: 'agent',
                description: 'Comprehensive security analysis for vulnerabilities, secrets, and common attack vectors',
                author: 'microsoft',
                stars: 847,
                validated: true
              },
              {
                name: 'documentation-writer',
                type: 'agent',
                description: 'Generate comprehensive documentation from code with examples and API references',
                author: 'amplifier-community',
                stars: 623,
                validated: true
              },
              {
                name: 'code-explorer',
                type: 'tool',
                description: 'Navigate large codebases with semantic search and intelligent code understanding',
                author: 'robotdad',
                stars: 512,
                validated: false
              },
              {
                name: 'test-generator',
                type: 'agent',
                description: 'Write comprehensive test suites with edge cases and coverage analysis',
                author: 'amplifier-labs',
                stars: 489,
                validated: true
              },
              {
                name: 'api-designer',
                type: 'bundle',
                description: 'Design RESTful APIs with OpenAPI specs, validation, and best practices',
                author: 'apicraft',
                stars: 356,
                validated: false
              },
              {
                name: 'data-analyst',
                type: 'agent',
                description: 'Analyze datasets with statistical insights, visualizations, and recommendations',
                author: 'dataflow',
                stars: 298,
                validated: true
              },
              {
                name: 'code-reviewer',
                type: 'agent',
                description: 'Automated code reviews focusing on best practices, performance, and maintainability',
                author: 'microsoft',
                stars: 734,
                validated: true
              },
              {
                name: 'refactoring-assistant',
                type: 'agent',
                description: 'Intelligent refactoring suggestions with automated code transformations',
                author: 'amplifier-community',
                stars: 421,
                validated: false
              },
              {
                name: 'sql-optimizer',
                type: 'tool',
                description: 'Analyze and optimize SQL queries for performance and best practices',
                author: 'dbtools',
                stars: 267,
                validated: true
              },
              {
                name: 'ui-component-builder',
                type: 'bundle',
                description: 'Generate accessible, responsive UI components with modern frameworks',
                author: 'frontend-guild',
                stars: 543,
                validated: false
              }
            ]} />
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 8: CTA - Call to action
          Dark - focused, decisive (but not black like Problem)
          ============================================ */}
      <section data-section="cta" data-theme="dark" className="section-feature section-dark">
        <div className="container-narrow text-center">
          <h2 className="reveal text-headline text-on-dark">
            Your first agent in 60 seconds.
          </h2>
          
          <p className="reveal mt-4 text-on-dark-secondary max-w-lg mx-auto" style={{transitionDelay: '0.1s'}}>
            Install. Connect a model. Run a command. You'll have a working agent before you finish your coffee.
          </p>
          
          <div className="reveal mt-8" style={{transitionDelay: '0.15s'}}>
            <CodeBlock code="uv tool install git+https://github.com/microsoft/amplifier" className="max-w-lg mx-auto" />
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
