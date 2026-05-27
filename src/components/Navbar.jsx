import React, { useState, useRef, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import styles from './Navbar.module.css'

export default function Navbar({ onLogin, onRegister, onWrite, onHome, onProfile }) {
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <nav className={styles.nav}>
      <div className={styles.logo} onClick={onHome} title="Начало">
        whispr<span className={styles.logoSuffix}>.bg</span>
      </div>

      <div className={styles.actions}>
        {user ? (
          <>
            <button className={styles.writeBtn} onClick={onWrite}>
              + Сподели история
            </button>
            <div className={styles.userMenu} ref={menuRef}>
              <button
                className={styles.avatar}
                onClick={() => setMenuOpen((o) => !o)}
                title={user}
              >
                <span className={styles.avatarInitial}>{user.charAt(0).toUpperCase()}</span>
                <span className={styles.userName}>{user}</span>
                <span className={styles.chevron}>{menuOpen ? '▲' : '▼'}</span>
              </button>
              {menuOpen && (
                <div className={styles.dropdown}>
                  <div className={styles.dropdownUser}>
                    <span className={styles.dropdownInitial}>{user.charAt(0).toUpperCase()}</span>
                    <div>
                      <div className={styles.dropdownName}>{user}</div>
                      <div className={styles.dropdownSub}>анонимен профил</div>
                    </div>
                  </div>
                  <div className={styles.dropdownDivider} />
                  <button className={styles.dropdownItem}
                    onClick={() => { setMenuOpen(false); onProfile(user) }}>
                     &nbsp;Моят профил
                  </button>
                  <button className={styles.dropdownItem}
                    onClick={() => { setMenuOpen(false); onWrite() }}>
                     &nbsp;Нова история
                  </button>
                  <div className={styles.dropdownDivider} />
                  <button
                    className={`${styles.dropdownItem} ${styles.dropdownLogout}`}
                    onClick={() => { logout(); setMenuOpen(false) }}
                  >
                    ↩ &nbsp;Изход
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <button className={styles.btnGhost} onClick={onLogin}>вход</button>
            <button className={styles.btnPrimary} onClick={onRegister}>регистрация</button>
          </>
        )}
      </div>
    </nav>
  )
}
