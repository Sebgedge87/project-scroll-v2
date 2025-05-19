// src/pages/SessionsPage.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

export default function SessionsPage() {
  const { gameId } = useParams();
  const { currentUser } = useAuth();

  const [sessions, setSessions] = useState([]);
  const [newName, setNewName]   = useState("");

  // Load sessions in real time
  useEffect(() => {
    const col = collection(db, "games", gameId, "sessions");
    const q = query(col, orderBy("createdAt", "asc"));
    return onSnapshot(q, (snap) => {
      setSessions(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
  }, [gameId]);

  // Only GM can create sessions
  const [isGM, setIsGM] = useState(false);
  useEffect(() => {
    // you can cache gmId in parent or fetch here:
    db.collection("games")
      .doc(gameId)
      .get()
      .then(docSnap => {
        if (docSnap.exists && docSnap.data().gmId === currentUser.uid) {
          setIsGM(true);
        }
      });
  }, [gameId, currentUser.uid]);

  const handleAdd = async e => {
    e.preventDefault();
    if (!newName.trim()) return;
    await addDoc(collection(db, "games", gameId, "sessions"), {
      name: newName.trim(),
      createdAt: serverTimestamp(),
    });
    setNewName("");
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Sessions</h1>

      {isGM && (
        <form onSubmit={handleAdd} className="mb-6 space-y-2 max-w-md">
          <input
            value={newName}
            onChange={e => setNewName(e.target.value)}
            placeholder="New session name"
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
          >
            Create Session
          </button>
        </form>
      )}

      {sessions.length === 0 ? (
        <p className="text-gray-400">No sessions yet.</p>
      ) : (
        <ul className="space-y-2">
          {sessions.map(s => (
            <li key={s.id}>
              <Link
                to={`/games/${gameId}/sessions/${s.id}`}
                className="text-blue-400 hover:underline"
              >
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
