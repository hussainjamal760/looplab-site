'use client';

import { useState, useMemo, useEffect } from 'react';
import { useGetEventBySlugQuery } from '@/store/api/eventApi';
import {
  useSubmitRegistrationMutation,
  useUploadReceiptMutation,
  useValidatePromoCodeMutation,
} from '@/store/api/registrationApi';
import { MODULES_DATA } from '@/features/loopverse-details/modulesData';

// ==========================================
// CONSTANTS
// ==========================================

const MAX_TEAMMATES = 3;

const EMPTY_TEAMMATE = {
  fullName: '',
  email: '',
  cnic: '',
  needsParking: 'No',
  vehicleType: 'Bike',
  vehicleNumber: '',
};

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
  needsParking: 'No',
  vehicleType: 'Bike',
  vehicleNumber: '',
  teammates: [],
  answers: {},
};

// ==========================================
// TEAMMATE VALIDATORS
// ==========================================

function validateTeammate(teammate, index) {
  const n = index + 1;
  if (!teammate.fullName.trim()) return `Teammate ${n}: Full Name is required`;
  if (!teammate.email.trim() || !teammate.email.includes('@')) return `Teammate ${n}: Valid email is required`;
  if (!teammate.cnic.trim()) return `Teammate ${n}: CNIC is required`;
  if (teammate.needsParking === 'Yes') {
    if (!teammate.vehicleType.trim()) return `Teammate ${n}: Vehicle type is required for parking`;
    if (!teammate.vehicleNumber.trim()) return `Teammate ${n}: Vehicle plate number is required for parking`;
  }
  return '';
}

// ==========================================
// HOOK
// ==========================================

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
    const rawFields = event?.formFields || [];
    const ignoredIds = [
      'fullName',
      'email',
      'phone',
      'university',
      'department',
      'trackSelect',
      'attendanceMode',
      'needsParking',
      'vehicleType',
      'vehicleNumber',
    ];
    return [...rawFields]
      .filter((f) => !ignoredIds.includes(f.fieldId))
      .sort((a, b) => a.order - b.order);
  }, [event]);

  const selectedModuleData = useMemo(
    () => MODULES_DATA.find((m) => m.title === formData.module) || MODULES_DATA[0],
    [formData.module]
  );

  const baseFee = selectedModuleData?.fee || Number(event?.baseFee || 0);
  const discountPercent = Number(promoResult?.discountPercent || 0);
  const finalFee = Math.max(0, baseFee - Math.round((baseFee * discountPercent) / 100));

  useEffect(() => {
    if (dynamicFields.length) {
      const initialAnswers = {};
      dynamicFields.forEach((field) => {
        initialAnswers[field.fieldId] = field.fieldType === 'checkbox' ? false : '';
      });
      setFormData((prev) => ({ ...prev, answers: initialAnswers }));
    }
  }, [dynamicFields]);

  // ==========================================
  // FIELD UPDATERS
  // ==========================================

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

  // ==========================================
  // TEAMMATE HELPERS
  // ==========================================

  function addTeammate() {
    if (formData.teammates.length >= MAX_TEAMMATES) return;
    setFormData((prev) => ({
      ...prev,
      teammates: [...prev.teammates, { ...EMPTY_TEAMMATE }],
    }));
    setErrorMsg('');
  }

  function removeTeammate(index) {
    setFormData((prev) => ({
      ...prev,
      teammates: prev.teammates.filter((_, i) => i !== index),
    }));
    setErrorMsg('');
  }

  function updateTeammate(index, field, value) {
    setFormData((prev) => {
      const updated = prev.teammates.map((tm, i) =>
        i === index ? { ...tm, [field]: value } : tm
      );
      return { ...prev, teammates: updated };
    });
    setErrorMsg('');
  }

  // ==========================================
  // VALIDATION
  // ==========================================

  function validateStep(step) {
    if (step === 1) {
      if (!formData.fullName.trim()) return 'Full Name is required';
      if (!formData.email.trim() || !formData.email.includes('@')) return 'Valid email address is required';
      if (!formData.phone.trim()) return 'Phone number is required';
      if (!formData.cnic.trim()) return 'CNIC / B-Form Number is required';
    }
    if (step === 2) {
      if (!formData.university.trim()) return 'University / Institute is required';
      if (!formData.department.trim()) return 'Department / Degree is required';
    }
    if (step === 3) {
      if (!formData.module) return 'Please select a module';
      if (!formData.track) return 'Please select Onsite or Virtual track';
      if (formData.track !== 'virtual' && formData.needsParking === 'Yes') {
        if (!formData.vehicleType || !formData.vehicleType.trim()) {
          return 'Please select your vehicle type (Bike or Car)';
        }
        if (!formData.vehicleNumber || !formData.vehicleNumber.trim()) {
          return 'Vehicle registration / plate number is required for parking';
        }
      }
      for (let i = 0; i < formData.teammates.length; i++) {
        const err = validateTeammate(formData.teammates[i], i);
        if (err) return err;
      }
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

  // ==========================================
  // PROMO
  // ==========================================

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

  // ==========================================
  // SUBMIT
  // ==========================================

  async function handleFormSubmit() {
    if (baseFee > 0 && !receipt) {
      setErrorMsg('Please upload payment receipt before submitting');
      return;
    }
    setErrorMsg('');
    try {
      let receiptUrl = '';
      if (receipt) {
        const uploaded = await uploadReceipt(receipt).unwrap();
        receiptUrl = uploaded?.url || '';
      }

      const sanitizedTeammates = formData.teammates.map((tm) => ({
        fullName: tm.fullName,
        email: tm.email,
        cnic: tm.cnic,
        needsParking: tm.needsParking,
        vehicleType: tm.needsParking === 'Yes' ? tm.vehicleType : 'N/A',
        vehicleNumber: tm.needsParking === 'Yes' ? tm.vehicleNumber : 'N/A',
      }));

      const attendanceOptions = event?.formFields?.find((f) => f.fieldId === 'attendanceMode')?.options || [];
      const trackSelectOptions = event?.formFields?.find((f) => f.fieldId === 'trackSelect')?.options || [];

      const targetTrackKeyword = formData.track === 'virtual' ? 'virtual' : 'onsite';
      const matchedAttendance =
        attendanceOptions.find((opt) => opt.toLowerCase().includes(targetTrackKeyword)) ||
        (formData.track === 'virtual' ? 'Virtual' : 'Onsite');

      const matchedTrackSelect =
        trackSelectOptions.find(
          (opt) => opt.toLowerCase().includes(targetTrackKeyword)
        ) ||
        trackSelectOptions[0] ||
        '';

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
          trackSelect: matchedTrackSelect,
          attendanceMode: matchedAttendance,
          moduleFee: baseFee,
          finalFee,
          discountApplied: discountPercent,
          needsParking: formData.needsParking,
          vehicleType: formData.needsParking === 'Yes' ? formData.vehicleType : 'N/A',
          vehicleNumber: formData.needsParking === 'Yes' ? formData.vehicleNumber : 'N/A',
          teammates: sanitizedTeammates,
          ...formData.answers,
        },
        appliedPromoCode: promoCode,
        paymentScreenshotUrl: receiptUrl,
      }).unwrap();

      setIsSuccess(true);
      setCurrentStep(5);
    } catch (err) {
      let msg = err?.data?.message || err?.error || 'Registration failed';
      if (err?.data?.errors && Array.isArray(err.data.errors) && err.data.errors.length > 0) {
        msg = err.data.errors.map((e) => e.message).join(' | ');
      }
      setErrorMsg(msg);
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
    addTeammate,
    removeTeammate,
    updateTeammate,
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
    selectedModuleData,
    baseFee,
    finalFee,
    discountPercent,
    maxTeammates: MAX_TEAMMATES,
  };
}
