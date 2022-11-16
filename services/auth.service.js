import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.BASE_URL }),
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: ({ type, ...body }) => {
        const url = type === 'sms' ? "v2/sign_with_phone_number" : "v2/sign_with_wa_number"
        return {
          url,
          method: "POST",
          body,
        };
      },
    }),

    verifyMessage: builder.mutation({
      query: ({ type, ...body }) => {
        const url = type === 'sms' ? "v2/request_otps/verify" : "v2/request_otps/verify_wa"
        return {
          url,
          method: "POST",
          body,
        };
      },
    }),

    
  }),
});

export const {
  useSendMessageMutation,
  useVerifyMessageMutation,
} = authApi;
