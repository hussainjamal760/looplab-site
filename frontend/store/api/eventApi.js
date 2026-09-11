import { baseApi } from '@/store/api/baseApi';


/* =====================================================
   EVENTS API
===================================================== */

export const eventApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        /*
         * Homepage ke liye current active event
         */
        getActiveEvent: builder.query({
            query: () => '/events/active',

            providesTags: ['Events'],

            transformResponse: (response) =>
                response?.data?.event || null,
        }),

        /*
         * Registration page ke liye event details
         * Example slug: loopverse-3
         */
        getEventBySlug: builder.query({
            query: (slug) =>
                `/events/${encodeURIComponent(slug)}`,

            providesTags: (result, error, slug) => [
                {
                    type: 'Events',
                    id: slug,
                },
            ],

            transformResponse: (response) =>
                response?.data?.event || null,
        }),
    }),

    overrideExisting: false,
});


/* =====================================================
   GENERATED REACT HOOKS
===================================================== */

export const {
    useGetActiveEventQuery,
    useGetEventBySlugQuery,
} = eventApi;