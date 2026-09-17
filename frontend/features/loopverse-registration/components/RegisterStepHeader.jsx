'use client';

import { Check } from 'lucide-react';

const STEPS = [
  { number: 1, label: 'Personal' },
  { number: 2, label: 'Academic' },
  { number: 3, label: 'Module & Custom' },
  { number: 4, label: 'Payment & Review' },
];

export default function RegisterStepHeader({ currentStep, onStepClick }) {
  const progressPercent = ((currentStep - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="lvr-step-header">
      <div className="lvr-progress-bar-bg">
        <div
          className="lvr-progress-bar-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="lvr-step-items">
        {STEPS.map((step) => {
          const isActive = currentStep === step.number;
          const isCompleted = currentStep > step.number;

          let itemClass = 'lvr-step-item';
          if (isActive) itemClass += ' lvr-step-item--active';
          if (isCompleted) itemClass += ' lvr-step-item--completed';

          return (
            <button
              key={step.number}
              type="button"
              className={itemClass}
              onClick={() => onStepClick(step.number)}
            >
              <div className="lvr-step-circle">
                {isCompleted ? <Check size={16} /> : step.number}
              </div>
              <span className="lvr-step-label">{step.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
