'use client';

import { useRef, useState } from 'react';

export default function MagnetButton({
    children,
    className = '',
    onClick,
    href,
    target = '_blank',
    rel = 'noopener noreferrer',
    magnetStrength = 0.35,
    style = {}
}) {
    const btnRef = useRef(null);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        if (!btnRef.current) return;
        const rect = btnRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * magnetStrength;
        const deltaY = (e.clientY - centerY) * magnetStrength;

        const spotX = ((e.clientX - rect.left) / rect.width) * 100;
        const spotY = ((e.clientY - rect.top) / rect.height) * 100;

        setPos({ x: deltaX, y: deltaY });
        setSpotlight({ x: spotX, y: spotY, opacity: 1 });
    };

    const handleMouseEnter = () => setIsHovered(true);

    const handleMouseLeave = () => {
        setIsHovered(false);
        setPos({ x: 0, y: 0 });
        setSpotlight((prev) => ({ ...prev, opacity: 0 }));
    };

    const inlineStyle = {
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0px)`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        ...style
    };

    const content = (
        <>
            <span className="magnet-btn-content">{children}</span>
            <span
                className="magnet-btn-spotlight"
                style={{
                    background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(255, 255, 255, 0.35) 0%, transparent 70%)`,
                    opacity: spotlight.opacity,
                    transition: 'opacity 0.2s ease'
                }}
            />
        </>
    );

    if (href) {
        return (
            <a
                ref={btnRef}
                href={href}
                target={target}
                rel={rel}
                className={`magnet-button ${className}`}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={inlineStyle}
            >
                {content}
            </a>
        );
    }

    return (
        <button
            ref={btnRef}
            type="button"
            className={`magnet-button ${className}`}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={inlineStyle}
        >
            {content}
        </button>
    );
}
