// In-memory user store — replace with real backend calls later
// Format: { username: hashedPassword } — we just store lowercase for demo
const users = {}

export function registerUser(username, password) {
  const key = username.trim().toLowerCase()
  if (!key) return { ok: false, error: 'Въведи псевдоним.' }
  if (key.length < 3) return { ok: false, error: 'Псевдонимът трябва да е поне 3 символа.' }
  if (password.length < 8) return { ok: false, error: 'Паролата трябва да е поне 8 символа.' }
  if (users[key]) return { ok: false, error: 'Този псевдоним вече е зает. Избери друг.' }
  users[key] = password
  return { ok: true }
}

export function loginUser(username, password) {
  const key = username.trim().toLowerCase()
  if (!users[key]) return { ok: false, error: 'Не намерихме такъв потребител.' }
  if (users[key] !== password) return { ok: false, error: 'Грешна парола.' }
  return { ok: true }
}
