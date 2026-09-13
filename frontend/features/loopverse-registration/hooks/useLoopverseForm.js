'use client';

import { useState, useMemo, useEffect } from 'react';
import { useGetEventBySlugQuery } from '@/store/api/eventApi';
import {
  useSubmitRegistrationMutation,
  useUploadReceiptMutation,
  useValidatePromoCodeMutation,
} from '@/store/api/registrationApi';

const DEFAULT_FORM = {
  fullName: '',
  email: '',
  phone: '',
  cnic: '',
  university: '',
  department: '',
  year: '3rd Year',
  track: 'onsite',
  module: 'Web Development',
  needsParking: false,
  answers: {},
};

export function useLoopverseForm() {
  const { data: event, isLoading: eventLoading, isError: eventError } = useGetEventBySlugQuery('loopverse-3');
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(DEFAULT_FORM);
  const [promoCode, setPromoCode] = useState('');
  const [promoResult, setPromoResult] = useState(null);
  const [receipt, setReceipt] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const [validatePromo, { isLoading: validatingPromo }] = useValidatePromoCodeMutation();
  const [uploadReceipt, { isLoading: uploadingReceipt }] = useUploadReceiptMutation();
  const [submitRegistration, { isLoading: submitting }] = useSubmitRegistrationMutation();

  const dynamicFields = useMemo(() => {
    return [...(event?.formFields || [])].sort((a, b) => a.order - b.order);
  }, [event]);

  useEffect(() => {
    if (dynamicFields.length) {
      const initialAnswers = {};
      dynamicFields.forEach((field) => {
        initialAnswers[field.fieldId] = field.fieldType === 'checkbox' ? false : '';
      });
      setFormData((prev) => ({ ...prev, answers: initialAnswers }));
    }
  }, [dynamicFields]);

  function updateField(key, value) {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrorMsg('');
  }

  function updateAnswer(fieldId, value) {
    setFormData((prev) => ({
      ...prev,
      answers: { ...prev.answers, [fieldId]: value },
    }));
    setErrorMsg('');
  }

  function validateStep(step) {
    if (step === 1) {
      if (!formData.fullName.trim()) return 'Full Name is required';
      if (!formData.email.trim() || !formData.email.includes('@')) return 'Valid email address is required';
      if (!formData.phone.trim()) return 'Phone number is required';
    }
    if (step === 2) {
      if (!formData.university.trim()) return 'University / Institute is required';
      if (!formData.department.trim()) return 'Department / Degree is required';
    }
    if (step === 3) {
      for (const field of dynamicFields) {
        if (field.isRequired && field.fieldType !== 'checkbox') {
          const val = formData.answers[field.fieldId];
          if (!val || String(val).trim() === '') {
            return `${field.label} is required`;
          }
        }
      }
    }
    return '';
  }

  function nextStep() {
    const err = validateStep(currentStep);
    if (err) {
      setErrorMsg(err);
      return;
    }
    setErrorMsg('');
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  }

  function prevStep() {
    setErrorMsg('');
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }

  async function handleApplyPromo() {
    if (!promoCode.trim()) return;
    setErrorMsg('');
    try {
      const res = await validatePromo({ code: promoCode, eventId: event._id }).unwrap();
      setPromoResult(res);
    } catch (err) {
      setErrorMsg(err?.data?.message || 'Invalid promo code');
    }
  }

  async function handleFormSubmit() {
    if (Number(event?.baseFee || 0) > 0 && !receipt) {
      setErrorMsg('Please upload payment receipt');
      return;
    }
    setErrorMsg('');
    try {
      let receiptUrl = '';
      if (receipt) {
        const uploaded = await uploadReceipt(receipt).unwrap();
        receiptUrl = uploaded?.url || '';
      }
      await submitRegistration({
        eventId: event._id,
        participantData: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          cnic: formData.cnic,
          university: formData.university,
          department: formData.department,
          year: formData.year,
          track: formData.track,
          module: formData.module,
          needsParking: formData.needsParking,
          ...formData.answers,
        },
        appliedPromoCode: promoCode,
        paymentScreenshotUrl: receiptUrl,
      }).unwrap();

      setIsSuccess(true);
      setCurrentStep(5);
    } catch (err) {
      setErrorMsg(err?.data?.message || err?.error || 'Registration failed');
    }
  }

  return {
    event,
    eventLoading,
    eventError,
    currentStep,
    setCurrentStep,
    formData,
    updateField,
    updateAnswer,
    dynamicFields,
    nextStep,
    prevStep,
    promoCode,
    setPromoCode,
    promoResult,
    handleApplyPromo,
    validatingPromo,
    receipt,
    setReceipt,
    uploadingReceipt,
    submitting,
    errorMsg,
    isSuccess,
    handleFormSubmit,
  };
}
