'use client';

import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  CheckCircle2,
  Loader2,
  TicketPercent,
  UploadCloud,
} from 'lucide-react';

import {
  useGetEventBySlugQuery,
} from '@/store/api/eventApi';

import {
  useSubmitRegistrationMutation,
  useUploadReceiptMutation,
  useValidatePromoCodeMutation,
} from '@/store/api/registrationApi';


const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
];

const MAX_FILE_SIZE =
  5 * 1024 * 1024;


function getErrorMessage(error) {
  if (error?.data?.errors?.length) {
    return error.data.errors
      .map((item) => item.message)
      .join(', ');
  }

  return (
    error?.data?.message ||
    error?.error ||
    'Something went wrong. Please try again.'
  );
}


function createInitialAnswers(fields) {
  return fields.reduce(
    (result, field) => {
      result[field.fieldId] =
        field.fieldType === 'checkbox'
          ? false
          : '';

      return result;
    },
    {}
  );
}


export default function LoopverseRegistrationForm() {
  const {
    data: event,
    isLoading: eventLoading,
    isError: eventError,
    error: eventFetchError,
  } = useGetEventBySlugQuery(
    'loopverse-3'
  );


  const [answers, setAnswers] =
    useState({});

  const [promoCode, setPromoCode] =
    useState('');

  const [promoResult, setPromoResult] =
    useState(null);

  const [receipt, setReceipt] =
    useState(null);

  const [formError, setFormError] =
    useState('');

  const [success, setSuccess] =
    useState(false);


  const [
    validatePromo,
    {
      isLoading: validatingPromo,
    },
  ] = useValidatePromoCodeMutation();


  const [
    uploadReceipt,
    {
      isLoading: uploadingReceipt,
    },
  ] = useUploadReceiptMutation();


  const [
    submitRegistration,
    {
      isLoading: submitting,
    },
  ] = useSubmitRegistrationMutation();


  const fields = useMemo(
    () =>
      [...(event?.formFields || [])]
        .sort(
          (first, second) =>
            first.order - second.order
        ),
    [event]
  );


  useEffect(() => {
    if (fields.length) {
      setAnswers(
        createInitialAnswers(fields)
      );
    }
  }, [fields]);


  function updateAnswer(
    fieldId,
    value
  ) {
    setAnswers((current) => ({
      ...current,
      [fieldId]: value,
    }));
  }


  function handlePromoInput(eventObject) {
    const value =
      eventObject.target.value
        .toUpperCase()
        .replace(/[^A-Z0-9-]/g, '')
        .slice(0, 20);

    setPromoCode(value);
    setPromoResult(null);
    setFormError('');
  }


  async function applyPromoCode() {
    setFormError('');
    setPromoResult(null);

    if (!promoCode) {
      setFormError(
        'Please enter a promo code.'
      );

      return;
    }

    try {
      const result =
        await validatePromo({
          code: promoCode,
          eventId: event._id,
        }).unwrap();

      setPromoResult(result);
    } catch (error) {
      setFormError(
        getErrorMessage(error)
      );
    }
  }


  function handleFileChange(eventObject) {
    const file =
      eventObject.target.files?.[0];

    setFormError('');

    if (!file) {
      setReceipt(null);
      return;
    }

    if (
      !ALLOWED_FILE_TYPES.includes(
        file.type
      )
    ) {
      eventObject.target.value = '';
      setReceipt(null);

      setFormError(
        'Only JPG, PNG, WebP or PDF files are allowed.'
      );

      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      eventObject.target.value = '';
      setReceipt(null);

      setFormError(
        'File size must not exceed 5 MB.'
      );

      return;
    }

    setReceipt(file);
  }


  function validateForm() {
    for (const field of fields) {
      if (!field.isRequired) {
        continue;
      }

      if (
        field.fieldType ===
        'checkbox'
      ) {
        continue;
      }

      const value =
        answers[field.fieldId];

      if (
        value === undefined ||
        value === null ||
        String(value).trim() === ''
      ) {
        return `${field.label} is required.`;
      }
    }

    return '';
  }


  async function handleSubmit(eventObject) {
    eventObject.preventDefault();

    setFormError('');
    setSuccess(false);

    const validationError =
      validateForm();

    if (validationError) {
      setFormError(validationError);
      return;
    }

    if (
      Number(event.baseFee || 0) > 0 &&
      !receipt
    ) {
      setFormError(
        'Please upload your payment receipt.'
      );

      return;
    }

    try {
      let receiptUrl = '';

      if (receipt) {
        const uploadedFile =
          await uploadReceipt(
            receipt
          ).unwrap();

        receiptUrl =
          uploadedFile?.url || '';
      }

      await submitRegistration({
        eventId: event._id,

        participantData: {
          ...answers,

          needsParking:
            Boolean(
              answers.needsParking
            ),
        },

        appliedPromoCode:
          promoCode,

        paymentScreenshotUrl:
          receiptUrl,
      }).unwrap();

      setSuccess(true);

      setAnswers(
        createInitialAnswers(fields)
      );

      setPromoCode('');
      setPromoResult(null);
      setReceipt(null);

      eventObject.currentTarget.reset();
    } catch (error) {
      const message =
        getErrorMessage(error);

      if (
        error?.status === 409 ||
        message
          .toLowerCase()
          .includes('already')
      ) {
        setFormError(
          'You are already registered for Loopverse 3.0.'
        );

        return;
      }

      setFormError(message);
    }
  }


  function renderField(field) {
    const value =
      answers[field.fieldId];

    if (
      field.fieldType ===
      'dropdown'
    ) {
      return (
        <select
          id={field.fieldId}
          className="lv-form-input"
          value={value || ''}
          required={field.isRequired}
          onChange={(eventObject) =>
            updateAnswer(
              field.fieldId,
              eventObject.target.value
            )
          }
        >
          <option value="">
            {field.placeholder ||
              `Select ${field.label}`}
          </option>

          {(field.options || []).map(
            (option) => (
              <option
                value={option}
                key={option}
              >
                {option}
              </option>
            )
          )}
        </select>
      );
    }


    if (
      field.fieldType ===
      'radio'
    ) {
      return (
        <div className="lv-form-options">
          {(field.options || []).map(
            (option) => (
              <label
                className="lv-form-option"
                key={option}
              >
                <input
                  type="radio"
                  name={field.fieldId}
                  value={option}
                  checked={
                    value === option
                  }
                  required={
                    field.isRequired
                  }
                  onChange={(eventObject) =>
                    updateAnswer(
                      field.fieldId,
                      eventObject.target.value
                    )
                  }
                />

                <span>
                  {option}
                </span>
              </label>
            )
          )}
        </div>
      );
    }


    if (
      field.fieldType ===
      'checkbox'
    ) {
      return (
        <label className="lv-form-checkbox">
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(eventObject) =>
              updateAnswer(
                field.fieldId,
                eventObject.target.checked
              )
            }
          />

          <span>
            Yes, I require parking.
          </span>
        </label>
      );
    }


    if (
      field.fieldType ===
      'textarea'
    ) {
      return (
        <textarea
          id={field.fieldId}
          className="lv-form-input lv-form-textarea"
          placeholder={
            field.placeholder
          }
          value={value || ''}
          required={field.isRequired}
          onChange={(eventObject) =>
            updateAnswer(
              field.fieldId,
              eventObject.target.value
            )
          }
        />
      );
    }


    return (
      <input
        id={field.fieldId}
        className="lv-form-input"
        type={
          field.fieldType === 'email'
            ? 'email'
            : field.fieldType ===
                'number'
              ? 'number'
              : 'text'
        }
        placeholder={field.placeholder}
        value={value || ''}
        required={field.isRequired}
        onChange={(eventObject) =>
          updateAnswer(
            field.fieldId,
            eventObject.target.value
          )
        }
      />
    );
  }


  if (eventLoading) {
    return (
      <section
        className="lv-registration-section"
        id="loopverse-registration"
      >
        <div className="lv-registration-loading">
          <Loader2 size={22} />
          Loading registration form...
        </div>
      </section>
    );
  }


  if (eventError || !event) {
   return (
      <section
        className="lv-registration-section"
        id="loopverse-registration"
      >
        <div className="lv-form-message lv-form-message--error">
          {getErrorMessage(
            eventFetchError
          )}
        </div>
      </section>
    );
  }


  if (!event.isActive) {
    return (
      <section
        className="lv-registration-section"
        id="loopverse-registration"
      >
        <div className="lv-form-message">
          Registrations are currently
          closed.
        </div>
      </section>
    );
  }


  if (success) {
    return (
      <section
        className="lv-registration-section"
        id="loopverse-registration"
      >
        <div className="lv-registration-success">
          <CheckCircle2 size={56} />

          <p className="lv-registration-eyebrow">
            Registration received
          </p>

          <h2>
            You’re officially in the
            loop!
          </h2>

          <p>
            Your registration has been
            submitted and is waiting for
            admin approval.
          </p>

          <button
            type="button"
            className="lv-submit-button"
            onClick={() =>
              setSuccess(false)
            }
          >
            Return to form
          </button>
        </div>
      </section>
    );
  }


  const discount =
    Number(
      promoResult?.discountPercent ||
      0
    );

  const finalFee = Math.max(
    0,

    Number(event.baseFee || 0) -
      (Number(event.baseFee || 0) *
        discount) /
        100
  );


  return (
    <section
      className="lv-registration-section"
      id="loopverse-registration"
    >
      <div className="lv-registration-heading">
        <p className="lv-registration-eyebrow">
          Registration portal
        </p>

        <h2>
          Enter the <span>Loop.</span>
        </h2>

        <p>
          Complete the form below to
          register for {event.title}.
          Your submission will be
          reviewed by LoopLab.
        </p>
      </div>


      <form
        className="lv-registration-form"
        onSubmit={handleSubmit}
      >
        <div className="lv-form-top">
          <div>
            <span>Event</span>

            <strong>
              {event.title}
            </strong>
          </div>

          <div>
            <span>
              Registration fee
            </span>

            <strong>
              PKR {finalFee}
            </strong>
          </div>
        </div>


        {formError && (
          <div className="lv-form-message lv-form-message--error">
            {formError}
          </div>
        )}


        <div className="lv-form-grid">
          {fields.map((field) => (
            <div
              className={
                `lv-form-group ` +
                `${
                  field.fieldType ===
                    'radio' ||
                  field.fieldType ===
                    'checkbox' ||
                  field.fieldType ===
                    'textarea'
                    ? 'lv-form-group--wide'
                    : ''
                }`
              }
              key={field.fieldId}
            >
              <label
                className="lv-form-label"
                htmlFor={field.fieldId}
              >
                {field.label}

                {field.isRequired && (
                  <span> *</span>
                )}
              </label>

              {renderField(field)}
            </div>
          ))}
        </div>


        <div className="lv-form-divider" />


        <div className="lv-form-grid">
          {/* Promo code */}

          <div className="lv-form-group">
            <label className="lv-form-label">
              Promo code
            </label>

            <div className="lv-promo-row">
              <input
                className="lv-form-input"
                type="text"
                value={promoCode}
                onChange={
                  handlePromoInput
                }
                placeholder="ENTER PROMO CODE"
                autoComplete="off"
              />

              <button
                type="button"
                onClick={
                  applyPromoCode
                }
                disabled={
                  validatingPromo
                }
              >
                <TicketPercent
                  size={17}
                />

                {validatingPromo
                  ? 'Checking'
                  : 'Apply'}
              </button>
            </div>

            {promoResult && (
              <p className="lv-promo-success">
                {
                  promoResult.discountPercent
                }
                % discount applied.
              </p>
            )}
          </div>


          {/* Receipt upload */}

          <div className="lv-form-group">
            <label className="lv-form-label">
              Payment receipt

              {Number(event.baseFee) >
                0 && <span> *</span>}
            </label>

            <label className="lv-upload-box">
              <UploadCloud size={24} />

              <span>
                {receipt
                  ? receipt.name
                  : 'Upload receipt or document'}
              </span>

              <small>
                JPG, PNG, WebP or PDF —
                maximum 5 MB
              </small>

              <input
                type="file"
                accept=".jpg,.jpeg,.png,.webp,.pdf"
                onChange={
                  handleFileChange
                }
              />
            </label>
          </div>
        </div>


        <button
          type="submit"
          className="lv-submit-button"
          disabled={
            uploadingReceipt ||
            submitting
          }
        >
          {uploadingReceipt ? (
            <>
              <Loader2 size={19} />
              Uploading file...
            </>
          ) : submitting ? (
            <>
              <Loader2 size={19} />
              Submitting...
            </>
          ) : (
            <>
              Submit Registration
              <span>→</span>
            </>
          )}
        </button>
      </form>
    </section>
  );
}