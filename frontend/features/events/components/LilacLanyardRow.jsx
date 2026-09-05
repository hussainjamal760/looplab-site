'use client';

import { useState } from 'react';
import ShinyText from './ShinyText';
import EventGalleryModal from './EventGalleryModal';
import { lanyardRowEvents } from '@/lib/eventsData';

/**
 * Renders a single hanging lanyard card with 3D swing physics.
 * Each card connects to the top lilac strap via a vertical black cord.
 */
function LanyardDropCard({ eventItem, rotation, onClick }) {
    const [swing, setSwing] = useState({ rotX: 0, rotY: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;
        setSwing({
            rotX: -(mouseY / (rect.height / 2)) * 10,
            rotY: (mouseX / (rect.width / 2)) * 14
        });
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setSwing({ rotX: 0, rotY: 0 });
    };

    return (
        <div className="lanyard-drop-column" style={{ '--card-rotation': rotation }}>
            {/* Vertical Black Cord from strap to card */}
            <div className="lanyard-cord">
                <div className="lanyard-cord-line" />
                <div className="lanyard-clip-ring" />
            </div>

            {/* Hanging Brutalist Event Card */}
            <div
                className="lanyard-event-card"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                onClick={onClick}
                style={{
                    transform: `perspective(800px) rotateX(${swing.rotX}deg) rotateY(${swing.rotY}deg) rotate(var(--card-rotation)) scale(${isHovered ? 1.04 : 1})`,
                    transition: isHovered
                        ? 'transform 0.08s ease-out'
                        : 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
            >
                {/* Photo Header */}
                <div className="lanyard-card-photo-header">
                    <img
                        src={eventItem.coverImage}
                        alt={eventItem.title}
                        className="lanyard-card-img"
                        loading="lazy"
                    />
                    <div className="lanyard-card-img-shade" />
                    <span
                        className="lanyard-card-badge-dot"
                        style={{ backgroundColor: eventItem.badgeColor }}
                    />
                    <span className="lanyard-card-gallery-hint">VIEW GALLERY ↗</span>
                </div>

                {/* Tag Badges Row */}
                <div className="lanyard-card-tags">
                    <span className="lanyard-tag-id">{eventItem.passId}</span>
                    <span
                        className="lanyard-tag-role"
                        style={{ color: eventItem.badgeColor }}
                    >
                        {eventItem.role}
                    </span>
                </div>

                {/* Title & Meta */}
                <h4 className="lanyard-card-title">{eventItem.title}</h4>
                <p className="lanyard-card-meta">
                    📅 {eventItem.date} &nbsp;·&nbsp; 📍 {eventItem.location}
                </p>

                {/* Stats Row */}
                <div className="lanyard-card-stats">
                    {eventItem.stats.map((stat, i) => (
                        <div key={i} className="lanyard-stat-chip">
                            <span className="lanyard-stat-val">{stat.value}</span>
                            <span className="lanyard-stat-lbl">{stat.label}</span>
                        </div>
                    ))}
                </div>

                {/* Bottom Barcode Line */}
                <div className="lanyard-card-barcode-row">
                    <span className="lanyard-barcode">|||| | || ||||| | |||</span>
                    <span className="lanyard-official-stamp">OFFICIAL</span>
                </div>
            </div>
        </div>
    );
}


/**
 * Section 2: Lilac Strap Multi-Lanyard Drop Row.
 * Renders one continuous lilac horizontal strap with dark purple ∞ symbols,
 * and 4 vertical cords hanging down to brutalist event cards.
 */
export default function LilacLanyardRow() {
    const [selectedEvent, setSelectedEvent] = useState(null);

    const rotations = ['-2.5deg', '1.8deg', '-1.5deg', '2.2deg'];

    return (
        <section className="lilac-lanyard-section">
            {/* Section Header */}
            <div className="lilac-lanyard-header">
                <span className="lilac-badge badge-purple">
                    DELEGATE PASS GALLERY
                </span>
                <h2 className="lilac-lanyard-title">
                    LANYARD <ShinyText text="EVENT SNAPSHOTS" speed={3.5} />
                </h2>
                <p className="lilac-lanyard-subtitle">
                    Swing the hanging 3D delegate passes. Click any card to explore its full photo gallery and event recap.
                </p>
            </div>

            {/* Main Container — Lilac Strap + Hanging Cards */}
            <div className="lilac-lanyard-stage">
                {/* Top Horizontal Lilac Strap Line with ∞ Icons */}
                <div className="lilac-strap-line">
                    <div className="lilac-strap-infinity-track">
                        {Array.from({ length: 28 }).map((_, i) => (
                            <span key={i} className="strap-infinity-icon">∞</span>
                        ))}
                    </div>
                </div>

                {/* 4 Hanging Lanyard Cords + Cards */}
                <div className="lanyard-hanging-grid">
                    {lanyardRowEvents.map((item, idx) => (
                        <LanyardDropCard
                            key={item.id}
                            eventItem={item}
                            rotation={rotations[idx]}
                            onClick={() => setSelectedEvent(item)}
                        />
                    ))}
                </div>
            </div>

            {/* Gallery Lightbox Modal */}
            <EventGalleryModal
                eventData={selectedEvent}
                isOpen={!!selectedEvent}
                onClose={() => setSelectedEvent(null)}
            />
        </section>
    );
}
