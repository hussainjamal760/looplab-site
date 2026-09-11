import { baseApi } from './baseApi';

export const adminApi = baseApi.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    // ==========================================
    // ADMIN DASHBOARD METRICS
    // ==========================================

    getAdminMetrics: builder.query({
      query: () => ({
        url: '/admin/registrations/metrics',
        method: 'GET',
      }),

      transformResponse: (response) => {
        return response?.data || {};
      },

      providesTags: [
        {
          type: 'AdminMetrics',
          id: 'METRICS',
        },
      ],
    }),

    // ==========================================
    // ADMIN REGISTRATIONS
    // ==========================================

    getAdminRegistrations: builder.query({
      query: ({
        status = 'pending',
        page = 1,
        limit = 100,
        eventId,
      } = {}) => {
        const params = {
          page,
          limit,
        };

        if (status) {
          params.status = status;
        }

        if (eventId) {
          params.eventId = eventId;
        }

        return {
          url: '/admin/registrations',
          method: 'GET',
          params,
        };
      },

      transformResponse: (response) => {
        /*
         * Expected backend response:
         *
         * {
         *   success: true,
         *   data: {
         *     data: [],
         *     total: 0,
         *     page: 1,
         *     limit: 100,
         *     totalPages: 0
         *   }
         * }
         */

        const payload = response?.data || {};

        if (Array.isArray(payload)) {
          return {
            registrations: payload,
            total: payload.length,
            page: 1,
            limit: payload.length,
            totalPages: 1,
          };
        }

        const registrations =
          payload.data ||
          payload.registrations ||
          [];

        return {
          registrations: Array.isArray(registrations)
            ? registrations
            : [],

          total:
            typeof payload.total === 'number'
              ? payload.total
              : registrations.length,

          page: payload.page || 1,
          limit: payload.limit || 100,
          totalPages: payload.totalPages || 1,
        };
      },

      providesTags: (result) => {
        const registrations =
          result?.registrations || [];

        return [
          {
            type: 'Registrations',
            id: 'LIST',
          },

          ...registrations.map((registration) => ({
            type: 'Registrations',
            id: registration._id,
          })),
        ];
      },
    }),

    // ==========================================
    // APPROVE / REJECT REGISTRATION
    // ==========================================

    updateRegistrationStatus: builder.mutation({
      query: ({
        id,
        status,
        adminRemarks = '',
      }) => ({
        url: `/admin/registrations/${id}/status`,
        method: 'PATCH',

        headers: {
          'Content-Type': 'application/json',
        },

        body: {
          /*
           * Backend only accepts:
           * verified
           * rejected
           */
          status,

          /*
           * Backend property name is remarks,
           * not adminRemarks.
           */
          remarks: adminRemarks,
        },
      }),

      transformResponse: (response) => {
        return response?.data || response;
      },

      invalidatesTags: (result, error, args) => [
        {
          type: 'Registrations',
          id: 'LIST',
        },
        {
          type: 'Registrations',
          id: args.id,
        },
        {
          type: 'AdminMetrics',
          id: 'METRICS',
        },
      ],
    }),

    // ==========================================
    // ADMIN EVENTS
    // ==========================================

    getAdminEvents: builder.query({
      query: () => ({
        url: '/admin/events',
        method: 'GET',
      }),

      transformResponse: (response) => {
        const payload = response?.data;

        if (Array.isArray(payload)) {
          return payload;
        }

        return (
          payload?.events ||
          payload?.data ||
          []
        );
      },

      providesTags: [
        {
          type: 'Events',
          id: 'LIST',
        },
      ],
    }),

    createAdminEvent: builder.mutation({
      query: (eventData) => ({
        url: '/admin/events',
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: eventData,
      }),

      transformResponse: (response) => {
        return (
          response?.data?.event ||
          response?.data ||
          null
        );
      },

      invalidatesTags: [
        {
          type: 'Events',
          id: 'LIST',
        },
      ],
    }),

    toggleEventBanner: builder.mutation({
      query: ({
        id,
        isLiveBanner,
      }) => ({
        url: `/admin/events/${id}/banner`,
        method: 'PATCH',

        headers: {
          'Content-Type': 'application/json',
        },

        body: {
          isLiveBanner,
        },
      }),

      invalidatesTags: [
        {
          type: 'Events',
          id: 'LIST',
        },
      ],
    }),

    // ==========================================
    // PROMO CODES
    // ==========================================

    createPromoCode: builder.mutation({
      query: (promoData) => ({
        url: '/admin/promo-codes',
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: {
          ...promoData,

          code: String(
            promoData.code || ''
          )
            .trim()
            .toUpperCase(),
        },
      }),

      invalidatesTags: [
        {
          type: 'PromoCodes',
          id: 'LIST',
        },
      ],
    }),

    updatePromoCode: builder.mutation({
      query: ({
        id,
        ...promoData
      }) => ({
        url: `/admin/promo-codes/${id}`,
        method: 'PATCH',

        headers: {
          'Content-Type': 'application/json',
        },

        body: {
          ...promoData,

          ...(promoData.code
            ? {
                code: String(
                  promoData.code
                )
                  .trim()
                  .toUpperCase(),
              }
            : {}),
        },
      }),

      invalidatesTags: [
        {
          type: 'PromoCodes',
          id: 'LIST',
        },
      ],
    }),
  }),
});

export const {
  useGetAdminMetricsQuery,
  useGetAdminRegistrationsQuery,
  useUpdateRegistrationStatusMutation,
  useGetAdminEventsQuery,
  useCreateAdminEventMutation,
  useToggleEventBannerMutation,
  useCreatePromoCodeMutation,
  useUpdatePromoCodeMutation,
} = adminApi;