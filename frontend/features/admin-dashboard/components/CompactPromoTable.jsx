'use client';

import { Tag, Plus } from 'lucide-react';

export default function CompactPromoTable({ onViewAll }) {
  const promos = [
    { code: 'SPRING25', discount: '15%', expiry: '30 Apr 2025', usage: '32/100', status: 'Active' },
    { code: 'WELCOME10', discount: '10%', expiry: '15 May 2025', usage: '18/50', status: 'Active' },
    { code: 'SUMMER20', discount: '20%', expiry: '30 Jun 2025', usage: '5/30', status: 'Active' },
    { code: 'FALL15', discount: '10%', expiry: '30 Sep 2025', usage: '5/30', status: 'Active' },
  ];

  return (
    <div className="db-card">
      <div className="db-card__header">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span className="db-card__title">
            <Tag size={16} color="#7c3aed" />
            <span>Promo Codes</span>
          </span>
          <span style={{ fontSize: '0.68rem', color: '#71717a', fontWeight: 600 }}>
            Create and manage discount codes for your event
          </span>
        </div>

        <button type="button" className="db-add-promo-btn" onClick={onViewAll}>
          <Plus size={13} />
          <span>Add Promo Code</span>
        </button>
      </div>

      <div className="db-card__body">
        <div style={{ overflowX: 'auto' }}>
          <table className="db-table-clean">
            <thead>
              <tr>
                <th>Code</th>
                <th>Discount</th>
                <th>Expiry Date</th>
                <th>Usage</th>
                <th>Status</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {promos.map((p, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 800, color: '#141416' }}>{p.code}</td>
                  <td>{p.discount}</td>
                  <td style={{ color: '#71717a' }}>{p.expiry}</td>
                  <td style={{ color: '#52525b' }}>{p.usage}</td>
                  <td>
                    <span className="db-pill-btn db-pill-btn--approve">{p.status}</span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', gap: '3px' }}>
                      <button type="button" className="db-pill-btn" onClick={onViewAll}>Edit</button>
                      <button type="button" className="db-pill-btn db-pill-btn--decline" onClick={onViewAll}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          style={{
            width: '100%',
            marginTop: '0.75rem',
            padding: '0.45rem',
            background: '#ede9fe',
            border: '1.5px solid #141416',
            borderRadius: '8px',
            fontWeight: 800,
            fontSize: '0.75rem',
            color: '#141416',
            cursor: 'pointer',
            boxShadow: '1.5px 1.5px 0px #141416',
          }}
        >
          + Add New Promo Code
        </button>
      </div>
    </div>
  );
}
