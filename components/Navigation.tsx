'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/start', label: 'Start here' },
  { href: '/explore', label: 'Explore' },
  { href: '/build', label: 'Build' },
  { href: '/support', label: 'Support' },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-canvas/80 backdrop-blur-md border-b border-canvas-mist/50" />
      <nav className="relative max-w-wide mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <Link 
          href="/" 
          className="text-ink font-semibold tracking-tight hover:text-signal transition-colors duration-300"
        >
          with amplifier
        </Link>

        <ul className="flex items-center gap-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`px-4 py-2 text-[15px] font-medium rounded-soft transition-all duration-300 ${
                  pathname === item.href
                    ? 'text-signal bg-signal-soft'
                    : 'text-ink-slate hover:text-ink hover:bg-canvas-stone'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
