'use client'

import { useState } from 'react'

/**
 * BoundaryDiagram
 *
 * Purpose: The hero architectural visual. Shows the clean separation between
 * "Your App" (left) and "Amplifier" (right), connected by a Session bridge.
 * Communicates that Amplifier handles AI complexity while your app stays clean.
 *
 * Aesthetic: Apple keynote style — generous whitespace, soft geometry, subtle
 * depth. NOT a UML diagram. Feels architectural but approachable.
 *
 * Integration: Place inside a dark section. Uses CSS transitions for hover
 * interactivity and SVG animateMotion for the session bridge flow.
 */

const COLORS = {
  app: '#3B82F6',          // Blue for "Your App" — familiar, trustworthy
  appLight: '#60A5FA',
  appSoft: 'rgba(59, 130, 246, 0.08)',
  appGlow: 'rgba(59, 130, 246, 0.15)',
  amplifier: '#5B4DE3',    // Signal violet for Amplifier
  ampLight: '#8578F0',
  ampSoft: 'rgba(91, 77, 227, 0.08)',
  ampGlow: 'rgba(91, 77, 227, 0.15)',
  session: '#F59E0B',      // Warm amber for Session bridge — the connection point
  sessionLight: '#FBBF24',
  sessionSoft: 'rgba(245, 158, 11, 0.06)',
  sessionGlow: 'rgba(245, 158, 11, 0.2)',
}

/* ─── Data ─── */

const APP_ITEMS = [
  { icon: 'route', label: 'Web routes' },
  { icon: 'listen', label: 'Event listeners' },
  { icon: 'file', label: 'File processors' },
  { icon: 'slack', label: 'Slack handlers' },
  { icon: 'audio', label: 'Audio pipelines' },
  { icon: 'clock', label: 'Scheduled jobs' },
]

const AMP_ITEMS = [
  { icon: 'model', label: 'Models & providers' },
  { icon: 'tool', label: 'Tool dispatch' },
  { icon: 'loop', label: 'Orchestrator loop' },
  { icon: 'context', label: 'Context management' },
  { icon: 'hook', label: 'Hook system' },
]

/* ─── Inline micro-icons for each item ─── */

function ItemIcon({ type, color }: { type: string; color: string }) {
  const s = 14 // icon size
  const props = { width: s, height: s, viewBox: '0 0 14 14', fill: 'none' }

  switch (type) {
    case 'route':
      return (
        <svg {...props}>
          <path d="M2 7h10M9 4l3 3-3 3" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'listen':
      return (
        <svg {...props}>
          <circle cx="7" cy="7" r="2" stroke={color} strokeWidth="1.3" />
          <path d="M3.5 3.5a5 5 0 000 7M10.5 3.5a5 5 0 010 7" stroke={color} strokeWidth="1.3" strokeLinecap="round" opacity="0.5" />
        </svg>
      )
    case 'file':
      return (
        <svg {...props}>
          <path d="M4 2h4l3 3v7a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M8 2v3h3" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'slack':
      return (
        <svg {...props}>
          <rect x="2" y="5" width="4" height="2" rx="1" fill={color} opacity="0.6" />
          <rect x="8" y="5" width="4" height="2" rx="1" fill={color} opacity="0.6" />
          <rect x="5" y="2" width="2" height="4" rx="1" fill={color} opacity="0.6" />
          <rect x="5" y="8" width="2" height="4" rx="1" fill={color} opacity="0.6" />
        </svg>
      )
    case 'audio':
      return (
        <svg {...props}>
          <line x1="3" y1="5" x2="3" y2="9" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="5.5" y1="3" x2="5.5" y2="11" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="8" y1="4.5" x2="8" y2="9.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="10.5" y1="6" x2="10.5" y2="8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    case 'clock':
      return (
        <svg {...props}>
          <circle cx="7" cy="7" r="5" stroke={color} strokeWidth="1.3" />
          <path d="M7 4v3.5l2.5 1.5" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'model':
      return (
        <svg {...props}>
          <rect x="2" y="3" width="10" height="8" rx="2" stroke={color} strokeWidth="1.3" />
          <circle cx="5" cy="7" r="1.2" fill={color} opacity="0.6" />
          <circle cx="9" cy="7" r="1.2" fill={color} opacity="0.6" />
        </svg>
      )
    case 'tool':
      return (
        <svg {...props}>
          <path d="M8 2L6 6h3l-2 6" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'loop':
      return (
        <svg {...props}>
          <path d="M10 4.5A4 4 0 004 7" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
          <path d="M4 9.5A4 4 0 0010 7" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
          <path d="M10 3v2h-2" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 11V9h2" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'context':
      return (
        <svg {...props}>
          <rect x="2" y="2" width="10" height="3" rx="1" stroke={color} strokeWidth="1.2" opacity="0.4" />
          <rect x="2" y="5.5" width="10" height="3" rx="1" stroke={color} strokeWidth="1.2" opacity="0.6" />
          <rect x="2" y="9" width="10" height="3" rx="1" stroke={color} strokeWidth="1.2" />
        </svg>
      )
    case 'hook':
      return (
        <svg {...props}>
          <path d="M7 2v5a3 3 0 01-3 3" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
          <circle cx="7" cy="2" r="1" fill={color} />
        </svg>
      )
    default:
      return <svg {...props}><circle cx="7" cy="7" r="3" fill={color} opacity="0.4" /></svg>
  }
}

/* ─── Domain Box ─── */

function DomainBox({
  x, y, width, height, title, subtitle, items, color, colorLight, colorSoft, colorGlow,
  isHovered, onHover, id, align,
}: {
  x: number; y: number; width: number; height: number
  title: string; subtitle: string
  items: { icon: string; label: string }[]
  color: string; colorLight: string; colorSoft: string; colorGlow: string
  isHovered: boolean; onHover: (id: string | null) => void
  id: string; align: 'left' | 'right'
}) {
  const textX = align === 'left' ? x + 24 : x + 24
  const itemStartY = y + 80

  return (
    <g
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
      style={{ cursor: 'default' }}
    >
      {/* Outer glow on hover */}
      {isHovered && (
        <rect
          x={x - 6} y={y - 6} width={width + 12} height={height + 12}
          rx="22" fill={color} opacity="0.03"
          style={{ filter: 'blur(24px)' }}
        />
      )}

      {/* Main container */}
      <rect
        x={x} y={y} width={width} height={height} rx="16"
        fill="rgba(255, 255, 255, 0.025)"
        stroke={isHovered ? `${color}44` : 'rgba(255,255,255,0.06)'}
        strokeWidth={isHovered ? 1.5 : 1}
        style={{ transition: 'stroke 0.3s ease, stroke-width 0.3s ease' }}
      />

      {/* Top accent line */}
      <rect
        x={x + 20} y={y} width={width - 40} height="2" rx="1"
        fill={color} opacity={isHovered ? 0.6 : 0.2}
        style={{ transition: 'opacity 0.3s ease' }}
      />

      {/* Title */}
      <text
        x={textX} y={y + 32}
        fill="white" fontSize="16" fontWeight="700"
        fontFamily="'Syne', sans-serif" letterSpacing="-0.01em"
      >
        {title}
      </text>

      {/* Subtitle */}
      <text
        x={textX} y={y + 48}
        fill="rgba(255,255,255,0.4)" fontSize="10"
        fontFamily="'Epilogue', sans-serif"
      >
        {subtitle}
      </text>

      {/* Divider */}
      <line
        x1={x + 20} y1={y + 62} x2={x + width - 20} y2={y + 62}
        stroke="rgba(255,255,255,0.05)" strokeWidth="1"
      />

      {/* Items */}
      {items.map((item, i) => {
        const itemY = itemStartY + i * 30
        return (
          <g key={item.label}>
            {/* Icon */}
            <g transform={`translate(${textX}, ${itemY - 7})`}>
              <ItemIcon type={item.icon} color={color} />
            </g>
            {/* Label */}
            <text
              x={textX + 22} y={itemY + 1}
              fill="rgba(255,255,255,0.7)" fontSize="12" fontWeight="400"
              fontFamily="'Epilogue', sans-serif"
              dominantBaseline="middle"
            >
              {item.label}
            </text>
          </g>
        )
      })}
    </g>
  )
}

/* ─── Session Bridge ─── */

function SessionBridge({
  x, y, width, height, isHovered, onHover,
}: {
  x: number; y: number; width: number; height: number
  isHovered: boolean; onHover: (id: string | null) => void
}) {
  const centerX = x + width / 2
  const centerY = y + height / 2

  return (
    <g
      onMouseEnter={() => onHover('session')}
      onMouseLeave={() => onHover(null)}
      style={{ cursor: 'default' }}
    >
      {/* Ambient glow */}
      <ellipse
        cx={centerX} cy={centerY} rx="50" ry={height / 2 + 10}
        fill={COLORS.session} opacity={isHovered ? 0.06 : 0.03}
        style={{ filter: 'blur(20px)', transition: 'opacity 0.3s ease' }}
      />

      {/* Bridge container */}
      <rect
        x={x} y={y} width={width} height={height} rx="14"
        fill="rgba(245, 158, 11, 0.04)"
        stroke={isHovered ? 'rgba(245, 158, 11, 0.35)' : 'rgba(245, 158, 11, 0.12)'}
        strokeWidth={1}
        style={{ transition: 'stroke 0.3s ease' }}
      />

      {/* Dashed connecting lines extending from bridge to boxes */}
      {/* These are decorative — the actual visual connection */}

      {/* Session icon: two-way arrow through a keyhole */}
      <g transform={`translate(${centerX}, ${centerY - 18})`}>
        {/* Bidirectional arrows */}
        <path
          d="M-14 0 L14 0"
          stroke={COLORS.session} strokeWidth="1.5" strokeLinecap="round"
          opacity="0.5"
        />
        <path d="M-14 0 L-10 -3 M-14 0 L-10 3" stroke={COLORS.session} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
        <path d="M14 0 L10 -3 M14 0 L10 3" stroke={COLORS.session} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
        {/* Center dot */}
        <circle cx="0" cy="0" r="3" fill={COLORS.session} opacity="0.8">
          <animate attributeName="opacity" values="0.8;0.4;0.8" dur="2.5s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* "Session" label */}
      <text
        x={centerX} y={centerY + 2}
        textAnchor="middle" fill={COLORS.sessionLight} fontSize="13" fontWeight="700"
        fontFamily="'Syne', sans-serif" letterSpacing="0.02em"
      >
        Session
      </text>

      {/* Sublabel */}
      <text
        x={centerX} y={centerY + 16}
        textAnchor="middle" fill="rgba(245, 158, 11, 0.5)" fontSize="9"
        fontFamily="'Epilogue', sans-serif"
      >
        The clean boundary
      </text>

      {/* Flow particles through the bridge */}
      {/* Left to right */}
      <circle r="2" fill={COLORS.app} opacity="0.6">
        <animateMotion
          dur="3s" repeatCount="indefinite"
          path={`M ${x - 10} ${centerY - (y)} L ${x + width + 10} ${centerY - (y)}`}
        />
      </circle>
      {/* Right to left */}
      <circle r="2" fill={COLORS.amplifier} opacity="0.6">
        <animateMotion
          dur="3s" repeatCount="indefinite"
          path={`M ${x + width + 10} ${centerY - (y)} L ${x - 10} ${centerY - (y)}`}
          begin="1.5s"
        />
      </circle>
    </g>
  )
}

/* ─── Connecting Lines ─── */

function ConnectionLines({
  leftBoxRight, rightBoxLeft, bridgeLeft, bridgeRight, centerY, isSessionHovered,
}: {
  leftBoxRight: number; rightBoxLeft: number
  bridgeLeft: number; bridgeRight: number
  centerY: number; isSessionHovered: boolean
}) {
  const opacity = isSessionHovered ? 0.25 : 0.1

  return (
    <g style={{ transition: 'opacity 0.3s ease' }}>
      {/* Left box to bridge */}
      <line
        x1={leftBoxRight} y1={centerY}
        x2={bridgeLeft} y2={centerY}
        stroke={COLORS.app}
        strokeWidth="1.5"
        strokeDasharray="4 6"
        opacity={opacity}
      />
      {/* Bridge to right box */}
      <line
        x1={bridgeRight} y1={centerY}
        x2={rightBoxLeft} y2={centerY}
        stroke={COLORS.amplifier}
        strokeWidth="1.5"
        strokeDasharray="4 6"
        opacity={opacity}
      />
    </g>
  )
}

/* ─── Main Component ─── */

export default function BoundaryDiagram() {
  const [hovered, setHovered] = useState<string | null>(null)

  // Layout constants
  const boxWidth = 190
  const boxHeight = 280
  const bridgeWidth = 90
  const bridgeHeight = 70
  const gapToBridge = 20

  const totalWidth = boxWidth * 2 + bridgeWidth + gapToBridge * 4
  const leftBoxX = 0
  const bridgeX = boxWidth + gapToBridge * 2
  const rightBoxX = bridgeX + bridgeWidth + gapToBridge * 2
  const centerY = boxHeight / 2

  // Bridge vertical center aligns with box center
  const bridgeY = centerY - bridgeHeight / 2

  const svgPadding = 30
  const viewBoxX = -svgPadding
  const viewBoxY = -svgPadding
  const viewBoxW = totalWidth + svgPadding * 2
  const viewBoxH = boxHeight + svgPadding * 2

  return (
    <div className="w-full flex flex-col items-center">
      <svg
        viewBox={`${viewBoxX} ${viewBoxY} ${viewBoxW} ${viewBoxH}`}
        className="w-full max-w-4xl"
        style={{ overflow: 'visible' }}
      >
        {/* Subtle background */}
        <defs>
          <radialGradient id="boundaryBgGlow" cx="50%" cy="50%" r="45%">
            <stop offset="0%" stopColor="rgba(245, 158, 11, 0.03)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <ellipse
          cx={totalWidth / 2} cy={centerY}
          rx={totalWidth / 2} ry={boxHeight / 2 + 20}
          fill="url(#boundaryBgGlow)"
        />

        {/* ─── Connection lines (behind everything) ─── */}
        <ConnectionLines
          leftBoxRight={leftBoxX + boxWidth}
          rightBoxLeft={rightBoxX}
          bridgeLeft={bridgeX}
          bridgeRight={bridgeX + bridgeWidth}
          centerY={centerY}
          isSessionHovered={hovered === 'session'}
        />

        {/* ─── Your App (left box) ─── */}
        <DomainBox
          x={leftBoxX} y={0} width={boxWidth} height={boxHeight}
          title="Your App"
          subtitle="What you build and own"
          items={APP_ITEMS}
          color={COLORS.app}
          colorLight={COLORS.appLight}
          colorSoft={COLORS.appSoft}
          colorGlow={COLORS.appGlow}
          isHovered={hovered === 'app'}
          onHover={setHovered}
          id="app"
          align="left"
        />

        {/* ─── Session Bridge (center) ─── */}
        <SessionBridge
          x={bridgeX} y={bridgeY}
          width={bridgeWidth} height={bridgeHeight}
          isHovered={hovered === 'session'}
          onHover={setHovered}
        />

        {/* ─── Amplifier (right box) ─── */}
        <DomainBox
          x={rightBoxX} y={0} width={boxWidth} height={boxHeight}
          title="Amplifier"
          subtitle="What Amplifier handles"
          items={AMP_ITEMS}
          color={COLORS.amplifier}
          colorLight={COLORS.ampLight}
          colorSoft={COLORS.ampSoft}
          colorGlow={COLORS.ampGlow}
          isHovered={hovered === 'amplifier'}
          onHover={setHovered}
          id="amplifier"
          align="left"
        />

        {/* ─── Domain labels above boxes ─── */}
        <text
          x={leftBoxX + boxWidth / 2} y={-12}
          textAnchor="middle"
          fill={COLORS.app} fontSize="9" fontWeight="600" opacity="0.5"
          fontFamily="'Epilogue', sans-serif" letterSpacing="0.08em"
        >
          YOUR DOMAIN
        </text>
        <text
          x={rightBoxX + boxWidth / 2} y={-12}
          textAnchor="middle"
          fill={COLORS.amplifier} fontSize="9" fontWeight="600" opacity="0.5"
          fontFamily="'Epilogue', sans-serif" letterSpacing="0.08em"
        >
          AI DOMAIN
        </text>
      </svg>

      {/* Explanatory caption */}
      <div className="mt-6 text-center" style={{ maxWidth: '520px' }}>
        <p style={{
          color: 'rgba(255,255,255,0.5)',
          fontSize: '13px',
          fontFamily: "'Epilogue', sans-serif",
          lineHeight: 1.6,
          margin: 0,
        }}>
          Your app creates a <span style={{ color: COLORS.sessionLight, fontWeight: 600 }}>Session</span>.
          Amplifier handles everything on the other side.
          <br />
          One boundary. Complete separation.
        </p>
      </div>
    </div>
  )
}
