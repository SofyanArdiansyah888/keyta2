import { configureStore, setupListeners } from "@reduxjs/toolkit";
import {authApi} from '../services/auth.service'
import { authSlice } from "../services/auth.slice";
import {profileApi} from '../services/profile.service'
import {shopApi} from '../services/shop.service'

export const store  = configureStore({
    reducer:{
        [authApi.reducerPath] : authApi.reducer,
        [authSlice.name] : authSlice.reducer,
        [profileApi.reducerPath] : profileApi.reducer,
        [shopApi.reducerPath] : shopApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
    devTools: true
})