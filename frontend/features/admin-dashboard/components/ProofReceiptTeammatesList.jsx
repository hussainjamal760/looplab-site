'use client';

function TeammateItem({ tm, index }) {
  const isTmParking =
    tm.needsParking === 'Yes' ||
    tm.needsParking === true ||
    tm.needsParking === 'true' ||
    String(tm.needsParking || '').toLowerCase() === 'yes';

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '8px 10px', background: '#f5f3ff', borderRadius: '8px', border: '1px solid #ede9fe' }}>
      <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#7c3aed', color: '#fff', fontSize: '0.65rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
        {index + 2}
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', minWidth: 0 }}>
        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1e1b4b' }}>{tm.fullName || '—'}</span>
        <span style={{ fontSize: '0.74rem', color: '#6b7280' }}>{tm.email} · {tm.cnic}</span>
        {isTmParking ? (
          <span style={{ fontSize: '0.72rem', color: '#047857', fontWeight: 600 }}>🚗 Parking: {tm.vehicleType || 'Vehicle'} — {tm.vehicleNumber || 'N/A'}</span>
        ) : (
          <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>🅿️ Parking: Not required</span>
        )}
      </div>
    </div>
  );
}

export default function ProofReceiptTeammatesList({ teammates }) {
  if (!teammates || teammates.length === 0) return null;

  return (
    <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px dotted #cbd5e1' }}>
      <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>
        👥 Team Members ({teammates.length + 1} total)
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {teammates.map((tm, i) => (
          <TeammateItem key={i} tm={tm} index={i} />
        ))}
      </div>
    </div>
  );
}
