'use client';

import { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, RefreshCw, Download, Pin } from 'lucide-react';

export default function CardOverflowMenu({ onRefresh, onExport, onPin, cardTitle = 'Widget' }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAction = (callback) => {
    if (callback) callback();
    setOpen(false);
  };

  return (
    <div className="db-overflow-wrap" ref={menuRef}>
      <button
        type="button"
        className="db-overflow-trigger"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={`Options for ${cardTitle}`}
      >
        <MoreHorizontal size={18} />
      </button>

      {open && (
        <div className="db-overflow-dropdown">
          <button
            type="button"
            className="db-overflow-item"
            onClick={() => handleAction(onRefresh)}
          >
            <RefreshCw size={13} />
            <span>Refresh</span>
          </button>
          <button
            type="button"
            className="db-overflow-item"
            onClick={() => handleAction(onExport)}
          >
            <Download size={13} />
            <span>Export CSV</span>
          </button>
          <button
            type="button"
            className="db-overflow-item"
            onClick={() => handleAction(onPin)}
          >
            <Pin size={13} />
            <span>Pin Widget</span>
          </button>
        </div>
      )}
    </div>
  );
}
