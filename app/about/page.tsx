'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { SEASONS, SEASON_KEYS } from '@/lib/seasons'
import { FloatingParticles } from '@/components/FloatingParticles'
import { Divider } from '@/components/Divider'
import { PerfumeBottle } from '@/components/PerfumeBottle'

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
        const heroTl = gsap.timeline({ delay: 0.2 })
        heroTl
          .fromTo('.about-hero-line', { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: 'power2.out' })
          .fromTo('.about-hero-sub', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.3')
          .fromTo('.about-hero-title', { y: 80, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 1.4, ease: 'expo.out' }, '-=0.3')

        gsap.utils.toArray<Element>('.about-reveal').forEach((el) => {
          gsap.fromTo(el, { y: 60, opacity: 0 }, {
            y: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play none none none' },
          })
        })

        gsap.fromTo('.craft-card', { opacity: 0, y: 50, scale: 0.96 }, {
          opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.craft-grid', start: 'top 80%' },
        })

        gsap.fromTo('.collection-item', { opacity: 0, y: 50, scale: 0.95 }, {
          opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.collection-grid', start: 'top 80%' },
        })

        gsap.fromTo('.stats-item', { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: '.stats-section', start: 'top 82%' },
        })
      }, containerRef)
    }

    init()
    return () => ctx?.revert()
  }, [])

  return (
    <div ref={containerRef} style={{ backgroundColor: '#050505', color: '#F5F0E8' }}>

      {/* ═══ Hero ═══ */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          padding: 'var(--nav-height) clamp(16px, 8vw, 120px) clamp(80px, 12vw, 160px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div aria-hidden style={{
          position: 'absolute', inset: '-20%',
          background: 'radial-gradient(ellipse 60% 50% at 20% 60%, rgba(201,168,108,0.07) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
        <div aria-hidden style={{
          position: 'absolute', inset: '-20%',
          background: 'radial-gradient(ellipse 30% 40% at 75% 30%, rgba(201,168,108,0.04) 0%, transparent 50%)',
          pointerEvents: 'none',
        }} />

        <FloatingParticles color="#C9A86C" count={18} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div
            className="about-hero-line"
            style={{
              width: '60px',
              height: '1px',
              background: 'linear-gradient(to right, #C9A86C, transparent)',
              marginBottom: '2rem',
              transformOrigin: 'left',
            }}
          />

          <p
            className="about-hero-sub"
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '0.6rem',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: '#C9A86C',
              marginBottom: '2rem',
              opacity: 0,
            }}
          >
            The House of Quatréa
          </p>

          <h1
            className="about-hero-title"
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(4rem, 12vw, 10rem)',
              fontWeight: 300,
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              color: '#F5F0E8',
              maxWidth: '900px',
              opacity: 0,
            }}
          >
            A fragrance<br />
            for every<br />
            <em style={{ color: '#C9A86C' }}>turning</em>
          </h1>
        </div>
      </section>

      {/* ═══ Stats ═══ */}
      <section
        className="stats-section"
        style={{
          padding: 'clamp(50px, 6vw, 80px) clamp(16px, 8vw, 120px)',
          borderTop: '1px solid rgba(245,240,232,0.06)',
          borderBottom: '1px solid rgba(245,240,232,0.06)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2rem',
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          {[
            { value: '4', label: 'Fragrances' },
            { value: '36', label: 'Ingredients' },
            { value: '14', label: 'Months Aged' },
            { value: '∞', label: 'Moments' },
          ].map(({ value, label }) => (
            <div key={label} className="stats-item" style={{ opacity: 0 }}>
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
              <div
                style={{
                  fontFamily: 'var(--font-inter), system-ui, sans-serif',
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#F5F0E8',
                  opacity: 0.35,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ Philosophy ═══ */}
      <section
        className="about-reveal"
        style={{
          padding: 'clamp(100px, 14vw, 200px) clamp(16px, 8vw, 120px)',
          display: 'grid',
          gridTemplateColumns: '1fr min(55ch, 100%)',
          gap: 'clamp(2rem, 6vw, 6rem)',
          alignItems: 'start',
        }}
      >
        <div>
          <p
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '0.6rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: '#C9A86C',
              opacity: 0.6,
              marginBottom: '1.5rem',
            }}
          >
            Our Philosophy
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 300,
              lineHeight: 1.08,
              color: '#F5F0E8',
            }}
          >
            The Philosophy<br />of Four
          </h2>
        </div>
        <div>
          <p style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)', lineHeight: 2, color: '#F5F0E8', opacity: 0.65, marginBottom: '1.5rem' }}>
            Nature moves in a cycle of four — not because four is a number, but because transformation
            requires that many steps. From dormancy to abundance, from heat to cold, from colour to
            silence: each stage is irreplaceable. Quatréa was built on the conviction that fragrance
            is the purest medium through which we can experience these transitions.
          </p>
          <p style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)', lineHeight: 2, color: '#F5F0E8', opacity: 0.65, marginBottom: '2rem' }}>
            Our perfumers work seasonally, beginning composition during the season each fragrance
            represents. They walk forests in autumn, stand in fields in summer, touch frost in winter,
            and breathe the air of the first warm morning in spring. The resulting fragrances are
            not interpretations — they are documents.
          </p>
          <blockquote
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)',
              fontStyle: 'italic',
              lineHeight: 1.7,
              color: '#C9A86C',
              paddingLeft: '1.5rem',
              borderLeft: '2px solid rgba(201,168,108,0.3)',
              opacity: 0.85,
            }}
          >
            &ldquo;To compose a fragrance for spring, one must first forget everything one knows about spring — and simply breathe.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* ═══ Craft ═══ */}
      <section
        className="about-reveal"
        style={{
          padding: 'clamp(100px, 14vw, 200px) clamp(16px, 8vw, 120px)',
          borderTop: '1px solid rgba(245,240,232,0.06)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '4rem',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <p
              style={{
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '0.6rem',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: '#C9A86C',
                opacity: 0.6,
                marginBottom: '1rem',
              }}
            >
              The Art of Extraction
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                fontWeight: 300,
                color: '#F5F0E8',
              }}
            >
              Our Methods
            </h2>
          </div>
        </div>

        <div
          className="craft-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
            gap: '4px',
          }}
        >
          {[
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
          ].map(({ number, title, body }) => (
            <div
              key={title}
              className="craft-card"
              style={{
                padding: '3rem 2rem',
                background: 'rgba(201,168,108,0.03)',
                border: '1px solid rgba(201,168,108,0.08)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1.5rem',
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: '3.5rem',
                  fontWeight: 300,
                  color: '#C9A86C',
                  opacity: 0.06,
                  lineHeight: 1,
                }}
              >
                {number}
              </span>
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '2px',
                  height: '100%',
                  background: 'linear-gradient(to bottom, #C9A86C, transparent)',
                  opacity: 0.3,
                }}
              />
              <h3
                style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: 'clamp(1.2rem, 1.8vw, 1.5rem)',
                  fontWeight: 400,
                  color: '#F5F0E8',
                  marginBottom: '1.2rem',
                }}
              >
                {title}
              </h3>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.8, color: '#F5F0E8', opacity: 0.45 }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ Bottle showcase ═══ */}
      <section
        className="about-reveal"
        style={{
          padding: 'clamp(80px, 10vw, 140px) clamp(16px, 8vw, 120px)',
          borderTop: '1px solid rgba(245,240,232,0.06)',
          borderBottom: '1px solid rgba(245,240,232,0.06)',
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
            opacity: 0.5,
            marginBottom: '4rem',
            maxWidth: '500px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Four fragrances. Each a world. All one collection.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 'clamp(1rem, 3vw, 3rem)',
            maxWidth: '700px',
            margin: '0 auto',
          }}
        >
          {SEASON_KEYS.map((key) => {
            const season = SEASONS[key]
            return (
              <Link
                key={key}
                href={`/${key}`}
                style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <PerfumeBottle
                  perfumeName={season.perfume}
                  seasonName={season.name}
                  accentColor={season.colors.accent}
                  style={{
                    width: 'clamp(45px, 7vw, 65px)',
                    height: 'auto',
                    filter: `drop-shadow(0 8px 24px ${season.colors.accent}33)`,
                    marginBottom: '1.2rem',
                    transition: 'transform 0.4s ease',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: '0.9rem',
                    color: '#F5F0E8',
                    opacity: 0.6,
                  }}
                >
                  {season.perfume}
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ═══ Collection links ═══ */}
      <section
        style={{
          padding: 'clamp(100px, 14vw, 200px) clamp(16px, 8vw, 120px)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '4rem',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <p
              style={{
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '0.6rem',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: '#C9A86C',
                opacity: 0.6,
                marginBottom: '1rem',
              }}
            >
              The Collection
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                fontWeight: 300,
                color: '#F5F0E8',
              }}
            >
              Explore Each Season
            </h2>
          </div>
        </div>

        <div
          className="collection-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))',
            gap: '4px',
          }}
        >
          {SEASON_KEYS.map((key) => {
            const s = SEASONS[key]
            return (
              <Link
                key={key}
                href={`/${key}`}
                className="collection-item luxury-card"
                style={{
                  display: 'block',
                  padding: 'clamp(2.5rem, 4vw, 3.5rem) 2rem',
                  background: s.colors.cardGradient,
                  textDecoration: 'none',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: '0.5rem',
                    right: '1rem',
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: 'clamp(3rem, 6vw, 5rem)',
                    fontWeight: 300,
                    color: '#fff',
                    opacity: 0.05,
                    lineHeight: 1,
                    pointerEvents: 'none',
                  }}
                >
                  {s.number}
                </span>
                <span style={{ display: 'block', fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.55rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#fff', opacity: 0.45, marginBottom: '1rem' }}>
                  No. {s.number}
                </span>
                <span style={{ display: 'block', fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 300, color: '#fff', lineHeight: 1, marginBottom: '0.4rem' }}>
                  {s.name}
                </span>
                <span style={{ display: 'block', fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: 'clamp(0.85rem, 1.3vw, 1rem)', fontStyle: 'italic', color: '#fff', opacity: 0.6, marginBottom: '1rem' }}>
                  {s.perfume}
                </span>
                <div style={{ width: '24px', height: '1px', background: '#fff', opacity: 0.25, marginBottom: '0.75rem' }} />
                <span style={{ display: 'block', fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#fff', opacity: 0.4 }}>
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
          padding: 'clamp(50px, 7vw, 80px) clamp(16px, 8vw, 120px) clamp(30px, 4vw, 50px)',
          borderTop: '1px solid rgba(245,240,232,0.06)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.4rem', letterSpacing: '0.18em', color: '#F5F0E8', opacity: 0.4 }}>
            QUATRÉA
          </span>
          <span style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.6rem', color: '#F5F0E8', opacity: 0.15 }}>
            © 2024 Quatréa. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  )
}
