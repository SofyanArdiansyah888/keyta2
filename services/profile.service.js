import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenCookie } from "../app/cookies";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.BASE_URL }),
  endpoints: (builder) => ({
    profile: builder.query({
      query: () => ({
        url: "v1/my_profile",
        method: "GET",
        headers: {
          Authorization: `Bearer ${getTokenCookie()}`,
        },
      }),
    }),

    updateProfile: builder.mutation({
      query: (body) => ({
        url: "v1/my_profile",
        method: "PUT",
        headers: {
          "Access-Control-Allow-Origin":"*",
          Authorization: `Bearer ${getTokenCookie()}`,
        },
        mode:"no-cors",
        body,
      }),
    }),
  }),
});

export const { useProfileQuery, useUpdateProfileMutation } = profileApi;
