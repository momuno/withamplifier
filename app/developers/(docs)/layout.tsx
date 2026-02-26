'use client'

import { useEffect, useState } from 'react'

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -75% 0px', threshold: 0 }
    )

    // Observe all doc sections
    document.querySelectorAll('.doc-section').forEach(el => {
      observer.observe(el)
    })

    // Update TOC active states
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // Update active class on TOC links
    document.querySelectorAll('.doc-toc li a, .doc-toc-inline li a').forEach(link => {
      const href = link.getAttribute('href')
      if (href === `#${activeSection}`) {
        link.classList.add('active')
      } else {
        link.classList.remove('active')
      }
    })
  }, [activeSection])

  return <>{children}</>
}
