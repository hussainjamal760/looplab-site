'use client';

import { useState } from 'react';
import { Plus, Check, X, Tag, Award, Users } from 'lucide-react';
import { HACKATHON_PROMOS } from '../data/hackathonPromos';

export default function PromoCodesPageView() {
  const [promos, setPromos] = useState(HACKATHON_PROMOS);
  const [showModal, setShowModal] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [newDiscount, setNewDiscount] = useState(25);
  const [newLimit, setNewLimit] = useState(100);

  const handleToggle = (id) => {
    setPromos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p))
    );
  };

  const handleAddCode = (e) => {
    e.preventDefault();
    if (!newCode.trim()) return;
    setPromos((prev) => [
      {
        id: `promo-${Date.now()}`,
        code: newCode.trim().toUpperCase(),
        discountPercent: Number(newDiscount),
        maxUses: Number(newLimit),
        usedCount: 0,
        isActive: true,
      },
      ...prev,
    ]);
    setShowModal(false);
    setNewCode('');
    setNewDiscount(25);
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--dz-text-primary)', margin: 0 }}>
              Promo Code Management
            </h1>
            <span
              className="admin-badge-sticker"
              style={{
                background: 'var(--color-orange)',
                color: '#ffffff',
                fontSize: '0.62rem',
                padding: '2px 8px',
                transform: 'rotate(-2deg)',
                margin: 0,
                border: 'none',
              }}
            >
              discounts & perks
            </span>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--dz-text-muted)', margin: '0.25rem 0 0 0' }}>
            Create discount vouchers, set percentage rates, and toggle live availability.
          </p>
        </div>

        <button type="button" className="db-btn-purple-pill" onClick={() => setShowModal(true)}>
          <Plus size={15} />
          <span>Add Promo Code</span>
        </button>
      </div>

      <div className="db-card" style={{ marginBottom: '1.25rem' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="db-table-clean">
            <thead>
              <tr>
                <th>Voucher Code</th>
                <th>Discount Percentage</th>
                <th>Beneficiary / Ambassador</th>
                <th>Redemptions</th>
                <th>Status</th>
                <th style={{ textAlign: 'center' }}>Active / Inactive Toggle</th>
              </tr>
            </thead>
            <tbody>
              {promos.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                      <Tag size={13} color="var(--dz-purple-primary)" />
                      <strong style={{ letterSpacing: '0.5px' }}>{p.code}</strong>
                    </div>
                  </td>
                  <td>
                    <span
                      style={{
                        fontWeight: 800,
                        color:
                          p.discountPercent === 50
                            ? '#ec4899'
                            : p.discountPercent === 30
                            ? '#f59e0b'
                            : p.discountPercent === 20
                            ? '#8b5cf6'
                            : 'var(--dz-purple-primary)',
                        background:
                          p.discountPercent === 50
                            ? '#fdf2f8'
                            : p.discountPercent === 30
                            ? '#fffbeb'
                            : 'var(--dz-purple-soft)',
                        padding: '2px 8px',
                        borderRadius: '6px',
                      }}
                    >
                      {p.discountPercent}% OFF
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--dz-text-primary)' }}>
                        {p.assignedTo || 'General Registration'}
                      </span>
                      {p.ambassadorCode && (
                        <span style={{ fontSize: '0.68rem', color: 'var(--dz-text-muted)', fontWeight: 600 }}>
                          Ref: {p.ambassadorCode}
                        </span>
                      )}
                    </div>
                  </td>
                  <td style={{ fontWeight: 600, fontSize: '0.78rem' }}>
                    {p.usedCount} / {p.maxUses}
                  </td>
                  <td>
                    <span className={`db-badge-status ${p.isActive ? 'db-badge-status--green' : 'db-badge-status--red'}`}>
                      {p.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      type="button"
                      onClick={() => handleToggle(p.id)}
                      style={{
                        padding: '4px 12px',
                        borderRadius: '9999px',
                        border: '1px solid var(--dz-border)',
                        background: p.isActive ? '#dcfce7' : '#f3f4f6',
                        color: p.isActive ? '#15803d' : '#6b7280',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {p.isActive ? 'Enabled (Click to Pause)' : 'Disabled (Click to Activate)'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="db-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="db-modal-box" style={{ padding: '1.5rem' }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--dz-text-primary)' }}>
              Add New Promo Code
            </h3>
            <form onSubmit={handleAddCode}>
              <div style={{ marginBottom: '0.85rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.3rem', color: 'var(--dz-text-secondary)' }}>
                  Promo Code String
                </label>
                <input
                  type="text"
                  placeholder="e.g. SUMMER50, VIP2026"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  required
                  style={{ width: '100%', padding: '0.55rem', border: '1px solid var(--dz-border)', borderRadius: '8px', outline: 'none' }}
                />
              </div>

              <div style={{ marginBottom: '0.85rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.3rem', color: 'var(--dz-text-secondary)' }}>
                  Discount Percentage (%)
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  placeholder="e.g. 25"
                  value={newDiscount}
                  onChange={(e) => setNewDiscount(e.target.value)}
                  required
                  style={{ width: '100%', padding: '0.55rem', border: '1px solid var(--dz-border)', borderRadius: '8px', outline: 'none' }}
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.3rem', color: 'var(--dz-text-secondary)' }}>
                  Max Usage Limit
                </label>
                <input
                  type="number"
                  min="1"
                  placeholder="e.g. 100"
                  value={newLimit}
                  onChange={(e) => setNewLimit(e.target.value)}
                  required
                  style={{ width: '100%', padding: '0.55rem', border: '1px solid var(--dz-border)', borderRadius: '8px', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <button type="button" onClick={() => setShowModal(false)} className="db-btn-white-pill">
                  Cancel
                </button>
                <button type="submit" className="db-btn-purple-pill">
                  Create Code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
