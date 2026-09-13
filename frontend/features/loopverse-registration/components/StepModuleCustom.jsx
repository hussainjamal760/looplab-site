'use client';

const MODULES = [
  'Web Development',
  'App Development',
  'AI / ML Innovation',
  'Cybersecurity & Open Tech',
  'Game Development',
  'UI/UX Design',
  'Pitching Competition',
];

export default function StepModuleCustom({ formData, updateField, updateAnswer, dynamicFields }) {
  return (
    <div className="lvr-step-body">
      <div className="lvr-step-title-wrap">
        <h3 className="lvr-step-heading">3. Module Selection & Details</h3>
        <p className="lvr-step-desc">Pick your competition module and complete required answers.</p>
      </div>

      <div className="lvr-grid">
        <div className="lvr-field-group lvr-grid--full">
          <label className="lvr-label" htmlFor="module">
            Competition Module <span className="lvr-req">*</span>
          </label>
          <select
            id="module"
            className="lvr-input"
            value={formData.module}
            onChange={(e) => updateField('module', e.target.value)}
          >
            {MODULES.map((mod) => (
              <option key={mod} value={mod}>
                {mod}
              </option>
            ))}
          </select>
        </div>

        {/* Dynamic Fields from MongoDB Event Config */}
        {dynamicFields.map((field) => {
          const val = formData.answers[field.fieldId];
          return (
            <div
              key={field.fieldId}
              className={`lvr-field-group ${
                field.fieldType === 'textarea' || field.fieldType === 'radio' ? 'lvr-grid--full' : ''
              }`}
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
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
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
  );
}
