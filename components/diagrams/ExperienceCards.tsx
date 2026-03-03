'use client'

import { useState } from 'react'

/**
 * ExperienceCards
 *
 * Purpose: Showcase 6 AI experience types as product capability cards.
 * Each card communicates an input -> output transformation with a visual icon,
 * making abstract AI capabilities feel tangible and product-like.
 *
 * Integration: Uses .reveal-stagger for scroll animation. Place inside any
 * section wrapper. Cards are horizontal-scroll on mobile, 3-col grid on desktop.
 */

const EXPERIENCES = [
  {
    id: 'document',
    label: 'Document Processing',
    input: 'PDFs, reports, filings',
    output: 'Extracted insights & structured data',
    pattern: 'Per-Request' as const,
    color: '#10B981',
    colorSoft: 'rgba(16, 185, 129, 0.08)',
    colorGlow: 'rgba(16, 185, 129, 0.15)',
  },
  {
    id: 'transcript',
    label: 'Transcript Intelligence',
    input: 'Recordings & meetings',
    output: 'Decisions, action items & summaries',
    pattern: 'Per-Request' as const,
    color: '#06B6D4',
    colorSoft: 'rgba(6, 182, 212, 0.08)',
    colorGlow: 'rgba(6, 182, 212, 0.15)',
  },
  {
    id: 'visual',
    label: 'Visual Interpretation',
    input: 'Screenshots, diagrams & images',
    output: 'Descriptions, data & analysis',
    pattern: 'Per-Request' as const,
    color: '#F59E0B',
    colorSoft: 'rgba(245, 158, 11, 0.08)',
    colorGlow: 'rgba(245, 158, 11, 0.15)',
  },
  {
    id: 'conversational',
    label: 'Conversational Agent',
    input: 'Chat messages & queries',
    output: 'Context-aware responses',
    pattern: 'Per-Conversation' as const,
    color: '#5B4DE3',
    colorSoft: 'rgba(91, 77, 227, 0.08)',
    colorGlow: 'rgba(91, 77, 227, 0.15)',
  },
  {
    id: 'assistant',
    label: 'Personal AI Assistant',
    input: 'Ongoing interaction',
    output: 'Compound intelligence over time',
    pattern: 'Singleton' as const,
    color: '#F43F5E',
    colorSoft: 'rgba(244, 63, 94, 0.08)',
    colorGlow: 'rgba(244, 63, 94, 0.15)',
  },
  {
    id: 'automation',
    label: 'Event-Driven Automation',
    input: 'Webhooks, schedules & triggers',
    output: 'Automated intelligent responses',
    pattern: 'Per-Request' as const,
    color: '#F97316',
    colorSoft: 'rgba(249, 115, 22, 0.08)',
    colorGlow: 'rgba(249, 115, 22, 0.15)',
  },
]

const PATTERN_COLORS: Record<string, { bg: string; text: string }> = {
  'Per-Request': { bg: 'rgba(16, 185, 129, 0.08)', text: '#059669' },
  'Per-Conversation': { bg: 'rgba(91, 77, 227, 0.08)', text: '#5B4DE3' },
  'Singleton': { bg: 'rgba(244, 63, 94, 0.08)', text: '#E11D48' },
}

/* ─── Icon Components ─── */

function DocumentIcon({ color }: { color: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="6" y="3" width="16" height="22" rx="2.5" stroke={color} strokeWidth="1.5" />
      <line x1="10" y1="10" x2="18" y2="10" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <line x1="10" y1="14" x2="18" y2="14" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <line x1="10" y1="18" x2="15" y2="18" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <path d="M23 13L27 13" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M25 10.5L27.5 13L25 15.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="28" cy="9" r="1.2" fill={color} opacity="0.5" />
      <circle cx="29" cy="13" r="1.2" fill={color} />
      <circle cx="28" cy="17" r="1.2" fill={color} opacity="0.5" />
    </svg>
  )
}

function TranscriptIcon({ color }: { color: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <line x1="4" y1="16" x2="4" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.3" />
      <line x1="7" y1="11" x2="7" y2="21" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <line x1="10" y1="8" x2="10" y2="24" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="13" y1="12" x2="13" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <line x1="16" y1="14" x2="16" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.3" />
      <path d="M20 16L23 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      <path d="M25 10L26.5 11.5L29 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25 16.5L26.5 18L29 14.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      <path d="M25 23L26.5 24.5L29 21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
    </svg>
  )
}

function VisualIcon({ color }: { color: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="3" y="6" width="17" height="17" rx="2.5" stroke={color} strokeWidth="1.5" />
      <path d="M6 20L9.5 15.5L13 18L15.5 15L18 20" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
      <circle cx="9" cy="11.5" r="2" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <path d="M22 14.5L25 14.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      <rect x="27" y="8" width="2.5" height="15" rx="1.25" stroke={color} strokeWidth="1" opacity="0.3" />
      <rect x="27" y="14" width="2.5" height="9" rx="1.25" fill={color} opacity="0.5" />
    </svg>
  )
}

function ConversationalIcon({ color }: { color: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="3" y="5" width="17" height="10" rx="5" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <path d="M8 15L6 18.5L12 15" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <rect x="12" y="16" width="17" height="10" rx="5" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.08" />
      <path d="M24 26L26 29.5L20 26" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <circle cx="18.5" cy="21" r="1.2" fill={color} opacity="0.4" />
      <circle cx="22" cy="21" r="1.2" fill={color} opacity="0.6" />
      <circle cx="25.5" cy="21" r="1.2" fill={color} opacity="0.9" />
    </svg>
  )
}

function AssistantIcon({ color }: { color: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="3.5" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.1" />
      <circle cx="16" cy="16" r="1.2" fill={color} />
      <circle cx="8" cy="9" r="2" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <circle cx="26" cy="10" r="2" stroke={color} strokeWidth="1.2" opacity="0.6" />
      <circle cx="9" cy="25" r="2" stroke={color} strokeWidth="1.2" opacity="0.5" />
      <circle cx="25" cy="24" r="2" stroke={color} strokeWidth="1.2" opacity="0.7" />
      <circle cx="16" cy="5" r="1.5" stroke={color} strokeWidth="1.2" opacity="0.3" />
      <line x1="9.5" y1="10.5" x2="14" y2="14.5" stroke={color} strokeWidth="1" opacity="0.25" />
      <line x1="24.5" y1="11.5" x2="18" y2="14.5" stroke={color} strokeWidth="1" opacity="0.35" />
      <line x1="10.5" y1="23.5" x2="14.5" y2="18" stroke={color} strokeWidth="1" opacity="0.25" />
      <line x1="23.5" y1="22.5" x2="18" y2="18" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="16" y1="7" x2="16" y2="12.5" stroke={color} strokeWidth="1" opacity="0.2" />
    </svg>
  )
}

function AutomationIcon({ color }: { color: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path
        d="M15 3L8 18H15L12 29L25 13H18L21 3H15Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill={color}
        fillOpacity="0.1"
      />
    </svg>
  )
}

const ICON_MAP: Record<string, React.FC<{ color: string }>> = {
  document: DocumentIcon,
  transcript: TranscriptIcon,
  visual: VisualIcon,
  conversational: ConversationalIcon,
  assistant: AssistantIcon,
  automation: AutomationIcon,
}

export default function ExperienceCards() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <div className="w-full">
      {/* Mobile: horizontal scroll / Desktop: 3-col grid */}
      <div
        className="scroll-container scroll-container-grid"
        style={{ gap: '1.25rem' }}
      >
        {EXPERIENCES.map((exp) => {
          const isHovered = hoveredCard === exp.id
          const patternStyle = PATTERN_COLORS[exp.pattern]
          const IconComponent = ICON_MAP[exp.id]

          return (
            <div
              key={exp.id}
              className="scroll-card"
              onMouseEnter={() => setHoveredCard(exp.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                padding: '28px 24px',
                borderRadius: 'var(--radius-card)',
                background: isHovered
                  ? 'rgba(255, 255, 255, 1)'
                  : 'rgba(255, 255, 255, 0.7)',
                border: `1px solid ${isHovered ? exp.colorGlow : 'var(--canvas-mist)'}`,
                boxShadow: isHovered
                  ? `0 8px 32px rgba(0,0,0,0.06), 0 0 0 1px ${exp.colorGlow}`
                  : '0 2px 8px rgba(0,0,0,0.03)',
                transition: 'all 0.3s var(--ease-apple-out)',
                transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                cursor: 'default',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                minWidth: '280px',
              }}
            >
              {/* Icon area */}
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  background: isHovered ? exp.colorGlow : exp.colorSoft,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.3s var(--ease-apple-out)',
                }}
              >
                <IconComponent color={exp.color} />
              </div>

              {/* Label */}
              <h3
                style={{
                  fontFamily: "'Syne', system-ui, sans-serif",
                  fontSize: '17px',
                  fontWeight: 600,
                  color: 'var(--ink)',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.3,
                  margin: 0,
                }}
              >
                {exp.label}
              </h3>

              {/* Input -> Output */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <p
                  style={{
                    fontFamily: "'Epilogue', sans-serif",
                    fontSize: '14px',
                    color: 'var(--ink-fog)',
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  {exp.input}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="20" height="12" viewBox="0 0 20 12" fill="none" style={{ flexShrink: 0 }}>
                    <path
                      d="M0 6L14 6M11 2.5L15.5 6L11 9.5"
                      stroke={exp.color}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.5"
                    />
                  </svg>
                  <p
                    style={{
                      fontFamily: "'Epilogue', sans-serif",
                      fontSize: '14px',
                      color: 'var(--ink-slate)',
                      fontWeight: 500,
                      margin: 0,
                      lineHeight: 1.4,
                    }}
                  >
                    {exp.output}
                  </p>
                </div>
              </div>

              {/* Pattern tag */}
              <div style={{ marginTop: 'auto', paddingTop: '4px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '0.02em',
                    padding: '3px 10px',
                    borderRadius: 'var(--radius-pill)',
                    background: patternStyle.bg,
                    color: patternStyle.text,
                  }}
                >
                  {exp.pattern}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
