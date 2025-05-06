import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { db } from './firebase/config'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'


function App() {
  return (
    <div className="p-4 text-white bg-gray-900 min-h-screen">
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/games/:gameId" element={<GamePage />} />
      </Routes>
    </div>
  )
}
function DashboardPage() {
  const [title, setTitle] = useState('')
  const [system, setSystem] = useState('')
  const [sessionDay, setSessionDay] = useState('')
  const [sessionTime, setSessionTime] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !system || !sessionDay || !sessionTime) {
      alert("Please fill out all fields.")
      return
    }

    try {
      const newGame = {
        title,
        system,
        sessionDay,
        sessionTime,
        createdAt: serverTimestamp(),
        gmId: 'temp-user-123' // 🔥 Temp until auth is wired
      }
      await addDoc(collection(db, 'games'), newGame)
      alert("Game created!")
      setTitle('')
      setSystem('')
      setSessionDay('')
      setSessionTime('')
    } catch (err) {
      console.error("Error adding game:", err)
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">📋 Dashboard – List of Games</h1>

      <form onSubmit={handleSubmit} className="space-y-2 max-w-md">
        <input
          className="w-full p-2 rounded bg-gray-800 text-white"
          type="text"
          placeholder="Game Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="w-full p-2 rounded bg-gray-800 text-white"
          type="text"
          placeholder="System (e.g. 5e, Call of Cthulhu)"
          value={system}
          onChange={(e) => setSystem(e.target.value)}
        />
        <input
          className="w-full p-2 rounded bg-gray-800 text-white"
          type="text"
          placeholder="Session Day (e.g. Saturday)"
          value={sessionDay}
          onChange={(e) => setSessionDay(e.target.value)}
        />
        <input
          className="w-full p-2 rounded bg-gray-800 text-white"
          type="time"
          value={sessionTime}
          onChange={(e) => setSessionTime(e.target.value)}
        />

        <button type="submit" className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
          Create Game
        </button>
      </form>
    </div>
  )
}


function GamePage() {
  return <h1 className="text-3xl font-bold">🎲 Game Page (/:gameId)</h1>
}


export default App
