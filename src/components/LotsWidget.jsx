import { useRef, useEffect, useCallback } from 'react'
import { TEACHINGS } from '../data/teachings'

const N = TEACHINGS.length
const LOTS = 9
const SPREAD = 56

export default function LotsWidget({ active, onReveal, closeKey }) {
  const fanRef = useRef(null)
  const busyRef = useRef(false)

  const pickLot = useCallback((card) => {
    if (busyRef.current) return
    busyRef.current = true
    const i = Math.floor(Math.random() * N)
    Array.from(fanRef.current.children).forEach(c => {
      if (c !== card) c.classList.add('dim')
    })
    card.classList.add('picked')
    card.style.transform = 'translateY(-96px) scale(1.12)'
    setTimeout(() => onReveal(i), 620)
  }, [onReveal])

  const buildFan = useCallback(() => {
    const fan = fanRef.current
    if (!fan) return
    fan.innerHTML = ''
    busyRef.current = false
    for (let k = 0; k < LOTS; k++) {
      const t = k / (LOTS - 1)
      const ang = -SPREAD / 2 + SPREAD * t
      const lift = -Math.cos((t - 0.5) * Math.PI) * 18
      const card = document.createElement('div')
      card.className = 'lot'
      card.style.transform = `rotate(${ang}deg) translateY(${lift}px)`
      card.addEventListener('click', () => pickLot(card))
      fan.appendChild(card)
    }
  }, [pickLot])

  // Build fan on mount
  useEffect(() => { buildFan() }, [buildFan])

  // Rebuild fan when modal closes
  useEffect(() => {
    if (closeKey > 0) buildFan()
  }, [closeKey, buildFan])

  return (
    <section className={`widget${active ? ' on' : ''}`}>
      <div className="fan" ref={fanRef} />
      <p className="hint">Thành tâm rút một lá thăm để nhận giáo huấn của Mẹ</p>
    </section>
  )
}
