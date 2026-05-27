import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

const DEFAULT_PROFILE = {
  bio: '',
  bannerColor: '#7c3aed',   // gradient start
  bannerColor2: '#3b82f6',  // gradient end
  bgColor: '#080810',
  accentColor: '#a855f7',
}

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [profiles, setProfiles] = useState({}) // username -> profile object

  const login  = (username) => setUser(username)
  const logout = () => setUser(null)

  const getProfile = (username) => ({
    ...DEFAULT_PROFILE,
    ...(profiles[username] || {}),
    username,
  })

  const updateProfile = (username, changes) => {
    setProfiles((prev) => ({
      ...prev,
      [username]: { ...(prev[username] || {}), ...changes },
    }))
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, getProfile, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
