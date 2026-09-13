'use client';

export default function StepPersonalDetails({ formData, updateField }) {
  return (
    <div className="lvr-step-body">
      <div className="lvr-step-title-wrap">
        <h3 className="lvr-step-heading">1. Personal Information</h3>
        <p className="lvr-step-desc">Enter your contact details so we can reach you.</p>
      </div>

      <div className="lvr-grid">
        <div className="lvr-field-group">
          <label className="lvr-label" htmlFor="fullName">
            Full Name <span className="lvr-req">*</span>
          </label>
          <input
            id="fullName"
            className="lvr-input"
            type="text"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={(e) => updateField('fullName', e.target.value)}
          />
        </div>

        <div className="lvr-field-group">
          <label className="lvr-label" htmlFor="email">
            Email Address <span className="lvr-req">*</span>
          </label>
          <input
            id="email"
            className="lvr-input"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
          />
        </div>

        <div className="lvr-field-group">
          <label className="lvr-label" htmlFor="phone">
            Phone Number <span className="lvr-req">*</span>
          </label>
          <input
            id="phone"
            className="lvr-input"
            type="tel"
            placeholder="+92 300 1234567"
            value={formData.phone}
            onChange={(e) => updateField('phone', e.target.value)}
          />
        </div>

        <div className="lvr-field-group">
          <label className="lvr-label" htmlFor="cnic">
            CNIC / B-Form Number
          </label>
          <input
            id="cnic"
            className="lvr-input"
            type="text"
            placeholder="35202-0000000-0"
            value={formData.cnic}
            onChange={(e) => updateField('cnic', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
