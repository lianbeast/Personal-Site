import { useEffect, useRef, useState } from 'react'

const SCENES = ['s-hero', 's-about', 's-capabilities', 's-projects', 's-contact'] as const
const LABELS = ['hero', 'about', 'capabilities', 'projects', 'contact'] as const

/* Depth meter (left) + progress rail (right) — fixed HUD for the narrative.
   Scroll → altitude readout + bar fill + active rail dot. */
export function NarrativeHUD() {
  const [p, setP] = useState(0)
  const [active, setActive] = useState(0)
  const raf = useRef(0)

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          const i = SCENES.indexOf(e.target.id as (typeof SCENES)[number])
          if (i >= 0) setActive(i)
        })
      },
      { threshold: 0.5 },
    )
    SCENES.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })

    const onScroll = () => {
      cancelAnimationFrame(raf.current)
      raf.current = requestAnimationFrame(() => {
        // Descent ends with the narrative (main), not the document bottom.
        const main = document.querySelector('main')
        const max = main
          ? main.offsetTop + main.offsetHeight - window.innerHeight
          : document.documentElement.scrollHeight - window.innerHeight
        setP(max > 0 ? Math.min(1, window.scrollY / max) : 0)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf.current)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const km = Math.round(400 - p * 396)

  return (
    <>
      <div className="depth-meter" aria-hidden="true">
        <span>ALT</span>
        <div className="depth-bar">
          <i style={{ transform: `scaleY(${p})` }} />
        </div>
        <span className="depth-val">{p >= 1 ? 'ground' : `${km}km`}</span>
      </div>

      <nav className="scene-rail" aria-label="Scenes">
        {SCENES.map((id, i) => (
          <a key={id} href={`#${id}`} aria-label={LABELS[i]} className={i === active ? 'on' : ''} />
        ))}
      </nav>
    </>
  )
}
