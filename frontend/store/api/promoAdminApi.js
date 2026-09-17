import { baseApi } from './baseApi';

export const promoAdminApi =
  baseApi.injectEndpoints({
    overrideExisting: true,

    endpoints: (builder) => ({
      // ======================================
      // GET ALL PROMO CODES
      // ======================================

      getAdminPromoCodes: builder.query({
        query: () => ({
          url: '/admin/promo-codes',
          method: 'GET',
        }),

        transformResponse: (response) => {
          if (
            Array.isArray(
              response?.data?.promoCodes
            )
          ) {
            return response.data.promoCodes;
          }

          if (Array.isArray(response?.data)) {
            return response.data;
          }

          return [];
        },

        providesTags: (result) => [
          {
            type: 'PromoCodes',
            id: 'LIST',
          },

          ...(result || []).map(
            (promo) => ({
              type: 'PromoCodes',
              id: promo._id,
            })
          ),
        ],
      }),

      // ======================================
      // CREATE PROMO CODE
      // ======================================

      createAdminPromoCode:
        builder.mutation({
          query: (promoData) => ({
            url: '/admin/promo-codes',
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json',
            },

            body: {
              code: String(
                promoData.code || ''
              )
                .trim()
                .toUpperCase(),

              partnerName: String(
                promoData.partnerName || ''
              ).trim(),

              partnerType:
                promoData.partnerType,

              discountPercent: Number(
                promoData.discountPercent
              ),

              maxUsage:
                promoData.maxUsage ===
                  null ||
                promoData.maxUsage === ''
                  ? null
                  : Number(
                      promoData.maxUsage
                    ),

              isActive: true,

              eventId:
                promoData.eventId || null,
            },
          }),

          transformResponse: (response) =>
            response?.data?.promoCode ||
            response?.data,

          invalidatesTags: [
            {
              type: 'PromoCodes',
              id: 'LIST',
            },
          ],
        }),

      // ======================================
      // ENABLE / DISABLE PROMO CODE
      // ======================================

      toggleAdminPromoCode:
        builder.mutation({
          query: ({
            id,
            isActive,
          }) => ({
            url: `/admin/promo-codes/${id}`,
            method: 'PATCH',

            headers: {
              'Content-Type':
                'application/json',
            },

            body: {
              isActive,
            },
          }),

          transformResponse: (response) =>
            response?.data?.promoCode ||
            response?.data,

          invalidatesTags: (
            result,
            error,
            args
          ) => [
            {
              type: 'PromoCodes',
              id: 'LIST',
            },
            {
              type: 'PromoCodes',
              id: args.id,
            },
          ],
        }),

      // ======================================
      // DELETE PROMO CODE
      // ======================================

      deleteAdminPromoCode:
        builder.mutation({
          query: (id) => ({
            url: `/admin/promo-codes/${id}`,
            method: 'DELETE',
          }),

          invalidatesTags: (
            result,
            error,
            id
          ) => [
            {
              type: 'PromoCodes',
              id: 'LIST',
            },
            {
              type: 'PromoCodes',
              id,
            },
          ],
        }),
    }),
  });

export const {
  useGetAdminPromoCodesQuery,
  useCreateAdminPromoCodeMutation,
  useToggleAdminPromoCodeMutation,
  useDeleteAdminPromoCodeMutation,
} = promoAdminApi;