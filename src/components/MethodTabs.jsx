const TABS = [
  {
    id: 'lots',
    label: 'Rút thăm',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="8" width="11" height="14" rx="2" transform="rotate(-9 8.5 15)" />
        <rect x="10" y="6" width="11" height="14" rx="2" transform="rotate(9 15.5 13)" />
      </svg>
    ),
  },
  {
    id: 'box',
    label: 'Đập hộp bí ẩn',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="9" width="18" height="12" rx="1.5" />
        <path d="M3 13h18" />
        <path d="M12 9v12" />
        <path d="M12 9s-1.2-5-4-5-2 4 4 5z" />
        <path d="M12 9s1.2-5 4-5 2 4-4 5z" />
      </svg>
    ),
  },
  {
    id: 'wheel',
    label: 'Vòng quay',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" />
      </svg>
    ),
  },
]

export default function MethodTabs({ method, onChange }) {
  return (
    <nav className="methods">
      {TABS.map(tab => (
        <button
          key={tab.id}
          className={`method${method === tab.id ? ' on' : ''}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </nav>
  )
}
