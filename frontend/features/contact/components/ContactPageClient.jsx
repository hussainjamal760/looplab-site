'use client';

import React, { useEffect } from 'react';
import SvgSymbols from '@/components/ui/SvgSymbols';
import Navbar from '@/features/navigation/components/Navbar';
import Footer from '@/features/footer/components/Footer';
import TransitionScribble from '@/features/effects-and-cursor/components/TransitionScribble';
import CursorBubble from '@/features/effects-and-cursor/components/CursorBubble';
import SmoothScroll from '@/features/effects-and-cursor/components/SmoothScroll';
import ContactHero from './ContactHero';
import ContactChannels from './ContactChannels';
import ContactForm from './ContactForm';
import { useContactForm } from '../hooks/useContactForm';
import { useStickerPhysics } from '../hooks/useStickerPhysics';
import { gsap } from 'gsap';

function useEntranceAnimation() {
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.contact-hero', {
                opacity: 0,
                y: 35,
                duration: 0.9,
                ease: 'power3.out'
            });
            gsap.from('.contact-grid', {
                opacity: 0,
                y: 45,
                duration: 1.0,
                delay: 0.2,
                ease: 'power3.out'
            });
        });
        return () => ctx.revert();
    }, []);
}

export default function ContactPageClient() {
    useEntranceAnimation();
    useStickerPhysics();
    const {
        formData,
        updateField,
        setTopic,
        isSubmitting,
        isSubmitted,
        copiedEmail,
        copyEmailToClipboard,
        handleSubmit,
        resetForm
    } = useContactForm();

    return (
        <>
            <SvgSymbols />
            <SmoothScroll />
            <CursorBubble />
            <header className="main-header">
                <Navbar />
            </header>
            <main className="contact-page-wrapper">
                <div className="contact-container">
                    <ContactHero activeTopic={formData.topic} onSelectTopic={setTopic} />
                    <div className="contact-grid">
                        <ContactChannels copiedEmail={copiedEmail} onCopyEmail={copyEmailToClipboard} />
                        <ContactForm
                            formData={formData}
                            updateField={updateField}
                            isSubmitting={isSubmitting}
                            isSubmitted={isSubmitted}
                            onSubmit={handleSubmit}
                            onReset={resetForm}
                        />
                    </div>
                </div>
            </main>
            <footer className="main-footer">
                <Footer />
            </footer>
            <TransitionScribble />
        </>
    );
}
