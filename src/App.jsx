// src/App.jsx
import DashboardPage      from "./pages/DashboardPage";
import GamePage           from "./app/games/[gameId]";
import SessionsPage       from "./app/games/[gameId]/sessions";
import SessionDetailPage  from "./app/games/[gameId]/sessions/[sessionId]";
import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <div className="p-4 text-white bg-gray-900 min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<DashboardPage />} />
       
       +    <Route
      path="/games/:gameId"
      element={
        <ProtectedRoute>
          <GamePage />
        </ProtectedRoute>
      }
    >
      {/* if someone hits /games/123 → redirect them to sessions */}
      <Route index element={<Navigate to="sessions" replace />} />

      {/* /games/:gameId/sessions */}
      <Route
        path="sessions"
        element={
          <ProtectedRoute>
            <SessionsPage />
          </ProtectedRoute>
        }
      />

      {/* /games/:gameId/sessions/:sessionId */}
      <Route
        path="sessions/:sessionId"
        element={
          <ProtectedRoute>
            <SessionDetailPage />
          </ProtectedRoute>
        }
      />
    </Route>
      </Routes>
    </div>
  );
}

export default App;
