'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { PerfumeBottle } from './PerfumeBottle'
import { FloatingParticles } from './FloatingParticles'
import { Divider } from './Divider'
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
        const heroTl = gsap.timeline({ delay: 0.2 })

        heroTl
          .fromTo('.hero-line-top', { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power2.out' })
          .fromTo('.hero-number', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.2')
          .fromTo(
            '.hero-title-wrap',
            { y: 80, opacity: 0, scale: 0.97 },
            { y: 0, opacity: 1, scale: 1, duration: 1.4, ease: 'expo.out' },
            '-=0.3',
          )
          .fromTo('.hero-tagline-text', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out' }, '-=0.6')
          .fromTo('.hero-scroll-cue', { opacity: 0 }, { opacity: 1, duration: 0.8 }, '-=0.3')

        gsap.to('.hero-glow-layer', {
          yPercent: 25,
          ease: 'none',
          scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
        })

        if (isMobile) {
          gsap.utils.toArray<Element>('.reveal-item').forEach((el) => {
            gsap.fromTo(el, { y: 40, opacity: 0 }, {
              y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
              scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
            })
          })
          return
        }

        /* ── 2. Pinned bottle reveal ── */
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
          .fromTo('.pin-glow-ring', { opacity: 0, scale: 0 }, { opacity: 0.3, scale: 1, duration: 0.8 }, 0)
          .fromTo('.pin-bottle', { opacity: 0, scale: 0.3, y: 80 }, { opacity: 1, scale: 1, y: 0, duration: 1.2 }, 0.1)
          .fromTo('.pin-perfume-name', { opacity: 0, y: 60, clipPath: 'inset(0 0 100% 0)' }, { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.8 }, 0.35)
          .fromTo('.pin-tagline', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5 }, 0.55)
          .fromTo('.pin-desc', { opacity: 0 }, { opacity: 0.75, duration: 0.5 }, 0.7)
          .fromTo('.pin-note', { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.1 }, 0.85)
          .to('.pin-bottle', { rotation: 3, scale: 1.08, duration: 0.8 }, 1.3)
          .to('.pin-glow-ring', { scale: 1.3, opacity: 0.15, duration: 0.6 }, 1.3)

        /* ── 3. Notes grid ── */
        gsap.fromTo('.note-card', { opacity: 0, y: 70, scale: 0.96 }, {
          opacity: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.notes-section', start: 'top 75%' },
        })

        /* ── 4. Story reveal ── */
        gsap.fromTo('.story-line', { scaleY: 0 }, {
          scaleY: 1, duration: 1.2, ease: 'power2.out', transformOrigin: 'top',
          scrollTrigger: { trigger: '.story-section', start: 'top 78%' },
        })
        gsap.fromTo('.story-heading', { opacity: 0, y: 50 }, {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.story-section', start: 'top 75%' },
        })
        gsap.fromTo('.story-body', { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', delay: 0.15,
          scrollTrigger: { trigger: '.story-section', start: 'top 75%' },
        })
        gsap.fromTo('.craft-text', { opacity: 0, x: -20 }, {
          opacity: 1, x: 0, duration: 0.8,
          scrollTrigger: { trigger: '.craft-text', start: 'top 85%' },
        })

        /* ── 5. Other seasons ── */
        gsap.fromTo('.other-season-card', { opacity: 0, y: 60, scale: 0.95 }, {
          opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.other-seasons', start: 'top 80%' },
        })
      }, containerRef)
    }

    init()
    return () => { ctx?.revert() }
  }, [seasonKey])

  const { bg, fg, accent, accentMuted } = season.colors

  return (
    <div ref={containerRef} style={{ backgroundColor: bg, color: fg, minHeight: '100vh' }}>

      {/* ═══ Hero ═══ */}
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
        {/* Multiple atmospheric glow layers */}
        <div
          className="hero-glow-layer"
          aria-hidden
          style={{
            position: 'absolute',
            inset: '-30%',
            background: `radial-gradient(ellipse 60% 45% at 50% 40%, ${accentMuted} 0%, transparent 65%)`,
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: '-20%',
            background: `radial-gradient(ellipse 30% 40% at 30% 60%, ${accent}08 0%, transparent 50%)`,
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: '-20%',
            background: `radial-gradient(ellipse 25% 30% at 70% 35%, ${accent}06 0%, transparent 50%)`,
            pointerEvents: 'none',
          }}
        />

        <FloatingParticles color={accent} count={20} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px' }}>
          {/* Ornamental line */}
          <div
            className="hero-line-top"
            style={{
              width: '60px',
              height: '1px',
              background: `linear-gradient(to right, transparent, ${accent}, transparent)`,
              margin: '0 auto 2rem',
              transformOrigin: 'center',
            }}
          />

          <p
            className="hero-number"
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: 'clamp(0.55rem, 1vw, 0.65rem)',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: accent,
              marginBottom: '1.5rem',
              opacity: 0,
            }}
          >
            No. {season.number} — {season.name}
          </p>

          <div className="hero-title-wrap" style={{ opacity: 0 }}>
            <h1
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(4.5rem, 14vw, 13rem)',
                fontWeight: 300,
                letterSpacing: '-0.04em',
                lineHeight: 0.88,
                color: fg,
              }}
            >
              {season.perfume}
            </h1>
          </div>

          <Divider color={accent} style={{ margin: '1.5rem auto' }} />

          <p
            className="hero-tagline-text"
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: 'clamp(0.8rem, 1.3vw, 0.95rem)',
              letterSpacing: '0.08em',
              color: fg,
              opacity: 0,
              maxWidth: '420px',
              margin: '0 auto',
              lineHeight: 1.6,
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
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: fg,
              opacity: 0.3,
            }}
          >
            Explore
          </span>
          <div
            style={{
              width: '1px',
              height: '50px',
              background: `linear-gradient(to bottom, ${accent}, transparent)`,
              animation: 'lineGrow 1.8s ease infinite',
            }}
          />
        </div>
      </section>

      {/* ═══ Pinned bottle reveal ═══ */}
      <section
        ref={pinRef}
        style={{
          minHeight: '100vh',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'center',
          gap: 'clamp(2rem, 5vw, 5rem)',
          padding: '0 clamp(16px, 8vw, 120px)',
          position: 'relative',
          overflow: 'hidden',
        }}
        className="bottle-pin"
      >
        {/* Background glow */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse 50% 70% at 65% 50%, ${accentMuted} 0%, transparent 60%)`,
            pointerEvents: 'none',
          }}
        />

        {/* Text content */}
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '480px' }}>
          <h2
            className="pin-perfume-name"
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
              fontWeight: 300,
              lineHeight: 0.95,
              color: fg,
              marginBottom: '1.2rem',
              opacity: 0,
            }}
          >
            {season.perfume}
          </h2>

          <p
            className="pin-tagline"
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: 'clamp(0.7rem, 1.1vw, 0.8rem)',
              letterSpacing: '0.12em',
              color: accent,
              textTransform: 'uppercase',
              marginBottom: '2rem',
              opacity: 0,
            }}
          >
            {season.tagline}
          </p>

          <p
            className="pin-desc"
            style={{
              fontSize: 'clamp(0.9rem, 1.3vw, 1rem)',
              lineHeight: 1.85,
              color: fg,
              opacity: 0,
              maxWidth: '400px',
              marginBottom: '3rem',
            }}
          >
            {season.description}
          </p>

          {(['top', 'heart', 'base'] as const).map((layer) => (
            <div
              key={layer}
              className="pin-note reveal-item"
              style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'baseline',
                marginBottom: '0.75rem',
                opacity: 0,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-inter), system-ui, sans-serif',
                  fontSize: '0.6rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: accent,
                  minWidth: '48px',
                  opacity: 0.65,
                }}
              >
                {layer}
              </span>
              <span
                style={{
                  fontSize: '0.85rem',
                  color: fg,
                  opacity: 0.6,
                  letterSpacing: '0.02em',
                }}
              >
                {season.notes[layer].join(' · ')}
              </span>
            </div>
          ))}
        </div>

        {/* Bottle with glow ring */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Glow ring behind bottle */}
          <div
            className="pin-glow-ring"
            style={{
              position: 'absolute',
              width: 'clamp(200px, 30vw, 350px)',
              height: 'clamp(200px, 30vw, 350px)',
              borderRadius: '50%',
              border: `1px solid ${accent}`,
              opacity: 0,
              boxShadow: `0 0 80px ${accent}22, inset 0 0 60px ${accent}11`,
              pointerEvents: 'none',
            }}
          />
          <div
            className="pin-glow-ring"
            style={{
              position: 'absolute',
              width: 'clamp(280px, 40vw, 450px)',
              height: 'clamp(280px, 40vw, 450px)',
              borderRadius: '50%',
              border: `1px solid ${accent}`,
              opacity: 0,
              pointerEvents: 'none',
            }}
          />

          <PerfumeBottle
            perfumeName={season.perfume}
            seasonName={season.name}
            accentColor={accent}
            className="pin-bottle"
            style={{
              width: 'clamp(140px, 20vw, 260px)',
              height: 'auto',
              opacity: 0,
              filter: `drop-shadow(0 40px 100px ${accent}44) drop-shadow(0 10px 30px rgba(0,0,0,0.3))`,
            }}
          />
        </div>
      </section>

      {/* ═══ Fragrance notes ═══ */}
      <section
        className="notes-section reveal-item"
        style={{
          padding: 'clamp(100px, 14vw, 200px) clamp(16px, 8vw, 120px)',
          borderTop: `1px solid ${accent}15`,
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
          <p
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '0.6rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: accent,
              opacity: 0.6,
            }}
          >
            Fragrance Composition
          </p>
          <p
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)',
              fontStyle: 'italic',
              color: fg,
              opacity: 0.3,
            }}
          >
            Three layers, one story
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '4px',
          }}
        >
          {(['top', 'heart', 'base'] as const).map((layer, idx) => (
            <div
              key={layer}
              className="note-card"
              style={{
                padding: '3rem 2rem',
                background: `linear-gradient(135deg, ${accent}08 0%, ${accent}04 100%)`,
                position: 'relative',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${accent}12`,
              }}
            >
              {/* Accent bar */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '2px',
                  height: '100%',
                  background: `linear-gradient(to bottom, ${accent}, transparent)`,
                  opacity: 0.4,
                }}
              />

              {/* Layer number */}
              <span
                style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: '4rem',
                  fontWeight: 300,
                  color: accent,
                  opacity: 0.06,
                  position: 'absolute',
                  top: '1rem',
                  right: '1.5rem',
                  lineHeight: 1,
                }}
              >
                {String(idx + 1).padStart(2, '0')}
              </span>

              <p
                style={{
                  fontFamily: 'var(--font-inter), system-ui, sans-serif',
                  fontSize: '0.55rem',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: accent,
                  marginBottom: '1.5rem',
                  opacity: 0.65,
                }}
              >
                {layer} notes
              </p>
              {season.notes[layer].map((note) => (
                <p
                  key={note}
                  style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: 'clamp(1.15rem, 2vw, 1.5rem)',
                    color: fg,
                    marginBottom: '0.5rem',
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

      {/* ═══ Story ═══ */}
      <section
        className="story-section reveal-item"
        style={{
          padding: 'clamp(100px, 14vw, 200px) clamp(16px, 8vw, 120px)',
          display: 'grid',
          gridTemplateColumns: '1fr min(60ch, 100%)',
          gap: '4rem',
          alignItems: 'start',
          position: 'relative',
        }}
      >
        <div>
          <div
            className="story-line"
            aria-hidden
            style={{
              width: '1px',
              height: '100px',
              background: `linear-gradient(to bottom, ${accent}, transparent)`,
              marginBottom: '2rem',
              transformOrigin: 'top',
            }}
          />
          <h2
            className="story-heading"
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontWeight: 300,
              color: fg,
              lineHeight: 1.15,
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
              lineHeight: 2,
              color: fg,
              opacity: 0.7,
              marginBottom: '2.5rem',
            }}
          >
            {season.story}
          </p>
          <blockquote
            className="craft-text"
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
              fontStyle: 'italic',
              lineHeight: 1.8,
              color: accent,
              paddingLeft: '1.5rem',
              borderLeft: `2px solid ${accent}55`,
              opacity: 0.8,
            }}
          >
            {season.craft}
          </blockquote>
        </div>
      </section>

      {/* ═══ Other seasons ═══ */}
      <section
        className="other-seasons reveal-item"
        style={{
          padding: 'clamp(100px, 14vw, 200px) clamp(16px, 8vw, 120px)',
          borderTop: `1px solid ${accent}12`,
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
          <p
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: '0.6rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: accent,
              opacity: 0.6,
            }}
          >
            Continue the Journey
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '4px',
          }}
        >
          {otherSeasons.map((k) => {
            const s = SEASONS[k]
            return (
              <Link
                key={k}
                href={`/${k}`}
                className="other-season-card luxury-card"
                style={{
                  display: 'block',
                  padding: 'clamp(2rem, 4vw, 3.5rem) 2rem',
                  background: s.colors.cardGradient,
                  textDecoration: 'none',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Large watermark number */}
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

                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-inter), system-ui, sans-serif',
                    fontSize: '0.55rem',
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    color: '#fff',
                    opacity: 0.5,
                    marginBottom: '0.75rem',
                  }}
                >
                  No. {s.number}
                </span>
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
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
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: 'clamp(0.85rem, 1.4vw, 1rem)',
                    fontStyle: 'italic',
                    color: '#fff',
                    opacity: 0.6,
                    marginBottom: '1rem',
                  }}
                >
                  {s.perfume}
                </span>
                <div style={{ width: '24px', height: '1px', background: '#fff', opacity: 0.25, marginBottom: '0.75rem' }} />
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-inter), system-ui, sans-serif',
                    fontSize: '0.6rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#fff',
                    opacity: 0.4,
                  }}
                >
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
          padding: 'clamp(50px, 7vw, 80px) clamp(16px, 8vw, 120px)',
          borderTop: `1px solid ${accent}12`,
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
            fontSize: '1.4rem',
            letterSpacing: '0.18em',
            color: fg,
            opacity: 0.4,
          }}
        >
          QUATRÉA
        </span>
        <span
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '0.6rem',
            color: fg,
            opacity: 0.2,
          }}
        >
          © 2024 Quatréa. All rights reserved.
        </span>
      </footer>
    </div>
  )
}
