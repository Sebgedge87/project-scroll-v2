// src/app/games/[gameId]/index.jsx
import { db } from "../../../firebase";
import { useEffect, useState } from "react";
import {
  getDoc,
  doc,
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

function GamePage() {
  const { currentUser: user } = useAuth();
  const { gameId }           = useParams();

  const [game, setGame]         = useState(null);
  const [sessions, setSessions] = useState([]);
  const [members, setMembers]   = useState([]);
  const [newName, setNewName]   = useState("");
  const [newDate, setNewDate]   = useState("");

  const isGM = user && game && user.uid === game.gmId;

  useEffect(() => {
    // 1️⃣ Fetch game details once
    const fetchGame = async () => {
      const ref  = doc(db, "games", gameId);
      const snap = await getDoc(ref);
      if (snap.exists()) setGame({ id: snap.id, ...snap.data() });
    };
    fetchGame();

    // 2️⃣ Listen to sessions
    const sessionsQ = query(
      collection(db, "games", gameId, "sessions"),
      orderBy("date", "asc")
    );
    const unsubscribeSessions = onSnapshot(sessionsQ, (snap) =>
      setSessions(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    );

    // 3️⃣ Listen to members
    const membersQ = query(
      collection(db, "games", gameId, "members"),
      orderBy("joinedAt", "asc")
    );
    const unsubscribeMembers = onSnapshot(membersQ, (snap) =>
      setMembers(
        snap.docs.map(d => ({
          id: d.id,
          displayName: d.data().displayName || d.id,
        }))
      )
    );

    // 4️⃣ Cleanup both subscriptions on unmount or gameId change
    return () => {
      unsubscribeSessions();
      unsubscribeMembers();
    };
  }, [gameId]);

  const handleCreateSession = async (e) => {
    e.preventDefault();
    if (!newName || !newDate) return alert("Fill in both name and date.");
    await addDoc(collection(db, "games", gameId, "sessions"), {
      name: newName,
      date: serverTimestamp(),
      createdBy: user.uid,
    });
    setNewName("");
    setNewDate("");
  };

  if (!game) return <p className="text-gray-400">Loading game...</p>;

  return (
    <div className="space-y-6 p-4">
      {/* Game Header */}
      <header>
        <h1 className="text-3xl font-bold">{game.title}</h1>
        <p className="text-gray-300">System: {game.system}</p>
        <p className="text-gray-400">
          Session day: {game.sessionDay} @ {game.sessionTime}
        </p>
      </header>

      {/* GM‐Only New Session Form */}
      {isGM && (
        <form onSubmit={handleCreateSession} className="space-y-2 max-w-md bg-gray-800 p-4 rounded">
          <h2 className="text-xl font-semibold text-yellow-400">➕ New Session</h2>
          <input
            type="text"
            placeholder="Session Name"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          <input
            type="date"
            value={newDate}
            onChange={e => setNewDate(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          <button type="submit" className="px-4 py-2 bg-yellow-500 rounded hover:bg-yellow-600">
            Create Session
          </button>
        </form>
      )}

      {/* Sessions List */}
      <section>
        <h2 className="text-2xl font-semibold text-purple-400">📆 Sessions</h2>
        {sessions.length === 0 ? (
          <p className="italic text-gray-500">No sessions yet.</p>
        ) : (
          <ul className="space-y-2">
            {sessions.map((s) => (
              <li key={s.id} className="p-4 bg-gray-800 rounded">
                <h3 className="text-lg font-bold">{s.name}</h3>
                <p className="text-sm text-gray-400">
                  Created: {s.date?.toDate().toLocaleDateString() || "—"}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Member List */}
      <section>
        <h2 className="text-2xl font-semibold text-green-400">👥 Players</h2>
        {members.length === 0 ? (
          <p className="italic text-gray-500">No players have joined yet.</p>
        ) : (
          <ul className="space-y-1">
            {members.map((m) => (
              <li key={m.id} className="text-white">• {m.displayName}</li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default GamePage;
