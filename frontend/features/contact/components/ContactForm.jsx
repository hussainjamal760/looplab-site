'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

function initWiggle(element, intensity = 3) {
    if (!element) return () => {};
    gsap.set(element, { transformOrigin: 'center center' });
    let tween;
    const onEnter = () => {
        tween = gsap.to(element, { rotation: intensity, duration: 0.15, repeat: -1, yoyo: true, ease: 'steps(1)' });
    };
    const onLeave = () => {
        if (tween) tween.kill();
        gsap.to(element, { rotation: 0, duration: 0.3, ease: 'power2.out' });
    };
    element.addEventListener('mouseenter', onEnter);
    element.addEventListener('mouseleave', onLeave);
    return () => {
        element.removeEventListener('mouseenter', onEnter);
        element.removeEventListener('mouseleave', onLeave);
    };
}

function FormInput({ label, id, name, type = 'text', required = false, value, onChange, placeholder }) {
    return (
        <div className="form-group">
            <label htmlFor={id} className="form-label">{label}</label>
            <input
                id={id}
                name={name}
                type={type}
                required={required}
                value={value}
                onChange={(e) => onChange(name, e.target.value)}
                placeholder={placeholder}
                className="form-input"
            />
        </div>
    );
}

function FormSelect({ label, id, name, value, onChange, options }) {
    return (
        <div className="form-group">
            <label htmlFor={id} className="form-label">{label}</label>
            <select id={id} name={name} value={value} onChange={(e) => onChange(name, e.target.value)} className="form-select">
                {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
        </div>
    );
}

function FormTextarea({ label, id, name, required = false, value, onChange, placeholder }) {
    return (
        <div className="form-group">
            <label htmlFor={id} className="form-label">{label}</label>
            <textarea
                id={id}
                name={name}
                required={required}
                rows={4}
                value={value}
                onChange={(e) => onChange(name, e.target.value)}
                placeholder={placeholder}
                className="form-textarea"
            />
        </div>
    );
}

function FormSubmitButton({ isSubmitting }) {
    const btnRef = useRef(null);
    useEffect(() => initWiggle(btnRef.current, 3), []);

    return (
        <button ref={btnRef} type="submit" disabled={isSubmitting} className="form-submit-btn">
            <span>{isSubmitting ? 'Sending Message...' : 'SEND INQUIRY →'}</span>
        </button>
    );
}

function FormSuccessCard({ onReset }) {
    const cardRef = useRef(null);
    useEffect(() => {
        if (!cardRef.current) return;
        const stickers = cardRef.current.querySelectorAll('.success-sticker');
        gsap.fromTo(stickers,
            { scale: 0, rotation: -40, opacity: 0 },
            { scale: 1, rotation: (i) => (i % 2 === 0 ? 12 : -12), opacity: 1, duration: 1.2, ease: 'back.out(2)', stagger: 0.15 }
        );
    }, []);

    return (
        <div ref={cardRef} className="form-success-card">
            <div style={{ position: 'relative', display: 'inline-block' }}>
                <img src="/assets/Footer-Sticker SVG/footer-sticker-smiley.svg" alt="" width="80" className="success-sticker" style={{ margin: '0 auto 16px' }} />
            </div>
            <h3 className="form-success-title">MESSAGE RECEIVED!</h3>
            <p className="contact-hero__desc" style={{ margin: '0 auto 28px', fontSize: '1.1rem' }}>
                Thank you for reaching out to Looplab. Our team will review your message and get back to you within 24 hours.
            </p>
            <button type="button" onClick={onReset} className="topic-pill is-active">
                Send another message →
            </button>
        </div>
    );
}

export default function ContactForm({ formData, updateField, isSubmitting, isSubmitted, onSubmit, onReset }) {
    if (isSubmitted) {
        return (
            <div className="contact-form-container">
                <FormSuccessCard onReset={onReset} />
            </div>
        );
    }

    return (
        <div className="contact-form-container">
            <div className="card-sticker sticker-camera" style={{ top: '-35px', right: '-20px', left: 'auto' }}>
                <img src="/assets/Footer-Sticker SVG/footer-sticker-camera.svg" alt="" width="110" />
            </div>
            <form onSubmit={onSubmit} noValidate={false}>
                <FormInput label="02 / YOUR NAME *" id="contact-name" name="name" required value={formData.name} onChange={updateField} placeholder="e.g. Alex Morgan" />
                <FormInput label="03 / EMAIL ADDRESS *" id="contact-email" name="email" type="email" required value={formData.email} onChange={updateField} placeholder="alex@company.com" />
                <FormInput label="04 / COMPANY OR UNIVERSITY" id="contact-company" name="company" value={formData.company} onChange={updateField} placeholder="e.g. HEMA or NUST Tech Club" />
                <FormSelect label="05 / ESTIMATED BUDGET RANGE" id="contact-budget" name="budget" value={formData.budget} onChange={updateField} options={['Under €5k', '€5k - €15k', '€15k - €50k', '€50k+ / Custom Enterprise']} />
                <FormTextarea label="06 / YOUR MESSAGE *" id="contact-message" name="message" required value={formData.message} onChange={updateField} placeholder="Tell us about your project goals, timelines, or community ideas..." />
                <FormSubmitButton isSubmitting={isSubmitting} />
            </form>
        </div>
    );
}
