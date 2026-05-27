import React from 'react'
import styles from './Hero.module.css'

export default function Hero({ onWrite }) {
  const scrollToStories = () => {
    document.getElementById('stories-feed')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className={styles.hero}>
      <div className={styles.tag}>
        <span className={styles.pulse} />
        &nbsp;132,084 споделени истории
      </div>

      <h1 className={styles.heading}>
        Твоята история<br />
        <span className="gradient-text">заслужава да бъде чута</span>
      </h1>

      <p className={styles.sub}>
        Сподели анонимно. Получи съвет. Учи се от опита на другите.
        Никой не знае кой си.
      </p>

      <div className={styles.cta}>
        <button className={styles.btnPrimary} onClick={onWrite}>
          + Сподели история
        </button>
        <button className={styles.btnGhost} onClick={scrollToStories}>
          Разгледай ↓
        </button>
      </div>
    </section>
  )
}
