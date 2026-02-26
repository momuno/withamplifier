# Developer Documentation Detail Pages — Layout Specification

**Pages:** `/developers/core`, `/developers/modules`, `/developers/foundation`
**Date:** 2025-02-25
**Status:** Design specification

---

## User's Spark (preserved)

> Deep-dive documentation pages that a developer clicks into from card links
> on the main /developers page. Reading-optimized, code-first, scannable but
> sequential. Back to /developers, prev/next between the 3 pages.

## Our Interpretation

These are the first **reading-mode** pages on withamplifier.com. Everything
else on the site is marketing — alternating light/dark sections designed
for scanning and selling. These pages serve a fundamentally different purpose:
a developer has committed to learning and needs a calm, focused environment
to read technical prose and study code examples.

The key tension: **feel like the same site** (shared visual language, fonts,
colors) but **optimized for sustained reading** (no alternating section drama,
no full-viewport heroes, no selling).

### Primary User Tasks

1. Read and understand a technical concept sequentially
2. Study code examples carefully (copy them, reference them)
3. Scan headings to find a specific subsection
4. Navigate between the three related pages in order
5. Jump back to the developers overview

---

## Layout Strategy: The Reading Shift

The marketing pages use **theatrical rhythm** — alternating dark/light
sections, full-viewport heroes, dramatic spacing. Documentation pages
use **reading rhythm** — a single calm surface, consistent typography,
and code blocks as the primary visual punctuation.

### What Changes from Marketing Pages

| Aspect | Marketing Pages | Documentation Pages |
|--------|----------------|-------------------|
| Background | Alternating section-dark / section-light-glow | Single light surface, dark hero only at top |
| Sections | data-theme toggles, dramatic spacing | Subtle dividers, reading-paced spacing |
| Hero | Full viewport, display-xl | Compact, display-size, quick entry to content |
| Code blocks | Supporting illustration | Primary content, first-class citizens |
| Containers | Varies per section | Consistent reading width + code breakout |
| Animation | Heavy reveal on scroll | Minimal — content is already the destination |

### What Stays the Same

- Fixed Navigation header (64px, theme-adaptive)
- Footer component
- Font stack: Syne headings, Epilogue body, JetBrains Mono code
- Color palette: canvas, ink, signal, depth
- Card styling vocabulary (rounded-2xl, border-canvas-mist)
- Code block styling (.code-block class)

---

## Page Structure (Top to Bottom)

```
┌─────────────────────────────────────────────────┐
│  Fixed Navigation (64px)                        │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌─ HERO (section-dark) ─────────────────────┐  │
│  │  Breadcrumb                               │  │
│  │  Page number · Eyebrow                    │  │
│  │  Title (text-display)                     │  │
│  │  Lead paragraph                           │  │
│  │  Source link                              │  │
│  └───────────────────────────────────────────┘  │
│                                                 │
│  ┌─ CONTENT (light, reading mode) ──────────┐  │
│  │                                           │  │
│  │  ┌─ Inline TOC (mobile) ──────────────┐  │  │
│  │  │  On This Page: clickable sections  │  │  │
│  │  └───────────────────────────────────-┘  │  │
│  │                                           │  │
│  │  ┌─ Reading Grid ────────────────────┐   │  │
│  │  │                                   │   │  │
│  │  │  Prose (680px)    Sticky TOC      │   │  │
│  │  │  ════════════     (desktop)       │   │  │
│  │  │  ┌─ Code ────────────┐            │   │  │
│  │  │  │  (breakout wider) │            │   │  │
│  │  │  └───────────────────┘            │   │  │
│  │  │  Prose (680px)                    │   │  │
│  │  │  ════════════                     │   │  │
│  │  │  ┌─ Table ───────────┐            │   │  │
│  │  │  │  (breakout wider) │            │   │  │
│  │  │  └───────────────────┘            │   │  │
│  │  │  ...                              │   │  │
│  │  └──────────────────────────────────-┘   │  │
│  │                                           │  │
│  └───────────────────────────────────────────┘  │
│                                                 │
│  ┌─ PREV/NEXT NAV ──────────────────────────┐  │
│  │  [← Previous Page]    [Next Page →]       │  │
│  └───────────────────────────────────────────┘  │
│                                                 │
│  Footer                                         │
└─────────────────────────────────────────────────┘
```

---

## Section 1: Hero

**Purpose:** Orient the reader — where am I, what will I learn, how do I
get back. Compact by documentation standards. The drama is brief; the
content is the destination.

**Background:** `section-dark` with `data-theme="dark"` (reuses existing
dark section pattern — Navigation auto-adapts to light text).

**Container:** `container-default` (980px)

**Height:** Content-driven, NOT full-viewport. Approximately 320-400px
including padding.

**Padding:** `pt-32 pb-16` (128px top to clear header + breathe, 64px bottom)

### Hero Content Stack

```
Breadcrumb:     Developers → The Core
                text-caption (14px), canvas-mist color
                "Developers" links back to /developers

Page indicator: 01 of 03
                text-caption, signal color, font-mono
                Provides sequence context across the three pages

Title:          The Core
                text-display (clamp 32-80px), canvas color
                Syne font, font-weight 600

Lead:           2-3 sentences describing what this page covers.
                text-body-large (clamp 17-21px), canvas-mist color
                max-width: 680px (reading width even in wider container)

Source link:    View source on GitHub →
                text-caption, signal color, inline GitHub icon (16px)
                Links to the relevant amplifier-core directory
```

### Hero Layout (CSS)

```css
.doc-hero {
  padding-top: 128px;   /* clear fixed nav + breathe */
  padding-bottom: 64px;
}

.doc-hero .doc-breadcrumb {
  margin-bottom: 24px;
}

.doc-hero .doc-page-indicator {
  margin-bottom: 16px;
}

.doc-hero .doc-title {
  margin-bottom: 24px;
}

.doc-hero .doc-lead {
  max-width: 680px;
  margin-bottom: 24px;
}
```

---

## Section 2: Reading Content Area

**This is the core of the layout.** Everything below the hero lives on a
single light surface — no alternating themes, no section drama. The visual
rhythm comes from the content itself: prose, code blocks, tables, diagrams.

**Background:** `bg-canvas` (#FDFCFA), `data-theme="light"`

**Padding:** `pt-16 pb-24` (64px top, 96px bottom)

### The Breakout Grid

The fundamental layout technique: a CSS Grid that centers prose at reading
width (680px) but allows code blocks and tables to "break out" wider. This
avoids negative margins and works cleanly on all screen sizes.

```css
.doc-grid {
  display: grid;
  grid-template-columns:
    1fr
    min(680px, calc(100% - 48px))  /* reading column */
    1fr;
}

/* All content defaults to reading column */
.doc-grid > * {
  grid-column: 2;
}

/* Code blocks, tables, diagrams break out wider */
.doc-grid > .doc-breakout {
  grid-column: 1 / -1;
  max-width: min(880px, calc(100% - 48px));
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}
```

**Why 880px for breakout?** JetBrains Mono at 14px fits ~100 characters
at 880px. Python code with 4-space indentation commonly runs 80-100 chars.
This gives comfortable room without overwhelming the reading flow. The
200px difference from prose width (680→880) creates a subtle but clear
"this is different" signal.

### Desktop: Sticky TOC in Right Margin

On screens wide enough (≥1200px), a table of contents floats in the right
margin alongside the reading column. It uses the grid's right `1fr` track.

```css
@media (min-width: 1200px) {
  .doc-grid {
    grid-template-columns:
      1fr
      min(680px, calc(100% - 48px))
      280px;
    column-gap: 48px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .doc-toc {
    grid-column: 3;
    grid-row: 1 / -1;    /* span all rows */
    position: sticky;
    top: 96px;            /* 64px header + 32px breathing room */
    align-self: start;
    max-height: calc(100vh - 128px);
    overflow-y: auto;
  }

  /* Breakout items stay in columns 1-2, don't collide with TOC */
  .doc-grid > .doc-breakout {
    grid-column: 1 / 3;
    max-width: 880px;
  }
}
```

### Mobile/Tablet: Inline TOC

Below 1200px, the TOC renders inline at the top of the content area,
inside a collapsible disclosure element.

```html
<details class="doc-toc-inline">
  <summary>On this page</summary>
  <nav aria-label="Table of contents">
    <ol>
      <li><a href="#session-lifecycle">Session Lifecycle</a></li>
      <li><a href="#coordinator-slots">Coordinator Slots</a></li>
      ...
    </ol>
  </nav>
</details>
```

**Styling:**
- Border: 1px solid canvas-mist, rounded-xl
- Background: canvas-warm (#FAF8F5)
- Padding: 16px 20px
- Summary: text-caption weight-600, ink color
- Links: text-body-sm (15px), ink-slate, 8px vertical spacing
- Active link: signal color, font-weight 500

---

## Section Headers (Subsection Pattern)

Each of the 4-6 subsections within a page follows this pattern:

### Visual Separation Between Sections

```css
.doc-section {
  padding-top: 64px;
  position: relative;
}

/* Subtle divider above each section (except first) */
.doc-section + .doc-section::before {
  content: '';
  display: block;
  width: 100%;
  max-width: 200px;
  height: 1px;
  background: var(--canvas-mist);
  margin-bottom: 64px;
}
```

**Why short dividers (200px, not full-width)?** Full-width rules feel
heavy and bureaucratic. A short centered rule says "new topic" without
creating a wall. It's a pause, not a barrier.

### Section Header Stack

```html
<section id="session-lifecycle" class="doc-section">
  <span class="doc-section-number">01</span>
  <h2 class="doc-section-title">
    Session Lifecycle
    <a href="#session-lifecycle" class="doc-anchor" aria-label="Link to this section">#</a>
  </h2>
  <p class="doc-section-lead">
    Every Amplifier interaction begins with a Session...
  </p>
</section>
```

**Typography:**

| Element | Style | Size |
|---------|-------|------|
| Section number | font-mono, signal color, text-caption (14px) | Provides scannable sequence |
| Section title (h2) | Syne, font-weight 600 | clamp(24px, 4vw, 36px) — smaller than text-headline |
| Section lead | text-body-large, ink-slate | Optional 1-2 sentence intro |
| Anchor link | text-ink-fog, opacity 0 → 1 on h2 hover | # symbol, transition 200ms |

**The section number** (01, 02, 03...) gives readers a progress signal.
When scanning the page, the numbers create a clear "I'm at step 3 of 5"
feeling. These use JetBrains Mono to differentiate from prose.

### Subsection Headers (h3)

Within a section, h3 headers mark sub-topics:

```css
.doc-content h3 {
  font-family: var(--font-heading); /* Syne */
  font-weight: 600;
  font-size: clamp(18px, 3vw, 24px);
  color: var(--ink);
  margin-top: 48px;
  margin-bottom: 16px;
}
```

No numbers, no dividers. Just size and spacing differentiation from h2.

---

## Code Block Treatment

Code blocks are **the primary content** on these pages. They need to feel
prominent, readable, and easy to interact with.

### Standard Code Block

```html
<div class="doc-breakout doc-code-wrapper">
  <div class="doc-code-header">
    <span class="doc-code-label">session_config.py</span>
    <CopyButton />
  </div>
  <pre><code class="code-block">...</code></pre>
</div>
```

**Layout:**
- Uses `.doc-breakout` to expand to 880px
- Margin: 32px top, 32px bottom (breathing room from prose)

**The code header bar:**
- Background: `var(--depth-obsidian)` (#0a0a0a) — slightly darker than the code block
- Padding: 10px 20px
- Border-radius: 12px 12px 0 0 (top corners only)
- Left: filename or description label
- Right: copy button (existing CopyButton component)

**The code body:**
- Uses existing `.code-block` class
- Background: `var(--depth-charcoal)` (#171717)
- Border-radius: 0 0 12px 12px (bottom corners only, connects to header)
- Padding: 24px
- Font: JetBrains Mono, 14px, line-height 1.7
- Horizontal scroll on overflow (NOT wrapping — code structure matters)

```css
.doc-code-wrapper {
  margin: 32px 0;
  border-radius: 12px;
  overflow: hidden;
}

.doc-code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: var(--depth-obsidian);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.doc-code-label {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--ink-fog);
  font-weight: 500;
}

.doc-code-wrapper .code-block {
  border-radius: 0; /* override — wrapper handles radius */
  margin: 0;
}
```

### The Progressive Code Thread

The same config dict evolves across all three pages. These "thread" code
blocks get a visual indicator that links them:

```html
<div class="doc-breakout doc-code-wrapper doc-code-thread">
  <div class="doc-code-header">
    <span class="doc-code-label">
      <span class="doc-thread-indicator">◆</span>
      The Config Dict — adding provider slots
    </span>
    <CopyButton />
  </div>
  <pre><code class="code-block">...</code></pre>
</div>
```

**Thread indicator styling:**
- Left border: 3px solid signal (#5B4DE3) on the entire code wrapper
- Diamond icon (◆) in signal color before the label
- Label uses a slightly more descriptive format: "The Config Dict — [what's new]"

```css
.doc-code-thread {
  border-left: 3px solid var(--signal);
}

.doc-thread-indicator {
  color: var(--signal);
  margin-right: 6px;
}
```

This way, a reader scanning the page can spot the purple-bordered code
blocks and know "this is the evolving example I should follow."

### Inline Code

Uses existing `.code-inline` styling:
- Background: canvas-stone (#F5F3F0)
- Padding: 2px 6px
- Border-radius: 4px
- JetBrains Mono, 14px
- Color: ink

---

## ASCII Flow Diagrams

These are treated as code blocks with a distinct presentation:

```html
<div class="doc-breakout doc-diagram-wrapper">
  <div class="doc-code-header">
    <span class="doc-code-label">Session Lifecycle Flow</span>
  </div>
  <pre class="doc-diagram"><code>
  ┌──────────┐     ┌──────────┐     ┌──────────┐
  │ init()   │────▶│ execute()│────▶│ cleanup() │
  └──────────┘     └──────────┘     └──────────┘
  </code></pre>
</div>
```

**How diagrams differ from code blocks:**
- Same dark background (depth-charcoal)
- Same header bar pattern
- **No copy button** (diagrams aren't meant to be copied as code)
- **Centered text** within the pre block (diagrams look better centered)
- Slightly larger font: 15px (box-drawing characters need room)
- No line numbers

```css
.doc-diagram {
  font-family: var(--font-mono);
  font-size: 15px;
  line-height: 1.5;
  color: #E8E8E6;
  background: var(--depth-charcoal);
  padding: 32px 24px;
  overflow-x: auto;
  white-space: pre;
  text-align: center;
}
```

---

## Table Treatment

Tables appear on the Modules page (5 protocol types) and possibly as
quick-reference summaries. They need to feel native to the design system.

### Standard Reference Table

```html
<div class="doc-breakout doc-table-wrapper">
  <table class="doc-table">
    <thead>
      <tr>
        <th>Module Type</th>
        <th>Protocol</th>
        <th>Purpose</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code class="code-inline">Provider</code></td>
        <td>...</td>
        <td>...</td>
      </tr>
    </tbody>
  </table>
</div>
```

**Styling:**

```css
.doc-table-wrapper {
  margin: 32px 0;
  overflow-x: auto;            /* horizontal scroll on mobile */
  -webkit-overflow-scrolling: touch;
  border: 1px solid var(--canvas-mist);
  border-radius: 12px;
}

.doc-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 15px;
  line-height: 1.6;
}

.doc-table thead {
  background: var(--canvas-warm);  /* FAF8F5 — warm cream */
}

.doc-table th {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--ink-fog);
  padding: 12px 20px;
  text-align: left;
  border-bottom: 1px solid var(--canvas-mist);
}

.doc-table td {
  padding: 14px 20px;
  color: var(--ink);
  border-bottom: 1px solid var(--canvas-mist);
  vertical-align: top;
}

.doc-table tbody tr:last-child td {
  border-bottom: none;
}

/* Subtle alternating rows for scannability */
.doc-table tbody tr:nth-child(even) {
  background: rgba(249, 248, 246, 0.5);  /* very subtle warm */
}
```

**Key decisions:**
- Rounded outer wrapper (12px) with overflow hidden
- No inner cell borders (only bottom borders) — cleaner
- Header uses eyebrow-style typography (uppercase, tracked, small)
- Warm cream header background ties to the canvas-warm palette
- Horizontal scroll wrapper for mobile (table content should NOT reflow)

---

## Source Links to GitHub

Three levels of source linking:

### 1. Page-Level Source Link (in hero)

```html
<a href="https://github.com/..." class="doc-source-link">
  <svg><!-- GitHub icon 16px --></svg>
  View source on GitHub
  <svg><!-- arrow icon --></svg>
</a>
```

```css
.doc-source-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--signal);
  transition: opacity 200ms;
}

.doc-source-link:hover {
  opacity: 0.8;
}
```

### 2. Code Block Source Reference (optional per-block)

When a code example comes from a specific file in the repo:

```html
<div class="doc-code-header">
  <span class="doc-code-label">coordinator.py</span>
  <div class="doc-code-actions">
    <a href="https://github.com/..." class="doc-code-source"
       title="View in repository">
      <svg><!-- external link icon 14px --></svg>
    </a>
    <CopyButton />
  </div>
</div>
```

The source icon sits next to the copy button — subtle, 14px, ink-fog color,
signal on hover. It's there if you want it, invisible if you don't.

### 3. Inline Source Reference

In prose, when referencing a specific file:

```html
<a href="https://github.com/..." class="doc-inline-source">
  <code class="code-inline">session.py</code>
  <svg><!-- tiny external link icon 12px --></svg>
</a>
```

Inline code styling + small external link icon. Opens in new tab.

---

## Navigation: Breadcrumb + Prev/Next

### Breadcrumb (in hero)

```html
<nav aria-label="Breadcrumb" class="doc-breadcrumb">
  <a href="/developers">Developers</a>
  <span aria-hidden="true">→</span>
  <span aria-current="page">The Core</span>
</nav>
```

```css
.doc-breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  margin-bottom: 24px;
}

.doc-breadcrumb a {
  color: var(--canvas-mist);
  text-decoration: none;
  transition: color 200ms;
}

.doc-breadcrumb a:hover {
  color: var(--canvas);
}

.doc-breadcrumb span[aria-hidden] {
  color: var(--ink-fog);
}

.doc-breadcrumb span[aria-current] {
  color: var(--canvas);
  font-weight: 500;
}
```

### Prev/Next Navigation (bottom of page)

Two cards side-by-side (or stacked on mobile) that link to the adjacent
pages in the three-page sequence.

```html
<nav aria-label="Documentation pages" class="doc-pagination">
  <!-- Previous (empty on first page) -->
  <a href="/developers/core" class="doc-pagination-card doc-pagination-prev">
    <span class="doc-pagination-direction">← Previous</span>
    <span class="doc-pagination-label">The Core</span>
  </a>

  <!-- Next (empty on last page) -->
  <a href="/developers/foundation" class="doc-pagination-card doc-pagination-next">
    <span class="doc-pagination-direction">Next →</span>
    <span class="doc-pagination-label">The Foundation</span>
  </a>
</nav>
```

**Page sequence:**
```
The Core (01) → The Modules (02) → The Foundation (03)
```

- The Core: no prev, next = The Modules
- The Modules: prev = The Core, next = The Foundation
- The Foundation: prev = The Modules, no next (or link back to /developers)

```css
.doc-pagination {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  max-width: 880px;        /* same as breakout width */
  margin: 80px auto 0;
  padding: 0 24px;
}

.doc-pagination-card {
  display: flex;
  flex-direction: column;
  padding: 24px;
  border: 1px solid var(--canvas-mist);
  border-radius: 16px;      /* rounded-2xl */
  background: var(--canvas);
  text-decoration: none;
  transition: all 300ms;
}

.doc-pagination-card:hover {
  border-color: rgba(91, 77, 227, 0.2);
  box-shadow: 0 4px 20px rgba(91, 77, 227, 0.08);
  transform: translateY(-2px);
}

.doc-pagination-prev {
  align-items: flex-start;  /* text-align left */
}

.doc-pagination-next {
  align-items: flex-end;    /* text-align right */
}

.doc-pagination-direction {
  font-size: 13px;
  font-weight: 500;
  color: var(--signal);
  margin-bottom: 4px;
  font-family: var(--font-mono);
}

.doc-pagination-label {
  font-family: var(--font-heading);
  font-size: 18px;
  font-weight: 600;
  color: var(--ink);
}

/* Mobile: stack vertically */
@media (max-width: 640px) {
  .doc-pagination {
    grid-template-columns: 1fr;
  }

  .doc-pagination-next {
    align-items: flex-start;
  }
}
```

---

## Prose Typography

Within the reading content area, prose needs documentation-specific
typography rules:

```css
.doc-content p {
  font-size: clamp(16px, 1.5vw, 18px);  /* slightly larger than standard body */
  line-height: 1.75;                      /* generous for technical reading */
  color: var(--ink);
  margin-bottom: 24px;
}

.doc-content p + p {
  margin-top: 0;  /* margin-bottom handles spacing */
}

/* Lists */
.doc-content ul,
.doc-content ol {
  padding-left: 24px;
  margin-bottom: 24px;
}

.doc-content li {
  font-size: clamp(16px, 1.5vw, 18px);
  line-height: 1.75;
  margin-bottom: 8px;
  color: var(--ink);
}

.doc-content li::marker {
  color: var(--ink-fog);
}

/* Strong emphasis */
.doc-content strong {
  font-weight: 600;
  color: var(--ink);
}

/* Links in prose */
.doc-content a {
  color: var(--signal);
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-color: rgba(91, 77, 227, 0.3);
  transition: text-decoration-color 200ms;
}

.doc-content a:hover {
  text-decoration-color: var(--signal);
}

/* Blockquotes for callouts/notes */
.doc-content blockquote {
  border-left: 3px solid var(--signal);
  padding: 16px 24px;
  margin: 32px 0;
  background: rgba(91, 77, 227, 0.04);
  border-radius: 0 8px 8px 0;
}

.doc-content blockquote p {
  font-size: 15px;
  color: var(--ink-slate);
  margin-bottom: 0;
}
```

---

## Animation Strategy

Documentation pages use **minimal animation**. The reader has already
committed to this content — reveal animations that delay content feel
like obstacles, not delights.

**What gets animated:**
- Hero content: single `.reveal` on the entire hero stack (one fade-up, not staggered per element)
- Prev/next cards: `.reveal` as they scroll into view
- That's it.

**What does NOT get animated:**
- Reading content sections (no reveal delays on prose)
- Code blocks (already visible as you scroll)
- Tables
- TOC

The reasoning: on marketing pages, reveals create drama and guide
attention. On documentation pages, the content IS the experience.
Don't make people wait for it.

---

## Mobile Considerations

### Breakpoints and Adaptations

| Breakpoint | Layout Change |
|-----------|---------------|
| ≥ 1200px | Reading column + sticky TOC in right margin |
| 980–1199px | Reading column centered, no TOC in margin, inline TOC only |
| 640–979px | Full-width content with padding, code blocks scroll horizontally |
| < 640px | Compact padding, stacked prev/next, simplified spacing |

### Mobile-Specific Rules

```css
/* Code blocks: horizontal scroll, NOT text wrap */
@media (max-width: 640px) {
  .doc-code-wrapper {
    margin-left: -20px;    /* bleed to edges for max code width */
    margin-right: -20px;
    border-radius: 0;      /* full-bleed, no rounded corners */
  }

  .doc-code-header {
    border-radius: 0;
  }

  .code-block {
    font-size: 13px;        /* slightly smaller on mobile */
  }
}

/* Tables: horizontal scroll with fade hint */
@media (max-width: 640px) {
  .doc-table-wrapper {
    margin-left: -20px;
    margin-right: -20px;
    border-radius: 0;
    position: relative;
  }

  /* Right fade hint suggesting scrollability */
  .doc-table-wrapper::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 32px;
    background: linear-gradient(to right, transparent, var(--canvas));
    pointer-events: none;
  }
}

/* Spacing reduction */
@media (max-width: 640px) {
  .doc-hero {
    padding-top: 96px;     /* less top padding */
    padding-bottom: 48px;
  }

  .doc-section {
    padding-top: 48px;
  }

  .doc-section + .doc-section::before {
    margin-bottom: 48px;
  }
}
```

**Key mobile decisions:**
1. Code blocks bleed to screen edges (maximum code width)
2. Code NEVER wraps — horizontal scroll preserves structure
3. Tables also bleed with a fade gradient hinting at scroll
4. Prev/next cards stack vertically
5. TOC is inline and collapsible
6. Section spacing tightens (64px → 48px)

---

## Shared Layout Component

All three pages share the same structure. Create `app/developers/layout.tsx`
for shared elements, and individual page files for content.

### File Structure

```
app/developers/
  page.tsx                  # Existing developers overview (marketing)
  layout.tsx                # Shared layout for sub-pages (NOT applied to page.tsx)
  core/
    page.tsx                # The Core content
  modules/
    page.tsx                # The Modules content
  foundation/
    page.tsx                # The Foundation content
```

**Important:** The shared layout should NOT affect the existing
`/developers` page (page.tsx). The Next.js App Router applies layout.tsx
to all children including the current route's page.tsx. To avoid this,
use a route group:

```
app/developers/
  page.tsx                  # /developers — marketing page (no doc layout)
  (docs)/
    layout.tsx              # Shared doc layout (hero structure, TOC, pagination)
    core/
      page.tsx              # /developers/core
    modules/
      page.tsx              # /developers/modules
    foundation/
      page.tsx              # /developers/foundation
```

The `(docs)` route group applies the doc layout without affecting the URL
structure. `/developers/core` still works, but the layout only wraps the
three doc pages.

### What the Shared Layout Provides

- `data-theme` attributes for Navigation color adaptation
- Common page shell (hero wrapper + content grid + pagination wrapper)
- Scroll-based TOC active state management (IntersectionObserver on section headings)
- Schema/metadata patterns

### What Each Page Provides

- Hero content (title, lead, page number, source link)
- All reading content (sections, code blocks, tables)
- Page-specific metadata

---

## Semantic HTML Structure

```html
<!-- Full page structure -->
<div class="pt-16">  <!-- clear fixed nav -->

  <!-- HERO -->
  <section class="section-dark doc-hero" data-theme="dark">
    <div class="container-default">
      <nav aria-label="Breadcrumb" class="doc-breadcrumb">...</nav>
      <p class="doc-page-indicator">01 of 03</p>
      <h1 class="text-display">The Core</h1>
      <p class="doc-lead text-body-large">...</p>
      <a class="doc-source-link" href="...">View source on GitHub</a>
    </div>
  </section>

  <!-- CONTENT -->
  <div class="bg-canvas" data-theme="light">
    <div class="doc-grid" style="padding-top: 64px; padding-bottom: 96px;">

      <!-- Inline TOC (mobile/tablet) -->
      <details class="doc-toc-inline">...</details>

      <!-- Article content -->
      <article class="doc-content" aria-label="Documentation">

        <section id="session-lifecycle" class="doc-section">
          <span class="doc-section-number">01</span>
          <h2>Session Lifecycle</h2>
          <p>Prose content...</p>

          <div class="doc-breakout doc-code-wrapper">
            <div class="doc-code-header">
              <span class="doc-code-label">config.py</span>
              <CopyButton />
            </div>
            <pre><code class="code-block">...</code></pre>
          </div>

          <p>More prose...</p>
        </section>

        <section id="coordinator-slots" class="doc-section">
          <span class="doc-section-number">02</span>
          <h2>Coordinator Slots</h2>
          ...
        </section>

      </article>

      <!-- Sticky TOC (desktop) -->
      <aside class="doc-toc" aria-label="Table of contents">
        <p class="doc-toc-heading">On this page</p>
        <nav>
          <ol>
            <li><a href="#session-lifecycle">Session Lifecycle</a></li>
            <li><a href="#coordinator-slots">Coordinator Slots</a></li>
          </ol>
        </nav>
      </aside>

    </div>
  </div>

  <!-- PAGINATION -->
  <div class="bg-canvas" data-theme="light">
    <nav aria-label="Documentation pages" class="doc-pagination">
      ...
    </nav>
  </div>

</div>
```

### ARIA and Accessibility Checklist

- [x] Breadcrumb uses `aria-label="Breadcrumb"` and `aria-current="page"`
- [x] Main article uses `<article>` with `aria-label`
- [x] TOC uses `<aside>` with `aria-label="Table of contents"`
- [x] Pagination uses `<nav>` with `aria-label="Documentation pages"`
- [x] All sections have `id` attributes for anchor linking
- [x] Anchor links have `aria-label` describing their purpose
- [x] Code blocks are in `<pre><code>` (proper semantics)
- [x] Tables use `<thead>` and `<th>` for proper header association
- [x] Tab order follows reading order (breadcrumb → content → TOC → pagination)
- [x] Skip link recommended: "Skip to content" before hero
- [x] Focus styles visible on all interactive elements (browser defaults plus signal-colored ring)

---

## Sticky TOC Behavior

The desktop TOC tracks scroll position and highlights the current section:

```css
.doc-toc {
  font-size: 14px;
  line-height: 1.5;
}

.doc-toc-heading {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--ink-fog);
  margin-bottom: 16px;
}

.doc-toc ol {
  list-style: none;
  padding: 0;
  margin: 0;
  border-left: 1px solid var(--canvas-mist);
}

.doc-toc li a {
  display: block;
  padding: 6px 0 6px 16px;
  color: var(--ink-slate);
  text-decoration: none;
  transition: all 200ms;
  border-left: 2px solid transparent;
  margin-left: -1px;  /* overlap the ol border */
}

.doc-toc li a:hover {
  color: var(--ink);
}

.doc-toc li a.active {
  color: var(--signal);
  border-left-color: var(--signal);
  font-weight: 500;
}
```

**JavaScript behavior:** IntersectionObserver watches each `<section>` heading.
When a heading crosses into the top 20% of the viewport, its corresponding
TOC link gets the `.active` class. This reuses the same Observer pattern
already in the codebase for `.reveal` elements.

---

## Visual Summary: Spacing Rhythm

```
Hero padding-top:           128px (96px mobile)
Hero padding-bottom:         64px (48px mobile)
Content padding-top:         64px
Between sections:            64px padding + 1px divider (48px mobile)
Between h2 and first p:      16px
Between paragraphs:          24px
Code block margin:           32px top/bottom
Table margin:                32px top/bottom
Between h3 and content:      16px
Pagination top margin:       80px
Content padding-bottom:      96px
```

This creates a consistent vertical rhythm where the 8px base unit
(8, 16, 24, 32, 48, 64, 80, 96, 128) governs all spacing decisions.

---

## How We Applied Craft to YOUR Vision

| Your Spark | Our Structure |
|-----------|--------------|
| "Reading-optimized" | 680px prose width (optimal 60-75 chars), 1.75 line-height, Epilogue at 16-18px |
| "Code blocks are first-class" | Breakout grid (680→880px), labeled header bars, progressive thread indicator |
| "Clear hierarchy" | Section numbers, short dividers, generous spacing, sticky TOC |
| "Navigation breadcrumb" | Dark hero breadcrumb + page sequence indicator (01 of 03) |
| "Prev/next between pages" | Card-style pagination with hover lift, matching site card vocabulary |
| "Cohesive with marketing site" | Same color palette, fonts, card styling — but shifted to reading rhythm |
| "Progressive disclosure" | Scannable (section numbers + TOC + dividers) yet reads sequentially |
| "ASCII flow diagrams" | Diagram variant of code blocks — centered, slightly larger mono, no copy button |
| "Reference tables" | Breakout-width tables with warm header, rounded wrapper, mobile scroll |
| "Source links to GitHub" | Three tiers: hero-level, code-block-level, inline prose links |

---

## Implementation Notes

### New CSS Required

All doc-specific styles should be added to `globals.css` under a clearly
commented documentation section. Estimated additions: ~200 lines of CSS.

### New Components Needed

1. **DocHero** — Hero section with breadcrumb, title, lead, source link
2. **DocTOC** — Sticky sidebar + inline collapsible variants
3. **DocCodeBlock** — Wrapper extending existing CodeBlock with header/label
4. **DocTable** — Table wrapper with breakout and mobile scroll
5. **DocDiagram** — ASCII diagram variant of code block
6. **DocPagination** — Prev/next card navigation
7. **DocSection** — Section wrapper with number, anchor, divider

### Route Structure

Use `(docs)` route group to scope the shared layout:
```
app/developers/(docs)/layout.tsx
app/developers/(docs)/core/page.tsx
app/developers/(docs)/modules/page.tsx
app/developers/(docs)/foundation/page.tsx
```

### Update Needed on /developers Page

The three "Understand It" cards (lines ~529-614 in `app/developers/page.tsx`)
currently link to external GitHub URLs. Update `href` values to:
- `/developers/core`
- `/developers/modules`
- `/developers/foundation`

---

## Success Criteria

- [ ] Developer can read a full page comfortably without eye fatigue
- [ ] Code examples are wide enough for 80+ char lines without wrapping
- [ ] Scanning the page via headings gives a clear content outline
- [ ] TOC tracks position accurately on desktop
- [ ] Prev/next navigation makes the 3-page sequence obvious
- [ ] Mobile code blocks scroll horizontally (never wrap)
- [ ] Tables are readable on mobile with scroll hint
- [ ] Page feels like withamplifier.com, not a different site
- [ ] Lighthouse accessibility score ≥ 95
- [ ] All ARIA landmarks present and correct