import { baseApi } from '@/store/api/baseApi';


export const registrationApi =
    baseApi.injectEndpoints({
        endpoints: (builder) => ({
            /*
             * Promo code validation
             */
            validatePromoCode:
                builder.mutation({
                    query: ({
                        code,
                        eventId,
                    }) => ({
                        url: '/promo/validate',
                        method: 'POST',

                        body: {
                            code: code
                                .trim()
                                .toUpperCase(),

                            eventId,
                        },
                    }),

                    transformResponse:
                        (response) =>
                            response?.data || {
                                discountPercent: 0,
                            },
                }),

            /*
             * Upload payment receipt
             *
             * File is sent to backend.
             * Backend uploads it to Cloudinary.
             */
            uploadReceipt:
                builder.mutation({
                    query: (file) => {
                        const formData =
                            new FormData();

                        formData.append(
                            'receipt',
                            file
                        );

                        return {
                            url: '/upload/receipt',
                            method: 'POST',
                            body: formData,
                        };
                    },

                    transformResponse:
                        (response) =>
                            response?.data || null,
                }),

            /*
             * Submit event registration
             */
            submitRegistration:
                builder.mutation({
                    query: ({
                        eventId,
                        participantData,
                        appliedPromoCode,
                        paymentScreenshotUrl,
                    }) => ({
                        url: '/registrations',
                        method: 'POST',

                        body: {
                            eventId,

                            participantData,

                            appliedPromoCode:
                                appliedPromoCode
                                    ?.trim()
                                    .toUpperCase() ||
                                '',

                            paymentScreenshotUrl:
                                paymentScreenshotUrl ||
                                '',
                        },
                    }),

                    transformResponse:
                        (response) =>
                            response?.data
                                ?.registration ||
                            null,

                    invalidatesTags: [
                        {
                            type:
                                'Registrations',
                            id: 'LIST',
                        },
                        {
                            type: 'Admin',
                            id: 'METRICS',
                        },
                    ],
                }),
        }),

        overrideExisting: false,
    });


export const {
    useValidatePromoCodeMutation,
    useUploadReceiptMutation,
    useSubmitRegistrationMutation,
} = registrationApi;