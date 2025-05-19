// src/app/games/[gameId]/sessions/index.jsx
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../../../firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { useAuth } from "../../../../context/AuthContext";

export default function SessionsPage() {
  const { gameId } = useParams();
  const { currentUser: user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [newName, setNewName] = useState("");
  const [newDate, setNewDate] = useState("");

  const isGM = user && user.uid === /* you could fetch game.gmId here or pass it down */ user.uid;

  useEffect(() => {
    const q = query(
      collection(db, "games", gameId, "sessions"),
      orderBy("date", "asc")
    );
    const unsub = onSnapshot(q, snap =>
      setSessions(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    );
    return unsub;
  }, [gameId]);

  const handleCreate = async e => {
    e.preventDefault();
    if (!newName.trim() || !newDate) return alert("Fill in name + date");
    await addDoc(collection(db, "games", gameId, "sessions"), {
      name: newName.trim(),
      date: Timestamp.fromDate(new Date(newDate)),
      createdBy: user.uid,
    });
    setNewName(""); setNewDate("");
  };


  return (
    <div className="space-y-4">
      {isGM && (
        <form onSubmit={handleCreate} className="space-y-2">
          <input
            value={newName}
            onChange={e => setNewName(e.target.value)}
            placeholder="Session name"
            className="p-2 bg-gray-700 rounded"
          />
          <input
            type="date"
            value={newDate}
            onChange={e => setNewDate(e.target.value)}
            className="p-2 bg-gray-700 rounded"
          />
          <button className="px-4 py-2 bg-yellow-500 rounded">Create</button>
        </form>
      )}

      <ul className="space-y-2">
        {sessions.map(s => (
          <li key={s.id} className="bg-gray-800 p-4 rounded">
            <Link
              to={`${s.id}`}
              className="block hover:bg-gray-700 p-2 rounded"
            >
              <strong>{s.name}</strong>
              <div className="text-sm text-gray-400">
                {s.date?.toDate().toLocaleDateString() || "—"}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
