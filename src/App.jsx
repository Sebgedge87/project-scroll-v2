import { Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
    <div className="p-4 text-white bg-gray-900 min-h-screen">
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/games/:gameId" element={<GamePage />} />
      </Routes>
    </div>
  )
}

// Temporary placeholder components
function DashboardPage() {
  return <h1 className="text-3xl font-bold">📋 Dashboard – List of Games</h1>
}

function GamePage() {
  return <h1 className="text-3xl font-bold">🎲 Game Page (/:gameId)</h1>
}

export default App
