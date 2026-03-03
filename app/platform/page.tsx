'use client'

import { useEffect } from 'react'
import { useViewportHeight } from '@/hooks/useViewportHeight'
import { CodeBlock } from '@/components/CopyButton'
import ExperienceCards from '@/components/diagrams/ExperienceCards'
import ProviderRoutingVisual from '@/components/diagrams/ProviderRoutingVisual'
import BuildRunPhaseVisual from '@/components/diagrams/BuildRunPhaseVisual'
import BoundaryDiagram from '@/components/diagrams/BoundaryDiagram'

/* ------------------------------------------------------------------ */
/*  Inline sub-components (kept in-file to match developers pattern)  */
/* ------------------------------------------------------------------ */

function AnnotatedYaml() {
  const line = (key: string, value: string, comment?: string) => (
    <div>
      <span style={{ color: '#8578F0' }}>{key}</span>
      <span style={{ color: '#ffffff' }}>{value}</span>
      {comment && <span style={{ color: 'rgba(255,255,255,0.35)' }}>{comment}</span>}
    </div>
  )

  return (
    <div
      className="rounded-2xl p-8 text-left font-mono"
      style={{
        background: '#0f0e17',
        border: '1px solid rgba(255,255,255,0.06)',
        fontSize: 'clamp(0.78rem, 1.4vw, 0.92rem)',
        lineHeight: '1.75',
        overflowX: 'auto',
      }}
    >
      <pre style={{ margin: 0 }}>
        {line('name', ': my-assistant')}
        <br />
        {line('providers', ':                    ', '# your models')}
        {line('  - module', ': provider-anthropic')}
        {line('    config', ':')}
        {line('      model', ': claude-sonnet-4-5')}
        <br />
        {line('tools', ':                        ', '# your tools')}
        {line('  - module', ': tool-filesystem')}
        {line('  - module', ': tool-web-search')}
        <br />
        {line('behaviors', ':                    ', '# shared capabilities')}
        {line('  - source', ': "@foundation:coding"')}
        {line('  - source', ': "@foundation:agents"')}
      </pre>
    </div>
  )
}

function StepCard({
  number,
  title,
  description,
  delay,
}: {
  number: string
  title: string
  description: string
  delay: string
}) {
  return (
    <div
      className="reveal-stagger rounded-xl p-6"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.06)',
        transitionDelay: delay,
      }}
    >
      <span
        className="font-heading font-bold block"
        style={{
          color: 'rgba(133,120,240,0.15)',
          fontSize: 'clamp(3rem, 6vw, 5rem)',
          lineHeight: '1',
        }}
      >
        {number}
      </span>
      <h4 className="text-title font-heading text-white mt-2">{title}</h4>
      <p className="text-body mt-2" style={{ color: 'rgba(255,255,255,0.55)' }}>
        {description}
      </p>
    </div>
  )
}

function StepArrow() {
  return (
    <div className="hidden md:flex items-center justify-center" style={{ width: '2rem' }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 12h14m0 0l-5-5m5 5l-5 5"
          stroke="rgba(133,120,240,0.3)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

const SESSION_PATTERNS = [
  {
    app: 'REST API or webhook',
    pattern: 'Per-Request',
    how: 'Create session, execute, discard. Seconds.',
  },
  {
    app: 'Chat bot or messaging',
    pattern: 'Per-Conversation',
    how: 'One session per thread. Minutes to hours.',
  },
  {
    app: 'Personal AI assistant',
    pattern: 'Singleton',
    how: 'One persistent session. Days to weeks.',
  },
  {
    app: 'Voice assistant',
    pattern: 'Voice Bridge',
    how: 'Voice handles audio; Amplifier handles reasoning.',
  },
  {
    app: 'Multi-user platform',
    pattern: 'Multi-Session',
    how: 'Route to different bundles per user or context.',
  },
]

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function PlatformPage() {
  useViewportHeight()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    )
    document.querySelectorAll('.reveal, .reveal-stagger, .reveal-scale').forEach(el => {
      observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="pt-16">

      {/* ============================================================
          SECTION 1 — HERO
          ============================================================ */}

      <section
        data-section="hero"
        data-theme="light"
        className="section-feature section-light-glow"
        style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div className="container-default text-center">
          <p className="reveal text-eyebrow text-signal tracking-widest uppercase mb-6">
            For Builders
          </p>
          <h1
            className="reveal text-display-xl font-heading text-ink"
            style={{ transitionDelay: '0.05s', textWrap: 'balance' as const }}
          >
            Power your AI experiences with Amplifier
          </h1>
          <p
            className="reveal text-body-large text-ink-slate max-w-2xl mx-auto mt-6"
            style={{ transitionDelay: '0.1s', textWrap: 'balance' as const }}
          >
            The modular engine behind intelligent apps, agents, and workflows — not just another CLI.
          </p>
          <div className="reveal mt-10" style={{ transitionDelay: '0.15s' }}>
            <CodeBlock
              code="pip install amplifier"
              className="max-w-md mx-auto"
            />
            <a
              href="https://github.com/microsoft/amplifier"
              className="inline-block mt-4 text-caption text-signal hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub →
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 2 — POWER ANY EXPERIENCE
          ============================================================ */}

      <section
        data-section="experiences"
        data-theme="light"
        className="section-feature section-stone"
        style={{ paddingTop: '6rem', paddingBottom: '6rem' }}
      >
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2
              className="reveal text-display font-heading text-ink"
              style={{ textWrap: 'balance' as const }}
            >
              One engine. Any shape.
            </h2>
            <p
              className="reveal text-body-large text-ink-slate max-w-2xl mx-auto mt-4"
              style={{ transitionDelay: '0.05s', textWrap: 'balance' as const }}
            >
              Amplifier powers the intelligence underneath. Your app decides what that looks like.
            </p>
          </div>
          <div className="reveal-stagger">
            <ExperienceCards />
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 3 — ANY MODEL, SMART ROUTING
          ============================================================ */}

      <section
        data-section="routing"
        data-theme="dark"
        className="section-feature section-dark"
        style={{ paddingTop: '6rem', paddingBottom: '6rem' }}
      >
        <div className="container-default text-center">
          <h2
            className="reveal text-display font-heading text-white"
            style={{ textWrap: 'balance' as const }}
          >
            Use every model. Pay for what matters.
          </h2>
          <p
            className="reveal text-body-large max-w-2xl mx-auto mt-4"
            style={{ transitionDelay: '0.05s', color: 'rgba(255,255,255,0.6)', textWrap: 'balance' as const }}
          >
            Route each task to the right model — frontier for the hard stuff, fast and cheap for everything else.
          </p>
          <div className="reveal-scale mt-12" style={{ transitionDelay: '0.1s' }}>
            <ProviderRoutingVisual />
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {['Use GitHub Copilot credits', 'Run locally with Ollama', 'Mix providers in one session'].map(
              (label) => (
                <span
                  key={label}
                  className="text-caption rounded-full px-4 py-2"
                  style={{
                    color: 'rgba(255,255,255,0.55)',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {label}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 4 — BUILD WITH POWER, RUN AFFORDABLY
          ============================================================ */}

      <section
        data-section="build-run"
        data-theme="dark"
        className="section-feature section-dark-gradient"
        style={{ paddingTop: '6rem', paddingBottom: '6rem' }}
      >
        <div className="container-default text-center">
          <h2
            className="reveal text-display font-heading text-white"
            style={{ textWrap: 'balance' as const }}
          >
            Invest in building. Deploy for less.
          </h2>
          <p
            className="reveal text-body-large max-w-2xl mx-auto mt-4"
            style={{ transitionDelay: '0.05s', color: 'rgba(255,255,255,0.6)', textWrap: 'balance' as const }}
          >
            Develop with frontier models to get things right. Ship what you built to run on smaller, cheaper, local models.
          </p>
          <div className="reveal-scale mt-12" style={{ transitionDelay: '0.1s' }}>
            <BuildRunPhaseVisual />
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 5 — THE DEVELOPMENT EXPERIENCE
          ============================================================ */}

      <section
        data-section="dev-experience"
        data-theme="light"
        className="section-feature section-light-glow"
        style={{ paddingTop: '6rem', paddingBottom: '6rem' }}
      >
        <div className="text-center" style={{ maxWidth: '680px', marginInline: 'auto', paddingInline: '1.5rem' }}>
          <h2
            className="reveal text-display font-heading text-ink"
            style={{ textWrap: 'balance' as const }}
          >
            What you build with
          </h2>
          <p
            className="reveal text-body-large text-ink-slate max-w-xl mx-auto mt-4"
            style={{ transitionDelay: '0.05s', textWrap: 'balance' as const }}
          >
            A bundle is a declarative file that defines your AI experience. One file. Complete control.
          </p>
          <div className="reveal-scale mt-10" style={{ transitionDelay: '0.1s' }}>
            <AnnotatedYaml />
          </div>
          <p className="reveal text-body text-ink-slate mt-6" style={{ transitionDelay: '0.15s' }}>
            Change one line, different provider. That&apos;s composability.
          </p>
        </div>
      </section>

      {/* ============================================================
          SECTION 6 — FROM BUNDLE TO APP
          ============================================================ */}

      <section
        data-section="bundle-to-app"
        data-theme="dark"
        className="section-feature section-dark-gradient"
        style={{ paddingTop: '6rem', paddingBottom: '6rem' }}
      >

        {/* ---------- Movement A: Four-Step Path ---------- */}
        <div className="container-default text-center">
          <p className="reveal text-eyebrow text-signal-light tracking-widest uppercase mb-4">
            The Path
          </p>
          <h2
            className="reveal text-display font-heading text-white"
            style={{ transitionDelay: '0.05s', textWrap: 'balance' as const }}
          >
            From declaration to running app
          </h2>

          {/* Desktop: 4-col with arrows */}
          <div className="hidden md:flex items-stretch justify-center gap-0 mt-12">
            <StepCard number="01" title="Declare" description="Bundle defines intelligence — models, tools, behaviors" delay="0.05s" />
            <StepArrow />
            <StepCard number="02" title="Prepare" description="Load bundle once at startup" delay="0.1s" />
            <StepArrow />
            <StepCard number="03" title="Create Sessions" description="One per interaction, cheap and lightweight" delay="0.15s" />
            <StepArrow />
            <StepCard number="04" title="Execute" description="Send input, get output, app decides what's next" delay="0.2s" />
          </div>

          {/* Mobile: single column */}
          <div className="md:hidden grid grid-cols-1 gap-4 mt-10">
            <StepCard number="01" title="Declare" description="Bundle defines intelligence — models, tools, behaviors" delay="0.05s" />
            <StepCard number="02" title="Prepare" description="Load bundle once at startup" delay="0.1s" />
            <StepCard number="03" title="Create Sessions" description="One per interaction, cheap and lightweight" delay="0.15s" />
            <StepCard number="04" title="Execute" description="Send input, get output, app decides what's next" delay="0.2s" />
          </div>
        </div>

        {/* ---------- Movement B: Boundary Diagram ---------- */}
        <div className="container-wide" style={{ marginTop: '5rem' }}>
          <p className="reveal text-eyebrow text-signal-light tracking-widest uppercase mb-3">
            The Boundary
          </p>
          <h3
            className="reveal text-title font-heading text-white"
            style={{ transitionDelay: '0.05s', textWrap: 'balance' as const }}
          >
            Your app and Amplifier meet at one clean boundary
          </h3>
          <div className="reveal-scale mt-10" style={{ transitionDelay: '0.1s' }}>
            <BoundaryDiagram />
          </div>
        </div>

        {/* ---------- Movement C: Session Patterns ---------- */}
        <div className="container-default" style={{ marginTop: '5rem' }}>
          <p className="reveal text-eyebrow text-signal-light tracking-widest uppercase mb-3">
            Session Patterns
          </p>
          <h3
            className="reveal text-title font-heading text-white mb-8"
            style={{ transitionDelay: '0.05s', textWrap: 'balance' as const }}
          >
            Pick the pattern that matches your app
          </h3>

          {/* Desktop table */}
          <div className="reveal hidden sm:block" style={{ transitionDelay: '0.1s' }}>
            <div
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '0.75rem',
                overflow: 'hidden',
              }}
            >
              <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <th className="text-eyebrow px-6 py-4" style={{ color: 'rgba(255,255,255,0.5)' }}>App Type</th>
                    <th className="text-eyebrow px-6 py-4" style={{ color: 'rgba(255,255,255,0.5)' }}>Pattern</th>
                    <th className="text-eyebrow px-6 py-4" style={{ color: 'rgba(255,255,255,0.5)' }}>How It Works</th>
                  </tr>
                </thead>
                <tbody>
                  {SESSION_PATTERNS.map((row, i) => (
                    <tr
                      key={row.pattern}
                      style={{
                        borderTop: i > 0 ? '1px solid rgba(255,255,255,0.06)' : undefined,
                      }}
                    >
                      <td className="text-body text-white px-6 py-4">{row.app}</td>
                      <td className="font-mono px-6 py-4" style={{ color: '#8578F0' }}>{row.pattern}</td>
                      <td className="text-body px-6 py-4" style={{ color: 'rgba(255,255,255,0.55)' }}>{row.how}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile stacked cards */}
          <div className="sm:hidden grid grid-cols-1 gap-4 reveal" style={{ transitionDelay: '0.1s' }}>
            {SESSION_PATTERNS.map((row) => (
              <div
                key={row.pattern}
                className="rounded-xl p-5"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <p className="text-caption uppercase tracking-wide mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {row.app}
                </p>
                <p className="font-mono text-body mb-2" style={{ color: '#8578F0' }}>
                  {row.pattern}
                </p>
                <p className="text-caption" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  {row.how}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 7 — GET STARTED
          ============================================================ */}

      <section
        data-section="get-started"
        data-theme="dark"
        className="section-feature section-dark"
        style={{ paddingTop: '6rem', paddingBottom: '6rem' }}
      >
        <div className="text-center" style={{ maxWidth: '580px', marginInline: 'auto', paddingInline: '1.5rem' }}>
          <h2
            className="reveal text-display font-heading text-white"
            style={{ textWrap: 'balance' as const }}
          >
            Start building
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-4">
            {[
              { step: '1', code: 'pip install amplifier' },
              { step: '2', code: 'amplifier init my-assistant' },
              { step: '3', code: 'amplifier run' },
            ].map((item) => (
              <div
                key={item.step}
                className="reveal-stagger rounded-xl p-5 text-left flex items-center gap-4"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  transitionDelay: `${Number(item.step) * 0.06}s`,
                }}
              >
                <span
                  className="font-heading font-bold shrink-0"
                  style={{ color: 'rgba(133,120,240,0.3)', fontSize: '1.5rem' }}
                >
                  {item.step}
                </span>
                <code className="font-mono text-white text-body">{item.code}</code>
              </div>
            ))}
          </div>

          <div className="reveal mt-10 flex items-center justify-center gap-6" style={{ transitionDelay: '0.2s' }}>
            <a href="/docs" className="text-signal-light hover:underline text-body">Documentation</a>
            <span style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>
            <a href="/examples" className="text-signal-light hover:underline text-body">Examples</a>
            <span style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>
            <a
              href="https://github.com/microsoft/amplifier"
              className="text-signal-light hover:underline text-body"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
