'use client';

import { useState } from 'react';
import ShinyText from './ShinyText';
import EventGalleryModal from './EventGalleryModal';
import { galleryEventsData } from '@/lib/eventsData';

export default function LanyardInteractiveStage() {
    const [selectedEventId, setSelectedEventId] = useState('loopverse-2');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [swing, setSwing] = useState({ rotX: 0, rotY: 0, rotZ: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const activeEvent = galleryEventsData.find((e) => e.id === selectedEventId) || galleryEventsData[0];

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;
        const rotY = (mouseX / (rect.width / 2)) * 18;
        const rotX = -(mouseY / (rect.height / 2)) * 14;

        setSwing({ rotX, rotY, rotZ: rotY * 0.5 });
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setSwing({ rotX: 0, rotY: 0, rotZ: 0 });
    };

    const cardStyle = {
        transform: `perspective(900px) rotateX(${swing.rotX}deg) rotateY(${swing.rotY}deg) rotateZ(${swing.rotZ}deg) scale(${isHovered ? 1.03 : 1})`,
        transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    };

    const strapStyle = {
        backgroundColor: activeEvent.strapColor || '#9E00FE',
        transform: `rotateZ(${swing.rotZ * 0.4}deg)`
    };

    return (
        <section className="lanyard-stage-section">
            <div className="lanyard-stage-header">
                <span className="lanyard-stage-badge badge-purple">
                    INTERACTIVE EVENT SELECTOR
                </span>
                <h2 className="lanyard-stage-title">
                    INTERACTIVE <ShinyText text="LANYARD PASS" speed={3.5} />
                </h2>
                <p className="lanyard-stage-subtitle">
                    Select an event pass from the toggle tabs, interact with the 3D hanging badge, and click to inspect the photo gallery modal.
                </p>
            </div>

            {/* Event Selector Pill Tabs */}
            <div className="lanyard-selector-tabs">
                {galleryEventsData.map((ev) => (
                    <button
                        key={ev.id}
                        type="button"
                        className={`lanyard-selector-btn ${ev.id === selectedEventId ? 'is-active' : ''}`}
                        onClick={() => setSelectedEventId(ev.id)}
                    >
                        ⚡ {ev.title}
                    </button>
                ))}
            </div>

            {/* Central Hanging Lanyard Stage */}
            <div className="lanyard-stage-canvas">
                <div className="lanyard-interactive-assembly">
                    <div className="lanyard-top-anchor">
                        <div className="lanyard-anchor-ring" />
                    </div>

                    <div className="lanyard-hanging-strap" style={strapStyle}>
                        <span className="lanyard-strap-text">LOOPLAB DELEGATE PASS</span>
                        <div className="lanyard-clip-ring" />
                    </div>

                    <div
                        className="lanyard-interactive-card"
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => setIsModalOpen(true)}
                        style={cardStyle}
                    >
                        <div className="lanyard-click-callout">
                            🔍 CLICK PASS FOR PHOTO GALLERY
                        </div>

                        <div className="lanyard-top-slot" />

                        <div className="lanyard-card-header">
                            <span className="lanyard-pass-id">{activeEvent.passId}</span>
                            <span className="lanyard-live-pill">OFFICIAL PASS</span>
                        </div>

                        <div className="lanyard-card-photo-box">
                            <img
                                src={activeEvent.coverImage}
                                alt={activeEvent.title}
                                className="lanyard-card-cover"
                            />
                            <div className="lanyard-photo-gradient" />
                            <span className="lanyard-role-tag">{activeEvent.role}</span>
                        </div>

                        <div className="lanyard-card-info">
                            <h3 className="lanyard-card-title">{activeEvent.title}</h3>
                            <p className="lanyard-card-meta">
                                📅 {activeEvent.date} &nbsp;•&nbsp; 📍 {activeEvent.location}
                            </p>
                        </div>

                        <div className="lanyard-card-footer">
                            <div className="lanyard-barcode">|||| | || ||||| | |||</div>
                            <span className="lanyard-action-hint">VIEW GALLERY ↗</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Full Screen Photo Gallery Lightbox Overlay Modal */}
            <EventGalleryModal
                eventData={activeEvent}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </section>
    );
}
