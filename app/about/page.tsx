'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { SEASONS, SEASON_KEYS } from '@/lib/seasons'

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    let ctx: { revert: () => void } | null = null

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.fromTo('.about-hero-title', { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.4, ease: 'expo.out', delay: 0.15 })
        gsap.fromTo('.about-hero-sub', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out', delay: 0.4 })

        gsap.utils.toArray<Element>('.about-reveal').forEach((el) => {
          gsap.fromTo(
            el,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.0,
              ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play none none none' },
            },
          )
        })

        gsap.from('.collection-item', {
          opacity: 0,
          y: 40,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.collection-grid', start: 'top 80%' },
        })
      }, containerRef)
    }

    init()
    return () => ctx?.revert()
  }, [])

  return (
    <div ref={containerRef} style={{ backgroundColor: '#050505', color: '#F5F0E8' }}>

      {/* ── About hero ── */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          padding: 'var(--nav-height) clamp(16px, 8vw, 120px) clamp(60px, 10vw, 120px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 70% at 20% 60%, rgba(201,168,108,0.06) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        <p
          className="about-hero-sub"
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '0.65rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#C9A86C',
            marginBottom: '2rem',
            opacity: 0,
            position: 'relative',
            zIndex: 1,
          }}
        >
          The House of Quatréa
        </p>

        <h1
          className="about-hero-title"
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 'clamp(3.5rem, 10vw, 9rem)',
            fontWeight: 300,
            lineHeight: 0.92,
            letterSpacing: '-0.03em',
            color: '#F5F0E8',
            maxWidth: '900px',
            opacity: 0,
            position: 'relative',
            zIndex: 1,
          }}
        >
          A fragrance<br />
          for every<br />
          <em style={{ color: '#C9A86C' }}>turning</em>
        </h1>
      </section>

      {/* ── Philosophy ── */}
      <section
        className="about-reveal"
        style={{
          padding: 'clamp(80px, 12vw, 160px) clamp(16px, 8vw, 120px)',
          display: 'grid',
          gridTemplateColumns: '1fr min(55ch, 100%)',
          gap: 'clamp(2rem, 6vw, 6rem)',
          alignItems: 'start',
          borderTop: '1px solid rgba(245,240,232,0.08)',
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontWeight: 300,
              lineHeight: 1.1,
              color: '#F5F0E8',
            }}
          >
            The Philosophy<br />of Four
          </h2>
        </div>
        <div>
          <p style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)', lineHeight: 1.9, color: '#F5F0E8', opacity: 0.7, marginBottom: '1.5rem' }}>
            Nature moves in a cycle of four — not because four is a number, but because transformation
            requires that many steps. From dormancy to abundance, from heat to cold, from colour to
            silence: each stage is irreplaceable. Quatréa was built on the conviction that fragrance
            is the purest medium through which we can experience these transitions.
          </p>
          <p style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)', lineHeight: 1.9, color: '#F5F0E8', opacity: 0.7 }}>
            Our perfumers work seasonally, beginning composition during the season each fragrance
            represents. They walk forests in autumn, stand in fields in summer, touch frost in winter,
            and breathe the air of the first warm morning in spring. The resulting fragrances are
            not interpretations — they are documents.
          </p>
        </div>
      </section>

      {/* ── Craft ── */}
      <section
        className="about-reveal"
        style={{
          padding: 'clamp(80px, 12vw, 160px) clamp(16px, 8vw, 120px)',
          borderTop: '1px solid rgba(245,240,232,0.08)',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '0.65rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#C9A86C',
            marginBottom: '3rem',
            opacity: 0.7,
          }}
        >
          The Art of Extraction
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))',
          gap: '2px',
        }}>
          {[
            {
              title: 'Cold Extraction',
              body: 'The most volatile aromatic compounds are preserved through cold-process extraction, capturing the living quality of the raw material.',
            },
            {
              title: 'Aged Accords',
              body: 'Key base notes are blended months in advance and allowed to macerate before the final composition, developing complexity that cannot be accelerated.',
            },
            {
              title: 'Source Fidelity',
              body: 'Every ingredient is traced to its origin. Orris butter aged three years. Oakmoss from Balkan old-growth forests. The source shapes the soul.',
            },
            {
              title: 'Seasonal Calendars',
              body: 'Production of each fragrance is timed to its season. Floraison is bottled in spring. Givre in winter. The cycle is non-negotiable.',
            },
          ].map(({ title, body }) => (
            <div
              key={title}
              style={{
                padding: '2.5rem 2rem',
                background: 'rgba(201,168,108,0.04)',
                borderTop: '1px solid rgba(201,168,108,0.2)',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)',
                  fontWeight: 400,
                  color: '#F5F0E8',
                  marginBottom: '1rem',
                }}
              >
                {title}
              </h3>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.75, color: '#F5F0E8', opacity: 0.55 }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Collection links ── */}
      <section
        style={{
          padding: 'clamp(80px, 12vw, 160px) clamp(16px, 8vw, 120px)',
          borderTop: '1px solid rgba(245,240,232,0.08)',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '0.65rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#C9A86C',
            marginBottom: '3rem',
            opacity: 0.7,
          }}
        >
          The Collection
        </p>
        <div
          className="collection-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))',
            gap: '2px',
          }}
        >
          {SEASON_KEYS.map((key) => {
            const s = SEASONS[key]
            return (
              <Link
                key={key}
                href={`/${key}`}
                className="collection-item"
                style={{
                  display: 'block',
                  padding: '3rem 2rem',
                  background: s.colors.cardGradient,
                  textDecoration: 'none',
                  transition: 'transform 0.3s ease',
                }}
              >
                <span style={{ display: 'block', fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#fff', opacity: 0.55, marginBottom: '1rem' }}>
                  {s.number}
                </span>
                <span style={{ display: 'block', fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 300, color: '#fff', lineHeight: 1, marginBottom: '0.4rem' }}>
                  {s.name}
                </span>
                <span style={{ display: 'block', fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#fff', opacity: 0.65 }}>
                  {s.perfume} →
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        style={{
          padding: 'clamp(40px, 6vw, 60px) clamp(16px, 8vw, 120px)',
          borderTop: '1px solid rgba(245,240,232,0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <span style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.1rem', letterSpacing: '0.15em', color: '#F5F0E8', opacity: 0.4 }}>
          QUATRÉA
        </span>
        <span style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.65rem', color: '#F5F0E8', opacity: 0.2 }}>
          © 2024 Quatréa. All rights reserved.
        </span>
      </footer>
    </div>
  )
}
