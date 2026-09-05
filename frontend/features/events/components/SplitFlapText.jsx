'use client';

import { useState, useEffect } from 'react';

export default function SplitFlapText({
    text = 'REGISTRATIONS OPEN',
    className = '',
    flipInterval = 4000
}) {
    const [currentText, setCurrentText] = useState(text);
    const [isFlipping, setIsFlipping] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setIsFlipping(true);
            setTimeout(() => {
                setIsFlipping(false);
            }, 600);
        }, flipInterval);

        return () => clearInterval(timer);
    }, [flipInterval]);

    const chars = currentText.split('');

    return (
        <div className={`split-flap-container ${className}`}>
            {chars.map((char, index) => (
                <div
                    key={index}
                    className={`split-flap-tile ${isFlipping ? 'is-flipping' : ''}`}
                    style={{ animationDelay: `${index * 0.04}s` }}
                >
                    <div className="split-flap-top">
                        <span>{char === ' ' ? '\u00A0' : char}</span>
                    </div>
                    <div className="split-flap-bottom">
                        <span>{char === ' ' ? '\u00A0' : char}</span>
                    </div>
                    <div className="split-flap-line" />
                </div>
            ))}
        </div>
    );
}
