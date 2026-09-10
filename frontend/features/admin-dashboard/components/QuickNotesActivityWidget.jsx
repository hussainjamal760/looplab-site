'use client';

import { useState } from 'react';
import { Plus, Trash2, Clock, CheckCircle2 } from 'lucide-react';
import InteractiveSticker from './InteractiveSticker';

export default function QuickNotesActivityWidget() {
  const [tab, setTab] = useState('notes');
  const [notes, setNotes] = useState([
    'Verify bank slips for Sep 10 batch',
    'Follow up with 3 pending GIKI applicants',
    'Review FASTVIP promo performance',
  ]);
  const [inputVal, setInputVal] = useState('');

  const activities = [
    { text: 'Ayesha Khan approved', time: '5m ago' },
    { text: 'New payment proof uploaded (TXN-9948)', time: '18m ago' },
    { text: 'Promo LOOP2026 reached 42 uses', time: '1h ago' },
    { text: 'Admin updated verification rules', time: '3h ago' },
  ];

  const addNote = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    setNotes([inputVal.trim(), ...notes]);
    setInputVal('');
  };

  const removeNote = (idx) => {
    setNotes(notes.filter((_, i) => i !== idx));
  };

  return (
    <div className="db-card" style={{ position: 'relative', overflow: 'visible' }}>
      <InteractiveSticker
        src="/assets/Footer-Sticker SVG/footer-sticker-camera.svg"
        size={36}
        top="-14px"
        right="16px"
        rotate={10}
        draggable
      />
      <div className="db-card__header">
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={() => setTab('notes')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: 800,
              color: tab === 'notes' ? 'var(--dz-purple-primary)' : 'var(--dz-text-muted)',
              borderBottom: tab === 'notes' ? '2px solid var(--dz-purple-primary)' : 'none',
              paddingBottom: '2px',
            }}
          >
            Quick Notes
          </button>
          <button
            type="button"
            onClick={() => setTab('activity')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: 800,
              color: tab === 'activity' ? 'var(--dz-purple-primary)' : 'var(--dz-text-muted)',
              borderBottom: tab === 'activity' ? '2px solid var(--dz-purple-primary)' : 'none',
              paddingBottom: '2px',
            }}
          >
            Activity Feed
          </button>
        </div>
      </div>

      <div className="db-card__body" style={{ height: '210px', display: 'flex', flexDirection: 'column' }}>
        {tab === 'notes' ? (
          <>
            <form onSubmit={addNote} style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.65rem' }}>
              <input
                type="text"
                placeholder="Write a reminder..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                style={{
                  flex: 1,
                  padding: '4px 8px',
                  fontSize: '0.75rem',
                  border: '1px solid var(--dz-border)',
                  borderRadius: '8px',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                className="db-btn-purple-pill"
                style={{ padding: '4px 10px', fontSize: '0.75rem' }}
              >
                <Plus size={13} />
                <span>Add</span>
              </button>
            </form>

            <div style={{ overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {notes.map((note, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '4px 8px',
                    borderRadius: '8px',
                    background: '#f9fafb',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                  }}
                >
                  <span style={{ color: 'var(--dz-text-primary)' }}>{note}</span>
                  <button
                    type="button"
                    onClick={() => removeNote(i)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div style={{ overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {activities.map((act, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.76rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <CheckCircle2 size={13} color="var(--dz-purple-primary)" />
                  <span style={{ fontWeight: 600, color: 'var(--dz-text-primary)' }}>{act.text}</span>
                </div>
                <span style={{ color: 'var(--dz-text-muted)', fontSize: '0.68rem' }}>{act.time}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
