import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Chat from './pages/Chat'
import PasswordChecker from './pages/PasswordChecker'

function App() {
  const isLoggedIn = localStorage.getItem('username')

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/chat" element={isLoggedIn ? <Chat /> : <Navigate to="/" />} />
        <Route path="/password-checker" element={isLoggedIn ? <PasswordChecker /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App