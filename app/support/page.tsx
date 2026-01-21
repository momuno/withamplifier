'use client'

import Link from 'next/link'
import RevealOnScroll, { RevealStagger } from '@/components/RevealOnScroll'
import Accordion from '@/components/Accordion'

const faqItems = [
  {
    question: 'What makes Amplifier different from other AI tools?',
    answer: 'Three things. First, it works with any model. Claude, GPT-4, Gemini, Llama, or your own. Switch with one line. Second, you see everything. Every prompt, every decision, every tool call is visible and logged. Third, you own your setup. Your agent is a file you can read, version, and share. No lock-in.'
  },
  {
    question: 'What models does Amplifier support?',
    answer: 'Anthropic (Claude Sonnet 4, Opus 4, Haiku), OpenAI (GPT-4o, GPT-4 Turbo, o1), Google (Gemini Pro, Flash), Azure OpenAI, AWS Bedrock, and local models via Ollama. The provider is swappable. Change it without touching your bundles, tools, or behaviors.'
  },
  {
    question: 'Is Amplifier free?',
    answer: 'Amplifier is open source and free to use. You pay only for the AI providers you choose (like Claude or GPT-4 API costs). Run locally with Ollama for completely free usage.'
  },
  {
    question: 'What can I build with Amplifier?',
    answer: 'Anything that benefits from AI agents. Code reviewers, documentation generators, data analysts, research assistants, deployment pipelines, security auditors. The platform gives you providers (any model), tools (any capability), agents (specialized personas), behaviors (reusable instructions), and recipes (multi-step workflows). Combine them however you need.'
  },
  {
    question: 'What\'s a bundle?',
    answer: 'A bundle is one way to package your agent configuration. It combines providers, tools, behaviors, and instructions into a single file. But Amplifier is more than bundles. You can also use tools directly, chain agents with recipes, or build custom workflows. Bundles are convenient, not required.'
  },
  {
    question: 'Can I create my own tools and behaviors?',
    answer: 'Yes. Tools are Python functions with a simple interface. Behaviors are markdown files with instructions. Both are easy to write and share. The ecosystem grows because people contribute back.'
  },
  {
    question: 'How do I switch between models?',
    answer: 'One command: amplifier provider use openai. Or specify it per-run: amplifier run --provider anthropic "your prompt". Your bundles, tools, and behaviors work with any provider.'
  },
  {
    question: 'Is my data private?',
    answer: 'You control where your data goes. Use cloud providers (Anthropic, OpenAI) and data flows through their APIs. Use Ollama and everything stays on your machine. Add hooks for redaction, approval gates, or custom logging. Full visibility, full control.'
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
                Join the discussion
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
                Report an issue
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
                Read the docs
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
                Help build Amplifier. Contribute tools, behaviors, bundles, 
                documentation, or improvements to the core.
              </p>
              <span className="mt-4 inline-block text-signal text-sm font-medium">
                Get involved
              </span>
            </Link>
          </RevealStagger>
        </div>
      </section>

      {/* FAQ */}
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

      {/* Quick answers */}
      <section className="section">
        <div className="container-content">
          <RevealOnScroll>
            <h2 className="text-title text-ink">Quick answers</h2>
          </RevealOnScroll>

          <RevealStagger className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-5 bg-canvas-stone rounded-gentle">
              <h3 className="text-subheading text-ink">How do I install?</h3>
              <code className="mt-3 block text-xs text-signal font-mono">
                uv tool install git+https://github.com/microsoft/amplifier
              </code>
            </div>

            <div className="p-5 bg-canvas-stone rounded-gentle">
              <h3 className="text-subheading text-ink">How do I add a provider?</h3>
              <code className="mt-3 block text-sm text-signal font-mono">
                amplifier provider use anthropic
              </code>
            </div>

            <div className="p-5 bg-canvas-stone rounded-gentle">
              <h3 className="text-subheading text-ink">How do I run a command?</h3>
              <code className="mt-3 block text-sm text-signal font-mono">
                amplifier run "your prompt"
              </code>
            </div>

            <div className="p-5 bg-canvas-stone rounded-gentle">
              <h3 className="text-subheading text-ink">How do I switch models?</h3>
              <code className="mt-3 block text-sm text-signal font-mono">
                amplifier provider use openai
              </code>
            </div>

            <div className="p-5 bg-canvas-stone rounded-gentle">
              <h3 className="text-subheading text-ink">How do I see available bundles?</h3>
              <code className="mt-3 block text-sm text-signal font-mono">
                amplifier bundle list
              </code>
            </div>

            <div className="p-5 bg-canvas-stone rounded-gentle">
              <h3 className="text-subheading text-ink">How do I run locally?</h3>
              <code className="mt-3 block text-sm text-signal font-mono">
                amplifier provider use ollama
              </code>
            </div>
          </RevealStagger>
        </div>
      </section>

      {/* Still stuck */}
      <section className="section bg-ink">
        <div className="container-content text-center">
          <RevealOnScroll>
            <h2 className="text-title text-on-dark">Still stuck?</h2>
            <p className="mt-4 text-on-dark-secondary max-w-xl mx-auto">
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
