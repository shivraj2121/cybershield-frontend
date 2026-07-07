import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function PasswordChecker() {
  const [password, setPassword] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const checkPassword = async () => {
    if (!password.trim()) return
    setLoading(true)
    try {
      const res = await axios.post('https://cybershield-backend-hij1.onrender.com/api/check-password', { password })
      setResult(res.data)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const getStrengthColor = (strength) => {
    if (strength === 'Weak') return '#ff4444'
    if (strength === 'Medium') return '#ffaa00'
    if (strength === 'Strong') return '#00bfa6'
    if (strength === 'Very Strong') return '#00ff88'
  }

  return (
    <div className="checker-container">
      <div className="checker-header">
        <button onClick={() => navigate('/dashboard')} className="back-btn">← Back</button>
        <div className="checker-title">🔐 Password Checker</div>
      </div>

      <div className="checker-box">
        <h2>How Strong is Your Password?</h2>
        <p className="checker-subtitle">Enter a password to analyze its strength</p>

        <input
          type="text"
          placeholder="Enter password to check..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="checker-input"
        />

        <button onClick={checkPassword} className="checker-btn" disabled={loading}>
          {loading ? 'Checking...' : 'Check Password'}
        </button>

        {result && (
          <div className="checker-result">
            <div className="strength-badge" style={{ color: getStrengthColor(result.strength) }}>
              {result.strength}
            </div>
            <div className="strength-bar">
              <div
                className="strength-fill"
                style={{
                  width: `${(result.score / 5) * 100}%`,
                  backgroundColor: getStrengthColor(result.strength)
                }}
              ></div>
            </div>
            {result.feedback.length > 0 && (
              <div className="feedback-list">
                <h4>Suggestions:</h4>
                {result.feedback.map((tip, index) => (
                  <div key={index} className="feedback-item">⚠️ {tip}</div>
                ))}
              </div>
            )}
            {result.feedback.length === 0 && (
              <div className="feedback-item">✅ Your password is very strong!</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default PasswordChecker