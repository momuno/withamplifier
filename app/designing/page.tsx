import Link from 'next/link'
import RevealOnScroll, { RevealStagger } from '@/components/RevealOnScroll'

// This demonstrates the subdomain strategy
// In production: designing.withamplifier.com
// Same structure, different lens

const bundles = [
  {
    id: 'presentation',
    name: 'Presentation Creator',
    description: 'Creates presentation content with research, visual suggestions, and speaker notes.',
    suggestedPrompt: 'Create a presentation on our new design system for stakeholders',
    features: ['Research', 'Visual suggestions', 'Speaker notes'],
  },
  {
    id: 'documentation',
    name: 'Documentation',
    description: 'Creates comprehensive documentation with clear structure and visual hierarchy.',
    suggestedPrompt: 'Document the design tokens and component library',
    features: ['Structure', 'Hierarchy', 'Examples'],
  },
  {
    id: 'design-intelligence',
    name: 'Design Intelligence',
    description: 'Design system architecture, component design, and visual strategy.',
    suggestedPrompt: 'Review this component for accessibility and design quality',
    features: ['Accessibility', 'Quality checks', 'Patterns'],
  },
]

export default function DesigningPage() {
  return (
    <div className="pt-16">
      {/* Hero - Designer focused */}
      <section className="section-lg gradient-radial">
        <div className="container-content text-center">
          <RevealOnScroll>
            <span className="text-micro font-medium text-signal uppercase tracking-wider">
              designing.withamplifier.com
            </span>
          </RevealOnScroll>
          
          <RevealOnScroll delay={100}>
            <h1 className="mt-6 text-hero text-ink max-w-4xl mx-auto">
              Design ideas, made real.
            </h1>
          </RevealOnScroll>
          
          <RevealOnScroll delay={200}>
            <p className="mt-8 text-body-lg text-ink-slate max-w-2xl mx-auto">
              Turn design thinking into working capabilities. Create presentations, 
              document systems, analyze components—your design sensibility, amplified.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={300}>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#bundles" className="btn-primary">
                See design bundles
              </Link>
              <Link href="/start" className="btn-secondary">
                How it works
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* What designers can do */}
      <section className="section border-t border-canvas-mist">
        <div className="container-content">
          <RevealOnScroll>
            <h2 className="text-title text-ink">What you can build</h2>
            <p className="mt-4 text-ink-slate max-w-2xl">
              Your design expertise becomes capabilities others can use. 
              Not just tools—extensions of how you think.
            </p>
          </RevealOnScroll>
          
          <RevealStagger className="mt-12 grid md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-heading text-ink">Presentation generators</h3>
              <p className="mt-3 text-ink-slate">
                Create bundles that generate decks from research, with visual 
                suggestions and speaker notes that reflect your style.
              </p>
            </div>

            <div className="card">
              <h3 className="text-heading text-ink">Design documentation</h3>
              <p className="mt-3 text-ink-slate">
                Document design systems, component libraries, and brand guidelines 
                automatically—with the structure you'd create by hand.
              </p>
            </div>

            <div className="card">
              <h3 className="text-heading text-ink">Design review agents</h3>
              <p className="mt-3 text-ink-slate">
                Create agents that check designs for accessibility, consistency, 
                and quality—applying your standards at scale.
              </p>
            </div>

            <div className="card">
              <h3 className="text-heading text-ink">Content analysis</h3>
              <p className="mt-3 text-ink-slate">
                Analyze content structure, tone, and visual hierarchy across 
                your projects. Your eye, everywhere.
              </p>
            </div>
          </RevealStagger>
        </div>
      </section>

      {/* Design bundles */}
      <section id="bundles" className="section bg-canvas-stone">
        <div className="container-content">
          <RevealOnScroll>
            <h2 className="text-title text-ink">Design-focused bundles</h2>
            <p className="mt-4 text-ink-slate max-w-2xl">
              Ready to use. Each tuned for design work.
            </p>
          </RevealOnScroll>

          <RevealStagger className="mt-12 grid md:grid-cols-3 gap-6">
            {bundles.map((bundle) => (
              <div key={bundle.id} className="bg-canvas p-8 rounded-gentle border border-canvas-mist">
                <h3 className="text-heading text-ink">{bundle.name}</h3>
                <p className="mt-3 text-ink-slate text-sm leading-relaxed">
                  {bundle.description}
                </p>
                
                <p className="mt-6 text-micro text-ink-fog italic">
                  "{bundle.suggestedPrompt}"
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {bundle.features.map((f) => (
                    <span 
                      key={f} 
                      className="px-3 py-1 bg-canvas-stone text-ink-slate text-micro rounded-full"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </RevealStagger>

          <RevealOnScroll delay={300}>
            <div className="mt-12 text-center">
              <Link href="/explore" className="link-signal link-underline">
                See all bundles
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* The philosophy for designers */}
      <section className="section">
        <div className="container-reading">
          <RevealOnScroll>
            <h2 className="text-title text-ink">Why this matters for designers</h2>
          </RevealOnScroll>
          
          <RevealOnScroll delay={100}>
            <div className="mt-8 space-y-8">
              <div>
                <h3 className="text-heading text-ink">Your sensibility scales</h3>
                <p className="mt-3 text-ink-slate leading-relaxed">
                  The decisions you make—about hierarchy, about rhythm, about what 
                  feels right—become encoded in bundles others can use. Your eye 
                  doesn't stay in your head. It becomes capability.
                </p>
              </div>

              <div>
                <h3 className="text-heading text-ink">Design tools, not templates</h3>
                <p className="mt-3 text-ink-slate leading-relaxed">
                  Templates give you a starting point. Bundles give you a capability. 
                  A presentation bundle doesn't just format slides—it researches, 
                  suggests visuals, structures narrative. It thinks the way you think.
                </p>
              </div>

              <div>
                <h3 className="text-heading text-ink">Transparent and customizable</h3>
                <p className="mt-3 text-ink-slate leading-relaxed">
                  Every bundle shows its configuration. You see how it works, 
                  why it makes the choices it makes, and how to change them. 
                  No black boxes. No mystery.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Get started */}
      <section className="section border-t border-canvas-mist bg-canvas-stone">
        <div className="container-content">
          <RevealOnScroll>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-title text-ink">Start building</h2>
              <p className="mt-4 text-ink-slate">
                Get Forge for a visual workspace, or the CLI if you prefer the terminal.
              </p>
            </div>
          </RevealOnScroll>

          <RevealStagger className="mt-12 grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="bg-canvas p-8 rounded-gentle border border-canvas-mist">
              <h3 className="text-heading text-ink">Forge</h3>
              <p className="mt-3 text-ink-slate text-sm">
                Visual interface with workspace management, guided learning, 
                and community browser.
              </p>
              <Link href="/build" className="mt-6 btn-primary inline-flex">
                Download Forge
              </Link>
            </div>

            <div className="bg-canvas p-8 rounded-gentle border border-canvas-mist">
              <h3 className="text-heading text-ink">CLI</h3>
              <p className="mt-3 text-ink-slate text-sm">
                Terminal interface. Scriptable, fast, full capabilities.
              </p>
              <code className="mt-6 code-block block text-sm">
                pip install amplifier
              </code>
            </div>
          </RevealStagger>
        </div>
      </section>
    </div>
  )
}
