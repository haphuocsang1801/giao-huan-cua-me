let audioCtx = null
let wheelSpinBuffer = null

function getCtx() {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const Ctor = window.AudioContext || window.webkitAudioContext
    if (!Ctor) return null
    audioCtx = new Ctor()
  }
  if (audioCtx.state === 'suspended') audioCtx.resume()
  return audioCtx
}

async function loadWheelBuffer(ctx) {
  if (wheelSpinBuffer) return wheelSpinBuffer
  const res = await fetch('/sounds/wheel-spin.wav')
  const ab = await res.arrayBuffer()
  wheelSpinBuffer = await ctx.decodeAudioData(ab)
  return wheelSpinBuffer
}

// Call when the wheel tab becomes active so the buffer is ready before first spin
export async function preloadWheelSound() {
  try {
    const ctx = getCtx()
    if (ctx) await loadWheelBuffer(ctx)
  } catch {}
}

function bellOsc(ctx, time, freq, vol, decay) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'sine'
  osc.frequency.value = freq
  gain.gain.setValueAtTime(vol, time)
  gain.gain.exponentialRampToValueAtTime(0.001, time + decay)
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(time)
  osc.stop(time + decay + 0.05)
}

// Play wheel-spin WAV: playbackRate decelerates 2×→0.1× to match the visual wheel slowing down
export async function playWheelSpin() {
  try {
    const ctx = getCtx()
    if (!ctx) return
    const buffer = await loadWheelBuffer(ctx)
    const now = ctx.currentTime + 0.01

    const source = ctx.createBufferSource()
    source.buffer = buffer

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.001, now)
    gain.gain.linearRampToValueAtTime(0.85, now + 0.15)  // quick attack
    gain.gain.setValueAtTime(0.85, now + 3.8)            // hold — anchor for ramp below
    gain.gain.exponentialRampToValueAtTime(0.001, now + 5.0) // fade out as wheel stops

    source.connect(gain)
    gain.connect(ctx.destination)
    source.start(now)
    source.stop(now + 5.1)
  } catch {}
}

// Ascending chime arpeggio (C5–E5–G5–C6) when the teaching popup appears
export function playReveal() {
  try {
    const ctx = getCtx()
    if (!ctx) return
    const now = ctx.currentTime
    const notes = [523.25, 659.25, 783.99, 1046.5]
    const delays = [0, 0.12, 0.24, 0.38]
    const decays = [0.75, 0.85, 0.95, 1.35]

    notes.forEach((freq, i) => {
      const t = now + delays[i]
      bellOsc(ctx, t, freq, 0.13, decays[i])
      bellOsc(ctx, t, freq * 2.001, 0.035, decays[i] * 0.55)
    })
  } catch {}
}
