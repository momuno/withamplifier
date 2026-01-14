'use client'

import { useState } from 'react'
import Link from 'next/link'
import PlaygroundSimulation from '@/components/PlaygroundSimulation'
import { getTraceForBundle } from '@/lib/demo-traces'

const bundles = [
  {
    id: 'documentation',
    name: 'Documentation',
    description: 'Creates comprehensive READMEs, API docs, and user guides.',
    defaultPrompt: 'Document the architecture of this codebase',
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
    description: 'Security analysis, SOLID principles, and best practices.',
    defaultPrompt: 'Review this code for security vulnerabilities',
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
    description: 'Full-stack development with code generation and testing.',
    defaultPrompt: 'Create a script that analyzes log files for errors',
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
    description: 'Creates presentations with research and visual suggestions.',
    defaultPrompt: 'Create a technical presentation on our architecture',
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

export default function PlaygroundPage() {
  const [selectedBundle, setSelectedBundle] = useState(bundles[0])
  const [prompt, setPrompt] = useState(bundles[0].defaultPrompt)
  const [showSimulation, setShowSimulation] = useState(false)
  const [activeTab, setActiveTab] = useState<'config' | 'simulation'>('simulation')

  const handleBundleChange = (bundle: typeof bundles[0]) => {
    setSelectedBundle(bundle)
    setPrompt(bundle.defaultPrompt)
    setShowSimulation(false)
    setActiveTab('simulation')
  }

  const handleRunClick = () => {
    setShowSimulation(true)
    setActiveTab('simulation')
  }

  const trace = getTraceForBundle(selectedBundle.id)

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="section-sm gradient-radial">
        <div className="container-content">
          <h1 className="text-display text-ink">Playground</h1>
          <p className="mt-4 text-body-lg text-ink-slate max-w-2xl">
            See how Amplifier works. Select a bundle, run it, and watch the agent think, 
            use tools, and generate output.
          </p>
        </div>
      </section>

      {/* Main playground area */}
      <section className="section border-t border-canvas-mist">
        <div className="container-wide">
          <div className="grid lg:grid-cols-[300px_1fr] gap-8">
            {/* Sidebar - Bundle selector */}
            <div className="space-y-4">
              <h2 className="text-heading text-ink">Select a bundle</h2>
              <div className="space-y-2">
                {bundles.map((bundle) => (
                  <button
                    key={bundle.id}
                    onClick={() => handleBundleChange(bundle)}
                    className={`w-full p-4 text-left rounded-soft transition-all duration-300 ${
                      selectedBundle.id === bundle.id
                        ? 'bg-signal-soft border-2 border-signal'
                        : 'bg-canvas-stone border-2 border-transparent hover:border-canvas-mist'
                    }`}
                  >
                    <span className={`block font-medium text-sm ${
                      selectedBundle.id === bundle.id ? 'text-signal' : 'text-ink'
                    }`}>
                      {bundle.name}
                    </span>
                    <span className="block mt-1 text-ink-slate text-micro">
                      {bundle.description}
                    </span>
                  </button>
                ))}
              </div>

              {/* What you're seeing */}
              <div className="mt-8 p-4 bg-canvas-stone rounded-soft">
                <h3 className="text-micro font-medium text-ink-fog uppercase tracking-wider">
                  What you're seeing
                </h3>
                <p className="mt-2 text-sm text-ink-slate leading-relaxed">
                  This is a simulation of real Amplifier execution traces. 
                  You're watching the same thinking and tool usage patterns 
                  that happen when you run Amplifier locally.
                </p>
              </div>
            </div>

            {/* Main content area */}
            <div className="space-y-6">
              {/* Prompt input */}
              <div>
                <label className="block text-sm font-medium text-ink mb-2">
                  Your prompt
                </label>
                <div className="flex gap-3">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="What would you like to do?"
                    rows={2}
                    className="flex-1 p-4 bg-canvas-stone border border-canvas-mist rounded-soft 
                               text-ink placeholder:text-ink-fog resize-none
                               focus:outline-none focus:border-signal transition-colors duration-300"
                  />
                  <button
                    onClick={handleRunClick}
                    className="btn-primary self-end"
                  >
                    Run Demo
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-1 border-b border-canvas-mist">
                <button
                  onClick={() => setActiveTab('simulation')}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'simulation'
                      ? 'border-signal text-signal'
                      : 'border-transparent text-ink-slate hover:text-ink'
                  }`}
                >
                  Execution
                </button>
                <button
                  onClick={() => setActiveTab('config')}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'config'
                      ? 'border-signal text-signal'
                      : 'border-transparent text-ink-slate hover:text-ink'
                  }`}
                >
                  Bundle Config
                </button>
              </div>

              {/* Tab content */}
              {activeTab === 'simulation' ? (
                <div>
                  {showSimulation && trace ? (
                    <PlaygroundSimulation 
                      trace={trace} 
                      onComplete={() => {
                        // Could add analytics or next action prompts here
                      }}
                    />
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
                          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-signal-soft flex items-center justify-center">
                            <svg className="w-8 h-8 text-signal" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                          <p className="text-ink-slate mb-2">Click "Run Demo" to see {selectedBundle.name} in action</p>
                          <p className="text-ink-fog text-sm">Watch the agent think, use tools, and generate output</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="code-block">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-micro font-medium text-ink-fog uppercase tracking-wider">
                      {selectedBundle.name} Configuration
                    </span>
                    <span className="text-micro text-ink-fog">bundle.yaml</span>
                  </div>
                  <pre className="text-sm text-[#E8E8E6] whitespace-pre font-mono">
                    {selectedBundle.config}
                  </pre>
                </div>
              )}

              {/* Call to action */}
              <div className="flex items-center justify-between p-6 bg-canvas-stone rounded-gentle">
                <div>
                  <h3 className="text-heading text-ink">Ready to try it yourself?</h3>
                  <p className="mt-1 text-ink-slate text-sm">
                    Install Amplifier and run real bundles on your own projects.
                  </p>
                </div>
                <Link
                  href="/build"
                  className="btn-primary"
                >
                  Get Started
                </Link>
              </div>

              {/* Learn more */}
              <div className="text-center pt-4">
                <Link
                  href="/start"
                  className="text-signal text-sm font-medium link-underline"
                >
                  Learn how Amplifier works →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
