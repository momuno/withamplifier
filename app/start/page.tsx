import Link from 'next/link'
import RevealOnScroll, { RevealStagger } from '@/components/RevealOnScroll'

export default function StartPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="section gradient-radial">
        <div className="container-reading">
          <RevealOnScroll>
            <h1 className="text-display text-ink">Start here</h1>
          </RevealOnScroll>
          
          <RevealOnScroll delay={100}>
            <p className="mt-6 text-body-lg text-ink-slate">
              Everything you need to understand Amplifier and find your way in.
            </p>
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
            <div className="mt-8 space-y-6">
              <p className="text-body-lg text-ink-slate leading-relaxed">
                Amplifier is an AI agent framework built on the Linux kernel philosophy: 
                a tiny, stable core with everything else as swappable modules.
              </p>
              <p className="text-body-lg text-ink-slate leading-relaxed">
                <strong className="text-ink">Bundles</strong> combine providers (like Claude or GPT), 
                tools (like filesystem or web search), and behaviors into reusable packages. 
                Each bundle is a capability you can use, customize, or build upon.
              </p>
              <p className="text-body-lg text-ink-slate leading-relaxed">
                The result: your ideas become working capabilities. Your expertise becomes 
                something others can use.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Core concepts */}
      <section className="section bg-canvas-stone">
        <div className="container-content">
          <RevealOnScroll>
            <h2 className="text-title text-ink mb-12">Core concepts</h2>
          </RevealOnScroll>

          <RevealStagger className="grid md:grid-cols-2 gap-6">
            <div className="bg-canvas p-8 rounded-gentle border border-canvas-mist">
              <h3 className="text-heading text-ink">Bundles</h3>
              <p className="mt-3 text-ink-slate leading-relaxed">
                Composable packages that combine everything needed for a capability. 
                A Documentation bundle includes the right provider, tools for file access, 
                and behaviors for technical writing.
              </p>
            </div>

            <div className="bg-canvas p-8 rounded-gentle border border-canvas-mist">
              <h3 className="text-heading text-ink">Providers</h3>
              <p className="mt-3 text-ink-slate leading-relaxed">
                The AI models that power your bundles. Swap between Claude, GPT, 
                local models—without changing your bundle's behavior.
              </p>
            </div>

            <div className="bg-canvas p-8 rounded-gentle border border-canvas-mist">
              <h3 className="text-heading text-ink">Tools</h3>
              <p className="mt-3 text-ink-slate leading-relaxed">
                Capabilities the AI can use: read files, search the web, run commands, 
                analyze code. Mix and match for your use case.
              </p>
            </div>

            <div className="bg-canvas p-8 rounded-gentle border border-canvas-mist">
              <h3 className="text-heading text-ink">Agents</h3>
              <p className="mt-3 text-ink-slate leading-relaxed">
                Specialized bundles with a persona. The Code Reviewer agent, the 
                Documentation agent—each tuned for specific work.
              </p>
            </div>
          </RevealStagger>
        </div>
      </section>

      {/* The philosophy */}
      <section className="section">
        <div className="container-reading">
          <RevealOnScroll>
            <h2 className="text-title text-ink">The philosophy</h2>
          </RevealOnScroll>
          
          <RevealOnScroll delay={100}>
            <div className="mt-8 space-y-8">
              <div>
                <h3 className="text-heading text-ink">Modular by design</h3>
                <p className="mt-3 text-ink-slate leading-relaxed">
                  Every piece is swappable. Change your AI provider without rewriting 
                  your bundles. Add tools without permission. Remove what you don't need.
                </p>
              </div>

              <div>
                <h3 className="text-heading text-ink">Transparent, not magic</h3>
                <p className="mt-3 text-ink-slate leading-relaxed">
                  Every bundle shows its configuration. You see exactly what it includes, 
                  how it works, and how to change it. No black boxes.
                </p>
              </div>

              <div>
                <h3 className="text-heading text-ink">Your expertise, amplified</h3>
                <p className="mt-3 text-ink-slate leading-relaxed">
                  Amplifier doesn't replace what you know—it makes it more powerful. 
                  Your design sensibility, your engineering patterns, your domain 
                  knowledge become capabilities that scale.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Next steps */}
      <section className="section border-t border-canvas-mist bg-canvas-stone">
        <div className="container-content">
          <RevealOnScroll>
            <h2 className="text-title text-ink mb-12">Where to next?</h2>
          </RevealOnScroll>

          <RevealStagger className="grid md:grid-cols-2 gap-6">
            <Link href="/explore" className="card group">
              <h3 className="text-heading text-ink group-hover:text-signal transition-colors duration-300">
                Explore
              </h3>
              <p className="mt-3 text-ink-slate">
                Try bundles in the playground. See what's possible before committing 
                to anything.
              </p>
              <span className="mt-4 inline-block text-signal text-sm font-medium">
                Open playground →
              </span>
            </Link>

            <Link href="/build" className="card group">
              <h3 className="text-heading text-ink group-hover:text-signal transition-colors duration-300">
                Build
              </h3>
              <p className="mt-3 text-ink-slate">
                Install Forge or CLI. Start creating with Amplifier.
              </p>
              <span className="mt-4 inline-block text-signal text-sm font-medium">
                Get started →
              </span>
            </Link>
          </RevealStagger>
        </div>
      </section>
    </div>
  )
}
