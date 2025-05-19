// src/pages/SessionDetailPage.jsx
import { useParams } from "react-router-dom";

export default function SessionDetailPage() {
  const { sessionId } = useParams();
  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Session {sessionId}</h1>
      <p className="text-gray-400">Detail view coming soon…</p>
    </div>
  );
}
