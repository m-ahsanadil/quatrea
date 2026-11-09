import type { Metadata } from 'next'
import { AboutView } from '@/components/about/AboutView'

export const metadata: Metadata = {
  title: 'About — The House of Quatréa',
  description:
    'The philosophy, craft, and story behind Quatréa — a luxury fragrance collection inspired by the four seasons.',
}

export default function AboutPage() {
  return <AboutView />
}
