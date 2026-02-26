# Content Operations Guide

**Purpose:** Define how we create, review, and publish content across all Amplifier channels.

**Audience:** Contributors (internal team, community members, partners)

**Last Updated:** 2026-02-26

---

## Table of Contents

1. [Content Tier Model](#content-tier-model)
2. [Contributor Workflow](#contributor-workflow)
3. [Quality Gates](#quality-gates)
4. [External Content (GitHub Blog)](#external-content-github-blog)
5. [Brand Consistency](#brand-consistency)
6. [Cross-Linking Strategy](#cross-linking-strategy)

---

## Content Tier Model

We organize content by **audience intent** and **quality requirements**, not by format or location.

### Tier 1: Marketing & Brand

**Purpose:** Convert prospects, communicate value proposition, establish brand identity

**Audience:** 
- Prospective users discovering Amplifier
- Decision-makers evaluating the platform
- Partners considering integration

**Content Types:**
- Home page hero sections
- Product overview content
- Value proposition messaging
- Brand storytelling

**Quality Bar:**
- Premium visual design
- On-brand voice and tone
- Mobile-responsive
- Accessibility compliant (WCAG AA)
- Performance optimized

**Approval Flow:**
1. Draft → Alex review (brand/strategy)
2. Design review (if visual changes)
3. Merge to main
4. Deploys automatically via GitHub Pages

**Examples on Site:**
- Home page (`/`)
- Hero sections
- Marketing copy

---

### Tier 2: User-Focused Content

**Purpose:** Enable specific user types to understand and use Amplifier effectively

**Audience:**
- Developers evaluating or adopting Amplifier
- Users learning specific features
- Contributors understanding architecture

**Content Types:**
- Landing pages for user types (e.g., `/developers`)
- Feature explanation pages
- Getting started guides
- Architecture overviews

**Quality Bar:**
- Accurate and current (reflects actual product state)
- Clear structure (scannable, progressive disclosure)
- Code examples work as-is
- Links resolve correctly
- Consistent with design system

**Approval Flow:**
1. Draft → PR with description
2. Technical accuracy review (verify code examples, links)
3. Content review (clarity, structure)
4. Alex approval
5. Merge to main

**Examples on Site:**
- `/developers` landing page (Mollie's PR #4)
- `/developers/core`, `/developers/modules`, `/developers/foundation` (deep-dive pages)

**Note:** This tier targets specific user types but does NOT encompass all developer documentation. Comprehensive API references, module specs, and technical deep-dives live in the main amplifier-core and amplifier-foundation repos.

---

### Tier 3: Community Stories

**Purpose:** Showcase community creations, share case studies, inspire adoption

**Audience:**
- Current users looking for inspiration
- Prospective users seeing what's possible
- Community members sharing work

**Content Types:**
- Presentation decks (HTML)
- Project showcases
- Case studies
- Tool announcements

**Quality Bar:**
- Functional (decks render correctly)
- On-brand (transformed via CSS overrides)
- Categorized appropriately
- Links back to withamplifier.com

**Approval Flow:**
- **Automated:** Synced from `ramparte/amplifier-stories` via GitHub Actions
- Runs every 6 hours (`sync-decks.yml`)
- CSS transformations applied automatically
- Manual spot-checks as needed

**Examples on Site:**
- `/stories` page (filterable deck grid)
- Individual presentation decks in `public/stories/decks/`

**Current Count:** 91+ decks syncing automatically

---

### Tier 4: External Partner Content

**Purpose:** Thought leadership, reach broader audience, drive traffic back to withamplifier.com

**Audience:**
- Broader tech community
- GitHub blog readers
- Industry analysts and thought leaders

**Content Types:**
- Guest blog posts (GitHub blog)
- Case studies for partner sites
- Conference talk materials
- Co-created content

**Quality Bar:**
- Professional writing quality
- Accurate technical content
- Links back to withamplifier.com resources
- Aligns with Amplifier messaging

**Handoff Process (GitHub Blog via Nathan):**
1. **We create:** Draft content in Google Docs or Markdown
2. **We send to:** Nathan (GitHub blog team contact)
3. **They create:** Final post on GitHub blog (their design, their publish flow)
4. **We ensure:** Links back to withamplifier.com are included in draft
5. **We track:** Published URL and add to our content index

**What We Control:**
- Draft content we send
- Requested back-links

**What We Don't Control:**
- Final post design
- Publish date
- GitHub blog editorial changes

---

## Contributor Workflow

### For Internal Team Members (Direct Commit Access)

**For small changes (typos, link fixes, copy edits):**
```bash
# Make changes directly on main
git checkout main
git pull origin main
# ... make edits ...
git add .
git commit -m "fix: correct typo in hero section"
git push origin main
# Deploys automatically
```

**For new content or significant changes:**
```bash
# Create feature branch
git checkout -b content/add-developers-page
# ... make changes ...
git add .
git commit -m "feat: add developers landing page and deep-dive docs"
git push origin content/add-developers-page
# Create PR for review
gh pr create --title "feat: add developers page" --body "..."
```

### For Community Contributors (Fork & PR)

1. Fork `anderlpz/withamplifier`
2. Create feature branch
3. Make changes
4. Submit PR with clear description
5. Wait for review
6. Address feedback
7. Merge (maintainer will merge)

---

## Quality Gates

### Pre-Merge Checklist (All Tiers)

Before merging any content PR, verify:

- [ ] **Renders correctly** - Check on desktop, tablet, mobile
- [ ] **Links work** - No 404s, no broken anchors
- [ ] **Code examples work** - If including code, verify it runs
- [ ] **Accessible** - Screen reader friendly, keyboard navigable
- [ ] **On-brand** - Uses design system colors, fonts, spacing
- [ ] **Performance** - No massive images, reasonable load time
- [ ] **Cross-links added** - Related content links to other pages

### Tier-Specific Checklists

**Tier 1 (Marketing):**
- [ ] Brand voice consistent with existing marketing pages
- [ ] Call-to-action clear and compelling
- [ ] Visual hierarchy guides user attention
- [ ] Mobile experience exceptional (not just functional)

**Tier 2 (User-Focused Content):**
- [ ] Technical accuracy verified by someone who knows the code
- [ ] Code examples copy-pasteable and working
- [ ] Navigation between related pages works
- [ ] Back-links to main site sections included

**Tier 3 (Community Stories):**
- [ ] Deck transformations applied (CSS overrides injected)
- [ ] Category assigned correctly
- [ ] "More Amplifier Stories" link present
- [ ] Deck renders without errors

**Tier 4 (External Partner Content):**
- [ ] Draft reviewed by Alex before sending to partner
- [ ] Requested back-links to withamplifier.com included in draft
- [ ] Track published URL once live

---

## External Content (GitHub Blog)

### Process for GitHub Blog Posts (via Nathan)

**Step 1: Planning**
- Identify topic and angle
- Confirm with Nathan that topic fits GitHub blog editorial calendar
- Rough outline approved

**Step 2: Drafting**
- Write in Google Docs or Markdown
- Include technical accuracy (code examples, architecture diagrams)
- **Include requested back-links** to relevant withamplifier.com pages:
  - "Learn more at [withamplifier.com/developers](https://withamplifier.com/developers)"
  - "Get started: [withamplifier.com](https://withamplifier.com)"
  - Contextual links where natural

**Step 3: Internal Review**
- Alex reviews for accuracy, messaging, brand alignment
- Technical review if includes code or architecture

**Step 4: Handoff to Nathan**
- Send final draft to Nathan
- Include any image assets or diagrams
- Specify requested back-links clearly
- Note: Nathan and GitHub blog team will finalize design and publish

**Step 5: Post-Publish**
- Track published URL
- Add to content index
- Share on social/community channels
- Consider creating companion content on withamplifier.com that links to blog post

### What to Include in Every External Content Draft

```markdown
---
REQUESTED BACK-LINKS (for Nathan/editor):

1. "Learn more about Amplifier at [withamplifier.com](https://withamplifier.com)"
2. "Read the full developer guide: [withamplifier.com/developers](https://withamplifier.com/developers)"
3. [Any other contextually relevant links]

Please include these links in the published version if editorially appropriate.
---

[Your content here...]
```

---

## Brand Consistency

### Visual Identity

**Logo:**
- Stylized ampersand (&) with radiating flourishes
- File: `/Users/alexlopez/Library/CloudStorage/OneDrive-Microsoft/Desktop/AmplifierAppIcon.jpg`
- Usage: Cream/off-white on deep black for maximum contrast

**Color System:**
- **Signal:** `#5B4DE3` (violet blue) - primary brand color
- **Canvas:** `#FDFCFA` (warm off-white) - background
- **Ink:** `#1A1A1A` (near black) - primary text
- See `tailwind.config.js` for complete palette

**Typography:**
- **Headings:** Syne (font-weight 600)
- **Body:** Epilogue
- **Code:** JetBrains Mono

**See Also:**
- `research/BRAND-STYLE-SYNTHESIS.md` - Detailed brand direction
- `AGENTS.md` - Current brand state and decisions

### Voice and Tone

**Marketing content (Tier 1):**
- Confident but not arrogant
- Technical but not jargon-heavy
- Visionary but grounded in reality
- "You AND AI" - partnership, not replacement

**User-focused content (Tier 2):**
- Clear and direct
- Code-first (show, then explain)
- Assume reader is technical
- Respect their time

**Community stories (Tier 3):**
- Authentic voice of creator
- Showcase outcomes, not features
- Inspire without overpromising

---

## Cross-Linking Strategy

### Internal Links (withamplifier.com → withamplifier.com)

**Every page should link to:**
- Home page (via logo in navigation)
- At least 2 related pages contextually
- Call-to-action (GitHub repo, Get Started, etc.)

**Example patterns:**

From marketing pages:
- → `/developers` (for technical users)
- → `/stories` (for inspiration)
- → GitHub repo (for immediate action)

From `/developers`:
- → Home (for context)
- → `/stories` (for examples in practice)
- → Specific deep-dive pages

From `/stories`:
- → `/developers` (to learn more)
- → Home (for newcomers)
- → Individual decks (from card grid)

### External Links (Other sites → withamplifier.com)

**When we control the content (GitHub blog drafts):**

Include these linking patterns:
```markdown
Learn more: [withamplifier.com/developers](https://withamplifier.com/developers)

Get started: [withamplifier.com](https://withamplifier.com)

[Contextual topic] at [withamplifier.com/stories](https://withamplifier.com/stories)
```

**When we don't control the content (community posts):**
- Suggest linking patterns
- Provide short URLs if helpful
- Don't demand - community content is authentic

---

## Quick Reference

### I'm a contributor. Where does my content go?

| What I'm Creating | Tier | Process |
|-------------------|------|---------|
| New landing page (e.g., `/developers`) | Tier 2 | PR with review |
| Hero section copy changes | Tier 1 | PR with Alex review |
| New presentation deck | Tier 3 | Add to ramparte/amplifier-stories, auto-syncs |
| Typo fix | Any | Direct commit to main (if trusted) or PR |
| Blog post for GitHub | Tier 4 | Draft → Alex review → send to Nathan |

### I found a broken link. What do I do?

**If you have commit access:** Fix it directly on main branch
```bash
git checkout main
git pull
# fix link
git commit -m "fix: update broken link in stories page"
git push
```

**If you don't have access:** Open an issue or PR with the fix

### I have a new deck to share. Where does it go?

Add HTML file to `ramparte/amplifier-stories` repo in the `docs/` folder. The sync workflow will pull it into withamplifier.com automatically within 6 hours.

Alternatively, trigger manual sync:
1. Go to `.github/workflows/sync-decks.yml`
2. Click "Run workflow"
3. Decks sync immediately

---

## Contact

**For questions about:**
- Brand/strategy: Alex
- External content (GitHub blog): Alex → Nathan
- Technical content accuracy: [Identify tech reviewers]
- Design system: [Identify design owner]

**For issues:**
- Open issue on [anderlpz/withamplifier](https://github.com/anderlpz/withamplifier/issues)
- Label appropriately: `content`, `bug`, `enhancement`, etc.

---

*This guide is a living document. Update it as processes evolve.*
