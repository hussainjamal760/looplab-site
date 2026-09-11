'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

import {
  Plus,
  ArrowUpRight,
  UploadCloud,
  Loader2,
} from 'lucide-react';

import CapsuleAnalyticsChart from '../components/CapsuleAnalyticsChart';
import QuickNotesActivityWidget from '../components/QuickNotesActivityWidget';
import EventCohortsWidget from '../components/EventCohortsWidget';
import CandidateQueueWidget from '../components/CandidateQueueWidget';
import ProjectProgressGauge from '../components/ProjectProgressGauge';
import TimeTrackerCard from '../components/TimeTrackerCard';
import InteractiveSticker from '../components/InteractiveSticker';

import {
  useGetAdminMetricsQuery,
  useGetAdminRegistrationsQuery,
} from '@/store/api/adminApi';

/* Number formatting */

function formatNumber(value) {
  return new Intl.NumberFormat('en-PK').format(
    Number(value || 0)
  );
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

function formatDate(value) {
  if (!value) return '';

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return date.toLocaleString('en-PK');
}

/*
 * CSV cell protection:
 * - commas and quotes are handled
 * - spreadsheet formula injection is prevented
 */
function escapeCsvCell(value) {
  let text =
    value === undefined || value === null
      ? ''
      : String(value);

  if (/^[=+\-@]/.test(text)) {
    text = `'${text}`;
  }

  text = text.replace(/"/g, '""');

  return `"${text}"`;
}

function createCsvContent(registrations) {
  const headings = [
    'Registration ID',
    'Full Name',
    'Email',
    'Phone',
    'University',
    'Department',
    'Track',
    'Attendance Mode',
    'Parking Required',
    'Event',
    'Promo Code',
    'Base Amount',
    'Discount Amount',
    'Final Amount',
    'Payment Status',
    'Admin Remarks',
    'Certificate ID',
    'Receipt URL',
    'Submitted At',
    'Reviewed At',
  ];

  const rows = registrations.map((registration) => {
    const participant =
      registration?.participantData || {};

    const eventTitle =
      registration?.eventId &&
      typeof registration.eventId === 'object'
        ? registration.eventId.title || ''
        : '';

    const parkingRequired =
      participant.needsParking === true ||
      participant.needsParking === 'true'
        ? 'Yes'
        : 'No';

    return [
      registration._id,
      participant.fullName,
      participant.email,
      participant.phone,
      participant.university,
      participant.department,
      participant.trackSelect,
      participant.attendanceMode,
      parkingRequired,
      eventTitle,
      registration.appliedPromoCode,
      registration.baseAmount,
      registration.discountAmount,
      registration.finalAmount,
      registration.paymentStatus,
      registration.adminRemarks,
      registration.certificateId,
      registration.paymentScreenshotUrl,
      formatDate(
        registration.submittedAt ||
          registration.createdAt
      ),
      formatDate(registration.verifiedAt),
    ];
  });

  return [
    headings.map(escapeCsvCell).join(','),
    ...rows.map((row) =>
      row.map(escapeCsvCell).join(',')
    ),
  ].join('\r\n');
}

export default function DashboardOverviewView({
  onAddEvent,
}) {
  const [exportMessage, setExportMessage] =
    useState('');

  const {
    data: metrics,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetAdminMetricsQuery(undefined, {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  /*
   * Empty status means pending, verified and rejected
   * registrations will all be fetched.
   */
  const {
    data: registrationsData,
    isLoading: registrationsLoading,
    isFetching: registrationsFetching,
    isError: registrationsError,
    refetch: refetchRegistrations,
  } = useGetAdminRegistrationsQuery(
    {
      status: '',
      page: 1,
      limit: 100,
    },
    {
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  );

  const dashboardMetrics = metrics || {
    totalRegistrations: 0,
    pendingCount: 0,
    verifiedCount: 0,
    rejectedCount: 0,
    totalApprovedRevenue: 0,
    totalPromoUsage: 0,
    recentRegistrations: [],
  };

  const registrations =
    registrationsData?.registrations || [];

  const KPIS = [
    {
      title: 'Total Registrations',
      val: formatNumber(
        dashboardMetrics.totalRegistrations
      ),
      badge: `${formatNumber(
        dashboardMetrics.totalPromoUsage
      )} promo code uses`,
      featured: true,
      sticker:
        '/assets/Footer-Sticker SVG/footer-sticker-100.svg',
      rotate: 12,
    },
    {
      title: 'Approved Registrations',
      val: formatNumber(
        dashboardMetrics.verifiedCount
      ),
      badge: `${formatNumber(
        dashboardMetrics.rejectedCount
      )} rejected`,
      featured: false,
      sticker:
        '/assets/HorizontalWords SVG/horizontal-words-sticker-thumps-up.svg',
      rotate: -8,
    },
    {
      title: 'Approved Revenue',
      val: formatCurrency(
        dashboardMetrics.totalApprovedRevenue
      ),
      badge: 'Verified payments only',
      featured: false,
      sticker:
        '/assets/Card-Sticker SVG/sticker-heart.svg',
      rotate: 10,
    },
    {
      title: 'Payment Pending',
      val: formatNumber(
        dashboardMetrics.pendingCount
      ),
      badge: 'Awaiting verification',
      featured: false,
      badgeLabel: 'needs review',
    },
  ];

  async function handleExport() {
    setExportMessage('');

    try {
      /*
       * Get the latest registrations before export.
       */
      const refreshedResult =
        await refetchRegistrations();

      if (refreshedResult.error) {
        throw new Error(
          refreshedResult.error?.data?.message ||
            'Registrations could not be loaded.'
        );
      }

      const latestRegistrations =
        refreshedResult.data?.registrations || [];

      if (latestRegistrations.length === 0) {
        setExportMessage(
          'There are no registrations to export.'
        );
        return;
      }

      const csvContent =
        createCsvContent(latestRegistrations);

      /*
       * BOM helps Microsoft Excel display characters
       * and names correctly.
       */
      const csvBlob = new Blob(
        [`\uFEFF${csvContent}`],
        {
          type: 'text/csv;charset=utf-8;',
        }
      );

      const downloadUrl =
        URL.createObjectURL(csvBlob);

      const link =
        document.createElement('a');

      const today = new Date()
        .toISOString()
        .slice(0, 10);

      link.href = downloadUrl;
      link.download =
        `looplab-registrations-${today}.csv`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(downloadUrl);

      setExportMessage(
        `${latestRegistrations.length} registrations exported successfully.`
      );
    } catch (exportError) {
      setExportMessage(
        exportError?.message ||
          'Export failed. Please try again.'
      );
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* Header */}

      <div
        className="db-header-row"
        style={{ position: 'relative' }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              flexWrap: 'wrap',
            }}
          >
            <h1 className="db-header-title">
              Dashboard Overview
            </h1>

            <span
              className="admin-badge-sticker"
              style={{
                background:
                  'var(--color-lightgreen)',
                color: '#1a1a1a',
                fontSize: '0.62rem',
                padding: '2px 8px',
                transform: 'rotate(3deg)',
                margin: 0,
              }}
            >
              {isFetching
                ? 'updating'
                : 'live operations'}
            </span>
          </div>

          <p className="db-header-subtitle">
            Monitor registrations, payments and event
            activity using live backend data.
          </p>
        </div>

        <div
          className="db-header-actions"
          style={{ position: 'relative' }}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            type="button"
            className="db-btn-purple-pill"
            onClick={onAddEvent}
          >
            <Plus size={16} />
            <span>Add Event</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            type="button"
            className="db-btn-white-pill"
            onClick={handleExport}
            disabled={
              registrationsLoading ||
              registrationsFetching
            }
            style={{
              opacity:
                registrationsLoading ||
                registrationsFetching
                  ? 0.65
                  : 1,
              cursor:
                registrationsLoading ||
                registrationsFetching
                  ? 'not-allowed'
                  : 'pointer',
            }}
          >
            {registrationsFetching ? (
              <Loader2
                size={15}
                className="dashboard-export-spin"
              />
            ) : (
              <UploadCloud size={15} />
            )}

            <span>
              {registrationsFetching
                ? 'Preparing...'
                : 'Export Data'}
            </span>
          </motion.button>
        </div>
      </div>

      {/* Export message */}

      {exportMessage && (
        <div
          style={{
            marginBottom: '1rem',
            padding: '11px 15px',
            borderRadius: '12px',
            fontSize: '0.82rem',
            fontWeight: 800,
            color: registrationsError
              ? '#b91c1c'
              : '#166534',
            background: registrationsError
              ? '#fef2f2'
              : '#ecfdf5',
            border: registrationsError
              ? '1px solid #fca5a5'
              : '1px solid #86efac',
          }}
        >
          {exportMessage}
        </div>
      )}

      {/* API error */}

      {isError && (
        <div
          style={{
            marginBottom: '1rem',
            padding: '14px 16px',
            color: '#721c24',
            background: '#ffdfe3',
            border: '2px solid #721c24',
            borderRadius: '12px',
          }}
        >
          <strong>
            Dashboard data could not be loaded.
          </strong>

          <p style={{ margin: '6px 0 10px' }}>
            {error?.data?.message ||
              'Please confirm that the backend is running and you are logged in.'}
          </p>

          <button
            type="button"
            onClick={refetch}
            style={{
              padding: '7px 14px',
              cursor: 'pointer',
              fontWeight: 800,
            }}
          >
            Try again
          </button>
        </div>
      )}

      {/* KPI cards */}

      <div className="db-kpis-4grid">
        {KPIS.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            whileHover={{
              y: -4,
              transition: {
                duration: 0.2,
              },
            }}
            transition={{
              delay: index * 0.06,
              type: 'spring',
              stiffness: 220,
              damping: 18,
            }}
            style={{
              position: 'relative',
              overflow: 'visible',
            }}
            className={`db-kpi-card ${
              kpi.featured
                ? 'db-kpi-card--featured'
                : ''
            }`}
          >
            {kpi.sticker && (
              <InteractiveSticker
                src={kpi.sticker}
                size={34}
                rotate={kpi.rotate || 0}
                top="-12px"
                right="-8px"
                draggable
              />
            )}

            {kpi.badgeLabel && (
              <InteractiveSticker
                badgeText={kpi.badgeLabel}
                badgeBg="var(--color-pink)"
                badgeColor="#000"
                top="-12px"
                right="-6px"
                rotate={-6}
              />
            )}

            <div className="db-kpi-card__top">
              <span className="db-kpi-card__title">
                {kpi.title}
              </span>

              <div className="db-kpi-card__arrow">
                <ArrowUpRight size={15} />
              </div>
            </div>

            <div className="db-kpi-card__val">
              {isLoading ? '—' : kpi.val}
            </div>

            <div className="db-kpi-card__footer">
              <span>
                {isLoading
                  ? 'Loading live data...'
                  : kpi.badge}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Existing dashboard widgets remain unchanged */}

      <div className="db-middle-3grid">
        <CapsuleAnalyticsChart />
        <QuickNotesActivityWidget />
        <EventCohortsWidget />
      </div>

      <div className="db-bottom-3grid">
        <CandidateQueueWidget
          registrations={
            dashboardMetrics.recentRegistrations || []
          }
        />

        <ProjectProgressGauge />
        <TimeTrackerCard />
      </div>

      <style jsx global>{`
        .dashboard-export-spin {
          animation: dashboard-export-rotation 0.8s
            linear infinite;
        }

        @keyframes dashboard-export-rotation {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}