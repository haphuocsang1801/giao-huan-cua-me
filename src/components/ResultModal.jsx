import { useRef, useEffect } from 'react'
import { TEACHINGS } from '../data/teachings'

const N = TEACHINGS.length
const BURST_COLORS = ['#f7cfe0', '#fbe3c0', '#cbe3a8', '#ffffff', '#f3d6e6', '#bfe0e6']
const PETAL_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315]

function fireBurst(burstEl) {
  if (!burstEl) return
  burstEl.innerHTML = ''
  for (let i = 0; i < 22; i++) {
    const p = document.createElement('span')
    p.className = 'bp'
    const ang = Math.random() * Math.PI * 2
    const dist = 80 + Math.random() * 150
    const dx = Math.cos(ang) * dist
    const dy = Math.sin(ang) * dist * 0.7 + 40
    const s = 8 + Math.random() * 10
    p.style.width = s + 'px'
    p.style.height = (s * 0.8) + 'px'
    p.style.background = BURST_COLORS[i % BURST_COLORS.length]
    p.animate(
      [
        { transform: 'translate(-50%,-50%) scale(.3) rotate(0)', opacity: 1 },
        { transform: `translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(1) rotate(${Math.random() * 540 - 270}deg)`, opacity: 0 },
      ],
      { duration: 1100 + Math.random() * 500, easing: 'cubic-bezier(.18,.7,.3,1)', fill: 'forwards' }
    )
    burstEl.appendChild(p)
  }
}

export default function ResultModal({ index, onClose, onAgain }) {
  const burstRef = useRef(null)

  useEffect(() => { fireBurst(burstRef.current) }, [index])

  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mText"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="modal-card">
        <div className="burst" ref={burstRef} />

        <div className="m-garland">
          <span className="h">&#10084;</span> &#10047; <span className="h">&#10084;</span>
        </div>

        <div className="m-eyebrow">
          Giáo huấn của <b>Mẹ</b> · số <b>{index + 1}</b> / {N}
        </div>

        <div className="m-flower">
          <svg viewBox="0 0 100 100" aria-hidden="true">
            <g>
              {PETAL_ANGLES.map((angle, i) => (
                <ellipse key={i} cx="50" cy="22" rx="12" ry="20"
                  fill={i % 2 === 0 ? '#f6b3d1' : '#f4a6c9'}
                  transform={`rotate(${angle} 50 50)`}
                />
              ))}
            </g>
            <circle cx="50" cy="50" r="21" fill="#ffe49a" stroke="#fff" strokeWidth="2.5" />
          </svg>
          <span className="m-num">{index + 1}</span>
        </div>

        <p className="m-teaching" id="mText">{TEACHINGS[index]}</p>

        <div className="m-rule" />
        <div className="m-sign">
          Cảm tạ Cha Mẹ <span className="h">&#10084;</span>
        </div>

        <div className="m-actions">
          <button className="btn btn-primary" onClick={onAgain}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
              <path d="M21 3v5h-5" />
              <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
              <path d="M3 21v-5h5" />
            </svg>
            Rút lần nữa
          </button>
          <button className="btn btn-ghost" onClick={onClose}>Đóng lại</button>
        </div>
      </div>
    </div>
  )
}
