'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { WIGGLE_CONFIG } from '@/lib/data';

const TOPICS = [
    'Campus Partnership',
    'Sponsorship & Brands',
    'Events & Bootcamps',
    'Student Ambassador',
    'General Inquiry'
];

function initWiggle(element, intensity = 4) {
    if (!element) return () => {};
    gsap.set(element, { transformOrigin: 'center center' });
    let tween;
    const onEnter = () => {
        tween = gsap.to(element, { rotation: intensity, duration: 0.16, repeat: -1, yoyo: true, ease: 'steps(1)' });
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

function HeroUnderlineSvg() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 634 28" fill="none" className="motion-card__underline-svg contact-hero__underline">
            <path className="contact-hero__underline-path" d="M2 26C41.0237 23.1556 79.9927 19.9419 118.634 15.5521C169.106 9.98633 227.314 2.42393 275.206 2C280.46 2.57436 264.768 4.99488 262.462 5.55556C257.837 6.43078 252.529 7.47009 247.317 8.59146C239.594 10.3556 212.496 15.8393 226.932 19.8051C239.594 22.6359 263.663 21.9521 280.978 21.3504C314.817 19.9829 349.311 16.7419 383.204 14.7863C465.931 9.5077 549.191 10.547 632 14.1436" stroke="var(--color-darkblue)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function HeroBadge() {
    const badgeRef = useRef(null);
    useEffect(() => initWiggle(badgeRef.current, WIGGLE_CONFIG.logoLooplab || 3), []);

    return (
        <div ref={badgeRef} className="contact-badge" style={{ cursor: "url('/assets/Cursor SVG/cursor-pointer.svg') 12 12, pointer" }}>
            <span className="contact-badge__dot" />
            <span>Available for new collabs</span>
        </div>
    );
}

function HeroSticker() {
    const stickerRef = useRef(null);
    useEffect(() => {
        if (!stickerRef.current) return;
        gsap.fromTo(stickerRef.current,
            { scale: 0, rotation: -30, opacity: 0 },
            { scale: 1, rotation: 8, opacity: 1, duration: 1.6, ease: 'elastic.out(1, 0.4)', delay: 0.3 }
        );
    }, []);

    return (
        <span ref={stickerRef} className="contact-hero__sticker">
            <img src="/assets/Marquee-blob SVG/marquee-blob.svg" alt="Marquee blob decorative accent" width="480" />
        </span>
    );
}

function TopicPills({ activeTopic, onSelectTopic }) {
    return (
        <div className="topic-pills-wrapper">
            <p className="topic-pills-label">01 / SELECT INQUIRY TOPIC</p>
            <div className="topic-pills" role="radiogroup" aria-label="Select inquiry topic">
                {TOPICS.map(topic => (
                    <button
                        key={topic}
                        type="button"
                        role="radio"
                        aria-checked={activeTopic === topic}
                        className={`topic-pill ${activeTopic === topic ? 'is-active' : ''}`}
                        onClick={() => onSelectTopic(topic)}
                    >
                        {topic}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default function ContactHero({ activeTopic, onSelectTopic }) {
    const heroRef = useRef(null);

    useEffect(() => {
        const path = heroRef.current?.querySelector('.contact-hero__underline-path');
        if (path) {
            const len = path.getTotalLength();
            gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
            gsap.to(path, { strokeDashoffset: 0, duration: 1.4, ease: 'power2.out', delay: 0.4 });
        }
    }, []);

    return (
        <header ref={heroRef} className="contact-hero">
            <HeroBadge />
            <div className="contact-hero__title-wrap">
                <h1 className="contact-hero__title">
                    LET&apos;S MAKE<br />
                    <span className="contact-hero__title-accent">SOMETHING</span><br />
                    WORTH REMEMBERING.
                </h1>
                <HeroSticker />
                <HeroUnderlineSvg />
            </div>
            <p className="contact-hero__desc">
                Whether you&apos;re looking to partner with Pakistan&apos;s leading campus tech network, sponsor high-impact hackathons, or launch student ambassador programs, we&apos;re here to build products and communities that last.
            </p>
            <TopicPills activeTopic={activeTopic} onSelectTopic={onSelectTopic} />
        </header>
    );
}
