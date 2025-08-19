import React, { useState } from 'react';
import Register from './component/Register';
import Login from './component/Login';
import ChatBox from './component/Chat';

function App() {
  const [page, setPage] = useState(localStorage.getItem('token') ? 'chat' : 'login');

  const handleLogin = () => setPage('chat');
  const handleLogout = () => {
    localStorage.removeItem('token');
    setPage('login');
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 20, border: '1px solid #ddd', borderRadius: 8 }}>
      {page === 'login' && <Login onLogin={handleLogin} onSwitch={() => setPage('register')} />}
      {page === 'register' && <Register onSwitch={() => setPage('login')} />}
      {page === 'chat' && <ChatBox onLogout={handleLogout} />}
    </div>
  );
}

export default App;