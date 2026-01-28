'use client'

import Link from 'next/link'
import RevealOnScroll, { RevealStagger } from '@/components/RevealOnScroll'
import Accordion from '@/components/Accordion'

// Status badge component
const StatusBadge = ({ status }: { status: 'solid' | 'evolving' | 'temporary' }) => {
  const colors = {
    solid: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    evolving: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    temporary: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  }
  const labels = {
    solid: '● Solid',
    evolving: '◐ Evolving',
    temporary: '○ Temporary',
  }
  return (
    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded border ${colors[status]}`}>
      {labels[status]}
    </span>
  )
}

// Status data
const statusItems = {
  solid: [
    { name: 'Kernel contracts', desc: 'The interfaces between Amplifier core and modules (providers, tools, hooks) are stable.' },
    { name: 'Session model', desc: 'How Amplifier manages conversations, context, and state.' },
    { name: 'Provider architecture', desc: 'Swap LLM backends without changing how you work.' },
    { name: 'Event system', desc: 'How Amplifier emits what\'s happening. Observable, hookable, stable.' },
  ],
  evolving: [
    { name: 'Bundle workflows', desc: 'Simpler paths coming. Auto-detection, cleaner syntax.' },
    { name: 'CLI ergonomics', desc: 'Functional but has rough edges. Smoother workflows ahead.' },
    { name: 'Error messages', desc: 'Working toward more actionable, context-aware guidance.' },
  ],
  temporary: [
    { name: 'Direct bundle manipulation', desc: 'Bundles will move under the hood. You\'ll interact with modes or profiles instead.' },
    { name: 'Manual provider setup', desc: 'Smarter defaults and guided setup will make this easier.' },
  ],
}

const faqItems = [
  {
    question: 'What makes Amplifier different from other AI tools?',
    answer: 'Unlike tools that give you an AI assistant, Amplifier gives you a platform for building AI-powered tools and workflows. Three things make this real: First, the model is a component — swap providers without rewriting anything. Second, you can watch it think — every decision logged, every tool call visible, debug in minutes not hours. Third, your setup is yours — a file you can read, version, share, and modify. Not a subscription. Not a black box. A platform you own.'
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
  },
  {
    question: 'How is Amplifier different from other AI coding tools?',
    answer: 'Most AI coding tools give you an assistant. Amplifier gives you a platform for building AI-powered workflows. The difference: you can see how it thinks, swap any component, and compose capabilities like building blocks. Your setup is a file you own, not a service you rent.'
  },
  {
    question: 'Can I build applications with Amplifier?',
    answer: 'Yes. Amplifier is designed as a platform, not just a tool. Use recipes to define multi-step workflows. Compose bundles to package capabilities for specific domains. Deploy agents that handle complex tasks autonomously. The same primitives you use interactively power full applications.'
  },
  {
    question: 'What\'s the agent loop?',
    answer: 'When you give Amplifier a task, it runs a loop: Think (understand what to do) → Act (use tools) → Observe (see results) → Repeat until done. This loop is visible — you can watch each step, set limits on how many cycles it runs, and intervene when needed. Understanding the loop helps you work with Amplifier effectively.'
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

      {/* Status: What to Expect */}
      <section className="section">
        <div className="container-reading">
          <RevealOnScroll>
            <h2 className="text-title text-ink">Status: What to expect</h2>
            <p className="mt-4 text-ink-slate">
              Amplifier is actively developed. Some parts are stable foundations. 
              Others are evolving and will improve.
            </p>
          </RevealOnScroll>

          {/* Solid */}
          <RevealOnScroll delay={100}>
            <div className="mt-10">
              <div className="flex items-center gap-3 mb-4">
                <StatusBadge status="solid" />
                <h3 className="text-heading text-ink">Build on these</h3>
              </div>
              <div className="space-y-3">
                {statusItems.solid.map((item) => (
                  <div key={item.name} className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-gentle">
                    <span className="text-subheading text-ink">{item.name}</span>
                    <span className="text-ink-slate"> — {item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* Evolving */}
          <RevealOnScroll delay={200}>
            <div className="mt-8">
              <div className="flex items-center gap-3 mb-4">
                <StatusBadge status="evolving" />
                <h3 className="text-heading text-ink">Works today, improving</h3>
              </div>
              <div className="space-y-3">
                {statusItems.evolving.map((item) => (
                  <div key={item.name} className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-gentle">
                    <span className="text-subheading text-ink">{item.name}</span>
                    <span className="text-ink-slate"> — {item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* Temporary */}
          <RevealOnScroll delay={300}>
            <div className="mt-8">
              <div className="flex items-center gap-3 mb-4">
                <StatusBadge status="temporary" />
                <h3 className="text-heading text-ink">Will be replaced</h3>
              </div>
              <div className="space-y-3">
                {statusItems.temporary.map((item) => (
                  <div key={item.name} className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-gentle">
                    <span className="text-subheading text-ink">{item.name}</span>
                    <span className="text-ink-slate"> — {item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Quick answers */}
      <section className="section bg-canvas-stone">
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
