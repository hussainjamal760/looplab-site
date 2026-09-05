'use client';

import { useState } from 'react';

export default function LanyardGalleryPass({
    pass = {},
    className = ''
}) {
    const [swing, setSwing] = useState({ rotX: 0, rotY: 0, rotZ: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;
        const rotY = (mouseX / (rect.width / 2)) * 15;
        const rotX = -(mouseY / (rect.height / 2)) * 12;

        setSwing({ rotX, rotY, rotZ: rotY * 0.4 });
    };

    const handleMouseEnter = () => setIsHovered(true);

    const handleMouseLeave = () => {
        setIsHovered(false);
        setSwing({ rotX: 0, rotY: 0, rotZ: 0 });
    };

    const cardStyle = {
        transform: `perspective(800px) rotateX(${swing.rotX}deg) rotateY(${swing.rotY}deg) rotateZ(${swing.rotZ}deg) scale(${isHovered ? 1.02 : 1})`,
        transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    };

    const strapStyle = {
        backgroundColor: pass.lanyardColor || '#9E00FE',
        transform: `rotateZ(${swing.rotZ * 0.5}deg)`
    };

    return (
        <div className={`lanyard-pass-wrapper ${className}`}>
            {/* Lanyard Top Strap & Metal Ring Clip */}
            <div className="lanyard-strap-tag" style={strapStyle}>
                <span className="lanyard-strap-label">LOOPLAB DELEGATE PASS</span>
                <div className="lanyard-clip-hole" />
            </div>

            {/* Hanging Pass Badge Card */}
            <div
                className="lanyard-gallery-card"
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={cardStyle}
            >
                <div className="lanyard-card-top-slot" />

                <div className="lanyard-card-header">
                    <span className="lanyard-pass-num">{pass.passNumber}</span>
                    <span className="lanyard-category-badge">{pass.category}</span>
                </div>

                <div className="lanyard-photo-area">
                    <img
                        src={pass.image}
                        alt={pass.eventTitle}
                        className="lanyard-photo-img"
                        loading="lazy"
                    />
                    <div className="lanyard-photo-overlay" />
                    <span className="lanyard-role-tag">{pass.delegateRole}</span>
                </div>

                <div className="lanyard-card-body">
                    <h4 className="lanyard-event-title">{pass.eventTitle}</h4>
                    <div className="lanyard-meta-row">
                        <span>📅 {pass.date}</span>
                        <span>📍 {pass.location}</span>
                    </div>
                </div>

                <div className="lanyard-card-footer">
                    <div className="lanyard-barcode-lines">|||| | || ||||| | |||</div>
                    <span className="lanyard-official-stamp">OFFICIAL PASS</span>
                </div>
            </div>
        </div>
    );
}
