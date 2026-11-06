import type { Metadata } from 'next'
import { SeasonPage } from '@/components/SeasonPage'

export const metadata: Metadata = {
  title: 'Summer — Solstice',
  description:
    'Solstice: an intoxicating blend of Mediterranean citrus and sun-warmed amber. The long day at its peak.',
}

export default function SummerPage() {
  return <SeasonPage seasonKey="summer" />
}
