'use client';

import { useState } from 'react';
import { Check, X, Eye, FileCheck, Search, Image as ImageIcon } from 'lucide-react';
import ProofReceiptModal from '../components/ProofReceiptModal';
import CardOverflowMenu from '../components/CardOverflowMenu';

export default function SuccessfulRegistrationsView({ proofs, onApprove, onDecline }) {
  const [activeProof, setActiveProof] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = proofs.filter(
    (p) =>
      p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.transactionId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status) => {
    if (status === 'approved') {
      return (
        <span className="db-badge db-badge--approved">
          <Check size={12} /> Approved
        </span>
      );
    }
    if (status === 'declined') {
      return (
        <span className="db-badge db-badge--declined">
          <X size={12} /> Declined
        </span>
      );
    }
    return (
      <span className="db-badge db-badge--review">
        <FileCheck size={12} /> Proof Uploaded
      </span>
    );
  };

  return (
    <div className="db-view-container">
      <div className="db-view-header">
        <h1 className="db-view-title">Successful Registrations</h1>
        <p className="db-view-desc">
          Review submitted banking proofs, verify transaction IDs, and finalize approvals.
        </p>
      </div>

      <div className="db-table-card">
        <div className="db-table-toolbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Search size={16} color="#6b7280" />
            <input
              type="text"
              placeholder="Search by name, email, TxID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '0.85rem',
                fontWeight: 600,
                width: '260px',
              }}
            />
          </div>
          <CardOverflowMenu cardTitle="Verified Proofs Table" />
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="db-table">
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Transaction ID</th>
                <th>Fee Amount</th>
                <th>Payment Slip</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div style={{ fontWeight: 800 }}>{item.fullName}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{item.email}</div>
                  </td>
                  <td>
                    <code style={{ background: '#f3f4f6', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                      {item.transactionId}
                    </code>
                  </td>
                  <td>
                    <span style={{ fontWeight: 900, color: '#166534' }}>
                      PKR {item.amount}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="db-action-btn db-btn--view"
                      onClick={() => setActiveProof(item)}
                    >
                      <ImageIcon size={14} />
                      <span>View Receipt</span>
                    </button>
                  </td>
                  <td>{getStatusBadge(item.status)}</td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                      <button
                        type="button"
                        className="db-action-btn db-btn--approve"
                        onClick={() => onApprove(item._id)}
                        disabled={item.status === 'approved'}
                        title="Approve Registration"
                      >
                        <Check size={14} />
                        <span>Approve</span>
                      </button>
                      <button
                        type="button"
                        className="db-action-btn db-btn--decline"
                        onClick={() => onDecline(item._id)}
                        disabled={item.status === 'declined'}
                        title="Decline Registration"
                      >
                        <X size={14} />
                        <span>Decline</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
                    No payment proofs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ProofReceiptModal
        proof={activeProof}
        onClose={() => setActiveProof(null)}
        onApprove={(id) => {
          onApprove(id);
          setActiveProof(null);
        }}
        onDecline={(id) => {
          onDecline(id);
          setActiveProof(null);
        }}
      />
    </div>
  );
}
