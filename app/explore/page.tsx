'use client'

import { useState } from 'react'
import Link from 'next/link'
import RevealOnScroll, { RevealStagger } from '@/components/RevealOnScroll'
import PlaygroundSimulation from '@/components/PlaygroundSimulation'
import { getTraceForBundle } from '@/lib/demo-traces'

const bundles = [
  {
    id: 'documentation',
    name: 'Documentation',
    description: 'Reads your code, writes your docs. READMEs, API references, architecture guides.',
    author: 'Amplifier Team',
    category: 'official',
    tools: ['filesystem', 'web-search', 'grep'],
    config: `bundle:
  name: documentation
  version: 1.0.0

providers:
  - anthropic

tools:
  - filesystem
  - web-search
  - grep

behaviors:
  - technical-writing
  - structured-output`,
  },
  {
    id: 'code-reviewer',
    name: 'Code Reviewer',
    description: 'Security vulnerabilities, SOLID violations, best practice checks.',
    author: 'Amplifier Team',
    category: 'official',
    tools: ['filesystem', 'grep', 'ast-analysis'],
    config: `bundle:
  name: code-reviewer
  version: 1.0.0

providers:
  - anthropic

tools:
  - filesystem
  - grep
  - ast-analysis

behaviors:
  - security-focused
  - constructive-feedback`,
  },
  {
    id: 'developer',
    name: 'Developer',
    description: 'Write, test, debug. Full-stack development with filesystem and bash.',
    author: 'Amplifier Team',
    category: 'official',
    tools: ['filesystem', 'bash', 'grep', 'web-search'],
    config: `bundle:
  name: developer
  version: 1.0.0

providers:
  - anthropic

tools:
  - filesystem
  - bash
  - grep
  - web-search

behaviors:
  - implementation-focused
  - test-driven`,
  },
  {
    id: 'presentation',
    name: 'Presentation Creator',
    description: 'Creates presentations with research, visual suggestions, and speaker notes.',
    author: 'Amplifier Team',
    category: 'official',
    tools: ['filesystem', 'web-search'],
    config: `bundle:
  name: presentation
  version: 1.0.0

providers:
  - anthropic

tools:
  - filesystem
  - web-search

behaviors:
  - visual-thinking
  - narrative-structure`,
  },
]

// Placeholder community bundles - these would come from a real API
const communityBundles = [
  {
    id: 'design-intelligence',
    name: 'Design Intelligence',
    description: 'Design system architecture, component design, and visual strategy.',
    author: 'Community',
    category: 'community',
    tools: ['filesystem', 'web-search'],
  },
]

export default function ExplorePage() {
  const [selectedBundle, setSelectedBundle] = useState<typeof bundles[0] | null>(null)
  const [showDemo, setShowDemo] = useState(false)
  const [activeTab, setActiveTab] = useState<'demo' | 'config'>('demo')

  const handleTryBundle = (bundle: typeof bundles[0]) => {
    setSelectedBundle(bundle)
    setShowDemo(true)
    setActiveTab('demo')
  }

  const trace = selectedBundle ? getTraceForBundle(selectedBundle.id) : null

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="section gradient-radial">
        <div className="container-content">
          <RevealOnScroll>
            <h1 className="text-display text-ink max-w-3xl">
              Browse. Use. Customize.
            </h1>
          </RevealOnScroll>
          
          <RevealOnScroll delay={100}>
            <p className="mt-6 text-body-lg text-ink-slate max-w-2xl">
              Bundles built by the team and community. Pick one that fits, 
              customize it for your workflow, or build your own from scratch.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Main content */}
      <section className="section border-t border-canvas-mist">
        <div className="container-wide">
          <div className="grid lg:grid-cols-[350px_1fr] gap-12">
            {/* Sidebar - Bundle browser */}
            <div>
              <h2 className="text-heading text-ink mb-6">Official Bundles</h2>
              {/* Horizontal scroll on mobile, vertical list on desktop */}
              <div className="scroll-container lg:flex-col lg:overflow-visible lg:gap-3 lg:mx-0 lg:px-0">
                {bundles.map((bundle) => (
                  <button
                    key={bundle.id}
                    onClick={() => handleTryBundle(bundle)}
                    className={`scroll-card-wide lg:w-full lg:min-w-full p-4 text-left rounded-soft transition-all duration-300 ${
                      selectedBundle?.id === bundle.id
                        ? 'bg-signal-soft border-2 border-signal'
                        : 'bg-canvas-stone border-2 border-transparent hover:border-canvas-mist'
                    }`}
                  >
                    <span className={`block font-medium text-sm ${
                      selectedBundle?.id === bundle.id ? 'text-signal' : 'text-ink'
                    }`}>
                      {bundle.name}
                    </span>
                    <span className="block mt-1 text-ink-slate text-micro">
                      {bundle.description}
                    </span>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {bundle.tools.slice(0, 3).map((tool) => (
                        <span 
                          key={tool}
                          className="px-2 py-0.5 bg-canvas text-ink-fog text-micro rounded"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>

              {/* Community section */}
              <h2 className="text-heading text-ink mt-10 mb-6">Community</h2>
              <div className="space-y-3">
                {communityBundles.map((bundle) => (
                  <div
                    key={bundle.id}
                    className="w-full p-4 text-left rounded-soft bg-canvas-stone border-2 border-transparent"
                  >
                    <span className="block font-medium text-sm text-ink">
                      {bundle.name}
                    </span>
                    <span className="block mt-1 text-ink-slate text-micro">
                      {bundle.description}
                    </span>
                    <span className="block mt-2 text-ink-fog text-micro">
                      by {bundle.author}
                    </span>
                  </div>
                ))}
                <p className="text-ink-fog text-sm p-4">
                  More community bundles coming as the ecosystem grows.
                </p>
              </div>

              {/* Contribute CTA */}
              <div className="mt-10 p-6 bg-canvas-stone rounded-gentle">
                <h3 className="text-subheading text-ink">Share your bundle</h3>
                <p className="mt-2 text-ink-slate text-sm leading-relaxed">
                  Built something useful? Contribute it back. The ecosystem 
                  grows because people share.
                </p>
                <Link 
                  href="https://github.com/microsoft/amplifier/blob/main/CONTRIBUTING.md"
                  className="mt-4 inline-block text-signal text-sm font-medium link-underline"
                >
                  How to contribute →
                </Link>
              </div>
            </div>

            {/* Main area - Demo/Config */}
            <div>
              {selectedBundle ? (
                <div>
                  {/* Bundle header */}
                  <div className="mb-6">
                    <p className="text-micro font-medium text-ink-fog uppercase tracking-wider mb-2">Bundle</p>
                    <h2 className="text-title text-ink">{selectedBundle.name}</h2>
                    <p className="mt-2 text-ink-slate">{selectedBundle.description}</p>
                  </div>

                  {/* Tabs */}
                  <div className="flex gap-1 border-b border-canvas-mist mb-6">
                    <button
                      onClick={() => setActiveTab('demo')}
                      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === 'demo'
                          ? 'border-signal text-signal'
                          : 'border-transparent text-ink-slate hover:text-ink'
                      }`}
                    >
                      Watch it work
                    </button>
                    <button
                      onClick={() => setActiveTab('config')}
                      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === 'config'
                          ? 'border-signal text-signal'
                          : 'border-transparent text-ink-slate hover:text-ink'
                      }`}
                    >
                      View config
                    </button>
                  </div>

                  {/* Tab content */}
                  {activeTab === 'demo' ? (
                    <div>
                      {showDemo && trace ? (
                        <div>
                          <div className="mb-4 p-4 bg-canvas-stone rounded-soft">
                            <p className="text-micro font-medium text-ink-fog uppercase tracking-wider">
                              Recorded session
                            </p>
                            <p className="mt-1 text-ink-slate text-sm">
                              This is a real execution trace. Watch the agent think, 
                              use tools, and produce output.
                            </p>
                          </div>
                          <PlaygroundSimulation 
                            trace={trace} 
                            onComplete={() => {}}
                          />
                        </div>
                      ) : (
                        <div className="terminal min-h-[400px]">
                          <div className="terminal-header">
                            <div className="terminal-dots">
                              <div className="terminal-dot" />
                              <div className="terminal-dot" />
                              <div className="terminal-dot" />
                            </div>
                            <span className="terminal-label">Ready</span>
                          </div>
                          <div className="terminal-body flex items-center justify-center h-[350px]">
                            <div className="text-center">
                              <p className="text-ink-slate mb-4">
                                Select a bundle to see it in action
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="code-block">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-micro font-medium text-ink-fog uppercase tracking-wider">
                          Bundle Configuration
                        </span>
                        <span className="text-micro text-ink-fog">bundle.yaml</span>
                      </div>
                      <pre className="text-sm text-[#E8E8E6] whitespace-pre font-mono">
                        {selectedBundle.config}
                      </pre>
                      <p className="mt-6 text-ink-fog text-sm">
                        This is everything the bundle includes. Transparent, readable, 
                        customizable.
                      </p>
                    </div>
                  )}

                  {/* Try it yourself CTA */}
                  <div className="mt-8 p-6 bg-canvas-stone rounded-gentle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-subheading text-ink">Run it yourself</h3>
                      <p className="mt-1 text-ink-slate text-sm">
                        Install Amplifier and use this bundle on your own projects.
                      </p>
                    </div>
                    <Link href="/build" className="btn-primary flex-shrink-0">
                      Get started
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center min-h-[500px] bg-canvas-stone rounded-gentle">
                  <div className="text-center p-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-signal-soft flex items-center justify-center">
                      <svg className="w-8 h-8 text-signal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <h3 className="text-heading text-ink">Select a bundle</h3>
                    <p className="mt-2 text-ink-slate max-w-sm">
                      Choose a bundle from the sidebar to see how it works 
                      and view its configuration.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Built with Amplifier */}
      <section className="section border-t border-canvas-mist bg-canvas-stone">
        <div className="container-content">
          <RevealOnScroll>
            <p className="text-micro font-medium text-ink-fog uppercase tracking-wider mb-2">Showcase</p>
            <h2 className="text-title text-ink">Built with Amplifier</h2>
            <p className="mt-4 text-ink-slate max-w-2xl">
              Real projects using Amplifier. See what's possible.
            </p>
          </RevealOnScroll>

          <RevealStagger className="mt-12 grid md:grid-cols-2 gap-6">
            <div className="bg-canvas p-8 rounded-gentle border border-canvas-mist">
              <span className="text-micro font-medium text-ink-fog uppercase tracking-wider">
                Bundle
              </span>
              <h3 className="mt-3 text-heading text-ink">Design Intelligence</h3>
              <p className="mt-2 text-ink-slate text-sm leading-relaxed">
                A collection of design-focused agents for system architecture, 
                component design, animation choreography, and visual strategy.
              </p>
              <Link 
                href="https://github.com/microsoft/amplifier"
                className="mt-4 inline-block text-signal text-sm font-medium link-underline"
              >
                View on GitHub →
              </Link>
            </div>

            <div className="bg-canvas p-8 rounded-gentle border border-canvas-mist">
              <span className="text-micro font-medium text-ink-fog uppercase tracking-wider">
                Website
              </span>
              <h3 className="mt-3 text-heading text-ink">This site</h3>
              <p className="mt-2 text-ink-slate text-sm leading-relaxed">
                withamplifier.com was built with Amplifier bundles—content 
                strategy, code generation, design decisions all assisted by 
                the framework.
              </p>
              <Link 
                href="https://github.com/anderlpz/withamplifier"
                className="mt-4 inline-block text-signal text-sm font-medium link-underline"
              >
                View source →
              </Link>
            </div>
          </RevealStagger>

          <RevealOnScroll delay={200}>
            <p className="mt-12 text-center text-ink-slate">
              Built something with Amplifier?{' '}
              <Link 
                href="https://github.com/microsoft/amplifier/discussions"
                className="text-signal link-underline"
              >
                Share it with the community
              </Link>
            </p>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  )
}
