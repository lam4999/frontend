import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin, onSwitch }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      onLogin();
    } catch (err) {
      setMsg(err.response?.data?.message || 'Lỗi đăng nhập');
    }
  };

  return (
    <div>
      <h2>Đăng nhập</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Tên đăng nhập" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Mật khẩu" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Đăng nhập</button>
      </form>
      <p>{msg}</p>
      <button onClick={onSwitch}>Chưa có tài khoản? Đăng ký</button>
    </div>
  );
}

export default Login;