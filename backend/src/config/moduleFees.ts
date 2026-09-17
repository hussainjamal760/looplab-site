/**
 * LoopVerse 3.0 Backend Module Registration Fees Configuration
 * Centralized pricing source of truth for registration calculation & validation:
 * - Standard Module Fee: 1,000 PKR
 * - Pitching Competition Fee: 800 PKR
 */

export const DEFAULT_MODULE_FEE = 1000;
export const PITCHING_MODULE_FEE = 800;

export const MODULE_FEES_MAP: Record<string, number> = {
  'web-dev': 1000,
  'app-dev': 1000,
  'ai-ml': 1000,
  'ui-ux': 1000,
  'cybersecurity': 1000,
  'pitching': 800,
  'game-dev': 1000,
  'Web Development': 1000,
  'App Development': 1000,
  'AI / ML': 1000,
  'UI / UX Design': 1000,
  'Cybersecurity & Open Innovation': 1000,
  'Pitching Competition': 800,
  'Game Development': 1000,
};

export const getModuleFee = (moduleIdentifier: string): number => {
  if (!moduleIdentifier) return DEFAULT_MODULE_FEE;
  
  if (MODULE_FEES_MAP[moduleIdentifier]) {
    return MODULE_FEES_MAP[moduleIdentifier];
  }
  
  if (moduleIdentifier.toLowerCase().includes('pitching')) {
    return PITCHING_MODULE_FEE;
  }
  
  return DEFAULT_MODULE_FEE;
};

export const calculateTotalFee = (selectedModules: string[], discountPercent = 0) => {
  const subtotal = selectedModules.reduce((acc, mod) => acc + getModuleFee(mod), 0);
  const discountAmount = discountPercent > 0 ? Math.round((subtotal * discountPercent) / 100) : 0;
  const totalAmount = Math.max(0, subtotal - discountAmount);

  return { subtotal, discountAmount, totalAmount, currency: 'PKR' };
};
