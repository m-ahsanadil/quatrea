export const ABOUT_HERO = {
  eyebrow: 'The House of Quatréa',
  lines: ['A fragrance', 'for every'],
  accent: 'turning',
} as const

export const STATS = [
  { value: '4', label: 'Fragrances' },
  { value: '36', label: 'Ingredients' },
  { value: '14', label: 'Months Aged' },
  { value: '∞', label: 'Moments' },
] as const

export const ABOUT_PHILOSOPHY = {
  eyebrow: 'Our Philosophy',
  heading: ['The Philosophy', 'of Four'],
  paragraphs: [
    'Nature moves in a cycle of four — not because four is a number, but because transformation requires that many steps. From dormancy to abundance, from heat to cold, from colour to silence: each stage is irreplaceable. Quatréa was built on the conviction that fragrance is the purest medium through which we can experience these transitions.',
    'Our perfumers work seasonally, beginning composition during the season each fragrance represents. They walk forests in autumn, stand in fields in summer, touch frost in winter, and breathe the air of the first warm morning in spring. The resulting fragrances are not interpretations — they are documents.',
  ],
  quote:
    '“To compose a fragrance for spring, one must first forget everything one knows about spring — and simply breathe.”',
} as const

export const METHODS = {
  eyebrow: 'The Art of Extraction',
  heading: 'Our Methods',
  items: [
    {
      number: '01',
      title: 'Cold Extraction',
      body: 'The most volatile aromatic compounds are preserved through cold-process extraction, capturing the living quality of the raw material.',
    },
    {
      number: '02',
      title: 'Aged Accords',
      body: 'Key base notes are blended months in advance and allowed to macerate before the final composition, developing complexity that cannot be accelerated.',
    },
    {
      number: '03',
      title: 'Source Fidelity',
      body: 'Every ingredient is traced to its origin. Orris butter aged three years. Oakmoss from Balkan old-growth forests. The source shapes the soul.',
    },
    {
      number: '04',
      title: 'Seasonal Calendars',
      body: 'Production of each fragrance is timed to its season. Floraison is bottled in spring. Givre in winter. The cycle is non-negotiable.',
    },
  ],
} as const

export const LINEUP_LINE = 'Four fragrances. Each a world. All one collection.'

export const ABOUT_COLLECTION = {
  eyebrow: 'The Collection',
  heading: 'Explore Each Season',
} as const
