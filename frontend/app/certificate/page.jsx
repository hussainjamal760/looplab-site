'use client';

import { useState } from 'react';

import {
  Search,
  BadgeCheck,
  XCircle,
  CalendarDays,
  MapPin,
  GraduationCap,
  Layers,
  Printer,
  Infinity as InfinityIcon,
  Loader2,
} from 'lucide-react';

import { Navbar } from '@/features/navbar/Navbar';

import Footer from '@/features/footer/components/Footer';

import {
  useLazyVerifyCertificateQuery,
} from '@/store/api/certificateApi';

import '@/app/styles/certificate.css';

function formatDate(value) {
  if (!value) return '—';

  const date = new Date(value);

  if (
    Number.isNaN(date.getTime())
  ) {
    return '—';
  }

  return new Intl.DateTimeFormat(
    'en-GB',
    {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }
  ).format(date);
}

export default function CertificatePage() {
  const [certificateId, setCertificateId] =
    useState('');

  const [certificate, setCertificate] =
    useState(null);

  const [errorMessage, setErrorMessage] =
    useState('');

  const [
    verifyCertificate,
    { isFetching },
  ] =
    useLazyVerifyCertificateQuery();

  function handleIdChange(value) {
    const cleanValue = value
      .toUpperCase()
      .replace(
        /[^A-Z0-9-]/g,
        ''
      );

    setCertificateId(cleanValue);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const cleanId =
      certificateId
        .trim()
        .toUpperCase();

    setCertificate(null);
    setErrorMessage('');

    if (!cleanId) {
      setErrorMessage(
        'Please enter a certificate ID.'
      );

      return;
    }

    try {
      const result =
        await verifyCertificate(
          cleanId
        ).unwrap();

      setCertificate(result);
    } catch (error) {
      setErrorMessage(
        error?.data?.message ||
          'Certificate not found or is not valid.'
      );
    }
  }

  return (
    <>
      <Navbar />

      <main className="certificate-page">
        {/* Decorative background */}

        <div className="certificate-glow certificate-glow-one" />
        <div className="certificate-glow certificate-glow-two" />

        {/* Hero */}

        <section className="certificate-hero">
          <div className="certificate-kicker">
            <BadgeCheck size={17} />
            Official LoopLab Verification
          </div>

          <h1>
            Verify a{' '}
            <span>certificate.</span>
          </h1>

          <p>
            Enter the certificate ID to
            confirm its authenticity and
            view the verified participant
            details.
          </p>

          {/* Search form */}

          <form
            className="certificate-search"
            onSubmit={handleSubmit}
          >
            <div className="certificate-input-wrapper">
              <Search size={20} />

              <input
                type="text"
                value={certificateId}
                maxLength={50}
                autoComplete="off"
                placeholder="LL-2026-5D6EE943"
                aria-label="Certificate ID"
                onChange={(event) =>
                  handleIdChange(
                    event.target.value
                  )
                }
              />
            </div>

            <button
              type="submit"
              disabled={isFetching}
            >
              {isFetching ? (
                <>
                  <Loader2
                    size={18}
                    className="certificate-spinner"
                  />

                  Verifying
                </>
              ) : (
                <>
                  <BadgeCheck
                    size={18}
                  />

                  Verify Certificate
                </>
              )}
            </button>
          </form>

          <small>
            Certificate IDs contain capital
            letters, numbers and hyphens.
          </small>
        </section>

        {/* Error */}

        {errorMessage && (
          <section
            className="certificate-error"
            role="alert"
          >
            <div>
              <XCircle size={28} />
            </div>

            <section>
              <h2>
                Verification Failed
              </h2>

              <p>{errorMessage}</p>
            </section>
          </section>
        )}

        {/* Verified certificate */}

        {certificate && (
          <section className="certificate-result">
            <div className="certificate-result-border">
              <div className="certificate-result-top">
                <div className="certificate-brand">
                  <InfinityIcon
                    size={31}
                  />

                  <span>LOOPLAB</span>
                </div>

                <div className="certificate-verified-badge">
                  <BadgeCheck
                    size={18}
                  />

                  Verified
                </div>
              </div>

              <div className="certificate-result-content">
                <p className="certificate-overline">
                  Official Certificate
                  Verification
                </p>

                <h2>
                  Certificate of
                  Participation
                </h2>

                <p className="certificate-presented">
                  This certificate was
                  officially issued to
                </p>

                <h3>
                  {
                    certificate.participantName
                  }
                </h3>

                <p className="certificate-description">
                  for verified participation
                  in{' '}
                  <strong>
                    {
                      certificate.event
                        ?.title
                    }
                  </strong>
                  .
                </p>

                <div className="certificate-details-grid">
                  <div className="certificate-detail">
                    <GraduationCap
                      size={20}
                    />

                    <div>
                      <span>
                        University
                      </span>

                      <strong>
                        {certificate.university ||
                          '—'}
                      </strong>
                    </div>
                  </div>

                  <div className="certificate-detail">
                    <Layers size={20} />

                    <div>
                      <span>
                        Department
                      </span>

                      <strong>
                        {certificate.department ||
                          '—'}
                      </strong>
                    </div>
                  </div>

                  <div className="certificate-detail">
                    <Layers size={20} />

                    <div>
                      <span>Track</span>

                      <strong>
                        {certificate.track ||
                          '—'}
                      </strong>
                    </div>
                  </div>

                  <div className="certificate-detail">
                    <CalendarDays
                      size={20}
                    />

                    <div>
                      <span>
                        Event Date
                      </span>

                      <strong>
                        {formatDate(
                          certificate
                            .event
                            ?.eventDate
                        )}
                      </strong>
                    </div>
                  </div>

                  <div className="certificate-detail">
                    <MapPin size={20} />

                    <div>
                      <span>Venue</span>

                      <strong>
                        {certificate.event
                          ?.venue || '—'}
                      </strong>
                    </div>
                  </div>

                  <div className="certificate-detail">
                    <BadgeCheck
                      size={20}
                    />

                    <div>
                      <span>
                        Issued On
                      </span>

                      <strong>
                        {formatDate(
                          certificate.issuedAt
                        )}
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="certificate-id-box">
                  <span>
                    Certificate ID
                  </span>

                  <strong>
                    {
                      certificate.certificateId
                    }
                  </strong>
                </div>
              </div>

              <div className="certificate-result-footer">
                <p>
                  This record was verified
                  directly through the
                  official LoopLab database.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    window.print()
                  }
                >
                  <Printer size={17} />
                  Print
                </button>
              </div>
            </div>
          </section>
        )}

        {!certificate &&
          !errorMessage && (
            <section className="certificate-help">
              <div>
                <BadgeCheck size={22} />
              </div>

              <p>
                A valid result will only be
                shown for registrations
                approved by a LoopLab
                administrator.
              </p>
            </section>
          )}
      </main>

      <footer className="main-footer">
        <Footer />
      </footer>
    </>
  );
}