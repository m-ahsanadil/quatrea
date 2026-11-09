'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { SEASONS, SEASON_KEYS } from '@/lib/seasons'
import { DIST, DUR, EASE, SCALE_IN, STAGGER, useMotion } from '@/lib/motion'
import { FloatingParticles } from '@/components/FloatingParticles'
import { Divider } from '@/components/Divider'
import { PerfumeBottle } from '@/components/PerfumeBottle'

const STATS = [
  { value: '4', label: 'Fragrances' },
  { value: '36', label: 'Ingredients' },
  { value: '14', label: 'Months Aged' },
  { value: '∞', label: 'Moments' },
]

const METHODS = [
  {
    number: '01',
    title: 'Cold Extraction',
    body: 'The most volatile aromatic compounds are preserved through cold-process extraction, capturing the living quality of the raw material.',
  },
  {
    number: '02',
    title: 'Aged Accords',
    body: 'Key base notes are blended months in advance and allowed to macerate before the final composition, developing complexity that cannot be accelerated.',
  },
  {
    number: '03',
    title: 'Source Fidelity',
    body: 'Every ingredient is traced to its origin. Orris butter aged three years. Oakmoss from Balkan old-growth forests. The source shapes the soul.',
  },
  {
    number: '04',
    title: 'Seasonal Calendars',
    body: 'Production of each fragrance is timed to its season. Floraison is bottled in spring. Givre in winter. The cycle is non-negotiable.',
  },
]

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useMotion(containerRef, (gsap) => {
    gsap
      .timeline({ delay: 0.2 })
      .fromTo('.about-hero-line', { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: EASE.soft })
      .fromTo('.about-hero-sub', { opacity: 0, y: DIST.sm }, { opacity: 1, y: 0, duration: DUR.reveal, ease: EASE.soft }, '-=0.4')
      .fromTo(
        '.about-hero-title',
        { opacity: 0, y: DIST.lg, scale: SCALE_IN },
        { opacity: 1, y: 0, scale: 1, duration: DUR.story * 1.2, ease: EASE.cinematic },
        '-=0.5',
      )

    gsap.utils.toArray<Element>('.about-reveal').forEach((el) => {
      gsap.fromTo(el, { opacity: 0, y: DIST.md }, {
        opacity: 1, y: 0, duration: DUR.story, ease: EASE.out,
        scrollTrigger: { trigger: el, start: 'top 82%', once: true },
      })
    })

    gsap.fromTo('.craft-card', { opacity: 0, y: DIST.lg, scale: SCALE_IN }, {
      opacity: 1, y: 0, scale: 1, stagger: STAGGER.card, duration: DUR.reveal, ease: EASE.out,
      scrollTrigger: { trigger: '.craft-grid', start: 'top 80%', once: true },
    })

    gsap.fromTo('.collection-item', { opacity: 0, y: DIST.lg, scale: SCALE_IN }, {
      opacity: 1, y: 0, scale: 1, stagger: STAGGER.card, duration: DUR.reveal, ease: EASE.out,
      scrollTrigger: { trigger: '.collection-grid', start: 'top 80%', once: true },
    })

    gsap.fromTo('.stats-item', { opacity: 0, y: DIST.sm }, {
      opacity: 1, y: 0, stagger: STAGGER.card, duration: DUR.reveal, ease: EASE.soft,
      scrollTrigger: { trigger: '.stats-section', start: 'top 85%', once: true },
    })
  })

  return (
    <div ref={containerRef} style={{ backgroundColor: '#050505', color: '#F5F0E8' }}>
      {/* ═══ Hero ═══ */}
      <section
        className="screen"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          padding: 'var(--nav-height) var(--gutter) clamp(80px, 12vw, 160px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden
          className="decor"
          style={{
            position: 'absolute',
            inset: '-20%',
            background:
              'radial-gradient(ellipse 60% 50% at 20% 60%, rgba(201,168,108,0.08) 0%, transparent 60%), radial-gradient(ellipse 30% 40% at 75% 30%, rgba(201,168,108,0.05) 0%, transparent 50%)',
          }}
        />

        <FloatingParticles color="#C9A86C" count={12} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div
            className="about-hero-line m-sx"
            style={{
              width: '60px',
              height: '1px',
              background: 'linear-gradient(to right, #C9A86C, transparent)',
              marginBottom: '2rem',
              transformOrigin: 'left',
            }}
          />

          <p className="about-hero-sub eyebrow m-hide" style={{ letterSpacing: '0.4em', marginBottom: '2rem' }}>
            The House of Quatréa
          </p>

          <h1
            className="about-hero-title m-hide"
            style={{
              fontSize: 'clamp(3.2rem, 12vw, 10rem)',
              fontWeight: 300,
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              color: '#F5F0E8',
              maxWidth: '900px',
            }}
          >
            A fragrance
            <br />
            for every
            <br />
            <em style={{ color: '#C9A86C' }}>turning</em>
          </h1>
        </div>
      </section>

      {/* ═══ Stats ═══ */}
      <section
        className="stats-section"
        style={{
          padding: 'clamp(50px, 6vw, 80px) var(--gutter)',
          borderTop: '1px solid rgba(245,240,232,0.08)',
          borderBottom: '1px solid rgba(245,240,232,0.08)',
        }}
      >
        <ul className="grid-4" style={{ listStyle: 'none', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          {STATS.map(({ value, label }) => (
            <li key={label} className="stats-item m-hide">
              <div
                style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                  fontWeight: 300,
                  color: '#C9A86C',
                  lineHeight: 1,
                  marginBottom: '0.5rem',
                }}
              >
                {value}
              </div>
              <div className="eyebrow" style={{ color: '#F5F0E8', opacity: 0.7, letterSpacing: '0.2em' }}>
                {label}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ═══ Philosophy ═══ */}
      <section className="about-reveal m-hide section split">
        <div>
          <p className="eyebrow" style={{ marginBottom: '1.5rem' }}>
            Our Philosophy
          </p>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 300, lineHeight: 1.08, color: '#F5F0E8' }}>
            The Philosophy
            <br />
            of Four
          </h2>
        </div>
        <div>
          <p style={{ fontSize: 'clamp(1rem, 1.4vw, 1.08rem)', lineHeight: 2, color: '#F5F0E8', opacity: 0.82, marginBottom: '1.5rem' }}>
            Nature moves in a cycle of four — not because four is a number, but because transformation
            requires that many steps. From dormancy to abundance, from heat to cold, from colour to
            silence: each stage is irreplaceable. Quatréa was built on the conviction that fragrance
            is the purest medium through which we can experience these transitions.
          </p>
          <p style={{ fontSize: 'clamp(1rem, 1.4vw, 1.08rem)', lineHeight: 2, color: '#F5F0E8', opacity: 0.82, marginBottom: '2rem' }}>
            Our perfumers work seasonally, beginning composition during the season each fragrance
            represents. They walk forests in autumn, stand in fields in summer, touch frost in winter,
            and breathe the air of the first warm morning in spring. The resulting fragrances are
            not interpretations — they are documents.
          </p>
          <blockquote
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)',
              fontStyle: 'italic',
              lineHeight: 1.7,
              color: '#C9A86C',
              paddingLeft: '1.5rem',
              borderLeft: '2px solid rgba(201,168,108,0.45)',
            }}
          >
            &ldquo;To compose a fragrance for spring, one must first forget everything one knows about spring — and simply breathe.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* ═══ Craft ═══ */}
      <section className="about-reveal m-hide section" style={{ borderTop: '1px solid rgba(245,240,232,0.08)' }}>
        <div style={{ marginBottom: '4rem' }}>
          <p className="eyebrow" style={{ marginBottom: '1rem' }}>
            The Art of Extraction
          </p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 300, color: '#F5F0E8' }}>Our Methods</h2>
        </div>

        <div
          className="craft-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: '4px' }}
        >
          {METHODS.map(({ number, title, body }) => (
            <div
              key={title}
              className="craft-card m-hide"
              style={{
                padding: '3rem 2rem',
                background: 'rgba(201,168,108,0.04)',
                border: '1px solid rgba(201,168,108,0.12)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <span
                aria-hidden
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1.5rem',
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: '3.5rem',
                  fontWeight: 300,
                  color: '#C9A86C',
                  opacity: 0.1,
                  lineHeight: 1,
                }}
              >
                {number}
              </span>
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '2px',
                  height: '100%',
                  background: 'linear-gradient(to bottom, #C9A86C, transparent)',
                  opacity: 0.45,
                }}
              />
              <h3 style={{ fontSize: 'clamp(1.3rem, 1.8vw, 1.55rem)', fontWeight: 400, color: '#F5F0E8', marginBottom: '1.2rem' }}>
                {title}
              </h3>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: '#F5F0E8', opacity: 0.74 }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ Bottle showcase ═══ */}
      <section
        className="about-reveal m-hide"
        style={{
          padding: 'clamp(80px, 10vw, 140px) var(--gutter)',
          borderTop: '1px solid rgba(245,240,232,0.08)',
          borderBottom: '1px solid rgba(245,240,232,0.08)',
          textAlign: 'center',
        }}
      >
        <Divider />
        <p
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: '#F5F0E8',
            opacity: 0.78,
            marginBottom: '4rem',
            maxWidth: '500px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Four fragrances. Each a world. All one collection.
        </p>

        <ul className="grid-4" style={{ listStyle: 'none', maxWidth: '700px', margin: '0 auto' }}>
          {SEASON_KEYS.map((key) => {
            const season = SEASONS[key]
            return (
              <li key={key}>
                <Link
                  href={`/${key}`}
                  className="link-muted"
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.9 }}
                >
                  <PerfumeBottle
                    perfumeName={season.perfume}
                    seasonName={season.name}
                    accentColor={season.colors.accent}
                    style={{
                      width: 'clamp(45px, 7vw, 65px)',
                      height: 'auto',
                      filter: `drop-shadow(0 8px 24px ${season.colors.accent}40)`,
                      marginBottom: '1.2rem',
                    }}
                  />
                  <span style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1rem', color: '#F5F0E8' }}>
                    {season.perfume}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      {/* ═══ Collection links ═══ */}
      <section className="section">
        <div style={{ marginBottom: '4rem' }}>
          <p className="eyebrow" style={{ marginBottom: '1rem' }}>
            The Collection
          </p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 300, color: '#F5F0E8' }}>Explore Each Season</h2>
        </div>

        <div
          className="collection-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: '4px' }}
        >
          {SEASON_KEYS.map((key) => {
            const s = SEASONS[key]
            return (
              <Link
                key={key}
                href={`/${key}`}
                className="collection-item m-hide luxury-card"
                style={{
                  display: 'block',
                  padding: 'clamp(2.5rem, 4vw, 3.5rem) 2rem',
                  background: s.colors.cardGradient,
                  textDecoration: 'none',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Darkens the lower part so white text stays legible on light gradients (Spring). */}
                <span
                  aria-hidden
                  className="decor"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.5) 100%)',
                  }}
                />
                <span
                  aria-hidden
                  className="decor"
                  style={{
                    position: 'absolute',
                    top: '0.5rem',
                    right: '1rem',
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: 'clamp(3rem, 6vw, 5rem)',
                    fontWeight: 300,
                    color: '#fff',
                    opacity: 0.1,
                    lineHeight: 1,
                  }}
                >
                  {s.number}
                </span>
                <span className="eyebrow" style={{ position: 'relative', display: 'block', color: '#fff', opacity: 0.8, marginBottom: '1rem', letterSpacing: '0.28em' }}>
                  No. {s.number}
                </span>
                <span
                  style={{
                    position: 'relative',
                    display: 'block',
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: 'clamp(1.8rem, 2.5vw, 2.2rem)',
                    fontWeight: 300,
                    color: '#fff',
                    lineHeight: 1,
                    marginBottom: '0.4rem',
                  }}
                >
                  {s.name}
                </span>
                <span
                  style={{
                    position: 'relative',
                    display: 'block',
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: 'clamp(1rem, 1.3vw, 1.1rem)',
                    fontStyle: 'italic',
                    color: '#fff',
                    opacity: 0.88,
                    marginBottom: '1rem',
                  }}
                >
                  {s.perfume}
                </span>
                <span aria-hidden style={{ position: 'relative', display: 'block', width: '24px', height: '1px', background: '#fff', opacity: 0.4, marginBottom: '0.75rem' }} />
                <span className="eyebrow" style={{ position: 'relative', display: 'block', color: '#fff', opacity: 0.8, letterSpacing: '0.18em' }}>
                  Discover →
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ═══ Footer ═══ */}
      <footer
        style={{
          padding: 'clamp(50px, 7vw, 80px) var(--gutter) clamp(30px, 4vw, 50px)',
          borderTop: '1px solid rgba(245,240,232,0.08)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.4rem', letterSpacing: '0.18em', color: '#F5F0E8', opacity: 0.7 }}>
            QUATRÉA
          </span>
          <span style={{ fontSize: '0.75rem', color: '#F5F0E8', opacity: 0.6 }}>© 2026 Quatréa. All rights reserved.</span>
        </div>
      </footer>
    </div>
  )
}
