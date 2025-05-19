// src/hooks/useInventory.js
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

export default function useInventory() {
  const { gameId }    = useParams();
  const { currentUser } = useAuth();
  const [items, setItems] = useState([]);
  

  useEffect(() => {
    if (!gameId) return;
    const invCol = collection(db, "games", gameId, "inventory");

    // ▶ everyone reads ALL items, ordered by creation time
    const q = query(invCol, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (snap) => {
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsubscribe;
  }, [gameId]);

  // GM-only: add a new item
  const addItem = async ({ name, quantity = 1 }) => {
    await addDoc(collection(db, "games", gameId, "inventory"), {
      name,
      quantity,
      createdBy: currentUser.uid,
      createdAt: serverTimestamp(),
    });
  };

  // GM-only: delete an item
  const removeItem = async (id) => {
    await deleteDoc(doc(db, "games", gameId, "inventory", id));
  };

  return { items, addItem, removeItem };
}
