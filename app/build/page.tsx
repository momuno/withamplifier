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
              Install Amplifier, connect any model, and run your first command. 
              Switch providers anytime—your agents come with you.
            </p>
            <div className="mt-8 space-y-3">
              <code className="code-block block text-base px-6 py-4">
                uv tool install git+https://github.com/microsoft/amplifier
              </code>
              <p className="mt-4 text-ink-fog text-sm">
                Requires <a href="https://docs.astral.sh/uv/" className="text-signal hover:underline" target="_blank" rel="noopener noreferrer">uv</a> and Python 3.10+
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
                <code className="code-block block text-sm">uv tool install git+https://github.com/microsoft/amplifier</code>
                <p className="mt-4 text-ink-slate text-sm">
                  Need uv? Run: <code className="text-signal">curl -LsSf https://astral.sh/uv/install.sh | sh</code>
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-canvas-stone p-6 rounded-gentle">
                <div className="flex items-center gap-4 mb-4">
                  <span className="w-10 h-10 rounded-full bg-ink text-canvas text-sm font-semibold flex items-center justify-center">
                    2
                  </span>
                  <span className="text-heading text-ink">Add a provider</span>
                </div>
                <code className="code-block block">amplifier provider use anthropic</code>
                <p className="mt-4 text-ink-slate text-sm">
                  You'll need an API key. Amplifier supports Claude, GPT-4, Gemini, 
                  Azure, AWS Bedrock, and local models via Ollama.
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

              <div className="bg-canvas p-5 rounded-gentle border border-canvas-mist">
                <code className="text-signal text-sm font-mono">amplifier provider use openai</code>
                <p className="mt-2 text-ink-slate text-sm">Switch to a different model</p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Providers - emphasize "any model" */}
      <section className="section">
        <div className="container-content">
          <RevealOnScroll>
            <h2 className="text-title text-ink">Use any model.</h2>
            <p className="mt-4 text-ink-slate max-w-2xl">
              Switch providers without changing anything else. Your bundles, tools, and 
              behaviors work with every model.
            </p>
          </RevealOnScroll>

          <RevealStagger className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-canvas-stone p-6 rounded-gentle">
              <h3 className="text-heading text-ink">Anthropic</h3>
              <p className="mt-2 text-ink-slate text-sm">Claude Sonnet 4, Opus 4, Haiku</p>
              <code className="mt-4 block text-micro text-ink-fog font-mono">
                amplifier provider use anthropic
              </code>
            </div>

            <div className="bg-canvas-stone p-6 rounded-gentle">
              <h3 className="text-heading text-ink">OpenAI</h3>
              <p className="mt-2 text-ink-slate text-sm">GPT-4o, GPT-4 Turbo, o1</p>
              <code className="mt-4 block text-micro text-ink-fog font-mono">
                amplifier provider use openai
              </code>
            </div>

            <div className="bg-canvas-stone p-6 rounded-gentle">
              <h3 className="text-heading text-ink">Google Gemini</h3>
              <p className="mt-2 text-ink-slate text-sm">Gemini Pro, Gemini Flash</p>
              <code className="mt-4 block text-micro text-ink-fog font-mono">
                amplifier provider use gemini
              </code>
            </div>

            <div className="bg-canvas-stone p-6 rounded-gentle">
              <h3 className="text-heading text-ink">Azure OpenAI</h3>
              <p className="mt-2 text-ink-slate text-sm">Enterprise Azure deployments</p>
              <code className="mt-4 block text-micro text-ink-fog font-mono">
                amplifier provider use azure
              </code>
            </div>

            <div className="bg-canvas-stone p-6 rounded-gentle">
              <h3 className="text-heading text-ink">AWS Bedrock</h3>
              <p className="mt-2 text-ink-slate text-sm">Claude, Llama, Titan on AWS</p>
              <code className="mt-4 block text-micro text-ink-fog font-mono">
                amplifier provider use bedrock
              </code>
            </div>

            <div className="bg-canvas-stone p-6 rounded-gentle">
              <h3 className="text-heading text-ink">Ollama</h3>
              <p className="mt-2 text-ink-slate text-sm">Local models, fully private</p>
              <code className="mt-4 block text-micro text-ink-fog font-mono">
                amplifier provider use ollama
              </code>
            </div>
          </RevealStagger>
        </div>
      </section>

      {/* Platform components - NEW */}
      <section className="section border-t border-canvas-mist bg-canvas-stone">
        <div className="container-content">
          <RevealOnScroll>
            <h2 className="text-title text-ink">Build with the full platform.</h2>
            <p className="mt-4 text-ink-slate max-w-2xl">
              Amplifier is more than bundles. Combine providers, tools, agents, 
              behaviors, and recipes to build exactly what you need.
            </p>
          </RevealOnScroll>

          <RevealStagger className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-canvas p-6 rounded-gentle border border-canvas-mist">
              <div className="w-10 h-10 rounded-lg bg-signal-soft flex items-center justify-center mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-signal">
                  <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"></path>
                </svg>
              </div>
              <h3 className="text-heading text-ink">Tools</h3>
              <p className="mt-2 text-ink-slate text-sm leading-relaxed">
                Give your agent capabilities. File access, bash, web search, grep, 
                or build your own custom tools.
              </p>
              <code className="mt-4 block text-micro text-ink-fog font-mono">
                tools: [filesystem, bash, grep]
              </code>
            </div>

            <div className="bg-canvas p-6 rounded-gentle border border-canvas-mist">
              <div className="w-10 h-10 rounded-lg bg-signal-soft flex items-center justify-center mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-signal">
                  <circle cx="5" cy="6" r="2"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                  <circle cx="19" cy="6" r="2"></circle>
                  <circle cx="12" cy="18" r="2"></circle>
                  <path d="M6.5 7.5L10.5 10.5"></path>
                  <path d="M17.5 7.5L13.5 10.5"></path>
                  <path d="M12 14v2"></path>
                </svg>
              </div>
              <h3 className="text-heading text-ink">Behaviors</h3>
              <p className="mt-2 text-ink-slate text-sm leading-relaxed">
                Reusable instruction sets. Security-focused, test-driven, 
                structured-output. Compose them freely.
              </p>
              <code className="mt-4 block text-micro text-ink-fog font-mono">
                behaviors: [security-focused]
              </code>
            </div>

            <div className="bg-canvas p-6 rounded-gentle border border-canvas-mist">
              <div className="w-10 h-10 rounded-lg bg-signal-soft flex items-center justify-center mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-signal">
                  <circle cx="12" cy="8" r="5"></circle>
                  <path d="M20 21a8 8 0 00-16 0"></path>
                </svg>
              </div>
              <h3 className="text-heading text-ink">Agents</h3>
              <p className="mt-2 text-ink-slate text-sm leading-relaxed">
                Specialized personas. Explorers, architects, reviewers, analysts. 
                Each tuned for specific tasks.
              </p>
              <code className="mt-4 block text-micro text-ink-fog font-mono">
                agents: [explorer, zen-architect]
              </code>
            </div>

            <div className="bg-canvas p-6 rounded-gentle border border-canvas-mist">
              <div className="w-10 h-10 rounded-lg bg-signal-soft flex items-center justify-center mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-signal">
                  <path d="M4 19.5v-15A2.5 2.5 0 016.5 2H20v20H6.5a2.5 2.5 0 010-5H20"></path>
                  <path d="M8 7h6"></path>
                  <path d="M8 11h8"></path>
                </svg>
              </div>
              <h3 className="text-heading text-ink">Recipes</h3>
              <p className="mt-2 text-ink-slate text-sm leading-relaxed">
                Multi-step workflows. Chain agents, add approval gates, 
                resume after interruption.
              </p>
              <code className="mt-4 block text-micro text-ink-fog font-mono">
                amplifier recipe run deploy-review
              </code>
            </div>

            <div className="bg-canvas p-6 rounded-gentle border border-canvas-mist">
              <div className="w-10 h-10 rounded-lg bg-signal-soft flex items-center justify-center mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-signal">
                  <path d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3z"></path>
                  <path d="M12 12L20 7.5"></path>
                  <path d="M12 12V21"></path>
                  <path d="M12 12L4 7.5"></path>
                </svg>
              </div>
              <h3 className="text-heading text-ink">Bundles</h3>
              <p className="mt-2 text-ink-slate text-sm leading-relaxed">
                Package everything together. One file that captures your 
                entire agent configuration.
              </p>
              <code className="mt-4 block text-micro text-ink-fog font-mono">
                amplifier run --bundle security
              </code>
            </div>

            <div className="bg-canvas p-6 rounded-gentle border border-canvas-mist">
              <div className="w-10 h-10 rounded-lg bg-signal-soft flex items-center justify-center mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-signal">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </div>
              <h3 className="text-heading text-ink">Hooks</h3>
              <p className="mt-2 text-ink-slate text-sm leading-relaxed">
                Observe and extend. Logging, approval gates, redaction, 
                notifications. Full visibility.
              </p>
              <code className="mt-4 block text-micro text-ink-fog font-mono">
                hooks: [logging, approval]
              </code>
            </div>
          </RevealStagger>
        </div>
      </section>

      {/* Coming soon: Forge */}
      <section className="section border-t border-canvas-mist">
        <div className="container-reading">
          <RevealOnScroll>
            <span className="text-micro font-medium text-ink-fog uppercase tracking-wider">
              Coming soon
            </span>
            <h2 className="mt-4 text-title text-ink">Forge</h2>
            <p className="mt-4 text-ink-slate leading-relaxed">
              A visual interface for Amplifier. Workspace management, guided learning, 
              community bundle browser. All in a desktop application.
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
      <section className="section bg-canvas-stone">
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
