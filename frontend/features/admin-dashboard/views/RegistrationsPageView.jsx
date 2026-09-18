'use client';

import { useMemo, useState } from 'react';
import {
  Search,
  Eye,
  RefreshCw,
  Loader2,
} from 'lucide-react';

import ProofReceiptModal from '../components/ProofReceiptModal';
import ActionConfirmModal from '../components/ActionConfirmModal';
import RegistrationFilterBar from '../components/RegistrationFilterBar';
import { exportToExcel, exportToPDF } from '../utils/exportHelpers';

import {
  useGetAdminRegistrationsQuery,
  useUpdateRegistrationStatusMutation,
} from '@/store/api/adminApi';

function getParticipant(registration) {
  return registration?.participantData || {};
}

function getRegistrations(data) {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.registrations)) {
    return data.registrations;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  if (Array.isArray(data?.data?.data)) {
    return data.data.data;
  }

  if (Array.isArray(data?.data?.registrations)) {
    return data.data.registrations;
  }

  return [];
}

function getEventTitle(registration) {
  if (
    registration?.eventId &&
    typeof registration.eventId === 'object'
  ) {
    return registration.eventId.title || 'Loopverse 3.0';
  }

  return 'Loopverse 3.0';
}

function formatDate(value) {
  if (!value) return '—';

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '—';
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export default function RegistrationsPageView() {
  const [query, setQuery] = useState('');
  const [moduleFilter, setModuleFilter] = useState('All Modules');
  const [trackFilter, setTrackFilter] = useState('All Tracks');
  const [parkingFilter, setParkingFilter] = useState('All Parking');
  const [promoFilter, setPromoFilter] = useState('All Promo');

  const [selectedProof, setSelectedProof] = useState(null);
  const [processingId, setProcessingId] = useState(null);
  const [removedIds, setRemovedIds] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmModalState, setConfirmModalState] = useState({
    isOpen: false,
    type: 'approve',
    registration: null,
  });

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetAdminRegistrationsQuery({
    status: 'pending',
    page: 1,
    limit: 100,
  });

  const [
    updateRegistrationStatus,
    { isLoading: isUpdating },
  ] = useUpdateRegistrationStatusMutation();

  const rows = useMemo(() => {
    const registrations = getRegistrations(data);

    return registrations.filter((registration) => {
      const isPending =
        registration.paymentStatus === 'pending' ||
        registration.status === 'pending' ||
        registration.status === 'Pending' ||
        !registration.paymentStatus;

      const isRemoved = removedIds.includes(registration._id);

      return isPending && !isRemoved;
    });
  }, [data, removedIds]);

  const filteredRows = useMemo(() => {
    const searchText = query.trim().toLowerCase();

    return rows.filter((registration) => {
      const p = getParticipant(registration);

      // Search Query Filter
      if (searchText) {
        const searchableText = [
          p.fullName,
          p.email,
          p.phone,
          p.cnic,
          p.university,
          p.department,
          p.module,
          p.moduleName,
          p.trackSelect,
          getEventTitle(registration),
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();

        if (!searchableText.includes(searchText)) return false;
      }

      // Module Filter
      if (moduleFilter !== 'All Modules') {
        const modName = (p.module || p.moduleName || p.trackSelect || '').toLowerCase();
        if (!modName.includes(moduleFilter.toLowerCase())) return false;
      }

      // Track Filter
      if (trackFilter !== 'All Tracks') {
        const trackVal = (p.track || p.attendanceMode || '').toLowerCase();
        if (trackFilter === 'Onsite' && !trackVal.includes('onsite')) return false;
        if (trackFilter === 'Virtual' && !trackVal.includes('virtual')) return false;
      }

      // Parking Filter
      if (parkingFilter !== 'All Parking') {
        const isParkingReq =
          p.needsParking === 'Yes' ||
          p.needsParking === true ||
          p.needsParking === 'true' ||
          String(p.needsParking).toLowerCase() === 'yes';

        if (parkingFilter === 'Yes' && !isParkingReq) return false;
        if (parkingFilter === 'No' && isParkingReq) return false;
      }

      // Promo Filter
      if (promoFilter !== 'All Promo') {
        const hasPromo = Boolean(registration.appliedPromoCode || p.appliedPromoCode);
        if (promoFilter === 'With Promo' && !hasPromo) return false;
        if (promoFilter === 'No Promo' && hasPromo) return false;
      }

      return true;
    });
  }, [query, moduleFilter, trackFilter, parkingFilter, promoFilter, rows]);

  function handleResetFilters() {
    setQuery('');
    setModuleFilter('All Modules');
    setTrackFilter('All Tracks');
    setParkingFilter('All Parking');
    setPromoFilter('All Promo');
  }

  function handleExportExcel() {
    exportToExcel(filteredRows, 'Loopverse_Pending_Registrations');
  }

  function handleExportPDF() {
    exportToPDF(filteredRows, 'Pending Registrations Report', 'Loopverse_Pending_Registrations');
  }

  function removeRow(id) {
    setRemovedIds((previousIds) => {
      if (previousIds.includes(id)) {
        return previousIds;
      }

      return [...previousIds, id];
    });
  }

  async function changeStatus({
    id,
    status,
    remarks,
  }) {
    if (!id || isUpdating) return;

    setProcessingId(id);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await updateRegistrationStatus({
        id,
        status,
        adminRemarks: remarks,
      }).unwrap();

      removeRow(id);
      setSelectedProof(null);

      setSuccessMessage(
        status === 'verified'
          ? 'Registration approved successfully.'
          : 'Registration declined successfully.'
      );

      await refetch();
    } catch (requestError) {
      const message =
        requestError?.data?.message ||
        requestError?.error ||
        'Registration status update failed.';

      const lowercaseMessage = message.toLowerCase();

      /*
       * If backend says it is already verified/rejected,
       * it should not remain in Pending Registrations.
       */
      if (
        lowercaseMessage.includes('already been verified') ||
        lowercaseMessage.includes('already verified') ||
        lowercaseMessage.includes('already been rejected') ||
        lowercaseMessage.includes('already rejected') ||
        lowercaseMessage.includes('already approved')
      ) {
        removeRow(id);
        setSelectedProof(null);

        setSuccessMessage(
          'This registration was already reviewed. Pending list has been updated.'
        );

        await refetch();
        return;
      }

      setErrorMessage(message);
    } finally {
      setProcessingId(null);
    }
  }

  function openApproveModal(registration) {
    setConfirmModalState({
      isOpen: true,
      type: 'approve',
      registration,
    });
  }

  function openDeclineModal(registration) {
    setConfirmModalState({
      isOpen: true,
      type: 'decline',
      registration,
    });
  }

  async function handleConfirmModalAction(remarks) {
    const { type, registration } = confirmModalState;
    if (!registration) return;

    const id = registration._id || registration.id;
    setConfirmModalState((prev) => ({ ...prev, isOpen: false }));

    if (type === 'approve') {
      await changeStatus({
        id,
        status: 'verified',
        remarks: remarks || 'Registration approved by admin.',
      });
    } else {
      await changeStatus({
        id,
        status: 'rejected',
        remarks: remarks || 'Registration declined by admin.',
      });
    }
  }

  function openReceipt(registration) {
    const participant = getParticipant(registration);
    const isParkingRequired =
      participant.needsParking === 'Yes' ||
      participant.needsParking === true ||
      participant.needsParking === 'true' ||
      String(participant.needsParking).toLowerCase() === 'yes';

    setSelectedProof({
      ...registration,
      fullName: participant.fullName || 'Unknown Applicant',
      name: participant.fullName || 'Unknown Applicant',
      email: participant.email || '—',
      phone: participant.phone || '—',
      cnic: participant.cnic || '—',
      university: participant.university || '—',
      department: participant.department || '—',
      module: participant.module || participant.moduleName || participant.trackSelect || '—',
      track: participant.track === 'onsite' ? '⚡ Onsite' : participant.track === 'virtual' ? '🌐 Virtual' : participant.attendanceMode || '—',
      needsParking: isParkingRequired,
      parkingText: isParkingRequired
        ? `Yes (${participant.vehicleType || 'Vehicle'} - ${participant.vehicleNumber || 'N/A'})`
        : 'Not required',
      vehicleType: participant.vehicleType || 'N/A',
      vehicleNumber: participant.vehicleNumber || 'N/A',
      teammates: Array.isArray(participant.teammates) ? participant.teammates : [],
      appliedPromoCode: registration.appliedPromoCode || participant.appliedPromoCode || null,
      baseAmount: Number(registration.baseAmount || 1000),
      discountAmount: Number(registration.discountAmount || 0),
      finalAmount: Number(registration.finalAmount || 0),
      amount: Number(registration.finalAmount || 0),
      proofUrl: registration.paymentScreenshotUrl || '',
      paymentScreenshotUrl: registration.paymentScreenshotUrl || '',
      transactionId:
        registration.transactionId ||
        `REG-${String(registration._id || '').slice(-6).toUpperCase()}`,
      status: registration.paymentStatus,
      submittedAt: registration.submittedAt || registration.createdAt,
    });
  }

  async function handleRefresh() {
    setErrorMessage('');
    setSuccessMessage('');
    setRemovedIds([]);
    await refetch();
  }

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ marginBottom: '1.3rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.7rem',
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: '1.8rem',
              fontWeight: 900,
              color: 'var(--dz-text-primary)',
            }}
          >
            Pending Registrations
          </h1>

          <span
            className="admin-badge-sticker"
            style={{
              margin: 0,
              padding: '3px 10px',
              fontSize: '0.62rem',
              background: 'var(--color-pink)',
              color: '#000',
              transform: 'rotate(-3deg)',
            }}
          >
            action required
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '0.5rem',
            marginTop: '0.65rem',
          }}
        >
          <strong
            style={{
              fontSize: '1.8rem',
              color: 'var(--dz-purple-primary)',
            }}
          >
            {rows.length}
          </strong>

          <span
            style={{
              color: 'var(--dz-text-muted)',
              fontWeight: 700,
            }}
          >
            Awaiting Admin Review
          </span>
        </div>
      </div>

      {successMessage && (
        <div className="admin-message admin-message--success">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="admin-message admin-message--error">
          {errorMessage}
        </div>
      )}

      {/* Multi-Field Filter Bar & Export Actions */}
      <RegistrationFilterBar
        query={query}
        setQuery={setQuery}
        moduleFilter={moduleFilter}
        setModuleFilter={setModuleFilter}
        trackFilter={trackFilter}
        setTrackFilter={setTrackFilter}
        parkingFilter={parkingFilter}
        setParkingFilter={setParkingFilter}
        promoFilter={promoFilter}
        setPromoFilter={setPromoFilter}
        onReset={handleResetFilters}
        onExportExcel={handleExportExcel}
        onExportPDF={handleExportPDF}
        totalResultsCount={filteredRows.length}
      />

      <div className="db-card">
        <div className="db-table-toolbar" style={{ justifyContent: 'flex-end' }}>
          <button
            type="button"
            className="db-btn-white-pill"
            disabled={isFetching}
            onClick={handleRefresh}
          >
            {isFetching ? (
              <Loader2 size={14} className="admin-spin" />
            ) : (
              <RefreshCw size={14} />
            )}

            {isFetching ? 'Refreshing' : 'Refresh'}
          </button>
        </div>

        {isLoading && (
          <div className="admin-table-state">
            <Loader2 size={32} className="admin-spin" />
            Loading registrations...
          </div>
        )}

        {!isLoading && isError && (
          <div className="admin-table-state">
            <strong style={{ color: '#b91c1c' }}>
              Registrations could not be loaded.
            </strong>

            <span>
              {error?.data?.message ||
                'Check backend and admin login session.'}
            </span>

            <button
              type="button"
              className="db-btn-purple-pill"
              onClick={handleRefresh}
            >
              Try Again
            </button>
          </div>
        )}

        {!isLoading &&
          !isError &&
          filteredRows.length === 0 && (
            <div className="admin-table-state">
              <strong>
                {query
                  ? 'No matching registration found.'
                  : 'No pending registrations.'}
              </strong>

              <span>
                {query
                  ? 'Try another search.'
                  : 'All registrations have been reviewed.'}
              </span>
            </div>
          )}

        {!isLoading &&
          !isError &&
          filteredRows.length > 0 && (
            <div style={{ overflowX: 'auto' }}>
              <table className="db-table-clean">
                <thead>
                  <tr>
                    <th>Applicant</th>
                    <th>University</th>
                    <th>Details</th>
                    <th>Event</th>
                    <th>Submitted</th>
                    <th>Receipt</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'center' }}>
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredRows.map((registration) => {
                    const participant =
                      getParticipant(registration);

                    const working =
                      processingId === registration._id;

                    const isParkingRequired =
                      participant.needsParking === 'Yes' ||
                      participant.needsParking === true ||
                      participant.needsParking === 'true' ||
                      String(participant.needsParking).toLowerCase() === 'yes';

                    return (
                      <tr key={registration._id}>
                        <td>
                          <div className="admin-person-cell">
                            <strong>
                              {participant.fullName ||
                                'Unknown Applicant'}
                            </strong>

                            <small>
                              {participant.email || '—'}
                            </small>

                            <small>
                              {participant.phone || '—'}
                            </small>
                          </div>
                        </td>

                        <td>
                          <div className="admin-person-cell">
                            <strong>
                              {participant.university || '—'}
                            </strong>

                            <small>
                              {participant.department || '—'}
                            </small>
                          </div>
                        </td>

                        <td>
                          <div className="admin-person-cell">
                            <strong style={{ color: '#0f172a' }}>
                              {participant.module || participant.moduleName || participant.trackSelect || '—'}
                            </strong>

                            <span style={{ fontSize: '0.82rem', color: '#6b21a8', fontWeight: 600 }}>
                              {participant.track === 'onsite'
                                ? '⚡ Onsite'
                                : participant.track === 'virtual'
                                ? '🌐 Virtual'
                                : participant.attendanceMode || '—'}
                            </span>

                            <strong
                              style={{
                                color: isParkingRequired
                                  ? '#047857'
                                  : '#6b7280',
                                fontSize: '0.78rem',
                              }}
                            >
                              Parking:{' '}
                              {isParkingRequired
                                ? `Yes (${participant.vehicleType || 'Vehicle'} - ${participant.vehicleNumber || 'N/A'})`
                                : 'Not required'}
                            </strong>

                            {Array.isArray(participant.teammates) && participant.teammates.length > 0 && (
                              <span style={{ fontSize: '0.73rem', fontWeight: 700, color: '#7c3aed', background: '#f5f3ff', border: '1px solid #ede9fe', borderRadius: '6px', padding: '2px 7px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                👥 Team of {participant.teammates.length + 1}
                              </span>
                            )}
                          </div>
                        </td>

                        <td>{getEventTitle(registration)}</td>

                        <td>
                          {formatDate(
                            registration.submittedAt ||
                              registration.createdAt
                          )}
                        </td>

                        <td>
                          {registration.paymentScreenshotUrl ? (
                            <button
                              type="button"
                              className="admin-view-button"
                              onClick={() =>
                                openReceipt(registration)
                              }
                            >
                              <Eye size={14} />
                              View
                            </button>
                          ) : (
                            <span style={{ color: '#9ca3af' }}>
                              No receipt
                            </span>
                          )}
                        </td>

                        <td>
                          <span className="db-badge-status db-badge-status--orange">
                            Pending
                          </span>
                        </td>

                        <td style={{ textAlign: 'center' }}>
                          <div className="admin-action-buttons">
                            <button
                              type="button"
                              className="db-pill-action-btn db-pill-action-btn--approve"
                              disabled={isUpdating || working}
                              onClick={() =>
                                openApproveModal(registration)
                              }
                            >
                              {working ? (
                                <Loader2
                                  size={13}
                                  className="admin-spin"
                                />
                              ) : (
                                'Approve'
                              )}
                            </button>

                            <button
                              type="button"
                              className="db-pill-action-btn db-pill-action-btn--decline"
                              disabled={isUpdating || working}
                              onClick={() =>
                                openDeclineModal(registration)
                              }
                            >
                              Decline
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
      </div>

      {selectedProof && (
        <ProofReceiptModal
          proof={selectedProof}
          onClose={() => setSelectedProof(null)}
          onApprove={() =>
            openApproveModal(selectedProof)
          }
          onDecline={() =>
            openDeclineModal(selectedProof)
          }
        />
      )}

      <ActionConfirmModal
        isOpen={confirmModalState.isOpen}
        type={confirmModalState.type}
        applicantName={
          getParticipant(confirmModalState.registration).fullName ||
          confirmModalState.registration?.fullName ||
          confirmModalState.registration?.name ||
          ''
        }
        transactionId={confirmModalState.registration?.transactionId || ''}
        onConfirm={handleConfirmModalAction}
        onClose={() =>
          setConfirmModalState({
            isOpen: false,
            type: 'approve',
            registration: null,
          })
        }
        isSubmitting={isUpdating}
      />

      <style jsx global>{`
        .admin-spin {
          animation: admin-spin-animation 0.8s linear infinite;
        }

        @keyframes admin-spin-animation {
          to {
            transform: rotate(360deg);
          }
        }

        .admin-message {
          padding: 12px 16px;
          margin-bottom: 14px;
          border-radius: 12px;
          font-weight: 800;
        }

        .admin-message--success {
          background: #ecfdf5;
          color: #166534;
          border: 1px solid #86efac;
        }

        .admin-message--error {
          background: #fef2f2;
          color: #b91c1c;
          border: 1px solid #fca5a5;
        }

        .admin-table-state {
          min-height: 250px;
          padding: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          text-align: center;
          gap: 12px;
          color: var(--dz-text-muted, #6b7280);
        }

        .admin-person-cell {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 145px;
        }

        .admin-person-cell small {
          color: var(--dz-text-muted, #9ca3af);
          font-size: 0.72rem;
        }

        .admin-view-button {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 6px 10px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background: #fff;
          color: #6d28d9;
          cursor: pointer;
          font-weight: 800;
        }

        .admin-action-buttons {
          display: inline-flex;
          align-items: center;
          gap: 7px;
        }

        .db-pill-action-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}