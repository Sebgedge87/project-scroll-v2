// src/App.jsx
import DashboardPage      from "./pages/DashboardPage";
import GamePage           from "./app/games/[gameId]";
import SessionsPage       from "./app/games/[gameId]/sessions";
import { Toaster }        from "react-hot-toast";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <div className="p-4 text-white bg-gray-900 min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<DashboardPage />} />

        <Route
          path="/games/:gameId"
          element={
            <ProtectedRoute>
              <GamePage />
            </ProtectedRoute>
          }
        >
          {/* Redirect /games/:gameId to sessions list */}
          <Route index element={<Navigate to="sessions" replace />} />

          {/* Sessions list view */}
          <Route
            path="sessions"
            element={
              <ProtectedRoute>
                <SessionsPage />
              </ProtectedRoute>
            }
          />

          {/* Session detail view (merged into SessionsPage) */}
          <Route
            path="sessions/:sessionId"
            element={
              <ProtectedRoute>
                <SessionsPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
