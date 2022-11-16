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
        },
        body,
      }),
    }),
  }),
});

export const {
  useCreateShopMutation,
  useUpdateShopMutation,
  useShopCategoryQuery,
  useShopQuery,
} = shopApi;
