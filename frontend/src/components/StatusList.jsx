export default function StatusList({ tickets, isAdmin, onResolve }) {
  return (
    <div>
      <h2 style={{ textAlign: 'center', margin: '30px 0' }}>{isAdmin ? "Admin Control Center" : "Live Ticket Updates"}</h2>
      {tickets.map(t => (
        <div key={t.id} style={{ 
          background: '#1e1e2e', padding: '20px', marginBottom: '15px', borderRadius: '12px', 
          borderLeft: t.status === 'Resolved' ? '10px solid #2ed573' : '10px solid #ffa502',
          boxShadow: '0 5px 15px rgba(0,0,0,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div>
            <h4 style={{ margin: 0, color: '#fff', fontSize: '18px' }}>{t.customer_name}</h4>
            <p style={{ margin: '8px 0', color: '#ccc' }}>{t.problem_text}</p>
            <span style={{ 
              fontSize: '12px', padding: '4px 10px', borderRadius: '4px', 
              background: t.status === 'Resolved' ? 'rgba(46, 213, 115, 0.2)' : 'rgba(255, 165, 2, 0.2)',
              color: t.status === 'Resolved' ? '#2ed573' : '#ffa502', fontWeight: 'bold'
            }}>
              {t.status.toUpperCase()} {t.resolved_by && `| BY: ${t.resolved_by}`}
            </span>
          </div>
          {isAdmin && t.status === 'Open' && (
            <button onClick={() => onResolve(t.id)} style={{ 
              background: '#2ed573', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' 
            }}>RESOLVE ✅</button>
          )}
        </div>
      ))}
    </div>
  );
}