'use client';

import { MODULES_DATA } from '@/features/loopverse-details/modulesData';

export default function StepModuleCustom({ formData, updateField, updateAnswer, dynamicFields }) {
  const selectedModule = MODULES_DATA.find((m) => m.title === formData.module) || MODULES_DATA[0];

  function handleSelectModule(mod) {
    updateField('module', mod.title);
    if (mod.isOnsiteOnly) {
      updateField('track', 'onsite');
    }
  }

  return (
    <div className="lvr-step-body">
      <div className="lvr-step-title-wrap">
        <h3 className="lvr-step-heading">3. Module & Track Selection</h3>
        <p className="lvr-step-desc">Pick your competition module and select your preferred track mode.</p>
      </div>

      {/* Module Card Grid */}
      <div className="lvr-module-grid">
        {MODULES_DATA.map((mod) => {
          const IconComp = mod.icon;
          const isSelected = formData.module === mod.title;
          const isOnsiteOnly = mod.isOnsiteOnly;

          return (
            <button
              key={mod.id}
              type="button"
              onClick={() => handleSelectModule(mod)}
              className={`lvr-module-card${isSelected ? ' lvr-module-card--selected' : ''}`}
            >
              <div className="lvr-module-card-top">
                <div className={`lvr-module-icon${isSelected ? ' lvr-module-icon--selected' : ''}`}>
                  <IconComp size={20} />
                </div>
                <div className="lvr-module-badges">
                  {isOnsiteOnly ? (
                    <span className="lvr-module-tag lvr-module-tag--onsite">Onsite Only</span>
                  ) : (
                    <span className="lvr-module-tag lvr-module-tag--dual">Dual Track</span>
                  )}
                </div>
              </div>

              <span className="lvr-module-name">{mod.title}</span>
              <span className={`lvr-module-fee${isSelected ? ' lvr-module-fee--selected' : ''}`}>
                {mod.feeFormatted}
              </span>
            </button>
          );
        })}
      </div>

      {/* Track Mode Selector for Dual Track vs Onsite Only */}
      {selectedModule && !selectedModule.isOnsiteOnly ? (
        <div className="lvr-track-mode-wrapper">
          <div className="lvr-track-mode-header">
            <span>Select Participation Track for <strong>{selectedModule.title}</strong></span>
          </div>
          <div className="lvr-track-mode-options">
            <button
              type="button"
              className={`lvr-track-mode-btn ${formData.track === 'onsite' ? 'lvr-track-mode-btn--active' : ''}`}
              onClick={() => updateField('track', 'onsite')}
            >
              <span className="lvr-track-mode-title">⚡ Onsite Track</span>
              <span className="lvr-track-mode-sub">Attend live at venue in Lahore, PK</span>
            </button>
            <button
              type="button"
              className={`lvr-track-mode-btn ${formData.track === 'virtual' ? 'lvr-track-mode-btn--active' : ''}`}
              onClick={() => updateField('track', 'virtual')}
            >
              <span className="lvr-track-mode-title">🌐 Virtual Track</span>
              <span className="lvr-track-mode-sub">Compete & submit online remotely</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="lvr-track-mode-notice">
          <span>📍 Note: <strong>{selectedModule?.title}</strong> is strictly an Onsite module (Lahore, PK).</span>
        </div>
      )}

      {/* Required Parking Dropdown */}
      <div className="lvr-field-group lvr-grid--full" style={{ marginTop: '24px' }}>
        <label className="lvr-label" htmlFor="needsParking">
          Do you require parking?
        </label>
        <select
          id="needsParking"
          className="lvr-input"
          value={formData.needsParking || 'No'}
          onChange={(e) => updateField('needsParking', e.target.value)}
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>

      {/* Conditional Vehicle Details when Parking is Yes */}
      {formData.needsParking === 'Yes' && (
        <div className="lvr-parking-box" style={{ marginTop: '16px' }}>
          <div className="lvr-grid">
            <div className="lvr-field-group">
              <label className="lvr-label" htmlFor="vehicleType">
                Vehicle Type <span className="lvr-req">*</span>
              </label>
              <select
                id="vehicleType"
                className="lvr-input"
                value={formData.vehicleType || 'Bike'}
                onChange={(e) => updateField('vehicleType', e.target.value)}
              >
                <option value="Bike">Bike 🏍️</option>
                <option value="Car">Car 🚗</option>
              </select>
            </div>

            <div className="lvr-field-group">
              <label className="lvr-label" htmlFor="vehicleNumber">
                Vehicle / Plate Number <span className="lvr-req">*</span>
              </label>
              <input
                id="vehicleNumber"
                className="lvr-input"
                type="text"
                placeholder="e.g. LEA-1234"
                value={formData.vehicleNumber || ''}
                onChange={(e) => updateField('vehicleNumber', e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Fields from MongoDB if any */}
      {dynamicFields.length > 0 && (
        <div className="lvr-dynamic-fields" style={{ marginTop: '20px' }}>
          <div className="lvr-step-divider" />
          <div className="lvr-grid">
            {dynamicFields.map((field) => {
              const val = formData.answers[field.fieldId];
              return (
                <div
                  key={field.fieldId}
                  className={`lvr-field-group ${field.fieldType === 'textarea' || field.fieldType === 'radio' ? 'lvr-grid--full' : ''}`}
                >
                  <label className="lvr-label" htmlFor={field.fieldId}>
                    {field.label} {field.isRequired && <span className="lvr-req">*</span>}
                  </label>

                  {field.fieldType === 'dropdown' ? (
                    <select
                      id={field.fieldId}
                      className="lvr-input"
                      value={val || ''}
                      onChange={(e) => updateAnswer(field.fieldId, e.target.value)}
                    >
                      <option value="">{field.placeholder || `Select ${field.label}`}</option>
                      {(field.options || []).map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : field.fieldType === 'textarea' ? (
                    <textarea
                      id={field.fieldId}
                      className="lvr-input lvr-textarea"
                      placeholder={field.placeholder}
                      value={val || ''}
                      onChange={(e) => updateAnswer(field.fieldId, e.target.value)}
                    />
                  ) : (
                    <input
                      id={field.fieldId}
                      className="lvr-input"
                      type={field.fieldType === 'number' ? 'number' : field.fieldType === 'email' ? 'email' : 'text'}
                      placeholder={field.placeholder}
                      value={val || ''}
                      onChange={(e) => updateAnswer(field.fieldId, e.target.value)}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected module preview */}
      {selectedModule && (
        <div className="lvr-module-preview" style={{ marginTop: '24px' }}>
          <div className="lvr-module-preview-row">
            <span className="lvr-module-preview-label">Selected Module</span>
            <strong className="lvr-module-preview-val">{selectedModule.title}</strong>
          </div>
          <div className="lvr-module-preview-row">
            <span className="lvr-module-preview-label">Registration Fee</span>
            <strong className="lvr-module-preview-fee">{selectedModule.feeFormatted}</strong>
          </div>
          <div className="lvr-module-preview-row">
            <span className="lvr-module-preview-label">Selected Track Mode</span>
            <span className="lvr-module-preview-track" style={{ textTransform: 'capitalize' }}>
              {formData.track === 'onsite' ? '⚡ Onsite' : '🌐 Virtual'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
