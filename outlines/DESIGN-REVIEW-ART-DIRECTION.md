# Art Direction: Developer Documentation Visual Enrichment

**Reviewer:** design-intelligence-enhanced:art-director
**Date:** 2026-02-26

---

## Core Tension

Mollie built excellent structural foundations - the reading grid, breakout system, compact dark hero, section numbering. What's missing is **visual breathing**. The reading experience is: prose > code block > prose > table > prose > code block. Every visual moment is a code artifact. The pages read like a textbook that only knows one kind of illustration.

The goal: pages that feel like the documentation arm of the same brand whose homepage has Chladni particles. Not theatrical - that would break reading flow. But **aware of its own lineage**. Same aesthetic DNA, expressed at reading volume.

---

## I. Five Module Types - Visual Identity System

Each module type gets its own **visual identity** within the system. Not arbitrary color - meaningful differentiation.

### Color Assignments (Semantic, Not Decorative)

| Module | Color | Hex | Rationale |
|---|---|---|---|
| **Orchestrator** | Signal purple | `#5B4DE3` | The conductor. Gets brand color - it's the central intelligence |
| **Context** | Warm amber | `#D4923B` | Memory. Warm = continuity, persistence, recall |
| **Provider** | Teal | `#2B9E9E` | The bridge outward. Cool, technical, directional |
| **Tool** | Emerald | `#2D8B5F` | Capability. Green = "go do something." Practical, active |
| **Hook** | Rose | `#C4556A` | The observer. Reactive, event-driven, the "listener at the edge" |

Forms a **warm-to-cool spectrum** mirroring flow from internal (Context/amber) through central (Orchestrator/signal) to external (Provider/teal, Tool/emerald), with Hook (rose) as cross-cutting observer.

### Card Treatment (Replacing the Table)

Replace `DocTable` in Modules section 02 with **stacked card system** - one card per module type. Vertical stack, full reading-column width.

Each card contains:
- **Left icon**: 48x48 rounded square in module color at 10% opacity with geometric SVG symbol
- **Color accent**: Left border in module color (3px)
- **Title line**: Module name in Syne, uppercase, module color. Slot path in mono on right
- **Description**: One sentence, human terms (not full protocol)
- **Key method**: Inline code chip showing primary signature
- **Metadata**: Slot type + required status

### The Five Icons - SVG Line Drawings

2px stroke, rendered in module color. Minimal. Geometric. Should feel like Chladni nodal patterns frozen at a specific resonance - abstract mathematical forms, not pictographic illustrations.

- **Orchestrator**: Circle with rotating path - orbit or feedback loop. Single continuous stroke
- **Context**: Three horizontal lines with slight offset - stacked conversation turns
- **Provider**: Arrow emerging from circle - directional, outbound, "the bridge"
- **Tool**: Hexagon - evokes capability slot
- **Hook**: Diamond with radiating lines - matches existing diamond thread indicator

---

## II. Chladni Particles in Documentation

### Recommendation: Hero Vignette Only

Use particles exclusively in doc hero sections at dramatically reduced intensity.

**Configuration per page:**

| Page | n, m | Color | Opacity | Size | Rationale |
|---|---|---|---|---|---|
| The Core | 2, 3 | `#8578F0` | 0.15 | 1.0px | Simple resonance - kernel is minimal |
| The Modules | 3, 5 | `#8578F0` | 0.18 | 1.0px | More complex - five types creating richer interference |
| The Foundation | 5, 7 | `#8578F0` | 0.15 | 1.0px | Dense, woven - bundles composing many pieces |

**Critical constraints:**
- `opacity: 0.15-0.18` max (homepage goes to 0.65 - we want ~25% of that)
- `strength: 0.05-0.08` (very gentle - particles drift, not snap)
- Signal-light purple only
- **Static** - no scroll-driven transitions within hero
- **NOT** in reading body, section dividers, or code blocks

### Where NOT to Use Particles

- Not in reading body (legibility disaster)
- Not as section dividers (existing short-rule is perfect)
- Not in code blocks (maximum clarity needed)

---

## III. Diagrams - Replace ASCII with SVGs

### Replace These ASCII Diagrams

| Location | Current | Replace With |
|---|---|---|
| Modules section 02 (five protocols table) | DocTable | Stacked module identity cards |
| Core section 02 (initialize flow) | ASCII tree | SVG flow diagram |
| Core section 03 (execute flow) | ASCII tree | SVG flow diagram |
| Foundation section 02 (prepare flow) | ASCII tree | SVG flow diagram |
| Foundation section 03 (create_session) | ASCII tree | SVG flow diagram |
| Foundation section 04 (architecture) | Large ASCII | SVG architecture diagram |
| Modules section 03 (discovery strategies) | ASCII tree | SVG branching diagram |

### New Diagrams to Create

**Core section 01 - Session Lifecycle Diagram (new)**
Horizontal timeline: Initialize > Mount Modules > Execute > (loop) > Cleanup
Visual first, code second.

**Modules section 04 - Mounting Flow (new)**
Vertical stepper: connected-dot timeline with discover > validate > mount > ready

**Foundation section 06 - Decision Diagram (new)**
"Do You Need Foundation?" as a decision flow tree

### Diagram Visual Language

- Stroke-based, not filled (1.5-2px lines in ink-fog)
- Signal purple for emphasis/active states only
- Module colors when referencing specific types
- Canvas background
- Rounded rectangles with 8px radius
- JetBrains Mono for code text, Epilogue for labels
- No drop shadows
- Render at doc-breakout width (880px max)

---

## IV. Visual Punctuation for Reading Mode

### 1. Section Number Enhancement
- Larger: `clamp(2rem, 4vw, 3rem)` in Syne
- Color: `rgba(91,77,227, 0.08)` - ghosted signal purple
- Creates deliberate pause before each section

### 2. Callout Variants (Extend DocNote)

| Variant | Border Color | Tint | Use Case |
|---|---|---|---|
| **Note** (existing) | Signal purple | Light purple | Cross-references, source links |
| **Insight** (new) | Amber `#D4923B` | Warm cream | "Why this matters" moments |
| **Warning** (new) | Rose `#C4556A` | Faint rose | Gotchas, common mistakes |

### 3. Pull Quotes
- For the single most important sentence per section
- Break out slightly (720px vs 680px)
- Syne font at headline size, signal purple text
- Thin top/bottom border, used sparingly (max one per section, not every section)
- Example: *"A session is the runtime. Everything else is configuration."*

### 4. Inline Method Signature Highlighting
- For protocol-defining methods only: `complete()`, `execute()`, etc.
- Background: `rgba(91,77,227,0.06)`
- Border: `1px solid rgba(91,77,227,0.10)`
- Slightly more padding than standard inline code

---

## V. Landing Page Visual Enrichment

### Five Module Cards
Adopt same module identity system (colors + geometric icons)
On hover: card's left border pulses in module color

### "Three Needs" Dark Sections
Strongest candidates for Chladni on landing page:
- Unique preset per section (different n,m)
- Higher opacity (0.3-0.4 range)
- These are transitions - particles make the pause feel alive

### Ghost Numbers
Keep the 01, 02, 03 ghost numbers. Consider adding faint Chladni-derived texture within the ghost number itself.

---

## VI. Code Block Replacement Principle

**Keep code when the reader will type something like it.**
**Replace with diagrams when the purpose is to communicate structure or relationships.**

### Keep as Code

| Location | Why |
|---|---|
| Modules section 01 "What a Module Looks Like" | Real Tool class code |
| Core section 04 "Coordinator's Slots" | Literal code reader will encounter |
| Foundation section 01 opening code | Real Bundle > prepare > session usage |
| Foundation section 05 "Composition" | Real API chain |

---

## VII. Implementation Priority

| # | Item | Impact | Effort |
|---|---|---|---|
| 1 | Five module type cards (modules section 02) | Highest | Medium |
| 2 | Chladni hero vignettes (all 3 doc pages) | High | Low |
| 3 | Section number enhancement | Medium | Low (CSS only) |
| 4 | Callout variants (Insight, Warning) | Medium | Low |
| 5 | Architecture SVG (foundation section 04) | High | Medium |
| 6 | Flow diagram SVGs (core sections 02, 03) | Medium | Medium |
| 7 | Pull quote treatment | Low-medium | Low |
| 8 | Decision flow diagram (foundation section 06) | Medium | Medium |
| 9 | Landing page module card colors | Medium | Low |
| 10 | Discovery strategy diagram (modules section 03) | Lower | Medium |

---

## The Result

When complete, a developer navigating from homepage to docs experiences:

1. **Homepage**: Full Chladni particles, theatrical rhythm
2. **Developer landing**: Marketing energy, module identity colors introduced
3. **Doc hero**: Particles at whisper volume - "same world, lights dimmed for reading"
4. **Doc body**: Clean surface with three kinds of visual punctuation: code blocks (dark, real code), diagrams (light SVGs, structure), module identity cards (colored, reference)
5. **Scanning**: Section numbers, module colors, pull quotes let returning developers find what they need without reading linearly

*Mollie's structural work is the foundation all of this builds on. This direction adds the visual layer that makes the pages feel finished, memorable, and unmistakably Amplifier.*
