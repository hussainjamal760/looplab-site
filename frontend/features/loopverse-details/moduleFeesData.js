/**
 * LoopVerse 3.0 Centralized Module Registration Fees Configuration
 * Fee structure:
 * - Default Module Fee: 1,000 PKR (Web Dev, App Dev, AI/ML, UI/UX, Cybersecurity, Game Dev)
 * - Pitching Competition: 800 PKR
 */

export const DEFAULT_MODULE_FEE = 1000;
export const PITCHING_MODULE_FEE = 800;

export const MODULE_FEES = {
  'web-dev': 1000,
  'app-dev': 1000,
  'ai-ml': 1000,
  'ui-ux': 1000,
  'cybersecurity': 1000,
  'pitching': 800,
  'game-dev': 1000,
};

export const MODULE_TITLE_FEE_MAP = {
  'Web Development': 1000,
  'App Development': 1000,
  'AI / ML': 1000,
  'UI / UX Design': 1000,
  'Cybersecurity & Open Innovation': 1000,
  'Pitching Competition': 800,
  'Game Development': 1000,
};

/**
 * Get fee in PKR for any module key or title
 * @param {string} moduleTitleOrKey 
 * @returns {number} Fee in PKR
 */
export function getModuleFee(moduleTitleOrKey) {
  if (!moduleTitleOrKey) return DEFAULT_MODULE_FEE;
  
  if (typeof moduleTitleOrKey === 'string') {
    if (MODULE_FEES[moduleTitleOrKey]) {
      return MODULE_FEES[moduleTitleOrKey];
    }
    if (MODULE_TITLE_FEE_MAP[moduleTitleOrKey]) {
      return MODULE_TITLE_FEE_MAP[moduleTitleOrKey];
    }
    if (moduleTitleOrKey.toLowerCase().includes('pitching')) {
      return PITCHING_MODULE_FEE;
    }
  }
  
  return DEFAULT_MODULE_FEE;
}

/**
 * Calculate total registration fee for selected modules with optional discount
 * @param {string[]} selectedModules 
 * @param {number} discountPercent 
 * @returns {{ subtotal: number, discountAmount: number, totalAmount: number, currency: string }}
 */
export function calculateRegistrationFee(selectedModules = [], discountPercent = 0) {
  const subtotal = selectedModules.reduce((acc, mod) => acc + getModuleFee(mod), 0);
  const discountAmount = discountPercent > 0 ? Math.round((subtotal * discountPercent) / 100) : 0;
  const totalAmount = Math.max(0, subtotal - discountAmount);

  return {
    subtotal,
    discountAmount,
    totalAmount,
    currency: 'PKR',
  };
}
