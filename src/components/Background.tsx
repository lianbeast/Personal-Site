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
};

export function Background({ variant, className = '', children }: BackgroundProps) {
  const cls = variantClasses[variant] || '';
  return (
    <div className={`absolute inset-0 pointer-events-none ${cls} ${className}`} aria-hidden="true">
      {children}
    </div>
  );
}