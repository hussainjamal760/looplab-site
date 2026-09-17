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
          <div style={{ marginBottom: '1.25rem', background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--dz-text-primary)', margin: 0 }}>{proof.fullName}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--dz-text-muted)', margin: '0.2rem 0' }}>
                  {proof.email} {proof.phone ? `· ${proof.phone}` : ''} {proof.cnic ? `· CNIC: ${proof.cnic}` : ''}
                </p>
                <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0.2rem 0' }}>
                  TxID: <strong style={{ color: '#0f172a' }}>{proof.transactionId}</strong>
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Final Payable</div>
                <div style={{ fontWeight: 900, color: '#15803d', fontSize: '1.4rem' }}>
                  PKR {(proof.finalAmount ?? proof.amount ?? 0).toLocaleString()}
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginTop: '14px', paddingTop: '12px', borderTop: '1px dashed #cbd5e1', fontSize: '0.84rem' }}>
              <div>
                <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 700 }}>Selected Module</span>
                <strong style={{ color: '#0f172a' }}>{proof.module || '—'}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 700 }}>Track Mode</span>
                <strong style={{ color: '#6b21a8' }}>{proof.track || '—'}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 700 }}>Parking Requirement</span>
                <strong style={{ color: proof.needsParking ? '#047857' : '#64748b' }}>
                  {proof.parkingText || (proof.needsParking ? `Yes (${proof.vehicleType || 'Vehicle'} - ${proof.vehicleNumber || 'N/A'})` : 'Not required')}
                </strong>
              </div>
              <div>
                <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 700 }}>Promo Code Used</span>
                <strong style={{ color: proof.appliedPromoCode ? '#9333ea' : '#64748b' }}>
                  {proof.appliedPromoCode ? proof.appliedPromoCode : 'None'}
                </strong>
              </div>
            </div>

            {proof.baseAmount > 0 && (
              <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px dotted #cbd5e1', display: 'flex', gap: '16px', fontSize: '0.8rem', color: '#475569' }}>
                <span>Base Price: <strong>PKR {Number(proof.baseAmount).toLocaleString()}</strong></span>
                {proof.discountAmount > 0 && (
                  <span style={{ color: '#dc2626' }}>Discount: <strong>- PKR {Number(proof.discountAmount).toLocaleString()}</strong></span>
                )}
              </div>
            )}
          </div>

          <div
            style={{
              border: '1px solid var(--dz-border)',
              borderRadius: '12px',
              overflow: 'hidden',
              background: '#000',
              maxHeight: '320px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {proof.proofUrl || proof.paymentScreenshotUrl ? (
              <img
                src={proof.proofUrl || proof.paymentScreenshotUrl}
                alt={`Receipt for ${proof.fullName}`}
                style={{ width: '100%', height: 'auto', maxHeight: '320px', objectFit: 'contain' }}
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
