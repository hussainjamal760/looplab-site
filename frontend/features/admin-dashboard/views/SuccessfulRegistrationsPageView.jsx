'use client';

import { useState } from 'react';
import { Search, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';
import ProofReceiptModal from '../components/ProofReceiptModal';

const INITIAL_SUCCESSFUL = [
  { _id: 's-1', name: 'Wasiq Shafiq', email: 'wasiq215005@gmail.com', university: 'Team Member', txId: 'TXN-991204', amount: 1200, discount: '20% OFF (LL-REF-017)', approvedDate: '2026-09-07', proofUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80', status: 'Approved & Verified' },
  { _id: 's-2', name: 'Maryam Mubashar', email: 'maryam.mubasharrana@gmail.com', university: 'FAST NUCES', txId: 'TXN-883190', amount: 1350, discount: '10% OFF (LL-REF-019)', approvedDate: '2026-09-07', proofUrl: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=600&auto=format&fit=crop&q=80', status: 'Approved & Verified' },
  { _id: 's-3', name: 'Zainab Batool', email: 'zainabbee147@gmail.com', university: 'PUCIT', txId: 'TXN-773412', amount: 1350, discount: '10% OFF (LL-REF-032)', approvedDate: '2026-09-08', proofUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80', status: 'Approved & Verified' },
  { _id: 's-4', name: 'Jaweria Tahir', email: 'jaweriatahir368@gmail.com', university: 'NUST', txId: 'TXN-552190', amount: 1350, discount: '10% OFF (LL-REF-022)', approvedDate: '2026-09-08', proofUrl: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=600&auto=format&fit=crop&q=80', status: 'Approved & Verified' },
  { _id: 's-5', name: 'Sumiya Anjum', email: 'sumiyaanjum1115@gmail.com', university: 'Team Member', txId: 'TXN-441098', amount: 1350, discount: '10% OFF (LL-REF-022)', approvedDate: '2026-09-08', proofUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80', status: 'Approved & Verified' },
  { _id: 's-6', name: 'Syed Sheheryar', email: 'sitsme797@gmail.com', university: 'COMSATS', txId: 'TXN-332145', amount: 1350, discount: '10% OFF (LOOPVERSE3.0)', approvedDate: '2026-09-09', proofUrl: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=600&auto=format&fit=crop&q=80', status: 'Approved & Verified' },
];

export default function SuccessfulRegistrationsPageView() {
  const [query, setQuery] = useState('');
  const [selectedProof, setSelectedProof] = useState(null);

  const filtered = INITIAL_SUCCESSFUL.filter(
    (r) =>
      r.name.toLowerCase().includes(query.toLowerCase()) ||
      r.email.toLowerCase().includes(query.toLowerCase()) ||
      r.txId.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ marginBottom: '1.25rem', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--dz-text-primary)' }}>
            Successful Registrations
          </h1>
          <span
            className="admin-badge-sticker"
            style={{
              background: 'var(--color-lightgreen)',
              color: '#15803d',
              fontSize: '0.62rem',
              padding: '2px 8px',
              transform: 'rotate(2deg)',
              margin: 0,
            }}
          >
            verified & paid
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginTop: '0.35rem' }}>
          <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#15803d' }}>{INITIAL_SUCCESSFUL.length}</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--dz-text-muted)', fontWeight: 600 }}>Verified & Paid Members</span>
        </div>
      </div>

      <div className="db-card">
        {/* Search */}
        <div className="db-table-toolbar">
          <div className="db-table-search-pill">
            <Search size={14} color="#9ca3af" />
            <input
              type="text"
              placeholder="Search verified member, email, or TxID..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table className="db-table-clean">
            <thead>
              <tr>
                <th>Member</th>
                <th>University</th>
                <th>Transaction ID</th>
                <th>Amount</th>
                <th>Approved Date</th>
                <th>Audit Proof</th>
                <th style={{ textAlign: 'center' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r._id}>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 700 }}>{r.name}</span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--dz-text-muted)' }}>{r.email}</span>
                    </div>
                  </td>
                  <td>{r.university}</td>
                  <td>
                    <code style={{ fontSize: '0.75rem', background: '#f3f4f6', padding: '2px 6px', borderRadius: 4 }}>
                      {r.txId}
                    </code>
                  </td>
                  <td style={{ fontWeight: 800, color: '#15803d' }}>PKR {r.amount}</td>
                  <td style={{ color: 'var(--dz-text-muted)' }}>{r.approvedDate}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => setSelectedProof({ ...r, fullName: r.name, transactionId: r.txId })}
                      style={{
                        border: '1px solid var(--dz-border)',
                        background: '#ffffff',
                        borderRadius: 6,
                        padding: '3px 8px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: 'var(--dz-purple-primary)',
                      }}
                    >
                      <FileText size={14} />
                      <span>Audit Receipt</span>
                    </button>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span className="db-badge-status db-badge-status--green" style={{ gap: '3px' }}>
                      <ShieldCheck size={12} />
                      <span>{r.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ProofReceiptModal
        proof={selectedProof}
        onClose={() => setSelectedProof(null)}
        onApprove={() => setSelectedProof(null)}
        onDecline={() => setSelectedProof(null)}
      />
    </div>
  );
}
