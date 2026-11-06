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
        const heroTl = gsap.timeline({ delay: 0.4 })

        heroTl
          .fromTo('.hero-ornament-top', { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: 'power2.out' })
          .fromTo('.hero-eyebrow', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.3')
          .fromTo(
            '.hero-letter',
            { yPercent: 130, opacity: 0, rotateX: 50 },
            { yPercent: 0, opacity: 1, rotateX: 0, duration: 1.4, ease: 'expo.out', stagger: 0.035 },
            '-=0.2',
          )
          .fromTo('.hero-divider', { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.5')
          .fromTo('.hero-tagline', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.3')
          .fromTo('.hero-cta', { opacity: 0, y: 24, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power2.out' }, '-=0.4')
          .fromTo('.hero-scroll-line', { scaleY: 0 }, { scaleY: 1, duration: 1.2, ease: 'power2.out', transformOrigin: 'top' }, '-=0.5')

        /* Hero parallax */
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

        /* Marquee */
        gsap.fromTo('.marquee-section', { opacity: 0 }, {
          opacity: 1, duration: 1,
          scrollTrigger: { trigger: '.marquee-section', start: 'top 90%' },
        })

        /* Cinematic quote */
        gsap.fromTo('.cine-quote-line', { scaleX: 0 }, {
          scaleX: 1, duration: 1.5, ease: 'power2.out',
          scrollTrigger: { trigger: '.cine-quote', start: 'top 80%' },
        })
        gsap.fromTo('.cine-quote-text', { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.cine-quote', start: 'top 78%' },
        })

        /* Season cards */
        gsap.fromTo(
          '.season-card',
          { opacity: 0, y: isMobile ? 50 : 120, scale: 0.92 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 1.2, stagger: 0.15, ease: 'expo.out',
            scrollTrigger: { trigger: '.seasons-grid', start: 'top 85%' },
          },
        )

        /* Bottles */
        gsap.fromTo('.bottle-showcase-item', { opacity: 0, y: 70 }, {
          opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.bottle-showcase', start: 'top 78%' },
        })

        /* Philosophy */
        gsap.fromTo('.philosophy-line', { scaleX: 0 }, {
          scaleX: 1, duration: 1.2, ease: 'power2.out',
          scrollTrigger: { trigger: '.philosophy-section', start: 'top 78%' },
        })
        gsap.fromTo('.philosophy-heading', { opacity: 0, y: 70 }, {
          opacity: 1, y: 0, duration: 1.3, ease: 'power3.out',
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
        {/* Animated mesh background */}
        <div className="mesh-bg hero-mesh" aria-hidden>
          <div className="mesh-orb" style={{ background: 'radial-gradient(circle, rgba(201,168,108,0.12) 0%, transparent 70%)' }} />
          <div className="mesh-orb" style={{ background: 'radial-gradient(circle, rgba(201,168,108,0.06) 0%, transparent 60%)' }} />
          <div className="mesh-orb" style={{ background: 'radial-gradient(circle, rgba(180,150,90,0.08) 0%, transparent 65%)' }} />
        </div>

        <FloatingParticles color="#C9A86C" count={30} />

        <div className="hero-content" style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', width: '100%' }}>
          <div
            className="hero-ornament-top"
            style={{
              width: '100px',
              height: '1px',
              background: 'linear-gradient(to right, transparent, #C9A86C, transparent)',
              margin: '0 auto 2.5rem',
              transformOrigin: 'center',
            }}
          />

          <p
            className="hero-eyebrow"
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: 'clamp(0.5rem, 0.9vw, 0.6rem)',
              letterSpacing: '0.5em',
              textTransform: 'uppercase',
              color: '#C9A86C',
              marginBottom: '3rem',
              opacity: 0,
            }}
          >
            Luxury Fragrance · Est. MMXXIV
          </p>

          <h1
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(6rem, 20vw, 18rem)',
              fontWeight: 300,
              lineHeight: 0.82,
              letterSpacing: '-0.05em',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0 0.03em',
              overflow: 'hidden',
              perspective: '800px',
            }}
          >
            {'QUATRÉA'.split('').map((char, i) => (
              <span
                key={i}
                className="hero-letter"
                style={{ display: 'inline-block', opacity: 0, willChange: 'transform' }}
              >
                {char}
              </span>
            ))}
          </h1>

          <div className="hero-divider" style={{ opacity: 0, transformOrigin: 'center' }}>
            <Divider />
          </div>

          <p
            className="hero-tagline"
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: 'clamp(0.6rem, 1.1vw, 0.75rem)',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#F5F0E8',
              opacity: 0,
              marginTop: '0.5rem',
            }}
          >
            Four Seasons&nbsp;&nbsp;·&nbsp;&nbsp;Four Essences&nbsp;&nbsp;·&nbsp;&nbsp;One World
          </p>

          <div className="hero-cta" style={{ marginTop: '4rem', opacity: 0 }}>
            <Link
              href="/spring"
              className="magnetic-btn"
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '0.6rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#050505',
                background: 'linear-gradient(135deg, #C9A86C 0%, #E0C88C 50%, #C9A86C 100%)',
                padding: '1.1rem 3.5rem',
                textDecoration: 'none',
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
              fontSize: '0.45rem',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: '#F5F0E8',
              opacity: 0.2,
            }}
          >
            Discover
          </span>
          <div
            className="hero-scroll-line"
            style={{
              width: '1px',
              height: '70px',
              background: 'linear-gradient(to bottom, rgba(201,168,108,0.5), transparent)',
              transformOrigin: 'top',
            }}
          />
        </div>
      </section>

      {/* ═══ Marquee ═══ */}
      <section
        className="marquee-section"
        style={{
          padding: '2.5rem 0',
          borderTop: '1px solid rgba(245,240,232,0.04)',
          borderBottom: '1px solid rgba(245,240,232,0.04)',
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
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 300,
                color: '#F5F0E8',
                opacity: 0.06,
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
          padding: 'clamp(100px, 14vw, 200px) clamp(16px, 8vw, 120px)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: '-30%',
            background: 'radial-gradient(ellipse 40% 40% at 50% 50%, rgba(201,168,108,0.04) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ position: 'relative', maxWidth: '750px', margin: '0 auto' }}>
          <div
            className="cine-quote-line"
            style={{
              width: '120px',
              height: '1px',
              background: 'linear-gradient(to right, transparent, #C9A86C, transparent)',
              margin: '0 auto 3rem',
              transformOrigin: 'center',
            }}
          />
          <blockquote
            className="cine-quote-text"
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              lineHeight: 1.4,
              color: '#F5F0E8',
              opacity: 0,
            }}
          >
            &ldquo;We do not recreate seasons — we translate their emotional architecture into scent.&rdquo;
          </blockquote>
          <div
            className="cine-quote-line"
            style={{
              width: '120px',
              height: '1px',
              background: 'linear-gradient(to right, transparent, #C9A86C, transparent)',
              margin: '3rem auto 0',
              transformOrigin: 'center',
            }}
          />
          <p
            className="cine-quote-text"
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '0.6rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#C9A86C',
              opacity: 0,
              marginTop: '2rem',
            }}
          >
            Maison Quatréa
          </p>
        </div>
      </section>

      {/* ═══ Collection Grid ═══ */}
      <section
        style={{
          padding: 'clamp(60px, 8vw, 100px) clamp(16px, 5vw, 60px)',
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
                fontSize: '0.55rem',
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                color: '#C9A86C',
                opacity: 0.6,
                marginBottom: '0.75rem',
              }}
            >
              The Collection
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(2.2rem, 4.5vw, 4rem)',
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
              fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)',
              fontStyle: 'italic',
              color: '#F5F0E8',
              opacity: 0.3,
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
                    background: `radial-gradient(ellipse 80% 60% at 50% 70%, ${season.colors.accent}33 0%, transparent 70%)`,
                    opacity: 0,
                    transition: 'opacity 0.7s ease',
                    pointerEvents: 'none',
                  }}
                />

                {/* Gradient bottom overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 15%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.65) 100%)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Large watermark number */}
                <div
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1.2rem',
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: 'clamp(5rem, 12vw, 9rem)',
                    fontWeight: 300,
                    lineHeight: 1,
                    color: '#fff',
                    opacity: 0.04,
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
                      fontSize: '0.5rem',
                      letterSpacing: '0.35em',
                      textTransform: 'uppercase',
                      color: '#fff',
                      opacity: 0.45,
                      marginBottom: '0.75rem',
                    }}
                  >
                    No. {season.number}
                  </span>
                  <h2
                    style={{
                      fontFamily: 'var(--font-cormorant), Georgia, serif',
                      fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                      fontWeight: 300,
                      color: '#fff',
                      lineHeight: 0.92,
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
                      color: '#fff',
                      opacity: 0.65,
                      marginBottom: '1.5rem',
                    }}
                  >
                    {season.perfume}
                  </p>
                  <div style={{ width: '40px', height: '1px', background: '#fff', opacity: 0.25, marginBottom: '1.2rem' }} />
                  <span
                    style={{
                      fontFamily: 'var(--font-inter), system-ui, sans-serif',
                      fontSize: '0.55rem',
                      letterSpacing: '0.25em',
                      textTransform: 'uppercase',
                      color: '#fff',
                      opacity: 0.4,
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
          padding: 'clamp(80px, 10vw, 140px) clamp(16px, 5vw, 60px)',
          borderTop: '1px solid rgba(245,240,232,0.04)',
          borderBottom: '1px solid rgba(245,240,232,0.04)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: '-20%',
            background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(201,168,108,0.03) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 'clamp(1.5rem, 4vw, 4rem)',
            maxWidth: '1000px',
            margin: '0 auto',
            position: 'relative',
          }}
        >
          {SEASON_KEYS.map((key) => {
            const season = SEASONS[key]
            return (
              <Link
                key={key}
                href={`/${key}`}
                className="bottle-showcase-item gradient-border-card luxury-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textDecoration: 'none',
                  padding: '2.5rem 1rem 2rem',
                  borderRadius: '2px',
                  border: '1px solid rgba(255,255,255,0.04)',
                  transition: 'background 0.5s ease, border-color 0.5s ease',
                }}
              >
                <div style={{ position: 'relative', marginBottom: '2rem' }}>
                  {/* Breathing glow behind bottle */}
                  <div
                    className="breathing-orb"
                    aria-hidden
                    style={{
                      position: 'absolute',
                      inset: '-30%',
                      borderRadius: '50%',
                      background: `radial-gradient(circle, ${season.colors.accent}15 0%, transparent 70%)`,
                    }}
                  />
                  <PerfumeBottle
                    perfumeName={season.perfume}
                    seasonName={season.name}
                    accentColor={season.colors.accent}
                    style={{
                      width: 'clamp(55px, 9vw, 90px)',
                      height: 'auto',
                      filter: `drop-shadow(0 15px 40px ${season.colors.accent}33)`,
                      position: 'relative',
                    }}
                  />
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)',
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
                    fontSize: '0.5rem',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: season.colors.accent,
                    opacity: 0.45,
                    marginTop: '0.5rem',
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
          padding: 'clamp(120px, 16vw, 240px) clamp(16px, 8vw, 120px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="mesh-bg" aria-hidden>
          <div className="mesh-orb" style={{ background: 'radial-gradient(circle, rgba(201,168,108,0.05) 0%, transparent 60%)' }} />
          <div className="mesh-orb" style={{ background: 'radial-gradient(circle, rgba(201,168,108,0.03) 0%, transparent 55%)' }} />
        </div>

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
                width: '100px',
                background: 'linear-gradient(to right, #C9A86C, transparent)',
                marginBottom: '2.5rem',
                transformOrigin: 'left',
              }}
            />
            <h2
              className="philosophy-heading"
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: 300,
                lineHeight: 1.05,
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
                lineHeight: 2.1,
                color: '#F5F0E8',
                opacity: 0,
                marginBottom: '3rem',
              }}
            >
              Quatréa was founded on a single conviction: that the turning of the year holds
              within it four entirely different emotional worlds. Spring&rsquo;s optimism.
              Summer&rsquo;s abandon. Autumn&rsquo;s complexity. Winter&rsquo;s clarity.
              Each season distilled not as a memory, but as a feeling — bottled, lasting,
              wearable as a second skin.
            </p>
            <Link
              href="/about"
              className="philosophy-cta magnetic-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1rem',
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '0.6rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#C9A86C',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(201,168,108,0.25)',
                paddingBottom: '6px',
                opacity: 0,
                transition: 'color 0.3s ease, border-color 0.3s ease',
              }}
            >
              Our Philosophy
              <span style={{ fontSize: '1.1rem', lineHeight: 1, transition: 'transform 0.3s' }}>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ Footer ═══ */}
      <footer
        style={{
          padding: 'clamp(80px, 10vw, 120px) clamp(16px, 8vw, 120px) clamp(30px, 4vw, 50px)',
          borderTop: '1px solid rgba(245,240,232,0.04)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr 1fr',
            gap: '3rem',
            alignItems: 'start',
            marginBottom: '5rem',
          }}
        >
          <div>
            <span
              className="shimmer-text"
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: '1.8rem',
                letterSpacing: '0.2em',
              }}
            >
              QUATRÉA
            </span>
            <p
              style={{
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '0.7rem',
                lineHeight: 1.8,
                color: '#F5F0E8',
                opacity: 0.2,
                marginTop: '1.5rem',
                maxWidth: '260px',
              }}
            >
              Four seasons. Four essences. A luxury fragrance collection inspired by the eternal cycle of nature.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '0.5rem',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: '#C9A86C',
                opacity: 0.45,
                marginBottom: '0.75rem',
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
                  fontSize: '1rem',
                  letterSpacing: '0.06em',
                  color: '#F5F0E8',
                  opacity: 0.3,
                  textDecoration: 'none',
                  transition: 'opacity 0.3s',
                }}
              >
                {SEASONS[key].perfume}
              </Link>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '0.5rem',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: '#C9A86C',
                opacity: 0.45,
                marginBottom: '0.75rem',
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
                  opacity: 0.25,
                  textDecoration: 'none',
                  transition: 'opacity 0.3s',
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(245,240,232,0.03)',
          }}
        >
          <span style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.55rem', color: '#F5F0E8', opacity: 0.12 }}>
            © 2024 Quatréa. All rights reserved.
          </span>
          <span style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.5rem', letterSpacing: '0.2em', color: '#F5F0E8', opacity: 0.1 }}>
            Paris · Milan · Tokyo
          </span>
        </div>
      </footer>
    </div>
  )
}
