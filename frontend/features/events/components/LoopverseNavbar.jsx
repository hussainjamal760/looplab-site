'use client';

import { useState, useEffect } from 'react';

export default function LoopverseNavbar() {
  const [isLight, setIsLight] = useState(false);
  const [titleText, setTitleText] = useState('LOOPLAB');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      if (scrollPos > 400) {
        setIsLight(true);
        setTitleText('loopverse 3.0');
      } else {
        setIsLight(false);
        setTitleText('LOOPLAB');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`loopverse-navbar ${isLight ? 'is-light' : 'is-dark'}`}>
      {/* Left Badge Logo */}
      <div className="nav-badge-logo">
        <div className="starburst-badge">
          <span className="starburst-text">work</span>
        </div>
      </div>

      {/* Center Rotating Script Title */}
      <div className="nav-center-title">
        {titleText}
      </div>

      {/* Right Hamburger Icon */}
      <button className="nav-hamburger-btn" type="button" aria-label="Open menu">
        ☰
      </button>
    </nav>
  );
}
