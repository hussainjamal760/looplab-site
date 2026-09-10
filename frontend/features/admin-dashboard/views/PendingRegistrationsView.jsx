'use client';

import { useState } from 'react';
import { Eye, Check, X, Search, Clock, FileText } from 'lucide-react';
import CardOverflowMenu from '../components/CardOverflowMenu';

export default function PendingRegistrationsView({
  registrations,
  onUpdateStatus,
}) {
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const filtered = registrations.filter(
    (r) =>
      r.fullName.toLowerCase().includes(filterQuery.toLowerCase()) ||
      r.email.toLowerCase().includes(filterQuery.toLowerCase()) ||
      r.department.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const handleAdvance = (id, newStatus) => {
    onUpdateStatus(id, newStatus);
    setSelectedApplicant(null);
  };

  return (
    <div className="db-view-container">
      <div className="db-view-header">
        <h1 className="db-view-title">Pending Registrations</h1>
        <p className="db-view-desc">
          Review incoming candidates and transition them to review or approved status.
        </p>
      </div>

      <div className="db-table-card">
        <div className="db-table-toolbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Search size={16} color="#6b7280" />
            <input
              type="text"
              placeholder="Filter by name, email, or dept..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontSize: '0.85rem',
                fontWeight: 600,
                width: '240px',
              }}
            />
          </div>
          <CardOverflowMenu cardTitle="Pending Registrations Table" />
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="db-table">
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Institution / Dept</th>
                <th>Phone</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div style={{ fontWeight: 800 }}>{item.fullName}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                      {item.email}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 700 }}>{item.university}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                      {item.department}
                    </div>
                  </td>
                  <td style={{ fontWeight: 600 }}>{item.phone}</td>
                  <td>
                    <span className="db-badge db-badge--pending">
                      <Clock size={12} />
                      Pending Review
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      type="button"
                      className="db-action-btn db-btn--primary"
                      onClick={() => setSelectedApplicant(item)}
                    >
                      <Eye size={14} />
                      <span>Review Details</span>
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
                    No pending registrations found matching your query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Applicant Modal */}
      {selectedApplicant && (
        <div className="db-modal-overlay" onClick={() => setSelectedApplicant(null)}>
          <div className="db-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="db-card__header">
              <div className="db-card__title-wrap">
                <span className="db-card__badge" style={{ background: '#fef08a' }}>
                  APPLICATION DOSSIER
                </span>
                <h3 className="db-card__title">{selectedApplicant.fullName}</h3>
              </div>
              <button
                type="button"
                className="db-overflow-trigger"
                onClick={() => setSelectedApplicant(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="db-card__body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 800 }}>
                    UNIVERSITY
                  </div>
                  <div style={{ fontWeight: 700 }}>{selectedApplicant.university}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 800 }}>
                    DEPARTMENT
                  </div>
                  <div style={{ fontWeight: 700 }}>{selectedApplicant.department}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 800 }}>
                    EMAIL ADDRESS
                  </div>
                  <div style={{ fontWeight: 700 }}>{selectedApplicant.email}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 800 }}>
                    WHATSAPP / PHONE
                  </div>
                  <div style={{ fontWeight: 700 }}>{selectedApplicant.phone}</div>
                </div>
              </div>
            </div>

            <div
              style={{
                padding: '1rem 1.25rem',
                borderTop: '2px solid #1e1e1e',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '0.75rem',
                background: '#fafafa',
              }}
            >
              <button
                type="button"
                className="db-action-btn db-btn--decline"
                onClick={() => handleAdvance(selectedApplicant._id, 'declined')}
              >
                <X size={14} />
                <span>Decline Candidate</span>
              </button>
              <button
                type="button"
                className="db-action-btn db-btn--approve"
                onClick={() => handleAdvance(selectedApplicant._id, 'selected')}
              >
                <Check size={14} />
                <span>Select & Advance</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
