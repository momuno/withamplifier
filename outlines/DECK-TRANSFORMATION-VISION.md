# Deck Transformation Vision

**Date:** 2026-02-26  
**Context:** Post-review of PR #4 (reading mode documentation)

---

## The Insight

The "reading mode" pattern introduced in `/developers` docs could be extended to transform all presentation deck content into dual-mode experiences.

## Current State

**Decks are presentation-only:**
- HTML slides (Reveal.js style)
- Optimized for presenting, not reading
- 91+ decks in `/stories` and content in `/learn`
- Auto-synced from `ramparte/amplifier-stories`

## Vision: Dual-Mode Content

Transform each deck into **reading mode + presentation mode** with export options.

### User Journey

```
Story card → Landing page (reading mode)
                ├─ "Present" button → Opens in presentation mode (current deck experience)
                ├─ "Download" button → Export as PDF/Markdown
                └─ Reading mode: Long-form article with same content
```

### Reading Mode Format

- Same content as presentation slides
- Reformatted as sequential long-form article
- Uses doc page pattern from `/developers`
- Code examples become `DocCodeBlock` components
- Diagrams stay but with better layout
- Navigation between related stories

### Presentation Mode

- Current deck experience preserved
- Opens in modal/new window/fullscreen
- Reveal.js controls work as expected
- Optimized for presenting to audience

### Export Options

**PDF:**
- Traditional format (though feels "like faxing" as noted)
- Good for offline reading, printing, sharing via email
- Generated from reading mode layout

**Markdown:**
- Developer-friendly format
- Easy to copy, modify, share in repos
- Can be opened in any text editor
- Version control friendly

**Alternative: Web Archive / Offline HTML**
- Modern alternative to PDF
- Preserves interactivity
- Lighter weight than PDF

---

## Technical Approach

### Phase 1: Manual Transformation (Proof of Concept)

1. Pick 1-2 representative decks
2. Create reading mode versions manually
3. Add mode toggle UI pattern
4. Test with users

### Phase 2: Automated Transformation

1. Build deck parser (HTML → structured data)
2. Create reading mode renderer (structured data → DocComponents)
3. Build export pipeline (structured data → PDF/Markdown)
4. Apply to all decks in sync workflow

### Phase 3: Authoring Experience

1. Create unified authoring format (write once, publish both modes)
2. Update amplifier-stories repo workflow
3. Contributors write in markdown, system generates both modes

---

## Content Tier Implications

This would blur the line between Tier 2 (User-Focused Content) and Tier 3 (Community Stories).

**Hybrid model:**
- Stories remain Tier 3 (community-created, auto-synced)
- Reading mode transformation is Tier 2 (structured, accessible, SEO-friendly)
- Presentation mode stays Tier 3 (authentic creator voice, visual storytelling)

---

## Benefits

**For readers:**
- Choose consumption mode (present vs read)
- Better SEO (reading mode is crawlable)
- Offline access (download)
- Accessibility (reading mode easier for screen readers)

**For creators:**
- More reach (dual distribution)
- More formats without extra work
- Better preservation (markdown exports)

**For withamplifier.com:**
- More content surfaces for SEO
- Richer user experience
- Demonstrates Amplifier's transformation capabilities (meta!)

---

## Open Questions

1. **PDF generation:** Server-side (Puppeteer) or client-side (browser print)?
2. **Markdown fidelity:** How to preserve diagrams, animations?
3. **Authoring format:** Do we ask contributors to change workflows?
4. **Storage:** Where do reading mode versions live? (Generate on-demand vs pre-generate)
5. **URL structure:** `/stories/deck-name` (reading) vs `/stories/deck-name/present` (presentation)?

---

## Next Steps (When Ready)

1. Review this vision with team
2. Pick pilot deck for manual transformation
3. Design dual-mode UI/UX
4. Build proof of concept
5. Evaluate feasibility of automation

---

*This is a long-term vision. The immediate priority is merging PR #4 and establishing the reading mode pattern for Tier 2 content.*
