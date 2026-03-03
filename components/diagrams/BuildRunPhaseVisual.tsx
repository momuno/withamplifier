'use client'

import { useState } from 'react'

/**
 * BuildRunPhaseVisual
 *
 * Purpose: Communicate the "invest in building, deploy for less" value prop.
 * Two phases side-by-side: Build (rich, heavy, frontier) and Run (lightweight,
 * efficient, deployed) — connected by the same bundle powering both.
 *
 * Integration: Works on both light and dark sections. The component adapts
 * its background treatment. Place inside .container-wide.
 */

const COLORS = {
  build: '#8B5CF6',        // Rich purple for build phase
  buildLight: '#A78BFA',
  buildSoft: 'rgba(139, 92, 246, 0.08)',
  buildGlow: 'rgba(139, 92, 246, 0.18)',
  run: '#10B981',          // Efficient green for run phase
  runLight: '#34D399',
  runSoft: 'rgba(16, 185, 129, 0.08)',
  runGlow: 'rgba(16, 185, 129, 0.18)',
  bundle: '#5B4DE3',       // Signal violet for the bundle bridge
  bundleGlow: 'rgba(91, 77, 227, 0.2)',
}

/* ─── Phase Box ─── */

function PhaseBox({
  x, y, width, height, phase, isHovered, onHover,
}: {
  x: number; y: number; width: number; height: number
  phase: 'build' | 'run'; isHovered: boolean
  onHover: (phase: string | null) => void
}) {
  const isBuild = phase === 'build'
  const color = isBuild ? COLORS.build : COLORS.run
  const colorLight = isBuild ? COLORS.buildLight : COLORS.runLight
  const colorSoft = isBuild ? COLORS.buildSoft : COLORS.runSoft

  const title = isBuild ? 'Build' : 'Run'
  const subtitle = isBuild ? 'Experiment & iterate' : 'Deploy & scale'

  const items = isBuild
    ? [
        { label: 'Frontier models', detail: 'Claude Sonnet, GPT-4o' },
        { label: 'Rich tooling', detail: 'Full tool suite enabled' },
        { label: 'Experimentation', detail: 'Iterate on prompts & flows' },
        { label: 'Development cost', detail: 'Invest in quality' },
      ]
    : [
        { label: 'Efficient models', detail: 'Haiku, GPT-4o-mini, local' },
        { label: 'Tuned tooling', detail: 'Only what you need' },
        { label: 'Production ready', detail: 'Optimized & validated' },
        { label: 'Running cost', detail: 'Fraction of build cost' },
      ]

  // Visual weight: Build is heavier (thicker borders, bolder), Run is lighter
  const borderWidth = isBuild ? 1.5 : 1
  const bgOpacity = isBuild ? 0.06 : 0.03

  return (
    <g
      onMouseEnter={() => onHover(phase)}
      onMouseLeave={() => onHover(null)}
      style={{ cursor: 'pointer' }}
    >
      {/* Background glow on hover */}
      {isHovered && (
        <rect
          x={x - 4} y={y - 4} width={width + 8} height={height + 8}
          rx="20" fill={color} opacity="0.04"
          style={{ filter: 'blur(20px)' }}
        />
      )}

      {/* Main container */}
      <rect
        x={x} y={y} width={width} height={height} rx="16"
        fill={`rgba(${isBuild ? '139, 92, 246' : '16, 185, 129'}, ${bgOpacity})`}
        stroke={isHovered ? colorLight : `rgba(255,255,255,0.08)`}
        strokeWidth={borderWidth}
        style={{ transition: 'all 0.3s ease' }}
      />

      {/* Phase icon */}
      {isBuild ? (
        // Build: stacked layers icon (heavy/rich)
        <g transform={`translate(${x + 24}, ${y + 24})`}>
          <rect x="0" y="8" width="20" height="4" rx="2" fill={color} opacity="0.3" />
          <rect x="0" y="4" width="20" height="4" rx="2" fill={color} opacity="0.5" />
          <rect x="0" y="0" width="20" height="4" rx="2" fill={color} opacity="0.8" />
        </g>
      ) : (
        // Run: single streamlined arrow (light/efficient)
        <g transform={`translate(${x + 24}, ${y + 24})`}>
          <path d="M0 6 L16 6 M12 2 L17 6 L12 10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
        </g>
      )}

      {/* Title */}
      <text
        x={x + 52} y={y + 32}
        fill="white" fontSize="16" fontWeight="700"
        fontFamily="'Syne', sans-serif" letterSpacing="-0.01em"
      >
        {title}
      </text>

      {/* Subtitle */}
      <text
        x={x + 52} y={y + 46}
        fill="rgba(255,255,255,0.45)" fontSize="11"
        fontFamily="'Epilogue', sans-serif"
      >
        {subtitle}
      </text>

      {/* Divider */}
      <line
        x1={x + 20} y1={y + 60} x2={x + width - 20} y2={y + 60}
        stroke="rgba(255,255,255,0.06)" strokeWidth="1"
      />

      {/* Items */}
      {items.map((item, i) => {
        const itemY = y + 80 + i * 36
        return (
          <g key={item.label}>
            {/* Bullet */}
            <circle
              cx={x + 28} cy={itemY + 2} r="3"
              fill={color}
              opacity={0.9 - i * 0.15}
            />
            {/* Label */}
            <text
              x={x + 40} y={itemY}
              fill="white" fontSize="12" fontWeight="500"
              fontFamily="'Epilogue', sans-serif"
            >
              {item.label}
            </text>
            {/* Detail */}
            <text
              x={x + 40} y={itemY + 14}
              fill="rgba(255,255,255,0.4)" fontSize="10"
              fontFamily="'Epilogue', sans-serif"
            >
              {item.detail}
            </text>
          </g>
        )
      })}

      {/* Cost indicator bar */}
      <g transform={`translate(${x + 20}, ${y + height - 36})`}>
        <text
          x="0" y="0"
          fill="rgba(255,255,255,0.35)" fontSize="9" fontWeight="500"
          fontFamily="'Epilogue', sans-serif" letterSpacing="0.04em"
        >
          {isBuild ? 'INVESTMENT' : 'COST'}
        </text>
        {/* Bar background */}
        <rect x="0" y="6" width={width - 40} height="4" rx="2" fill="rgba(255,255,255,0.06)" />
        {/* Bar fill - Build is fuller (more investment), Run is smaller (lower cost) */}
        <rect
          x="0" y="6"
          width={isBuild ? (width - 40) * 0.85 : (width - 40) * 0.25}
          height="4" rx="2" fill={color}
          opacity={isHovered ? 0.8 : 0.5}
          style={{ transition: 'opacity 0.3s ease, width 0.5s var(--ease-apple-out)' }}
        />
      </g>
    </g>
  )
}

/* ─── Main Component ─── */

export default function BuildRunPhaseVisual() {
  const [hoveredPhase, setHoveredPhase] = useState<string | null>(null)

  // Layout
  const boxWidth = 210
  const boxHeight = 260
  const gap = 100         // space between boxes for the bridge
  const leftX = -(boxWidth + gap / 2)
  const rightX = gap / 2

  return (
    <div className="w-full flex flex-col items-center">
      <svg
        viewBox={`${leftX - 24} -20 ${boxWidth * 2 + gap + 48} ${boxHeight + 60}`}
        className="w-full max-w-3xl"
        style={{ overflow: 'visible' }}
      >
        {/* ─── Center bridge: "Same Bundle" ─── */}
        <g>
          {/* Connecting lines from Build to Run */}
          <line
            x1={leftX + boxWidth} y1={boxHeight / 2}
            x2={rightX} y2={boxHeight / 2}
            stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="4 4"
          />

          {/* Bundle node */}
          <g transform={`translate(0, ${boxHeight / 2})`}>
            {/* Glow */}
            <ellipse cx="0" cy="0" rx="40" ry="28" fill={COLORS.bundle} opacity="0.06" style={{ filter: 'blur(16px)' }} />

            {/* Bundle shape */}
            <rect x="-38" y="-20" width="76" height="40" rx="12"
              fill="rgba(91, 77, 227, 0.12)"
              stroke="rgba(91, 77, 227, 0.35)"
              strokeWidth="1"
            />

            {/* Bundle icon - interlocking layers */}
            <rect x="-8" y="-8" width="16" height="4" rx="2" fill={COLORS.bundle} opacity="0.6" />
            <rect x="-8" y="-2" width="16" height="4" rx="2" fill={COLORS.bundle} opacity="0.8" />
            <rect x="-8" y="4" width="16" height="4" rx="2" fill={COLORS.bundle} />

            {/* Label */}
            <text x="0" y="32" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10" fontWeight="600" fontFamily="'Syne', sans-serif">
              Same Bundle
            </text>
            <text x="0" y="44" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="'Epilogue', sans-serif">
              Powers both phases
            </text>
          </g>

          {/* Animated flow: Build -> Bundle */}
          <g style={{ opacity: 0.6 }}>
            <circle r="2" fill={COLORS.build}>
              <animateMotion
                dur="2.5s" repeatCount="indefinite"
                path={`M ${leftX + boxWidth} ${boxHeight / 2} L ${-38} ${boxHeight / 2}`}
              />
            </circle>
          </g>

          {/* Animated flow: Bundle -> Run */}
          <g style={{ opacity: 0.6 }}>
            <circle r="2" fill={COLORS.run}>
              <animateMotion
                dur="2.5s" repeatCount="indefinite"
                path={`M ${38} ${boxHeight / 2} L ${rightX} ${boxHeight / 2}`}
                begin="1.2s"
              />
            </circle>
          </g>

          {/* Arrow: Build side */}
          <path
            d={`M ${leftX + boxWidth + 4} ${boxHeight / 2} L ${-40} ${boxHeight / 2}`}
            fill="none" stroke={COLORS.build} strokeWidth="1" opacity="0.25"
            strokeLinecap="round"
          />
          <path
            d={`M ${-43} ${boxHeight / 2 - 3} L ${-38} ${boxHeight / 2} L ${-43} ${boxHeight / 2 + 3}`}
            fill="none" stroke={COLORS.build} strokeWidth="1" opacity="0.25"
            strokeLinecap="round" strokeLinejoin="round"
          />

          {/* Arrow: Run side */}
          <path
            d={`M ${40} ${boxHeight / 2} L ${rightX - 4} ${boxHeight / 2}`}
            fill="none" stroke={COLORS.run} strokeWidth="1" opacity="0.25"
            strokeLinecap="round"
          />
          <path
            d={`M ${rightX - 7} ${boxHeight / 2 - 3} L ${rightX - 2} ${boxHeight / 2} L ${rightX - 7} ${boxHeight / 2 + 3}`}
            fill="none" stroke={COLORS.run} strokeWidth="1" opacity="0.25"
            strokeLinecap="round" strokeLinejoin="round"
          />
        </g>

        {/* ─── Build Phase (left) ─── */}
        <PhaseBox
          x={leftX} y={0} width={boxWidth} height={boxHeight}
          phase="build"
          isHovered={hoveredPhase === 'build'}
          onHover={setHoveredPhase}
        />

        {/* ─── Run Phase (right) ─── */}
        <PhaseBox
          x={rightX} y={0} width={boxWidth} height={boxHeight}
          phase="run"
          isHovered={hoveredPhase === 'run'}
          onHover={setHoveredPhase}
        />

        {/* ─── Top labels ─── */}
        <text
          x={leftX + boxWidth / 2} y={-6}
          textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="9"
          fontWeight="500" fontFamily="'Epilogue', sans-serif" letterSpacing="0.06em"
        >
          DEVELOPMENT
        </text>
        <text
          x={rightX + boxWidth / 2} y={-6}
          textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="9"
          fontWeight="500" fontFamily="'Epilogue', sans-serif" letterSpacing="0.06em"
        >
          PRODUCTION
        </text>
      </svg>

      {/* Summary callout */}
      <div
        className="mt-8 text-center px-6 py-3 rounded-full"
        style={{
          background: 'rgba(91, 77, 227, 0.06)',
          border: '1px solid rgba(91, 77, 227, 0.12)',
          maxWidth: '480px',
        }}
      >
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', fontFamily: "'Epilogue', sans-serif", margin: 0 }}>
          <span style={{ color: COLORS.buildLight, fontWeight: 600 }}>Invest</span> in building with the best models.{' '}
          <span style={{ color: COLORS.runLight, fontWeight: 600 }}>Deploy</span> with efficient ones.
        </p>
      </div>
    </div>
  )
}
