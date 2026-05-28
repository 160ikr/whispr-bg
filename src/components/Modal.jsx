import React, { useEffect, useRef } from 'react'
import styles from './Modal.module.css'

export default function Modal({ isOpen, onClose, children }) {
  // Track where mousedown started — only close if both mousedown AND mouseup are on overlay
  const mouseDownTarget = useRef(null)

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else        document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className={styles.overlay}
      onMouseDown={(e) => { mouseDownTarget.current = e.target }}
      onMouseUp={(e) => {
        if (
          mouseDownTarget.current === e.currentTarget &&
          e.target === e.currentTarget
        ) onClose()
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose} aria-label="Затвори">✕</button>
        {children}
      </div>
    </div>
  )
}
