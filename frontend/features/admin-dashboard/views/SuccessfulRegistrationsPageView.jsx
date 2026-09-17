'use client';

import { useMemo, useState } from 'react';
import {
  Search,
  FileText,
  RefreshCw,
  Loader2,
} from 'lucide-react';

import ProofReceiptModal from '../components/ProofReceiptModal';
import RegistrationFilterBar from '../components/RegistrationFilterBar';
import { exportToExcel, exportToPDF } from '../utils/exportHelpers';

import {
  useGetAdminRegistrationsQuery,
} from '@/store/api/adminApi';

/*
 * Existing six registrations are retained.
 */
const EXISTING_REGISTRATIONS = [
  {
    _id: 'existing-01',
    participantData: {
      fullName: 'Wasiq Shafiq',
      email: 'wasiq215005@gmail.com',
      university: 'Team Member',
      department: 'LoopLab Team',
      module: 'General',
      track: 'onsite',
    },
    transactionId: 'TXN-991204',
    finalAmount: 1200,
    verifiedAt: '2026-09-07T10:00:00.000Z',
    paymentStatus: 'verified',
    eventName: 'LoopLearn Hackathon',
    paymentScreenshotUrl:
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=700&auto=format&fit=crop&q=80',
  },
  {
    _id: 'existing-02',
    participantData: {
      fullName: 'Maryam Mubashar',
      email: 'maryam.mubasharrana@gmail.com',
      university: 'FAST NUCES',
      department: 'Computer Science',
      module: 'Web Development',
      track: 'onsite',
    },
    transactionId: 'TXN-883190',
    finalAmount: 1350,
    verifiedAt: '2026-09-07T10:00:00.000Z',
    paymentStatus: 'verified',
    eventName: 'LoopLearn Hackathon',
    paymentScreenshotUrl:
      'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=700&auto=format&fit=crop&q=80',
  },
  {
    _id: 'existing-03',
    participantData: {
      fullName: 'Zainab Batool',
      email: 'zainabbee147@gmail.com',
      university: 'PUCIT',
      department: 'Computer Science',
      module: 'App Development',
      track: 'onsite',
    },
    transactionId: 'TXN-773412',
    finalAmount: 1350,
    verifiedAt: '2026-09-08T10:00:00.000Z',
    paymentStatus: 'verified',
    eventName: 'LoopLearn Hackathon',
    paymentScreenshotUrl:
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=700&auto=format&fit=crop&q=80',
  },
  {
    _id: 'existing-04',
    participantData: {
      fullName: 'Jaweria Tahir',
      email: 'jaweriatahir368@gmail.com',
      university: 'NUST',
      department: 'Software Engineering',
      module: 'AI / ML',
      track: 'virtual',
    },
    transactionId: 'TXN-552190',
    finalAmount: 1350,
    verifiedAt: '2026-09-08T10:00:00.000Z',
    paymentStatus: 'verified',
    eventName: 'LoopLearn Hackathon',
    paymentScreenshotUrl:
      'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=700&auto=format&fit=crop&q=80',
  },
  {
    _id: 'existing-05',
    participantData: {
      fullName: 'Sumiya Anjum',
      email: 'sumiyaanjum1115@gmail.com',
      university: 'Team Member',
      department: 'LoopLab Team',
      module: 'General',
      track: 'onsite',
    },
    transactionId: 'TXN-441098',
    finalAmount: 1350,
    verifiedAt: '2026-09-08T10:00:00.000Z',
    paymentStatus: 'verified',
    eventName: 'LoopLearn Hackathon',
    paymentScreenshotUrl:
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=700&auto=format&fit=crop&q=80',
  },
  {
    _id: 'existing-06',
    participantData: {
      fullName: 'Noor Fatima',
      email: 'noorfatima99@gmail.com',
      university: 'LUMS',
      department: 'Management Sciences',
      module: 'Pitching Competition',
      track: 'onsite',
    },
    transactionId: 'TXN-330912',
    finalAmount: 1350,
    verifiedAt: '2026-09-09T10:00:00.000Z',
    paymentStatus: 'verified',
    eventName: 'LoopLearn Hackathon',
    paymentScreenshotUrl:
      'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=700&auto=format&fit=crop&q=80',
  },
];

function getParticipant(registration) {
  return registration?.participantData || {};
}

function getEventName(registration) {
  if (registration?.eventName) {
    return registration.eventName;
  }

  if (
    registration?.eventId &&
    typeof registration.eventId === 'object'
  ) {
    return registration.eventId.title || 'Loopverse 3.0';
  }

  return 'Loopverse 3.0';
}

function formatAmount(value) {
  const number = Number(value || 0);

  return `PKR ${number.toLocaleString()}`;
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

export default function SuccessfulRegistrationsPageView() {
  const [query, setQuery] = useState('');
  const [moduleFilter, setModuleFilter] = useState('All Modules');
  const [trackFilter, setTrackFilter] = useState('All Tracks');
  const [parkingFilter, setParkingFilter] = useState('All Parking');
  const [promoFilter, setPromoFilter] = useState('All Promo');

  const [selectedProof, setSelectedProof] = useState(null);

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetAdminRegistrationsQuery({
    status: 'verified',
    page: 1,
    limit: 100,
  });

  const registrations = useMemo(() => {
    const apiRecords = Array.isArray(data?.registrations)
      ? data.registrations
      : Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data)
      ? data
      : [];

    const verifiedFromApi = apiRecords.filter((item) => {
      return (
        item.paymentStatus === 'verified' ||
        item.status === 'verified' ||
        item.status === 'Verified'
      );
    });

    const combined = [...verifiedFromApi, ...EXISTING_REGISTRATIONS];

    /*
     * Duplicate email records are displayed once.
     */
    const uniqueRecords = new Map();

    combined.forEach((registration) => {
      const participant = getParticipant(registration);

      const email = String(participant.email || '')
        .trim()
        .toLowerCase();

      const key = email || registration._id;

      /*
       * Real backend record replaces static record
       * if the email exists in both.
       */
      if (
        !uniqueRecords.has(key) ||
        !String(registration._id).startsWith('existing-')
      ) {
        uniqueRecords.set(key, registration);
      }
    });

    return Array.from(uniqueRecords.values());
  }, [data]);

  const filteredRegistrations = useMemo(() => {
    const searchText = query.trim().toLowerCase();

    return registrations.filter((registration) => {
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
          registration.transactionId,
          getEventName(registration),
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
  }, [query, moduleFilter, trackFilter, parkingFilter, promoFilter, registrations]);

  function handleResetFilters() {
    setQuery('');
    setModuleFilter('All Modules');
    setTrackFilter('All Tracks');
    setParkingFilter('All Parking');
    setPromoFilter('All Promo');
  }

  function handleExportExcel() {
    exportToExcel(filteredRegistrations, 'Loopverse_Successful_Registrations');
  }

  function handleExportPDF() {
    exportToPDF(filteredRegistrations, 'Successful Verified Registrations Report', 'Loopverse_Successful_Registrations');
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
      module: participant.module || participant.moduleName || participant.trackSelect || 'General',
      track: participant.track === 'onsite' ? '⚡ Onsite' : participant.track === 'virtual' ? '🌐 Virtual' : participant.attendanceMode || 'Onsite',
      needsParking: isParkingRequired,
      parkingText: isParkingRequired
        ? `Yes (${participant.vehicleType || 'Vehicle'} - ${participant.vehicleNumber || 'N/A'})`
        : 'Not required',
      vehicleType: participant.vehicleType || 'N/A',
      vehicleNumber: participant.vehicleNumber || 'N/A',
      appliedPromoCode: registration.appliedPromoCode || participant.appliedPromoCode || null,
      baseAmount: Number(registration.baseAmount || registration.finalAmount || 1000),
      discountAmount: Number(registration.discountAmount || 0),
      finalAmount: Number(registration.finalAmount || 0),
      amount: Number(registration.finalAmount || 0),
      event: getEventName(registration),
      proofUrl: registration.paymentScreenshotUrl || '',
      transactionId:
        registration.transactionId ||
        `REG-${String(registration._id)
          .slice(-6)
          .toUpperCase()}`,
    });
  }

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ marginBottom: '1.3rem' }}>
        <h1
          style={{
            margin: 0,
            fontSize: '1.8rem',
            fontWeight: 900,
            color: 'var(--dz-text-primary)',
          }}
        >
          Successful Registrations
        </h1>

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
              color: '#16a34a',
            }}
          >
            {registrations.length}
          </strong>

          <span
            style={{
              color: 'var(--dz-text-muted)',
              fontWeight: 700,
            }}
          >
            Verified & Paid Members
          </span>
        </div>
      </div>

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
        totalResultsCount={filteredRegistrations.length}
      />

      <div className="db-card">
        <div className="db-table-toolbar" style={{ justifyContent: 'flex-end' }}>
          <button
            type="button"
            className="db-btn-white-pill"
            disabled={isFetching}
            onClick={() => refetch()}
          >
            {isFetching ? (
              <Loader2
                size={14}
                className="successful-spin"
              />
            ) : (
              <RefreshCw size={14} />
            )}

            Refresh
          </button>
        </div>

        {isError && (
          <div className="successful-api-warning">
            Live records could not be refreshed:{' '}
            {error?.data?.message || 'Backend error'}
          </div>
        )}

        <div style={{ overflowX: 'auto' }}>
          <table className="db-table-clean">
            <thead>
              <tr>
                <th>Member</th>
                <th>University</th>
                <th>Event</th>
                <th>Transaction ID</th>
                <th>Amount</th>
                <th>Approved Date</th>
                <th>Audit Proof</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredRegistrations.map((registration) => {
                const participant =
                  getParticipant(registration);

                return (
                  <tr key={registration._id}>
                    <td>
                      <div className="successful-member">
                        <strong>
                          {participant.fullName ||
                            'Unknown Applicant'}
                        </strong>

                        <small>
                          {participant.email || '—'}
                        </small>
                      </div>
                    </td>

                    <td>
                      {participant.university || '—'}
                    </td>

                    <td>{getEventName(registration)}</td>

                    <td>
                      <span className="successful-code">
                        {registration.transactionId ||
                          `REG-${String(registration._id)
                            .slice(-6)
                            .toUpperCase()}`}
                      </span>
                    </td>

                    <td>
                      <strong style={{ color: '#15803d' }}>
                        {formatAmount(
                          registration.finalAmount
                        )}
                      </strong>
                    </td>

                    <td>
                      {formatDate(
                        registration.verifiedAt ||
                          registration.updatedAt
                      )}
                    </td>

                    <td>
                      <button
                        type="button"
                        className="successful-proof-button"
                        onClick={() =>
                          openReceipt(registration)
                        }
                      >
                        <FileText size={14} />
                        Audit Receipt
                      </button>
                    </td>

                    <td>
                      <span className="successful-status">
                        Approved & Verified
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {isLoading && (
          <div className="successful-loading">
            <Loader2
              size={18}
              className="successful-spin"
            />
            Loading live registrations...
          </div>
        )}
      </div>

      {selectedProof && (
        <ProofReceiptModal
          proof={selectedProof}
          onClose={() => setSelectedProof(null)}
        />
      )}

      <style jsx global>{`
        .successful-spin {
          animation: successful-spin-animation 0.8s linear
            infinite;
        }

        @keyframes successful-spin-animation {
          to {
            transform: rotate(360deg);
          }
        }

        .successful-member {
          min-width: 175px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .successful-member small {
          color: #9ca3af;
          font-size: 0.72rem;
        }

        .successful-code {
          display: inline-flex;
          padding: 5px 9px;
          border-radius: 7px;
          background: #f3f4f6;
          font-family: monospace;
          font-weight: 800;
        }

        .successful-proof-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 7px 10px;
          border: 1px solid #e5d8cc;
          border-radius: 8px;
          background: #fff;
          color: #6d28d9;
          cursor: pointer;
          font-weight: 800;
        }

        .successful-status {
          display: inline-flex;
          min-width: 135px;
          justify-content: center;
          padding: 7px 12px;
          border-radius: 999px;
          background: #dcfce7;
          color: #15803d;
          font-size: 0.75rem;
          font-weight: 900;
        }

        .successful-api-warning {
          margin: 12px;
          padding: 10px 14px;
          border-radius: 10px;
          background: #fff7ed;
          border: 1px solid #fdba74;
          color: #9a3412;
          font-weight: 700;
        }

        .successful-loading {
          padding: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          color: #6b7280;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}