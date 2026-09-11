'use client';

import {
  useMemo,
  useState,
} from 'react';

import {
  Plus,
  X,
  Tag,
  RefreshCw,
  Loader2,
  Users,
  TicketPercent,
} from 'lucide-react';

import {
  useGetAdminPromoCodesQuery,
  useCreateAdminPromoCodeMutation,
  useToggleAdminPromoCodeMutation,
} from '@/store/api/promoAdminApi';

import {
  useGetAdminEventsQuery,
} from '@/store/api/adminApi';

// ==========================================
// HELPERS
// ==========================================

function getEvents(data) {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.events)) {
    return data.events;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  return [];
}

function formatPartnerType(type) {
  if (type === 'community_partner') {
    return 'Community Partner';
  }

  return 'Ambassador';
}

// ==========================================
// PAGE
// ==========================================

export default function PromoCodesPageView() {
  const [showModal, setShowModal] =
    useState(false);

  const [formData, setFormData] =
    useState({
      code: '',
      partnerName: '',
      partnerType: 'ambassador',
      discountPercent: 10,
      maxUsage: 100,
      eventId: '',
    });

  const [formError, setFormError] =
    useState('');

  const [successMessage, setSuccessMessage] =
    useState('');

  const [processingId, setProcessingId] =
    useState(null);

  // ========================================
  // API
  // ========================================

  const {
    data: promoData = [],
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetAdminPromoCodesQuery();

  const {
    data: eventsData,
  } = useGetAdminEventsQuery();

  const [
    createPromoCode,
    { isLoading: isCreating },
  ] = useCreateAdminPromoCodeMutation();

  const [
    togglePromoCode,
    { isLoading: isToggling },
  ] = useToggleAdminPromoCodeMutation();

  const promos = useMemo(() => {
    return Array.isArray(promoData)
      ? promoData
      : [];
  }, [promoData]);

  const events = useMemo(() => {
    return getEvents(eventsData);
  }, [eventsData]);

  // ========================================
  // FORM HELPERS
  // ========================================

  function updateField(name, value) {
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleCodeChange(value) {
    /*
     * Only capital letters, numbers,
     * hyphen and underscore are allowed.
     */
    const cleanCode = value
      .toUpperCase()
      .replace(
        /[^A-Z0-9_-]/g,
        ''
      );

    updateField('code', cleanCode);
  }

  function resetForm() {
    setFormData({
      code: '',
      partnerName: '',
      partnerType: 'ambassador',
      discountPercent: 10,
      maxUsage: 100,
      eventId: '',
    });

    setFormError('');
  }

  function closeModal() {
    setShowModal(false);
    resetForm();
  }

  // ========================================
  // CREATE PROMO
  // ========================================

  async function handleAddCode(event) {
    event.preventDefault();

    setFormError('');
    setSuccessMessage('');

    const code = formData.code
      .trim()
      .toUpperCase();

    const partnerName =
      formData.partnerName.trim();

    const discountPercent = Number(
      formData.discountPercent
    );

    const maxUsage =
      formData.maxUsage === ''
        ? null
        : Number(formData.maxUsage);

    if (code.length < 3) {
      setFormError(
        'Promo code must be at least 3 characters.'
      );

      return;
    }

    if (
      !/^[A-Z0-9_-]+$/.test(code)
    ) {
      setFormError(
        'Promo code can only contain capital letters, numbers, hyphens and underscores.'
      );

      return;
    }

    if (partnerName.length < 2) {
      setFormError(
        'Partner or ambassador name is required.'
      );

      return;
    }

    if (
      discountPercent < 1 ||
      discountPercent > 100
    ) {
      setFormError(
        'Discount must be between 1 and 100 percent.'
      );

      return;
    }

    if (
      maxUsage !== null &&
      (
        !Number.isInteger(maxUsage) ||
        maxUsage < 1
      )
    ) {
      setFormError(
        'Usage limit must be a positive whole number.'
      );

      return;
    }

    try {
      await createPromoCode({
        code,
        partnerName,

        partnerType:
          formData.partnerType,

        discountPercent,
        maxUsage,

        eventId:
          formData.eventId || null,
      }).unwrap();

      setSuccessMessage(
        `Promo code ${code} created successfully.`
      );

      closeModal();
      await refetch();
    } catch (requestError) {
      setFormError(
        requestError?.data?.message ||
          requestError?.error ||
          'Promo code could not be created.'
      );
    }
  }

  // ========================================
  // ENABLE / DISABLE
  // ========================================

  async function handleToggle(promo) {
    if (!promo?._id || isToggling) {
      return;
    }

    setProcessingId(promo._id);
    setFormError('');
    setSuccessMessage('');

    try {
      await togglePromoCode({
        id: promo._id,
        isActive: !promo.isActive,
      }).unwrap();

      setSuccessMessage(
        `${promo.code} has been ${
          promo.isActive
            ? 'disabled'
            : 'enabled'
        }.`
      );

      await refetch();
    } catch (requestError) {
      setFormError(
        requestError?.data?.message ||
          requestError?.error ||
          'Promo status could not be updated.'
      );
    } finally {
      setProcessingId(null);
    }
  }

  // ========================================
  // UI
  // ========================================

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      {/* Heading */}

      <div className="promo-page-heading">
        <div>
          <div className="promo-title-row">
            <h1>
              Promo Code Management
            </h1>

            <span className="promo-heading-badge">
              discounts & perks
            </span>
          </div>

          <p>
            Create secure promotional
            vouchers and manage their
            availability.
          </p>
        </div>

        <div className="promo-heading-actions">
          <button
            type="button"
            className="db-btn-white-pill"
            disabled={isFetching}
            onClick={() => refetch()}
          >
            {isFetching ? (
              <Loader2
                size={15}
                className="promo-spinner"
              />
            ) : (
              <RefreshCw size={15} />
            )}

            Refresh
          </button>

          <button
            type="button"
            className="db-btn-purple-pill"
            onClick={() => {
              setFormError('');
              setShowModal(true);
            }}
          >
            <Plus size={16} />
            Add Promo Code
          </button>
        </div>
      </div>

      {/* Messages */}

      {successMessage && (
        <div className="promo-message promo-message--success">
          {successMessage}
        </div>
      )}

      {formError && !showModal && (
        <div className="promo-message promo-message--error">
          {formError}
        </div>
      )}

      {/* Summary cards */}

      <div className="promo-summary-grid">
        <div className="promo-summary-card">
          <div className="promo-summary-icon promo-summary-icon--purple">
            <Tag size={21} />
          </div>

          <div>
            <strong>
              {promos.length}
            </strong>
            <span>Total promo codes</span>
          </div>
        </div>

        <div className="promo-summary-card">
          <div className="promo-summary-icon promo-summary-icon--green">
            <TicketPercent size={21} />
          </div>

          <div>
            <strong>
              {
                promos.filter(
                  (promo) =>
                    promo.isActive
                ).length
              }
            </strong>
            <span>Currently active</span>
          </div>
        </div>

        <div className="promo-summary-card">
          <div className="promo-summary-icon promo-summary-icon--pink">
            <Users size={21} />
          </div>

          <div>
            <strong>
              {promos.reduce(
                (total, promo) =>
                  total +
                  Number(
                    promo.usageCount ||
                      0
                  ),
                0
              )}
            </strong>
            <span>Total redemptions</span>
          </div>
        </div>
      </div>

      {/* Promo table */}

      <div className="db-card">
        {isLoading && (
          <div className="promo-empty-state">
            <Loader2
              size={32}
              className="promo-spinner"
            />
            Loading promo codes...
          </div>
        )}

        {!isLoading && isError && (
          <div className="promo-empty-state">
            <strong>
              Promo codes could not be
              loaded.
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

        {!isLoading &&
          !isError &&
          promos.length === 0 && (
            <div className="promo-empty-state">
              <Tag size={34} />

              <strong>
                No promo codes created yet.
              </strong>

              <span>
                Create the first promo code
                using the button above.
              </span>
            </div>
          )}

        {!isLoading &&
          !isError &&
          promos.length > 0 && (
            <div
              style={{
                overflowX: 'auto',
              }}
            >
              <table className="db-table-clean">
                <thead>
                  <tr>
                    <th>Voucher Code</th>
                    <th>Discount</th>
                    <th>Partner</th>
                    <th>Partner Type</th>
                    <th>Event</th>
                    <th>Redemptions</th>
                    <th>Status</th>

                    <th
                      style={{
                        textAlign:
                          'center',
                      }}
                    >
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {promos.map((promo) => {
                    const usageCount =
                      Number(
                        promo.usageCount ||
                          0
                      );

                    const maxUsage =
                      promo.maxUsage;

                    const limitReached =
                      maxUsage !== null &&
                      usageCount >=
                        maxUsage;

                    const eventTitle =
                      typeof promo.eventId ===
                      'object'
                        ? promo.eventId
                            ?.title
                        : promo.eventId
                        ? 'Specific Event'
                        : 'All Events';

                    return (
                      <tr key={promo._id}>
                        <td>
                          <div className="promo-code-cell">
                            <Tag size={14} />

                            <strong>
                              {promo.code}
                            </strong>
                          </div>
                        </td>

                        <td>
                          <span className="promo-discount">
                            {
                              promo.discountPercent
                            }
                            % OFF
                          </span>
                        </td>

                        <td>
                          <strong>
                            {promo.partnerName}
                          </strong>
                        </td>

                        <td>
                          {formatPartnerType(
                            promo.partnerType
                          )}
                        </td>

                        <td>
                          {eventTitle}
                        </td>

                        <td>
                          <div className="promo-usage">
                            <strong>
                              {usageCount}
                              {' / '}
                              {maxUsage ??
                                'Unlimited'}
                            </strong>

                            {limitReached && (
                              <small>
                                Limit reached
                              </small>
                            )}
                          </div>
                        </td>

                        <td>
                          <span
                            className={`db-badge-status ${
                              promo.isActive &&
                              !limitReached
                                ? 'db-badge-status--green'
                                : 'db-badge-status--red'
                            }`}
                          >
                            {limitReached
                              ? 'Fully Used'
                              : promo.isActive
                              ? 'Active'
                              : 'Inactive'}
                          </span>
                        </td>

                        <td
                          style={{
                            textAlign:
                              'center',
                          }}
                        >
                          <button
                            type="button"
                            className={`promo-toggle-button ${
                              promo.isActive
                                ? 'promo-toggle-button--active'
                                : ''
                            }`}
                            disabled={
                              processingId ===
                                promo._id ||
                              limitReached
                            }
                            onClick={() =>
                              handleToggle(
                                promo
                              )
                            }
                          >
                            {processingId ===
                            promo._id ? (
                              <Loader2
                                size={13}
                                className="promo-spinner"
                              />
                            ) : promo.isActive ? (
                              'Disable'
                            ) : (
                              'Activate'
                            )}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
      </div>

      {/* Create modal */}

      {showModal && (
        <div
          className="db-modal-overlay"
          onClick={closeModal}
        >
          <div
            className="db-modal-box promo-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="promo-modal-header">
              <div>
                <span>
                  SECURE VOUCHER
                </span>

                <h2>
                  Create Promo Code
                </h2>
              </div>

              <button
                type="button"
                className="promo-close-button"
                onClick={closeModal}
              >
                <X size={19} />
              </button>
            </div>

            {formError && (
              <div className="promo-message promo-message--error">
                {formError}
              </div>
            )}

            <form onSubmit={handleAddCode}>
              <div className="promo-form-field">
                <label>
                  Promo Code
                </label>

                <input
                  type="text"
                  placeholder="LOOPVERSE25"
                  value={formData.code}
                  maxLength={30}
                  required
                  autoFocus
                  onChange={(event) =>
                    handleCodeChange(
                      event.target.value
                    )
                  }
                />

                <small>
                  Capital letters, numbers,
                  hyphens and underscores only.
                </small>
              </div>

              <div className="promo-form-field">
                <label>
                  Partner/Ambassador Name
                </label>

                <input
                  type="text"
                  placeholder="Enter partner name"
                  value={
                    formData.partnerName
                  }
                  maxLength={100}
                  required
                  onChange={(event) =>
                    updateField(
                      'partnerName',
                      event.target.value
                    )
                  }
                />
              </div>

              <div className="promo-form-row">
                <div className="promo-form-field">
                  <label>
                    Partner Type
                  </label>

                  <select
                    value={
                      formData.partnerType
                    }
                    onChange={(event) =>
                      updateField(
                        'partnerType',
                        event.target.value
                      )
                    }
                  >
                    <option value="ambassador">
                      Ambassador
                    </option>

                    <option value="community_partner">
                      Community Partner
                    </option>
                  </select>
                </div>

                <div className="promo-form-field">
                  <label>
                    Discount Percentage
                  </label>

                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={
                      formData.discountPercent
                    }
                    required
                    onChange={(event) =>
                      updateField(
                        'discountPercent',
                        event.target.value
                      )
                    }
                  />
                </div>
              </div>

              <div className="promo-form-row">
                <div className="promo-form-field">
                  <label>
                    Maximum Usage
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={
                      formData.maxUsage
                    }
                    placeholder="100"
                    onChange={(event) =>
                      updateField(
                        'maxUsage',
                        event.target.value
                      )
                    }
                  />

                  <small>
                    Leave empty for unlimited
                    usage.
                  </small>
                </div>

                <div className="promo-form-field">
                  <label>
                    Event
                  </label>

                  <select
                    value={
                      formData.eventId
                    }
                    onChange={(event) =>
                      updateField(
                        'eventId',
                        event.target.value
                      )
                    }
                  >
                    <option value="">
                      All Events
                    </option>

                    {events.map((event) => (
                      <option
                        key={event._id}
                        value={event._id}
                      >
                        {event.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="promo-modal-actions">
                <button
                  type="button"
                  className="db-btn-white-pill"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="db-btn-purple-pill"
                  disabled={isCreating}
                >
                  {isCreating ? (
                    <Loader2
                      size={15}
                      className="promo-spinner"
                    />
                  ) : (
                    <Plus size={15} />
                  )}

                  {isCreating
                    ? 'Creating...'
                    : 'Create Code'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx global>{`
        .promo-page-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 20px;
        }

        .promo-title-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .promo-title-row h1 {
          margin: 0;
          font-size: 1.6rem;
          font-weight: 900;
          color: var(
            --dz-text-primary,
            #111827
          );
        }

        .promo-page-heading p {
          margin: 6px 0 0;
          color: var(
            --dz-text-muted,
            #9ca3af
          );
          font-size: 0.85rem;
          font-weight: 600;
        }

        .promo-heading-badge {
          padding: 4px 10px;
          border-radius: 8px;
          background: #fb923c;
          color: #ffffff;
          font-size: 0.65rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          transform: rotate(-2deg);
        }

        .promo-heading-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .promo-summary-grid {
          display: grid;
          grid-template-columns:
            repeat(3, minmax(0, 1fr));
          gap: 14px;
          margin-bottom: 18px;
        }

        .promo-summary-card {
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 18px;
          border: 1px solid
            rgba(17, 24, 39, 0.08);
          border-radius: 18px;
          background: #ffffff;
          box-shadow:
            0 12px 30px
            rgba(17, 24, 39, 0.06);
        }

        .promo-summary-card strong {
          display: block;
          font-size: 1.4rem;
          color: #111827;
        }

        .promo-summary-card span {
          color: #9ca3af;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .promo-summary-icon {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
        }

        .promo-summary-icon--purple {
          color: #6d28d9;
          background: #ede9fe;
        }

        .promo-summary-icon--green {
          color: #15803d;
          background: #dcfce7;
        }

        .promo-summary-icon--pink {
          color: #be185d;
          background: #fce7f3;
        }

        .promo-code-cell {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #6d28d9;
        }

        .promo-code-cell strong {
          color: #111827;
          letter-spacing: 0.06em;
        }

        .promo-discount {
          padding: 5px 9px;
          border-radius: 8px;
          background: #f3e8ff;
          color: #7e22ce;
          font-weight: 900;
          white-space: nowrap;
        }

        .promo-usage {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .promo-usage small {
          color: #dc2626;
          font-weight: 700;
        }

        .promo-toggle-button {
          min-width: 90px;
          padding: 7px 12px;
          border: 1px solid #d1d5db;
          border-radius: 999px;
          background: #f3f4f6;
          color: #4b5563;
          cursor: pointer;
          font-weight: 800;
        }

        .promo-toggle-button--active {
          background: #dcfce7;
          border-color: #86efac;
          color: #15803d;
        }

        .promo-toggle-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .promo-empty-state {
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

        .promo-message {
          padding: 11px 14px;
          margin-bottom: 14px;
          border-radius: 10px;
          font-size: 0.8rem;
          font-weight: 800;
        }

        .promo-message--success {
          background: #ecfdf5;
          border: 1px solid #86efac;
          color: #166534;
        }

        .promo-message--error {
          background: #fef2f2;
          border: 1px solid #fca5a5;
          color: #b91c1c;
        }

        .promo-modal {
          width: min(620px, 94vw);
          padding: 24px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .promo-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 18px;
        }

        .promo-modal-header span {
          color: #7c3aed;
          font-size: 0.65rem;
          font-weight: 900;
          letter-spacing: 0.15em;
        }

        .promo-modal-header h2 {
          margin: 5px 0 0;
          color: #111827;
          font-size: 1.35rem;
          font-weight: 900;
        }

        .promo-close-button {
          width: 36px;
          height: 36px;
          border: 1px solid #e5e7eb;
          border-radius: 50%;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .promo-form-field {
          margin-bottom: 14px;
        }

        .promo-form-field label {
          display: block;
          margin-bottom: 6px;
          color: #374151;
          font-size: 0.75rem;
          font-weight: 900;
        }

        .promo-form-field input,
        .promo-form-field select {
          width: 100%;
          min-height: 46px;
          padding: 10px 12px;
          border: 1.5px solid #d1d5db;
          border-radius: 10px;
          background: #ffffff;
          color: #111827;
          outline: none;
          font: inherit;
          box-sizing: border-box;
        }

        .promo-form-field input:focus,
        .promo-form-field select:focus {
          border-color: #7c3aed;
          box-shadow:
            0 0 0 3px
            rgba(124, 58, 237, 0.1);
        }

        .promo-form-field small {
          display: block;
          margin-top: 5px;
          color: #9ca3af;
          font-size: 0.68rem;
        }

        .promo-form-row {
          display: grid;
          grid-template-columns:
            repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .promo-modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 20px;
        }

        .promo-spinner {
          animation:
            promo-spinner-animation
            0.8s linear infinite;
        }

        @keyframes promo-spinner-animation {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 760px) {
          .promo-page-heading {
            align-items: stretch;
            flex-direction: column;
          }

          .promo-heading-actions {
            justify-content:
              space-between;
          }

          .promo-summary-grid {
            grid-template-columns: 1fr;
          }

          .promo-form-row {
            grid-template-columns: 1fr;
            gap: 0;
          }
        }
      `}</style>
    </div>
  );
}