import type { Metadata } from 'next'
import { SeasonView } from '@/components/season/SeasonView'

export const metadata: Metadata = {
  title: 'Autumn — Crépuscule',
  description:
    'Crépuscule: a complex weave of spiced plum and oakmoss, deepened by warm vanilla. Where warmth meets shadow.',
}

export default function AutumnPage() {
  return <SeasonView seasonKey="autumn" />
}
