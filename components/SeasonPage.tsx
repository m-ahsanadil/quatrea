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
        /* ── Hero entrance ── */
        const heroTl = gsap.timeline({ delay: 0.3 })

        heroTl
          .fromTo('.hero-line-top', { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: 'power2.out' })
          .fromTo('.hero-number', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.2')
          .fromTo(
            '.hero-title-wrap',
            { y: 100, opacity: 0, scale: 0.96 },
            { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: 'expo.out' },
            '-=0.3',
          )
          .fromTo('.hero-tagline-text', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out' }, '-=0.7')
          .fromTo('.hero-scroll-cue', { opacity: 0 }, { opacity: 1, duration: 0.8 }, '-=0.3')

        /* Hero parallax */
        gsap.to('.hero-mesh', {
          yPercent: 20,
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

        /* ── Pinned bottle reveal ── */
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
          .fromTo('.pin-glow-ring-inner', { opacity: 0, scale: 0 }, { opacity: 0.35, scale: 1, duration: 0.8 }, 0)
          .fromTo('.pin-glow-ring-outer', { opacity: 0, scale: 0 }, { opacity: 0.15, scale: 1, duration: 1 }, 0.1)
          .fromTo('.pin-bottle', { opacity: 0, scale: 0.2, y: 100, rotation: -10 }, { opacity: 1, scale: 1, y: 0, rotation: 0, duration: 1.3 }, 0.1)
          .fromTo('.pin-perfume-name', { opacity: 0, y: 70, clipPath: 'inset(0 0 100% 0)' }, { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.9 }, 0.4)
          .fromTo('.pin-tagline', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5 }, 0.6)
          .fromTo('.pin-desc', { opacity: 0 }, { opacity: 0.75, duration: 0.5 }, 0.75)
          .fromTo('.pin-note', { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.1 }, 0.9)
          .to('.pin-bottle', { rotation: 4, scale: 1.1, duration: 0.8, ease: 'power2.inOut' }, 1.4)
          .to('.pin-glow-ring-inner', { scale: 1.4, opacity: 0.12, duration: 0.6 }, 1.4)
          .to('.pin-glow-ring-outer', { scale: 1.5, opacity: 0.06, duration: 0.6 }, 1.4)

        /* ── Notes grid ── */
        gsap.fromTo('.note-card', { opacity: 0, y: 80, scale: 0.94 }, {
          opacity: 1, y: 0, scale: 1, duration: 1, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.notes-section', start: 'top 75%' },
        })

        /* ── Story ── */
        gsap.fromTo('.story-line', { scaleY: 0 }, {
          scaleY: 1, duration: 1.4, ease: 'power2.out', transformOrigin: 'top',
          scrollTrigger: { trigger: '.story-section', start: 'top 78%' },
        })
        gsap.fromTo('.story-heading', { opacity: 0, y: 60 }, {
          opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
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

        /* ── Other seasons ── */
        gsap.fromTo('.other-season-card', { opacity: 0, y: 70, scale: 0.93 }, {
          opacity: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out',
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
        {/* Animated mesh background */}
        <div className="mesh-bg hero-mesh" aria-hidden>
          <div className="mesh-orb" style={{ background: `radial-gradient(circle, ${accent}1a 0%, transparent 65%)` }} />
          <div className="mesh-orb" style={{ background: `radial-gradient(circle, ${accent}0d 0%, transparent 55%)` }} />
          <div className="mesh-orb" style={{ background: `radial-gradient(circle, ${accent}10 0%, transparent 60%)` }} />
        </div>

        <FloatingParticles color={accent} count={22} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '950px' }}>
          <div
            className="hero-line-top"
            style={{
              width: '80px',
              height: '1px',
              background: `linear-gradient(to right, transparent, ${accent}, transparent)`,
              margin: '0 auto 2.5rem',
              transformOrigin: 'center',
            }}
          />

          <p
            className="hero-number"
            style={{
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
              fontSize: 'clamp(0.5rem, 0.9vw, 0.6rem)',
              letterSpacing: '0.5em',
              textTransform: 'uppercase',
              color: accent,
              marginBottom: '2rem',
              opacity: 0,
            }}
          >
            No. {season.number} — {season.name}
          </p>

          <div className="hero-title-wrap" style={{ opacity: 0 }}>
            <h1
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(5rem, 16vw, 15rem)',
                fontWeight: 300,
                letterSpacing: '-0.05em',
                lineHeight: 0.85,
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
              fontSize: 'clamp(0.75rem, 1.2vw, 0.9rem)',
              letterSpacing: '0.1em',
              color: fg,
              opacity: 0,
              maxWidth: '420px',
              margin: '0 auto',
              lineHeight: 1.7,
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
              fontSize: '0.45rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: fg,
              opacity: 0.25,
            }}
          >
            Explore
          </span>
          <div
            style={{
              width: '1px',
              height: '55px',
              background: `linear-gradient(to bottom, ${accent}88, transparent)`,
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
        {/* Background mesh */}
        <div className="mesh-bg" aria-hidden>
          <div className="mesh-orb" style={{ background: `radial-gradient(circle, ${accent}12 0%, transparent 60%)`, left: '40%', top: '20%' }} />
          <div className="mesh-orb" style={{ background: `radial-gradient(circle, ${accent}08 0%, transparent 55%)`, left: '60%', top: '50%' }} />
        </div>

        {/* Text content */}
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '480px' }}>
          <h2
            className="pin-perfume-name"
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(2.8rem, 7vw, 6rem)',
              fontWeight: 300,
              lineHeight: 0.92,
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
              fontSize: 'clamp(0.65rem, 1vw, 0.75rem)',
              letterSpacing: '0.15em',
              color: accent,
              textTransform: 'uppercase',
              marginBottom: '2.5rem',
              opacity: 0,
            }}
          >
            {season.tagline}
          </p>

          <p
            className="pin-desc"
            style={{
              fontSize: 'clamp(0.9rem, 1.3vw, 1rem)',
              lineHeight: 1.9,
              color: fg,
              opacity: 0,
              maxWidth: '400px',
              marginBottom: '3.5rem',
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
                marginBottom: '0.85rem',
                opacity: 0,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-inter), system-ui, sans-serif',
                  fontSize: '0.55rem',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: accent,
                  minWidth: '50px',
                  opacity: 0.6,
                }}
              >
                {layer}
              </span>
              <span
                style={{
                  fontSize: '0.85rem',
                  color: fg,
                  opacity: 0.55,
                  letterSpacing: '0.03em',
                }}
              >
                {season.notes[layer].join(' · ')}
              </span>
            </div>
          ))}
        </div>

        {/* Bottle with glow rings */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div
            className="pin-glow-ring-inner"
            style={{
              position: 'absolute',
              width: 'clamp(220px, 32vw, 380px)',
              height: 'clamp(220px, 32vw, 380px)',
              borderRadius: '50%',
              border: `1px solid ${accent}`,
              opacity: 0,
              boxShadow: `0 0 100px ${accent}22, inset 0 0 80px ${accent}11`,
              pointerEvents: 'none',
            }}
          />
          <div
            className="pin-glow-ring-outer"
            style={{
              position: 'absolute',
              width: 'clamp(320px, 45vw, 520px)',
              height: 'clamp(320px, 45vw, 520px)',
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
              width: 'clamp(160px, 22vw, 280px)',
              height: 'auto',
              opacity: 0,
              filter: `drop-shadow(0 50px 120px ${accent}55) drop-shadow(0 15px 40px rgba(0,0,0,0.3))`,
            }}
          />
        </div>
      </section>

      {/* ═══ Fragrance notes ═══ */}
      <section
        className="notes-section reveal-item"
        style={{
          padding: 'clamp(120px, 16vw, 220px) clamp(16px, 8vw, 120px)',
          borderTop: `1px solid ${accent}10`,
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
              fontSize: '0.55rem',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: accent,
              opacity: 0.55,
            }}
          >
            Fragrance Composition
          </p>
          <p
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(0.9rem, 1.3vw, 1.1rem)',
              fontStyle: 'italic',
              color: fg,
              opacity: 0.25,
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
              className="note-card gradient-border-card"
              style={{
                padding: '3.5rem 2.5rem',
                background: `linear-gradient(145deg, ${accent}0a 0%, ${accent}04 100%)`,
                position: 'relative',
                backdropFilter: 'blur(10px)',
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
                  background: `linear-gradient(to bottom, ${accent}88, transparent)`,
                }}
              />

              {/* Background number */}
              <span
                style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: '5rem',
                  fontWeight: 300,
                  color: accent,
                  opacity: 0.04,
                  position: 'absolute',
                  top: '0.5rem',
                  right: '1.5rem',
                  lineHeight: 1,
                }}
              >
                {String(idx + 1).padStart(2, '0')}
              </span>

              <p
                style={{
                  fontFamily: 'var(--font-inter), system-ui, sans-serif',
                  fontSize: '0.5rem',
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  color: accent,
                  marginBottom: '2rem',
                  opacity: 0.6,
                }}
              >
                {layer} notes
              </p>
              {season.notes[layer].map((note) => (
                <p
                  key={note}
                  style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)',
                    color: fg,
                    marginBottom: '0.6rem',
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
          padding: 'clamp(120px, 16vw, 220px) clamp(16px, 8vw, 120px)',
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
              height: '120px',
              background: `linear-gradient(to bottom, ${accent}, transparent)`,
              marginBottom: '2rem',
              transformOrigin: 'top',
            }}
          />
          <h2
            className="story-heading"
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 300,
              color: fg,
              lineHeight: 1.12,
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
              lineHeight: 2.1,
              color: fg,
              opacity: 0.65,
              marginBottom: '3rem',
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
              borderLeft: `2px solid ${accent}44`,
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
          padding: 'clamp(120px, 16vw, 220px) clamp(16px, 8vw, 120px)',
          borderTop: `1px solid ${accent}0d`,
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '0.55rem',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: accent,
            opacity: 0.55,
            marginBottom: '4rem',
          }}
        >
          Continue the Journey
        </p>

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
                  padding: 'clamp(2.5rem, 5vw, 4rem) 2rem',
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
                    fontSize: 'clamp(3.5rem, 7vw, 6rem)',
                    fontWeight: 300,
                    color: '#fff',
                    opacity: 0.04,
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
                    fontSize: '0.5rem',
                    letterSpacing: '0.35em',
                    textTransform: 'uppercase',
                    color: '#fff',
                    opacity: 0.45,
                    marginBottom: '0.75rem',
                  }}
                >
                  No. {s.number}
                </span>
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                    fontWeight: 300,
                    color: '#fff',
                    lineHeight: 0.95,
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
                    opacity: 0.55,
                    marginBottom: '1.2rem',
                  }}
                >
                  {s.perfume}
                </span>
                <div style={{ width: '28px', height: '1px', background: '#fff', opacity: 0.2, marginBottom: '1rem' }} />
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-inter), system-ui, sans-serif',
                    fontSize: '0.55rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#fff',
                    opacity: 0.35,
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
          borderTop: `1px solid ${accent}0d`,
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
            letterSpacing: '0.2em',
            color: fg,
            opacity: 0.35,
          }}
        >
          QUATRÉA
        </span>
        <span
          style={{
            fontFamily: 'var(--font-inter), system-ui, sans-serif',
            fontSize: '0.55rem',
            color: fg,
            opacity: 0.15,
          }}
        >
          © 2024 Quatréa. All rights reserved.
        </span>
      </footer>
    </div>
  )
}
