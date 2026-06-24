import { useRef, useState, useEffect, useCallback } from 'react'
import { TEACHINGS } from '../data/teachings'
import { playWheelSpin, preloadWheelSound } from '../utils/sound-engine'

const N = TEACHINGS.length
const SEG = 360 / N
const WHEEL_COLORS = ['#f6c9dd', '#cbe3a8', '#fbe6b0', '#bfe0e6', '#ecd0ec']
const CONIC = Array.from({ length: N }, (_, i) =>
  `${WHEEL_COLORS[i % WHEEL_COLORS.length]} ${i * SEG}deg ${(i + 1) * SEG}deg`
).join(',')

// Màu đậm bổ trợ cho từng màu nền pastel, xen kẽ tạo cảm giác sống động
const LABEL_COLORS = ['#ad1457', '#2e7d32', '#e65100', '#00695c', '#6a1b9a']
// Kích thước luân phiên: nhỏ – lớn – vừa để tạo nhịp điệu
const LABEL_SIZES = ['clamp(13px,3vw,16px)', 'clamp(18px,4.2vw,23px)', 'clamp(15px,3.6vw,19px)']
const LABEL_STYLES = Array.from({ length: N }, (_, i) => ({
  color: LABEL_COLORS[i % LABEL_COLORS.length],
  fontSize: LABEL_SIZES[i % LABEL_SIZES.length],
  textShadow: '0 1px 3px rgba(255,255,255,0.7)',
  fontStyle: i % 3 === 1 ? 'italic' : 'normal',
}))

export default function WheelWidget({ active, onReveal, closeKey, triggerKey }) {
  const wheelRef = useRef(null)
  const rotationRef = useRef(0)
  const spinningRef = useRef(false)
  const [spinning, setSpinning] = useState(false)

  const layoutWheel = useCallback(() => {
    const wheel = wheelRef.current
    if (!wheel) return
    const R = wheel.clientWidth / 2 * 0.66
    wheel.querySelectorAll('.lbl').forEach((lbl, i) => {
      const mid = i * SEG + SEG / 2
      lbl.style.transform = `translate(-50%,-50%) rotate(${mid}deg) translateY(-${R}px)`
    })
  }, [])

  useEffect(() => {
    layoutWheel()
    window.addEventListener('resize', layoutWheel)
    return () => window.removeEventListener('resize', layoutWheel)
  }, [layoutWheel])

  useEffect(() => {
    if (active) preloadWheelSound()
  }, [active])

  const doSpin = useCallback(() => {
    if (spinningRef.current) return
    spinningRef.current = true
    setSpinning(true)
    playWheelSpin()

    const target = Math.floor(Math.random() * N)
    const mid = target * SEG + SEG / 2
    const jitter = (Math.random() * 0.6 - 0.3) * SEG
    const desiredMod = ((-mid + jitter) % 360 + 360) % 360
    const currentMod = ((rotationRef.current % 360) + 360) % 360
    let delta = desiredMod - currentMod
    if (delta < 0) delta += 360
    delta += 360 * 7
    rotationRef.current += delta

    const wheel = wheelRef.current
    wheel.style.transform = `rotate(${rotationRef.current}deg)`

    let done = false
    const finish = () => {
      if (done) return
      done = true
      wheel.removeEventListener('transitionend', finish)
      spinningRef.current = false
      setSpinning(false)
      onReveal(target)
    }
    wheel.addEventListener('transitionend', finish)
    setTimeout(finish, 6200)
  }, [onReveal])

  // Reset hub when modal closes
  useEffect(() => {
    if (closeKey > 0) {
      spinningRef.current = false
      setSpinning(false)
    }
  }, [closeKey])

  // Auto-spin when "Rút lần nữa" is clicked while wheel is active
  useEffect(() => {
    if (triggerKey > 0 && active) doSpin()
  }, [triggerKey]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className={`widget${active ? ' on' : ''}`}>
      <div className="wheel-wrap">
        <div className="wheel-pointer" />
        <div
          className="wheel"
          ref={wheelRef}
          style={{ background: `conic-gradient(${CONIC})` }}
        >
          {Array.from({ length: N }, (_, i) => (
            <span key={i} className="lbl" style={LABEL_STYLES[i]}>{i + 1}</span>
          ))}
        </div>
        <button className="hub" onClick={doSpin} disabled={spinning}>QUAY</button>
      </div>
      <p className="hint">Chạm nút "QUAY" và để vòng quay chọn giáo huấn cho bạn</p>
    </section>
  )
}
