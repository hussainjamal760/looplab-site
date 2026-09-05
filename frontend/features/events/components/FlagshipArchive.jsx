'use client';

import { useState } from 'react';
import ShinyText from './ShinyText';
import { loopverseData } from '@/lib/eventsData';

export default function FlagshipArchive() {
    const [openItem, setOpenItem] = useState('loopverse-2');

    const toggleAccordion = (id) => {
        setOpenItem((prev) => (prev === id ? null : id));
    };

    const archives = [loopverseData.loopverse2, loopverseData.loopverse1];

    return (
        <section className="archive-section">
            <div className="archive-header-wrap">
                <span className="archive-badge badge-green">HISTORICAL RECAPS</span>
                <h2 className="archive-title">
                    <ShinyText text="FLAGSHIP ARCHIVE" speed={3.5} />
                </h2>
                <p className="archive-subtitle">
                    Explore past flagship hackathons, attendance milestones, and key achievements.
                </p>
            </div>

            <div className="archive-accordion-list">
                {archives.map((item) => {
                    const isOpen = openItem === item.id;

                    return (
                        <div
                            key={item.id}
                            className={`archive-accordion-card ${isOpen ? 'is-open' : ''}`}
                        >
                            <button
                                type="button"
                                className="archive-accordion-btn"
                                onClick={() => toggleAccordion(item.id)}
                                aria-expanded={isOpen}
                            >
                                <div className="accordion-btn-left">
                                    <span className="archive-edition-tag">{item.edition}</span>
                                    <div className="accordion-title-wrap">
                                        <h3 className="accordion-item-title">{item.title}</h3>
                                        <span className="accordion-item-meta">
                                            📅 {item.date} &nbsp;•&nbsp; 📍 {item.location}
                                        </span>
                                    </div>
                                </div>
                                <div className="accordion-toggle-icon">
                                    {isOpen ? '−' : '+'}
                                </div>
                            </button>

                            <div className="archive-accordion-body">
                                <div className="archive-body-inner">
                                    <div className="archive-summary-box">
                                        <h4 className="summary-heading">EDITION OVERVIEW</h4>
                                        <p className="summary-text">{item.summary}</p>
                                    </div>

                                    <div className="archive-stats-block">
                                        <h4 className="summary-heading">KEY MILESTONES</h4>
                                        <div className="archive-stats-grid">
                                            {item.stats.map((stat, i) => (
                                                <div key={i} className="archive-stat-card">
                                                    <span className="archive-stat-num">{stat.value}</span>
                                                    <span className="archive-stat-lbl">{stat.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
