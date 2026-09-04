'use client';

import { useState } from 'react';

export default function LanyardHangingCard({
    eventItem = {},
    onClick = () => {}
}) {
    const [swing, setSwing] = useState({ rotX: 0, rotY: 0, rotZ: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;
        const rotY = (mouseX / (rect.width / 2)) * 16;
        const rotX = -(mouseY / (rect.height / 2)) * 12;

        setSwing({ rotX, rotY, rotZ: rotY * 0.45 });
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setSwing({ rotX: 0, rotY: 0, rotZ: 0 });
    };

    const cardStyle = {
        transform: `perspective(800px) rotateX(${swing.rotX}deg) rotateY(${swing.rotY}deg) rotateZ(${swing.rotZ}deg) scale(${isHovered ? 1.03 : 1})`,
        transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    };

    const strapStyle = {
        backgroundColor: eventItem.strapColor || '#9E00FE',
        transform: `rotateZ(${swing.rotZ * 0.4}deg)`
    };

    return (
        <div className="multi-lanyard-item-wrapper">
            {/* Top Anchor Clip Connected to Top Main Bar */}
            <div className="lanyard-top-anchor-clip">
                <div className="lanyard-anchor-dot" />
            </div>

            {/* Vertical Strap Connecting to Hanging Card */}
            <div className="lanyard-vertical-strap" style={strapStyle}>
                <span className="lanyard-vertical-text">LOOPLAB PASS</span>
                <div className="lanyard-ring-clip" />
            </div>

            {/* Main 3D Hanging Pass Badge Card */}
            <div
                className="lanyard-hanging-card-body"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                onClick={onClick}
                style={cardStyle}
            >
                <div className="lanyard-card-slot" />

                <div className="lanyard-card-top-meta">
                    <span className="lanyard-card-pass-id">{eventItem.passId}</span>
                    <span className="lanyard-card-role-pill">{eventItem.role}</span>
                </div>

                <div className="lanyard-card-photo-wrap">
                    <img
                        src={eventItem.coverImage}
                        alt={eventItem.title}
                        className="lanyard-card-photo"
                        loading="lazy"
                    />
                    <div className="lanyard-photo-shade" />
                    <span className="lanyard-hover-hint">VIEW GALLERY ↗</span>
                </div>

                <div className="lanyard-card-title-box">
                    <h4 className="lanyard-card-event-name">{eventItem.title}</h4>
                    <p className="lanyard-card-date-loc">
                        📅 {eventItem.date} &nbsp;•&nbsp; 📍 {eventItem.location}
                    </p>
                </div>

                <div className="lanyard-card-bottom-bar">
                    <div className="lanyard-card-barcode">|||| | || ||||| | |||</div>
                    <span className="lanyard-card-stamp">OFFICIAL</span>
                </div>
            </div>
        </div>
    );
}
