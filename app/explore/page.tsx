import Link from 'next/link'
import RevealOnScroll, { RevealStagger } from '@/components/RevealOnScroll'

const bundles = [
  {
    id: 'documentation',
    name: 'Documentation',
    description: 'Creates comprehensive READMEs, API docs, and user guides with filesystem and web research capabilities.',
    suggestedPrompt: 'Document the architecture and design patterns in this codebase',
    features: ['Filesystem', 'Web research', 'README generation'],
  },
  {
    id: 'code-reviewer',
    name: 'Code Reviewer',
    description: 'Security vulnerability detection, SOLID analysis, and best practices validation.',
    suggestedPrompt: 'Review this codebase for security vulnerabilities',
    features: ['Security detection', 'Best practices', 'SOLID analysis'],
  },
  {
    id: 'developer',
    name: 'Developer',
    description: 'Full-stack development capabilities for building, testing, and debugging code.',
    suggestedPrompt: 'Create a Python script that analyzes log files for errors',
    features: ['Read/write', 'Bash execution', 'Code search'],
  },
  {
    id: 'presentation',
    name: 'Presentation Creator',
    description: 'Creates presentation content with research, visual suggestions, and speaker notes.',
    suggestedPrompt: 'Create a technical deep-dive presentation on our system architecture',
    features: ['Research', 'Visual suggestions', 'Speaker notes'],
  },
]

export default function ExplorePage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="section gradient-radial">
        <div className="container-content">
          <RevealOnScroll>
            <h1 className="text-display text-ink max-w-3xl">
              See what's possible
            </h1>
          </RevealOnScroll>
          
          <RevealOnScroll delay={100}>
            <p className="mt-6 text-body-lg text-ink-slate max-w-2xl">
              These aren't demos. They're real bundles doing real work. 
              Pick one, give it a task, see what happens.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Playground intro */}
      <section className="section border-t border-canvas-mist bg-canvas-stone">
        <div className="container-content">
          <RevealOnScroll>
            <div className="max-w-3xl">
              <span className="text-micro font-medium text-signal uppercase tracking-wider">
                Interactive
              </span>
              <h2 className="mt-4 text-title text-ink">The Playground</h2>
              <p className="mt-4 text-ink-slate leading-relaxed">
                Each bundle exposes its configuration. You see exactly what it includes—providers, 
                tools, behaviors. No black box. Understand how it works, then customize it for 
                your needs.
              </p>
              <Link
                href="/playground"
                className="mt-8 btn-primary inline-flex"
              >
                Open interactive playground
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Bundle cards */}
      <section className="section">
        <div className="container-content">
          <RevealOnScroll>
            <h2 className="text-title text-ink mb-4">Available Bundles</h2>
            <p className="text-ink-slate max-w-2xl mb-12">
              Start with these. Each is a complete capability you can use immediately 
              or customize for your specific work.
            </p>
          </RevealOnScroll>

          <RevealStagger className="grid md:grid-cols-2 gap-8">
            {bundles.map((bundle) => (
              <div key={bundle.id} className="card">
                <h3 className="text-heading text-ink">{bundle.name}</h3>
                <p className="mt-3 text-ink-slate text-sm leading-relaxed">
                  {bundle.description}
                </p>
                
                <div className="mt-6 pt-6 border-t border-canvas-mist">
                  <p className="text-micro font-medium text-ink-fog uppercase tracking-wider">
                    Try this
                  </p>
                  <p className="mt-2 text-ink-slate text-sm italic">
                    "{bundle.suggestedPrompt}"
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {bundle.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 bg-canvas-stone text-ink-slate text-micro rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* Showcase */}
      <section className="section border-t border-canvas-mist bg-canvas-stone">
        <div className="container-content">
          <RevealOnScroll>
            <h2 className="text-title text-ink">Made with Amplifier</h2>
            <p className="mt-4 text-ink-slate max-w-2xl">
              Real projects built by the team and community. Every example 
              shows what's possible when your ideas become capabilities.
            </p>
          </RevealOnScroll>

          <RevealStagger className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-canvas p-8 rounded-gentle border border-canvas-mist">
              <span className="text-micro font-medium text-ink-fog uppercase tracking-wider">
                Application
              </span>
              <h3 className="mt-3 text-heading text-ink">Forge</h3>
              <p className="mt-2 text-ink-slate text-sm">
                Visual interface for Amplifier
              </p>
            </div>

            <div className="bg-canvas p-8 rounded-gentle border border-canvas-mist">
              <span className="text-micro font-medium text-ink-fog uppercase tracking-wider">
                Bundle
              </span>
              <h3 className="mt-3 text-heading text-ink">Design Intelligence</h3>
              <p className="mt-2 text-ink-slate text-sm">
                Design system capabilities
              </p>
            </div>

            <div className="bg-canvas p-8 rounded-gentle border border-canvas-mist">
              <span className="text-micro font-medium text-ink-fog uppercase tracking-wider">
                Site
              </span>
              <h3 className="mt-3 text-heading text-ink">This website</h3>
              <p className="mt-2 text-ink-slate text-sm">
                Built with Amplifier
              </p>
            </div>
          </RevealStagger>
        </div>
      </section>
    </div>
  )
}
