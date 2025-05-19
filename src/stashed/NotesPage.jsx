// src/pages/NotesPage.jsx
import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NotesPage() {
  const { currentUser: user } = useAuth();
  const { gameId }            = useParams();
  const [game, setGame]       = useState(null);
  const [notes, setNotes]     = useState([]);

  const isGM = game && user.uid === game.gmId;

  // Load game for gmId
  useEffect(() => {
    const fetchGame = async () => {
      const snap = await getDoc(doc(db, "games", gameId));
      if (snap.exists()) setGame({ id: snap.id, ...snap.data() });
    };
    fetchGame();
  }, [gameId]);

  // Permission-based listener
  useEffect(() => {
    if (!game) return;
    const baseCol = collection(db, "games", gameId, "notes");
    const q = isGM
      ? query(baseCol, orderBy("createdAt", "desc"))
      : query(
          baseCol,
          where("createdBy", "==", user.uid),
          orderBy("createdAt", "desc")
        );
    const unsubscribe = onSnapshot(q, (snap) =>
      setNotes(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    return unsubscribe;
  }, [game, user.uid]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-4">📝 Session Notes</h1>

      {notes.length === 0 ? (
        <p className="text-gray-500">No notes available.</p>
      ) : (
        notes.map((note) => (
          <div key={note.id} className="mb-4 bg-gray-800 p-4 rounded">
            <h2 className="font-semibold text-xl">{note.title}</h2>
            <p className="text-gray-300 mt-1">{note.content}</p>
            {!isGM && (
              <span className="text-xs text-gray-500 mt-2 block">
                Your note
              </span>
            )}
          </div>
        ))
      )}
    </div>
  );
}
