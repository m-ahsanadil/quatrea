export type SeasonKey = 'spring' | 'summer' | 'autumn' | 'winter'

export interface SeasonNote {
  top: string[]
  heart: string[]
  base: string[]
}

export interface SeasonColors {
  bg: string
  fg: string
  accent: string
  /** Accent for small text; meets 4.5:1 on `bg` (the plain accent does not on Spring). */
  accentText: string
  cardGradient: string
}

export interface Season {
  key: SeasonKey
  number: string
  name: string
  perfume: string
  tagline: string
  description: string
  story: string
  craft: string
  notes: SeasonNote
  colors: SeasonColors
}

export const SEASONS: Record<SeasonKey, Season> = {
  spring: {
    key: 'spring',
    number: '01',
    name: 'Spring',
    perfume: 'Floraison',
    tagline: 'Born from the first breath of spring',
    description:
      'A delicate bloom of cherry blossom and white tea, kissed by morning dew and whispered petals. Floraison is the scent of new beginnings.',
    story:
      'In the stillness before dawn, when frost still clings to unopened buds, there is a moment of quiet anticipation. Floraison was composed to live in that moment — not the bloom itself, but the promise of it. The fragrance opens with the cool clarity of Japanese cherry blossom, brightened by the astringent freshness of green tea. As the morning warms, peony and white jasmine emerge in a heart of soft femininity. The base settles into clean woods and skin musk — a warmth that suggests the earth waking beneath your feet.',
    craft:
      'Each component in Floraison is cold-extracted to preserve the most volatile aromatic compounds, ensuring the fragrance remains true to its source throughout its wear.',
    notes: {
      top: ['Cherry Blossom', 'Green Tea', 'Bergamot'],
      heart: ['Peony', 'White Jasmine', 'Rose Water'],
      base: ['White Musk', 'Cedarwood', 'Sandalwood'],
    },
    colors: {
      bg: '#F5EDE8',
      fg: '#2C2420',
      accent: '#C0787A',
      accentText: '#9A5254',
      cardGradient:
        'linear-gradient(145deg, #FBF4F0 0%, #E8C0C0 40%, #A8C0A0 100%)',
    },
  },
  summer: {
    key: 'summer',
    number: '02',
    name: 'Summer',
    perfume: 'Solstice',
    tagline: 'The long day at its peak',
    description:
      'An intoxicating blend of Mediterranean citrus and sun-warmed amber. Solstice is the scent of a day that refuses to end.',
    story:
      'At the height of summer, when the sun stands still and shadows grow short, Solstice captures the intensity of that singular moment. It opens with a burst of Sicilian bergamot and neroli — sharp, radiant, alive. The heart unfolds slowly, like afternoon stretching into evening: orange blossom in full extravagance, ylang-ylang pressing warm against the skin. At dusk, as the air finally cools, the base reveals itself — amber resin, sandalwood, a trace of labdanum — the memory of heat stored in stone.',
    craft:
      'The amber accord in Solstice is a proprietary blend aged for fourteen months before incorporation, developing depth and complexity that cannot be rushed.',
    notes: {
      top: ['Bergamot', 'Neroli', 'Lemon Zest'],
      heart: ['Orange Blossom', 'Ylang-Ylang', 'Tuberose'],
      base: ['Amber', 'Sandalwood', 'Labdanum'],
    },
    colors: {
      bg: '#100800',
      fg: '#FFF0D8',
      accent: '#E8A020',
      accentText: '#E8A020',
      cardGradient:
        'linear-gradient(145deg, #1A0800 0%, #C87820 50%, #E04020 100%)',
    },
  },
  autumn: {
    key: 'autumn',
    number: '03',
    name: 'Autumn',
    perfume: 'Crépuscule',
    tagline: 'Where warmth meets shadow',
    description:
      'A complex weave of spiced plum and oakmoss, deepened by warm vanilla. Crépuscule is the scent of the hour between day and dark.',
    story:
      'Crépuscule — the French word for twilight — was conceived for the season of transformation. When light turns amber and the air carries the sweetness of decay alongside the richness of harvest, something remarkable happens to the senses. This fragrance opens with black pepper and cardamom: sharp, assertive, demanding attention. The heart blooms into a dark plum accord threaded with rose — complex, contradictory, deeply alluring. The base is an ancient woodland after rain: oakmoss, patchouli, a long trail of vanilla resin.',
    craft:
      'The oakmoss in Crépuscule is sourced exclusively from sustainable Balkan forests, its distinctive green-dark character irreplaceable by synthesis.',
    notes: {
      top: ['Black Pepper', 'Cardamom', 'Clove'],
      heart: ['Dark Plum', 'Rose Absolute', 'Leather'],
      base: ['Oakmoss', 'Patchouli', 'Vanilla Resin'],
    },
    colors: {
      bg: '#0D0804',
      fg: '#F0E0C8',
      accent: '#C4793E',
      accentText: '#C4793E',
      cardGradient:
        'linear-gradient(145deg, #0D0804 0%, #A05828 50%, #600800 100%)',
    },
  },
  winter: {
    key: 'winter',
    number: '04',
    name: 'Winter',
    perfume: 'Givre',
    tagline: 'Silence distilled',
    description:
      'A crystalline study in blue iris and arctic wood, with a heart of cold mineral clarity. Givre is the scent of absolute stillness.',
    story:
      'Givre — French for frost — is the quietest fragrance in the Quatréa collection. It does not announce itself; it accumulates, like snow. The opening is almost invisible: a breath of iris, a suggestion of violet, aldehydes that make air seem colder than it is. The heart is mineral, like stone touched by ice or water from a deep spring — elemental, austere. The drydown is long and silver: vetiver cut clean, white musk without warmth, a note of birchwood that evokes leafless trees against a grey sky.',
    craft:
      'The iris root used in Givre is orris butter aged for three years after harvest — a process that transforms its earthy character into the powdery, crystalline quality essential to this composition.',
    notes: {
      top: ['Blue Iris', 'Aldehydes', 'Cold Violet'],
      heart: ['Mineral Accord', 'Frozen Water', 'White Tea'],
      base: ['Vetiver', 'White Musk', 'Birchwood'],
    },
    colors: {
      bg: '#040812',
      fg: '#E8F4FF',
      accent: '#7BA7C8',
      accentText: '#7BA7C8',
      cardGradient:
        'linear-gradient(145deg, #040812 0%, #3A6080 50%, #1A3050 100%)',
    },
  },
}

export const SEASON_KEYS: SeasonKey[] = ['spring', 'summer', 'autumn', 'winter']
