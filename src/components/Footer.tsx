import { site } from '../config'

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] px-6 py-10">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-xs text-slate-600">
          © {new Date().getFullYear()} {site.name}
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
              className="text-xs text-slate-600 transition hover:text-slate-400"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
