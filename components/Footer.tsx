import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-canvas-mist mt-32">
      <div className="max-w-wide mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="text-ink font-semibold tracking-tight">
              with amplifier
            </Link>
            <p className="mt-4 text-ink-fog text-sm leading-relaxed">
              AI that's yours for the making.
            </p>
          </div>

          {/* Learn */}
          <div>
            <h4 className="text-micro font-medium text-ink-fog uppercase tracking-wider mb-4">
              Learn
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="https://github.com/microsoft/amplifier" target="_blank" rel="noopener noreferrer" className="text-ink-slate text-sm hover:text-ink transition-colors duration-200">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/explore" className="text-ink-slate text-sm hover:text-ink transition-colors duration-200">
                  Explore bundles
                </Link>
              </li>
              <li>
                <Link href="https://github.com/microsoft/amplifier" className="text-ink-slate text-sm hover:text-ink transition-colors duration-200">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/updates" className="text-ink-slate text-sm hover:text-ink transition-colors duration-200">
                  Updates
                </Link>
              </li>
            </ul>
          </div>

          {/* Build */}
          <div>
            <h4 className="text-micro font-medium text-ink-fog uppercase tracking-wider mb-4">
              Build
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/build" className="text-ink-slate text-sm hover:text-ink transition-colors duration-200">
                  Install
                </Link>
              </li>
              <li>
                <Link href="https://github.com/microsoft/amplifier" className="text-ink-slate text-sm hover:text-ink transition-colors duration-200">
                  GitHub
                </Link>
              </li>
              <li>
                <Link href="https://github.com/microsoft/amplifier/blob/main/CONTRIBUTING.md" className="text-ink-slate text-sm hover:text-ink transition-colors duration-200">
                  Contributing
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-micro font-medium text-ink-fog uppercase tracking-wider mb-4">
              Community
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="https://github.com/microsoft/amplifier/discussions" className="text-ink-slate text-sm hover:text-ink transition-colors duration-200">
                  Discussions
                </Link>
              </li>
              <li>
                <Link href="https://github.com/microsoft/amplifier/issues" className="text-ink-slate text-sm hover:text-ink transition-colors duration-200">
                  Report an issue
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-ink-slate text-sm hover:text-ink transition-colors duration-200">
                  Get help
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-canvas-mist flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-micro text-ink-fog">
            Microsoft Research · Open Source
          </p>
          <p className="text-micro text-ink-fog">
            Built with Amplifier
          </p>
        </div>
      </div>
    </footer>
  )
}
