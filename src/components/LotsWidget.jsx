import { useRef, useEffect, useCallback } from 'react'
import { TEACHINGS } from '../data/teachings'

const N = TEACHINGS.length
const LOTS = N          // one card per teaching

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
    const baseX = parseFloat(card.dataset.baseX) || 0
    card.style.transform = `translateX(${baseX}px) translateY(-80px) scale(1.12)`
    setTimeout(() => onReveal(i), 620)
  }, [onReveal])

  const buildFan = useCallback(() => {
    const fan = fanRef.current
    if (!fan) return
    fan.innerHTML = ''
    busyRef.current = false
    const W = fan.offsetWidth || 460
    const cardW = W <= 430 ? 66 : 80
    const step = (W - cardW) / (LOTS - 1)
    const startX = -(W - cardW) / 2
    for (let k = 0; k < LOTS; k++) {
      const x = startX + k * step
      const card = document.createElement('div')
      card.className = 'lot'
      card.dataset.baseX = x
      card.style.transform = `translateX(${x}px)`
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
      <p className="hint">Rút một lá thăm để nhận giáo huấn của Mẹ</p>
    </section>
  )
}
