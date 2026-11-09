import { COPYRIGHT } from '@/content/site'

interface SimpleFooterProps {
  /** Text colour; the footer fades it to its own opacities. */
  color: string
  borderColor: string
}

export function SimpleFooter({ color, borderColor }: SimpleFooterProps) {
  return (
    <footer className="simple-footer" style={{ color, borderTopColor: borderColor }}>
      <span className="simple-footer__brand">QUATRÉA</span>
      <span className="simple-footer__legal">{COPYRIGHT}</span>
    </footer>
  )
}
