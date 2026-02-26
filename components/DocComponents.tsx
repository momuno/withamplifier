'use client'

import { CopyButton } from '@/components/CopyButton'

// === DocCodeBlock: Code block with header label ===
interface DocCodeBlockProps {
  code: string
  label?: string
  sourceUrl?: string
  className?: string
}

export function DocCodeBlock({ code, label, sourceUrl, className = '' }: DocCodeBlockProps) {
  return (
    <div className={`doc-breakout doc-code-wrapper ${className}`}>
      {label && (
        <div className="doc-code-header">
          <span className="doc-code-label">
            {label}
          </span>
          <div className="flex items-center gap-2">
            {sourceUrl && (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-fog hover:text-signal transition-colors"
                title="View in repository"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
            <CopyButton text={code} />
          </div>
        </div>
      )}
      <pre style={{ margin: 0 }}><code className="code-block pr-12 block">{code}</code></pre>
    </div>
  )
}

// === DocDiagram: ASCII flow diagram ===
interface DocDiagramProps {
  diagram: string
  label?: string
  className?: string
}

export function DocDiagram({ diagram, label, className = '' }: DocDiagramProps) {
  return (
    <div className={`doc-breakout doc-code-wrapper ${className}`}>
      {label && (
        <div className="doc-code-header">
          <span className="doc-code-label">{label}</span>
        </div>
      )}
      <pre className="doc-diagram"><code>{diagram}</code></pre>
    </div>
  )
}

// === DocTable: Reference table with breakout ===
interface DocTableProps {
  headers: string[]
  rows: (string | React.ReactNode)[][]
  className?: string
}

export function DocTable({ headers, rows, className = '' }: DocTableProps) {
  return (
    <div className={`doc-breakout doc-table-wrapper ${className}`}>
      <table className="doc-table">
        <thead>
          <tr>
            {headers.map((h, i) => <th key={i}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => <td key={j}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// === DocSection: Section with number and anchor ===
interface DocSectionProps {
  id: string
  number: string
  title: string
  children: React.ReactNode
}

export function DocSection({ id, number, title, children }: DocSectionProps) {
  return (
    <section id={id} className="doc-section">
      <span className="doc-section-number">{number}</span>
      <h2 className="doc-section-title">
        {title}
        <a href={`#${id}`} className="doc-anchor" aria-label={`Link to ${title}`}>#</a>
      </h2>
      {children}
    </section>
  )
}

// === DocPagination: Prev/Next navigation ===
interface DocPaginationProps {
  prev?: { href: string; label: string }
  next?: { href: string; label: string }
}

export function DocPagination({ prev, next }: DocPaginationProps) {
  return (
    <nav aria-label="Documentation pages" className="doc-pagination">
      {prev ? (
        <a href={prev.href} className="doc-pagination-card doc-pagination-prev">
          <span className="doc-pagination-direction">&larr; Previous</span>
          <span className="doc-pagination-label">{prev.label}</span>
        </a>
      ) : <div />}
      {next ? (
        <a href={next.href} className="doc-pagination-card doc-pagination-next">
          <span className="doc-pagination-direction">Next &rarr;</span>
          <span className="doc-pagination-label">{next.label}</span>
        </a>
      ) : <div />}
    </nav>
  )
}

// === DocNote: Blockquote callout for source references ===
interface DocNoteProps {
  children: React.ReactNode
}

export function DocNote({ children }: DocNoteProps) {
  return (
    <blockquote>
      {children}
    </blockquote>
  )
}
