import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenCookie } from "../app/cookies";

export const shopApi = createApi({
  reducerPath: "shopApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.BASE_URL }),
  endpoints: (builder) => ({
    shopCategory: builder.query({
      query: () => ({
        url: "v1/shop/category",
        method: "GET",
        headers: {
          Authorization: `Bearer ${getTokenCookie()}`,
        },
      }),
    }),

    checkReferal: builder.mutation({
      query: ({referrer}) => ({
        url: `v2/referral/${referrer}`,
        method: "GET",
        headers: {
          "Content-Type": 'application/json',
          Authorization: `Bearer ${getTokenCookie()}`,
        },
      }),
    }),

    createShop: builder.mutation({
      query: ({token, ...body}) => ({
        url: "v2/shops",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body,
      }),
    }),

    shop: builder.query({
      query: () => ({
        url: "v1/my_shop",
        method: "GET",
        headers: {
          Authorization: `Bearer ${getTokenCookie()}`,
        },
      }),
    }),

    updateShop: builder.mutation({
      query: (body) => ({
        url: "v1/my_shop",
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getTokenCookie()}`,
          "Content-Type": 'application/json',
        },
        body,
      }),
    }),
  }),
});

export const {
  useCheckReferalMutation,
  useCreateShopMutation,
  useUpdateShopMutation,
  useShopCategoryQuery,
  useShopQuery,
} = shopApi;
