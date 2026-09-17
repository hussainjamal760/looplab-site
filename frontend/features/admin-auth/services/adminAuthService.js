const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

const getAuthToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken');
};

export async function loginAdmin(email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || 'Authentication failed. Invalid email or password.');
  }

  if (typeof window !== 'undefined' && result.data?.token) {
    localStorage.setItem('accessToken', result.data.token);
  }

  return result.data;
}

export async function fetchCurrentAdmin() {
  const token = getAuthToken();
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    method: 'GET',
    headers,
    credentials: 'include',
  });

  if (!response.ok) return null;

  const result = await response.json();
  return result.success ? result.data.admin : null;
}

export async function logoutAdmin() {
  const token = getAuthToken();
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (typeof window !== 'undefined') {
    localStorage.removeItem('accessToken');
  }

  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: 'POST',
    headers,
    credentials: 'include',
  });

  return response.ok;
}
