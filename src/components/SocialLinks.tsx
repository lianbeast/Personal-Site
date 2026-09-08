import { site } from '../config'

type Variant = 'inline' | 'stacked' | 'footer'
interface SocialLinksProps {
  variant?: Variant
  className?: string
}

const SIMPLE_ICONS = 'https://cdn.simpleicons.org'
const ICON_MAP: Record<string, string> = {
  github: 'github',
  linkedin: 'linkedin',
  x: 'x',
  email: 'maildotru',
}

const ITEMS = Object.entries(site.links).map(([key, href]) => ({
  key,
  label: key.charAt(0).toUpperCase() + key.slice(1),
  href,
  iconSrc: key in ICON_MAP ? `${SIMPLE_ICONS}/${ICON_MAP[key]}/ffffff` : null,
}))

function Icon({ src }: { src: string }) {
  return <img src={src} alt="" aria-hidden="true" className="h-4 w-4 opacity-70" loading="lazy" />
}

export function SocialLinks({ variant = 'inline', className = '' }: SocialLinksProps) {
  const linkProps = (href: string) => ({
    href,
    target: href.startsWith('mailto') ? undefined : '_blank',
    rel: href.startsWith('mailto') ? undefined : 'noopener noreferrer',
  })

  if (variant === 'inline') {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-8 ${className}`}>
        {ITEMS.map(({ key, label, href, iconSrc }) => (
          <a
            key={key}
            {...linkProps(href)}
            className="flex items-center gap-2 text-[10px] tracking-[0.25em] text-[var(--color-text-subtle)] uppercase transition-colors duration-300 hover:text-[var(--color-accent)]"
          >
            {iconSrc && <Icon src={iconSrc} />}
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
          <span key={item.key} className="inline-flex items-center gap-1.5">
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
    <div className={`flex items-center gap-5 ${className}`}>
      {ITEMS.map(({ key, label, href, iconSrc }) => (
        <a
          key={key}
          {...linkProps(href)}
          className="flex items-center gap-1.5 text-xs text-[var(--color-text-subtle)] transition-colors duration-300 hover:text-[var(--color-accent)]"
        >
          {iconSrc && <Icon src={iconSrc} />}
          {label}
        </a>
      ))}
    </div>
  )
}
