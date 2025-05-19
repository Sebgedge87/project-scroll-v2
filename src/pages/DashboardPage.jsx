// src/pages/DashboardPage.jsx
import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
  arrayUnion,
} from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { auth, db } from "../firebase";
import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // — Form state —
  const [title, setTitle] = useState("");
  const [system, setSystem] = useState("");
  const [sessionDay, setSessionDay] = useState("");
  const [sessionTime, setSessionTime] = useState("");
  const [joinCode, setJoinCode] = useState("");

  // — Fetched games —
  const [gmGames, setGmGames] = useState([]);
  const [memberGames, setMemberGames] = useState([]);

  // Subscribe to games you GM
  useEffect(() => {
    if (!currentUser) return;
    const q = query(
      collection(db, "games"),
      where("gmId", "==", currentUser.uid)
    );
    const unsub = onSnapshot(
      q,
      (snap) => {
        setGmGames(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      },
      (err) => {
        console.error("GM games listener error:", err);
        toast.error("Could not load your hosted games.");
      }
    );
    return () => unsub();
  }, [currentUser]);

  // Subscribe to games you’re a member of (denormalised)
  useEffect(() => {
    if (!currentUser) return;
    const q = query(
      collection(db, "games"),
      where("memberUids", "array-contains", currentUser.uid)
    );
    const unsub = onSnapshot(
      q,
      (snap) => {
        setMemberGames(
          snap.docs
            .filter((d) => d.data().gmId !== currentUser.uid)
            .map((d) => ({ id: d.id, ...d.data() }))
        );
      },
      (err) => {
        console.error("Member games listener error:", err);
        toast.error("Could not load your joined games.");
      }
    );
    return () => unsub();
  }, [currentUser]);

  // If not signed in, show test-login screen
  if (!currentUser) {
    const handleTestLogin = async () => {
      try {
        await signInWithEmailAndPassword(auth, "test@email.com", "hunter2");
        toast.success("Signed in as Test User");
      } catch (err) {
        console.error(err);
        toast.error(
          err.code === "auth/user-not-found"
            ? "Test user not found."
            : err.code === "auth/wrong-password"
            ? "Wrong password."
            : "Login failed."
        );
      }
    };
    return (
      <div className="p-6 bg-gray-900 min-h-screen text-white flex flex-col items-center justify-center">
        <h2 className="text-3xl mb-4">Welcome to Project Scroll</h2>
        <button
          onClick={handleTestLogin}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          Log In as Test User
        </button>
      </div>
    );
  }

  // Create new game
  const handleCreateGame = async (e) => {
    e.preventDefault();
    if (!title || !system || !sessionDay || !sessionTime) {
      return toast.error("Please fill in all fields.");
    }
    try {
      const gameRef = await addDoc(collection(db, "games"), {
        title: title.trim(),
        system: system.trim(),
        sessionDay,
        sessionTime,
        gmId: currentUser.uid,
        createdAt: serverTimestamp(),
        memberUids: [currentUser.uid],
      });
      await setDoc(
        doc(db, "games", gameRef.id, "members", currentUser.uid),
        {
          userId: currentUser.uid,
          role: "gm",
          joinedAt: serverTimestamp(),
          displayName: currentUser.displayName || currentUser.email,
        }
      );
      toast.success("Game created!");
      navigate(`/games/${gameRef.id}`);
    } catch (err) {
      console.error("Create game error:", err);
      toast.error("Failed to create game.");
    } finally {
      setTitle("");
      setSystem("");
      setSessionDay("");
      setSessionTime("");
    }
  };

  // Join existing game
  const handleJoinGame = async (e) => {
    e.preventDefault();
    if (!joinCode.trim()) {
      return toast.error("Enter a game code.");
    }
    try {
      const gameRef = doc(db, "games", joinCode.trim());
      const snap = await getDoc(gameRef);
      if (!snap.exists()) {
        return toast.error("Game not found.");
      }
      await setDoc(
        doc(db, "games", joinCode, "members", currentUser.uid),
        {
          userId: currentUser.uid,
          role: "player",
          joinedAt: serverTimestamp(),
          displayName: currentUser.displayName || currentUser.email,
        }
      );
      await updateDoc(gameRef, {
        memberUids: arrayUnion(currentUser.uid),
      });
      toast.success("Joined game!");
      navigate(`/games/${joinCode}`);
      setJoinCode("");
    } catch (err) {
      console.error("Join game error:", err);
      toast.error("Failed to join game.");
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out");
      navigate("/");
    } catch {
      toast.error("Logout failed.");
    }
  };

  // Merge and dedupe
  const allGames = [...gmGames, ...memberGames];

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white space-y-8">
      <header className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Your Games</h1>
        <button
          onClick={handleLogout}
          className="px-3 py-1 bg-red-600 rounded hover:bg-red-700"
        >
          Log Out
        </button>
      </header>

      {/* Join Game */}
      <form
        onSubmit={handleJoinGame}
        className="bg-gray-800 p-4 rounded space-y-2 max-w-md"
      >
        <h2 className="text-2xl font-semibold text-yellow-400">
          🔗 Join Game
        </h2>
        <input
          type="text"
          placeholder="Game Code"
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
        <button
          className="w-full px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          Join
        </button>
      </form>

      {/* Create Game */}
      <form
        onSubmit={handleCreateGame}
        className="bg-gray-800 p-6 rounded space-y-4 max-w-md"
      >
        <h2 className="text-2xl font-semibold text-green-400">
          ➕ Create New Game
        </h2>
        <input
          type="text"
          placeholder="Game Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
        <input
          type="text"
          placeholder="System (e.g. D&D 5e)"
          value={system}
          onChange={(e) => setSystem(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
        <div className="flex gap-2">
          <select
            value={sessionDay}
            onChange={(e) => setSessionDay(e.target.value)}
            className="flex-1 p-2 rounded bg-gray-700 text-white"
          >
            <option value="">Session Day</option>
            {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
          <input
            type="time"
            value={sessionTime}
            onChange={(e) => setSessionTime(e.target.value)}
            className="flex-1 p-2 rounded bg-gray-700 text-white"
          />
        </div>
        <button
          className="w-full px-4 py-2 bg-green-600 rounded hover:bg-green-700"
        >
          Create Game
        </button>
      </form>

      {/* Games List */}
      {allGames.length === 0 ? (
        <p className="text-gray-400">You have no games yet.</p>
      ) : (
        <ul className="space-y-2">
          {allGames.map((g) => (
            <li key={g.id}>
              <Link
                to={`/games/${g.id}`}
                className="text-blue-400 hover:underline text-xl"
              >
                {g.title || `Game ${g.id}`}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
