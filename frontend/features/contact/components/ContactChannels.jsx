'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SOCIAL_ICONS, WIGGLE_CONFIG } from '@/lib/data';

function initWiggle(element, intensity = 4) {
    if (!element) return () => {};
    const target = element.querySelector('[data-wiggle-target]') || element;
    gsap.set(target, { transformOrigin: 'center center' });
    let tween;
    const onEnter = () => {
        tween = gsap.to(target, { rotation: intensity, duration: 0.16, repeat: -1, yoyo: true, ease: 'steps(1)' });
    };
    const onLeave = () => {
        if (tween) tween.kill();
        gsap.to(target, { rotation: 0, duration: 0.3, ease: 'power2.out' });
    };
    element.addEventListener('mouseenter', onEnter);
    element.addEventListener('mouseleave', onLeave);
    return () => {
        element.removeEventListener('mouseenter', onEnter);
        element.removeEventListener('mouseleave', onLeave);
    };
}

function EmailChannel({ copiedEmail, onCopyEmail }) {
    const linkRef = useRef(null);
    useEffect(() => initWiggle(linkRef.current, WIGGLE_CONFIG.email || 2), []);

    return (
        <div className="channel-card">
            <span className="channel-label">Direct Email</span>
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <button
                    ref={linkRef}
                    type="button"
                    className="channel-email footer-email"
                    onClick={() => onCopyEmail('hello@looplab.co')}
                    aria-label="Copy email address"
                >
                    hello@looplab.co
                </button>
                {copiedEmail && (
                    <span className="copy-toast" role="status">
                        ✓ Copied!
                    </span>
                )}
            </div>
            <p className="channel-note">Click to copy email address directly.</p>
        </div>
    );
}

function PhoneChannel() {
    const waRef = useRef(null);
    useEffect(() => initWiggle(waRef.current, WIGGLE_CONFIG.whatsapp || 3), []);

    return (
        <div className="channel-card">
            <span className="channel-label">Instant Chat</span>
            <a ref={waRef} href="https://wa.me/31201234567" target="_blank" rel="noopener noreferrer" className="channel-detail footer-whatsapp" style={{ textDecoration: 'none', display: 'inline-block' }}>
                Send us a WhatsApp message →
            </a>
            <p className="channel-note">*We&apos;re millennials and Gen-Z: please text, do not call.</p>
        </div>
    );
}

function LocationChannel() {
    const mapRef = useRef(null);
    useEffect(() => {
        if (!mapRef.current) return;
        const paths = mapRef.current.querySelectorAll('.draw-btn__svg path');
        paths.forEach(p => gsap.set(p, { strokeDasharray: p.getTotalLength(), strokeDashoffset: 0 }));
        const onEnter = () => gsap.fromTo(paths, { strokeDashoffset: (i, el) => el.getTotalLength() }, { strokeDashoffset: 0, duration: 0.45, ease: 'power2.out', stagger: 0.08 });
        const el = mapRef.current;
        el.addEventListener('mouseenter', onEnter);
        return () => el.removeEventListener('mouseenter', onEnter);
    }, []);

    return (
        <div className="channel-card">
            <span className="channel-label">Headquarters</span>
            <div className="channel-detail">
                Papaverhof 21<br />
                1032 LX Amsterdam, NL
            </div>
            <a ref={mapRef} href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="footer-map-link" style={{ marginTop: '10px', display: 'inline-block' }}>
                <span>View on Google Maps</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 169 10" fill="none" className="draw-btn__svg">
                    <path d="M1 6.5661C56.3941 3.06082 112.187 1.20095 168 0.999878" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
                    <path d="M32.1313 8.63371C68.2147 6.92799 104.462 6.13378 140.695 6.25107" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" />
                </svg>
            </a>
        </div>
    );
}

function SocialsGrid() {
    const gridRef = useRef(null);
    useEffect(() => {
        if (!gridRef.current) return;
        const socials = gridRef.current.querySelectorAll('.single-social');
        const cleanups = Array.from(socials).map(el => initWiggle(el, WIGGLE_CONFIG.socials || 5));
        return () => cleanups.forEach(fn => fn());
    }, []);

    return (
        <div className="channel-card">
            <span className="channel-label">Follow & Connect</span>
            <div ref={gridRef} className="footer-socials" style={{ marginTop: '12px', justifyContent: 'flex-start' }}>
                {SOCIAL_ICONS.map(({ href, label, svg }) => (
                    <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="single-social w-inline-block"
                        aria-label={label}
                        dangerouslySetInnerHTML={{ __html: svg }}
                    />
                ))}
            </div>
        </div>
    );
}

export default function ContactChannels({ copiedEmail, onCopyEmail }) {
    return (
        <div className="contact-channels">
            <EmailChannel copiedEmail={copiedEmail} onCopyEmail={onCopyEmail} />
            <PhoneChannel />
            <LocationChannel />
            <SocialsGrid />
        </div>
    );
}
