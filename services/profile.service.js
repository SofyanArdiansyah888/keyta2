import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenCookie } from "../app/cookies";
const token = getTokenCookie();
export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.BASE_URL }),
  endpoints: (builder) => ({
    profile: builder.query({
      query: () => ({
        url: "v1/my_profile",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    updateProfile: builder.mutation({
      query: (body) => ({
        url: "v1/my_profile",
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body,
      }),
    }),
  }),
});

export const { useProfileQuery, useUpdateProfileMutation } = profileApi;
