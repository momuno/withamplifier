'use client'

import { useEffect } from 'react'
import { DocCodeBlock, DocDiagram, DocTable, DocSection, DocPagination, DocNote } from '@/components/DocComponents'

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
            {/* Breadcrumb */}
            <nav className="doc-breadcrumb" aria-label="Breadcrumb">
              <a href="/developers">Developers</a>
              <span aria-hidden="true">/</span>
              <span>The Modules</span>
            </nav>

            {/* Page indicator */}
            <p className="doc-page-indicator">02 of 03</p>

            {/* Title */}
            <h1 className="doc-hero-title">The Modules</h1>

            {/* Lead text */}
            <p className="doc-hero-lead">
              5 types. Protocol-based. No inheritance required.
            </p>
            <br/>

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

              <DocDiagram
                label="ModuleLoader resolution strategies"
                diagram={`ModuleLoader.load("tool-inventory")
│
├── Strategy 1: Source resolver
│   Is there a resolver mounted at the "module-source-resolver" slot?
│   If yes → ask it: "where is tool-inventory?"
│            resolver returns a file path → load from there
│
├── Strategy 2: Python entry points
│   Is there a pip-installed package that registered itself under
│   the "amplifier.modules" entry point group?
│   If yes → import it
│
└── Strategy 3: Filesystem convention
    Is there a package named "amplifier_module_tool_inventory"
    importable on sys.path?
    If yes → import it, look for a mount() function`}
              />

              <p>
                In practice, you rarely think about this. If you <code>pip install</code> a
                module, the loader finds it automatically. If you pull modules from git
                repos, the <a href="/developers/foundation">Foundation</a> layer handles
                that for you.
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
                label="The Config Dict — adding a custom tool"
                code={`session = AmplifierSession(config={...})
await session.initialize()

# Mount your tool directly — no package, no mount() function needed
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
              <DocTable
                headers={['Module ID', 'What it does']}
                rows={[
                  ['loop-streaming', 'Streaming agent loop — sends tokens as they arrive from the LLM.'],
                  ['loop-basic', 'Simple agent loop — waits for the full response before returning.'],
                ]}
              />

              <h3>Context</h3>
              <DocTable
                headers={['Module ID', 'What it does']}
                rows={[
                  ['context-simple', 'In-memory conversation history. Stores messages in a list.'],
                ]}
              />

              <h3>Providers</h3>
              <DocTable
                headers={['Module ID', 'What it does']}
                rows={[
                  ['provider-anthropic', 'Connects to the Anthropic API (Claude models).'],
                  ['provider-openai', 'Connects to the OpenAI API (GPT models).'],
                  ['provider-azure', 'Connects to Azure OpenAI Service.'],
                  ['provider-ollama', 'Connects to a local Ollama instance for open-source models.'],
                ]}
              />

              <h3>Tools</h3>
              <DocTable
                headers={['Module ID', 'What it does']}
                rows={[
                  ['tool-filesystem', 'Read, write, and list files on the local filesystem.'],
                  ['tool-bash', 'Execute shell commands and return output.'],
                  ['tool-web', 'Fetch web pages and extract content.'],
                  ['tool-search', 'Search the web using a search API.'],
                ]}
              />

              <DocNote>
                <p>
                  Full list: <a
                    href="https://github.com/microsoft/amplifier-core/blob/main/MODULES.md"
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
