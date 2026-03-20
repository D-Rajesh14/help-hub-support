import { useState } from 'react';

// Notice the "export default" at the start
export default function Login({ onLogin }) {
  const [u, setU] = useState('');
  const [p, setP] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(u, p);
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', textAlign: 'center' }}>
      <form onSubmit={handleSubmit} style={{ background: '#222', padding: '30px', borderRadius: '12px' }}>
        <h2>Staff Access 🔐</h2>
        <input 
          placeholder="Username" 
          value={u}
          onChange={e => setU(e.target.value)} 
          required 
          style={{ width: '100%', padding: '10px', marginBottom: '10px', boxSizing:'border-box' }} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={p}
          onChange={e => setP(e.target.value)} 
          required 
          style={{ width: '100%', padding: '10px', marginBottom: '20px', boxSizing:'border-box' }} 
        />
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#646cff', color: 'white', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
          LOGIN
        </button>
      </form>
    </div>
  );
}