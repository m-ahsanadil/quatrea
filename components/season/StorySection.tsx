import type { Season } from '@/content/seasons'

export function StorySection({ season }: { season: Season }) {
  return (
    <section className="story section split">
      <div>
        <div aria-hidden className="story__line m-sy" />
        <h2 className="story__heading m-hide">The Story</h2>
      </div>

      <div>
        <p className="story__body m-hide">{season.story}</p>
        <blockquote className="story__craft m-hide">{season.craft}</blockquote>
      </div>
    </section>
  )
}
