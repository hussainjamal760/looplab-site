'use client';

const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year / Final', 'Postgraduate'];

export default function StepAcademicTrack({ formData, updateField }) {
  return (
    <div className="lvr-step-body">
      <div className="lvr-step-title-wrap">
        <h3 className="lvr-step-heading">2. Academic Information</h3>
        <p className="lvr-step-desc">Tell us where you study and your current academic level.</p>
      </div>

      <div className="lvr-grid">
        <div className="lvr-field-group">
          <label className="lvr-label" htmlFor="university">
            University / Institute <span className="lvr-req">*</span>
          </label>
          <input
            id="university"
            className="lvr-input"
            type="text"
            placeholder="e.g. FAST NUCES, NUST, LUMS"
            value={formData.university}
            onChange={(e) => updateField('university', e.target.value)}
          />
        </div>

        <div className="lvr-field-group">
          <label className="lvr-label" htmlFor="department">
            Department / Degree <span className="lvr-req">*</span>
          </label>
          <input
            id="department"
            className="lvr-input"
            type="text"
            placeholder="e.g. BS Computer Science"
            value={formData.department}
            onChange={(e) => updateField('department', e.target.value)}
          />
        </div>

        <div className="lvr-field-group lvr-grid--full">
          <label className="lvr-label" htmlFor="year">
            Study Year <span className="lvr-req">*</span>
          </label>
          <select
            id="year"
            className="lvr-input"
            value={formData.year}
            onChange={(e) => updateField('year', e.target.value)}
          >
            {YEARS.map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
