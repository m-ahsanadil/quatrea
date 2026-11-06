import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { Navigation } from '@/components/Navigation'
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider'
import { GrainOverlay } from '@/components/GrainOverlay'
import { CursorGlow } from '@/components/CursorGlow'
import { ScrollProgress } from '@/components/ScrollProgress'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Quatréa — Four Seasons. Four Essences.',
    template: '%s | Quatréa',
  },
  description:
    'A luxury fragrance collection inspired by the four seasons. Each perfume is a singular expression of a season at its most essential.',
  keywords: ['luxury perfume', 'fragrance', 'four seasons', 'niche perfume'],
  openGraph: {
    type: 'website',
    title: 'Quatréa — Four Seasons. Four Essences.',
    description: 'A luxury fragrance collection inspired by the four seasons.',
    siteName: 'Quatréa',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <SmoothScrollProvider>
          <GrainOverlay />
          <CursorGlow />
          <ScrollProgress />
          <Navigation />
          <main>{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
