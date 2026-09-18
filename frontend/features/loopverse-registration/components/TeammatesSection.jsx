'use client';

import { UserPlus, X, Car, Bike } from 'lucide-react';

// ==========================================
// TEAMMATE CARD
// ==========================================

function TeammateCard({ teammate, index, onRemove, onUpdate }) {
  return (
    <div className="lvr-teammate-card">
      <div className="lvr-teammate-card-header">
        <span className="lvr-teammate-badge">
          <UserPlus size={13} />
          Teammate {index + 1}
        </span>
        <button
          type="button"
          className="lvr-teammate-remove-btn"
          onClick={() => onRemove(index)}
          aria-label={`Remove teammate ${index + 1}`}
        >
          <X size={14} /> Remove
        </button>
      </div>

      <div className="lvr-grid">
        <div className="lvr-field-group">
          <label className="lvr-label" htmlFor={`tm-name-${index}`}>
            Full Name <span className="lvr-req">*</span>
          </label>
          <input
            id={`tm-name-${index}`}
            className="lvr-input"
            type="text"
            placeholder="John Doe"
            value={teammate.fullName}
            onChange={(e) => onUpdate(index, 'fullName', e.target.value)}
          />
        </div>

        <div className="lvr-field-group">
          <label className="lvr-label" htmlFor={`tm-email-${index}`}>
            Email Address <span className="lvr-req">*</span>
          </label>
          <input
            id={`tm-email-${index}`}
            className="lvr-input"
            type="email"
            placeholder="teammate@example.com"
            value={teammate.email}
            onChange={(e) => onUpdate(index, 'email', e.target.value)}
          />
        </div>

        <div className="lvr-field-group">
          <label className="lvr-label" htmlFor={`tm-cnic-${index}`}>
            CNIC / B-Form <span className="lvr-req">*</span>
          </label>
          <input
            id={`tm-cnic-${index}`}
            className="lvr-input"
            type="text"
            placeholder="35202-0000000-0"
            value={teammate.cnic}
            onChange={(e) => onUpdate(index, 'cnic', e.target.value)}
          />
        </div>

        <div className="lvr-field-group">
          <label className="lvr-label" htmlFor={`tm-parking-${index}`}>
            Needs Parking?
          </label>
          <select
            id={`tm-parking-${index}`}
            className="lvr-input"
            value={teammate.needsParking}
            onChange={(e) => onUpdate(index, 'needsParking', e.target.value)}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
      </div>

      {teammate.needsParking === 'Yes' && (
        <div className="lvr-teammate-parking-box">
          <div className="lvr-grid">
            <div className="lvr-field-group">
              <label className="lvr-label" htmlFor={`tm-vtype-${index}`}>
                Vehicle Type <span className="lvr-req">*</span>
              </label>
              <select
                id={`tm-vtype-${index}`}
                className="lvr-input"
                value={teammate.vehicleType}
                onChange={(e) => onUpdate(index, 'vehicleType', e.target.value)}
              >
                <option value="Bike">Bike 🏍️</option>
                <option value="Car">Car 🚗</option>
              </select>
            </div>

            <div className="lvr-field-group">
              <label className="lvr-label" htmlFor={`tm-vnum-${index}`}>
                Plate Number <span className="lvr-req">*</span>
              </label>
              <input
                id={`tm-vnum-${index}`}
                className="lvr-input"
                type="text"
                placeholder="e.g. LEA-1234"
                value={teammate.vehicleNumber}
                onChange={(e) => onUpdate(index, 'vehicleNumber', e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// TEAMMATES SECTION (exported)
// ==========================================

export default function TeammatesSection({ teammates, addTeammate, removeTeammate, updateTeammate, maxTeammates }) {
  const canAddMore = teammates.length < maxTeammates;
  const totalMembers = teammates.length + 1;

  return (
    <div className="lvr-teammates-section">
      <div className="lvr-teammates-header">
        <div className="lvr-teammates-title-wrap">
          <span className="lvr-teammates-title">
            <UserPlus size={16} /> Add Teammates
          </span>
          <span className="lvr-teammates-count">
            {totalMembers} / {maxTeammates + 1} members
          </span>
        </div>
        <p className="lvr-teammates-desc">
          Competing as a team? Add up to {maxTeammates} teammates. Each member needs their own details and parking info.
        </p>
      </div>

      {teammates.length === 0 && (
        <div className="lvr-teammates-empty">
          <span>You are registering solo. Click below to add a teammate.</span>
        </div>
      )}

      {teammates.map((teammate, index) => (
        <TeammateCard
          key={index}
          index={index}
          teammate={teammate}
          onRemove={removeTeammate}
          onUpdate={updateTeammate}
        />
      ))}

      <button
        type="button"
        className={`lvr-add-teammate-btn${!canAddMore ? ' lvr-add-teammate-btn--disabled' : ''}`}
        onClick={addTeammate}
        disabled={!canAddMore}
      >
        <UserPlus size={15} />
        {canAddMore
          ? `Add Teammate (${maxTeammates - teammates.length} slot${maxTeammates - teammates.length === 1 ? '' : 's'} left)`
          : 'Max teammates reached (4 total)'}
      </button>
    </div>
  );
}
