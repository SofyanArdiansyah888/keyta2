import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    user:{
        app_version:'',
        authy_id:'',
        authy_id_sms:'',
        beta_user:'',
        cotter_client_id:'',
        country_code:'',
        created_at:'',
        device_token:'',
        email:'',
        id:'',
        is_block:'',
        is_hardcoded:'',
        name:'',
        otp:'',
        otp_expired:'',
        phone:'',
        phone_with_code:'',
        shop_id:'',
        shop:{

        }
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});
export const {setUser} = userSlice.actions
export const selectUserSlice = (state) => state.userSlice.value;
