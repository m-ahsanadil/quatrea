import type { Metadata } from 'next'
import { SeasonPage } from '@/components/SeasonPage'

export const metadata: Metadata = {
  title: 'Spring — Floraison',
  description:
    'Floraison: a delicate bloom of cherry blossom and white tea, kissed by morning dew. The first fragrance in the Quatréa collection.',
}

export default function SpringPage() {
  return <SeasonPage seasonKey="spring" />
}
