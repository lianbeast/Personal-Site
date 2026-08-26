import { site } from '../config'
import { FadeIn } from './FadeIn'

function embedUrl() {
  const { embedBase, data, embedParams } = site.geolibre
  return data
    ? `${embedBase}/?data=${encodeURIComponent(data)}${embedParams}`
    : `${embedBase}/?${embedParams.slice(1)}`
}

export function MapRoomSection() {
  const src = embedUrl()
  return (
    <section className="relative border-t var(--color-border) px-6 py-24 sm:py-32" id="map-room">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] tracking-widest text-slate-500 uppercase">
                map room
              </p>
              <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                GeoLibre GIS
              </h2>
            </div>
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-wider text-slate-500 transition hover:text-slate-300"
            >
              open full screen &rarr;
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={1}>
          <div className="mt-8 overflow-hidden rounded-xl border var(--color-border) bg-[var(--color-bg-card)]">
            <iframe
              src={src}
              title="GeoLibre map"
              className="h-[50vh] w-full border-0 sm:h-[60vh]"
              loading="lazy"
              allow="geolocation"
            />
          </div>
        </FadeIn>

        <FadeIn delay={2}>
          <p className="mt-4 text-xs text-slate-500">
            Interactive GIS running in your browser &mdash; powered by{' '}
            <a
              href="https://geolibre.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-accent)] transition hover:text-[var(--color-accent-hover)]"
            >
              GeoLibre
            </a>
            . Pan, zoom, and explore &mdash; all local, no data leaves your machine.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}