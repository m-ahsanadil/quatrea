import type { Season } from '@/content/seasons'
import { MeshBackground } from '@/components/ambient/MeshBackground'
import { PerfumeBottle } from '@/components/ui/PerfumeBottle'

const LAYERS = ['top', 'heart', 'base'] as const

export function BottleReveal({ season }: { season: Season }) {
  const { accent } = season.colors

  return (
    <section className="pin-section pin-grid screen">
      <MeshBackground
        orbs={[
          { background: `radial-gradient(circle, ${accent}12 0%, transparent 60%)`, left: '40%', top: '20%' },
          { background: `radial-gradient(circle, ${accent}08 0%, transparent 55%)`, left: '60%', top: '50%' },
        ]}
      />

      <div className="pin-copy">
        <h2 className="pin-name m-hide">{season.perfume}</h2>
        <p className="pin-tagline eyebrow m-hide">{season.tagline}</p>
        <p className="pin-desc m-hide">{season.description}</p>

        {LAYERS.map((layer) => (
          <div key={layer} className="pin-note m-hide">
            <span className="pin-note__layer eyebrow">{layer}</span>
            <span className="pin-note__values">{season.notes[layer].join(' · ')}</span>
          </div>
        ))}
      </div>

      <div className="pin-visual">
        <div aria-hidden className="pin-ring pin-ring--inner m-hide decor" />
        <div aria-hidden className="pin-ring pin-ring--outer m-hide decor" />
        <PerfumeBottle
          perfumeName={season.perfume}
          seasonName={season.name}
          accentColor={accent}
          className="pin-bottle m-hide"
        />
      </div>
    </section>
  )
}
