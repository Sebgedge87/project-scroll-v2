/* import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase"

function SessionsPage() {
  const { gameId, sessionId } = useParams();
  const { session, setSession } = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const ref = doc(db, "games", gameId, "sessions", sessionId);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setSession({ id: snap.id, ...snap.data() });
      } else {
        console.warn("Session not found");
      }
    };

    fetchSession();
  }, [gameId, sessionId]);

  if (!session) return <p className="text-gray-400">Loading session...</p>;

  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold">{session.name}</h1>
      <p className="text-sm text-gray-400">
        Created: {session.date?.toDate?.().toLocaleDateString() || "N/A"}
      </p>
      <p className="text-sm text-gray-500">Session ID: {session.id}</p>
    </div>
  );
}
export default SessionsPage */