'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { PerfumeBottle } from './PerfumeBottle'
import { SEASONS, SEASON_KEYS, type SeasonKey } from '@/lib/seasons'

interface SeasonPageProps {
  seasonKey: SeasonKey
}

export function SeasonPage({ seasonKey }: SeasonPageProps) {
  const season = SEASONS[seasonKey]
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLElement>(null)

  const isLight = seasonKey === 'spring'
  const otherSeasons = SEASON_KEYS.filter((k) => k !== seasonKey)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const isMobile = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      || window.innerWidth < 768

    let ctx: { revert: () => void } | null = null

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        /* ── 1. Hero entrance ── */
        gsap.fromTo(
          '.hero-title-wrap',
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.4, ease: 'expo.out', delay: 0.15 },
        )
        gsap.fromTo(
          '.hero-sub',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out', delay: 0.45 },
        )
        gsap.fromTo(
          '.hero-scroll-cue',
          { opacity: 0 },
          { opacity: 1, duration: 0.8, delay: 1.0 },
        )

        if (isMobile) {
          /* ── Mobile: simple reveals, no pinning ── */
          gsap.utils.toArray<Element>('.reveal-item').forEach((el) => {
            gsap.fromTo(
              el,
              { y: 40, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: el,
                  start: 'top 85%',
                  toggleActions: 'play none none none',
                },
              },
            )
          })
          return
        }

        /* ── 2. Pinned bottle reveal sequence ── */
        const pinTl = gsap.timeline({
          scrollTrigger: {
            trigger: pinRef.current,
            start: 'top top',
            end: '+=250%',
            pin: true,
            scrub: 1.4,
            anticipatePin: 1,
          },
        })

        pinTl
          .fromTo('.pin-bottle', { opacity: 0, scale: 0.4, y: 60 }, { opacity: 1, scale: 1, y: 0, duration: 1 }, 0)
          .fromTo('.pin-perfume-name', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.6 }, 0.3)
          .fromTo('.pin-tagline', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5 }, 0.55)
          .fromTo('.pin-desc', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.75)
          .fromTo('.pin-note', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.12 }, 0.85)
          .to('.pin-bottle', { rotation: 4, scale: 1.06, duration: 0.8 }, 1.2)

        /* ── 3. Notes grid ── */
        gsap.fromTo(
          '.note-card',
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.notes-section',
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          },
        )

        /* ── 4. Story reveal ── */
        gsap.fromTo(
          '.story-heading',
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: '.story-section', start: 'top 75%' },
          },
        )
        gsap.fromTo(
          '.story-body',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out',
            delay: 0.2,
            scrollTrigger: { trigger: '.story-section', start: 'top 75%' },
          },
        )
        gsap.fromTo(
          '.craft-text',
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            scrollTrigger: { trigger: '.craft-text', start: 'top 85%' },
          },
        )

        /* ── 5. Other seasons ── */
        gsap.fromTo(
          '.other-season-card',
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: { trigger: '.other-seasons', start: 'top 80%' },
          },
        )
      }, containerRef)
    }

    init()

    return () => {
      ctx?.revert()
    }
  }, [seasonKey])

  const { bg, fg, accent, accentMuted } = season.colors

  return (
    <div
      ref={containerRef}
      style={{ backgroundColor: bg, color: fg, minHeight: '100vh' }}
    >
      {/* ── Hero ── */}
      <section
        ref={heroRef}
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
        {/* Atmospheric background glow */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse 80% 60% at 50% 40%, ${accentMuted} 0%, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />

        <div className="hero-title-wrap" style={{ position: 'relative', zIndex: 1 }}>
          <p
            className="hero-sub"
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: 'clamp(0.65rem, 1.2vw, 0.75rem)',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: accent,
              marginBottom: '1.5rem',
              opacity: 0.85,
            }}
          >
            {season.number} — {season.name}
          </p>

          <h1
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(4rem, 12vw, 11rem)',
              fontWeight: 300,
              letterSpacing: '-0.03em',
              lineHeight: 0.9,
              color: fg,
            }}
          >
            {season.perfume}
          </h1>

          <p
            className="hero-sub"
            style={{
              marginTop: '2rem',
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
              letterSpacing: '0.06em',
              color: fg,
              opacity: 0.55,
              maxWidth: '480px',
              margin: '1.5rem auto 0',
            }}
          >
            {season.tagline}
          </p>
        </div>

        {/* Scroll cue */}
        <div
          className="hero-scroll-cue"
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
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: fg,
              opacity: 0.4,
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: '1px',
              height: '48px',
              background: `linear-gradient(to bottom, ${accent}, transparent)`,
              animation: 'lineGrow 1.5s ease infinite',
            }}
          />
        </div>
      </section>

      {/* ── Pinned bottle reveal ── */}
      <section
        ref={pinRef}
        style={{
          minHeight: '100vh',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'center',
          gap: '4rem',
          padding: '0 clamp(16px, 8vw, 120px)',
          position: 'relative',
          overflow: 'hidden',
        }}
        className="bottle-pin"
      >
        {/* Background texture */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse 60% 80% at 70% 50%, ${accentMuted} 0%, transparent 65%)`,
            pointerEvents: 'none',
          }}
        />

        {/* Text content */}
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '480px' }}>
          <h2
            className="pin-perfume-name"
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 300,
              lineHeight: 1,
              color: fg,
              marginBottom: '1rem',
              opacity: 0,
            }}
          >
            {season.perfume}
          </h2>

          <p
            className="pin-tagline"
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: 'clamp(0.75rem, 1.2vw, 0.875rem)',
              letterSpacing: '0.08em',
              color: accent,
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
              opacity: 0,
            }}
          >
            {season.tagline}
          </p>

          <p
            className="pin-desc"
            style={{
              fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)',
              lineHeight: 1.75,
              color: fg,
              opacity: 0,
              maxWidth: '400px',
              marginBottom: '2.5rem',
            }}
          >
            {season.description}
          </p>

          {/* Notes preview */}
          {(['top', 'heart', 'base'] as const).map((layer) => (
            <div
              key={layer}
              className="pin-note reveal-item"
              style={{
                display: 'flex',
                gap: '0.75rem',
                alignItems: 'baseline',
                marginBottom: '0.6rem',
                opacity: 0,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-inter), system-ui, sans-serif',
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: accent,
                  minWidth: '44px',
                  opacity: 0.75,
                }}
              >
                {layer}
              </span>
              <span
                style={{
                  fontSize: '0.875rem',
                  color: fg,
                  opacity: 0.7,
                }}
              >
                {season.notes[layer].join(' · ')}
              </span>
            </div>
          ))}
        </div>

        {/* Bottle */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <PerfumeBottle
            perfumeName={season.perfume}
            seasonName={season.name}
            accentColor={accent}
            className="pin-bottle"
            style={{
              width: 'clamp(140px, 20vw, 240px)',
              height: 'auto',
              opacity: 0,
              filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.4))',
            }}
          />
        </div>
      </section>

      {/* ── Fragrance notes grid ── */}
      <section
        className="notes-section reveal-item"
        style={{
          padding: 'clamp(80px, 12vw, 160px) clamp(16px, 8vw, 120px)',
          borderTop: `1px solid ${accentMuted}`,
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '0.65rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: accent,
            marginBottom: '3rem',
            opacity: 0.7,
          }}
        >
          Fragrance Composition
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2px',
          }}
        >
          {(['top', 'heart', 'base'] as const).map((layer) => (
            <div
              key={layer}
              className="note-card"
              style={{
                padding: '2.5rem 2rem',
                background: accentMuted,
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '2px',
                  height: '100%',
                  background: accent,
                  opacity: 0.4,
                }}
              />
              <p
                style={{
                  fontFamily: 'var(--font-inter), system-ui, sans-serif',
                  fontSize: '0.6rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: accent,
                  marginBottom: '1rem',
                  opacity: 0.75,
                }}
              >
                {layer} notes
              </p>
              {season.notes[layer].map((note) => (
                <p
                  key={note}
                  style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                    color: fg,
                    marginBottom: '0.35rem',
                    lineHeight: 1.3,
                  }}
                >
                  {note}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── Story ── */}
      <section
        className="story-section reveal-item"
        style={{
          padding: 'clamp(80px, 12vw, 160px) clamp(16px, 8vw, 120px)',
          display: 'grid',
          gridTemplateColumns: '1fr min(60ch, 100%)',
          gap: '4rem',
          alignItems: 'start',
        }}
      >
        <div>
          <div
            aria-hidden
            style={{
              width: '1px',
              height: '80px',
              background: `linear-gradient(to bottom, ${accent}, transparent)`,
              marginBottom: '2rem',
            }}
          />
          <h2
            className="story-heading"
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
              fontWeight: 300,
              color: fg,
              lineHeight: 1.2,
            }}
          >
            The Story
          </h2>
        </div>

        <div>
          <p
            className="story-body"
            style={{
              fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)',
              lineHeight: 1.9,
              color: fg,
              opacity: 0.75,
              marginBottom: '2rem',
            }}
          >
            {season.story}
          </p>
          <p
            className="craft-text"
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
              fontStyle: 'italic',
              lineHeight: 1.7,
              color: accent,
              paddingLeft: '1.5rem',
              borderLeft: `1px solid ${accent}`,
              opacity: 0.85,
            }}
          >
            {season.craft}
          </p>
        </div>
      </section>

      {/* ── Other seasons ── */}
      <section
        className="other-seasons reveal-item"
        style={{
          padding: 'clamp(80px, 12vw, 160px) clamp(16px, 8vw, 120px)',
          borderTop: `1px solid ${accentMuted}`,
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '0.65rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: accent,
            marginBottom: '3rem',
            opacity: 0.7,
          }}
        >
          Continue the Journey
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2px',
          }}
        >
          {otherSeasons.map((k) => {
            const s = SEASONS[k]
            return (
              <Link
                key={k}
                href={`/${k}`}
                className="other-season-card"
                style={{
                  display: 'block',
                  padding: '3rem 2rem',
                  background: s.colors.cardGradient,
                  textDecoration: 'none',
                  transition: 'transform 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-inter), system-ui, sans-serif',
                    fontSize: '0.6rem',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: '#fff',
                    opacity: 0.6,
                    marginBottom: '0.75rem',
                  }}
                >
                  {s.number}
                </span>
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                    fontWeight: 300,
                    color: '#fff',
                    lineHeight: 1,
                    marginBottom: '0.5rem',
                  }}
                >
                  {s.name}
                </span>
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-inter), system-ui, sans-serif',
                    fontSize: '0.75rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#fff',
                    opacity: 0.75,
                  }}
                >
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
          borderTop: `1px solid ${accentMuted}`,
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
            color: fg,
            opacity: 0.5,
          }}
        >
          QUATRÉA
        </span>
        <span
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '0.7rem',
            letterSpacing: '0.08em',
            color: fg,
            opacity: 0.3,
          }}
        >
          © 2024 Quatréa. All rights reserved.
        </span>
      </footer>
    </div>
  )
}
