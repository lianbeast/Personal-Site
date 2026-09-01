import { site } from '../config'
import { ScrollReveal } from './ScrollReveal'
import { Background } from './Background'

function embedUrl() {
  const { embedBase, projectUrl, datasets, embedParams } = site.geolibre
  if (projectUrl) {
    return `${embedBase}/?url=${encodeURIComponent(projectUrl)}${embedParams}`
  }
  if (!datasets.length) return embedBase
  const pairs = datasets
    .map((d) => {
      const data = `data=${encodeURIComponent(d.url)}`
      return d.style ? `${data}&style=${encodeURIComponent(d.style)}` : `${data}&style=`
    })
    .join('&')
  return `${embedBase}/?${pairs}${embedParams}`
}

export function MapRoomSection() {
  const src = embedUrl()
  return (
    <section className="relative border-t border-[var(--color-border)] px-6 py-24 sm:py-32" id="map-room">
      <Background variant="nebula" />
      <div className="relative z-10 mx-auto max-w-4xl">
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-text-subtle)] uppercase">
                map room
              </p>
              <h2 className="mt-4 font-display text-2xl font-medium tracking-tight text-white sm:text-3xl">
                The Map Room
              </h2>
            </div>
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-wider text-[var(--color-text-subtle)] transition hover:text-[var(--color-text)]"
            >
              Launch GeoLibre &rarr;
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-8 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)]">
            <iframe
              src={src}
              title="GeoLibre map"
              className="h-[50vh] w-full border-0 sm:h-[60vh]"
              loading="lazy"
              allow="fullscreen; geolocation"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="mt-4 text-xs text-[var(--color-text-subtle)]">
            A full GIS in your browser &mdash; powered by{' '}
            <a
              href="https://geolibre.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-accent)] transition hover:text-[var(--color-accent-hover)]"
            >
              GeoLibre
            </a>
            . A complete GIS in your browser &mdash; pan, zoom, style layers, and run geoprocessing &mdash; all local, nothing leaves your machine.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}