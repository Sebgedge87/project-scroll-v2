import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "./firebase/config";
import {
  addDoc,
  getDoc,
  collection,
  serverTimestamp,
  setDoc,
  doc,
  query,
  orderBy,
  onSnapshot
} from "firebase/firestore";
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'



function App() {
  return (
    <div className="p-4 text-white bg-gray-900 min-h-screen">
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/games/:gameId" element={<GamePage />} />
      </Routes>
    </div>
  );
}
function DashboardPage() {
  const [title, setTitle] = useState("");
  const [system, setSystem] = useState("");
  const [sessionDay, setSessionDay] = useState("");
  const [sessionTime, setSessionTime] = useState("");const [games, setGames] = useState([])

  useEffect(() => {
    const q = query(collection(db, 'games'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const gamesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setGames(gamesData)
    })
  
    return () => unsubscribe()
  }, [])
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !system || !sessionDay || !sessionTime) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const gameData = {
        title,
        system,
        sessionDay,
        sessionTime,
        createdAt: serverTimestamp(),
        gmId: "temp-user-123",
      };

      // Step 1: Create the game
      const gameRef = await addDoc(collection(db, "games"), gameData);

      // Step 2: Create the first session
      const sessionData = {
        name: "Session 1",
        date: serverTimestamp(), // ⏱ Later: calculate next session from day/time
        createdBy: "temp-user-123",
        noteCount: 0,
      };

      const sessionRef = doc(db, "games", gameRef.id, "sessions", "session-1");
      await setDoc(sessionRef, sessionData);

      alert("Game and first session created!");
      setTitle("");
      setSystem("");
      setSessionDay("");
      setSessionTime("");
    } catch (err) {
      console.error("Error adding game/session:", err);
    }
  };
  

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

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          Create Game
        </button>
        <hr className="my-4 border-gray-700" />

<h2 className="text-2xl font-semibold mb-2">🎲 My Games</h2>

<ul className="space-y-2">
  {games.map(game => (
   <li key={game.id}>
   <Link
     to={`/games/${game.id}`}
     className="block p-4 bg-gray-800 rounded shadow hover:bg-gray-700 transition-all"
   >
      <h3 className="text-xl font-bold">{game.title}</h3>
      <p className="text-sm text-gray-300">System: {game.system}</p>
      <p className="text-sm text-gray-400">Session: {game.sessionDay} @ {game.sessionTime}</p>
      </Link>
    </li>
  ))}
</ul>

      </form>    
    </div>
  );
}

function GamePage() {
  const { gameId } = useParams()
  const [game, setGame] = useState(null)

  useEffect(() => {
    const fetchGame = async () => {
      const ref = doc(db, 'games', gameId)
      const snap = await getDoc(ref)
      if (snap.exists()) {
        setGame({ id: snap.id, ...snap.data() })
      } else {
        console.warn('Game not found')
      }
    }

    fetchGame()
  }, [gameId])

  if (!game) return <p className="text-gray-400">Loading game...</p>

  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold">{game.title}</h1>
      <p className="text-gray-300">System: {game.system}</p>
      <p className="text-gray-400">Session day: {game.sessionDay} at {game.sessionTime}</p>
      <p className="text-sm text-gray-500">Game ID: {game.id}</p>
    </div>
  )
}


export default App;
