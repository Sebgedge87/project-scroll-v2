import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage"
import GamePage from './app/games/[gameId]/index.jsx'
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <div className="p-4 text-white bg-gray-900 min-h-screen">
       <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/games/:gameId" element={<GamePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* <Route path="/games/:gameId/sessions/:sessionId" element={<SessionsPage />} /> */}
      </Routes>
    </div>
  );
}
export default App;
