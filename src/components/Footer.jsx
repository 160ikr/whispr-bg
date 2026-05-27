import React from 'react'
import styles from './Footer.module.css'

const LINKS = {
  'Платформа': ['За нас', 'Правила', 'Поверителност', 'Условия за ползване'],
  'Категории': ['Любов и изневяра', 'Здраве', 'Семейство', 'На работното място'],
  'Общност':   ['Последни истории', 'Топ истории', 'Нови коментари'],
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.logo}>whispr<span>.bg</span></div>
          <p className={styles.tagline}>
            Място за истории, които не можеш да разкажеш другаде.
            100% анонимно, без осъждане.
          </p>
          <div className={styles.badges}>
            <span className={styles.badge}>🛡 Анонимност</span>
            <span className={styles.badge}>Без лични данни</span>
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(LINKS).map(([section, links]) => (
          <div key={section} className={styles.col}>
            <div className={styles.colTitle}>{section}</div>
            {links.map((l) => (
              <a key={l} className={styles.link} href="#">{l}</a>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} whispr.bg — всички права запазени</span>
        <span className={styles.bottomRight}>
          Направено с <span className={styles.heart}>♥</span> в България
        </span>
      </div>
    </footer>
  )
}
