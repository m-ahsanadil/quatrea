'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { SEASONS, SEASON_KEYS } from '@/lib/seasons'
import { DIST, DUR, EASE, SCALE_IN, STAGGER, useMotion } from '@/lib/motion'
import { useOffscreenPause } from '@/lib/useOffscreenPause'
import { FloatingParticles } from '@/components/FloatingParticles'
import { MeshBackground } from '@/components/MeshBackground'
import { Divider } from '@/components/Divider'
import { PerfumeBottle } from '@/components/PerfumeBottle'

const MARQUEE_TEXT = 'FLORAISON · SOLSTICE · CRÉPUSCULE · GIVRE · '
const WORDMARK = 'QUATRÉA'

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLElement>(null)
  const showcaseRef = useRef<HTMLElement>(null)
  useOffscreenPause(marqueeRef)
  useOffscreenPause(showcaseRef)

  useMotion(containerRef, (gsap) => {
    /* ── Hero entrance ── */
    gsap
      .timeline({ delay: 0.3 })
      .fromTo('.hero-ornament-top', { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: EASE.soft })
      .fromTo('.hero-eyebrow', { opacity: 0, y: DIST.sm }, { opacity: 1, y: 0, duration: DUR.reveal, ease: EASE.soft }, '-=0.4')
      .fromTo(
        '.hero-letter',
        { yPercent: 110, opacity: 0, rotateX: 40 },
        { yPercent: 0, opacity: 1, rotateX: 0, duration: DUR.story, ease: EASE.cinematic, stagger: 0.03 },
        '-=0.5',
      )
      .fromTo('.hero-divider', { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: DUR.reveal, ease: EASE.soft }, '-=0.6')
      .fromTo('.hero-tagline', { opacity: 0, y: DIST.sm }, { opacity: 1, y: 0, duration: DUR.reveal, ease: EASE.soft }, '-=0.5')
      .fromTo('.hero-cta', { opacity: 0, y: DIST.sm }, { opacity: 1, y: 0, duration: DUR.reveal, ease: EASE.soft }, '-=0.6')
      .fromTo('.hero-scroll-line', { scaleY: 0 }, { scaleY: 1, duration: DUR.story, ease: EASE.soft, transformOrigin: 'top' }, '-=0.6')

    /* ── Hero parallax ── */
    gsap.to('.hero-mesh', {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: true },
    })
    gsap.to('.hero-content', {
      yPercent: 30,
      opacity: 0,
      ease: 'none',
      scrollTrigger: { trigger: '.hero-section', start: 'top top', end: '65% top', scrub: true },
    })

    /* ── Marquee ── */
    gsap.fromTo('.marquee-section', { opacity: 0 }, {
      opacity: 1, duration: DUR.story, ease: EASE.soft,
      scrollTrigger: { trigger: '.marquee-section', start: 'top 92%', once: true },
    })

    /* ── Cinematic quote ── */
    const quoteTrigger = { trigger: '.cine-quote', start: 'top 78%', once: true }
    gsap.fromTo('.cine-quote-line', { scaleX: 0 }, { scaleX: 1, duration: DUR.story * 1.2, ease: EASE.soft, scrollTrigger: quoteTrigger })
    gsap.fromTo('.cine-quote-text', { opacity: 0, y: DIST.md }, {
      opacity: 1, y: 0, duration: DUR.story, ease: EASE.out, stagger: STAGGER.card, scrollTrigger: quoteTrigger,
    })

    /* ── Season cards ── */
    gsap.fromTo('.season-card', { opacity: 0, y: DIST.lg, scale: SCALE_IN }, {
      opacity: 1, y: 0, scale: 1, duration: DUR.story, stagger: STAGGER.card, ease: EASE.cinematic,
      scrollTrigger: { trigger: '.seasons-grid', start: 'top 85%', once: true },
    })

    /* ── Bottles ── */
    gsap.fromTo('.bottle-showcase-item', { opacity: 0, y: DIST.lg }, {
      opacity: 1, y: 0, duration: DUR.reveal, stagger: STAGGER.card, ease: EASE.out,
      scrollTrigger: { trigger: '.bottle-showcase', start: 'top 78%', once: true },
    })

    /* ── Philosophy ── */
    const philosophyTrigger = { trigger: '.philosophy-section', start: 'top 76%', once: true }
    gsap.fromTo('.philosophy-line', { scaleX: 0 }, { scaleX: 1, duration: DUR.story, ease: EASE.soft, scrollTrigger: philosophyTrigger })
    gsap.fromTo('.philosophy-heading', { opacity: 0, y: DIST.md }, { opacity: 1, y: 0, duration: DUR.story, ease: EASE.out, scrollTrigger: philosophyTrigger })
    gsap.fromTo('.philosophy-text', { opacity: 0, y: DIST.md }, { opacity: 1, y: 0, duration: DUR.reveal, ease: EASE.soft, delay: 0.15, scrollTrigger: philosophyTrigger })
    gsap.fromTo('.philosophy-cta', { opacity: 0, y: DIST.sm }, { opacity: 1, y: 0, duration: DUR.reveal, ease: EASE.soft, delay: 0.3, scrollTrigger: philosophyTrigger })
  })

  return (
    <div ref={containerRef} style={{ backgroundColor: '#050505', color: '#F5F0E8' }}>
      {/* ═══ Hero ═══ */}
      <section
        className="hero-section screen"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 clamp(16px, 6vw, 80px)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <MeshBackground
          className="hero-mesh"
          orbs={[
            { background: 'radial-gradient(circle, rgba(201,168,108,0.12) 0%, transparent 70%)' },
            { background: 'radial-gradient(circle, rgba(201,168,108,0.06) 0%, transparent 60%)' },
            { background: 'radial-gradient(circle, rgba(180,150,90,0.08) 0%, transparent 65%)' },
          ]}
        />

        <FloatingParticles color="#C9A86C" count={18} />

        <div className="hero-content" style={{ position: 'relative', zIndex: 1, maxWidth: '1400px', width: '100%' }}>
          <div
            className="hero-ornament-top m-sx"
            style={{
              width: '100px',
              height: '1px',
              background: 'linear-gradient(to right, transparent, #C9A86C, transparent)',
              margin: '0 auto 2.5rem',
              transformOrigin: 'center',
            }}
          />

          <p className="hero-eyebrow eyebrow m-hide" style={{ letterSpacing: '0.45em', marginBottom: '3rem' }}>
            Luxury Fragrance · Est. MMXXIV
          </p>

          <h1
            aria-label="Quatréa"
            className="wordmark"
            style={{
              fontSize: 'clamp(3.5rem, 17vw, 16rem)',
              fontWeight: 300,
              lineHeight: 0.9,
              letterSpacing: '-0.05em',
            }}
          >
            {WORDMARK.split('').map((char, i) => (
              <span key={i} aria-hidden className="hero-letter m-hide" style={{ display: 'inline-block' }}>
                {char}
              </span>
            ))}
          </h1>

          <div className="hero-divider m-hide" style={{ transformOrigin: 'center' }}>
            <Divider />
          </div>

          <p
            className="hero-tagline m-hide"
            style={{
              fontSize: 'clamp(0.75rem, 1.1vw, 0.8rem)',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#F5F0E8',
              marginTop: '0.5rem',
            }}
          >
            Four Seasons&nbsp;&nbsp;·&nbsp;&nbsp;Four Essences&nbsp;&nbsp;·&nbsp;&nbsp;One World
          </p>

          <div className="hero-cta m-hide" style={{ marginTop: '3.5rem' }}>
            <Link href="/spring" className="btn-gold">
              Explore the Collection
            </Link>
          </div>
        </div>

        <div
          aria-hidden
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            left: '50%',
            translate: '-50% 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <span className="eyebrow" style={{ fontSize: '0.68rem', letterSpacing: '0.4em', color: '#F5F0E8', opacity: 0.55 }}>
            Discover
          </span>
          <div
            className="hero-scroll-line m-sy"
            style={{
              width: '1px',
              height: '70px',
              background: 'linear-gradient(to bottom, rgba(201,168,108,0.7), transparent)',
              transformOrigin: 'top',
            }}
          />
        </div>
      </section>

      {/* ═══ Marquee (decorative: the names appear as real text elsewhere) ═══ */}
      <section
        ref={marqueeRef}
        aria-hidden
        className="marquee-section ambient m-hide"
        style={{
          padding: '2.5rem 0',
          borderTop: '1px solid rgba(245,240,232,0.06)',
          borderBottom: '1px solid rgba(245,240,232,0.06)',
          overflow: 'hidden',
        }}
      >
        <div className="marquee-track" style={{ whiteSpace: 'nowrap' }}>
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 300,
                color: '#F5F0E8',
                opacity: 0.1,
                letterSpacing: '0.18em',
                paddingRight: '0.5em',
              }}
            >
              {MARQUEE_TEXT}
            </span>
          ))}
        </div>
      </section>

      {/* ═══ Cinematic Quote ═══ */}
      <section
        className="cine-quote"
        style={{
          padding: 'clamp(100px, 14vw, 200px) var(--gutter)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden
          className="decor"
          style={{
            position: 'absolute',
            inset: '-30%',
            background: 'radial-gradient(ellipse 40% 40% at 50% 50%, rgba(201,168,108,0.05) 0%, transparent 60%)',
          }}
        />
        <div style={{ position: 'relative', maxWidth: '750px', margin: '0 auto' }}>
          <div
            className="cine-quote-line m-sx"
            style={{
              width: '120px',
              height: '1px',
              background: 'linear-gradient(to right, transparent, #C9A86C, transparent)',
              margin: '0 auto 3rem',
              transformOrigin: 'center',
            }}
          />
          <blockquote
            className="cine-quote-text m-hide"
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              lineHeight: 1.4,
              color: '#F5F0E8',
            }}
          >
            &ldquo;We do not recreate seasons — we translate their emotional architecture into scent.&rdquo;
          </blockquote>
          <div
            className="cine-quote-line m-sx"
            style={{
              width: '120px',
              height: '1px',
              background: 'linear-gradient(to right, transparent, #C9A86C, transparent)',
              margin: '3rem auto 0',
              transformOrigin: 'center',
            }}
          />
          <p className="cine-quote-text eyebrow m-hide" style={{ marginTop: '2rem' }}>
            Maison Quatréa
          </p>
        </div>
      </section>

      {/* ═══ Collection Grid ═══ */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(16px, 5vw, 60px)' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '4rem',
            flexWrap: 'wrap',
            gap: '1rem',
            padding: '0 0.5rem',
          }}
        >
          <div>
            <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>
              The Collection
            </p>
            <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)', fontWeight: 300, lineHeight: 1, color: '#F5F0E8' }}>
              Four Worlds
            </h2>
          </div>
          <p
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
              fontStyle: 'italic',
              color: '#F5F0E8',
              opacity: 0.65,
            }}
          >
            Each a universe unto itself
          </p>
        </div>

        <div
          className="seasons-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
            gap: '4px',
          }}
        >
          {SEASON_KEYS.map((key) => {
            const season = SEASONS[key]
            return (
              <Link
                key={key}
                href={`/${key}`}
                className="season-card m-hide luxury-card"
                aria-label={`Explore ${season.name} — ${season.perfume}`}
                style={{
                  display: 'block',
                  textDecoration: 'none',
                  position: 'relative',
                  overflow: 'hidden',
                  aspectRatio: '3 / 4.5',
                  background: season.colors.cardGradient,
                }}
              >
                <div
                  aria-hidden
                  className="card-glow decor"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: `radial-gradient(ellipse 80% 60% at 50% 70%, ${season.colors.accent}40 0%, transparent 70%)`,
                  }}
                />
                <div
                  aria-hidden
                  className="decor"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 15%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.7) 100%)',
                  }}
                />
                <div
                  aria-hidden
                  className="decor"
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1.2rem',
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: 'clamp(5rem, 12vw, 9rem)',
                    fontWeight: 300,
                    lineHeight: 1,
                    color: '#fff',
                    opacity: 0.08,
                  }}
                >
                  {season.number}
                </div>

                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    padding: '2.5rem 2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                  }}
                >
                  <span className="eyebrow" style={{ color: '#fff', opacity: 0.8, marginBottom: '0.75rem', letterSpacing: '0.3em' }}>
                    No. {season.number}
                  </span>
                  <h3
                    style={{
                      fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                      fontWeight: 300,
                      color: '#fff',
                      lineHeight: 0.95,
                      marginBottom: '0.5rem',
                    }}
                  >
                    {season.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-cormorant), Georgia, serif',
                      fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
                      fontStyle: 'italic',
                      color: '#fff',
                      opacity: 0.88,
                      marginBottom: '1.5rem',
                    }}
                  >
                    {season.perfume}
                  </p>
                  <span aria-hidden style={{ width: '40px', height: '1px', background: '#fff', opacity: 0.4, marginBottom: '1.2rem' }} />
                  <span className="eyebrow" style={{ color: '#fff', opacity: 0.8, letterSpacing: '0.25em' }}>
                    Discover →
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ═══ Bottle Showcase ═══ */}
      <section
        ref={showcaseRef}
        className="bottle-showcase ambient"
        style={{
          padding: 'clamp(80px, 10vw, 140px) clamp(16px, 5vw, 60px)',
          borderTop: '1px solid rgba(245,240,232,0.06)',
          borderBottom: '1px solid rgba(245,240,232,0.06)',
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
            background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(201,168,108,0.04) 0%, transparent 60%)',
          }}
        />
        <ul className="grid-4" style={{ listStyle: 'none', maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
          {SEASON_KEYS.map((key) => {
            const season = SEASONS[key]
            return (
              <li key={key} style={{ display: 'flex' }}>
                <Link
                  href={`/${key}`}
                  className="bottle-showcase-item m-hide gradient-border-card luxury-card"
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textDecoration: 'none',
                    padding: '2.5rem 1rem 2rem',
                    borderRadius: '2px',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <div style={{ position: 'relative', marginBottom: '2rem' }}>
                    <div
                      aria-hidden
                      className="breathing-orb decor"
                      style={{
                        position: 'absolute',
                        inset: '-30%',
                        borderRadius: '50%',
                        background: `radial-gradient(circle, ${season.colors.accent}26 0%, transparent 70%)`,
                      }}
                    />
                    <PerfumeBottle
                      perfumeName={season.perfume}
                      seasonName={season.name}
                      accentColor={season.colors.accent}
                      style={{
                        width: 'clamp(55px, 9vw, 90px)',
                        height: 'auto',
                        filter: `drop-shadow(0 12px 28px ${season.colors.accent}40)`,
                        position: 'relative',
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-cormorant), Georgia, serif',
                      fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
                      color: '#F5F0E8',
                      opacity: 0.88,
                      letterSpacing: '0.06em',
                    }}
                  >
                    {season.perfume}
                  </span>
                  <span className="eyebrow" style={{ color: season.colors.accent, opacity: 0.85, marginTop: '0.5rem', letterSpacing: '0.22em' }}>
                    {season.name}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      {/* ═══ Philosophy / Brand ═══ */}
      <section
        className="philosophy-section"
        style={{ padding: 'clamp(120px, 16vw, 240px) var(--gutter)', position: 'relative', overflow: 'hidden' }}
      >
        <MeshBackground
          orbs={[
            { background: 'radial-gradient(circle, rgba(201,168,108,0.06) 0%, transparent 60%)' },
            { background: 'radial-gradient(circle, rgba(201,168,108,0.04) 0%, transparent 55%)' },
          ]}
        />

        <div className="split" style={{ position: 'relative' }}>
          <div>
            <div
              className="philosophy-line m-sx"
              aria-hidden
              style={{
                height: '1px',
                width: '100px',
                background: 'linear-gradient(to right, #C9A86C, transparent)',
                marginBottom: '2.5rem',
                transformOrigin: 'left',
              }}
            />
            <h2
              className="philosophy-heading m-hide"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 300, lineHeight: 1.05, color: '#F5F0E8' }}
            >
              Four seasons,
              <br />
              <em style={{ color: '#C9A86C' }}>one language</em>
            </h2>
          </div>

          <div>
            <p
              className="philosophy-text m-hide"
              style={{
                fontSize: 'clamp(1rem, 1.4vw, 1.08rem)',
                lineHeight: 2,
                color: '#F5F0E8',
                opacity: 0.82,
                marginBottom: '3rem',
              }}
            >
              Quatréa was founded on a single conviction: that the turning of the year holds
              within it four entirely different emotional worlds. Spring&rsquo;s optimism.
              Summer&rsquo;s abandon. Autumn&rsquo;s complexity. Winter&rsquo;s clarity.
              Each season distilled not as a memory, but as a feeling — bottled, lasting,
              wearable as a second skin.
            </p>
            <Link href="/about" className="philosophy-cta text-link m-hide">
              Our Philosophy
              <span aria-hidden className="text-link-arrow">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ Footer ═══ */}
      <footer
        style={{
          padding: 'clamp(80px, 10vw, 120px) var(--gutter) clamp(30px, 4vw, 50px)',
          borderTop: '1px solid rgba(245,240,232,0.06)',
        }}
      >
        <div className="footer-grid" style={{ marginBottom: '5rem' }}>
          <div>
            <span
              className="gold-text"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.8rem', letterSpacing: '0.2em' }}
            >
              QUATRÉA
            </span>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.8, color: '#F5F0E8', opacity: 0.65, marginTop: '1.5rem', maxWidth: '280px' }}>
              Four seasons. Four essences. A luxury fragrance collection inspired by the eternal cycle of nature.
            </p>
          </div>

          <div>
            <h2 className="eyebrow" style={{ fontWeight: 400, marginBottom: '1rem' }}>
              Collection
            </h2>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {SEASON_KEYS.map((key) => (
                <li key={key}>
                  <Link
                    href={`/${key}`}
                    className="link-muted"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.1rem', letterSpacing: '0.06em' }}
                  >
                    {SEASONS[key].perfume}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="eyebrow" style={{ fontWeight: 400, marginBottom: '1rem' }}>
              Explore
            </h2>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {[
                { href: '/about', label: 'Our Story' },
                { href: '/spring', label: 'Begin with Spring' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="link-muted" style={{ fontSize: '0.85rem', letterSpacing: '0.08em' }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(245,240,232,0.06)',
            fontSize: '0.75rem',
            color: '#F5F0E8',
            opacity: 0.55,
          }}
        >
          <span>© 2026 Quatréa. All rights reserved.</span>
          <span style={{ letterSpacing: '0.2em' }}>Paris · Milan · Tokyo</span>
        </div>
      </footer>
    </div>
  )
}
