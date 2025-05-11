import { useState } from "react"
import { db } from "../firebase"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"
import { useAuth } from "../AuthContext"

function JoinGameForm() {
  const [gameCode, setGameCode] = useState("")
  const [message, setMessage] = useState("")
  const { user } = useAuth()

  const handleJoin = async (e) => {
    e.preventDefault()
    setMessage("")

    try {
      const gameRef = doc(db, "games", gameCode)
      const gameSnap = await getDoc(gameRef)

      if (!gameSnap.exists()) {
        setMessage("❌ Game not found.")
        return
      }

      const memberRef = doc(db, "games", gameCode, "members", user.uid)
      await setDoc(memberRef, {
        joinedAt: serverTimestamp(),
        role: "player",
      })

      setMessage("✅ Successfully joined the game!")
      setGameCode("")
    } catch (err) {
      console.error("Join error:", err)
      setMessage("❌ Failed to join game.")
    }
  }

  return (
    <form onSubmit={handleJoin} className="space-y-2">
      <input
        type="text"
        className="w-full p-2 rounded bg-gray-800 text-white"
        placeholder="Enter Game ID"
        value={gameCode}
        onChange={(e) => setGameCode(e.target.value)}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700"
      >
        Join Game
      </button>
      {message && <p className="text-sm text-gray-400">{message}</p>}
    </form>
  )
}

export default JoinGameForm
