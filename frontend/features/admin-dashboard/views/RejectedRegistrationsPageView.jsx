'use client';

import {
  useMemo,
  useState,
} from 'react';

import {
  Search,
  XCircle,
  RefreshCw,
  Loader2,
  Eye,
} from 'lucide-react';

import ProofReceiptModal from '../components/ProofReceiptModal';

import {
  useGetAdminRegistrationsQuery,
} from '@/store/api/adminApi';

// ==========================================
// HELPERS
// ==========================================

function getParticipant(registration) {
  return registration?.participantData || {};
}

function getRegistrations(data) {
  if (Array.isArray(data)) {
    return data;
  }

  if (
    Array.isArray(data?.registrations)
  ) {
    return data.registrations;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  if (
    Array.isArray(data?.data?.data)
  ) {
    return data.data.data;
  }

  return [];
}

function getEventTitle(registration) {
  if (
    registration?.eventId &&
    typeof registration.eventId ===
      'object'
  ) {
    return (
      registration.eventId.title ||
      'Loopverse 3.0'
    );
  }

  return 'Loopverse 3.0';
}

function formatDate(value) {
  if (!value) return '—';

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '—';
  }

  return new Intl.DateTimeFormat(
    'en-GB',
    {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }
  ).format(date);
}

// ==========================================
// PAGE
// ==========================================

export default function RejectedRegistrationsPageView() {
  const [query, setQuery] =
    useState('');

  const [
    selectedRegistration,
    setSelectedRegistration,
  ] = useState(null);

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetAdminRegistrationsQuery({
    status: 'rejected',
    page: 1,
    limit: 100,
  });

  const registrations = useMemo(
    () => getRegistrations(data),
    [data]
  );

  const filteredRegistrations =
    useMemo(() => {
      const searchText = query
        .trim()
        .toLowerCase();

      if (!searchText) {
        return registrations;
      }

      return registrations.filter(
        (registration) => {
          const participant =
            getParticipant(registration);

          return [
            participant.fullName,
            participant.email,
            participant.phone,
            participant.university,
            participant.department,
            getEventTitle(registration),
            registration.adminRemarks,
          ]
            .filter(Boolean)
            .join(' ')
            .toLowerCase()
            .includes(searchText);
        }
      );
    }, [query, registrations]);

  function openRegistration(
    registration
  ) {
    const participant =
      getParticipant(registration);

    setSelectedRegistration({
      ...registration,

      fullName:
        participant.fullName ||
        'Unknown Applicant',

      name:
        participant.fullName ||
        'Unknown Applicant',

      email:
        participant.email || '—',

      phone:
        participant.phone || '—',

      university:
        participant.university ||
        '—',

      department:
        participant.department ||
        '—',

      event:
        getEventTitle(registration),

      amount: Number(
        registration.finalAmount || 0
      ),

      proofUrl:
        registration.paymentScreenshotUrl ||
        '',

      paymentScreenshotUrl:
        registration.paymentScreenshotUrl ||
        '',

      transactionId:
        registration.transactionId ||
        `REG-${String(
          registration._id || ''
        )
          .slice(-6)
          .toUpperCase()}`,

      status: 'rejected',

      submittedAt:
        registration.submittedAt ||
        registration.createdAt,
    });
  }

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      {/* Heading */}

      <div
        style={{
          marginBottom: '1.3rem',
        }}
      >
        <div className="rejected-title-row">
          <h1>
            Rejected Registrations
          </h1>

          <span>
            review archive
          </span>
        </div>

        <div className="rejected-count-row">
          <strong>
            {registrations.length}
          </strong>

          <p>
            Declined registration
            requests
          </p>
        </div>
      </div>

      <div className="db-card">
        {/* Toolbar */}

        <div className="db-table-toolbar">
          <div className="db-table-search-pill">
            <Search
              size={15}
              color="#9ca3af"
            />

            <input
              type="search"
              value={query}
              placeholder="Search rejected applicant, email or reason..."
              onChange={(event) =>
                setQuery(
                  event.target.value
                )
              }
            />
          </div>

          <button
            type="button"
            className="db-btn-white-pill"
            disabled={isFetching}
            onClick={() => refetch()}
          >
            {isFetching ? (
              <Loader2
                size={14}
                className="rejected-spin"
              />
            ) : (
              <RefreshCw size={14} />
            )}

            Refresh
          </button>
        </div>

        {/* Loading */}

        {isLoading && (
          <div className="rejected-state">
            <Loader2
              size={32}
              className="rejected-spin"
            />

            <strong>
              Loading rejected
              registrations...
            </strong>
          </div>
        )}

        {/* Error */}

        {!isLoading && isError && (
          <div className="rejected-state">
            <XCircle
              size={35}
              color="#dc2626"
            />

            <strong
              style={{
                color: '#b91c1c',
              }}
            >
              Rejected registrations
              could not be loaded.
            </strong>

            <span>
              {error?.data?.message ||
                'Backend or admin session error.'}
            </span>

            <button
              type="button"
              className="db-btn-purple-pill"
              onClick={() => refetch()}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty */}

        {!isLoading &&
          !isError &&
          filteredRegistrations.length ===
            0 && (
            <div className="rejected-state">
              <div className="rejected-empty-icon">
                <XCircle size={28} />
              </div>

              <strong>
                {query
                  ? 'No matching rejected registration found.'
                  : 'No rejected registrations.'}
              </strong>

              <span>
                {query
                  ? 'Try another search value.'
                  : 'Declined requests will appear here.'}
              </span>
            </div>
          )}

        {/* Table */}

        {!isLoading &&
          !isError &&
          filteredRegistrations.length >
            0 && (
            <div
              style={{
                overflowX: 'auto',
              }}
            >
              <table className="db-table-clean">
                <thead>
                  <tr>
                    <th>Applicant</th>
                    <th>University</th>
                    <th>Event</th>
                    <th>Parking</th>
                    <th>Submitted</th>
                    <th>Rejected On</th>
                    <th>Decline Reason</th>
                    <th>Receipt</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredRegistrations.map(
                    (registration) => {
                      const participant =
                        getParticipant(
                          registration
                        );

                      const isParkingRequired =
                        participant.needsParking === 'Yes' ||
                        participant.needsParking === true ||
                        participant.needsParking === 'true' ||
                        String(participant.needsParking).toLowerCase() === 'yes';

                      return (
                        <tr
                          key={
                            registration._id
                          }
                        >
                          <td>
                            <div className="rejected-person">
                              <strong>
                                {participant.fullName ||
                                  'Unknown Applicant'}
                              </strong>

                              <small>
                                {participant.email ||
                                  '—'}
                              </small>

                              <small>
                                {participant.phone ||
                                  '—'}
                              </small>
                            </div>
                          </td>

                          <td>
                            <div className="rejected-person">
                              <strong>
                                {participant.university ||
                                  '—'}
                              </strong>

                              <small>
                                {participant.department ||
                                  '—'}
                              </small>
                            </div>
                          </td>

                          <td>
                            {getEventTitle(
                              registration
                            )}
                          </td>

                          <td>
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px',
                                padding: '4px 10px',
                                borderRadius: '6px',
                                fontSize: '0.78rem',
                                fontWeight: 700,
                                background: isParkingRequired ? '#ecfdf5' : '#f8fafc',
                                color: isParkingRequired ? '#047857' : '#64748b',
                                border: isParkingRequired ? '1px solid #a7f3d0' : '1px solid #e2e8f0',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {isParkingRequired ? (
                                <>🚗 {participant.vehicleType || 'Vehicle'} ({participant.vehicleNumber || 'N/A'})</>
                              ) : (
                                'Not Required'
                              )}
                            </span>
                          </td>

                          <td>
                            {formatDate(
                              registration.submittedAt ||
                                registration.createdAt
                            )}
                          </td>

                          <td>
                            {formatDate(
                              registration.verifiedAt ||
                                registration.updatedAt
                            )}
                          </td>

                          <td>
                            <div className="rejected-reason">
                              {registration.adminRemarks ||
                                'No reason provided'}
                            </div>
                          </td>

                          <td>
                            {registration.paymentScreenshotUrl ? (
                              <button
                                type="button"
                                className="rejected-view-button"
                                onClick={() =>
                                  openRegistration(
                                    registration
                                  )
                                }
                              >
                                <Eye
                                  size={14}
                                />
                                View
                              </button>
                            ) : (
                              <span
                                style={{
                                  color:
                                    '#9ca3af',
                                }}
                              >
                                No receipt
                              </span>
                            )}
                          </td>

                          <td>
                            <span className="rejected-status">
                              Rejected
                            </span>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          )}
      </div>

      {selectedRegistration && (
        <ProofReceiptModal
          proof={
            selectedRegistration
          }
          onClose={() =>
            setSelectedRegistration(
              null
            )
          }
        />
      )}

      <style jsx global>{`
        .rejected-title-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
        }

        .rejected-title-row h1 {
          margin: 0;
          color: var(
            --dz-text-primary,
            #111827
          );
          font-size: 1.8rem;
          font-weight: 900;
        }

        .rejected-title-row > span {
          padding: 4px 10px;
          border: 2px solid #111827;
          border-radius: 8px;
          background: #fecaca;
          color: #991b1b;
          font-size: 0.62rem;
          font-weight: 900;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transform: rotate(-2deg);
        }

        .rejected-count-row {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-top: 10px;
        }

        .rejected-count-row strong {
          color: #dc2626;
          font-size: 1.8rem;
          font-weight: 900;
        }

        .rejected-count-row p {
          margin: 0;
          color: #9ca3af;
          font-weight: 700;
        }

        .rejected-state {
          min-height: 260px;
          padding: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          text-align: center;
          gap: 10px;
          color: #6b7280;
        }

        .rejected-empty-icon {
          width: 58px;
          height: 58px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fee2e2;
          color: #dc2626;
        }

        .rejected-person {
          min-width: 155px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .rejected-person small {
          color: #9ca3af;
          font-size: 0.72rem;
        }

        .rejected-reason {
          max-width: 230px;
          padding: 7px 10px;
          border-radius: 8px;
          background: #fff1f2;
          color: #9f1239;
          font-size: 0.75rem;
          font-weight: 700;
          line-height: 1.4;
        }

        .rejected-view-button {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 6px 10px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background: #ffffff;
          color: #6d28d9;
          cursor: pointer;
          font-weight: 800;
        }

        .rejected-status {
          display: inline-flex;
          padding: 7px 12px;
          border-radius: 999px;
          background: #fee2e2;
          color: #b91c1c;
          font-size: 0.75rem;
          font-weight: 900;
        }

        .rejected-spin {
          animation:
            rejected-spin-animation
            0.8s linear infinite;
        }

        @keyframes rejected-spin-animation {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}