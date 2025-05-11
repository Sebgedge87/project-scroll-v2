// src/components/JoinGameForm.jsx
import { useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function JoinGameForm() {
  const [gameCode, setGameCode] = useState("");
  const { currentUser, loading } = useAuth();

  if (loading) return <p>Loading…</p>;
  if (!currentUser) {
    toast.error("Please log in to join a game.");
    return null;
  }

  const handleJoin = async (e) => {
    e.preventDefault();
    const code = gameCode.trim();
    if (!code) {
      return toast.error("Enter a game code.");
    }

    try {
      console.log("Attempting to join:", code);
      // 1. Verify game exists
      const gameRef = doc(db, "games", code);
      const gameSnap = await getDoc(gameRef);
      if (!gameSnap.exists()) {
        return toast.error("Game not found. Check the exact ID.");
      }

      // 2. Add member entry
      const memberRef = doc(db, "games", code, "members", currentUser.uid);
      await setDoc(memberRef, {
        displayName: currentUser.email, // or currentUser.displayName
        joinedAt: serverTimestamp(),
        role: "player",
      });

      toast.success("✅ Successfully joined!");
      setGameCode("");
    } catch (err) {
      console.error("Join error:", err);
      toast.error("❌ Failed to join game.");
    }
  };

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
        className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700 text-white"
      >
        Join Game
      </button>
    </form>
  );
}