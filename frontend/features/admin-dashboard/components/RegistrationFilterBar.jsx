'use client';

import { Search, Filter, RotateCcw, FileSpreadsheet, FileText } from 'lucide-react';

const MODULE_OPTIONS = [
  'All Modules',
  'Web Development',
  'App Development',
  'AI / ML',
  'UI / UX Design',
  'Cybersecurity & Open Innovation',
  'Pitching Competition',
  'Game Development',
];

export default function RegistrationFilterBar({
  query,
  setQuery,
  moduleFilter,
  setModuleFilter,
  trackFilter,
  setTrackFilter,
  parkingFilter,
  setParkingFilter,
  promoFilter,
  setPromoFilter,
  onReset,
  onExportExcel,
  onExportPDF,
  totalResultsCount,
}) {
  const isFiltered =
    query.trim() !== '' ||
    moduleFilter !== 'All Modules' ||
    trackFilter !== 'All Tracks' ||
    parkingFilter !== 'All Parking' ||
    promoFilter !== 'All Promo';

  return (
    <div
      style={{
        background: '#ffffff',
        border: '1.5px solid var(--dz-border, #e2e8f0)',
        borderRadius: '16px',
        padding: '16px 20px',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
      }}
    >
      {/* Top row: Search input + Export Actions */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '14px',
        }}
      >
        <div
          style={{
            position: 'relative',
            flex: '1',
            minWidth: '260px',
          }}
        >
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#94a3b8',
            }}
          />
          <input
            type="text"
            value={query}
            placeholder="Search name, email, phone, cnic, university..."
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px 10px 40px',
              border: '1.5px solid #cbd5e1',
              borderRadius: '12px',
              fontSize: '0.88rem',
              fontWeight: 500,
              outline: 'none',
              background: '#f8fafc',
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={onExportExcel}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 16px',
              background: '#10B981',
              color: '#ffffff',
              border: '1.5px solid #059669',
              borderRadius: '10px',
              fontSize: '0.82rem',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(16,185,129,0.2)',
            }}
          >
            <FileSpreadsheet size={15} />
            <span>Excel (.xlsx)</span>
          </button>

          <button
            type="button"
            onClick={onExportPDF}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 16px',
              background: '#9E00FE',
              color: '#ffffff',
              border: '1.5px solid #7e00cb',
              borderRadius: '10px',
              fontSize: '0.82rem',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(158,0,254,0.2)',
            }}
          >
            <FileText size={15} />
            <span>PDF Summary</span>
          </button>
        </div>
      </div>

      {/* Bottom row: Detailed Dropdown Filters */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px',
          paddingTop: '12px',
          borderTop: '1px dashed #e2e8f0',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '0.8rem', fontWeight: 700, marginRight: '4px' }}>
          <Filter size={14} />
          <span>FILTERS:</span>
        </div>

        {/* Module Filter */}
        <select
          value={moduleFilter}
          onChange={(e) => setModuleFilter(e.target.value)}
          style={{
            padding: '8px 12px',
            borderRadius: '10px',
            border: moduleFilter !== 'All Modules' ? '1.5px solid #9E00FE' : '1px solid #cbd5e1',
            background: moduleFilter !== 'All Modules' ? '#F3E8FF' : '#ffffff',
            color: moduleFilter !== 'All Modules' ? '#6b21a8' : '#334155',
            fontSize: '0.82rem',
            fontWeight: 700,
            outline: 'none',
            cursor: 'pointer',
          }}
        >
          {MODULE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        {/* Track Filter */}
        <select
          value={trackFilter}
          onChange={(e) => setTrackFilter(e.target.value)}
          style={{
            padding: '8px 12px',
            borderRadius: '10px',
            border: trackFilter !== 'All Tracks' ? '1.5px solid #9E00FE' : '1px solid #cbd5e1',
            background: trackFilter !== 'All Tracks' ? '#F3E8FF' : '#ffffff',
            color: trackFilter !== 'All Tracks' ? '#6b21a8' : '#334155',
            fontSize: '0.82rem',
            fontWeight: 700,
            outline: 'none',
            cursor: 'pointer',
          }}
        >
          <option value="All Tracks">All Tracks</option>
          <option value="Onsite">Onsite Only</option>
          <option value="Virtual">Virtual Only</option>
        </select>

        {/* Parking Filter */}
        <select
          value={parkingFilter}
          onChange={(e) => setParkingFilter(e.target.value)}
          style={{
            padding: '8px 12px',
            borderRadius: '10px',
            border: parkingFilter !== 'All Parking' ? '1.5px solid #10B981' : '1px solid #cbd5e1',
            background: parkingFilter !== 'All Parking' ? '#ECFDF5' : '#ffffff',
            color: parkingFilter !== 'All Parking' ? '#047857' : '#334155',
            fontSize: '0.82rem',
            fontWeight: 700,
            outline: 'none',
            cursor: 'pointer',
          }}
        >
          <option value="All Parking">All Parking</option>
          <option value="Yes">Parking Required</option>
          <option value="No">No Parking Needed</option>
        </select>

        {/* Promo Filter */}
        <select
          value={promoFilter}
          onChange={(e) => setPromoFilter(e.target.value)}
          style={{
            padding: '8px 12px',
            borderRadius: '10px',
            border: promoFilter !== 'All Promo' ? '1.5px solid #9E00FE' : '1px solid #cbd5e1',
            background: promoFilter !== 'All Promo' ? '#F3E8FF' : '#ffffff',
            color: promoFilter !== 'All Promo' ? '#6b21a8' : '#334155',
            fontSize: '0.82rem',
            fontWeight: 700,
            outline: 'none',
            cursor: 'pointer',
          }}
        >
          <option value="All Promo">All Promos</option>
          <option value="With Promo">With Promo Code</option>
          <option value="No Promo">No Promo Code</option>
        </select>

        {/* Reset button */}
        {isFiltered && (
          <button
            type="button"
            onClick={onReset}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '7px 12px',
              background: '#FEE2E2',
              color: '#991B1B',
              border: '1px solid #FCA5A5',
              borderRadius: '999px',
              fontSize: '0.78rem',
              fontWeight: 800,
              cursor: 'pointer',
              marginLeft: 'auto',
            }}
          >
            <RotateCcw size={12} />
            <span>Reset Filters</span>
          </button>
        )}

        <div style={{ marginLeft: 'auto', fontSize: '0.78rem', fontWeight: 700, color: '#64748b' }}>
          Showing <strong>{totalResultsCount}</strong> results
        </div>
      </div>
    </div>
  );
}
