'use client';

import { ArrowLeft, ArrowRight, Loader2, Send } from 'lucide-react';
import Link from 'next/link';
import { useLoopverseForm } from './hooks/useLoopverseForm';
import RegisterStepHeader from './components/RegisterStepHeader';
import StepPersonalDetails from './components/StepPersonalDetails';
import StepAcademicTrack from './components/StepAcademicTrack';
import StepModuleCustom from './components/StepModuleCustom';
import StepPaymentReview from './components/StepPaymentReview';
import RegisterSuccessState from './components/RegisterSuccessState';
import '@/app/styles/loopverse-registration.css';

export default function LoopverseRegisterView() {
  const form = useLoopverseForm();

  if (form.eventLoading) {
    return (
      <div className="lvr-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.2rem', fontWeight: 700 }}>
          <Loader2 size={24} className="animate-spin" color="#9E00FE" /> Loading Registration Portal...
        </div>
      </div>
    );
  }

  return (
    <div className="lvr-page">
      <div className="lvr-container">
        <div className="lvr-hero-header">
          <Link href="/loopverse" className="lvr-badge" style={{ textDecoration: 'none' }}>
            <ArrowLeft size={14} /> Back to Loopverse 3.0
          </Link>
          <h1 className="lvr-title">
            Enter the <span>Loop.</span>
          </h1>
          <p className="lvr-subtitle">
            Complete the 4-step registration wizard below to secure your spot for Loopverse 3.0 national hackathon.
          </p>
        </div>

        <div className="lvr-card">
          {!form.isSuccess && (
            <RegisterStepHeader currentStep={form.currentStep} onStepClick={(s) => form.setCurrentStep(s)} />
          )}

          {form.errorMsg && <div className="lvr-error-alert">{form.errorMsg}</div>}

          {form.currentStep === 1 && (
            <StepPersonalDetails formData={form.formData} updateField={form.updateField} />
          )}

          {form.currentStep === 2 && (
            <StepAcademicTrack formData={form.formData} updateField={form.updateField} />
          )}

          {form.currentStep === 3 && (
            <StepModuleCustom
              formData={form.formData}
              updateField={form.updateField}
              updateAnswer={form.updateAnswer}
              dynamicFields={form.dynamicFields}
            />
          )}

          {form.currentStep === 4 && (
            <StepPaymentReview
              event={form.event}
              formData={form.formData}
              promoCode={form.promoCode}
              setPromoCode={form.setPromoCode}
              promoResult={form.promoResult}
              handleApplyPromo={form.handleApplyPromo}
              validatingPromo={form.validatingPromo}
              receipt={form.receipt}
              setReceipt={form.setReceipt}
            />
          )}

          {form.isSuccess && <RegisterSuccessState formData={form.formData} event={form.event} />}

          {!form.isSuccess && (
            <div className="lvr-step-footer">
              <button
                type="button"
                className="lvr-btn lvr-btn--back"
                onClick={form.prevStep}
                disabled={form.currentStep === 1}
              >
                <ArrowLeft size={16} /> Back
              </button>

              {form.currentStep < 4 ? (
                <button type="button" className="lvr-btn lvr-btn--next" onClick={form.nextStep}>
                  Next <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  className="lvr-btn lvr-btn--submit"
                  onClick={form.handleFormSubmit}
                  disabled={form.uploadingReceipt || form.submitting}
                >
                  {form.uploadingReceipt || form.submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Submit Registration
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
