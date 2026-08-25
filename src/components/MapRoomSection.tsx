import { site } from '../config'

function embedUrl() {
  const { embedBase, data, embedParams } = site.geolibre
  // embedParams always starts with '&', so it extends cleanly onto a ?data= arg.
  const query = data ? `?data=${encodeURIComponent(data)}${embedParams}` : embedParams.slice(1)
  return `${embedBase}/?${query}`
}

export function MapRoomSection() {
  const src = embedUrl()
  return (
    <section className="relative border-t border-cyan-400/15 bg-slate-950 px-6 py-20" id="map-room">
      <div className="mx-auto">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-display text-[11px] font-bold tracking-[0.35em] text-cyan-400 uppercase">
              // map room
            </p>
            <h2 className="mt-2 font-display text-lg font-bold tracking-wider text-cyan-100 holo-glow">
              GeoLibre GIS
            </h2>
          </div>
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] tracking-wider text-cyan-200/50 uppercase transition hover:text-cyan-200"
          >
            open full screen ↗
          </a>
        </div>

        <div className="scanlines panel-glow relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-cyan-400/25 bg-slate-950">
          <iframe
            src={src}
            title="GeoLibre map"
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            allow="geolocation"
          />
        </div>

        <p className="mt-3 text-[11px] text-cyan-200/40">
          Interactive GIS running entirely in your browser — powered by{' '}
          <a
            href="https://geolibre.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-300/70 hover:text-cyan-200"
          >
            GeoLibre
          </a>
          . Pan, zoom, and explore — all local, no data leaves your machine.
        </p>
      </div>
    </section>
  )
}