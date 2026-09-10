'use client';

import { X, Check, AlertTriangle } from 'lucide-react';

export default function ProofReceiptModal({ proof, onClose, onApprove, onDecline }) {
  if (!proof) return null;

  return (
    <div className="db-modal-overlay" onClick={onClose}>
      <div className="db-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="db-card__header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ background: 'var(--dz-purple-soft)', color: 'var(--dz-purple-primary)', padding: '2px 8px', borderRadius: 6, fontWeight: 800, fontSize: '0.68rem', letterSpacing: '0.5px' }}>
              VERIFICATION
            </span>
            <h3 className="db-card__title" style={{ margin: 0 }}>Payment Proof Inspector</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--dz-text-muted)' }}
          >
            <X size={20} />
          </button>
        </div>

        <div className="db-card__body">
          <div style={{ marginBottom: '1rem' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--dz-text-primary)', margin: 0 }}>{proof.fullName}</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--dz-text-muted)', margin: '0.25rem 0' }}>
              {proof.email} · TxID: <strong>{proof.transactionId}</strong>
            </p>
            <div style={{ marginTop: '0.5rem', fontWeight: 800, color: '#15803d', fontSize: '1.25rem' }}>
              PKR {proof.amount}
            </div>
          </div>

          <div
            style={{
              border: '1px solid var(--dz-border)',
              borderRadius: '12px',
              overflow: 'hidden',
              background: '#000',
              maxHeight: '340px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {proof.proofUrl ? (
              <img
                src={proof.proofUrl}
                alt={`Receipt for ${proof.fullName}`}
                style={{ width: '100%', height: 'auto', maxHeight: '340px', objectFit: 'contain' }}
              />
            ) : (
              <div style={{ padding: '3rem', color: '#aaa' }}>No receipt image attached</div>
            )}
          </div>
        </div>

        <div
          style={{
            padding: '1rem 1.25rem',
            borderTop: '1px solid var(--dz-border)',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '0.75rem',
            background: '#f9fafb',
          }}
        >
          <button
            type="button"
            className="db-pill-action-btn db-pill-action-btn--decline"
            onClick={() => onDecline(proof._id)}
          >
            <AlertTriangle size={15} />
            <span>Decline Proof</span>
          </button>
          <button
            type="button"
            className="db-pill-action-btn db-pill-action-btn--approve"
            onClick={() => onApprove(proof._id)}
          >
            <Check size={15} />
            <span>Approve & Finalize</span>
          </button>
        </div>
      </div>
    </div>
  );
}
