'use client';

import { useRef, useState } from 'react';

export default function TiltedCard({
    children,
    className = '',
    maxTilt = 12,
    scaleOnHover = 1.02,
    showGlare = true,
    style = {}
}) {
    const cardRef = useRef(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const rotateX = ((mouseY - height / 2) / (height / 2)) * -maxTilt;
        const rotateY = ((mouseX - width / 2) / (width / 2)) * maxTilt;

        setTilt({ x: rotateX, y: rotateY });
        setGlare({
            x: (mouseX / width) * 100,
            y: (mouseY / height) * 100,
            opacity: 0.25
        });
    };

    const handleMouseEnter = () => setIsHovered(true);

    const handleMouseLeave = () => {
        setIsHovered(false);
        setTilt({ x: 0, y: 0 });
        setGlare((prev) => ({ ...prev, opacity: 0 }));
    };

    const transformStyle = {
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? scaleOnHover : 1})`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
        transformStyle: 'preserve-3d',
        ...style
    };

    return (
        <div
            ref={cardRef}
            className={`tilted-card-wrapper ${className}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={transformStyle}
        >
            {children}
            {showGlare && (
                <div
                    className="tilted-card-glare"
                    style={{
                        background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)`,
                        opacity: glare.opacity,
                        transition: isHovered ? 'opacity 0.2s ease' : 'opacity 0.5s ease'
                    }}
                />
            )}
        </div>
    );
}
