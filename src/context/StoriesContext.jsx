import React, { createContext, useContext, useState } from 'react'
import { STORIES as INITIAL } from '../data/mockData'

const StoriesContext = createContext(null)

export function StoriesProvider({ children }) {
  const [stories, setStories] = useState(INITIAL)

  const addStory = ({ title, category, body, author }) => {
    const newStory = {
      id: Date.now(),
      category,
      title,
      excerpt: body.slice(0, 160) + (body.length > 160 ? '...' : ''),
      body,
      author: author || 'Анонимен',
      timeAgo: 'току що',
      reads: 1,
      comments: 0,
      likes: 0,
      commentList: [],
    }
    setStories((prev) => [newStory, ...prev])
    return newStory.id
  }

  const addComment = (storyId, { text, author }) => {
    setStories((prev) =>
      prev.map((s) =>
        s.id === storyId
          ? {
              ...s,
              comments: s.comments + 1,
              commentList: [
                ...(s.commentList || []),
                { id: Date.now(), text, author: author || 'Анонимен', timeAgo: 'току що' },
              ],
            }
          : s
      )
    )
  }

  const getStory = (id) => stories.find((s) => s.id === id) || null

  return (
    <StoriesContext.Provider value={{ stories, addStory, addComment, getStory }}>
      {children}
    </StoriesContext.Provider>
  )
}

export function useStories() {
  return useContext(StoriesContext)
}
