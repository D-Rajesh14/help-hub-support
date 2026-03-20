export default function Navbar({ setView, isLoggedIn, setIsLoggedIn }) {
  return (
    <nav style={{ 
      display: 'flex', justifyContent: 'space-between', padding: '15px 40px', 
      background: 'linear-gradient(90deg, #1e1e2e 0%, #252540 100%)', 
      borderBottom: '2px solid #646cff', boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
      position: 'sticky', top: 0, zIndex: 100 
    }}>
      <h2 style={{ margin: 0, color: '#646cff', cursor: 'pointer' }} onClick={() => setView('home')}>HelpHub 🛠️</h2>
      <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
        <span onClick={() => setView('home')} style={{ cursor: 'pointer', color: '#fff' }}>Submit</span>
        <span onClick={() => setView('status')} style={{ cursor: 'pointer', color: '#fff' }}>Live Status</span>
        {isLoggedIn ? (
          <button onClick={() => {setIsLoggedIn(false); setView('home')}} style={{ background: '#ff4757', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '20px', cursor: 'pointer' }}>Logout</button>
        ) : (
          <button onClick={() => setView('login')} style={{ background: 'transparent', color: '#646cff', border: '2px solid #646cff', padding: '5px 15px', borderRadius: '20px', cursor: 'pointer' }}>Staff Login</button>
        )}
      </div>
    </nav>
  );
}