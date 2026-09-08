import { useEffect, useRef } from 'react';
import { BackgroundVariant } from '../types/background';

interface BackgroundProps {
  variant: BackgroundVariant;
  className?: string;
  children?: React.ReactNode;
}

const variantClasses: Record<BackgroundVariant, string> = {
  stars: 'bg-stars',
  nebula: 'bg-nebula',
  blueprint: 'bg-blueprint',
  noise: 'bg-noise relative',
  contours: 'bg-contours',
  space: 'bg-space',
  techImage: 'bg-tech-image',
  spaceTech: 'bg-space-tech',
};

export function Background({ variant, className = '', children }: BackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const cls = variantClasses[variant] || '';

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY * 0.15;
        el.style.transform = `translate3d(0, ${y}px, 0)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`absolute inset-0 pointer-events-none ${cls} ${className}`}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}
