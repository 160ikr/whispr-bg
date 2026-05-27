import { useState, useEffect, useCallback } from 'react'

export function useModal() {
  const [openModal, setOpenModal] = useState(null) // 'login' | 'register' | 'write' | null

  const open  = useCallback((name) => setOpenModal(name), [])
  const close = useCallback(()     => setOpenModal(null), [])
  const switchTo = useCallback((name) => {
    setOpenModal(null)
    setTimeout(() => setOpenModal(name), 150)
  }, [])

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [close])

  return { openModal, open, close, switchTo }
}
