import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import TicketForm from './components/TicketForm';
import StatusList from './components/StatusList';
import Login from './components/Login';

export default function App() {
  const [view, setView] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [staff, setStaff] = useState('');
  const [tickets, setTickets] = useState([]);
  
  // Form states
  const [name, setName] = useState('');
  const [prob, setProb] = useState('');

  const load = () => axios.get('http://localhost:5000/tickets').then(res => setTickets(res.data));
  useEffect(() => { load() }, []);

  // Summary logic
  const total = tickets.length;
  const solved = tickets.filter(t => t.status === 'Resolved').length;
  const pending = total - solved;

  const handleAdd = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/add', { name, problem: prob }).then(() => {
      alert("Ticket Sent! 🚀"); setName(''); setProb(''); load(); setView('status');
    });
  };

  const handleLogin = (u, p) => {
    axios.post('http://localhost:5000/login', { username: u, password: p })
      .then(res => { 
        setIsLoggedIn(true); 
        setStaff(res.data.user); 
        setView('admin'); 
      })
      .catch(() => alert("Access Denied! Check your credentials."));
  };

  const handleResolve = (id) => {
    axios.post(`http://localhost:5000/resolve/${id}`, { staffName: staff }).then(() => load());
  };

  return (
    <div style={{ backgroundColor: '#0f0f1a', color: 'white', minHeight: '100vh', fontFamily: 'Arial' }}>
      <Navbar setView={setView} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <div style={{ maxWidth: '850px', margin: 'auto', padding: '40px' }}>
        
        {/* --- STATUS SUMMARY HEADER --- */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', justifyContent: 'center' }}>
          <div style={{ background: '#1e1e2e', padding: '15px 25px', borderRadius: '12px', borderBottom: '4px solid #646cff', textAlign: 'center' }}>
            <h2 style={{ margin: 0 }}>{total}</h2> <small>TOTAL</small>
          </div>
          <div style={{ background: '#1e1e2e', padding: '15px 25px', borderRadius: '12px', borderBottom: '4px solid #2ed573', textAlign: 'center' }}>
            <h2 style={{ margin: 0, color: '#2ed573' }}>{solved}</h2> <small>SOLVED</small>
          </div>
          <div style={{ background: '#1e1e2e', padding: '15px 25px', borderRadius: '12px', borderBottom: '4px solid #ffa502', textAlign: 'center' }}>
            <h2 style={{ margin: 0, color: '#ffa502' }}>{pending}</h2> <small>PENDING</small>
          </div>
        </div>

        {/* --- DYNAMIC VIEWS --- */}
        {view === 'home' && (
          <TicketForm 
            name={name} setName={setName} 
            prob={prob} setProb={setProb} 
            handleAdd={handleAdd} 
          />
        )}

        {view === 'status' && (
          <StatusList tickets={tickets} isAdmin={false} />
        )}

        {view === 'login' && (
          <Login onLogin={handleLogin} />
        )}

        {view === 'admin' && isLoggedIn && (
          <StatusList 
            tickets={tickets} 
            isAdmin={true} 
            onResolve={handleResolve} 
          />
        )}
      </div>
    </div>
  );
}