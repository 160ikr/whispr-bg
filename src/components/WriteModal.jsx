import React, { useState } from 'react'
import Modal from './Modal'
import { CATEGORIES } from '../data/mockData'
import { useAuth } from '../context/AuthContext'
import { useStories } from '../context/StoriesContext'
import s from './Modal.module.css'

const CATS = CATEGORIES.filter((c) => c.id !== 'all')

export default function WriteModal({ isOpen, onClose, onStoryCreated }) {
  const { user } = useAuth()
  const { addStory } = useStories()
  const [form, setForm]       = useState({ title: '', category: CATS[0].id, body: '' })
  const [success, setSuccess] = useState(false)

  const handle = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const id = addStory({ ...form, author: user || 'Анонимен' })
    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
      setForm({ title: '', category: CATS[0].id, body: '' })
      onClose()
      if (onStoryCreated) onStoryCreated(id)
    }, 1000)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className={s.heading}>Сподели история</h2>
      <div className={s.sub}>// публикувай анонимно</div>
      <div className={s.anonBadge}>🛡 100% анонимно · никой не знае кой си</div>

      {success ? (
        <p className={s.msgSuccess} style={{ textAlign: 'center', padding: '2rem 0', fontSize: '1rem' }}>
          ✓ Историята е публикувана!
        </p>
      ) : (
        <form onSubmit={submit}>
          <div className={s.field}>
            <label htmlFor="write-title">заглавие</label>
            <input id="write-title" name="title" type="text"
              placeholder="Накратко за какво е..." value={form.title} onChange={handle} required />
          </div>
          <div className={s.field}>
            <label htmlFor="write-cat">категория</label>
            <select id="write-cat" name="category" value={form.category} onChange={handle}>
              {CATS.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </div>
          <div className={s.field}>
            <label htmlFor="write-body">историята</label>
            <textarea id="write-body" name="body"
              placeholder="Разкажи ни какво се случи..." value={form.body} onChange={handle} required />
          </div>
          <button type="submit" className={s.submitBtn}>публикувай анонимно →</button>
        </form>
      )}
    </Modal>
  )
}
