import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — The House of Quatréa',
  description:
    'The philosophy, craft, and story behind Quatréa — a luxury fragrance collection inspired by the four seasons.',
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
