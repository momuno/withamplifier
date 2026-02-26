'use client'

import { useEffect } from 'react'
import DocPageNav from '@/components/DocPageNav'
import { DocCodeBlock, DocTable, DocSection, DocPagination, DocNote } from '@/components/DocComponents'
import ConceptDiagram, { Step } from '@/components/diagrams/ConceptDiagram'

export default function ModulesPage() {
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
    { id: 'what-a-module-looks-like', label: 'What a Module Looks Like' },
    { id: 'all-five-protocols', label: 'All Five Protocols' },
    { id: 'how-modules-get-found', label: 'How Modules Get Found' },
    { id: 'how-a-module-gets-mounted', label: 'How a Module Gets Mounted' },
    { id: 'mounting-without-a-package', label: 'Mounting Without a Package' },
    { id: 'existing-modules', label: 'Existing Modules' },
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
                <span>The Modules</span>
              </nav>

              {/* Page navigation */}
              <DocPageNav
                current={2}
                total={3}
                prev={{ href: '/developers/core', label: 'The Core' }}
                next={{ href: '/developers/foundation', label: 'The Foundation' }}
              />
            </div>

            {/* Title */}
            <h1 className="doc-hero-title">The Modules</h1>

            {/* Lead text */}
            <p className="doc-hero-lead">
              Five types. Protocol-based. No inheritance required.
            </p>

            {/* Source link */}
            <a
              href="https://github.com/microsoft/amplifier-core/blob/main/amplifier_core/interfaces.py"
              target="_blank"
              rel="noopener noreferrer"
              className="doc-source-link"
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              View protocols on GitHub
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

            {/* Section 01: What a Module Looks Like */}
            <DocSection id="what-a-module-looks-like" number="01" title="What a Module Looks Like">
              <p>
                A module is a Python package with two parts: a <strong>class</strong> that
                satisfies a protocol, and a <strong><code>mount()</code> function</strong> that
                the kernel calls during initialization. Each coordinator slot has
                a <em>protocol</em> &mdash; a definition of the methods a module must
                have to fill that slot (defined using Python&apos;s <code>typing.Protocol</code>).
                Your class just needs to have the right methods. No base class, no inheritance.
              </p>
              <br/>
              <p>
                Here&apos;s what the class part looks like for a custom tool.
              </p>

              <DocCodeBlock
                label="A custom tool — the Tool protocol"
                code={`from amplifier_core import ToolResult

class InventoryTool:

    @property
    def name(self) -> str:
        return "check_inventory"

    @property
    def description(self) -> str:
        """The LLM reads this to decide when to call your tool."""
        return "Check product stock levels and pricing"

    @property
    def input_schema(self) -> dict:
        """JSON Schema. Tells the LLM what parameters to pass."""
        return {
            "type": "object",
            "properties": {
                "product_id": {
                    "type": "string",
                    "description": "The product ID to look up",
                },
            },
            "required": ["product_id"],
        }

    async def execute(self, input: dict) -> ToolResult:
        """Runs when the LLM calls this tool."""
        product_id = input.get("product_id")
        if not product_id:
            return ToolResult(
                success=False,
                error={"message": "product_id is required"}
            )

        product = await self._lookup(product_id)
        return ToolResult(success=True, output=product)`}
              />

              <p>
                The class has no awareness of the kernel &mdash; it&apos;s just a plain Python
                object with the right shape. The <code>mount()</code> function (covered
                in <a href="#how-a-module-gets-mounted">Section 04</a>) is what wires
                it into the coordinator.
              </p>

            </DocSection>

            {/* Section 02: All Five Protocols */}
            <DocSection id="all-five-protocols" number="02" title="All Five Protocols">
              <DocTable
                headers={['Type', 'What it does', 'Key methods']}
                rows={[
                  [
                    'Orchestrator',
                    'THE agent loop — calls the LLM, handles tool calls, loops',
                    'execute(prompt, context, providers, tools, hooks) → str',
                  ],
                  [
                    'ContextManager',
                    'Conversation memory — stores and retrieves messages',
                    'add_message(message), get_messages_for_request() → list[dict]',
                  ],
                  [
                    'Provider',
                    'Connects to an LLM API',
                    'name, complete(request) → ChatResponse',
                  ],
                  [
                    'Tool',
                    'A capability the LLM can decide to call',
                    'name, description, input_schema, execute(input) → ToolResult',
                  ],
                  [
                    'HookHandler',
                    'Observes lifecycle events (logging, guardrails, cost tracking)',
                    '__call__(event, data) → HookResult',
                  ],
                ]}
              />

              <p>
                Key distinction: <strong>Tools are LLM-triggered</strong> &mdash; the model decides
                when to call them based on the conversation. <strong>Hooks are code-triggered</strong> &mdash;
                they fire on lifecycle events like <code>provider:request</code> or <code>tool:post</code>,
                regardless of what the LLM wants. Tools extend what the agent can do.
                Hooks observe and control how the agent behaves.
              </p>
            </DocSection>

            {/* Section 03: How Modules Get Found */}
            <DocSection id="how-modules-get-found" number="03" title="How Modules Get Found">
              <p>
                If you packaged <code>InventoryTool</code> as a module
                called <code>&quot;tool-inventory&quot;</code>, the kernel needs to find
                that package at load time. It asks the <code>ModuleLoader</code>,
                which tries three strategies in order.
              </p>

              <ConceptDiagram title='ModuleLoader.load("tool-inventory")' variant="fallback">
                <Step number={1} label="Strategy 1: Source resolver">
                  Is there a resolver mounted at the <code>module-source-resolver</code> slot?
                  If yes &rarr; ask it: &quot;where is tool-inventory?&quot;
                  &rarr; resolver returns a file path &rarr; load from there
                </Step>
                <Step number={2} label="Strategy 2: Python entry points">
                  Is there a pip-installed package that registered itself under
                  the <code>amplifier.modules</code> entry point group? If yes &rarr; import it
                </Step>
                <Step number={3} label="Strategy 3: Filesystem convention">
                  Is there a package named <code>amplifier_module_tool_inventory</code> importable
                  on <code>sys.path</code>? If yes &rarr; import it, look for
                  a <code>mount()</code> function
                </Step>
              </ConceptDiagram>

              <p>
                In practice, you rarely think about this. The most common
                path is installing a module with <code>pip</code> or <code>uv</code> and
                referencing it by name in your config:
              </p>

              <DocCodeBlock
                label="Install a module, use it by name"
                code={`# At the command line:
uv pip install amplifier-module-tool-bash

# Then in your AmplifierSession config, reference it by name:
session = AmplifierSession(config={
    ...
    "tools": [
        {"module": "tool-bash"}   # the loader finds it
    ],
})
# The kernel handles the rest during initialize().`}
              />

              <p>
                If you need modules from git repos instead of published packages,
                the <a href="/developers/foundation">Foundation</a> layer handles
                cloning and setup for you &mdash; that&apos;s covered on the next page.
              </p>
              <p>
                What matters next is what happens <em>after</em> the loader finds your
                package &mdash; it looks for a <code>mount()</code> function.
              </p>
            </DocSection>

            {/* Section 04: How a Module Gets Mounted */}
            <DocSection id="how-a-module-gets-mounted" number="04" title="How a Module Gets Mounted">
              <p>
                Every module package exposes one function: <code>mount()</code>. The kernel
                calls it with the coordinator and any config.
              </p>

              <DocCodeBlock
                label="The mount() function for InventoryTool"
                code={`from amplifier_core import ModuleCoordinator

async def mount(coordinator: ModuleCoordinator, config=None):
    """Called by the kernel during initialize()."""
    config = config or {}
    tool = InventoryTool(
        api_url=config.get("api_url", "https://api.example.com"),
    )
    await coordinator.mount("tools", tool, name=tool.name)

class InventoryTool:
    ...  # same as before`
}
              />

              <p>
                The contract between the kernel and a module is four steps:
              </p>
              <ol>
                <li><strong>Find</strong> &mdash; the <code>ModuleLoader</code> locates the module package using its resolution strategies.</li>
                <li><strong>Import</strong> &mdash; the loader imports the package and finds the <code>mount()</code> function.</li>
                <li><strong>Call mount()</strong> &mdash; the kernel calls <code>mount(coordinator, config)</code>, passing the coordinator and any module-specific config from the config dict.</li>
                <li><strong>Cleanup</strong> &mdash; if <code>mount()</code> returned a cleanup function, the kernel calls it during <code>session.cleanup()</code>.</li>
              </ol>
            </DocSection>

            {/* Section 05: Mounting Without a Package */}
            <DocSection id="mounting-without-a-package" number="05" title="Mounting Without a Package">
              <p>
                You don&apos;t need a full module package for custom tools. If you have an object
                that satisfies the protocol, mount it directly on the coordinator.
              </p>

              <DocCodeBlock
                label="Mounting a tool directly — skipping the config dict"
                code={`# Same session setup as before, but with an empty tools list —
# we're not loading this tool through the config.
session = AmplifierSession(config={
    "session": {"orchestrator": "loop-streaming", ...},
    "providers": [...],
    "tools": [],      # <-- nothing here
})
await session.initialize()

# Instead, mount InventoryTool directly on the coordinator.
# Same result as if the kernel loaded it from a package.
my_tool = InventoryTool()
await session.coordinator.mount("tools", my_tool, name=my_tool.name)

# Now the LLM can use it
response = await session.execute("Check inventory for widget-a")`}
              />
            </DocSection>

            {/* Section 06: Existing Modules */}
            <DocSection id="existing-modules" number="06" title="Existing Modules">
              <p>
                You don&apos;t have to build everything yourself. The Amplifier ecosystem
                ships ready-made modules for common needs.
              </p>

              <h3>Orchestrators</h3>
              <table className="doc-table">
                <thead><tr><th>Module ID</th><th>What it does</th></tr></thead>
                <tbody>
                  <tr><td><a href="https://github.com/microsoft/amplifier-module-loop-streaming" target="_blank" rel="noopener noreferrer">loop-streaming</a></td><td>Streaming agent loop &mdash; sends tokens as they arrive from the LLM.</td></tr>
                  <tr><td><a href="https://github.com/microsoft/amplifier-module-loop-basic" target="_blank" rel="noopener noreferrer">loop-basic</a></td><td>Simple agent loop &mdash; waits for the full response before returning.</td></tr>
                </tbody>
              </table>

              <h3>Context Managers</h3>
              <table className="doc-table">
                <thead><tr><th>Module ID</th><th>What it does</th></tr></thead>
                <tbody>
                  <tr><td><a href="https://github.com/microsoft/amplifier-module-context-simple" target="_blank" rel="noopener noreferrer">context-simple</a></td><td>In-memory conversation history. Stores messages in a list.</td></tr>
                </tbody>
              </table>

              <h3>Providers</h3>
              <table className="doc-table">
                <thead><tr><th>Module ID</th><th>What it does</th></tr></thead>
                <tbody>
                  <tr><td><a href="https://github.com/microsoft/amplifier-module-provider-anthropic" target="_blank" rel="noopener noreferrer">provider-anthropic</a></td><td>Connects to the Anthropic API (Claude models).</td></tr>
                  <tr><td><a href="https://github.com/microsoft/amplifier-module-provider-openai" target="_blank" rel="noopener noreferrer">provider-openai</a></td><td>Connects to the OpenAI API (GPT models).</td></tr>
                  <tr><td><a href="https://github.com/microsoft/amplifier-module-provider-ollama" target="_blank" rel="noopener noreferrer">provider-ollama</a></td><td>Connects to a local Ollama instance for open-source models.</td></tr>
                </tbody>
              </table>

              <h3>Tools</h3>
              <table className="doc-table">
                <thead><tr><th>Module ID</th><th>What it does</th></tr></thead>
                <tbody>
                  <tr><td><a href="https://github.com/microsoft/amplifier-module-tool-filesystem" target="_blank" rel="noopener noreferrer">tool-filesystem</a></td><td>Read, write, and list files on the local filesystem.</td></tr>
                  <tr><td><a href="https://github.com/microsoft/amplifier-module-tool-bash" target="_blank" rel="noopener noreferrer">tool-bash</a></td><td>Execute shell commands and return output.</td></tr>
                  <tr><td><a href="https://github.com/microsoft/amplifier-module-tool-web" target="_blank" rel="noopener noreferrer">tool-web</a></td><td>Fetch web pages and extract content.</td></tr>
                  <tr><td><a href="https://github.com/microsoft/amplifier-module-tool-search" target="_blank" rel="noopener noreferrer">tool-search</a></td><td>Search the web using a search API.</td></tr>
                </tbody>
              </table>

              <h3>Hooks</h3>
              <table className="doc-table">
                <thead><tr><th>Module ID</th><th>What it does</th></tr></thead>
                <tbody>
                  <tr><td><a href="https://github.com/microsoft/amplifier-module-hooks-logging" target="_blank" rel="noopener noreferrer">hooks-logging</a></td><td>Logs lifecycle events to the session event log.</td></tr>
                  <tr><td><a href="https://github.com/microsoft/amplifier-module-hooks-approval" target="_blank" rel="noopener noreferrer">hooks-approval</a></td><td>Requires user approval before sensitive tool calls.</td></tr>
                  <tr><td><a href="https://github.com/microsoft/amplifier-module-hooks-redaction" target="_blank" rel="noopener noreferrer">hooks-redaction</a></td><td>Redacts secrets and sensitive data from event logs.</td></tr>
                  <tr><td><a href="https://github.com/microsoft/amplifier-module-hooks-streaming-ui" target="_blank" rel="noopener noreferrer">hooks-streaming-ui</a></td><td>Streams tokens and tool status to the terminal UI.</td></tr>
                  <tr><td><a href="https://github.com/microsoft/amplifier-module-hooks-todo-reminder" target="_blank" rel="noopener noreferrer">hooks-todo-reminder</a></td><td>Injects todo list reminders into agent context.</td></tr>
                  <tr><td><a href="https://github.com/microsoft/amplifier-module-hooks-status-context" target="_blank" rel="noopener noreferrer">hooks-status-context</a></td><td>Injects environment info (git status, working dir, date) into context.</td></tr>
                </tbody>
              </table>

              <DocNote>
                <p>
                  Full list: <a
                    href="https://github.com/microsoft/amplifier/blob/main/docs/MODULES.md"
                    target="_blank"
                    rel="noopener noreferrer"
                  >MODULES.md on GitHub</a>
                </p>
              </DocNote>
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
        <DocPagination
          prev={{ href: '/developers/core', label: 'The Core' }}
          next={{ href: '/developers/foundation', label: 'The Foundation' }}
        />
      </div>

    </div>
  )
}
