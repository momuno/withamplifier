import Link from 'next/link'
import RevealOnScroll, { RevealStagger } from '@/components/RevealOnScroll'

export default function Home() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative section-lg gradient-radial">
        <div className="container-content text-center">
          <RevealOnScroll>
            <h1 className="text-hero text-ink max-w-4xl mx-auto">
              Your ideas, amplified.
            </h1>
          </RevealOnScroll>
          
          <RevealOnScroll delay={100}>
            <p className="mt-8 text-body-lg text-ink-slate max-w-2xl mx-auto leading-relaxed">
              Turn your expertise into working capabilities. Start with powerful bundles 
              that do real work. Customize them. Create your own. Share them back.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/explore" className="btn-primary">
                See what's possible
              </Link>
              <Link href="/start" className="btn-secondary">
                Start here
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* What is Amplifier */}
      <section className="section border-t border-canvas-mist">
        <div className="container-reading">
          <RevealOnScroll>
            <h2 className="text-title text-ink">What is Amplifier?</h2>
          </RevealOnScroll>
          
          <RevealOnScroll delay={100}>
            <p className="mt-6 text-body-lg text-ink-slate leading-relaxed">
              Amplifier turns your ideas into working capabilities. Bundles combine 
              AI providers, tools, and behaviors into reusable packages that do real 
              work—review code, create documentation, build presentations.
            </p>
          </RevealOnScroll>
          
          <RevealOnScroll delay={150}>
            <p className="mt-4 text-body-lg text-ink-slate leading-relaxed">
              Use what exists. Customize what you need. Build what doesn't exist yet. 
              Share it back.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Entry Paths */}
      <section className="section bg-canvas-stone">
        <div className="container-content">
          <RevealOnScroll>
            <h2 className="text-title text-ink mb-12">Find your path</h2>
          </RevealOnScroll>
          
          <RevealStagger className="grid md:grid-cols-2 gap-6">
            <Link href="/designing" className="card group">
              <h3 className="text-heading text-ink group-hover:text-signal transition-colors duration-300">
                I'm a designer
              </h3>
              <p className="mt-3 text-ink-slate">
                Turn design thinking into working tools. Create presentations, 
                document systems, analyze content.
              </p>
              <span className="mt-4 inline-block text-signal text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                designing.withamplifier.com →
              </span>
            </Link>

            <Link href="/engineering" className="card group">
              <h3 className="text-heading text-ink group-hover:text-signal transition-colors duration-300">
                I'm an engineer
              </h3>
              <p className="mt-3 text-ink-slate">
                Build with modular components. Swap providers, add tools, 
                compose capabilities.
              </p>
              <span className="mt-4 inline-block text-signal text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                engineering.withamplifier.com →
              </span>
            </Link>

            <Link href="/automating" className="card group">
              <h3 className="text-heading text-ink group-hover:text-signal transition-colors duration-300">
                I'm automating workflows
              </h3>
              <p className="mt-3 text-ink-slate">
                Create repeatable recipes. Chain agents, add approval gates, 
                run complex workflows.
              </p>
              <span className="mt-4 inline-block text-signal text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                automating.withamplifier.com →
              </span>
            </Link>

            <Link href="/start" className="card group">
              <h3 className="text-heading text-ink group-hover:text-signal transition-colors duration-300">
                I'm curious
              </h3>
              <p className="mt-3 text-ink-slate">
                Start here. See what Amplifier does and decide where you fit.
              </p>
              <span className="mt-4 inline-block text-signal text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Learn more →
              </span>
            </Link>
          </RevealStagger>
        </div>
      </section>

      {/* Quick actions */}
      <section className="section">
        <div className="container-content">
          <RevealStagger className="grid md:grid-cols-3 gap-8 text-center">
            <div className="py-8">
              <h3 className="text-subheading text-ink">Try it now</h3>
              <p className="mt-3 text-ink-slate text-sm">
                See bundles work in the playground
              </p>
              <Link 
                href="/explore" 
                className="mt-4 inline-block text-signal text-sm font-medium link-underline"
              >
                Open playground
              </Link>
            </div>

            <div className="py-8 border-l border-r border-canvas-mist">
              <h3 className="text-subheading text-ink">Install CLI</h3>
              <p className="mt-3 text-ink-slate text-sm">
                Get started in your terminal
              </p>
              <code className="mt-4 inline-block code-block text-sm px-4 py-2">
                pip install amplifier
              </code>
            </div>

            <div className="py-8">
              <h3 className="text-subheading text-ink">Get Forge</h3>
              <p className="mt-3 text-ink-slate text-sm">
                Visual interface with guided learning
              </p>
              <Link 
                href="/build" 
                className="mt-4 inline-block text-signal text-sm font-medium link-underline"
              >
                Download Forge
              </Link>
            </div>
          </RevealStagger>
        </div>
      </section>

      {/* Showcase teaser */}
      <section className="section border-t border-canvas-mist">
        <div className="container-content">
          <RevealOnScroll>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-title text-ink">Built with Amplifier</h2>
              <p className="mt-4 text-ink-slate">
                Real projects from the team and community.
              </p>
            </div>
          </RevealOnScroll>
          
          <RevealStagger className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="card">
              <span className="text-micro font-medium text-ink-fog uppercase tracking-wider">
                Application
              </span>
              <h3 className="mt-3 text-heading text-ink">Forge</h3>
              <p className="mt-2 text-ink-slate text-sm">
                Visual interface for Amplifier. Workspace management, 
                guided learning, community browser.
              </p>
            </div>

            <div className="card">
              <span className="text-micro font-medium text-ink-fog uppercase tracking-wider">
                Bundle
              </span>
              <h3 className="mt-3 text-heading text-ink">Design Intelligence</h3>
              <p className="mt-2 text-ink-slate text-sm">
                Design system architecture, component design, and 
                visual strategy capabilities.
              </p>
            </div>

            <div className="card">
              <span className="text-micro font-medium text-ink-fog uppercase tracking-wider">
                Site
              </span>
              <h3 className="mt-3 text-heading text-ink">This site</h3>
              <p className="mt-2 text-ink-slate text-sm">
                withamplifier.com was designed and built with 
                Amplifier's design-intelligence bundle.
              </p>
            </div>
          </RevealStagger>

          <RevealOnScroll delay={300}>
            <div className="mt-12 text-center">
              <Link href="/explore" className="link-signal link-underline">
                Explore more examples
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  )
}
