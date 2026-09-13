'use client';

import { TicketPercent, UploadCloud, Loader2 } from 'lucide-react';

export default function StepPaymentReview({
  event,
  formData,
  promoCode,
  setPromoCode,
  promoResult,
  handleApplyPromo,
  validatingPromo,
  receipt,
  setReceipt,
}) {
  const baseFee = Number(event?.baseFee || 0);
  const discountPercent = Number(promoResult?.discountPercent || 0);
  const finalFee = Math.max(0, baseFee - (baseFee * discountPercent) / 100);

  return (
    <div className="lvr-step-body">
      <div className="lvr-step-title-wrap">
        <h3 className="lvr-step-heading">4. Payment & Review</h3>
        <p className="lvr-step-desc">Review summary, apply promo codes, and finalize your registration.</p>
      </div>

      <div className="lvr-payment-box">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span>Event Title:</span>
          <strong>{event?.title || 'Loopverse 3.0'}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span>Selected Track:</span>
          <strong style={{ textTransform: 'capitalize' }}>{formData.track} Sprint</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span>Selected Module:</span>
          <strong>{formData.module}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', marginTop: '16px', paddingTop: '12px', borderTop: '2px dashed #ccc' }}>
          <span>Registration Fee:</span>
          <strong style={{ color: '#9E00FE' }}>PKR {finalFee}</strong>
        </div>
      </div>

      <div className="lvr-grid">
        {/* Promo Code input */}
        <div className="lvr-field-group">
          <label className="lvr-label">Have a Promo Code?</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              className="lvr-input"
              type="text"
              placeholder="PROMO CODE"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
            />
            <button
              type="button"
              className="lvr-btn lvr-btn--next"
              style={{ padding: '8px 16px' }}
              onClick={handleApplyPromo}
              disabled={validatingPromo}
            >
              {validatingPromo ? <Loader2 size={16} className="animate-spin" /> : <TicketPercent size={16} />}
              Apply
            </button>
          </div>
          {promoResult && (
            <p style={{ fontSize: '0.85rem', color: '#10B981', fontWeight: '700', marginTop: '4px' }}>
              {promoResult.discountPercent}% Discount Applied!
            </p>
          )}
        </div>

        {/* Receipt Upload if baseFee > 0 */}
        <div className="lvr-field-group">
          <label className="lvr-label">Payment Receipt {baseFee > 0 && <span className="lvr-req">*</span>}</label>
          <label className="lvr-upload-dropzone">
            <UploadCloud size={24} color="#9E00FE" />
            <span style={{ fontSize: '0.88rem', fontWeight: '700' }}>
              {receipt ? receipt.name : 'Click to Upload Receipt'}
            </span>
            <small style={{ color: '#666' }}>JPG, PNG, WebP or PDF (Max 5MB)</small>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.webp,.pdf"
              onChange={(e) => e.target.files?.[0] && setReceipt(e.target.files[0])}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
