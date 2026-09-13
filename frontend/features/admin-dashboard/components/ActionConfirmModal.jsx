'use client';

import { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';

export default function ActionConfirmModal({
  isOpen,
  type = 'approve',
  applicantName = '',
  transactionId = '',
  onConfirm,
  onClose,
  isSubmitting = false,
}) {
  const [remarks, setRemarks] = useState('');
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setRemarks(type === 'approve' ? 'Registration approved by admin.' : '');
      setValidationError('');
    }
  }, [isOpen, type]);

  if (!isOpen) return null;

  const isApprove = type === 'approve';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isApprove && !remarks.trim()) {
      setValidationError('Please provide a reason for declining this registration.');
      return;
    }
    setValidationError('');
    onConfirm(remarks.trim());
  };

  return (
    <div className="db-modal-overlay" onClick={onClose} style={{ zIndex: 1000 }}>
      <div
        className="db-modal-box confirm-modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '460px',
          animation: 'confirmModalPop 0.22s ease-out forwards',
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem 1rem 1.5rem',
            borderBottom: '1px solid var(--dz-border, #f3f4f6)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: isApprove ? '#dcfce7' : '#fee2e2',
                color: isApprove ? '#166534' : '#991b1b',
                flexShrink: 0,
              }}
            >
              {isApprove ? <CheckCircle2 size={24} /> : <AlertTriangle size={24} />}
            </div>
            <div>
              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  letterSpacing: '0.6px',
                  textTransform: 'uppercase',
                  padding: '2px 7px',
                  borderRadius: '4px',
                  background: isApprove ? '#ecfdf5' : '#fef2f2',
                  color: isApprove ? '#15803d' : '#b91c1c',
                  border: `1px solid ${isApprove ? '#bbf7d0' : '#fecaca'}`,
                }}
              >
                {isApprove ? 'Confirm Approval' : 'Decline Registration'}
              </span>
              <h3 style={{ margin: '4px 0 0 0', fontSize: '1.15rem', fontWeight: 800, color: '#111827' }}>
                {isApprove ? 'Approve Registration?' : 'Decline Registration?'}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#9ca3af',
              padding: '4px',
              borderRadius: '6px',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit}>
          <div style={{ padding: '1.25rem 1.5rem' }}>
            {(applicantName || transactionId) && (
              <div
                style={{
                  background: '#f9fafb',
                  border: '1px solid #f3f4f6',
                  borderRadius: '10px',
                  padding: '0.75rem 1rem',
                  marginBottom: '1rem',
                }}
              >
                {applicantName && (
                  <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#1f2937' }}>
                    {applicantName}
                  </div>
                )}
                {transactionId && (
                  <div style={{ fontSize: '0.78rem', color: '#6b7280', marginTop: '2px' }}>
                    TxID: <strong>{transactionId}</strong>
                  </div>
                )}
              </div>
            )}

            <p style={{ fontSize: '0.88rem', color: '#4b5563', margin: '0 0 1rem 0', lineHeight: 1.5 }}>
              {isApprove
                ? 'Are you sure you want to approve this applicant? Their status will be updated to Verified.'
                : 'Please specify the reason for declining this candidate:'}
            </p>

            {!isApprove ? (
              <div>
                <textarea
                  value={remarks}
                  onChange={(e) => {
                    setRemarks(e.target.value);
                    if (e.target.value.trim()) setValidationError('');
                  }}
                  placeholder="e.g. Invalid payment screenshot, transaction ID mismatch..."
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '10px',
                    border: `1px solid ${validationError ? '#f87171' : '#d1d5db'}`,
                    outline: 'none',
                    fontSize: '0.85rem',
                    fontFamily: 'inherit',
                    resize: 'none',
                    boxSizing: 'border-box',
                  }}
                />
                {validationError && (
                  <div style={{ color: '#dc2626', fontSize: '0.78rem', marginTop: '4px', fontWeight: 700 }}>
                    {validationError}
                  </div>
                )}
              </div>
            ) : (
              <input
                type="text"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Optional remarks e.g. Payment verified via bank statement"
                style={{
                  width: '100%',
                  padding: '0.65rem 0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  outline: 'none',
                  fontSize: '0.82rem',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                }}
              />
            )}
          </div>

          {/* Modal Footer */}
          <div
            style={{
              padding: '1rem 1.5rem',
              background: '#f9fafb',
              borderTop: '1px solid #f3f4f6',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '0.75rem',
            }}
          >
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              style={{
                padding: '0.55rem 1.1rem',
                borderRadius: '9999px',
                border: '1px solid #d1d5db',
                background: '#ffffff',
                color: '#374151',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: '0.55rem 1.25rem',
                borderRadius: '9999px',
                border: 'none',
                background: isApprove ? '#16a34a' : '#dc2626',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: isApprove ? '0 4px 12px rgba(22, 163, 74, 0.25)' : '0 4px 12px rgba(220, 38, 38, 0.25)',
              }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={14} className="confirm-modal-spin" />
                  <span>Processing...</span>
                </>
              ) : isApprove ? (
                <>
                  <CheckCircle2 size={15} />
                  <span>Approve & Finalize</span>
                </>
              ) : (
                <>
                  <AlertTriangle size={15} />
                  <span>Confirm Decline</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes confirmModalPop {
          from {
            opacity: 0;
            transform: scale(0.94) translateY(6px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        :global(.confirm-modal-spin) {
          animation: confirmSpin 0.8s linear infinite;
        }
        @keyframes confirmSpin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
