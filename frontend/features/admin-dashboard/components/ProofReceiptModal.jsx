'use client';

import { useState } from 'react';
import { X, Check, AlertTriangle, ExternalLink, Copy, CheckCircle2, FileText } from 'lucide-react';

export default function ProofReceiptModal({ proof, onClose, onApprove, onDecline }) {
  const [copiedTx, setCopiedTx] = useState(false);

  if (!proof) return null;

  const handleCopyTx = () => {
    if (proof.transactionId) {
      navigator.clipboard.writeText(proof.transactionId);
      setCopiedTx(true);
      setTimeout(() => setCopiedTx(false), 2000);
    }
  };

  const finalPayable = proof.discountAmount > 0
    ? Math.max(0, (proof.baseAmount ?? 1000) - (proof.discountAmount ?? 0))
    : (proof.finalAmount ?? proof.amount ?? proof.baseAmount ?? 0);

  const proofImg = proof.proofUrl || proof.paymentScreenshotUrl;

  return (
    <div className="db-modal-overlay" onClick={onClose}>
      <div className="db-modal-box db-modal-box--proof" onClick={(e) => e.stopPropagation()}>
        <ModalHeader onClose={onClose} />
        <div className="proof-modal-content">
          <DetailsColumn
            proof={proof}
            finalPayable={finalPayable}
            copiedTx={copiedTx}
            onCopyTx={handleCopyTx}
          />
          <ImageColumn proofImg={proofImg} fullName={proof.fullName} />
        </div>
        <ModalFooter proofId={proof._id} onDecline={onDecline} onApprove={onApprove} />
      </div>
    </div>
  );
}

function ModalHeader({ onClose }) {
  return (
    <div className="db-card__header" style={{ padding: '1.15rem 1.35rem', borderBottom: '1px solid #e2e8f0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
        <span style={{ background: 'var(--dz-purple-soft)', color: 'var(--dz-purple-primary)', padding: '3px 10px', borderRadius: 6, fontWeight: 800, fontSize: '0.7rem', letterSpacing: '0.5px' }}>
          VERIFICATION INSPECTOR
        </span>
        <h3 className="db-card__title" style={{ margin: 0, fontSize: '1.15rem' }}>Payment Proof Verification</h3>
      </div>
      <button
        type="button"
        onClick={onClose}
        style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--dz-text-muted)', transition: 'all 0.15s ease' }}
      >
        <X size={18} />
      </button>
    </div>
  );
}

function DetailsColumn({ proof, finalPayable, copiedTx, onCopyTx }) {
  return (
    <div className="proof-details-card">
      <div className="proof-user-header">
        <div>
          <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--dz-text-primary)', margin: 0 }}>{proof.fullName}</h4>
          <p style={{ fontSize: '0.84rem', color: 'var(--dz-text-muted)', margin: '0.25rem 0 0 0' }}>{proof.email}</p>
          {(proof.phone || proof.cnic) && (
            <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0.15rem 0 0 0' }}>
              {proof.phone} {proof.cnic ? `· CNIC: ${proof.cnic}` : ''}
            </p>
          )}
        </div>
        {proof.transactionId && (
          <button type="button" onClick={onCopyTx} className="proof-txid-badge" title="Click to copy TxID">
            <span>TxID: {proof.transactionId}</span>
            {copiedTx ? <CheckCircle2 size={13} color="#16a34a" /> : <Copy size={13} />}
          </button>
        )}
      </div>

      <div className="proof-amount-card">
        <div>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#15803d', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Final Payable Amount</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#14532d', lineHeight: 1.1, marginTop: '2px' }}>
            PKR {Number(finalPayable).toLocaleString()}
          </div>
        </div>
        {proof.discountAmount > 0 && (
          <div style={{ textAlign: 'right', fontSize: '0.78rem' }}>
            <span style={{ background: '#fef2f2', color: '#dc2626', padding: '2px 8px', borderRadius: '6px', fontWeight: 800 }}>
              - PKR {Number(proof.discountAmount).toLocaleString()} OFF
            </span>
          </div>
        )}
      </div>

      <div className="proof-stats-grid">
        <div className="proof-stat-box">
          <span className="proof-stat-label">Selected Module</span>
          <span className="proof-stat-value">{proof.module || '—'}</span>
        </div>
        <div className="proof-stat-box">
          <span className="proof-stat-label">Track Mode</span>
          <span className="proof-stat-value" style={{ color: '#6b21a8' }}>{proof.track || '—'}</span>
        </div>
        <div className="proof-stat-box">
          <span className="proof-stat-label">Parking Requirement</span>
          <span className="proof-stat-value" style={{ color: proof.needsParking ? '#047857' : '#64748b' }}>
            {proof.parkingText || (proof.needsParking ? `Yes (${proof.vehicleType || 'Vehicle'} - ${proof.vehicleNumber || 'N/A'})` : 'Not required')}
          </span>
        </div>
        <div className="proof-stat-box">
          <span className="proof-stat-label">Applied Promo Code</span>
          <span className="proof-stat-value" style={{ color: proof.appliedPromoCode ? '#9333ea' : '#64748b' }}>
            {proof.appliedPromoCode || 'None'}
          </span>
        </div>
      </div>

      {proof.baseAmount > 0 && (
        <div style={{ paddingTop: '8px', borderTop: '1px dotted #cbd5e1', display: 'flex', gap: '14px', fontSize: '0.8rem', color: '#475569', flexWrap: 'wrap' }}>
          <span>Base Price: <strong>PKR {Number(proof.baseAmount).toLocaleString()}</strong></span>
          {proof.discountAmount > 0 && (
            <span style={{ color: '#dc2626' }}>Discount: <strong>- PKR {Number(proof.discountAmount).toLocaleString()}</strong></span>
          )}
        </div>
      )}

      {/* Team Members */}
      {proof.teammates && proof.teammates.length > 0 && (
        <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px dotted #cbd5e1' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>
            👥 Team Members ({proof.teammates.length + 1} total)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {proof.teammates.map((tm, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '8px 10px', background: '#f5f3ff', borderRadius: '8px', border: '1px solid #ede9fe' }}>
                <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#7c3aed', color: '#fff', fontSize: '0.65rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                  {i + 2}
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', minWidth: 0 }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1e1b4b' }}>{tm.fullName || '—'}</span>
                  <span style={{ fontSize: '0.74rem', color: '#6b7280' }}>{tm.email} · {tm.cnic}</span>
                  {tm.needsParking === 'Yes' && (
                    <span style={{ fontSize: '0.72rem', color: '#047857', fontWeight: 600 }}>🚗 Parking: {tm.vehicleType} — {tm.vehicleNumber}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ImageColumn({ proofImg, fullName }) {
  return (
    <div className="proof-image-section">
      <div className="proof-image-toolbar">
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <FileText size={14} />
          <span>Uploaded Screenshot</span>
        </span>
        {proofImg && (
          <a
            href={proofImg}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#38bdf8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}
          >
            <span>Open Original</span>
            <ExternalLink size={13} />
          </a>
        )}
      </div>
      <div className="proof-image-wrapper">
        {proofImg ? (
          <img src={proofImg} alt={`Receipt for ${fullName}`} className="proof-image-preview" />
        ) : (
          <div style={{ padding: '3rem 2rem', textAlign: 'center', color: '#64748b' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🧾</div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#94a3b8' }}>No receipt uploaded</div>
            <div style={{ fontSize: '0.8rem', marginTop: '0.25rem', color: '#64748b' }}>
              This registration was submitted without a payment screenshot
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ModalFooter({ proofId, onDecline, onApprove }) {
  return (
    <div
      style={{
        padding: '1rem 1.35rem',
        borderTop: '1px solid #e2e8f0',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '0.75rem',
        background: '#f8fafc',
      }}
    >
      <button
        type="button"
        className="db-pill-action-btn db-pill-action-btn--decline"
        onClick={() => onDecline(proofId)}
        style={{ padding: '0.55rem 1.25rem', fontSize: '0.82rem' }}
      >
        <AlertTriangle size={15} />
        <span>Decline Proof</span>
      </button>
      <button
        type="button"
        className="db-pill-action-btn db-pill-action-btn--approve"
        onClick={() => onApprove(proofId)}
        style={{ padding: '0.55rem 1.35rem', fontSize: '0.82rem' }}
      >
        <Check size={16} />
        <span>Approve & Finalize</span>
      </button>
    </div>
  );
}
