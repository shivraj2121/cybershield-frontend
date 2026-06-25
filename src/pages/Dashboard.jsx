import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()
  const username = localStorage.getItem('username')

  const handleLogout = () => {
    localStorage.removeItem('username')
    navigate('/')
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-logo">🛡️ CyberShield</div>
        <div className="dashboard-user">
          <span>Welcome, <strong>{username}</strong></span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>

      <div className="dashboard-hero">
        <h1>Your Cyber Command Center</h1>
        <p>AI-powered tools to keep you safe in the digital world</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card" onClick={() => navigate('/chat')}>
          <div className="card-icon">🤖</div>
          <h3>AI Assistant</h3>
          <p>Chat with CybeSrShield AI about cybersecurity, coding, and anything else!</p>
          <button className="card-btn">Open Chat</button>
        </div>

        <div className="dashboard-card" onClick={() => navigate('/password-checker')}>
          <div className="card-icon">🔐</div>
          <h3>Password Checker</h3>
          <p>Check how strong your password is and get tips to improve it!</p>
          <button className="card-btn">Check Password</button>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">🌐</div>
          <h3>URL Analyzer</h3>
          <p>Analyze URLs for potential threats and malicious content!</p>
          <button className="card-btn">Coming Soon</button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
