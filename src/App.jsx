import { useState, useCallback } from 'react'
import Background from './components/Background'
import Masthead from './components/Masthead'
import MethodTabs from './components/MethodTabs'
import WheelWidget from './components/WheelWidget'
import LotsWidget from './components/LotsWidget'
import BoxWidget from './components/BoxWidget'
import ResultModal from './components/ResultModal'
import AllTeachingsModal from './components/AllTeachingsModal'

const METHODS = ['wheel', 'lots', 'box']

function getInitialMethod() {
  try {
    const saved = localStorage.getItem('gh_me_method')
    if (saved && METHODS.includes(saved)) return saved
  } catch {}
  return 'wheel'
}

export default function App() {
  const [method, setMethod] = useState(getInitialMethod)
  const [modalIndex, setModalIndex] = useState(null)
  const [showAll, setShowAll] = useState(false)
  // Increments when modal closes — widgets use this to reset their state
  const [closeKey, setCloseKey] = useState(0)
  // Increments when "Rút lần nữa" is clicked — wheel/box use this to auto-trigger
  const [triggerKey, setTriggerKey] = useState(0)

  const handleChangeMethod = useCallback((m) => {
    setModalIndex(null)
    setMethod(m)
    setCloseKey(k => k + 1)
    try { localStorage.setItem('gh_me_method', m) } catch {}
  }, [])

  const handleReveal = useCallback((index) => {
    setModalIndex(index)
    try { localStorage.setItem('gh_me_last', index) } catch {}
  }, [])

  const handleClose = useCallback(() => {
    setModalIndex(null)
    setCloseKey(k => k + 1)
  }, [])

  // Close modal + reset + auto-trigger current widget
  const handleAgain = useCallback(() => {
    setModalIndex(null)
    setCloseKey(k => k + 1)
    setTriggerKey(k => k + 1)
  }, [])

  return (
    <>
      <Background />
      <main className="stage">
        <Masthead />
        <MethodTabs method={method} onChange={handleChangeMethod} />
        <div className="widget-stage">
          <WheelWidget
            active={method === 'wheel'}
            onReveal={handleReveal}
            closeKey={closeKey}
            triggerKey={triggerKey}
          />
          <LotsWidget
            active={method === 'lots'}
            onReveal={handleReveal}
            closeKey={closeKey}
          />
          <BoxWidget
            active={method === 'box'}
            onReveal={handleReveal}
            closeKey={closeKey}
            triggerKey={triggerKey}
          />
        </div>
        <button className="view-all-btn" onClick={() => setShowAll(true)}>
          <span className="dot">✿</span>
          Xem tất cả 13 giáo huấn
          <span className="dot">✿</span>
        </button>
      </main>
      {modalIndex !== null && (
        <ResultModal
          index={modalIndex}
          onClose={handleClose}
          onAgain={handleAgain}
        />
      )}
      {showAll && <AllTeachingsModal onClose={() => setShowAll(false)} />}
    </>
  )
}
