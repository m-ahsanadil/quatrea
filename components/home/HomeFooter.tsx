import Link from 'next/link'
import { COPYRIGHT } from '@/content/site'
import { HOME_FOOTER } from '@/content/home'
import { SEASONS, SEASON_KEYS } from '@/content/seasons'

export function HomeFooter() {
  return (
    <footer className="home-footer">
      <div className="home-footer__grid footer-grid">
        <div>
          <span className="home-footer__brand gold-text">QUATRÉA</span>
          <p className="home-footer__blurb">{HOME_FOOTER.blurb}</p>
        </div>

        <div>
          <h2 className="home-footer__heading eyebrow">Collection</h2>
          <ul className="home-footer__list">
            {SEASON_KEYS.map((key) => (
              <li key={key}>
                <Link href={`/${key}`} className="home-footer__perfume link-muted">
                  {SEASONS[key].perfume}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="home-footer__heading eyebrow">Explore</h2>
          <ul className="home-footer__list">
            {HOME_FOOTER.exploreLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="home-footer__link link-muted">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="home-footer__bottom">
        <span>{COPYRIGHT}</span>
        <span className="home-footer__cities">{HOME_FOOTER.cities}</span>
      </div>
    </footer>
  )
}
