# Chladni Pattern Background System

## Status: In Development

**Last Updated:** 2026-01-21
**Current Phase:** Building proof of concept

---

## Concept

A scroll-driven background where particles reorganize into Chladni resonance patterns as users navigate through sections. Each section has a unique "frequency" that creates a distinct geometric pattern, with smooth transitions between states.

### Inspiration
- Ernst Chladni's acoustic experiments (1787)
- Particles collect at nodal lines (zero vibration points)
- Pattern complexity increases with frequency

### Core Equation
```
cos(n*PI*x/L) * cos(m*PI*y/L) - cos(m*PI*x/L) * cos(n*PI*y/L) = 0
```
Where n,m are integers controlling pattern complexity.

---

## Section-to-Pattern Mapping

| Section | Content | Pattern | Metaphor | Color |
|---------|---------|---------|----------|-------|
| Hero | "Build AI your way" | Chaos→(1,2) | Potential forming | Indigo 30% |
| Differentiation | "One runtime. Any model." | (2,3) | 3 pillars | Signal glow 60% |
| Platform | "Everything you need" | (3,4) | 4 capabilities | Indigo 40% |
| Demo | "See it in action" | (3,5) | Dynamic action | Violet 35% |
| Bundles | "Package it as a bundle" | (4,4) | Contained, unified | Indigo 25% |
| Impact | "Control that compounds" | (4,6) | Growth/expansion | Amber glow 50% |
| Contrast | "Most AI tools..." | (2,2) | Simple clarity | Indigo 30% |
| Ecosystem | "Start with what works" | (5,6) | Network/community | Violet 40% |
| CTA | "60 seconds" | (6,6) | Resolution/harmony | Signal glow 70% |

---

## Technical Approach

### Architecture
```
┌─────────────────────────────────────┐
│         RENDERING LAYER             │
│  Canvas 2D (fallback) / WebGL       │
└─────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────┐
│          PHYSICS LAYER              │
│  - Chladni force field (grid)       │
│  - Cursor influence field           │
│  - Velocity/damping system          │
│  - Pattern interpolation            │
└─────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────┐
│        INTERACTION LAYER            │
│  - IntersectionObserver (sections)  │
│  - Pointer events (cursor)          │
│  - Lerped transitions               │
└─────────────────────────────────────┘
```

### Performance Targets
- Desktop: 60fps, 1000-1500 particles
- Mobile: 30fps, 300-500 particles
- Reduced motion: Static pattern at low opacity

### Key Features
1. Full-page background (runs throughout site)
2. Color adapts to section background (light/dark)
3. All 6 pattern complexity levels
4. Cursor influence (gentle particle repulsion)
5. Smooth transitions between sections (~1.5s)

---

## Files

- `/components/ChladniBackground.tsx` - Main component
- `/hooks/useChladniPattern.ts` - Pattern physics
- `/lib/chladni.ts` - Math utilities

---

## Research References

- 21st.dev fluid-particle (WebGL particles)
- 21st.dev smooth-wavy-canvas (scroll-driven)
- 21st.dev neural-noise-cursor (cursor tracking)
- Chladni equation implementations (academic)

---

## Open Questions

- [ ] Exact particle count for balance
- [ ] Transition timing feel
- [ ] Mobile touch interaction behavior
