import React from 'react';

export default function TicketForm({ name, setName, prob, setProb, handleAdd }) {
  return (
    <div style={{ background: '#1e1e2e', padding: '30px', borderRadius: '15px', border: '1px solid #333', maxWidth: '500px', margin: 'auto' }}>
      <h2 style={{ color: '#646cff', textAlign: 'center' }}>Submit Ticket 🚀</h2>
      <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} required style={{ padding: '12px', borderRadius: '8px', background: '#0f0f1a', color: 'white', border: '1px solid #444' }} />
        <textarea placeholder="Describe the issue" value={prob} onChange={e => setProb(e.target.value)} required style={{ padding: '12px', borderRadius: '8px', background: '#0f0f1a', color: 'white', border: '1px solid #444', height: '100px' }} />
        <button type="submit" style={{ padding: '15px', background: 'linear-gradient(45deg, #646cff, #a064ff)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>SEND TICKET</button>
      </form>
    </div>
  );
}