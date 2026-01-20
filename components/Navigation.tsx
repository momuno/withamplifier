'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const navItems = [
  { href: '/explore', label: 'Explore' },
  { href: '/build', label: 'Build' },
  { href: '/support', label: 'Support' },
]

export default function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  
  // Close menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])
  
  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Progressive blur - starts strong at top, fades to nothing */}
      <div className="absolute inset-x-0 top-0 h-32 pointer-events-none">
        {/* Layer 1 - strongest blur at very top */}
        <div className="absolute inset-0" style={{ 
          backdropFilter: 'blur(12px)', 
          WebkitBackdropFilter: 'blur(12px)', 
          maskImage: 'linear-gradient(to bottom, black 0%, black 30%, transparent 50%)', 
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 30%, transparent 50%)' 
        }} />
        {/* Layer 2 - medium blur */}
        <div className="absolute inset-0" style={{ 
          backdropFilter: 'blur(8px)', 
          WebkitBackdropFilter: 'blur(8px)', 
          maskImage: 'linear-gradient(to bottom, transparent 25%, black 40%, black 50%, transparent 70%)', 
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 25%, black 40%, black 50%, transparent 70%)' 
        }} />
        {/* Layer 3 - light blur fading out */}
        <div className="absolute inset-0" style={{ 
          backdropFilter: 'blur(4px)', 
          WebkitBackdropFilter: 'blur(4px)', 
          maskImage: 'linear-gradient(to bottom, transparent 45%, black 60%, transparent 85%)', 
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 45%, black 60%, transparent 85%)' 
        }} />
        {/* Layer 4 - subtle blur at edge */}
        <div className="absolute inset-0" style={{ 
          backdropFilter: 'blur(2px)', 
          WebkitBackdropFilter: 'blur(2px)', 
          maskImage: 'linear-gradient(to bottom, transparent 60%, black 75%, transparent 100%)', 
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 60%, black 75%, transparent 100%)' 
        }} />
      </div>
      
      {/* Nav bar background - semi-transparent overlay */}
      <div className="absolute inset-x-0 top-0 h-16 bg-canvas/60 border-b border-canvas-mist/30" />
      <nav className="relative max-w-wide mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <Link 
          href="/" 
          className="text-ink font-semibold tracking-tight hover:text-signal transition-colors duration-300"
        >
          Amplifier
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
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

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-soft hover:bg-canvas-stone transition-colors"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          <div className="w-5 h-4 relative flex flex-col justify-between">
            <span 
              className={`block h-0.5 bg-ink rounded-full transition-all duration-300 origin-center ${
                isOpen ? 'rotate-45 translate-y-[7px]' : ''
              }`} 
            />
            <span 
              className={`block h-0.5 bg-ink rounded-full transition-all duration-300 ${
                isOpen ? 'opacity-0 scale-0' : ''
              }`} 
            />
            <span 
              className={`block h-0.5 bg-ink rounded-full transition-all duration-300 origin-center ${
                isOpen ? '-rotate-45 -translate-y-[7px]' : ''
              }`} 
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div 
        className={`md:hidden fixed inset-0 top-16 bg-canvas/95 backdrop-blur-lg transition-all duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <nav className="px-6 py-8">
          <ul className="space-y-2">
            {navItems.map((item, index) => (
              <li 
                key={item.href}
                className={`transform transition-all duration-300 ${
                  isOpen 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: isOpen ? `${index * 50}ms` : '0ms' }}
              >
                <Link
                  href={item.href}
                  className={`block px-4 py-4 text-lg font-medium rounded-soft transition-all duration-300 ${
                    pathname === item.href
                      ? 'text-signal bg-signal-soft'
                      : 'text-ink hover:bg-canvas-stone'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
