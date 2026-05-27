import React from 'react'
import { STATS } from '../data/mockData'
import styles from './StatsBar.module.css'

export default function StatsBar() {
  return (
    <div className={styles.bar}>
      {STATS.map((s) => (
        <div key={s.label} className={styles.stat}>
          <div className={styles.value}>{s.value}</div>
          <div className={styles.label}>{s.label}</div>
        </div>
      ))}
    </div>
  )
}
