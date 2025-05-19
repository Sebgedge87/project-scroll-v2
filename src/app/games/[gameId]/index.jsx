// src/app/games/[gameId]/index.jsx
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import {
  getDoc,
  doc,collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { useAuth } from "../../../context/AuthContext";
import { Link, Outlet, useParams } from "react-router-dom";

export default function GamePage() {
  const { currentUser: user } = useAuth();
  const { gameId } = useParams();

  
  // helper to copy the join code to clipboard
  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(gameId);
      alert("Copied join code!");
    } catch {
      alert("Failed to copy join code.");
    }
  };

  // bring back members state
  const [members, setMembers] = useState([]);

  const [game, setGame] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      const ref = doc(db, "games", gameId);
      const snap = await getDoc(ref);
      if (snap.exists()) setGame({ id: snap.id, ...snap.data() });
    };
    fetchGame();
  }, [gameId]);

    // Listen to members
  useEffect(() => {
    const membersQ = query(
      collection(db, "games", gameId, "members"),
      orderBy("joinedAt", "asc")
    );
    const unsub = onSnapshot(membersQ, snap => {
      setMembers(snap.docs.map(d => ({
        id: d.id,
        displayName: d.data().displayName || d.id
      })));
    });
    return unsub;
  }, [gameId]);

  if (!game) {
    return <p className="text-gray-400">Loading game…</p>;
  }

  return (
    <div className="space-y-6 p-4 bg-gray-900 min-h-screen text-white">
      {/* Game Header */}
      <header>
        <h1 className="text-3xl font-bold">{game.title}</h1>
        <p className="text-gray-300">System: {game.system}</p>
        <p className="text-gray-400">
          Session day: {game.sessionDay} @ {game.sessionTime}
        </p>
      </header>

      {/* Invite / Join Code */}
     <section className="bg-gray-800 p-4 rounded">
       <h2 className="text-xl font-semibold text-yellow-400">🔗 Invite Players</h2>
       <p className="mt-2">
         Share this code to let others join your game:
         <code className="ml-2 px-2 py-1 bg-gray-700 rounded">{gameId}</code>
       </p>
       <button
         onClick={copyCode}
         className="mt-2 px-3 py-1 bg-blue-600 rounded hover:bg-blue-700"
       >
         Copy Code
       </button>
     </section>

      {/* Players List */}
      <section>
        <h2 className="text-2xl font-semibold text-green-400">👥 Players</h2>
        {members.length === 0 ? (
          <p className="italic text-gray-500">No players have joined yet.</p>
        ) : (
          <ul className="space-y-1">
            {members.map(m => (
              <li key={m.id} className="text-white">• {m.displayName}</li>
            ))}
          </ul>
        )}
      </section>

      {/* Navigation */}
      <nav className="flex gap-4">
        <Link
          to="sessions"
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          View Sessions
        </Link>
      </nav>

      {/* Nested routes render here */}
      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  );
}
