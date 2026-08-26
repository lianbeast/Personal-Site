import { useEffect, type ReactNode } from 'react'

interface FocusModalProps {
  open: boolean
  title: string
  icon: string
  onClose: () => void
  children: ReactNode
}

export function FocusModal({ open, title, icon, onClose, children }: FocusModalProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="scanlines relative max-h-[82vh] w-[min(92vw,640px)] overflow-y-auto rounded-2xl border border-cyan-400/30 bg-slate-950/95 p-4 sm:p-6 panel-glow"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-sm font-bold tracking-[0.25em] text-cyan-300 uppercase">
            {icon} {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-cyan-400 transition hover:text-white"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
