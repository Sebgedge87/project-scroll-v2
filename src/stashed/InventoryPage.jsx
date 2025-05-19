// src/pages/InventoryPage.jsx
import { useState } from "react";
import useInventory from "../hooks/useInventory";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../firebase";

export default function InventoryPage() {
  // Auth + route
  const { currentUser: user } = useAuth();
  const { gameId }            = useParams();

  // Load game to check GM
  const [isGM, setIsGM] = useState(false);
  useEffect(() => {
    if (!gameId) return;
    getDoc(doc(db, "games", gameId)).then(snap => {
      if (snap.exists()) {
        setIsGM(snap.data().gmId === user.uid);
      }
    });
  }, [gameId, user.uid]);

  // Inventory hook
  const { items, addItem, removeItem } = useInventory();

  // Form state
  const [newName, setNewName] = useState("");
  const [newQty, setNewQty]   = useState(1);

  const handleAdd = async e => {
    e.preventDefault();
    if (!newName.trim()) return;
    await addItem({ name: newName.trim(), quantity: newQty });
    setNewName("");
    setNewQty(1);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-4">🔒 Shared Inventory</h1>

      {isGM && (
        <form onSubmit={handleAdd} className="mb-6 space-y-2 max-w-md">
          <h2 className="text-xl font-semibold text-yellow-400">➕ Add Item</h2>
          <input
            type="text"
            placeholder="Item name"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
          <input
            type="number"
            min={1}
            placeholder="Quantity"
            value={newQty}
            onChange={e => setNewQty(Number(e.target.value))}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 text-white"
          >
            Add to Inventory
          </button>
        </form>
      )}

      {items.length === 0 ? (
        <p className="text-gray-500">No items to display.</p>
      ) : (
        <ul className="space-y-4">
          {items.map(item => (
            <li key={item.id} className="bg-gray-800 p-4 rounded flex justify-between items-start">
              <div>
                <h2 className="font-semibold text-xl">{item.name}</h2>
                <p className="text-gray-300">Qty: {item.quantity}</p>
              </div>
              {isGM && (
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-600 text-2xl leading-none"
                  title="Delete"
                >
                  &times;
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
