'use client';

import TiltedCard from './TiltedCard';
import MagnetButton from './MagnetButton';
import SplitFlapText from './SplitFlapText';
import { loopverseData } from '@/lib/eventsData';

export default function LoopverseSpotlight() {
    const data = loopverseData.loopverse3;

    return (
        <section className="spotlight-section">
            <div className="spotlight-header-wrap">
                <span className="spotlight-sub-badge badge-purple">
                    <span className="pulse-dot"></span> {data.statusBadge}
                </span>
                <h2 className="spotlight-section-title">
                    FEATURED <span className="highlight-text">SPOTLIGHT</span>
                </h2>
            </div>

            <TiltedCard className="spotlight-tilted-card" maxTilt={8} scaleOnHover={1.01}>
                <div className="spotlight-card-inner">
                    <div className="spotlight-card-banner">
                        <img
                            src={data.image}
                            alt={data.title}
                            className="spotlight-bg-img"
                        />
                        <div className="spotlight-banner-overlay" />
                        
                        {/* Split Flap Retro Status Tag */}
                        <div className="spotlight-splitflap-wrap">
                            <span className="splitflap-label">STATUS:</span>
                            <SplitFlapText text={data.status} />
                        </div>
                    </div>

                    <div className="spotlight-content">
                        <div className="spotlight-top-meta">
                            <span className="spotlight-edition-pill">{data.edition}</span>
                            <span className="spotlight-date">📅 {data.date}</span>
                            <span className="spotlight-location">📍 {data.location}</span>
                        </div>

                        <h3 className="spotlight-title">{data.title}</h3>
                        <p className="spotlight-tagline">{data.tagline}</p>
                        <p className="spotlight-desc">{data.description}</p>

                        <div className="spotlight-tracks-block">
                            <h4 className="tracks-label">HACKATHON TRACKS:</h4>
                            <div className="tracks-grid">
                                {data.tracks.map((track, i) => (
                                    <span key={i} className="track-pill">
                                        ⚡ {track}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="spotlight-bottom-bar">
                            <div className="spotlight-stats-grid">
                                {data.stats.map((stat, i) => (
                                    <div key={i} className="stat-box">
                                        <span className="stat-value">{stat.value}</span>
                                        <span className="stat-label">{stat.label}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="spotlight-cta-wrap">
                                <MagnetButton
                                    href={data.portalUrl}
                                    className="spotlight-cta-btn"
                                >
                                    Register Now / Active Portal ↗
                                </MagnetButton>
                            </div>
                        </div>
                    </div>
                </div>
            </TiltedCard>
        </section>
    );
}
