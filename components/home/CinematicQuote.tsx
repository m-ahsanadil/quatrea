import { QUOTE } from '@/content/home'

export function CinematicQuote() {
  return (
    <section className="quote">
      <div aria-hidden className="quote__halo decor" />
      <div className="quote__inner">
        <div className="quote__rule m-sx" />
        <blockquote className="quote__text m-hide">{QUOTE.text}</blockquote>
        <div className="quote__rule quote__rule--end m-sx" />
        <p className="quote__attribution eyebrow m-hide">{QUOTE.attribution}</p>
      </div>
    </section>
  )
}
