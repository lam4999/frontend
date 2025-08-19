import React, { useState } from 'react';
import axios from 'axios';

function Register({ onSwitch }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', { username, password });
      setMsg('Đăng ký thành công! Bạn hãy đăng nhập.');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Lỗi đăng ký');
    }
  };

  return (
    <div>
      <h2>Đăng ký</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Tên đăng nhập" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Mật khẩu" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Đăng ký</button>
      </form>
      <p>{msg}</p>
      <button onClick={onSwitch}>Đã có tài khoản? Đăng nhập</button>
    </div>
  );
}

export default Register;