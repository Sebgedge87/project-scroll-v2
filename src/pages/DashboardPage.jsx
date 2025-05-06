import { useEffect, useState } from "react"
import { db } from "../firebase/config"
import {
  addDoc,
  getDoc,
  collection,
  serverTimestamp,
  setDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
  collectionGroup,
  where
} from "firebase/firestore"
import { Link } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase/config"
import { useAuth } from "../AuthContext"
import JoinGameForm from "../components/JoinGameForm"

function DashboardPage() {
  const [title, setTitle] = useState("")
  const [system, setSystem] = useState("")
  const [sessionDay, setSessionDay] = useState("")
  const [sessionTime, setSessionTime] = useState("")
  const [games, setGames] = useState([])
  const { user } = useAuth()

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, "test@email.com", "password123")
      alert("Logged in!")
    } catch (err) {
      console.error("Login error:", err.message)
    }
  }

  useEffect(() => {
    if (!user) return

    const fetchGames = async () => {
      const gmQuery = query(
        collection(db, "games"),
        where("gmId", "==", user.uid),
        orderBy("createdAt", "desc")
      )

      const unsubscribeGm = onSnapshot(gmQuery, (snapshot) => {
        const gmGames = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setGames((prev) => {
          const ids = new Set(prev.map((g) => g.id))
          const merged = [...prev, ...gmGames.filter((g) => !ids.has(g.id))]
          return merged
        })
      })

      const unsubscribeMembers = onSnapshot(
        collectionGroup(db, "members"),
        async (snapshot) => {
          const matchingDocs = snapshot.docs.filter((doc) => doc.id === user.uid)
          const gameIds = matchingDocs.map((doc) => doc.ref.parent.parent.id)

          const joinedGames = await Promise.all(
            gameIds.map(async (gameId) => {
              const ref = doc(db, "games", gameId)
              const snap = await getDoc(ref)
              return snap.exists() ? { id: snap.id, ...snap.data() } : null
            })
          )

          setGames((prev) => {
            const ids = new Set(prev.map((g) => g.id))
            const merged = [...prev, ...joinedGames.filter((g) => g && !ids.has(g.id))]
            return merged
          })
        }
      )

      return () => {
        unsubscribeGm()
        unsubscribeMembers()
      }
    }

    fetchGames()
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !system || !sessionDay || !sessionTime) {
      alert("Please fill out all fields.")
      return
    }

    try {
      const gameData = {
        title,
        system,
        sessionDay,
        sessionTime,
        createdAt: serverTimestamp(),
        gmId: user?.uid || "unknown",
      }

      const gameRef = await addDoc(collection(db, "games"), gameData)

      const sessionData = {
        name: "Session 1",
        date: serverTimestamp(),
        createdBy: "temp-user-123",
        noteCount: 0,
      }

      const sessionRef = doc(db, "games", gameRef.id, "sessions", "session-1")
      await setDoc(sessionRef, sessionData)

      alert("Game and first session created!")
      setTitle("")
      setSystem("")
      setSessionDay("")
      setSessionTime("")
    } catch (err) {
      console.error("Error adding game/session:", err)
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">📋 Dashboard – List of Games</h1>
      {!user && (
        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
        >
          Log in as test@email.com
        </button>
      )}
      {user && (
        <div className="space-y-2 max-w-md">
          <h2 className="text-xl font-semibold">🎟️ Join Game by Code</h2>
          <JoinGameForm />
        </div>
      )}
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

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          Create Game
        </button>
        <hr className="my-4 border-gray-700" />

        <h2 className="text-2xl font-semibold mb-2">🎲 My Games</h2>

        <ul className="space-y-2">
          {games.map((game) => (
            <li key={game.id}>
              <Link
                to={`/games/${game.id}`}
                className="block p-4 bg-gray-800 rounded shadow hover:bg-gray-700 transition-all"
              >
                <h3 className="text-xl font-bold">{game.title}</h3>
                <p className="text-sm text-gray-300">System: {game.system}</p>
                <p className="text-sm text-gray-400">
                  Session: {game.sessionDay} @ {game.sessionTime}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </form>
    </div>
  )
}

export default DashboardPage
