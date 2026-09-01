export type BackgroundVariant =
  | 'stars'
  | 'nebula'
  | 'blueprint'
  | 'noise'
  | 'contours'
  | 'space'
  | 'techImage'
  | 'spaceTech';

export const backgroundVariants: { value: BackgroundVariant; label: string; description: string }[] = [
  { value: 'stars', label: 'Star Field', description: 'Deep space with faint stars' },
  { value: 'nebula', label: 'Nebula Wisps', description: 'Dark purple/blue gas clouds' },
  { value: 'blueprint', label: 'Blueprint Grid', description: 'Engineering grid lines' },
  { value: 'noise', label: 'Film Grain', description: 'Monochrome noise texture' },
  { value: 'contours', label: 'Topographic Contours', description: 'Gold contour lines' },
  { value: 'space', label: 'Full Space', description: 'Stars + nebula combined' },
  { value: 'techImage', label: 'AI Tech Background', description: 'Generated tech/engineering image' },
  { value: 'spaceTech', label: 'Space + Tech Image', description: 'Stars + nebula + AI tech image' },
];