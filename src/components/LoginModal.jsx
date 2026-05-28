import React, { useState } from 'react'
import Modal from './Modal'
import { loginUser } from '../data/auth'
import { useAuth } from '../context/AuthContext'
import s from './Modal.module.css'

export default function LoginModal({ isOpen, onClose, onSwitchToRegister }) {
  const { login } = useAuth()
  const [form, setForm]       = useState({ username: '', password: '' })
  const [error, setError]     = useState('')
  const [success, setSuccess] = useState('')

  const handle = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    setError('')
    const result = loginUser(form.username, form.password)
    if (!result.ok) { setError(result.error); return }
    setSuccess(`Добре дошъл, ${form.username.trim()}!`)
    setTimeout(() => {
      login(form.username.trim())
      setSuccess('')
      setForm({ username: '', password: '' })
      onClose()
    }, 900)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className={s.heading}>Добре дошъл обратно</h2>
      <div className={s.sub}>// вход в профила</div>
      <div className={s.anonBadge}>🛡 анонимността е гарантирана</div>
      <form onSubmit={submit}>
        <div className={s.field}>
          <label htmlFor="login-username">потребителско име</label>
          <input id="login-username" name="username" type="text"
            placeholder="твоят_псевдоним" value={form.username} onChange={handle} required />
        </div>
        <div className={s.field}>
          <label htmlFor="login-password">парола</label>
          <input id="login-password" name="password" type="password"
            placeholder="••••••••" value={form.password} onChange={handle} required />
        </div>
        {error   && <p className={s.msgError}>{error}</p>}
        {success && <p className={s.msgSuccess}>{success}</p>}
        <button type="submit" className={s.submitBtn}>влез →</button>
      </form>
      <div className={s.footer}>
        Нямаш акаунт?{' '}
        <a onClick={onSwitchToRegister}>Регистрирай се</a>
      </div>
    </Modal>
  )
}
