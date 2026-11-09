interface DividerProps {
  color?: string
  style?: React.CSSProperties
}

export function Divider({ color = '#C9A86C', style }: DividerProps) {
  return (
    <div aria-hidden className="divider" style={style}>
      <span className="divider-rule" style={{ background: `linear-gradient(to right, transparent, ${color})` }} />
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="0" width="8.49" height="8.49" rx="1" transform="rotate(45 6 0)" fill={color} fillOpacity="0.3" stroke={color} strokeOpacity="0.5" strokeWidth="0.5" />
      </svg>
      <span className="divider-rule" style={{ background: `linear-gradient(to left, transparent, ${color})` }} />
    </div>
  )
}
