import { createSlice } from "@reduxjs/toolkit";

export const shopSlice = createSlice({
  name: "shopSlice",
  initialState: {
    shop:{
    },
  },
  reducers: {
    setShop: (state, action) => {
      state.shop = action.payload;
    },
  },
});
export const {setShop} = shopSlice.actions
export const selectShopSlice = (state) => state.shopSlice.value;
