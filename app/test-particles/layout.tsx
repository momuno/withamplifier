import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Particle Test Lab',
  description: 'Test environment for Chladni particle effects',
}

export default function TestParticlesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
