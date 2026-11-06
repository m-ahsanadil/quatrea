'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { SEASONS, SEASON_KEYS } from '@/lib/seasons'

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
        /* ── Hero entrance ── */
        const heroTl = gsap.timeline({ delay: 0.2 })

        heroTl
          .fromTo('.hero-eyebrow', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' })
          .fromTo(
            '.hero-word',
            { yPercent: 110, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 1.1, ease: 'expo.out', stagger: 0.06 },
            '-=0.2',
          )
          .fromTo('.hero-tagline', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.3')
          .fromTo('.hero-cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4')
          .fromTo('.hero-scroll-line', { scaleY: 0 }, { scaleY: 1, duration: 0.9, ease: 'power2.out', transformOrigin: 'top' }, '-=0.3')

        /* ── Hero parallax on scroll ── */
        gsap.to('.hero-bg-radial', {
          yPercent: 30,
          ease: 'none',
          scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: true },
        })
        gsap.to('.hero-content', {
          yPercent: 20,
          opacity: 0.3,
          ease: 'none',
          scrollTrigger: { trigger: '.hero-section', start: 'top top', end: '80% top', scrub: true },
        })

        /* ── Season cards stagger ── */
        gsap.fromTo(
          '.season-card',
          { opacity: 0, y: isMobile ? 40 : 80 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: '.seasons-grid',
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          },
        )

        /* ── Brand section ── */
        gsap.fromTo(
          '.brand-line',
          { width: 0 },
          {
            width: '60px',
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: { trigger: '.brand-section', start: 'top 80%' },
          },
        )
        gsap.fromTo(
          '.brand-heading',
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.brand-section', start: 'top 75%' },
          },
        )
        gsap.fromTo(
          '.brand-text',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out',
            delay: 0.2,
            scrollTrigger: { trigger: '.brand-section', start: 'top 75%' },
          },
        )
        gsap.fromTo(
          '.brand-cta',
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.7,
            delay: 0.4,
            scrollTrigger: { trigger: '.brand-section', start: 'top 75%' },
          },
        )
      }, containerRef)
    }

    init()

    return () => {
      ctx?.revert()
    }
  }, [])

  return (
    <div ref={containerRef} style={{ backgroundColor: '#050505', color: '#F5F0E8' }}>

      {/* ── Hero ── */}
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
        {/* Radial glow */}
        <div
          className="hero-bg-radial"
          aria-hidden
          style={{
            position: 'absolute',
            inset: '-20%',
            background:
              'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,108,0.07) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />

        <div className="hero-content" style={{ position: 'relative', zIndex: 1, maxWidth: '900px', width: '100%' }}>
          {/* Eyebrow */}
          <p
            className="hero-eyebrow"
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: 'clamp(0.6rem, 1.1vw, 0.7rem)',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: '#C9A86C',
              marginBottom: '2rem',
              opacity: 0,
            }}
          >
            Luxury Fragrance Collection
          </p>

          {/* Title words — each wrapped for clip animation */}
          <h1
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(5rem, 16vw, 14rem)',
              fontWeight: 300,
              lineHeight: 0.88,
              letterSpacing: '-0.03em',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0 0.25em',
              overflow: 'hidden',
            }}
          >
            {'QUATRÉA'.split('').map((char, i) => (
              <span
                key={i}
                className="hero-word"
                style={{ display: 'inline-block', opacity: 0 }}
              >
                {char}
              </span>
            ))}
          </h1>

          <p
            className="hero-tagline"
            style={{
              marginTop: '2.5rem',
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: 'clamp(0.75rem, 1.4vw, 0.9rem)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#F5F0E8',
              opacity: 0,
            }}
          >
            Four Seasons&nbsp;&nbsp;·&nbsp;&nbsp;Four Essences&nbsp;&nbsp;·&nbsp;&nbsp;One World
          </p>

          <div
            className="hero-cta"
            style={{ marginTop: '3rem', opacity: 0 }}
          >
            <Link
              href="/spring"
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#050505',
                background: '#C9A86C',
                padding: '0.9rem 2.5rem',
                textDecoration: 'none',
                transition: 'opacity 0.2s ease',
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
            bottom: '3rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '0.55rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#F5F0E8',
              opacity: 0.3,
            }}
          >
            Scroll
          </span>
          <div
            className="hero-scroll-line"
            style={{
              width: '1px',
              height: '52px',
              background: 'linear-gradient(to bottom, rgba(201,168,108,0.8), transparent)',
              transformOrigin: 'top',
            }}
          />
        </div>
      </section>

      {/* ── Seasons grid ── */}
      <section
        style={{
          padding: 'clamp(80px, 12vw, 160px) clamp(16px, 5vw, 60px)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '3rem',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#C9A86C',
              opacity: 0.75,
            }}
          >
            The Collection
          </p>
          <p
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
              fontStyle: 'italic',
              color: '#F5F0E8',
              opacity: 0.4,
            }}
          >
            Four distinct worlds
          </p>
        </div>

        <div
          className="seasons-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
            gap: '2px',
          }}
        >
          {SEASON_KEYS.map((key) => {
            const season = SEASONS[key]
            return (
              <Link
                key={key}
                href={`/${key}`}
                className="season-card"
                aria-label={`Explore ${season.name} — ${season.perfume}`}
                style={{
                  display: 'block',
                  textDecoration: 'none',
                  position: 'relative',
                  overflow: 'hidden',
                  aspectRatio: '3 / 4',
                  background: season.colors.cardGradient,
                  opacity: 0,
                }}
              >
                {/* Hover overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0)',
                    transition: 'background 0.4s ease',
                  }}
                  className="card-overlay"
                />

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
                      fontSize: '0.6rem',
                      letterSpacing: '0.25em',
                      textTransform: 'uppercase',
                      color: '#fff',
                      opacity: 0.6,
                      marginBottom: '0.75rem',
                    }}
                  >
                    {season.number}
                  </span>
                  <h2
                    style={{
                      fontFamily: 'var(--font-cormorant), Georgia, serif',
                      fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                      fontWeight: 300,
                      color: '#fff',
                      lineHeight: 0.95,
                      marginBottom: '0.4rem',
                    }}
                  >
                    {season.name}
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--font-inter), system-ui, sans-serif',
                      fontSize: '0.7rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: '#fff',
                      opacity: 0.75,
                      marginBottom: '1.5rem',
                    }}
                  >
                    {season.perfume}
                  </p>
                  <span
                    style={{
                      fontFamily: 'var(--font-inter), system-ui, sans-serif',
                      fontSize: '0.65rem',
                      letterSpacing: '0.15em',
                      color: '#fff',
                      opacity: 0.5,
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

      {/* ── Brand story ── */}
      <section
        className="brand-section"
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
          <div
            className="brand-line"
            aria-hidden
            style={{
              height: '1px',
              width: 0,
              background: '#C9A86C',
              marginBottom: '1.5rem',
            }}
          />
          <h2
            className="brand-heading"
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 300,
              lineHeight: 1.1,
              color: '#F5F0E8',
              opacity: 0,
            }}
          >
            Four seasons,<br />
            <em>one language</em>
          </h2>
        </div>

        <div>
          <p
            className="brand-text"
            style={{
              fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)',
              lineHeight: 1.9,
              color: '#F5F0E8',
              opacity: 0,
              marginBottom: '2.5rem',
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
            className="brand-cta"
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#C9A86C',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(201,168,108,0.4)',
              paddingBottom: '3px',
              opacity: 0,
              transition: 'color 0.2s ease, border-color 0.2s ease',
            }}
          >
            Our Story →
          </Link>
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
        <span
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: '1.1rem',
            letterSpacing: '0.15em',
            color: '#F5F0E8',
            opacity: 0.4,
          }}
        >
          QUATRÉA
        </span>
        <div
          style={{
            display: 'flex',
            gap: '2rem',
            flexWrap: 'wrap',
          }}
        >
          {SEASON_KEYS.map((key) => (
            <Link
              key={key}
              href={`/${key}`}
              style={{
                fontFamily: 'var(--font-inter), system-ui, sans-serif',
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#F5F0E8',
                opacity: 0.3,
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
            >
              {SEASONS[key].name}
            </Link>
          ))}
        </div>
        <span
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '0.65rem',
            color: '#F5F0E8',
            opacity: 0.2,
          }}
        >
          © 2024 Quatréa
        </span>
      </footer>
    </div>
  )
}
