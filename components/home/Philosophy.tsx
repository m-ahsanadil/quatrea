import Link from 'next/link'
import { PHILOSOPHY } from '@/content/home'
import { MeshBackground } from '@/components/ambient/MeshBackground'

export function Philosophy() {
  const [lead, accent] = PHILOSOPHY.heading

  return (
    <section className="philosophy">
      <MeshBackground
        orbs={[
          { background: 'radial-gradient(circle, rgba(201,168,108,0.06) 0%, transparent 60%)' },
          { background: 'radial-gradient(circle, rgba(201,168,108,0.04) 0%, transparent 55%)' },
        ]}
      />

      <div className="philosophy__grid split">
        <div>
          <div aria-hidden className="philosophy__rule m-sx" />
          <h2 className="philosophy__heading m-hide">
            {lead}
            <br />
            <em>{accent}</em>
          </h2>
        </div>

        <div>
          <p className="philosophy__text m-hide">{PHILOSOPHY.body}</p>
          <Link href={PHILOSOPHY.cta.href} className="text-link m-hide">
            {PHILOSOPHY.cta.label}
            <span aria-hidden className="text-link-arrow">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
