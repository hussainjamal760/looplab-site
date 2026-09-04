'use client';

import { useState } from 'react';

export default function LanyardBadge({
    badge = {},
    className = ''
}) {
    const [swing, setSwing] = useState({ rotX: 0, rotY: 0, swingAngle: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;
        const rotY = (mouseX / (rect.width / 2)) * 14;
        const rotX = -(mouseY / (rect.height / 2)) * 12;

        setSwing({ rotX, rotY, swingAngle: rotY * 0.8 });
    };

    const handleMouseEnter = () => setIsHovered(true);

    const handleMouseLeave = () => {
        setIsHovered(false);
        setSwing({ rotX: 0, rotY: 0, swingAngle: 0 });
    };

    const cardStyle = {
        transform: `perspective(800px) rotateX(${swing.rotX}deg) rotateY(${swing.rotY}deg) rotateZ(${swing.swingAngle * 0.4}deg)`,
        transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    };

    const strapStyle = {
        backgroundColor: badge.strapColor || '#9E00FE',
        transform: `rotateZ(${swing.swingAngle * 0.3}deg)`
    };

    return (
        <div className={`lanyard-item-wrapper ${className}`}>
            {/* Lanyard Strap & Metal Clip */}
            <div className="lanyard-strap-assembly" style={strapStyle}>
                <span className="lanyard-strap-text">LOOPLAB DELEGATE PASS</span>
                <div className="lanyard-clip-ring" />
                <div className="lanyard-metal-hook" />
            </div>

            {/* Main Hanging Pass Badge */}
            <div
                className="lanyard-badge-card"
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={cardStyle}
            >
                <div className="lanyard-top-hole" />
                
                <div className="lanyard-badge-header">
                    <span className="lanyard-medal">{badge.medal}</span>
                    <span className="lanyard-place">{badge.place}</span>
                    <span className="lanyard-id-tag">{badge.id}</span>
                </div>

                <div className="lanyard-avatar-wrap">
                    <img
                        src={badge.avatar}
                        alt={badge.team}
                        className="lanyard-avatar-img"
                    />
                </div>

                <div className="lanyard-badge-body">
                    <h4 className="lanyard-team-name">{badge.team}</h4>
                    <p className="lanyard-project-title">
                        <strong>Project:</strong> {badge.project}
                    </p>
                    <p className="lanyard-builders">
                        <strong>Builders:</strong> {badge.builders}
                    </p>
                    <span className="lanyard-role-badge">
                        {badge.badgeRole}
                    </span>
                </div>

                <div className="lanyard-badge-footer">
                    <span className="lanyard-prize-value">🏆 {badge.prize}</span>
                    <div className="lanyard-barcode">||| | |||| | |||</div>
                </div>
            </div>
        </div>
    );
}
