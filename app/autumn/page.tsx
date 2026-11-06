import type { Metadata } from 'next'
import { SeasonPage } from '@/components/SeasonPage'

export const metadata: Metadata = {
  title: 'Autumn — Crépuscule',
  description:
    'Crépuscule: a complex weave of spiced plum and oakmoss, deepened by warm vanilla. Where warmth meets shadow.',
}

export default function AutumnPage() {
  return <SeasonPage seasonKey="autumn" />
}
