'use client';

import { useState } from 'react';
import { Tag, Plus, Percent, Check, AlertCircle, ToggleLeft, ToggleRight } from 'lucide-react';
import CardOverflowMenu from '../components/CardOverflowMenu';

export default function PromoCodesView({ promoCodes, onCreatePromo, onUpdateDiscount, onToggleActive }) {
  const [newCode, setNewCode] = useState('');
  const [newDiscount, setNewDiscount] = useState(20);
  const [newMaxUses, setNewMaxUses] = useState(100);
  const [editingId, setEditingId] = useState(null);
  const [editDiscountVal, setEditDiscountVal] = useState('');

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newCode.trim()) return;
    onCreatePromo({
      code: newCode.trim().toUpperCase(),
      discountPercent: Number(newDiscount),
      maxUses: Number(newMaxUses),
    });
    setNewCode('');
  };

  const handleSaveDiscount = (id) => {
    onUpdateDiscount(id, Number(editDiscountVal));
    setEditingId(null);
  };

  return (
    <div className="db-view-container">
      <div className="db-view-header">
        <h1 className="db-view-title">Promo Codes Management</h1>
        <p className="db-view-desc">
          Generate campaign discount coupons and dynamically adjust percentage rates.
        </p>
      </div>

      <div className="db-grid" style={{ marginBottom: '1.5rem' }}>
        {/* Create Code Card */}
        <div className="db-card db-col-12">
          <div className="db-card__header">
            <div className="db-card__title-wrap">
              <span className="db-card__badge" style={{ background: '#e6fab9' }}>
                CREATOR
              </span>
              <span className="db-card__title">Generate New Promo Code</span>
            </div>
            <CardOverflowMenu cardTitle="Promo Creator" />
          </div>
          <div className="db-card__body">
            <form onSubmit={handleCreate} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, marginBottom: '4px' }}>
                  PROMO CODE STRING
                </label>
                <input
                  type="text"
                  placeholder="e.g. LOOP50"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  className="db-notes-input"
                  style={{ textTransform: 'uppercase', width: '100%' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, marginBottom: '4px' }}>
                  DISCOUNT PERCENTAGE (%)
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={newDiscount}
                  onChange={(e) => setNewDiscount(e.target.value)}
                  className="db-notes-input"
                  style={{ width: '100%' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, marginBottom: '4px' }}>
                  MAX REDEMPTIONS
                </label>
                <input
                  type="number"
                  min="1"
                  value={newMaxUses}
                  onChange={(e) => setNewMaxUses(e.target.value)}
                  className="db-notes-input"
                  style={{ width: '100%' }}
                  required
                />
              </div>

              <button type="submit" className="db-action-btn db-btn--primary" style={{ padding: '0.7rem 1.25rem' }}>
                <Plus size={16} />
                <span>Create Code</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Promo Codes Table */}
      <div className="db-table-card">
        <div className="db-table-toolbar">
          <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>Active Campaign Vouchers</span>
          <CardOverflowMenu cardTitle="Promo Codes Table" />
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="db-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Discount Rate</th>
                <th>Usage Status</th>
                <th>Active Toggle</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {promoCodes.map((promo) => (
                <tr key={promo._id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Tag size={16} color="#9E00FE" />
                      <strong style={{ letterSpacing: '0.04em', fontSize: '1rem' }}>{promo.code}</strong>
                    </div>
                  </td>
                  <td>
                    {editingId === promo._id ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                          type="number"
                          min="1"
                          max="100"
                          value={editDiscountVal}
                          onChange={(e) => setEditDiscountVal(e.target.value)}
                          style={{ width: '65px', padding: '4px 6px', border: '1.5px solid #1e1e1e', borderRadius: '4px' }}
                        />
                        <button
                          type="button"
                          className="db-action-btn db-btn--approve"
                          onClick={() => handleSaveDiscount(promo._id)}
                        >
                          <Check size={12} />
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontWeight: 900, color: '#29725f', fontSize: '1.1rem' }}>
                          {promo.discountPercent}% OFF
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(promo._id);
                            setEditDiscountVal(promo.discountPercent);
                          }}
                          style={{ fontSize: '0.75rem', color: '#6b7280', textDecoration: 'underline', border: 'none', background: 'transparent', cursor: 'pointer' }}
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </td>
                  <td>
                    <span style={{ fontWeight: 600 }}>
                      {promo.usedCount} / {promo.maxUses} redeemed
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => onToggleActive(promo._id)}
                      style={{ border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                    >
                      {promo.isActive ? (
                        <>
                          <ToggleRight size={26} color="#166534" />
                          <span style={{ fontWeight: 700, color: '#166534', fontSize: '0.8rem' }}>Active</span>
                        </>
                      ) : (
                        <>
                          <ToggleLeft size={26} color="#9ca3af" />
                          <span style={{ fontWeight: 700, color: '#6b7280', fontSize: '0.8rem' }}>Paused</span>
                        </>
                      )}
                    </button>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <span className={`db-badge ${promo.isActive ? 'db-badge--approved' : 'db-badge--declined'}`}>
                      {promo.isActive ? 'Live in Checkout' : 'Disabled'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
