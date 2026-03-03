'use client'

import { useState } from 'react'

/**
 * ProviderRoutingVisual
 *
 * Purpose: Illustrate how Amplifier intelligently routes tasks to the right
 * LLM provider based on complexity. Tasks enter from the left, flow through
 * a smart router, and reach the optimal model. Feels like a living system.
 *
 * Integration: Place inside a dark section (.section-dark or .section-dark-gradient).
 * Uses CSS transitions + SVG animateMotion for flowing particles.
 */

const COLORS = {
  signal: '#5B4DE3',
  signalLight: '#8578F0',
  router: '#5B4DE3',
  anthropic: '#D97706',    // Warm amber for Anthropic
  openai: '#10B981',       // Emerald for OpenAI
  copilot: '#3B82F6',      // Blue for GitHub Copilot
  ollama: '#8B5CF6',       // Purple for local/Ollama
  taskSimple: '#22D3EE',   // Cyan - simple tasks
  taskMedium: '#FBBF24',   // Amber - medium tasks
  taskComplex: '#F43F5E',  // Rose - complex tasks
}

// Task definitions entering from the left
const TASKS = [
  { id: 'simple', label: 'Quick lookup', complexity: 'Simple', y: -50, color: COLORS.taskSimple, targetProvider: 'ollama' },
  { id: 'medium', label: 'Summarize doc', complexity: 'Medium', y: 0, color: COLORS.taskMedium, targetProvider: 'openai' },
  { id: 'complex', label: 'Deep analysis', complexity: 'Complex', y: 50, color: COLORS.taskComplex, targetProvider: 'anthropic' },
]

// Provider definitions on the right
const PROVIDERS = [
  { id: 'anthropic', label: 'Anthropic', sublabel: 'Claude Sonnet', y: -65, color: COLORS.anthropic, tier: 'Frontier' },
  { id: 'openai', label: 'OpenAI', sublabel: 'GPT-4o', y: -15, color: COLORS.openai, tier: 'Balanced' },
  { id: 'copilot', label: 'GitHub Copilot', sublabel: 'Multi-model', y: 35, color: COLORS.copilot, tier: 'Integrated' },
  { id: 'ollama', label: 'Ollama', sublabel: 'Local / Llama', y: 85, color: COLORS.ollama, tier: 'Private' },
]

/* ─── Sub-components ─── */

function TaskNode({
  x, y, label, complexity, color, isHovered, isActive, onHover,
}: {
  x: number; y: number; label: string; complexity: string
  color: string; isHovered: boolean; isActive: boolean
  onHover: (id: string | null) => void; id: string
}) {
  const dimmed = !isActive && !isHovered
  return (
    <g
      onMouseEnter={() => onHover(complexity.toLowerCase())}
      onMouseLeave={() => onHover(null)}
      style={{ opacity: dimmed ? 0.35 : 1, transition: 'opacity 0.3s ease', cursor: 'pointer' }}
    >
      {/* Glow */}
      {isHovered && (
        <ellipse cx={x} cy={y} rx="55" ry="22" fill={color} opacity="0.12" style={{ filter: 'blur(12px)' }} />
      )}
      {/* Body */}
      <rect
        x={x - 58} y={y - 17} width="116" height="34" rx="8"
        fill="rgba(255,255,255,0.06)"
        stroke={isHovered ? color : 'rgba(255,255,255,0.1)'}
        strokeWidth={isHovered ? 1.5 : 0.5}
        style={{ transition: 'stroke 0.2s ease' }}
      />
      {/* Complexity dot */}
      <circle cx={x - 42} cy={y} r="3.5" fill={color} opacity={isHovered ? 1 : 0.7} />
      {/* Labels */}
      <text x={x + 2} y={y - 3} textAnchor="middle" fill="white" fontSize="11" fontWeight="600" fontFamily="'Epilogue', sans-serif">
        {label}
      </text>
      <text x={x + 2} y={y + 9} textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9" fontFamily="'Epilogue', sans-serif">
        {complexity}
      </text>
    </g>
  )
}

function ProviderNode({
  x, y, label, sublabel, tier, color, isHovered, isActive, onHover, id,
}: {
  x: number; y: number; label: string; sublabel: string; tier: string
  color: string; isHovered: boolean; isActive: boolean
  onHover: (id: string | null) => void; id: string
}) {
  const dimmed = !isActive && !isHovered
  return (
    <g
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
      style={{ opacity: dimmed ? 0.35 : 1, transition: 'opacity 0.3s ease', cursor: 'pointer' }}
    >
      {/* Glow */}
      {isHovered && (
        <ellipse cx={x} cy={y} rx="65" ry="24" fill={color} opacity="0.1" style={{ filter: 'blur(14px)' }} />
      )}
      {/* Body */}
      <rect
        x={x - 68} y={y - 22} width="136" height="44" rx="10"
        fill="rgba(20, 20, 24, 0.9)"
        stroke={isHovered ? color : 'rgba(255,255,255,0.08)'}
        strokeWidth={isHovered ? 1.5 : 0.5}
        style={{ transition: 'stroke 0.2s ease, transform 0.2s ease' }}
      />
      {/* Color accent bar */}
      <rect x={x - 68} y={y - 22} width="4" height="44" rx="2" fill={color} />
      {/* Labels */}
      <text x={x + 2} y={y - 5} textAnchor="middle" fill="white" fontSize="12" fontWeight="600" fontFamily="'Syne', sans-serif">
        {label}
      </text>
      <text x={x + 2} y={y + 8} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="'Epilogue', sans-serif">
        {sublabel}
      </text>
      {/* Tier badge */}
      <rect x={x + 28} y={y - 18} width="32" height="14" rx="7" fill={color} opacity="0.15" />
      <text x={x + 44} y={y - 9} textAnchor="middle" fill={color} fontSize="7" fontWeight="600" fontFamily="'Epilogue', sans-serif">
        {tier}
      </text>
    </g>
  )
}

function RouterHub({ x, y, isHovered }: { x: number; y: number; isHovered: boolean }) {
  return (
    <g>
      {/* Outer glow ring */}
      <circle cx={x} cy={y} r="38" fill="none" stroke={COLORS.signal} strokeWidth="0.5" opacity="0.2">
        <animate attributeName="r" values="36;40;36" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.2;0.1;0.2" dur="3s" repeatCount="indefinite" />
      </circle>
      {/* Background circle */}
      <circle cx={x} cy={y} r="32" fill="rgba(91, 77, 227, 0.08)" stroke="rgba(91, 77, 227, 0.25)" strokeWidth="1" />
      {/* Inner ring */}
      <circle cx={x} cy={y} r="20" fill="rgba(91, 77, 227, 0.15)" stroke="rgba(91, 77, 227, 0.4)" strokeWidth="1" />
      {/* Center dot */}
      <circle cx={x} cy={y} r="6" fill={COLORS.signal} opacity="0.9">
        <animate attributeName="opacity" values="0.9;0.6;0.9" dur="2s" repeatCount="indefinite" />
      </circle>
      {/* Router icon - branching paths */}
      <path d={`M${x - 8} ${y} L${x + 8} ${y}`} stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d={`M${x + 3} ${y - 6} L${x + 8} ${y} L${x + 3} ${y + 6}`} stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      {/* Label */}
      <text x={x} y={y + 48} textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10" fontWeight="600" fontFamily="'Syne', sans-serif" letterSpacing="0.05em">
        SMART ROUTER
      </text>
    </g>
  )
}

function FlowPath({
  from, to, color, isActive, id, particleDur, particleDelay,
}: {
  from: { x: number; y: number }; to: { x: number; y: number }
  color: string; isActive: boolean; id: string
  particleDur?: string; particleDelay?: string
}) {
  // Smooth cubic bezier curve
  const dx = to.x - from.x
  const path = `M ${from.x} ${from.y} C ${from.x + dx * 0.4} ${from.y}, ${to.x - dx * 0.4} ${to.y}, ${to.x} ${to.y}`
  const dur = particleDur || '2.5s'
  const delay = particleDelay || '0s'

  return (
    <g style={{ opacity: isActive ? 1 : 0.15, transition: 'opacity 0.4s ease' }}>
      {/* Base path */}
      <path d={path} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
      {/* Gradient path */}
      <path d={path} fill="none" stroke={`url(#flow-${id})`} strokeWidth="1.5" strokeLinecap="round" />
      {/* Flowing particles */}
      <circle r="2.5" fill={color}>
        <animateMotion dur={dur} repeatCount="indefinite" path={path} begin={delay} />
      </circle>
      <circle r="1.5" fill={color} opacity="0.5">
        <animateMotion dur={dur} repeatCount="indefinite" path={path} begin={`calc(${delay} + 0.8s)`} />
      </circle>
      {/* Gradient defs */}
      <defs>
        <linearGradient id={`flow-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0.05" />
          <stop offset="50%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0.05" />
        </linearGradient>
      </defs>
    </g>
  )
}

/* ─── Main Component ─── */

export default function ProviderRoutingVisual() {
  const [hovered, setHovered] = useState<string | null>(null)

  // Layout positions
  const taskX = -180
  const routerX = 0
  const providerX = 180

  // Determine what's "active" based on hover
  const getTaskActive = (taskId: string) => {
    if (!hovered) return true
    const task = TASKS.find(t => t.id === taskId)
    if (hovered === taskId || hovered === task?.complexity.toLowerCase()) return true
    if (hovered === task?.targetProvider) return true
    return false
  }

  const getProviderActive = (providerId: string) => {
    if (!hovered) return true
    if (hovered === providerId) return true
    // If a task is hovered, highlight its target provider
    const task = TASKS.find(t => t.id === hovered || t.complexity.toLowerCase() === hovered)
    if (task?.targetProvider === providerId) return true
    return false
  }

  // Route mapping: which task flows to which provider
  const routes = [
    { taskId: 'simple', providerId: 'ollama', color: COLORS.taskSimple },
    { taskId: 'medium', providerId: 'openai', color: COLORS.taskMedium },
    { taskId: 'complex', providerId: 'anthropic', color: COLORS.taskComplex },
  ]

  const getRouteActive = (taskId: string, providerId: string) => {
    if (!hovered) return true
    const task = TASKS.find(t => t.id === taskId)
    if (hovered === taskId || hovered === task?.complexity.toLowerCase()) return true
    if (hovered === providerId && task?.targetProvider === providerId) return true
    return false
  }

  return (
    <div className="w-full flex flex-col items-center">
      <svg
        viewBox="-300 -110 600 230"
        className="w-full max-w-4xl"
        style={{ overflow: 'visible' }}
      >
        {/* Subtle background glow */}
        <defs>
          <radialGradient id="routerBgGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(91, 77, 227, 0.06)" />
            <stop offset="100%" stopColor="rgba(91, 77, 227, 0)" />
          </radialGradient>
        </defs>
        <ellipse cx="0" cy="10" rx="280" ry="110" fill="url(#routerBgGlow)" />

        {/* Column labels */}
        <text x={taskX} y={-90} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="9" fontWeight="500" fontFamily="'Epilogue', sans-serif" letterSpacing="0.06em">
          TASKS
        </text>
        <text x={providerX} y={-90} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="9" fontWeight="500" fontFamily="'Epilogue', sans-serif" letterSpacing="0.06em">
          PROVIDERS
        </text>

        {/* ─── Flow paths (behind everything) ─── */}
        <g>
          {/* Task to Router paths */}
          {TASKS.map((task) => (
            <FlowPath
              key={`task-router-${task.id}`}
              id={`task-router-${task.id}`}
              from={{ x: taskX + 58, y: task.y }}
              to={{ x: routerX - 32, y: 0 }}
              color={task.color}
              isActive={getTaskActive(task.id)}
              particleDur="2s"
              particleDelay={`${TASKS.indexOf(task) * 0.4}s`}
            />
          ))}

          {/* Router to Provider paths */}
          {routes.map((route) => {
            const provider = PROVIDERS.find(p => p.id === route.providerId)!
            return (
              <FlowPath
                key={`router-${route.providerId}`}
                id={`router-${route.providerId}`}
                from={{ x: routerX + 32, y: 0 }}
                to={{ x: providerX - 68, y: provider.y }}
                color={route.color}
                isActive={getRouteActive(route.taskId, route.providerId)}
                particleDur="2s"
                particleDelay={`${routes.indexOf(route) * 0.3 + 1}s`}
              />
            )
          })}

          {/* Faint connections to non-routed providers (showing they're available) */}
          {PROVIDERS.filter(p => !routes.find(r => r.providerId === p.id)).map((provider) => (
            <path
              key={`faint-${provider.id}`}
              d={`M ${routerX + 32} 0 C ${routerX + 70} 0, ${providerX - 100} ${provider.y}, ${providerX - 68} ${provider.y}`}
              fill="none"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="1"
              strokeDasharray="3 6"
            />
          ))}
        </g>

        {/* ─── Router hub (center) ─── */}
        <RouterHub x={routerX} y={0} isHovered={hovered === 'router'} />

        {/* ─── Task nodes (left) ─── */}
        {TASKS.map((task) => (
          <TaskNode
            key={task.id}
            id={task.id}
            x={taskX}
            y={task.y}
            label={task.label}
            complexity={task.complexity}
            color={task.color}
            isHovered={hovered === task.id || hovered === task.complexity.toLowerCase()}
            isActive={getTaskActive(task.id)}
            onHover={(id) => setHovered(id ? task.id : null)}
          />
        ))}

        {/* ─── Provider nodes (right) ─── */}
        {PROVIDERS.map((provider) => (
          <ProviderNode
            key={provider.id}
            id={provider.id}
            x={providerX}
            y={provider.y}
            label={provider.label}
            sublabel={provider.sublabel}
            tier={provider.tier}
            color={provider.color}
            isHovered={hovered === provider.id}
            isActive={getProviderActive(provider.id)}
            onHover={setHovered}
          />
        ))}
      </svg>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS.taskSimple }} />
          <span>Simple tasks</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS.taskMedium }} />
          <span>Medium tasks</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS.taskComplex }} />
          <span>Complex tasks</span>
        </div>
      </div>
    </div>
  )
}
