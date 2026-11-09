import Link from 'next/link'
import { HERO } from '@/content/home'
import { FloatingParticles } from '@/components/ambient/FloatingParticles'
import { MeshBackground } from '@/components/ambient/MeshBackground'
import { Divider } from '@/components/ui/Divider'

export function Hero() {
  return (
    <section className="hero screen">
      <MeshBackground
        className="hero-mesh"
        orbs={[
          { background: 'radial-gradient(circle, rgba(201,168,108,0.12) 0%, transparent 70%)' },
          { background: 'radial-gradient(circle, rgba(201,168,108,0.06) 0%, transparent 60%)' },
          { background: 'radial-gradient(circle, rgba(180,150,90,0.08) 0%, transparent 65%)' },
        ]}
      />
      <FloatingParticles color="#C9A86C" count={18} />

      <div className="hero__content">
        <div className="hero__ornament m-sx" />
        <p className="hero__eyebrow eyebrow m-hide">{HERO.eyebrow}</p>

        {/* The letters animate individually; the label keeps one readable name. */}
        <h1 aria-label={HERO.accessibleName} className="hero__wordmark wordmark">
          {HERO.wordmark.split('').map((char, index) => (
            <span key={index} aria-hidden className="hero__letter m-hide">
              {char}
            </span>
          ))}
        </h1>

        <div className="hero__divider m-hide">
          <Divider />
        </div>

        <p className="hero__tagline m-hide">{HERO.tagline.join('  ·  ')}</p>

        <div className="hero__cta m-hide">
          <Link href={HERO.cta.href} className="btn-gold">
            {HERO.cta.label}
          </Link>
        </div>
      </div>

      <div aria-hidden className="scroll-cue">
        <span className="eyebrow scroll-cue__label">{HERO.scrollCue}</span>
        <span className="scroll-cue__line m-sy" />
      </div>
    </section>
  )
}
