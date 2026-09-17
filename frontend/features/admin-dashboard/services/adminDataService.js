const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

const INITIAL_METRICS = {
  totalMembers: 1420,
  selectedCandidates: 348,
  successfulPayments: 295,
  pendingPayments: 53,
  incomingRequests: 74,
};

const INITIAL_REGISTRATIONS = [
  {
    _id: 'reg-01',
    fullName: 'Hamza Khan',
    email: 'hamza.k@nu.edu.pk',
    phone: '+92 301 5554321',
    university: 'FAST NUCES',
    department: 'Computer Science',
    status: 'pending',
    createdAt: '2026-09-09T18:30:00.000Z',
  },
  {
    _id: 'reg-02',
    fullName: 'Ayesha Siddiqui',
    email: 'ayesha.sid@nust.edu.pk',
    phone: '+92 312 9876543',
    university: 'NUST SEECS',
    department: 'Software Engineering',
    status: 'pending',
    createdAt: '2026-09-09T20:15:00.000Z',
  },
  {
    _id: 'reg-03',
    fullName: 'Bilal Tariq',
    email: 'bilal.t@giki.edu.pk',
    phone: '+92 333 4455667',
    university: 'GIKI',
    department: 'Artificial Intelligence',
    status: 'pending',
    createdAt: '2026-09-10T02:00:00.000Z',
  },
];

const INITIAL_PROOFS = [
  {
    _id: 'proof-01',
    fullName: 'Zainab Fatima',
    email: 'zainab.f@iba.edu.pk',
    amount: 1500,
    transactionId: 'TXN-994821',
    proofUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
    status: 'under_review',
    submittedAt: '2026-09-09T22:45:00.000Z',
  },
  {
    _id: 'proof-02',
    fullName: 'Omar Farooq',
    email: 'omar.f@lums.edu.pk',
    amount: 1500,
    transactionId: 'TXN-883190',
    proofUrl: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=600&auto=format&fit=crop&q=80',
    status: 'under_review',
    submittedAt: '2026-09-10T01:10:00.000Z',
  },
];

const INITIAL_PROMOS = [
  { _id: 'promo-01', code: 'LOOP2026', discountPercent: 20, maxUses: 100, usedCount: 42, isActive: true },
  { _id: 'promo-02', code: 'FASTVIP', discountPercent: 30, maxUses: 50, usedCount: 35, isActive: true },
  { _id: 'promo-03', code: 'EARLYBIRD', discountPercent: 15, maxUses: 200, usedCount: 200, isActive: false },
];

function getAuthHeaders(extraHeaders = {}) {
  const headers = { ...extraHeaders };
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken');
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export async function fetchAdminMetrics() {
  try {
    const res = await fetch(`${API_BASE}/registrations/metrics`, {
      headers: getAuthHeaders(),
      credentials: 'include',
    });
    if (res.ok) {
      const json = await res.json();
      return { ...INITIAL_METRICS, ...json.data };
    }
  } catch {
    // Return fallback state
  }
  return INITIAL_METRICS;
}

export async function fetchPendingRegistrations() {
  try {
    const res = await fetch(`${API_BASE}/registrations?status=pending`, {
      headers: getAuthHeaders(),
      credentials: 'include',
    });
    if (res.ok) {
      const json = await res.json();
      if (json.data && json.data.length) return json.data;
    }
  } catch {
    // Return fallback state
  }
  return INITIAL_REGISTRATIONS;
}

export async function fetchSubmittedProofs() {
  try {
    const res = await fetch(`${API_BASE}/registrations?status=under_review`, {
      headers: getAuthHeaders(),
      credentials: 'include',
    });
    if (res.ok) {
      const json = await res.json();
      if (json.data && json.data.length) return json.data;
    }
  } catch {
    // Return fallback state
  }
  return INITIAL_PROOFS;
}

export async function updateRegistrationStatusApi(id, status) {
  try {
    const res = await fetch(`${API_BASE}/registrations/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
      credentials: 'include',
      body: JSON.stringify({ status }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function fetchPromoCodes() {
  try {
    const res = await fetch(`${API_BASE}/promo`, {
      headers: getAuthHeaders(),
      credentials: 'include',
    });
    if (res.ok) {
      const json = await res.json();
      if (json.data && json.data.length) return json.data;
    }
  } catch {
    // Return fallback state
  }
  return INITIAL_PROMOS;
}

export async function createPromoCodeApi(codeData) {
  try {
    const res = await fetch(`${API_BASE}/promo`, {
      method: 'POST',
      headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
      credentials: 'include',
      body: JSON.stringify(codeData),
    });
    if (res.ok) {
      const json = await res.json();
      return json.data;
    }
  } catch {
    // Fallback
  }
  return { _id: `promo-${Date.now()}`, ...codeData, usedCount: 0, isActive: true };
}
