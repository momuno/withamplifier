'use client'

import Link from 'next/link'
import { BlackBoxSection } from '@/components/BlackBoxSection'
import ChladniWebGLTest from '@/components/ChladniWebGLTest'
import { PARTICLE_SECTIONS } from '@/lib/particle-config'

export default function TestBlackBox() {
  return (
    <div className="bg-[var(--surface-elevated)]">
      {/* Particle background - locked to problem/chainlink pattern */}
      <ChladniWebGLTest params={PARTICLE_SECTIONS.problem} />
      {/* Spacer - scroll down to reach the cinematic section */}
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-headline text-ink mb-4">Scroll down</h1>
          <p className="text-body-large text-ink-muted">The cinematic experience begins below</p>
          <p className="mt-4 text-body text-ink-muted">Your scroll controls the narrative</p>
        </div>
      </div>

      {/* The scroll-captured cinematic section */}
      <BlackBoxSection />

      {/* Next section - matches homepage differentiation */}
      <section className="section-feature section-gradient-flow">
        <div className="container-default">
          <div className="text-center">
            <h2 className="text-headline text-on-dark">
              Amplifier is open by design.
            </h2>
            <p className="mt-4 text-body-large text-on-dark-secondary max-w-2xl mx-auto" style={{textWrap: 'balance'}}>
              Transparent components you can inspect, modify, and recombine. When the system is designed for builders instead of consumers, you get tools that work the way you&nbsp;think.
            </p>
          </div>
        </div>
      </section>

      {/* Another section to continue scrolling */}
      <section className="section-feature bg-[var(--surface-elevated)]">
        <div className="container-default">
          <div className="text-center">
            <h2 className="text-headline text-ink">
              More content below
            </h2>
            <p className="mt-4 text-body-large text-ink-muted max-w-2xl mx-auto">
              This demonstrates the full scroll experience with capture and release.
            </p>
          </div>
        </div>
      </section>

      {/* Back link */}
      <div className="fixed bottom-4 left-4 z-50">
        <Link href="/" className="text-on-dark-secondary hover:text-on-dark text-sm transition-colors bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm">
          ← Back to home
        </Link>
      </div>
    </div>
  )
}
