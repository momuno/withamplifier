import Link from 'next/link'
import RevealOnScroll, { RevealStagger } from '@/components/RevealOnScroll'

export default function BuildPage() {
  return (
    <div className="pt-16">
      {/* Hero - Direct to install */}
      <section className="section gradient-radial">
        <div className="container-reading">
          <RevealOnScroll>
            <h1 className="text-display text-ink">Get started</h1>
          </RevealOnScroll>
          
          <RevealOnScroll delay={100}>
            <p className="mt-4 text-body-lg text-ink-slate max-w-xl">
              Install Amplifier, add a provider, and run your first command.
            </p>
            <div className="mt-8">
              <code className="code-block block text-lg px-6 py-4">
                pip install amplifier
              </code>
              <p className="mt-4 text-ink-fog text-sm">
                Requires Python 3.10+
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Quick start */}
      <section className="section border-t border-canvas-mist">
        <div className="container-reading">
          <RevealOnScroll>
            <h2 className="text-title text-ink">Three steps. Under a minute.</h2>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <div className="mt-10 space-y-6">
              {/* Step 1 */}
              <div className="bg-canvas-stone p-6 rounded-gentle">
                <div className="flex items-center gap-4 mb-4">
                  <span className="w-10 h-10 rounded-full bg-ink text-canvas text-sm font-semibold flex items-center justify-center">
                    1
                  </span>
                  <span className="text-heading text-ink">Install</span>
                </div>
                <code className="code-block block">pip install amplifier</code>
              </div>

              {/* Step 2 */}
              <div className="bg-canvas-stone p-6 rounded-gentle">
                <div className="flex items-center gap-4 mb-4">
                  <span className="w-10 h-10 rounded-full bg-ink text-canvas text-sm font-semibold flex items-center justify-center">
                    2
                  </span>
                  <span className="text-heading text-ink">Add a provider</span>
                </div>
                <code className="code-block block">amplifier provider add anthropic</code>
                <p className="mt-4 text-ink-slate text-sm">
                  You'll need an API key from your provider. Amplifier supports 
                  Anthropic, OpenAI, Azure OpenAI, and Ollama for local models.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-canvas-stone p-6 rounded-gentle">
                <div className="flex items-center gap-4 mb-4">
                  <span className="w-10 h-10 rounded-full bg-ink text-canvas text-sm font-semibold flex items-center justify-center">
                    3
                  </span>
                  <span className="text-heading text-ink">Run</span>
                </div>
                <code className="code-block block">amplifier run "Document this codebase"</code>
                <p className="mt-4 text-ink-slate text-sm">
                  That's it. Amplifier uses the default bundle. Add <code className="text-signal">--bundle</code> to 
                  use a specific one.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Common commands */}
      <section className="section bg-canvas-stone">
        <div className="container-reading">
          <RevealOnScroll>
            <h2 className="text-title text-ink">Common commands</h2>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <div className="mt-10 space-y-4">
              <div className="bg-canvas p-5 rounded-gentle border border-canvas-mist">
                <code className="text-signal text-sm font-mono">amplifier run "your prompt"</code>
                <p className="mt-2 text-ink-slate text-sm">Run with default bundle</p>
              </div>

              <div className="bg-canvas p-5 rounded-gentle border border-canvas-mist">
                <code className="text-signal text-sm font-mono">amplifier run --bundle code-reviewer "Review this PR"</code>
                <p className="mt-2 text-ink-slate text-sm">Run with a specific bundle</p>
              </div>

              <div className="bg-canvas p-5 rounded-gentle border border-canvas-mist">
                <code className="text-signal text-sm font-mono">amplifier bundle list</code>
                <p className="mt-2 text-ink-slate text-sm">See available bundles</p>
              </div>

              <div className="bg-canvas p-5 rounded-gentle border border-canvas-mist">
                <code className="text-signal text-sm font-mono">amplifier provider list</code>
                <p className="mt-2 text-ink-slate text-sm">See configured providers</p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Providers */}
      <section className="section">
        <div className="container-content">
          <RevealOnScroll>
            <h2 className="text-title text-ink">Swap providers anytime</h2>
            <p className="mt-4 text-ink-slate max-w-2xl">
              Change your model without touching your bundles. Each provider is a plug.
            </p>
          </RevealOnScroll>

          <RevealStagger className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-canvas-stone p-6 rounded-gentle">
              <h3 className="text-heading text-ink">Anthropic</h3>
              <p className="mt-2 text-ink-slate text-sm">Claude Sonnet 4, Opus 4, Haiku</p>
              <code className="mt-4 block text-micro text-ink-fog font-mono">
                amplifier provider add anthropic
              </code>
            </div>

            <div className="bg-canvas-stone p-6 rounded-gentle">
              <h3 className="text-heading text-ink">OpenAI</h3>
              <p className="mt-2 text-ink-slate text-sm">GPT-4o, GPT-4 Turbo, o1</p>
              <code className="mt-4 block text-micro text-ink-fog font-mono">
                amplifier provider add openai
              </code>
            </div>

            <div className="bg-canvas-stone p-6 rounded-gentle">
              <h3 className="text-heading text-ink">Google Gemini</h3>
              <p className="mt-2 text-ink-slate text-sm">Gemini Pro, Gemini Flash</p>
              <code className="mt-4 block text-micro text-ink-fog font-mono">
                amplifier provider add gemini
              </code>
            </div>

            <div className="bg-canvas-stone p-6 rounded-gentle">
              <h3 className="text-heading text-ink">Azure OpenAI</h3>
              <p className="mt-2 text-ink-slate text-sm">Enterprise Azure deployments</p>
              <code className="mt-4 block text-micro text-ink-fog font-mono">
                amplifier provider add azure
              </code>
            </div>

            <div className="bg-canvas-stone p-6 rounded-gentle">
              <h3 className="text-heading text-ink">AWS Bedrock</h3>
              <p className="mt-2 text-ink-slate text-sm">Claude, Llama, Titan on AWS</p>
              <code className="mt-4 block text-micro text-ink-fog font-mono">
                amplifier provider add bedrock
              </code>
            </div>

            <div className="bg-canvas-stone p-6 rounded-gentle">
              <h3 className="text-heading text-ink">Ollama</h3>
              <p className="mt-2 text-ink-slate text-sm">Local models, fully private</p>
              <code className="mt-4 block text-micro text-ink-fog font-mono">
                amplifier provider add ollama
              </code>
            </div>
          </RevealStagger>
        </div>
      </section>

      {/* Coming soon: Forge */}
      <section className="section border-t border-canvas-mist bg-canvas-stone">
        <div className="container-reading">
          <RevealOnScroll>
            <span className="text-micro font-medium text-ink-fog uppercase tracking-wider">
              Coming soon
            </span>
            <h2 className="mt-4 text-title text-ink">Forge</h2>
            <p className="mt-4 text-ink-slate leading-relaxed">
              A visual interface for Amplifier. Workspace management, guided learning, 
              community bundle browser—all in a desktop application.
            </p>
            <p className="mt-4 text-ink-slate leading-relaxed">
              For now, the CLI is the way to use Amplifier. Forge is in development.
            </p>
            <div className="mt-8">
              <Link 
                href="https://github.com/microsoft/amplifier"
                className="btn-secondary"
              >
                Watch the repo for updates
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Documentation */}
      <section className="section">
        <div className="container-content text-center">
          <RevealOnScroll>
            <h2 className="text-title text-ink">Go deeper</h2>
            <p className="mt-4 text-ink-slate max-w-xl mx-auto">
              Full documentation, API reference, and examples.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://github.com/microsoft/amplifier"
                className="btn-primary"
              >
                Documentation
              </Link>
              <Link
                href="https://github.com/microsoft/amplifier/discussions"
                className="btn-secondary"
              >
                Ask a question
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  )
}
