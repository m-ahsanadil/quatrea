import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { Navigation } from '@/components/Navigation'
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider'
import { GrainOverlay } from '@/components/GrainOverlay'
import { CursorGlow } from '@/components/CursorGlow'
import { ScrollProgress } from '@/components/ScrollProgress'
import { RouteEffects } from '@/components/RouteEffects'
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

export const viewport: Viewport = {
  themeColor: '#050505',
  colorScheme: 'dark',
}

/**
 * Runs before first paint. Entrance animations hide their elements only while
 * `motion-ok` is on <html>, so content is visible without scripting, with
 * reduced motion, or if the animation runtime fails to start in time.
 */
const MOTION_GUARD = `(function(){var d=document.documentElement;if(!matchMedia('(prefers-reduced-motion: no-preference)').matches)return;d.classList.add('motion-ok');setTimeout(function(){if(!d.classList.contains('motion-ready')){d.classList.remove('motion-ok');d.classList.add('motion-failed')}},5000)})()`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_GUARD }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SmoothScrollProvider>
          <GrainOverlay />
          <CursorGlow />
          <ScrollProgress />
          <Navigation />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <RouteEffects />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
