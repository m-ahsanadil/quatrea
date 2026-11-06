'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { SEASONS, SEASON_KEYS } from '@/lib/seasons'
import { FloatingParticles } from '@/components/FloatingParticles'
import { Divider } from '@/components/Divider'
import { PerfumeBottle } from '@/components/PerfumeBottle'

const MARQUEE_TEXT = 'FLORAISON · SOLSTICE · CRÉPUSCULE · GIVRE · '

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const isMobile = window.innerWidth < 768
    let ctx: { revert: () => void } | null = null

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        const heroTl = gsap.timeline({ delay: 0.3 })

        heroTl
          .fromTo('.hero-ornament-top', { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: 'power2.out' })
          .fromTo('.hero-eyebrow', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.3')
          .fromTo(
            '.hero-letter',
            { yPercent: 120, opacity: 0, rotateX: 40 },
            { yPercent: 0, opacity: 1, rotateX: 0, duration: 1.3, ease: 'expo.out', stagger: 0.04 },
            '-=0.2',
          )
          .fromTo('.hero-divider', { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.4')
          .fromTo('.hero-tagline', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.3')
          .fromTo('.hero-cta', { opacity: 0, y: 20, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power2.out' }, '-=0.4')
          .fromTo('.hero-scroll-line', { scaleY: 0 }, { scaleY: 1, duration: 1.2, ease: 'power2.out', transformOrigin: 'top' }, '-=0.5')

        gsap.to('.hero-glow-1', {
          yPercent: 30,
          ease: 'none',
          scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: true },
        })
        gsap.to('.hero-glow-2', {
          yPercent: -20,
          xPercent: 10,
          ease: 'none',
          scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: true },
        })
        gsap.to('.hero-content', {
          yPercent: 25,
          opacity: 0,
          ease: 'none',
          scrollTrigger: { trigger: '.hero-section', start: 'top top', end: '70% top', scrub: true },
        })

        gsap.fromTo('.marquee-section', { opacity: 0 }, {
          opacity: 1,
          duration: 1,
          scrollTrigger: { trigger: '.marquee-section', start: 'top 90%' },
        })

        gsap.fromTo(
          '.season-card',
          { opacity: 0, y: isMobile ? 50 : 100, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 1.1,
            stagger: 0.15,
            ease: 'expo.out',
            scrollTrigger: { trigger: '.seasons-grid', start: 'top 82%' },
          },
        )

        if (!isMobile) {
          document.querySelectorAll<HTMLElement>('.season-card').forEach((card) => {
            gsap.to(card.querySelector('.card-glow'), {
              opacity: 0.6,
              scale: 1.1,
              duration: 0.4,
              paused: true,
              scrollTrigger: undefined,
            })
          })
        }

        gsap.fromTo('.philosophy-line', { scaleX: 0 }, {
          scaleX: 1, duration: 1.2, ease: 'power2.out',
          scrollTrigger: { trigger: '.philosophy-section', start: 'top 78%' },
        })
        gsap.fromTo('.philosophy-heading', { opacity: 0, y: 60 }, {
          opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.philosophy-section', start: 'top 75%' },
        })
        gsap.fromTo('.philosophy-text', { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 1.0, ease: 'power2.out', delay: 0.15,
          scrollTrigger: { trigger: '.philosophy-section', start: 'top 75%' },
        })
        gsap.fromTo('.philosophy-cta', { opacity: 0 }, {
          opacity: 1, duration: 0.8, delay: 0.3,
          scrollTrigger: { trigger: '.philosophy-section', start: 'top 75%' },
        })

        gsap.fromTo('.bottle-showcase-item', { opacity: 0, y: 60 }, {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.bottle-showcase', start: 'top 78%' },
        })
      }, containerRef)
    }

    init()
    return () => { ctx?.revert() }
  }, [])

  return (
    <div ref={containerRef} style={{ backgroundColor: '#050505', color: '#F5F0E8' }}>

      {/* ═══ Hero ═══ */}
      <section
        className="hero-section"
        style={{
          minHeight: '100vh',
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
        {/* Multiple glow layers for depth */}
        <div
          className="hero-glow-1"
          aria-hidden
          style={{
            position: 'absolute',
            inset: '-30%',
            background: 'radial-gradient(ellipse 50% 40% at 50% 45%, rgba(201,168,108,0.1) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />
        <div
          className="hero-glow-2"
          aria-hidden
          style={{
            position: 'absolute',
            inset: '-20%',
            background: 'radial-gradient(ellipse 30% 50% at 25% 55%, rgba(201,168,108,0.05) 0%, transparent 50%)',
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: '-20%',
            background: 'radial-gradient(ellipse 25% 35% at 75% 40%, rgba(201,168,108,0.04) 0%, transparent 50%)',
            pointerEvents: 'none',
          }}
        />

        <FloatingParticles color="#C9A86C" count={25} />

        <div className="hero-content" style={{ position: 'relative', zIndex: 1, maxWidth: '1000px', width: '100%' }}>
          {/* Ornamental line */}
          <div
            className="hero-ornament-top"
            style={{
              width: '80px',
              height: '1px',
              background: 'linear-gradient(to right, transparent, #C9A86C, transparent)',
              margin: '0 auto 2rem',
              transformOrigin: 'center',
            }}
          />

          <p
            className="hero-eyebrow"
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: 'clamp(0.55rem, 1vw, 0.65rem)',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: '#C9A86C',
              marginBottom: '2.5rem',
              opacity: 0,
            }}
          >
            Luxury Fragrance · Est. MMXXIV
          </p>

          {/* Main title */}
          <h1
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(5.5rem, 18vw, 16rem)',
              fontWeight: 300,
              lineHeight: 0.85,
              letterSpacing: '-0.04em',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0 0.04em',
              overflow: 'hidden',
              perspective: '600px',
            }}
          >
            {'QUATRÉA'.split('').map((char, i) => (
              <span
                key={i}
                className="hero-letter"
                style={{
                  display: 'inline-block',
                  opacity: 0,
                  willChange: 'transform',
                }}
              >
                {char}
              </span>
            ))}
          </h1>

          {/* Decorative divider */}
          <div className="hero-divider" style={{ opacity: 0, transformOrigin: 'center' }}>
            <Divider />
          </div>

          <p
            className="hero-tagline"
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: 'clamp(0.65rem, 1.2vw, 0.8rem)',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#F5F0E8',
              opacity: 0,
              marginTop: '0.5rem',
            }}
          >
            Four Seasons&nbsp;&nbsp;·&nbsp;&nbsp;Four Essences&nbsp;&nbsp;·&nbsp;&nbsp;One World
          </p>

          <div className="hero-cta" style={{ marginTop: '3.5rem', opacity: 0 }}>
            <Link
              href="/spring"
              className="luxury-card"
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '0.65rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#050505',
                background: 'linear-gradient(135deg, #C9A86C 0%, #E0C88C 50%, #C9A86C 100%)',
                padding: '1rem 3rem',
                textDecoration: 'none',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              Explore the Collection
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '0.5rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: '#F5F0E8',
              opacity: 0.25,
            }}
          >
            Discover
          </span>
          <div
            className="hero-scroll-line"
            style={{
              width: '1px',
              height: '60px',
              background: 'linear-gradient(to bottom, rgba(201,168,108,0.6), transparent)',
              transformOrigin: 'top',
            }}
          />
        </div>
      </section>

      {/* ═══ Marquee ═══ */}
      <section
        className="marquee-section"
        style={{
          padding: '3rem 0',
          borderTop: '1px solid rgba(245,240,232,0.05)',
          borderBottom: '1px solid rgba(245,240,232,0.05)',
          overflow: 'hidden',
          opacity: 0,
        }}
      >
        <div className="marquee-track" style={{ whiteSpace: 'nowrap' }}>
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                fontWeight: 300,
                color: '#F5F0E8',
                opacity: 0.08,
                letterSpacing: '0.15em',
                paddingRight: '0.5em',
              }}
            >
              {MARQUEE_TEXT}
            </span>
          ))}
        </div>
      </section>

      {/* ═══ Collection Grid ═══ */}
      <section
        style={{
          padding: 'clamp(100px, 14vw, 200px) clamp(16px, 5vw, 60px)',
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
            padding: '0 0.5rem',
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
                opacity: 0.7,
                marginBottom: '0.75rem',
              }}
            >
              The Collection
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 300,
                lineHeight: 1,
                color: '#F5F0E8',
              }}
            >
              Four Worlds
            </h2>
          </div>
          <p
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(0.95rem, 1.6vw, 1.2rem)',
              fontStyle: 'italic',
              color: '#F5F0E8',
              opacity: 0.35,
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
                className="season-card luxury-card"
                aria-label={`Explore ${season.name} — ${season.perfume}`}
                style={{
                  display: 'block',
                  textDecoration: 'none',
                  position: 'relative',
                  overflow: 'hidden',
                  aspectRatio: '3 / 4.5',
                  background: season.colors.cardGradient,
                  opacity: 0,
                }}
              >
                {/* Hover glow */}
                <div
                  className="card-glow"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: `radial-gradient(ellipse 60% 50% at 50% 60%, ${season.colors.accent}22 0%, transparent 70%)`,
                    opacity: 0,
                    transition: 'opacity 0.6s ease',
                    pointerEvents: 'none',
                  }}
                />

                {/* Gradient overlay for readability */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 20%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.6) 100%)',
                    transition: 'background 0.4s ease',
                    pointerEvents: 'none',
                  }}
                />

                {/* Large watermark number */}
                <div
                  style={{
                    position: 'absolute',
                    top: '1.5rem',
                    right: '1.5rem',
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: 'clamp(5rem, 10vw, 8rem)',
                    fontWeight: 300,
                    lineHeight: 1,
                    color: '#fff',
                    opacity: 0.06,
                    pointerEvents: 'none',
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
                  <span
                    style={{
                      fontFamily: 'var(--font-inter), system-ui, sans-serif',
                      fontSize: '0.55rem',
                      letterSpacing: '0.3em',
                      textTransform: 'uppercase',
                      color: '#fff',
                      opacity: 0.5,
                      marginBottom: '0.75rem',
                    }}
                  >
                    No. {season.number}
                  </span>
                  <h2
                    style={{
                      fontFamily: 'var(--font-cormorant), Georgia, serif',
                      fontSize: 'clamp(2.2rem, 4.5vw, 3rem)',
                      fontWeight: 300,
                      color: '#fff',
                      lineHeight: 0.95,
                      marginBottom: '0.5rem',
                    }}
                  >
                    {season.name}
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--font-cormorant), Georgia, serif',
                      fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
                      fontStyle: 'italic',
                      letterSpacing: '0.04em',
                      color: '#fff',
                      opacity: 0.7,
                      marginBottom: '1.5rem',
                    }}
                  >
                    {season.perfume}
                  </p>
                  <div
                    style={{
                      width: '32px',
                      height: '1px',
                      background: '#fff',
                      opacity: 0.3,
                      marginBottom: '1rem',
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-inter), system-ui, sans-serif',
                      fontSize: '0.6rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: '#fff',
                      opacity: 0.45,
                    }}
                  >
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
        className="bottle-showcase"
        style={{
          padding: 'clamp(60px, 8vw, 100px) clamp(16px, 5vw, 60px)',
          borderTop: '1px solid rgba(245,240,232,0.06)',
          borderBottom: '1px solid rgba(245,240,232,0.06)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 'clamp(1rem, 3vw, 3rem)',
            maxWidth: '900px',
            margin: '0 auto',
          }}
        >
          {SEASON_KEYS.map((key) => {
            const season = SEASONS[key]
            return (
              <Link
                key={key}
                href={`/${key}`}
                className="bottle-showcase-item luxury-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textDecoration: 'none',
                  padding: '2rem 1rem',
                  borderRadius: '2px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.04)',
                  transition: 'background 0.4s ease, border-color 0.4s ease',
                }}
              >
                <PerfumeBottle
                  perfumeName={season.perfume}
                  seasonName={season.name}
                  accentColor={season.colors.accent}
                  style={{
                    width: 'clamp(50px, 8vw, 80px)',
                    height: 'auto',
                    filter: `drop-shadow(0 10px 30px ${season.colors.accent}33)`,
                    marginBottom: '1.5rem',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: 'clamp(0.85rem, 1.4vw, 1.05rem)',
                    color: '#F5F0E8',
                    opacity: 0.7,
                    letterSpacing: '0.06em',
                  }}
                >
                  {season.perfume}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-inter), system-ui, sans-serif',
                    fontSize: '0.55rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: season.colors.accent,
                    opacity: 0.5,
                    marginTop: '0.4rem',
                  }}
                >
                  {season.name}
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ═══ Philosophy / Brand ═══ */}
      <section
        className="philosophy-section"
        style={{
          padding: 'clamp(100px, 14vw, 200px) clamp(16px, 8vw, 120px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 40% 50% at 80% 50%, rgba(201,168,108,0.04) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr min(55ch, 100%)',
            gap: 'clamp(2rem, 6vw, 6rem)',
            alignItems: 'start',
            position: 'relative',
          }}
        >
          <div>
            <div
              className="philosophy-line"
              aria-hidden
              style={{
                height: '1px',
                width: '80px',
                background: 'linear-gradient(to right, #C9A86C, transparent)',
                marginBottom: '2rem',
                transformOrigin: 'left',
              }}
            />
            <h2
              className="philosophy-heading"
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
                fontWeight: 300,
                lineHeight: 1.08,
                color: '#F5F0E8',
                opacity: 0,
              }}
            >
              Four seasons,<br />
              <em style={{ color: '#C9A86C' }}>one language</em>
            </h2>
          </div>

          <div>
            <p
              className="philosophy-text"
              style={{
                fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)',
                lineHeight: 2,
                color: '#F5F0E8',
                opacity: 0,
                marginBottom: '2rem',
              }}
            >
              Quatréa was founded on a single conviction: that the turning of the year holds
              within it four entirely different emotional worlds. Spring&rsquo;s optimism.
              Summer&rsquo;s abandon. Autumn&rsquo;s complexity. Winter&rsquo;s clarity.
              Each season distilled not as a memory, but as a feeling — bottled, lasting,
              wearable as a second skin.
            </p>
            <blockquote
              className="philosophy-text"
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(1.1rem, 1.6vw, 1.3rem)',
                fontStyle: 'italic',
                lineHeight: 1.7,
                color: '#C9A86C',
                paddingLeft: '1.5rem',
                borderLeft: '2px solid rgba(201,168,108,0.3)',
                marginBottom: '3rem',
                opacity: 0,
              }}
            >
              &ldquo;We do not recreate seasons — we translate their emotional architecture into scent.&rdquo;
            </blockquote>
            <Link
              href="/about"
              className="philosophy-cta"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#C9A86C',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(201,168,108,0.3)',
                paddingBottom: '4px',
                opacity: 0,
                transition: 'color 0.3s ease, border-color 0.3s ease',
              }}
            >
              Our Philosophy
              <span style={{ fontSize: '1rem', lineHeight: 1 }}>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ Footer ═══ */}
      <footer
        style={{
          padding: 'clamp(60px, 8vw, 100px) clamp(16px, 8vw, 120px) clamp(30px, 4vw, 50px)',
          borderTop: '1px solid rgba(245,240,232,0.06)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            gap: '3rem',
            alignItems: 'start',
            marginBottom: '4rem',
          }}
        >
          <div>
            <span
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: '1.6rem',
                letterSpacing: '0.18em',
                color: '#F5F0E8',
                opacity: 0.5,
              }}
            >
              QUATRÉA
            </span>
            <p
              style={{
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '0.7rem',
                lineHeight: 1.7,
                color: '#F5F0E8',
                opacity: 0.25,
                marginTop: '1rem',
                maxWidth: '240px',
              }}
            >
              Four seasons. Four essences. A luxury fragrance collection inspired by the eternal cycle.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
            <span
              style={{
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '0.55rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#C9A86C',
                opacity: 0.5,
                marginBottom: '0.5rem',
              }}
            >
              Collection
            </span>
            {SEASON_KEYS.map((key) => (
              <Link
                key={key}
                href={`/${key}`}
                style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: '0.95rem',
                  letterSpacing: '0.08em',
                  color: '#F5F0E8',
                  opacity: 0.35,
                  textDecoration: 'none',
                  transition: 'opacity 0.3s',
                }}
              >
                {SEASONS[key].perfume}
              </Link>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-end' }}>
            <span
              style={{
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '0.55rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#C9A86C',
                opacity: 0.5,
                marginBottom: '0.5rem',
              }}
            >
              Explore
            </span>
            {[
              { href: '/about', label: 'Our Story' },
              { href: '/spring', label: 'Begin with Spring' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{
                  fontFamily: 'var(--font-inter), system-ui, sans-serif',
                  fontSize: '0.7rem',
                  letterSpacing: '0.08em',
                  color: '#F5F0E8',
                  opacity: 0.3,
                  textDecoration: 'none',
                  transition: 'opacity 0.3s',
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(245,240,232,0.04)',
          }}
        >
          <span style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.6rem', color: '#F5F0E8', opacity: 0.15 }}>
            © 2024 Quatréa. All rights reserved.
          </span>
          <span style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.55rem', letterSpacing: '0.15em', color: '#F5F0E8', opacity: 0.12 }}>
            Paris · Milan · Tokyo
          </span>
        </div>
      </footer>
    </div>
  )
}
