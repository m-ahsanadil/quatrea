import type { Season } from '@/content/seasons'
import { FloatingParticles } from '@/components/ambient/FloatingParticles'
import { MeshBackground } from '@/components/ambient/MeshBackground'
import { Divider } from '@/components/ui/Divider'

export function SeasonHero({ season }: { season: Season }) {
  const { accent } = season.colors

  return (
    <section className="season-hero screen">
      <MeshBackground
        className="hero-mesh"
        orbs={[
          { background: `radial-gradient(circle, ${accent}1a 0%, transparent 65%)` },
          { background: `radial-gradient(circle, ${accent}0d 0%, transparent 55%)` },
          { background: `radial-gradient(circle, ${accent}10 0%, transparent 60%)` },
        ]}
      />
      <FloatingParticles color={accent} count={14} />

      <div className="season-hero__inner">
        <div className="season-hero__line m-sx" />
        <p className="season-hero__number eyebrow m-hide">
          No. {season.number} — {season.name}
        </p>
        <h1 className="season-hero__title m-hide">{season.perfume}</h1>
        <Divider color={accent} style={{ margin: '1.5rem auto' }} />
        <p className="season-hero__tagline m-hide">{season.tagline}</p>
      </div>

      <div aria-hidden className="scroll-cue m-hide">
        <span className="eyebrow scroll-cue__label">Explore</span>
        <span className="scroll-cue__line scroll-cue-line" style={{ ['--cue-color' as string]: accent }} />
      </div>
    </section>
  )
}
