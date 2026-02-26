# Voice & Tone Review: Developer Pages

**Reviewer:** design-intelligence-enhanced:voice-strategist
**Date:** 2026-02-26

---

## Overall Assessment

**Doc pages (Core, Modules, Foundation): 8/10** - Strong. Read like a thoughtful senior engineer explaining architecture.

**Landing page (/developers): 6/10** - Solid structure, but copy drifts into generic developer-marketing voice. Needs one focused copy pass (~90 min of work).

---

## Priority 1: "Understand it. Use it. Make it yours."

### Why It Doesn't Work

It's a **slogan pretending to be wayfinding**. The three-part parallel structure borrows cadence from taglines ("Think different," "Just do it.") but this section is navigation. Developers need to know what's behind each door.

The progression is artificial:
- "Understand it" = link cards to Core/Modules/Foundation docs (reference material)
- "Use it" = links to Hooks API, Provider contract, Orchestrator contract (hands-on experimentation)
- "Make it yours" = code blocks for building an app and writing recipes (building)

The headings sound catchy. The content says something different. Mismatch between sizzle and steak.

**"Make it yours" is a cliche.** Every SaaS product on earth uses it.

**"The Experimental Layer" eyebrow is confusing.** "Experimental" means something very specific to developers (alpha/unstable) - that's not what's intended here.

### Recommended Alternatives

**Option A - Honest labels (recommended):**

| Current | Proposed |
|---|---|
| Eyebrow: "The Experimental Layer" | **"Start Here"** or **"Going Deeper"** |
| "Understand it" | **"The architecture"** |
| "Use it" | **"Hands-on"** |
| "Make it yours" | **"Build something"** |

Sub-descriptions:
- The architecture: "Three layers. Read how each one works."
- Hands-on: "Swap a module. Inject a hook. See what changes."
- Build something: "Wire the kernel into your app. Automate with recipes."

**Option B - Verb-forward, same rhythm:**

| Current | Proposed |
|---|---|
| "Understand it. Use it. Make it yours." | **"Read the architecture. Try the pieces. Build your app."** |

**Option C - Reframe entirely:**

> **"Three ways in."**

or

> **"Where to start depends on how you learn."**

---

## Priority 2: Code Block Density

**Current: 8 code blocks on landing page. Recommended: 4-5.**

### Keep

| # | Section | Why |
|---|---|---|
| 1 | Hero install command | The #1 thing developers want |
| 2 | Composability YAML | The "aha" moment - full module stack in YAML |
| 3 | Control hook (Python) | Shows real code with "Don't block - teach" comment. Philosophy through code |
| 6 | Python session | Shows the core API in action |

### Cut or Rethink

| # | Section | Why |
|---|---|---|
| 4 | Shareability YAML | Makes same point as #2. Replace with prose + diff-style highlight |
| 5 | Provider protocol | Already on Modules doc page. Competing for attention here |
| 7 | YAML recipe | Two side-by-side code blocks in Stage 3 - neither lands. Move to Recipes page |
| 8 | CTA install (repeat) | Repeating hero feels like page ran out of things to say |

---

## Priority 3: Hero Copy

**Current:**
> Build AI Your Way / with Amplifier
> Compose your modules. Control the details. Share with others.

**Issues:**
- "Build AI Your Way" is generic - "Your Way" is vacuous
- "Share with others" is filler - share what with whom?

**Recommended rewrite:**
> Build AI agents you can see inside, take apart, and share.
> *A modular kernel. Protocol-based modules. Composable bundles.*

or staying closer to current:

> Compose AI agents from modules. Control every behavior. Share your setup as a bundle.

Key move: replace the abstract ("Your Way") with the concrete ("modules," "every behavior," "as a bundle").

---

## Priority 4: Specific Copy Fixes

### Composability callout
**Current:** "Modules let you easily swap out or plug in new functionality."
**Fix:** "Every capability is a module - providers, tools, context, orchestration. Swap one line of config. The rest stays."
(Drop "easily." Drop "new functionality." Name the actual things.)

### Control callout
**Current:** "Get specific on the details that optimize your agent behaviors."
**Fix:** "Run different models per agent, in parallel. Inject context mid-conversation. Control the loop itself - not just what goes into it."
(The current version is the worst sentence on the page - says nothing.)

### Shareability callout
**Current:** "Share your work and they can easily customize it."
**Fix:** "Your teammate includes your bundle and overrides what's different. One line to inherit everything. One line to change the provider."

### "Five module types" sub-line
**Current:** "Implement the Protocol contract. The kernel treats your module identically to any official one."
**Fix:** "Implement the protocol. The kernel can't tell yours from an official module."

### Stage 3 description
**Current:** "Build your own application with exactly the modules you need. Automate your workflows. Share with your team."
**Fix:** "Wire the kernel into your own app. Automate multi-step work with recipes. Share your setup as a bundle your team can extend."
(Replace SaaS cliches with Amplifier-specific language.)

### CTA
**Current:** "Try a reference implementation. The Amplifier CLI."
**Fix:** "The Amplifier CLI. Install it and run your first agent in under a minute."

---

## Doc Pages: Quick Notes

**Core page** - Nearly flawless voice. "It provides mechanisms - never opinions" is great writing.

**Modules page** - "That's it. No `class MyTool(BaseTool)`. No `@register_tool` decorator. Just a class with the right shape." Perfect Amplifier voice.

**Foundation page** - "The kernel doesn't know Foundation exists. It just sees a resolver in its slot and uses it." Great line. The "Do You Need Foundation?" section builds trust by telling you when NOT to use it.

---

## Summary Priority List

| Priority | Issue | Fix |
|---|---|---|
| 1 | "Understand it. Use it. Make it yours." | Rename to honest labels |
| 2 | "The Experimental Layer" eyebrow | Change to "Start Here" or "Going Deeper" |
| 3 | "Get specific on the details..." | Rewrite entirely |
| 4 | Cut code blocks from 8 to 4-5 | Remove #4, #5, #7, #8 |
| 5 | "Build AI Your Way" hero | Replace with capability-first headline |
| 6 | "easily" (appears 2x) | Delete both |
| 7 | Generic phrases throughout | Replace with Amplifier-specific language |
| 8 | "different intelligence" | Change to "different model" |
| 9 | CTA "reference implementation" | Lead with action, not architecture terminology |
