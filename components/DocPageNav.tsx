interface DocPageNavProps {
  current: number
  total: number
  prev?: { href: string; label: string }
  next?: { href: string; label: string }
}

const chevronLeft = (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path
      d="M7.5 2.5L4 6l3.5 3.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const chevronRight = (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path
      d="M4.5 2.5L8 6l-3.5 3.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function DocPageNav({ current, total, prev, next }: DocPageNavProps) {
  const pageLabel = `${String(current).padStart(2, '0')} of ${String(total).padStart(2, '0')}`

  return (
    <nav className="doc-page-nav" aria-label="Page navigation">
      {prev ? (
        <a
          href={prev.href}
          className="doc-page-nav-arrow"
          aria-label={`Previous: ${prev.label}`}
        >
          {chevronLeft}
        </a>
      ) : (
        <span className="doc-page-nav-arrow doc-page-nav-arrow--disabled" aria-hidden="true">
          {chevronLeft}
        </span>
      )}

      <span className="doc-page-nav-label">{pageLabel}</span>

      {next ? (
        <a
          href={next.href}
          className="doc-page-nav-arrow"
          aria-label={`Next: ${next.label}`}
        >
          {chevronRight}
        </a>
      ) : (
        <span className="doc-page-nav-arrow doc-page-nav-arrow--disabled" aria-hidden="true">
          {chevronRight}
        </span>
      )}
    </nav>
  )
}
