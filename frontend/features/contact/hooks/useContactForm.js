import { useState, useCallback } from 'react';

const INITIAL_FORM = {
    name: '',
    email: '',
    company: '',
    budget: 'Under €5k',
    message: '',
    topic: 'Campus Partnership'
};

export function useContactForm() {
    const [formData, setFormData] = useState(INITIAL_FORM);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [copiedEmail, setCopiedEmail] = useState(false);

    const updateField = useCallback((field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    }, []);

    const setTopic = useCallback((topic) => {
        setFormData(prev => ({ ...prev, topic }));
    }, []);

    const copyEmailToClipboard = useCallback(async (email = 'hello@looplab.co') => {
        try {
            await navigator.clipboard.writeText(email);
            setCopiedEmail(true);
            setTimeout(() => setCopiedEmail(false), 2500);
        } catch {
            setCopiedEmail(false);
        }
    }, []);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
        }, 1200);
    }, []);

    const resetForm = useCallback(() => {
        setFormData(INITIAL_FORM);
        setIsSubmitted(false);
    }, []);

    return {
        formData,
        updateField,
        setTopic,
        isSubmitting,
        isSubmitted,
        copiedEmail,
        copyEmailToClipboard,
        handleSubmit,
        resetForm
    };
}
