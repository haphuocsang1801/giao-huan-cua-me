import { useRef, useState, useEffect, useCallback } from 'react'
import { TEACHINGS } from '../data/teachings'

const N = TEACHINGS.length

export default function BoxWidget({ active, onReveal, closeKey, triggerKey }) {
  const busyRef = useRef(false)
  const [isShaking, setIsShaking] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const openBox = useCallback(() => {
    if (busyRef.current) return
    busyRef.current = true
    setIsShaking(true)
    setTimeout(() => {
      setIsShaking(false)
      setIsOpen(true)
      setTimeout(() => onReveal(Math.floor(Math.random() * N)), 620)
    }, 560)
  }, [onReveal])

  // Reset box state when modal closes
  useEffect(() => {
    if (closeKey > 0) {
      busyRef.current = false
      setIsShaking(false)
      setIsOpen(false)
    }
  }, [closeKey])

  // Auto-open when "Rút lần nữa" is clicked while box is active
  useEffect(() => {
    if (triggerKey > 0 && active) openBox()
  }, [triggerKey]) // eslint-disable-line react-hooks/exhaustive-deps

  const boxClass = ['giftbox', isShaking ? 'shake' : '', isOpen ? 'open' : '']
    .filter(Boolean).join(' ')

  return (
    <section className={`widget${active ? ' on' : ''}`}>
      <div className={boxClass} onClick={openBox}>
        <div className="gb-body" />
        <div className="gb-ribbon" />
        <div className="gb-lid" />
        <div className="gb-bow">&#10047;</div>
      </div>
      <p className="hint">Chạm vào hộp quà để mở điều bất ngờ bên trong</p>
    </section>
  )
}
