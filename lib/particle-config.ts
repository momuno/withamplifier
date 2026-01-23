// Particle configuration based on design strategy
// See: .design/PARTICLE-COLOR-STRATEGY.md

export interface ParticlePattern {
  n: number
  m: number
  strength: number
  color: string
  opacity: number
  particleSize: number
  transitionDuration: number
  transitionEasing: string
  prominence: 'subtle' | 'medium' | 'prominent' | 'subtle-medium'
  label: string
}

export const PARTICLE_SECTIONS: Record<string, ParticlePattern> = {
  hero: {
    n: 3,
    m: 5,
    strength: 0.5,
    color: '#00D67D', // Soft brand green
    opacity: 0.4,
    particleSize: 2,
    transitionDuration: 0, // Entry state
    transitionEasing: 'ease-in-out',
    prominence: 'subtle',
    label: 'Hero - Dynamic Potential',
  },
  problem: {
    n: 7,
    m: 9,
    strength: 0.7,
    color: '#CC3333', // Muted red
    opacity: 0.5,
    particleSize: 2,
    transitionDuration: 800,
    transitionEasing: 'ease-in-out',
    prominence: 'medium',
    label: 'Problem - Trapped in Chains',
  },
  differentiation: {
    n: 2,
    m: 5,
    strength: 0.6,
    color: '#00C4E8', // Bright cyan - CLIMAX
    opacity: 0.7,
    particleSize: 2.5, // Emphasis at climax
    transitionDuration: 400, // Distinct shift
    transitionEasing: 'ease-out',
    prominence: 'prominent',
    label: 'Differentiation - Breaking Free',
  },
  platform: {
    n: 4,
    m: 6,
    strength: 0.65,
    color: '#6B2FC7', // Refined purple
    opacity: 0.5,
    particleSize: 2,
    transitionDuration: 1000,
    transitionEasing: 'ease-in-out',
    prominence: 'medium',
    label: 'Platform - Organized Power',
  },
  demo: {
    n: 1,
    m: 3,
    strength: 0.5,
    color: '#8B8B8B', // Neutral gray
    opacity: 0.25, // Nearly invisible - code is hero
    particleSize: 2,
    transitionDuration: 1200, // Deliberate retreat
    transitionEasing: 'ease-in',
    prominence: 'subtle',
    label: 'Demo - Grounded Foundation',
  },
  bundles: {
    n: 5,
    m: 7,
    strength: 0.7,
    color: '#A68BB5', // Muted mauve
    opacity: 0.45,
    particleSize: 2,
    transitionDuration: 1000,
    transitionEasing: 'ease-out',
    prominence: 'subtle-medium',
    label: 'Bundles - Refined Elegance',
  },
}

// Scroll trigger thresholds
export const TRANSITION_TRIGGERS = {
  startThreshold: 0.2, // Begin transition at 20% viewport
  completeThreshold: 0.4, // Complete transition at 40% viewport
}

// Mobile adjustments
export const MOBILE_ADJUSTMENTS = {
  opacityReduction: 0.1, // Reduce opacity by 0.1
  particleSizeReduction: 0.5, // 1.5px instead of 2px
  transitionSpeedup: 200, // Reduce durations by 200ms
}

// Section IDs matching homepage layout
export const SECTION_IDS = [
  'hero',
  'problem',
  'differentiation',
  'platform',
  'demo',
  'bundles',
] as const

export type SectionId = (typeof SECTION_IDS)[number]
