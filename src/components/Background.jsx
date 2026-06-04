const PETAL_COLORS = ['#f6c9dd', '#cbe3a8', '#fbe6b0', '#d9f0ee', '#f0e0f6', '#ffffff']

// Generated once at module load — stable random positions for petals
const PETALS = Array.from({ length: 18 }, (_, i) => {
  const size = 7 + Math.random() * 9
  return {
    key: i,
    style: {
      left: `${Math.random() * 100}%`,
      width: `${size}px`,
      height: `${size * 0.75}px`,
      background: PETAL_COLORS[i % PETAL_COLORS.length],
      animationDuration: `${12 + Math.random() * 14}s`,
      animationDelay: `${-Math.random() * 16}s`,
      '--drift': `${(Math.random() - 0.5) * 140}px`,
    },
  }
})

export default function Background() {
  return (
    <>
      <div className="glow g1" />
      <div className="glow g2" />
      <div className="glow g3" />
      <div className="glow g4" />

      <svg className="sprig tl" viewBox="0 0 240 240" fill="none" aria-hidden="true">
        <g stroke="#7c9a64" strokeWidth="2.2" strokeLinecap="round">
          <path d="M2 4 C 48 26 78 58 96 104 M2 4 C 30 44 40 86 44 132" />
        </g>
        <g fill="#a7ca87">
          <ellipse cx="40" cy="40" rx="22" ry="9" transform="rotate(28 40 40)" />
          <ellipse cx="74" cy="64" rx="20" ry="8.5" transform="rotate(40 74 64)" />
          <ellipse cx="30" cy="78" rx="19" ry="8" transform="rotate(72 30 78)" />
          <ellipse cx="96" cy="98" rx="18" ry="8" transform="rotate(50 96 98)" />
          <ellipse cx="44" cy="120" rx="17" ry="7.5" transform="rotate(86 44 120)" />
        </g>
        <g fill="#f4c6da">
          <circle cx="100" cy="106" r="6.5" /><circle cx="46" cy="138" r="6" />
        </g>
        <circle cx="100" cy="106" r="2.6" fill="#cf6e98" />
        <circle cx="46" cy="138" r="2.4" fill="#cf6e98" />
      </svg>

      <svg className="sprig tr" viewBox="0 0 240 240" fill="none" aria-hidden="true">
        <g stroke="#7c9a64" strokeWidth="2.2" strokeLinecap="round">
          <path d="M2 4 C 48 26 78 58 96 104 M2 4 C 30 44 40 86 44 132" />
        </g>
        <g fill="#bcd79e">
          <ellipse cx="40" cy="40" rx="22" ry="9" transform="rotate(28 40 40)" />
          <ellipse cx="74" cy="64" rx="20" ry="8.5" transform="rotate(40 74 64)" />
          <ellipse cx="30" cy="78" rx="19" ry="8" transform="rotate(72 30 78)" />
        </g>
        <circle cx="100" cy="106" r="6.5" fill="#fbe4b8" />
        <circle cx="100" cy="106" r="2.6" fill="#cba24e" />
      </svg>

      <svg className="sprig bl" viewBox="0 0 240 240" fill="none" aria-hidden="true">
        <g stroke="#7c9a64" strokeWidth="2.2" strokeLinecap="round">
          <path d="M2 4 C 48 26 78 58 96 104 M2 4 C 30 44 40 86 44 132" />
        </g>
        <g fill="#a7ca87">
          <ellipse cx="40" cy="40" rx="22" ry="9" transform="rotate(28 40 40)" />
          <ellipse cx="74" cy="64" rx="20" ry="8.5" transform="rotate(40 74 64)" />
          <ellipse cx="30" cy="78" rx="19" ry="8" transform="rotate(72 30 78)" />
          <ellipse cx="96" cy="98" rx="18" ry="8" transform="rotate(50 96 98)" />
        </g>
        <circle cx="100" cy="106" r="6.5" fill="#f4c6da" />
        <circle cx="100" cy="106" r="2.6" fill="#cf6e98" />
      </svg>

      <svg className="sprig br" viewBox="0 0 240 240" fill="none" aria-hidden="true">
        <g stroke="#7c9a64" strokeWidth="2.2" strokeLinecap="round">
          <path d="M2 4 C 48 26 78 58 96 104 M2 4 C 30 44 40 86 44 132" />
        </g>
        <g fill="#bcd79e">
          <ellipse cx="40" cy="40" rx="22" ry="9" transform="rotate(28 40 40)" />
          <ellipse cx="74" cy="64" rx="20" ry="8.5" transform="rotate(40 74 64)" />
          <ellipse cx="30" cy="78" rx="19" ry="8" transform="rotate(72 30 78)" />
          <ellipse cx="96" cy="98" rx="18" ry="8" transform="rotate(50 96 98)" />
          <ellipse cx="44" cy="120" rx="17" ry="7.5" transform="rotate(86 44 120)" />
        </g>
        <g fill="#f4c6da">
          <circle cx="100" cy="106" r="6.5" /><circle cx="46" cy="138" r="6" />
        </g>
        <circle cx="100" cy="106" r="2.6" fill="#cf6e98" />
        <circle cx="46" cy="138" r="2.4" fill="#cf6e98" />
      </svg>

      <div className="petals">
        {PETALS.map(p => <div key={p.key} className="petal" style={p.style} />)}
      </div>
    </>
  )
}
