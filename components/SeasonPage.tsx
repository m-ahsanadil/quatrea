'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { PerfumeBottle } from './PerfumeBottle'
import { FloatingParticles } from './FloatingParticles'
import { MeshBackground } from './MeshBackground'
import { Divider } from './Divider'
import { SEASONS, SEASON_KEYS, type SeasonKey } from '@/lib/seasons'
import { DIST, DUR, EASE, SCALE_IN, STAGGER, useMotion } from '@/lib/motion'

interface SeasonPageProps {
  seasonKey: SeasonKey
}

const LAYERS = ['top', 'heart', 'base'] as const

export function SeasonPage({ seasonKey }: SeasonPageProps) {
  const season = SEASONS[seasonKey]
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLElement>(null)

  const otherSeasons = SEASON_KEYS.filter((k) => k !== seasonKey)
  const { bg, fg, accent, accentText } = season.colors

  useMotion(
    containerRef,
    (gsap, { full }) => {
      /* ── Hero entrance (all tiers) ── */
      gsap
        .timeline({ delay: 0.2 })
        .fromTo('.hero-line-top', { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: EASE.soft })
        .fromTo('.hero-number', { opacity: 0, y: DIST.sm }, { opacity: 1, y: 0, duration: DUR.reveal, ease: EASE.soft }, '-=0.4')
        .fromTo(
          '.hero-title-wrap',
          { opacity: 0, y: DIST.lg, scale: SCALE_IN },
          { opacity: 1, y: 0, scale: 1, duration: DUR.story * 1.2, ease: EASE.cinematic },
          '-=0.5',
        )
        .fromTo('.hero-tagline-text', { opacity: 0, y: DIST.md }, { opacity: 1, y: 0, duration: DUR.reveal, ease: EASE.out }, '-=0.9')
        .fromTo('.hero-scroll-cue', { opacity: 0 }, { opacity: 1, duration: DUR.reveal }, '-=0.5')

      gsap.to('.hero-mesh', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
      })

      /* ── Bottle reveal: pinned and scrubbed on desktop, simple reveals on phones ── */
      if (full) {
        gsap
          .timeline({
            defaults: { ease: EASE.soft },
            scrollTrigger: {
              trigger: pinRef.current,
              start: 'top top',
              end: '+=250%',
              pin: true,
              scrub: 1.4,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })
          .fromTo('.pin-ring-inner', { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.8 }, 0)
          .fromTo('.pin-ring-outer', { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 1 }, 0.1)
          .fromTo('.pin-bottle', { opacity: 0, scale: 0.6, y: DIST.lg * 2, rotation: -6 }, { opacity: 1, scale: 1, y: 0, rotation: 0, duration: 1.3 }, 0.1)
          .fromTo('.pin-perfume-name', { opacity: 0, y: DIST.lg, clipPath: 'inset(0 0 100% 0)' }, { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.9 }, 0.4)
          .fromTo('.pin-tagline', { opacity: 0, y: DIST.md }, { opacity: 1, y: 0, duration: 0.5 }, 0.6)
          .fromTo('.pin-desc', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.75)
          .fromTo('.pin-note', { opacity: 0, x: -DIST.lg }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.1 }, 0.9)
          .to('.pin-bottle', { rotation: 3, scale: 1.06, duration: 0.8, ease: EASE.inOut }, 1.4)
          .to('.pin-ring-inner', { scale: 1.3, opacity: 0.34, duration: 0.6 }, 1.4)
          .to('.pin-ring-outer', { scale: 1.4, opacity: 0.4, duration: 0.6 }, 1.4)
      } else {
        gsap.fromTo(
          ['.pin-ring-inner', '.pin-ring-outer', '.pin-bottle'],
          { opacity: 0, y: DIST.md },
          {
            opacity: 1, y: 0, duration: DUR.reveal, ease: EASE.out, stagger: STAGGER.card,
            scrollTrigger: { trigger: '.pin-visual', start: 'top 85%', once: true },
          },
        )
        gsap.fromTo(
          ['.pin-perfume-name', '.pin-tagline', '.pin-desc', '.pin-note'],
          { opacity: 0, y: DIST.md },
          {
            opacity: 1, y: 0, duration: DUR.reveal, ease: EASE.out, stagger: STAGGER.tight,
            scrollTrigger: { trigger: '.pin-copy', start: 'top 85%', once: true },
          },
        )
      }

      /* ── Notes grid ── */
      gsap.fromTo('.note-card', { opacity: 0, y: DIST.lg, scale: SCALE_IN }, {
        opacity: 1, y: 0, scale: 1, duration: DUR.story, stagger: STAGGER.card, ease: EASE.out,
        scrollTrigger: { trigger: '.notes-section', start: 'top 75%', once: true },
      })

      /* ── Story ── */
      const storyTrigger = { trigger: '.story-section', start: 'top 76%', once: true }
      gsap.fromTo('.story-line', { scaleY: 0 }, { scaleY: 1, duration: DUR.story, ease: EASE.soft, transformOrigin: 'top', scrollTrigger: storyTrigger })
      gsap.fromTo('.story-heading', { opacity: 0, y: DIST.md }, { opacity: 1, y: 0, duration: DUR.story, ease: EASE.out, scrollTrigger: storyTrigger })
      gsap.fromTo('.story-body', { opacity: 0, y: DIST.md }, { opacity: 1, y: 0, duration: DUR.reveal, ease: EASE.soft, delay: 0.15, scrollTrigger: storyTrigger })
      gsap.fromTo('.craft-text', { opacity: 0, x: -DIST.sm }, {
        opacity: 1, x: 0, duration: DUR.reveal, ease: EASE.soft,
        scrollTrigger: { trigger: '.craft-text', start: 'top 88%', once: true },
      })

      /* ── Other seasons ── */
      gsap.fromTo('.other-season-card', { opacity: 0, y: DIST.lg, scale: SCALE_IN }, {
        opacity: 1, y: 0, scale: 1, duration: DUR.reveal, stagger: STAGGER.card, ease: EASE.out,
        scrollTrigger: { trigger: '.other-seasons', start: 'top 80%', once: true },
      })
    },
    [seasonKey],
  )

  return (
    <div
      ref={containerRef}
      className="screen"
      style={{
        backgroundColor: bg,
        color: fg,
        ['--accent-text' as string]: accentText,
        ['--focus' as string]: accentText,
      }}
    >
      {/* ═══ Hero ═══ */}
      <section
        ref={heroRef}
        className="screen"
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
            { background: `radial-gradient(circle, ${accent}1a 0%, transparent 65%)` },
            { background: `radial-gradient(circle, ${accent}0d 0%, transparent 55%)` },
            { background: `radial-gradient(circle, ${accent}10 0%, transparent 60%)` },
          ]}
        />

        <FloatingParticles color={accent} count={14} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '950px', width: '100%' }}>
          <div
            className="hero-line-top m-sx"
            style={{
              width: '80px',
              height: '1px',
              background: `linear-gradient(to right, transparent, ${accent}, transparent)`,
              margin: '0 auto 2.5rem',
              transformOrigin: 'center',
            }}
          />

          <p className="hero-number eyebrow m-hide" style={{ letterSpacing: '0.45em', marginBottom: '2rem' }}>
            No. {season.number} — {season.name}
          </p>

          <div className="hero-title-wrap m-hide">
            <h1
              style={{
                fontSize: 'clamp(3rem, 13.5vw, 15rem)',
                fontWeight: 300,
                letterSpacing: '-0.05em',
                lineHeight: 0.9,
                color: fg,
              }}
            >
              {season.perfume}
            </h1>
          </div>

          <Divider color={accent} style={{ margin: '1.5rem auto' }} />

          <p
            className="hero-tagline-text m-hide"
            style={{
              fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)',
              letterSpacing: '0.1em',
              color: fg,
              maxWidth: '420px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            {season.tagline}
          </p>
        </div>

        <div
          className="hero-scroll-cue m-hide"
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
          <span className="eyebrow" style={{ fontSize: '0.68rem', letterSpacing: '0.35em', color: fg, opacity: 0.6 }}>
            Explore
          </span>
          <div
            className="scroll-cue-line"
            style={{ width: '1px', height: '55px', background: `linear-gradient(to bottom, ${accent}, transparent)` }}
          />
        </div>
      </section>

      {/* ═══ Bottle reveal ═══ */}
      <section
        ref={pinRef}
        className="screen pin-grid"
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        <MeshBackground
          orbs={[
            { background: `radial-gradient(circle, ${accent}12 0%, transparent 60%)`, left: '40%', top: '20%' },
            { background: `radial-gradient(circle, ${accent}08 0%, transparent 55%)`, left: '60%', top: '50%' },
          ]}
        />

        <div className="pin-copy" style={{ position: 'relative', zIndex: 1, maxWidth: '480px' }}>
          <h2
            className="pin-perfume-name m-hide"
            style={{
              fontSize: 'clamp(2.8rem, 7vw, 6rem)',
              fontWeight: 300,
              lineHeight: 0.95,
              color: fg,
              marginBottom: '1.2rem',
            }}
          >
            {season.perfume}
          </h2>

          <p className="pin-tagline eyebrow m-hide" style={{ letterSpacing: '0.15em', marginBottom: '2.5rem' }}>
            {season.tagline}
          </p>

          <p
            className="pin-desc m-hide"
            style={{
              fontSize: 'clamp(0.95rem, 1.3vw, 1.05rem)',
              lineHeight: 1.9,
              color: `color-mix(in srgb, ${fg} 82%, transparent)`,
              maxWidth: '420px',
              marginBottom: '3rem',
            }}
          >
            {season.description}
          </p>

          {LAYERS.map((layer) => (
            <div
              key={layer}
              className="pin-note m-hide"
              style={{ display: 'flex', gap: '1rem', alignItems: 'baseline', marginBottom: '0.85rem' }}
            >
              <span className="eyebrow" style={{ letterSpacing: '0.24em', minWidth: '64px' }}>
                {layer}
              </span>
              <span style={{ fontSize: '0.9rem', color: fg, opacity: 0.78, letterSpacing: '0.03em' }}>
                {season.notes[layer].join(' · ')}
              </span>
            </div>
          ))}
        </div>

        <div
          className="pin-visual"
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', zIndex: 1 }}
        >
          <div
            className="pin-ring-inner m-hide decor"
            aria-hidden
            style={{
              position: 'absolute',
              width: 'clamp(220px, 32vw, 380px)',
              height: 'clamp(220px, 32vw, 380px)',
              borderRadius: '50%',
              border: `1px solid ${accent}59`,
              background: `radial-gradient(circle, ${accent}26 0%, transparent 70%)`,
              boxShadow: `inset 0 0 80px ${accent}11`,
            }}
          />
          <div
            className="pin-ring-outer m-hide decor"
            aria-hidden
            style={{
              position: 'absolute',
              width: 'clamp(300px, 45vw, 520px)',
              height: 'clamp(300px, 45vw, 520px)',
              borderRadius: '50%',
              border: `1px solid ${accent}26`,
            }}
          />

          <PerfumeBottle
            perfumeName={season.perfume}
            seasonName={season.name}
            accentColor={accent}
            className="pin-bottle m-hide"
            style={{
              width: 'clamp(150px, 22vw, 280px)',
              height: 'auto',
              position: 'relative',
              filter: `drop-shadow(0 24px 48px ${accent}40)`,
            }}
          />
        </div>
      </section>

      {/* ═══ Fragrance notes ═══ */}
      <section className="notes-section section" style={{ borderTop: `1px solid ${accent}1a` }}>
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
          <h2 className="eyebrow" style={{ fontWeight: 400, letterSpacing: '0.32em' }}>
            Fragrance Composition
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
              fontStyle: 'italic',
              color: fg,
              opacity: 0.65,
            }}
          >
            Three layers, one story
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))', gap: '4px' }}>
          {LAYERS.map((layer, idx) => (
            <div
              key={layer}
              className="note-card m-hide gradient-border-card"
              style={{
                padding: '3.5rem 2.5rem',
                background: `linear-gradient(145deg, ${accent}0f 0%, ${accent}06 100%)`,
              }}
            >
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '2px',
                  height: '100%',
                  background: `linear-gradient(to bottom, ${accent}, transparent)`,
                  opacity: 0.55,
                }}
              />
              <span
                aria-hidden
                style={{
                  fontFamily: 'var(--font-cormorant), Georgia, serif',
                  fontSize: '5rem',
                  fontWeight: 300,
                  color: accent,
                  opacity: 0.08,
                  position: 'absolute',
                  top: '0.5rem',
                  right: '1.5rem',
                  lineHeight: 1,
                }}
              >
                {String(idx + 1).padStart(2, '0')}
              </span>

              <h3 className="eyebrow" style={{ fontWeight: 400, marginBottom: '2rem', letterSpacing: '0.28em' }}>
                {layer} notes
              </h3>
              {season.notes[layer].map((note) => (
                <p
                  key={note}
                  style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: 'clamp(1.25rem, 2.2vw, 1.6rem)',
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
      <section className="story-section section split" style={{ position: 'relative' }}>
        <div>
          <div
            className="story-line m-sy"
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
            className="story-heading m-hide"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: fg, lineHeight: 1.12 }}
          >
            The Story
          </h2>
        </div>

        <div>
          <p
            className="story-body m-hide"
            style={{
              fontSize: 'clamp(1rem, 1.4vw, 1.08rem)',
              lineHeight: 2,
              color: fg,
              opacity: 0.82,
              marginBottom: '3rem',
            }}
          >
            {season.story}
          </p>
          <blockquote
            className="craft-text m-hide"
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)',
              fontStyle: 'italic',
              lineHeight: 1.8,
              color: accentText,
              paddingLeft: '1.5rem',
              borderLeft: `2px solid ${accent}66`,
            }}
          >
            {season.craft}
          </blockquote>
        </div>
      </section>

      {/* ═══ Other seasons ═══ */}
      <section className="other-seasons section" style={{ borderTop: `1px solid ${accent}1a` }}>
        <h2 className="eyebrow" style={{ fontWeight: 400, marginBottom: '4rem' }}>
          Continue the Journey
        </h2>

        <div className="grid-3">
          {otherSeasons.map((k) => {
            const s = SEASONS[k]
            return (
              <Link
                key={k}
                href={`/${k}`}
                className="other-season-card m-hide luxury-card"
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
                  aria-hidden
                  style={{
                    position: 'absolute',
                    top: '0.5rem',
                    right: '1rem',
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: 'clamp(3.5rem, 7vw, 6rem)',
                    fontWeight: 300,
                    color: '#fff',
                    opacity: 0.08,
                    lineHeight: 1,
                  }}
                >
                  {s.number}
                </span>

                <span className="eyebrow" style={{ display: 'block', color: '#fff', opacity: 0.75, marginBottom: '0.75rem', letterSpacing: '0.3em' }}>
                  No. {s.number}
                </span>
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: 'clamp(2rem, 3.5vw, 2.5rem)',
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
                    fontSize: 'clamp(1rem, 1.4vw, 1.1rem)',
                    fontStyle: 'italic',
                    color: '#fff',
                    opacity: 0.85,
                    marginBottom: '1.2rem',
                  }}
                >
                  {s.perfume}
                </span>
                <span aria-hidden style={{ display: 'block', width: '28px', height: '1px', background: '#fff', opacity: 0.35, marginBottom: '1rem' }} />
                <span className="eyebrow" style={{ display: 'block', color: '#fff', opacity: 0.75, letterSpacing: '0.2em' }}>
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
          padding: 'clamp(50px, 7vw, 80px) var(--gutter)',
          borderTop: `1px solid ${accent}1a`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <span style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '1.4rem', letterSpacing: '0.2em', color: fg, opacity: 0.7 }}>
          QUATRÉA
        </span>
        <span style={{ fontSize: '0.75rem', color: fg, opacity: 0.6 }}>© 2026 Quatréa. All rights reserved.</span>
      </footer>
    </div>
  )
}
