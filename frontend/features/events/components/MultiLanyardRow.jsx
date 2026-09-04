'use client';

import { useState } from 'react';
import ShinyText from './ShinyText';
import LanyardHangingCard from './LanyardHangingCard';
import EventGalleryModal from './EventGalleryModal';
import { lanyardRowEvents } from '@/lib/eventsData';

export default function MultiLanyardRow() {
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleCardClick = (eventItem) => {
        setSelectedEvent(eventItem);
    };

    return (
        <section className="multi-lanyard-section">
            <div className="multi-lanyard-header">
                <span className="multi-lanyard-badge badge-purple">
                    DELEGATE PASS GALLERY
                </span>
                <h2 className="multi-lanyard-title">
                    MULTI-LANYARD <ShinyText text="EVENT SNAPSHOTS" speed={3.5} />
                </h2>
                <p className="multi-lanyard-subtitle">
                    Hover and swing the hanging 3D delegate passes connected to the main strap line. Click any pass card to inspect its full photo gallery.
                </p>
            </div>

            {/* Main Horizontal Black Top Strap Line Bar Spanning Across Section */}
            <div className="lanyard-main-top-bar">
                <div className="top-bar-strap-line">
                    <span className="top-bar-tagline">
                        ✦ LOOPLAB OFFICIAL DELEGATE PASS LINE ✦ MULTI-LANYARD HANGING ROW ✦ CLICK ANY PASS FOR EVENT RECAP & PHOTOS ✦
                    </span>
                </div>

                {/* Multiple 3D Physics Hanging Lanyard Pass Cards Dropping Down */}
                <div className="lanyard-hanging-row-grid">
                    {lanyardRowEvents.map((item) => (
                        <LanyardHangingCard
                            key={item.id}
                            eventItem={item}
                            onClick={() => handleCardClick(item)}
                        />
                    ))}
                </div>
            </div>

            {/* Lightbox Overlay Modal for Selected Event Gallery */}
            <EventGalleryModal
                eventData={selectedEvent}
                isOpen={!!selectedEvent}
                onClose={() => setSelectedEvent(null)}
            />
        </section>
    );
}
