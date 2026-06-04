import { useState } from 'react'
import html2canvas from 'html2canvas'
import { TEACHINGS } from '../data/teachings'

async function captureAndSave() {
  // Build a full-height off-screen element so all teachings appear in one image
  const wrap = document.createElement('div')
  wrap.style.cssText = [
    'position:fixed', 'left:-9999px', 'top:0',
    'width:600px',
    "background:linear-gradient(180deg,#e6f0ee 0%,#f6f2e6 46%,#eaf2dd 100%)",
    'padding:48px 44px 56px',
    "font-family:'Be Vietnam Pro',sans-serif",
    'color:#4c5142',
  ].join(';')

  wrap.innerHTML = `
    <div style="text-align:center;margin-bottom:32px;">
      <div style="font-size:15px;letter-spacing:.45em;color:#a9c98c;margin-bottom:10px;">♥ ✧ ♥</div>
      <div style="font-family:'Playfair Display',serif;font-style:italic;font-weight:700;font-size:30px;color:#c75f8f;line-height:1.2;">
        13 Giáo Huấn của Mẹ
      </div>
    </div>

    <div>
      ${TEACHINGS.map((text, i) => `
        <div style="display:flex;gap:14px;align-items:flex-start;padding:15px 0;border-bottom:1px solid rgba(207,110,152,.14);">
          <div style="flex-shrink:0;width:30px;height:30px;border-radius:50%;
            background:linear-gradient(135deg,#fbe4ef,#eef6df);
            border:1px solid rgba(207,110,152,.35);
            text-align:center;line-height:30px;
            font-family:'Playfair Display',serif;font-weight:700;font-size:13px;color:#c75f8f;
            margin-top:2px;">
            ${i + 1}
          </div>
          <p style="font-size:15.5px;line-height:1.68;color:#54513f;margin:0;flex:1;">
            ${text}
          </p>
        </div>
      `).join('')}
    </div>

    <div style="text-align:center;margin-top:32px;font-family:'Playfair Display',serif;font-style:italic;font-size:14.5px;color:#c75f8f;">
      Trao cho con với cả tấm lòng của Mẹ ♥
    </div>
  `

  document.body.appendChild(wrap)
  await document.fonts.ready

  const canvas = await html2canvas(wrap, {
    scale: 2,
    useCORS: true,
    backgroundColor: null,
    logging: false,
  })

  document.body.removeChild(wrap)

  const link = document.createElement('a')
  link.download = 'giao-huan-cua-me.png'
  link.href = canvas.toDataURL('image/png')
  link.click()
}

export default function AllTeachingsModal({ onClose }) {
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      await captureAndSave()
    } finally {
      setSaving(false)
    }
  }

  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-label="Tất cả giáo huấn của Mẹ"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="modal-card all-teachings-card">
        <div className="m-garland">
          <span className="h">&#10084;</span> &#10047; <span className="h">&#10084;</span>
        </div>

        <h2 className="all-teachings-title">13 Giáo Huấn của Mẹ</h2>

        <ol className="all-teachings-list">
          {TEACHINGS.map((text, i) => (
            <li key={i} className="teaching-item">
              <span className="teaching-num">{i + 1}</span>
              <p className="teaching-text">{text}</p>
            </li>
          ))}
        </ol>

        <div className="m-rule" />
        <div className="m-actions">
          <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? (
              'Đang tạo ảnh...'
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Lưu ảnh
              </>
            )}
          </button>
          <button className="btn btn-ghost" onClick={onClose}>Đóng lại</button>
        </div>
      </div>
    </div>
  )
}
