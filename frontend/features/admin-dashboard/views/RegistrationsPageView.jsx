'use client';

import { useState } from 'react';
import { Search, SlidersHorizontal, FileText, Eye } from 'lucide-react';
import ProofReceiptModal from '../components/ProofReceiptModal';

const INITIAL_PENDING = [
  { _id: 'p-1', name: 'Daniyal Arqam Talha', email: 'f2023332028@umt.edu.pk', university: 'UMT', event: 'LoopLearn Hackathon', date: '2026-09-06', amount: 750, discount: '50% OFF (DANIYAL-50)', proofUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80', status: 'Pending Review' },
  { _id: 'p-2', name: 'Azeem Sarwar', email: 'azeemsarwar45.pk@gmail.com', university: 'Team Member', event: 'LoopLearn Hackathon', date: '2026-09-06', amount: 1050, discount: '30% OFF (AZEEM-30)', proofUrl: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=600&auto=format&fit=crop&q=80', status: 'Pending Review' },
  { _id: 'p-3', name: 'Yar Muhammad Awaim', email: 'yarmuhammadawaim@gmail.com', university: 'Team Member', event: 'LoopLearn Hackathon', date: '2026-09-06', amount: 1050, discount: '30% OFF (YAR-30)', proofUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80', status: 'Pending Review' },
  { _id: 'p-4', name: 'Umer Mujahid', email: 'umermujahid4738@gmail.com', university: 'FAST NUCES', event: 'LoopLearn Hackathon', date: '2026-09-06', amount: 1200, discount: '20% OFF (LL-REF-034)', proofUrl: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=600&auto=format&fit=crop&q=80', status: 'Pending Review' },
  { _id: 'p-5', name: 'M. Basim Irfan', email: 'mbasimirfan65@gmail.com', university: 'COMSATS', event: 'LoopLearn Hackathon', date: '2026-09-06', amount: 1200, discount: '20% OFF (LL-REF-034)', proofUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80', status: 'Pending Review' },
  { _id: 'p-6', name: 'Ammar Ahmad', email: 'a25ammar127@gmail.com', university: 'NUST', event: 'LoopLearn Hackathon', date: '2026-09-06', amount: 1200, discount: '20% OFF (LL-REF-017)', proofUrl: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=600&auto=format&fit=crop&q=80', status: 'Pending Review' },
  { _id: 'p-7', name: 'Shehzadi Kainat', email: 'ramzankynat@gmail.com', university: 'IBA', event: 'LoopLearn Hackathon', date: '2026-09-06', amount: 1350, discount: '10% OFF (LL-REF-001)', proofUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80', status: 'Pending Review' },
];

export default function RegistrationsPageView() {
  const [query, setQuery] = useState('');
  const [rows, setRows] = useState(INITIAL_PENDING);
  const [selectedProof, setSelectedProof] = useState(null);

  const filtered = rows.filter(
    (r) =>
      r.name.toLowerCase().includes(query.toLowerCase()) ||
      r.email.toLowerCase().includes(query.toLowerCase()) ||
      r.date.includes(query)
  );

  const handleStatusChange = (id, newStatus) => {
    setRows((prev) => prev.map((r) => (r._id === id ? { ...r, status: newStatus } : r)));
    setSelectedProof(null);
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ marginBottom: '1.25rem', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--dz-text-primary)' }}>
            Pending Registrations
          </h1>
          <span
            className="admin-badge-sticker"
            style={{
              background: 'var(--color-pink)',
              color: '#000',
              fontSize: '0.62rem',
              padding: '2px 8px',
              transform: 'rotate(-3deg)',
              margin: 0,
            }}
          >
            action required
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginTop: '0.35rem' }}>
          <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--dz-purple-primary)' }}>{rows.length}</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--dz-text-muted)', fontWeight: 600 }}>Awaiting Admin Review</span>
        </div>
      </div>

      <div className="db-card">
        {/* Search & Filter */}
        <div className="db-table-toolbar">
          <div className="db-table-search-pill">
            <Search size={14} color="#9ca3af" />
            <input
              type="text"
              placeholder="Filter by name, email, or date (YYYY-MM-DD)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button type="button" className="db-btn-white-pill" style={{ padding: '0.4rem 0.85rem', fontSize: '0.75rem' }}>
            <SlidersHorizontal size={13} />
            <span>Filter</span>
          </button>
        </div>

        {/* Pending Table */}
        <div style={{ overflowX: 'auto' }}>
          <table className="db-table-clean">
            <thead>
              <tr>
                <th>Applicant</th>
                <th>University</th>
                <th>Event</th>
                <th>Applied Date</th>
                <th>Receipt</th>
                <th>Status</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
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
                  <td>{r.event}</td>
                  <td style={{ color: 'var(--dz-text-muted)' }}>{r.date}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => setSelectedProof({ ...r, fullName: r.name, transactionId: `TXN-${r._id}981` })}
                      style={{
                        border: '1px solid var(--dz-border)',
                        background: '#ffffff',
                        borderRadius: 6,
                        padding: '3px 7px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: 'var(--dz-purple-primary)',
                      }}
                    >
                      <Eye size={13} />
                      <span>View</span>
                    </button>
                  </td>
                  <td>
                    <span
                      className={`db-badge-status ${
                        r.status === 'Approved'
                          ? 'db-badge-status--green'
                          : r.status === 'Declined'
                          ? 'db-badge-status--red'
                          : 'db-badge-status--orange'
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', gap: '4px' }}>
                      <button
                        type="button"
                        className="db-pill-action-btn db-pill-action-btn--approve"
                        onClick={() => handleStatusChange(r._id, 'Approved')}
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        className="db-pill-action-btn db-pill-action-btn--decline"
                        onClick={() => handleStatusChange(r._id, 'Declined')}
                      >
                        Decline
                      </button>
                    </div>
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
        onApprove={(id) => handleStatusChange(selectedProof?._id, 'Approved')}
        onDecline={(id) => handleStatusChange(selectedProof?._id, 'Declined')}
      />
    </div>
  );
}
