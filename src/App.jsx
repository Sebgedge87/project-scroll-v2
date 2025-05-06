import { Routes, Route, Navigate } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage"
import GamePage from "./pages/GamePage"



function App() {
  return (
    <div className="p-4 text-white bg-gray-900 min-h-screen">
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/games/:gameId" element={<GamePage />} />
      </Routes>
    </div>
  );
}
export default App;
