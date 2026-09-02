import { site } from '../config'

type Variant = 'inline' | 'stacked' | 'footer'

interface SocialLinksProps {
  variant?: Variant
  className?: string
}

const ITEMS = Object.entries(site.links).map(([key, href]) => ({
  key,
  label: key.charAt(0).toUpperCase() + key.slice(1),
  href,
})) as const

export function SocialLinks({ variant = 'inline', className = '' }: SocialLinksProps) {
  const linkProps = (href: string) => ({
    href,
    target: href.startsWith('mailto') ? undefined : '_blank' as const,
    rel: href.startsWith('mailto') ? undefined : 'noopener noreferrer' as const,
  })

  if (variant === 'inline') {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-8 ${className}`}>
        {ITEMS.map(({ key, label, href }) => (
          <a
            key={key}
            {...linkProps(href)}
            className="text-[10px] tracking-[0.25em] text-[var(--color-text-subtle)] uppercase transition-colors duration-300 hover:text-[var(--color-accent)]"
          >
            {label}
         </a>
        ))}
     </div>
    )
  }

  if (variant === 'stacked') {
    return (
      <p className={`text-xs text-[var(--color-text-subtle)] ${className}`}>
        or find me on{' '}
        {ITEMS.filter((i) => i.key !== 'email').map((item, i, arr) => (
          <span key={item.key}>
            <a
              {...linkProps(item.href)}
              className="text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)]"
            >
              {item.label}
           </a>
            {i < arr.length - 1 && ' · '}
         </span>
        ))}
     </p>
    )
  }

  // footer
  return (
    <div className={`flex gap-4 ${className}`}>
      {ITEMS.map(({ key, label, href }) => (
        <a
          key={key}
          {...linkProps(href)}
          className="text-xs text-[var(--color-text-subtle)] transition-colors duration-300 hover:text-[var(--color-accent)]"
        >
          {label}
       </a>
      ))}
   </div>
  )
}
