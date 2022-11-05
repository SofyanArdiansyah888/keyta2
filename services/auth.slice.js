import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    authenticate:{},
  },
  reducers: {
    setAuthenticate: (state, action) => {
      state.authenticate = action.payload;
    },
    // setDataAuth: (state, action) => {
    //     console.log(action.payload)
    //   state.authenticate = action.payload;
    // },
  },
});
export const {setAuthenticate} = authSlice.actions
export const selectAuthSlice = (state) => state.authSlice.value;
