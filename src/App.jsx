import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage"
import GamePage from './app/games/[gameId]/index.jsx'


function App() {
  return (
    <div className="p-4 text-white bg-gray-900 min-h-screen">
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/games/:gameId" element={<GamePage />} />
        {/* <Route path="/games/:gameId/sessions/:sessionId" element={<SessionsPage />} /> */}
      </Routes>
    </div>
  );
}
export default App;
