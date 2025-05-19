// src/App.jsx
import DashboardPage from "./pages/DashboardPage";
import GamePage from './app/games/[gameId]/index.jsx';
import SessionsPage from "./pages/SessionsPage";
import SessionDetailPage from "./pages/SessionDetailPage";
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
       
        <Route
          path="/games/:gameId"
          element={
            <ProtectedRoute>
              <GamePage />
            </ProtectedRoute>
          }
        />

      
        {/* Sessions list */}
        <Route
          path="/games/:gameId/sessions"
          element={
            <ProtectedRoute>
              <SessionsPage />
            </ProtectedRoute>
          }
        />

        {/* Session detail */}
        <Route
          path="/games/:gameId/sessions/:sessionId"
          element={
            <ProtectedRoute>
              <SessionDetailPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
