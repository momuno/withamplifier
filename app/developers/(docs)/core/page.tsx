'use client'

import { useEffect } from 'react'
import DocPageNav from '@/components/DocPageNav'
import { DocCodeBlock, DocTable, DocSection, DocPagination, DocNote } from '@/components/DocComponents'
import ConceptDiagram, { Step, SubFlow, SubStep } from '@/components/diagrams/ConceptDiagram'

export default function CorePage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const tocSections = [
    { id: 'session-lifecycle', label: 'Session Lifecycle' },
    { id: 'what-initialize-does', label: 'What initialize() Does' },
    { id: 'what-execute-does', label: 'What execute() Does' },
    { id: 'coordinators-slots', label: "Coordinator's Slots" },
    { id: 'the-minimum', label: 'The Minimum' },
    { id: 'quick-reference', label: 'Quick Reference' },
  ]

  return (
    <div className="pt-16">

      {/* ============================================================
          HERO — dark, compact
          ============================================================ */}
      <section className="section-dark doc-hero" data-theme="dark">
        <div className="container-default">
          <div className="reveal">
            <div className="doc-hero-meta">
              {/* Breadcrumb */}
              <nav className="doc-breadcrumb" aria-label="Breadcrumb">
                <a href="/developers">Developers</a>
                <span aria-hidden="true">/</span>
                <span>The Core</span>
              </nav>

              {/* Page navigation */}
              <DocPageNav
                current={1}
                total={3}
                next={{ href: '/developers/modules', label: 'The Modules' }}
              />
            </div>

            {/* Title */}
            <h1 className="doc-hero-title">The Core</h1>

            {/* Lead text */}
            <p className="doc-hero-lead">
              A session, a coordinator, and five module types. ~4,000 lines total.
            </p>

            {/* Source link */}
            <a
              href="https://github.com/microsoft/amplifier-core"
              target="_blank"
              rel="noopener noreferrer"
              className="doc-source-link"
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              amplifier-core
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================
          CONTENT — light reading surface
          ============================================================ */}
      <div className="bg-canvas" data-theme="light" style={{ paddingTop: '64px', paddingBottom: '96px' }}>
        <div className="doc-grid">

          {/* -- Inline TOC for mobile/tablet -- */}
          <details className="doc-toc-inline">
            <summary>On this page</summary>
            <ul>
              {tocSections.map(s => (
                <li key={s.id}><a href={`#${s.id}`}>{s.label}</a></li>
              ))}
            </ul>
          </details>

          {/* -- Article -- */}
          <article className="doc-article">

            {/* Section 01: The Session Lifecycle */}
            <DocSection id="session-lifecycle" number="01" title="The Session Lifecycle">
              <p>
                An <code>AmplifierSession</code> has four steps: create it with a config dict,
                initialize (which loads and mounts every module), execute a prompt, and clean up.
              </p>

              <DocCodeBlock language="python"
                label="The Config Dict — session lifecycle"
                code={`from amplifier_core import AmplifierSession

# 1. Create — pass a config dict that says which modules to use
session = AmplifierSession(config={
    "session": {
        "orchestrator": "loop-streaming",
        "context": "context-simple",
    },
    "providers": [
        {
            "module": "provider-anthropic",
            "config": {"default_model": "claude-sonnet-4-5"},
        }
    ],
    "tools": [],
    "hooks": [],
})

# 2. Initialize — the kernel reads your config, finds each module,
#    and mounts it into the coordinator's slots
await session.initialize()

# 3. Execute — send a prompt, get a response
response = await session.execute("What are the 3 laws of robotics?")

# 4. Cleanup — release resources
await session.cleanup()`}
              />

              <p>
                The config dict is plain Python. No YAML file is required &mdash; you can build
                the dict however you want. Read it from a file, construct it dynamically, merge
                it from multiple sources. The kernel doesn&apos;t care where it came from.
              </p>
            </DocSection>

            {/* Section 02: What initialize() Does */}
            <DocSection id="what-initialize-does" number="02" title="What initialize() Does">
              <p>
                When you call <code>initialize()</code>, the kernel walks through your config
                and loads each module into the coordinator. Orchestrator and context are required &mdash;
                the session fails if either is missing. Providers, tools, and hooks are more
                forgiving: a failure logs a warning but doesn&apos;t stop the session.
              </p>

              <ConceptDiagram title="initialize()">
                <Step number={1} label="Load orchestrator" badge="required" badgeVariant="required">
                  find <code>loop-streaming</code> &rarr; import it &rarr; call its <code>mount()</code> &rarr; slot filled
                </Step>
                <Step number={2} label="Load context" badge="required" badgeVariant="required">
                  find <code>context-simple</code> &rarr; import it &rarr; call its <code>mount()</code> &rarr; slot filled
                </Step>
                <Step number={3} label="Load providers" badge="warns on failure" badgeVariant="warn">
                  for each in <code>config[&quot;providers&quot;]</code>: find module &rarr; import &rarr; mount &rarr; slot filled
                </Step>
                <Step number={4} label="Load tools" badge="warns on failure" badgeVariant="warn">
                  for each in <code>config[&quot;tools&quot;]</code>: find module &rarr; import &rarr; mount &rarr; slot filled
                </Step>
                <Step number={5} label="Load hooks" badge="warns on failure" badgeVariant="warn">
                  for each in <code>config[&quot;hooks&quot;]</code>: find module &rarr; import &rarr; mount &rarr; slot filled
                </Step>
              </ConceptDiagram>

              <DocNote>
                <p>
                  Source: <a
                    href="https://github.com/microsoft/amplifier-core/amplifier_core/session.py"
                    target="_blank"
                    rel="noopener noreferrer"
                  >session.py &mdash; initialize()</a>
                </p>
              </DocNote>
            </DocSection>

            {/* Section 03: What execute() Does */}
            <DocSection id="what-execute-does" number="03" title="What execute() Does">
              <p>
                Once initialized, calling <code>execute()</code> is one line. The kernel
                gathers every mounted module from the coordinator and hands them all to
                the orchestrator. What happens next is the orchestrator&apos;s business.
              </p>

              <ConceptDiagram title='execute("What are the 3 laws of robotics?")'>
                <Step number={1} label="Gather from coordinator">
                  get orchestrator, context, providers, tools, hooks
                </Step>
                <Step number={2} label="orchestrator.execute(prompt, context, providers, tools, hooks)">
                  <SubFlow label="Inside the orchestrator" annotation="this is the orchestrator&apos;s job, not the kernel&apos;s">
                    <SubStep label="context.add_message(user prompt)" />
                    <SubStep label="provider.complete(messages)">call LLM API</SubStep>
                    <SubStep label="If LLM wants to use a tool">tool.execute() &rarr; loop back to LLM</SubStep>
                    <SubStep label="Return response text" />
                  </SubFlow>
                </Step>
                <Step number={3} label="Return result">
                  <code>&quot;The three laws of robotics are...&quot;</code>
                </Step>
              </ConceptDiagram>

              <p>
                The orchestrator <em>is</em> the agent loop. The kernel just hands it the pieces.
                Want a different execution pattern? Write a different orchestrator. The rest of
                the system doesn&apos;t change.
              </p>
            </DocSection>

            {/* Section 04: The Coordinator's Slots */}
            <DocSection id="coordinators-slots" number="04" title="The Coordinator's Slots">
              <p>
                The <code>ModuleCoordinator</code> holds every mounted module in a simple
                data structure. Single-instance slots for the orchestrator and context manager,
                dictionaries for providers and tools, and a registry for hooks.
              </p>

              <DocCodeBlock language="python"
                label="coordinator.py — mount_points"
                code={`coordinator.mount_points = {
    "orchestrator": None,      # single — required
    "context":      None,      # single — required
    "providers":    {},        # dict by name — need at least 1
    "tools":        {},        # dict by name — optional
    "hooks":        HookRegistry(),  # optional
}`}
              />

              <p>
                That&apos;s the whole model. When <code>initialize()</code> loads a module,
                it calls <code>mount()</code> on that module and places it into the
                matching slot. When <code>execute()</code> runs, it reads every slot and
                passes them to the orchestrator.
              </p>
            </DocSection>

            {/* Section 05: The Minimum */}
            <DocSection id="the-minimum" number="05" title="The Minimum">
              <p>
                Not everything in the coordinator is required. Here&apos;s what you actually need
                to run a working agent:
              </p>

              <DocTable
                headers={['Slot', 'What it does', 'Why it\'s required']}
                rows={[
                  [
                    'Orchestrator',
                    'Runs the agent loop — decides when to call the LLM, when to use tools, and when to stop.',
                    'Without it, nothing executes. There is no default loop.',
                  ],
                  [
                    'Context Manager',
                    'Stores and retrieves the conversation history.',
                    'The LLM needs messages to reason about. No context, no memory.',
                  ],
                  [
                    'Provider',
                    'Calls the LLM API and returns the response.',
                    'The agent needs an LLM to think. At least one provider must be loaded.',
                  ],
                ]}
              />

              <p>
                Tools and hooks are optional. You can run a working agent with just those three.
                Add tools when the agent needs to act on the world. Add hooks when you need
                to observe or control the conversation.
              </p>
            </DocSection>

            {/* Section 06: Quick Reference */}
            <DocSection id="quick-reference" number="06" title="Quick Reference">
              <DocTable
                headers={['Piece', 'What it is', 'Source']}
                rows={[
                  [
                    'AmplifierSession',
                    'The entry point. Owns the lifecycle: create, initialize, execute, cleanup.',
                    'session.py#L35',
                  ],
                  [
                    'ModuleCoordinator',
                    'Holds every mounted module in named slots. The single source of truth for what\'s loaded.',
                    'coordinator.py#L18',
                  ],
                  [
                    'ModuleLoader',
                    'Finds, imports, and instantiates modules by name. The kernel\'s plugin system.',
                    'loader.py#L12',
                  ],
                  [
                    'Full kernel repo',
                    '~4,000 lines of Python. The entire kernel with minimal runtime dependencies.',
                    'github.com/microsoft/amplifier-core',
                  ],
                ]}
              />
            </DocSection>

          </article>

          {/* -- Sticky TOC for desktop -- */}
          <nav className="doc-toc" aria-label="Table of contents">
            <p className="doc-toc-heading">On this page</p>
            <ul>
              {tocSections.map(s => (
                <li key={s.id}><a href={`#${s.id}`}>{s.label}</a></li>
              ))}
            </ul>
          </nav>

        </div>
      </div>

      {/* ============================================================
          PAGINATION
          ============================================================ */}
      <div className="bg-canvas" data-theme="light">
        <DocPagination next={{ href: '/developers/modules', label: 'The Modules' }} />
      </div>

    </div>
  )
}
