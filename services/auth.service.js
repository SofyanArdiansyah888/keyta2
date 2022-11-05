import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.BASE_URL }),
  endpoints: (builder) => ({
    sendWhatsapp: builder.mutation({
      query: (body) => ({
        url: "v2/sign_with_wa_number",
        method: "POST",
        body,
      }),
    }),
    sendSms: builder.mutation({
      query: (body) => ({
        url: "v2/sign_with_phone_number",
        method: "POST",
        body,
      }),
    }),
    verifySms: builder.mutation({
      query: (body) => ({
        url: "v2/request_otps/verify",
        method: "POST",
        body,
      }),
    }),
    verifyWhatsapp: builder.mutation({
      query: (body) => ({
        url: "v2/request_otps/verify_wa",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useSendWhatsappMutation,
  useSendSmsMutation,
  useVerifySmsMutation,
  useVerifyWhatsappMutation,
} = authApi;
