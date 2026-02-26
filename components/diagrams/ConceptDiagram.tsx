import { ReactNode } from 'react'

/* ============================================
   Flow Diagram Components
   ============================================ */

interface ConceptDiagramProps {
  title: string
  variant?: 'sequential' | 'fallback'
  children: ReactNode
}

export default function ConceptDiagram({ title, variant = 'sequential', children }: ConceptDiagramProps) {
  return (
    <figure className="cd-diagram" role="img" aria-label={`Flow diagram: ${title}`} data-variant={variant}>
      <div className="cd-title">{title}</div>
      <div className="cd-steps">
        {children}
      </div>
    </figure>
  )
}

interface StepProps {
  number: number
  label: string
  badge?: string
  badgeVariant?: 'required' | 'warn'
  children?: ReactNode
}

export function Step({ number, label, badge, badgeVariant, children }: StepProps) {
  return (
    <div className="cd-step">
      <div className="cd-step-number">{number}</div>
      <div className="cd-step-content">
        <div className="cd-step-label">
          {label}
          {badge && (
            <span className={`cd-badge cd-badge-${badgeVariant || 'required'}`}>
              {badge}
            </span>
          )}
        </div>
        {children && <div className="cd-step-body">{children}</div>}
      </div>
    </div>
  )
}

interface SubFlowProps {
  label: string
  annotation?: string
  children: ReactNode
}

export function SubFlow({ label, annotation, children }: SubFlowProps) {
  return (
    <div className="cd-subflow">
      <div className="cd-subflow-header">
        <span className="cd-subflow-label">{label}</span>
        {annotation && <span className="cd-subflow-annotation">&mdash; {annotation}</span>}
      </div>
      <div className="cd-substeps">
        {children}
      </div>
    </div>
  )
}

interface SubStepProps {
  label: string
  children?: ReactNode
}

export function SubStep({ label, children }: SubStepProps) {
  return (
    <div className="cd-substep">
      <div className="cd-substep-dot" />
      <div className="cd-substep-content">
        <span className="cd-substep-label">{label}</span>
        {children && <span className="cd-substep-body"> &mdash; {children}</span>}
      </div>
    </div>
  )
}

/* ============================================
   Architecture Diagram Components
   ============================================ */

interface ArchDiagramProps {
  title: string
  children: ReactNode
}

export function ArchDiagram({ title, children }: ArchDiagramProps) {
  return (
    <figure className="cd-arch" role="img" aria-label={`Architecture diagram: ${title}`}>
      <div className="cd-arch-title">{title}</div>
      {children}
    </figure>
  )
}

interface ArchLayerProps {
  label: string
  variant?: 'primary' | 'secondary'
  children: ReactNode
}

export function ArchLayer({ label, variant = 'primary', children }: ArchLayerProps) {
  return (
    <div className={`cd-arch-layer cd-arch-layer-${variant}`}>
      <div className="cd-arch-layer-label">{label}</div>
      {children}
    </div>
  )
}

interface ArchConnectionProps {
  label: string
}

export function ArchConnection({ label }: ArchConnectionProps) {
  return (
    <div className="cd-arch-connection">
      <div className="cd-arch-connection-arrow" />
      <span className="cd-arch-connection-label">{label}</span>
    </div>
  )
}

interface ArchGroupProps {
  label: string
  children: ReactNode
}

export function ArchGroup({ label, children }: ArchGroupProps) {
  return (
    <div className="cd-arch-group">
      <div className="cd-arch-group-label">{label}</div>
      <div className="cd-arch-group-items">
        {children}
      </div>
    </div>
  )
}

interface ArchItemProps {
  annotation?: string
  children: ReactNode
}

export function ArchItem({ annotation, children }: ArchItemProps) {
  return (
    <div className="cd-arch-item">
      {children}
      {annotation && <span className="cd-arch-item-annotation">{annotation}</span>}
    </div>
  )
}
