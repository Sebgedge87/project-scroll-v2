import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import {
  getDoc,
  collection,
  doc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { useParams } from "react-router-dom";

function GamePage() {
    const { gameId } = useParams();
    const [game, setGame] = useState(null);
    const [sessions, setSessions] = useState([]);
  
    useEffect(() => {
      const fetchGame = async () => {
        const ref = doc(db, "games", gameId);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setGame({ id: snap.id, ...snap.data() });
        } else {
          console.warn("Game not found");
        }
      };
  
      fetchGame();
      const q = query(
        collection(db, "games", gameId, "sessions"),
        orderBy("date", "asc")
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const sessionData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSessions(sessionData);
      });
      return () => unsubscribe();
    }, [gameId]);
  
    if (!game) return <p className="text-gray-400">Loading game...</p>;
  
    return (
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{game.title}</h1>
        <p className="text-gray-300">System: {game.system}</p>
        <p className="text-gray-400">
          Session day: {game.sessionDay} at {game.sessionTime}
        </p>
        <p className="text-sm text-gray-500">Game ID: {game.id}</p>
        <hr className="my-4 border-gray-700" />
        <h2 className="text-2xl font-semibold mb-2">📆 Sessions</h2>
  
        <ul className="space-y-2">
          {sessions.length === 0 && (
            <p className="text-gray-500 italic">No sessions yet.</p>
          )}
          {sessions.map((session) => (
            <li key={session.id} className="p-4 bg-gray-800 rounded">
              <h3 className="text-lg font-bold">{session.name}</h3>
              <p className="text-sm text-gray-400">
                Created: {session.date?.toDate?.().toLocaleDateString() || "N/A"}
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  export default GamePage