import React, { useState } from 'react';
import axios from 'axios';

function ChatBox({ onLogout }) {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:5000/api/chat/ask',
        { question },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages([...messages, { question, answer: res.data.answer }]);
      setQuestion('');
    } catch {
      setMessages([...messages, { question, answer: 'Lỗi hoặc hết phiên đăng nhập!' }]);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Chat với ChatGPT</h2>
      <button onClick={onLogout}>Đăng xuất</button>
      <div style={{ maxHeight: 300, overflowY: 'auto', border: '1px solid #ccc', margin: '10px 0', padding: 10 }}>
        {messages.map((msg, idx) => (
          <div key={idx}>
            <b>Bạn:</b> {msg.question}<br />
            <b>ChatGPT:</b> {msg.answer}<hr />
          </div>
        ))}
      </div>
      <form onSubmit={handleSend}>
        <input
          placeholder="Nhập câu hỏi..."
          value={question}
          onChange={e => setQuestion(e.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>Gửi</button>
      </form>
    </div>
  );
}

export default ChatBox;