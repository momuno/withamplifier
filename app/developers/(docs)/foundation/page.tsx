'use client'

import { useEffect } from 'react'
import { DocCodeBlock, DocDiagram, DocTable, DocSection, DocPagination, DocNote } from '@/components/DocComponents'

export default function FoundationPage() {
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
    { id: 'what-foundation-does', label: 'What Foundation Does' },
    { id: 'what-prepare-does', label: 'What prepare() Does' },
    { id: 'what-create-session-does', label: 'What create_session() Does' },
    { id: 'how-foundation-connects', label: 'How Foundation Connects' },
    { id: 'composition', label: 'Composition' },
    { id: 'do-you-need-foundation', label: 'Do You Need Foundation?' },
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
            {/* Breadcrumb */}
            <nav className="doc-breadcrumb" aria-label="Breadcrumb">
              <a href="/developers">Developers</a>
              <span aria-hidden="true">/</span>
              <span>The Foundation</span>
            </nav>

            {/* Page indicator */}
            <p className="doc-page-indicator">03 of 03</p>

            {/* Title */}
            <h1 className="doc-hero-title">The Foundation</h1>

            {/* Lead text */}
            <p className="doc-hero-lead">
              An optional convenience layer. Not part of the kernel. Foundation handles the
              practical problems of managing modules from different sources: downloading them,
              installing their dependencies, and composing configs from multiple bundles.
            </p>

            {/* Source link */}
            <a
              href="https://github.com/microsoft/amplifier-foundation"
              target="_blank"
              rel="noopener noreferrer"
              className="doc-source-link"
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              amplifier-foundation
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

            {/* Section 01: What Foundation Does */}
            <DocSection id="what-foundation-does" number="01" title="What Foundation Does">
              <p>
                After reading about the Core and the Modules, you know the kernel needs a config
                dict with module IDs, the ModuleLoader finds modules by ID, and each module
                exposes a <code>mount()</code> function. This raises practical questions: Where do
                the module files come from? How do I download them? How do I tell the kernel
                where I put them?
              </p>

              <DocCodeBlock
                thread={true}
                label="The Config Dict — Foundation wires it all"
                code={`from amplifier_foundation import Bundle

# 1. DEFINE — Declare what modules you want and where they live
agent = Bundle(
    name="my-agent",
    version="1.0.0",
    session={
        "orchestrator": {
            "module": "loop-streaming",
            "source": "git+https://github.com/microsoft/amplifier-module-loop-streaming@main",
        },
        "context": {
            "module": "context-simple",
            "source": "git+https://github.com/microsoft/amplifier-module-context-simple@main",
        },
    },
    providers=[{
        "module": "provider-anthropic",
        "source": "git+https://github.com/microsoft/amplifier-module-provider-anthropic@main",
        "config": {"default_model": "claude-sonnet-4-5"},
    }],
)

# 2. PREPARE — Foundation downloads each module from its source URL,
#    installs Python dependencies, and builds a resolver
prepared = await agent.prepare()

# 3. CREATE SESSION — Foundation builds the config dict, creates an
#    AmplifierSession, mounts the resolver, and calls initialize()
session = await prepared.create_session()

# 4. USE — Same execute() from The Core
async with session:
    response = await session.execute("Hello!")`}
              />
            </DocSection>

            {/* Section 02: What prepare() Does */}
            <DocSection id="what-prepare-does" number="02" title="What prepare() Does">
              <DocDiagram
                label="prepare() under the hood"
                diagram={`prepare()
│
├── For each module in the bundle:
│   ├── "source": "git+https://..." → git clone to local cache
│   ├── Install Python dependencies (if any)
│   └── Record: "loop-streaming" lives at /path/to/local/clone
│
└── Build a BundleModuleResolver:
    A dict that maps module IDs → local file paths
    {
      "loop-streaming":      Path("/tmp/.cache/amplifier-module-loop-streaming"),
      "context-simple":      Path("/tmp/.cache/amplifier-module-context-simple"),
      "provider-anthropic":  Path("/tmp/.cache/amplifier-module-provider-anthropic"),
    }`}
              />
            </DocSection>

            {/* Section 03: What create_session() Does */}
            <DocSection id="what-create-session-does" number="03" title="What create_session() Does">
              <DocDiagram
                label="create_session() under the hood"
                diagram={`create_session()
│
├── 1. Build the config dict (the "mount plan") from the Bundle
│      Same plain dict the kernel expects:
│      {"session": {"orchestrator": "loop-streaming", ...},
│       "providers": [...], "tools": [...], "hooks": [...]}
│
├── 2. Create an AmplifierSession with that config
│      session = AmplifierSession(config=mount_plan)
│
├── 3. Mount the BundleModuleResolver at the "module-source-resolver" slot
│      await session.coordinator.mount("module-source-resolver", resolver)
│
│      Now when initialize() asks the ModuleLoader to find "provider-anthropic",
│      Strategy 1 kicks in: the resolver says "it's at /tmp/.cache/..."
│
└── 4. Call session.initialize()
       Same initialize() from The Core — loads orchestrator, context,
       providers, tools, hooks in order`}
              />

              <p>
                This is exactly what you&apos;d do manually with the kernel. Foundation just
                automates the downloading and resolver setup.
              </p>
            </DocSection>

            {/* Section 04: How Foundation Connects to the Kernel */}
            <DocSection id="how-foundation-connects" number="04" title="How Foundation Connects to the Kernel">
              <p>
                Foundation fills one specific kernel slot: <code>module-source-resolver</code>.
              </p>

              <DocDiagram
                label="Foundation → Kernel connection"
                diagram={`┌─────────────── Your App ──────────────────────┐
│  Bundle(...)                                   │
│  prepare()                                     │
│  create_session()                              │
└──────────────────┬─────────────────────────────┘
                   │ mounts resolver + calls initialize()
┌──────────────────▼─────────────────────────────┐
│  Kernel: AmplifierSession                      │
│                                                │
│  ModuleCoordinator                             │
│  ├── module-source-resolver ← Foundation's     │
│  │                            BundleResolver   │
│  ├── orchestrator ← loaded via resolver        │
│  ├── context      ← loaded via resolver        │
│  ├── providers    ← loaded via resolver        │
│  ├── tools        ← loaded via resolver        │
│  └── hooks        ← loaded via resolver        │
│                                                │
│  ModuleLoader                                  │
│  └── load("provider-anthropic")                │
│      └── asks resolver → "/tmp/.cache/…"       │
│          → imports module → calls mount()      │
└────────────────────────────────────────────────┘`}
              />

              <p>
                The kernel doesn&apos;t know Foundation exists. It just sees a resolver in its
                slot and uses it.
              </p>
            </DocSection>

            {/* Section 05: Composition */}
            <DocSection id="composition" number="05" title="Composition">
              <p>
                Bundles can be layered. Each one contributes modules, config, or instructions.
                Foundation merges them.
              </p>

              <DocCodeBlock
                label="Bundle composition"
                code={`from amplifier_foundation import Bundle, load_bundle

# Load a shared base config
base = await load_bundle("path/to/base-bundle.yaml")

# Load a provider config
provider = await load_bundle("path/to/anthropic-sonnet.yaml")

# Add your own tools
my_stuff = Bundle(
    name="my-tools",
    version="1.0.0",
    tools=[
        {"module": "tool-filesystem", "source": "git+https://..."},
    ],
    instruction="You are a helpful coding assistant.",
)

# Compose: layer them together
composed = base.compose(provider).compose(my_stuff)

# Prepare and run — same as before
prepared = await composed.prepare()
session = await prepared.create_session()`}
              />

              <p>Composition rules:</p>
              <ul>
                <li><strong>session configs:</strong> deep merge</li>
                <li><strong>providers, tools, hooks:</strong> merge by module ID</li>
                <li><strong>instruction:</strong> last one wins</li>
              </ul>
            </DocSection>

            {/* Section 06: Do You Need Foundation? */}
            <DocSection id="do-you-need-foundation" number="06" title="Do You Need Foundation?">
              <p>
                No. Three alternatives:
              </p>

              <ol>
                <li>
                  <strong>pip-install modules</strong> &mdash; the kernel finds them via
                  entry points automatically.
                </li>
                <li>
                  <strong>Mount modules directly</strong> on the coordinator &mdash; skip
                  the loader entirely.
                </li>
                <li>
                  <strong>Write your own resolver</strong> &mdash; about 10 lines of code.
                </li>
              </ol>

              <p><strong>Foundation is useful when:</strong></p>
              <ul>
                <li>You pull modules from multiple git repos or registries.</li>
                <li>You want composable, layered configs across teams or projects.</li>
                <li>You need automatic dependency installation for modules.</li>
                <li>You want a single <code>prepare()</code> call to handle all setup.</li>
              </ul>

              <p><strong>Foundation is NOT useful when:</strong></p>
              <ul>
                <li>All your modules are pip-installed &mdash; the kernel already finds them.</li>
                <li>You mount modules manually in a script &mdash; Foundation adds nothing.</li>
                <li>You have a custom module registry &mdash; write your own resolver instead.</li>
              </ul>
            </DocSection>

            {/* Section 07: Quick Reference */}
            <DocSection id="quick-reference" number="07" title="Quick Reference">
              <DocTable
                headers={['Piece', 'What it is', 'Source']}
                rows={[
                  [
                    'Bundle',
                    'Composable config package (dataclass).',
                    'amplifier-foundation',
                  ],
                  [
                    'prepare()',
                    'Downloads modules, installs deps, builds resolver.',
                    'bundle.py',
                  ],
                  [
                    'create_session()',
                    'Builds AmplifierSession + mounts resolver + initializes.',
                    'bundle.py',
                  ],
                  [
                    'BundleModuleResolver',
                    'Dict mapping module ID → local path.',
                    'bundle.py',
                  ],
                  [
                    'Bundle Guide',
                    'Full authoring guide.',
                    'BUNDLE_GUIDE.md',
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
        <DocPagination prev={{ href: '/developers/modules', label: 'The Modules' }} />
      </div>

    </div>
  )
}
