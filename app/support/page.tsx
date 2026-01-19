'use client'

import Link from 'next/link'
import RevealOnScroll, { RevealStagger } from '@/components/RevealOnScroll'
import Accordion from '@/components/Accordion'

const faqItems = [
  {
    question: 'What providers does Amplifier support?',
    answer: 'Anthropic (Claude), OpenAI (GPT-4), Azure OpenAI, and local models via Ollama. The provider is swappable—change it without rewriting your bundles.'
  },
  {
    question: 'Is Amplifier free?',
    answer: 'Amplifier is open source and free. You pay only for the AI providers you use (like Claude or GPT-4 API costs).'
  },
  {
    question: 'What\'s the difference between Forge and CLI?',
    answer: 'Same capabilities, different interface. Forge is visual with guided learning and workspace management. CLI is terminal-based, scriptable, and fast. Choose what fits your workflow.'
  },
  {
    question: 'Can I create my own bundles?',
    answer: 'Yes. Bundles are YAML + markdown. Combine providers, tools, and behaviors to create capabilities specific to your work. Share them back to the community if you like.'
  },
  {
    question: 'How is this different from other AI tools?',
    answer: 'Most AI tools are monolithic—one interface, one capability. Amplifier is modular. Swap providers without rewriting. Add tools without permission. Build exactly what you need.'
  }
]

export default function SupportPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="section gradient-radial">
        <div className="container-content">
          <RevealOnScroll>
            <h1 className="text-display text-ink">Get help</h1>
          </RevealOnScroll>
          
          <RevealOnScroll delay={100}>
            <p className="mt-6 text-body-lg text-ink-slate max-w-2xl">
              Stuck on something? Find answers, connect with the community, 
              or reach out directly.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Help resources */}
      <section className="section border-t border-canvas-mist">
        <div className="container-content">
          <RevealStagger className="grid md:grid-cols-2 gap-6">
            <Link
              href="https://github.com/microsoft/amplifier/discussions"
              className="card group"
            >
              <h2 className="text-heading text-ink group-hover:text-signal transition-colors duration-300">
                Community Discussions
              </h2>
              <p className="mt-3 text-ink-slate">
                Ask questions, share ideas, connect with other builders. 
                The community is active and helpful.
              </p>
              <span className="mt-4 inline-block text-signal text-sm font-medium">
                Join the discussion →
              </span>
            </Link>

            <Link
              href="https://github.com/microsoft/amplifier/issues"
              className="card group"
            >
              <h2 className="text-heading text-ink group-hover:text-signal transition-colors duration-300">
                Bug Reports
              </h2>
              <p className="mt-3 text-ink-slate">
                Found something broken? Let us know. Good bug reports 
                help us improve Amplifier for everyone.
              </p>
              <span className="mt-4 inline-block text-signal text-sm font-medium">
                Report an issue →
              </span>
            </Link>

            <Link
              href="https://github.com/microsoft/amplifier"
              className="card group"
            >
              <h2 className="text-heading text-ink group-hover:text-signal transition-colors duration-300">
                Documentation
              </h2>
              <p className="mt-3 text-ink-slate">
                Guides, examples, and API reference. Everything you need 
                to understand and build with Amplifier.
              </p>
              <span className="mt-4 inline-block text-signal text-sm font-medium">
                Read the docs →
              </span>
            </Link>

            <Link
              href="https://github.com/microsoft/amplifier/blob/main/CONTRIBUTING.md"
              className="card group"
            >
              <h2 className="text-heading text-ink group-hover:text-signal transition-colors duration-300">
                Contributing
              </h2>
              <p className="mt-3 text-ink-slate">
                Help build Amplifier. Contribute bundles, tools, documentation, 
                or improvements to the core.
              </p>
              <span className="mt-4 inline-block text-signal text-sm font-medium">
                Get involved →
              </span>
            </Link>
          </RevealStagger>
        </div>
      </section>

      {/* FAQ - Apple-style accordion */}
      <section className="section bg-canvas-stone">
        <div className="container-reading">
          <RevealOnScroll>
            <h2 className="text-title text-ink">Frequently asked</h2>
          </RevealOnScroll>
          
          <RevealOnScroll delay={100}>
            <div className="mt-12">
              <Accordion items={faqItems} />
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Still stuck */}
      <section className="section">
        <div className="container-content text-center">
          <RevealOnScroll>
            <h2 className="text-title text-ink">Still stuck?</h2>
            <p className="mt-4 text-ink-slate max-w-xl mx-auto">
              Open an issue on GitHub or start a discussion. We're here to help.
            </p>
            <Link
              href="https://github.com/microsoft/amplifier/discussions/new"
              className="mt-8 btn-primary inline-flex"
            >
              Start a discussion
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  )
}
