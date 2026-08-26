import { site } from '../config'
import { HoloCard } from './HoloCard'
import type { AsyncState } from '../hooks/useAsync'

const idle: AsyncState<null> = { status: 'ok', data: null }

function embedUrl() {
  const { embedBase, data, embedParams } = site.geolibre
  return data
    ? `${embedBase}/?data=${encodeURIComponent(data)}${embedParams}`
    : `${embedBase}/?${embedParams.slice(1)}`
}

export function MapCard() {
  const src = embedUrl()

  const handleLaunch = () => {
    document.getElementById('map-room')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <HoloCard
      icon="🗺"
      title="Map Room"
      state={idle}
      onFocus={handleLaunch}
    >
      {/* Map preview — pointer-events disabled so hovering/dragging the card works.
          The "⤢ expand" button in HoloCard scrolls to the full Map Room section. */}
      <div className="scanlines relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-cyan-400/20 bg-slate-950">
        <iframe
          src={src}
          title="GeoLibre map preview"
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          style={{ pointerEvents: 'none' }}
          allow="geolocation"
        />
        {/* Overlay gradient to indicate it's a preview */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
      </div>

      <p className="mt-2 text-[10px] text-cyan-200/50">
        Interactive GIS — pan, zoom, 1000+ tools. Click ⤢ to expand.
      </p>
    </HoloCard>
  )
}
