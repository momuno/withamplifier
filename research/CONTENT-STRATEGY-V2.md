# Content Strategy v2

Synthesis of learnings from site analyses: Stripe, Linear, Anthropic, Vercel, amplifier.dev.ai

---

## Core Principle

**withamplifier.com is THE official presence for Amplifier.**

Everything users need to understand, explore, learn, and get support should be here or clearly linked from here to official GitHub repos.

---

## User Types & Journeys

### 1. The Curious ("What is this?")

**Entry point**: Homepage, word of mouth, search
**Questions**: What does it do? Why should I care? Is it for me?
**Needs**: Vision, value prop, quick understanding
**Exit**: Either leaves or becomes Explorer

**Content needed**:
- Clear headline that captures the essence
- Problem/solution framing
- Visual demonstration of value
- Low-friction path to try it

### 2. The Explorer ("Show me more")

**Entry point**: Homepage CTA, direct link to Explore
**Questions**: What can I build? What exists? How does it work?
**Needs**: Browse capabilities, see examples, understand ecosystem
**Exit**: Either leaves or becomes Builder

**Content needed**:
- Bundle browser with real examples
- Demo/playground capability
- Showcase of what's been built
- Community contributions visible

### 3. The Builder ("I'm ready to use this")

**Entry point**: Explore page, direct link to Build
**Questions**: How do I install? How do I configure? What are the commands?
**Needs**: Step-by-step guidance, reference docs, examples
**Exit**: Becomes active user, returns for reference

**Content needed**:
- Installation instructions
- Quick start guide
- Command reference
- Provider setup guides
- Bundle creation guide (eventually)

### 4. The Contributor ("I want to extend this")

**Entry point**: Build page, GitHub
**Questions**: How do I create a bundle? How do I add modules? Where do I contribute?
**Needs**: Architecture understanding, contribution guidelines, examples
**Exit**: Creates and shares work

**Content needed**:
- Bundle authoring guide
- Module development guide
- Contribution guidelines
- Community showcase

### 5. The Stuck ("Something's wrong")

**Entry point**: Support page, search
**Questions**: Why isn't this working? Where do I get help?
**Needs**: FAQ, troubleshooting, community access
**Exit**: Problem solved or escalated

**Content needed**:
- FAQ (common issues)
- Troubleshooting guides
- Community links (Discussions)
- Bug reporting path

---

## Page Mapping

| Page | Primary User | Secondary Users | Core Job |
|------|--------------|-----------------|----------|
| **Home** | Curious | All | Communicate vision, spark interest |
| **Explore** | Explorer | Builder, Contributor | Show what's possible, browse ecosystem |
| **Build** | Builder | Contributor | Enable success with the product |
| **Updates** | All | - | Keep community informed |
| **Support** | Stuck | All | Resolve problems, connect community |

---

## Content Gaps Identified

### Home Page
- [x] Vision/value prop (exists but needs refinement)
- [ ] Social proof (who's using it, what they've built)
- [ ] Clearer "what is it" for different audiences

### Explore Page
- [ ] Complete bundle catalog (auto-generate from ecosystem)
- [ ] Provider catalog (Anthropic, OpenAI, Azure, Ollama, Gemini, Bedrock, vLLM)
- [ ] Agent catalog (50+ agents exist)
- [ ] Community showcase (apps, extensions)
- [ ] Interactive demo/playground

### Build Page
- [ ] Provider-specific setup guides
- [ ] Bundle creation tutorial
- [ ] Common patterns cookbook
- [ ] CLI command reference
- [ ] Configuration reference

### Support Page
- [ ] Expanded FAQ
- [ ] Troubleshooting guides
- [ ] Migration guides (if applicable)

---

## Auto-Generation Opportunities

Learn from catalog.json approach - scan GitHub repos and generate:

1. **Bundle catalog**
   - Name, description, what it includes
   - Source: Parse bundle.md files from ecosystem repos

2. **Provider list**
   - Name, models supported, setup command
   - Source: Provider module repos

3. **Agent catalog**
   - Name, description, when to use
   - Source: Agent .md files from bundles

4. **Module catalog** (for Build/advanced users)
   - Type, name, description
   - Source: Module repos

5. **Community contributions**
   - Apps built with Amplifier
   - Community bundles
   - Source: GitHub topics/search + manual curation

### Implementation approach
- GitHub Action that runs on schedule
- Outputs JSON data files
- Next.js reads at build time or via API
- Content stays fresh automatically

---

## Learnings by Source

### From Stripe
- Progressive disclosure (overview → details)
- Code examples front and center
- Clear navigation hierarchy

### From Linear
- Confidence in voice ("the way you want")
- Minimal, focused messaging
- Speed/quality positioning

### From Anthropic
- Research-backed credibility
- Thoughtful, considered tone
- Clear capability communication

### From Vercel
- Developer-centric language
- "Ship" action orientation
- Framework/ecosystem integration clarity

### From amplifier.dev.ai
- Auto-generation from source repos works
- Ecosystem is larger than we're showing
- Technical reference has value (but shouldn't be primary)

---

## Terminology (Canonical)

| Use This | Not This | Notes |
|----------|----------|-------|
| Bundle | Profile, Collection | Bundle is the current, correct term |
| Provider | - | LLM backends |
| Tool | - | Agent capabilities |
| Hook | - | Lifecycle observers |
| Agent | - | Specialized personas within bundles |
| Module | - | Generic term for Provider/Tool/Hook/etc |

---

## Next Steps

1. **Refine Home page** - Headline work, clearer value prop
2. **Expand Explore page** - Add provider list, more bundles, community section
3. **Enhance Build page** - Provider setup guides, better command reference
4. **Plan auto-generation** - Spec out what to auto-generate, implementation approach

---

## Open Questions

1. Should Explore have sub-pages (Bundles, Providers, Agents) or single scrolling page?
2. How much technical depth on the marketing site vs GitHub docs?
3. Do we need a dedicated "Docs" section separate from Build?
4. How do we handle versioning as Amplifier evolves?
