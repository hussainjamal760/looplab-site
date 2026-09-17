import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:5000/api/v1';

export const baseApi = createApi({
  reducerPath: 'baseApi',

  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: 'include',

    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('accessToken');
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
      }
      return headers;
    },
  }),

  tagTypes: [
    'Admin',
    'Events',
    'Registrations',
    'AdminMetrics',
    'PromoCodes',
  ],

  endpoints: () => ({}),
});