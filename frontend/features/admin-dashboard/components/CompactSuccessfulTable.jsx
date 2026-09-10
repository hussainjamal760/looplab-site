'use client';

import { useState } from 'react';
import { CheckCircle2, Search, SlidersHorizontal, FileText } from 'lucide-react';

export default function CompactSuccessfulTable({ onApprove, onDecline, onViewAll }) {
  const [query, setQuery] = useState('');
  const [activePage, setActivePage] = useState(1);

  const initialRows = [
    { id: 1, name: 'Ayesha Khan', email: 'ayesha@gmail.com', roll: '2025-APC-12', init: 'AK', bg: '#e0f2fe' },
    { id: 2, name: 'Usman Tariq', email: 'usman@gmail.com', roll: '2025-APC-45', init: 'UT', bg: '#f3e8ff' },
    { id: 3, name: 'Zainab Fatima', email: 'zainab@gmail.com', roll: '2025-APC-67', init: 'ZF', bg: '#fce7f3' },
    { id: 4, name: 'Saad Ahmed', email: 'saad@gmail.com', roll: '2025-APC-35', init: 'SA', bg: '#dcfce7' },
    { id: 5, name: 'Hira Malik', email: 'hira@gmail.com', roll: '2025-APC-28', init: 'HM', bg: '#ffedd5' },
    { id: 6, name: 'Daniyal Ali', email: 'daniyal@gmail.com', roll: '2025-APC-51', init: 'DA', bg: '#e0e7ff' },
  ];

  const rows = initialRows.filter(
    (r) => r.name.toLowerCase().includes(query.toLowerCase()) || r.email.toLowerCase().includes(query.toLowerCase()) || r.roll.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="db-card">
      <div className="db-card__header" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.2rem' }}>
        <span className="db-card__title">
          <CheckCircle2 size={16} color="#7c3aed" />
          <span>Successful Registrations</span>
        </span>
        <span style={{ fontSize: '0.725rem', color: '#71717a', fontWeight: 600 }}>
          View all approved registrations with payment proof
        </span>
      </div>

      <div className="db-card__body">
        {/* Search & Filter Bar */}
        <div className="db-table-filter-bar">
          <div className="db-table-search">
            <Search size={14} color="#71717a" />
            <input
              type="text"
              placeholder="Search by name, email or roll no..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button type="button" className="db-filter-btn">
            <SlidersHorizontal size={13} />
            <span>Filter</span>
          </button>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table className="db-table-clean">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Roll No</th>
                <th>Payment Proof</th>
                <th style={{ textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span className="db-avatar-circle" style={{ background: row.bg }}>{row.init}</span>
                      <span>{row.name}</span>
                    </div>
                  </td>
                  <td style={{ color: '#52525b' }}>{row.email}</td>
                  <td>{row.roll}</td>
                  <td>
                    <button
                      type="button"
                      onClick={onViewAll}
                      style={{ border: '1px solid #d4d4d8', background: '#fafafa', borderRadius: 4, padding: '2px 4px', cursor: 'pointer', display: 'inline-flex' }}
                      title="Inspect Payment Slip"
                    >
                      <FileText size={14} color="#7c3aed" />
                    </button>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span className="db-pill-btn db-pill-btn--approve">Approved</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="db-pagination">
          <button type="button" className="db-page-btn" onClick={() => setActivePage((p) => Math.max(1, p - 1))}>&lt;</button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              type="button"
              className={`db-page-btn ${activePage === page ? 'active' : ''}`}
              onClick={() => setActivePage(page)}
            >
              {page}
            </button>
          ))}
          <button type="button" className="db-page-btn" onClick={() => setActivePage((p) => Math.min(5, p + 1))}>&gt;</button>
        </div>
      </div>
    </div>
  );
}
