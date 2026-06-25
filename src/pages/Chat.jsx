import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Chat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I am CyberShield AI 🛡️ Ask me anything about cybersecurity, coding, networking or anything else!' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const sendMessage = async () => {
    if (!input.trim()) return
    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)
    try {
      const res = await axios.post('http://127.0.0.1:5000/api/chat', { message: input })
      setMessages(prev => [...prev, { role: 'assistant', content: res.data.response }])
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, something went wrong!' }])
    }
    setLoading(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage()
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <button onClick={() => navigate('/dashboard')} className="back-btn">← Back</button>
        <div className="chat-title">🤖 CyberShield AI</div>
        <div className="chat-status">● Online</div>
      </div>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role === 'user' ? 'user-message' : 'ai-message'}`}>
            <div className="message-content">{msg.content}</div>
          </div>
        ))}
        {loading && (
          <div className="message ai-message">
            <div className="message-content typing">CyberShield is thinking...</div>
          </div>
        )}
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="chat-input"
        />
        <button onClick={sendMessage} className="send-btn" disabled={loading}>
          Send ➤
        </button>
      </div>
    </div>
  )
}

export default Chat
