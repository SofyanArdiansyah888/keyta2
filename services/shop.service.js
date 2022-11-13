import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenCookie } from "../app/cookies";
const token =  getTokenCookie();
export const shopApi = createApi({
  reducerPath: "shopApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.BASE_URL }),
  endpoints: (builder) => ({
    shopCategory: builder.query({
      query: () => ({
        url: "v1/shop/category",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
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
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    updateShop: builder.mutation({
      query: (body) => ({
        url: "v2/shops",
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
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
