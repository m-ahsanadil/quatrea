interface PerfumeBottleProps {
  perfumeName: string
  seasonName: string
  accentColor: string
  className?: string
  style?: React.CSSProperties
}

export function PerfumeBottle({
  perfumeName,
  seasonName,
  accentColor,
  className,
  style,
}: PerfumeBottleProps) {
  const id = `bottle-${seasonName.toLowerCase()}`

  return (
    <svg
      viewBox="0 0 100 265"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`${perfumeName} perfume bottle`}
      className={className}
      style={{ color: accentColor, ...style }}
    >
      <defs>
        <linearGradient id={`${id}-body`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="currentColor" stopOpacity="0.08" />
          <stop offset="25%"  stopColor="currentColor" stopOpacity="0.35" />
          <stop offset="60%"  stopColor="currentColor" stopOpacity="0.40" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.10" />
        </linearGradient>
        <linearGradient id={`${id}-cap`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="currentColor" stopOpacity="1.0" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.65" />
        </linearGradient>
        <linearGradient id={`${id}-highlight`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="white" stopOpacity="0.12" />
          <stop offset="100%" stopColor="white" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* Cap */}
      <rect
        x="28" y="2" width="44" height="26" rx="4"
        fill={`url(#${id}-cap)`}
      />
      {/* Cap bevel line */}
      <line
        x1="28" y1="22" x2="72" y2="22"
        stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4"
      />

      {/* Collar ring */}
      <rect
        x="32" y="28" width="36" height="7" rx="2"
        fill="currentColor" fillOpacity="0.65"
      />

      {/* Neck */}
      <rect
        x="42" y="35" width="16" height="34"
        fill={`url(#${id}-body)`}
      />
      {/* Neck highlight */}
      <rect
        x="44" y="36" width="4" height="32" rx="1"
        fill={`url(#${id}-highlight)`}
      />

      {/* Shoulder curve */}
      <path
        d="M42 69 Q35 72 18 98 L82 98 Q65 72 58 69 Z"
        fill={`url(#${id}-body)`}
      />

      {/* Body */}
      <rect
        x="15" y="96" width="70" height="144" rx="4"
        fill={`url(#${id}-body)`}
      />
      {/* Body highlight strip */}
      <rect
        x="20" y="98" width="5" height="138" rx="2"
        fill={`url(#${id}-highlight)`}
      />

      {/* Label border */}
      <rect
        x="20" y="128" width="60" height="88" rx="2"
        fill="currentColor" fillOpacity="0.05"
        stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3"
      />

      {/* Brand name */}
      <text
        x="50" y="165"
        textAnchor="middle"
        fontSize="6.5"
        letterSpacing="3.5"
        fill="currentColor"
        fillOpacity="0.75"
        fontFamily="Georgia, serif"
      >
        QUATRÉA
      </text>

      {/* Divider */}
      <line
        x1="30" y1="171" x2="70" y2="171"
        stroke="currentColor" strokeWidth="0.3" strokeOpacity="0.3"
      />

      {/* Perfume name */}
      <text
        x="50" y="186"
        textAnchor="middle"
        fontSize="5"
        letterSpacing="2.5"
        fill="currentColor"
        fillOpacity="0.55"
        fontFamily="Georgia, serif"
      >
        {perfumeName.toUpperCase()}
      </text>

      {/* Season label */}
      <text
        x="50" y="200"
        textAnchor="middle"
        fontSize="3.5"
        letterSpacing="2"
        fill="currentColor"
        fillOpacity="0.35"
        fontFamily="Georgia, serif"
      >
        {seasonName.toUpperCase()}
      </text>

      {/* Base */}
      <rect
        x="17" y="240" width="66" height="20" rx="3"
        fill="currentColor" fillOpacity="0.3"
      />
      {/* Base reflection */}
      <line
        x1="22" y1="258" x2="78" y2="258"
        stroke="currentColor" strokeWidth="0.4" strokeOpacity="0.25"
      />
    </svg>
  )
}
