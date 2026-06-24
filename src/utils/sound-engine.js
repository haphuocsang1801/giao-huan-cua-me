let audioCtx = null

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

function tickOsc(ctx, time, freq, vol) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'triangle'
  osc.frequency.value = freq
  gain.gain.setValueAtTime(vol, time)
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.06)
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(time)
  osc.stop(time + 0.08)
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

// Whoosh (filtered noise) blends into individual ticks as the wheel decelerates over 7s
export function playWheelSpin() {
  try {
    const ctx = getCtx()
    if (!ctx) return
    const now = ctx.currentTime + 0.01

    // === WHOOSH: band-pass noise sweeping high→low (fast phase, 0–2.5s) ===
    const bufLen = Math.ceil(ctx.sampleRate * 2.6)
    const noiseBuf = ctx.createBuffer(1, bufLen, ctx.sampleRate)
    const noiseData = noiseBuf.getChannelData(0)
    for (let i = 0; i < bufLen; i++) noiseData[i] = Math.random() * 2 - 1

    const noise = ctx.createBufferSource()
    noise.buffer = noiseBuf

    const bpf = ctx.createBiquadFilter()
    bpf.type = 'bandpass'
    bpf.frequency.setValueAtTime(900, now)
    bpf.frequency.exponentialRampToValueAtTime(180, now + 2.4)
    bpf.Q.value = 1.5

    const noiseGain = ctx.createGain()
    noiseGain.gain.setValueAtTime(0.001, now)
    noiseGain.gain.linearRampToValueAtTime(0.18, now + 0.12)
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 2.5)

    noise.connect(bpf)
    bpf.connect(noiseGain)
    noiseGain.connect(ctx.destination)
    noise.start(now)
    noise.stop(now + 2.6)

    // === TICKS: deceleration clicks from 1.4s → 6.8s ===
    const times = []
    let t = 1.4
    let dt = 0.10

    while (t < 6.8) {
      times.push(t)
      const p = (t - 1.4) / 5.4
      dt = 0.10 + 0.70 * Math.pow(p, 2.0)
      t += dt
    }

    times.forEach((t) => {
      const p = (t - 1.4) / 5.4
      const freq = 650 + Math.random() * 100 - p * 100
      const vol = 0.08 + p * 0.06
      tickOsc(ctx, now + t, Math.max(450, freq), Math.min(0.14, vol))
    })
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
