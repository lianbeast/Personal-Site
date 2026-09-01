import { site } from '../config'
import { Background } from './Background'

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--color-border)] px-6 py-10">
      <Background variant="blueprint" />
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-[10px] text-[var(--color-text-subtle)]">
          &copy; {new Date().getFullYear()} {site.name}
        </p>
        <div className="flex gap-4">
          {[
            { href: site.links.github, label: 'GitHub' },
            { href: site.links.linkedin, label: 'LinkedIn' },
            { href: site.links.x, label: 'X' },
            { href: site.links.email, label: 'Email' },
          ].map(({ href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="text-xs text-[var(--color-text-subtle)] transition-colors duration-300 hover:text-[var(--color-accent)]"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}