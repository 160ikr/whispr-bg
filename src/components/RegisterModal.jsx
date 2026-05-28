import React, { useState } from 'react'
import Modal from './Modal'
import { registerUser } from '../data/auth'
import { useAuth } from '../context/AuthContext'
import s from './Modal.module.css'

export default function RegisterModal({ isOpen, onClose, onSwitchToLogin }) {
  const { login } = useAuth()
  const [form, setForm]       = useState({ username: '', password: '', confirm: '' })
  const [error, setError]     = useState('')
  const [success, setSuccess] = useState('')

  const handle = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) { setError('Паролите не съвпадат.'); return }
    const result = registerUser(form.username, form.password)
    if (!result.ok) { setError(result.error); return }
    setSuccess(`Акаунтът е създаден! Добре дошъл, ${form.username.trim()}!`)
    setTimeout(() => {
      login(form.username.trim())
      setSuccess('')
      setForm({ username: '', password: '', confirm: '' })
      onClose()
    }, 1000)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className={s.heading}>Присъедини се</h2>
      <div className={s.sub}>// нов анонимен профил</div>
      <div className={s.anonBadge}>🛡 не искаме имейл, телефон или истинско име</div>
      <form onSubmit={submit}>
        <div className={s.field}>
          <label htmlFor="reg-username">избери псевдоним</label>
          <input id="reg-username" name="username" type="text"
            placeholder="напр. shadow_wolf_42" value={form.username} onChange={handle} required />
        </div>
        <div className={s.field}>
          <label htmlFor="reg-password">парола</label>
          <input id="reg-password" name="password" type="password"
            placeholder="минимум 8 символа" value={form.password} onChange={handle} required />
        </div>
        <div className={s.field}>
          <label htmlFor="reg-confirm">потвърди парола</label>
          <input id="reg-confirm" name="confirm" type="password"
            placeholder="••••••••" value={form.confirm} onChange={handle} required />
        </div>
        {error   && <p className={s.msgError}>{error}</p>}
        {success && <p className={s.msgSuccess}>{success}</p>}
        <button type="submit" className={s.submitBtn}>създай профил →</button>
      </form>
      <div className={s.footer}>
        Имаш акаунт? <a onClick={onSwitchToLogin}>Влез</a>
      </div>
    </Modal>
  )
}
