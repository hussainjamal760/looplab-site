'use client';

import { useState } from 'react';
import { CheckCircle2, Loader2, TicketPercent, UploadCloud, Minus, Copy, Check, CreditCard } from 'lucide-react';
import { MODULES_DATA } from '@/features/loopverse-details/modulesData';

export default function StepPaymentReview({
  event,
  formData,
  teammates,
  promoCode,
  setPromoCode,
  promoResult,
  handleApplyPromo,
  validatingPromo,
  receipt,
  setReceipt,
}) {
  const [copiedField, setCopiedField] = useState(null);
  const selectedModule = MODULES_DATA.find((m) => m.title === formData.module) || MODULES_DATA[0];
  const baseFee = selectedModule?.fee || Number(event?.baseFee || 0);
  const discountPercent = Number(promoResult?.discountPercent || 0);
  const discountAmount = Math.round((baseFee * discountPercent) / 100);
  const finalFee = Math.max(0, baseFee - discountAmount);

  function copyToClipboard(text, fieldName) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    }
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (!allowed.includes(file.type)) return;
    if (file.size > 5 * 1024 * 1024) return;
    setReceipt(file);
  }

  return (
    <div className="lvr-step-body">
      <div className="lvr-step-title-wrap">
        <h3 className="lvr-step-heading">4. Payment &amp; Review</h3>
        <p className="lvr-step-desc">Review your summary, apply a promo code, and upload your payment receipt.</p>
      </div>

      {/* Summary Card */}
      <div className="lvr-summary-card">
        <div className="lvr-summary-title">Registration Summary</div>

        <div className="lvr-summary-row">
          <span className="lvr-summary-lbl">Participant</span>
          <span className="lvr-summary-val">{formData.fullName || '—'}</span>
        </div>
        <div className="lvr-summary-row">
          <span className="lvr-summary-lbl">Email</span>
          <span className="lvr-summary-val">{formData.email || '—'}</span>
        </div>
        <div className="lvr-summary-row">
          <span className="lvr-summary-lbl">CNIC / B-Form</span>
          <span className="lvr-summary-val">{formData.cnic || '—'}</span>
        </div>
        <div className="lvr-summary-row">
          <span className="lvr-summary-lbl">University</span>
          <span className="lvr-summary-val">{formData.university || '—'}</span>
        </div>
        <div className="lvr-summary-row">
          <span className="lvr-summary-lbl">Track</span>
          <span className="lvr-summary-val" style={{ textTransform: 'capitalize' }}>
            {formData.track === 'onsite' ? '⚡ Onsite Sprint' : '🌐 Virtual Orbit'}
          </span>
        </div>
        <div className="lvr-summary-row">
          <span className="lvr-summary-lbl">Module</span>
          <span className="lvr-summary-val">{formData.module}</span>
        </div>
        <div className="lvr-summary-row">
          <span className="lvr-summary-lbl">Parking Requested</span>
          <span className="lvr-summary-val">
            {formData.needsParking === 'Yes'
              ? `Yes (${formData.vehicleType} - ${formData.vehicleNumber})`
              : 'No'}
          </span>
        </div>

        {/* Team Members */}
        {teammates && teammates.length > 0 && (
          <div className="lvr-summary-teammates">
            <div className="lvr-summary-teammates-label">Team Members ({teammates.length + 1} total)</div>
            {teammates.map((tm, i) => (
              <div key={i} className="lvr-summary-teammate-row">
                <span className="lvr-summary-teammate-index">{i + 2}</span>
                <div className="lvr-summary-teammate-info">
                  <span className="lvr-summary-teammate-name">{tm.fullName || '—'}</span>
                  <span className="lvr-summary-teammate-meta">{tm.email} · {tm.cnic}</span>
                  {tm.needsParking === 'Yes' && (
                    <span className="lvr-summary-teammate-parking">🚗 Parking: {tm.vehicleType} — {tm.vehicleNumber}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="lvr-fee-breakdown">
          <div className="lvr-fee-row">
            <span>Base Registration Fee</span>
            <span>PKR {baseFee.toLocaleString()}</span>
          </div>

          {discountPercent > 0 && (
            <div className="lvr-fee-row lvr-fee-row--discount">
              <span>
                <Minus size={13} /> Promo Discount ({discountPercent}%)
              </span>
              <span>− PKR {discountAmount.toLocaleString()}</span>
            </div>
          )}

          <div className="lvr-fee-total">
            <span>Total Payable</span>
            <span className="lvr-fee-total-amount">PKR {finalFee.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="lvr-grid">
        {/* Promo Code */}
        <div className="lvr-field-group">
          <label className="lvr-label">Have a Promo Code?</label>
          <div className="lvr-promo-row">
            <input
              className="lvr-input"
              type="text"
              placeholder="ENTER PROMO CODE"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, '').slice(0, 20))}
              autoComplete="off"
            />
            <button
              type="button"
              className="lvr-promo-btn"
              onClick={handleApplyPromo}
              disabled={validatingPromo || !promoCode.trim()}
            >
              {validatingPromo ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <TicketPercent size={15} />
              )}
              {validatingPromo ? 'Checking' : 'Apply'}
            </button>
          </div>

          {promoResult && (
            <div className="lvr-promo-success">
              <CheckCircle2 size={15} />
              {promoResult.discountPercent}% discount applied successfully!
            </div>
          )}
        </div>

        {/* Receipt Upload */}
        <div className="lvr-field-group">
          <label className="lvr-label">
            Payment Receipt {baseFee > 0 && <span className="lvr-req">*</span>}
          </label>
          <label className="lvr-upload-dropzone">
            <UploadCloud size={26} color="#9E00FE" />
            <span className="lvr-upload-filename">
              {receipt ? receipt.name : 'Click to Upload Receipt'}
            </span>
            <small className="lvr-upload-hint">JPG, PNG, WebP or PDF — max 5 MB</small>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.webp,.pdf"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </label>
          {receipt && (
            <div className="lvr-upload-selected">
              <CheckCircle2 size={14} color="#10B981" /> {receipt.name}
            </div>
          )}
        </div>
      </div>

      {/* JazzCash Payment Instructions Card */}
      <div className="lvr-bank-info" style={{ marginTop: '24px' }}>
        <div className="lvr-bank-info-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CreditCard size={18} color="#9E00FE" /> JazzCash Payment Details
        </div>

        <div className="lvr-bank-info-row">
          <span>Account Title</span>
          <strong>Muhammad Qasim Ali Tareen</strong>
        </div>

        <div className="lvr-bank-info-row">
          <span>Bank / Wallet</span>
          <strong>JazzCash</strong>
        </div>

        <div className="lvr-bank-info-row">
          <span>Mobile Account Number</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <strong style={{ fontSize: '1.05rem', color: '#ffffff', letterSpacing: '0.02em' }}>03334093999</strong>
            <button
              type="button"
              onClick={() => copyToClipboard('03334093999', 'number')}
              style={{
                background: copiedField === 'number' ? '#10B981' : '#F3E8FF',
                color: copiedField === 'number' ? '#ffffff' : '#9E00FE',
                border: 'none',
                borderRadius: '8px',
                padding: '4px 10px',
                fontSize: '0.75rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.2s ease',
              }}
            >
              {copiedField === 'number' ? <Check size={12} /> : <Copy size={12} />}
              {copiedField === 'number' ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        <div className="lvr-bank-info-row">
          <span>IBAN</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <strong style={{ fontFamily: 'monospace', fontSize: '0.92rem', color: '#ffffff' }}>PK53JCMA0705923334093999</strong>
            <button
              type="button"
              onClick={() => copyToClipboard('PK53JCMA0705923334093999', 'iban')}
              style={{
                background: copiedField === 'iban' ? '#10B981' : '#F3E8FF',
                color: copiedField === 'iban' ? '#ffffff' : '#9E00FE',
                border: 'none',
                borderRadius: '8px',
                padding: '4px 10px',
                fontSize: '0.75rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.2s ease',
              }}
            >
              {copiedField === 'iban' ? <Check size={12} /> : <Copy size={12} />}
              {copiedField === 'iban' ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        <div className="lvr-bank-info-row" style={{ marginTop: '8px', paddingTop: '10px', borderTop: '1px dashed rgba(255, 255, 255, 0.2)' }}>
          <span>Total Amount Payable</span>
          <strong className="lvr-bank-amount" style={{ fontSize: '1.25rem', color: '#10B981' }}>PKR {finalFee.toLocaleString()}</strong>
        </div>

        <p className="lvr-bank-note" style={{ marginTop: '12px' }}>
          Please transfer exact amount <strong>PKR {finalFee.toLocaleString()}</strong> to the JazzCash account above and upload your transaction receipt before clicking Submit.
        </p>
      </div>
    </div>
  );
}
