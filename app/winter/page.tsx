import type { Metadata } from 'next'
import { SeasonView } from '@/components/season/SeasonView'

export const metadata: Metadata = {
  title: 'Winter — Givre',
  description:
    'Givre: a crystalline study in blue iris and arctic wood. Silence distilled into fragrance.',
}

export default function WinterPage() {
  return <SeasonView seasonKey="winter" />
}
