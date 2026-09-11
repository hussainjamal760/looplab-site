import { baseApi } from './baseApi';

export const certificateApi =
  baseApi.injectEndpoints({
    overrideExisting: true,

    endpoints: (builder) => ({
      verifyCertificate:
        builder.query({
          query: (certificateId) => ({
            url: `/registrations/certificate/${encodeURIComponent(
              certificateId
            )}`,

            method: 'GET',
          }),

          transformResponse: (
            response
          ) =>
            response?.data
              ?.certificate || null,
        }),
    }),
  });

export const {
  useLazyVerifyCertificateQuery,
} = certificateApi;