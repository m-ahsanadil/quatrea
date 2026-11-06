import type { Metadata } from 'next'
import { SeasonPage } from '@/components/SeasonPage'

export const metadata: Metadata = {
  title: 'Winter — Givre',
  description:
    'Givre: a crystalline study in blue iris and arctic wood. Silence distilled into fragrance.',
}

export default function WinterPage() {
  return <SeasonPage seasonKey="winter" />
}
