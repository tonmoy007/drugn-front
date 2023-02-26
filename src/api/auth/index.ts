import {createApi, setupListeners} from "@reduxjs/toolkit/query/react";
import {AuthPayload, AuthResponse, ConfirmCodePayload} from "./types";
import {BaseQuery} from "../constants";
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: BaseQuery,
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, Partial<AuthPayload>>({
            query: (arg: AuthPayload) => ({
                url: '/login',
                method: "POST",
                body: arg,
                responseHandler: (res) => res.json()
            }),
            invalidatesTags: ["Auth"],
        }),
        signup: builder.mutation({
            query: (arg: AuthPayload) => ({
                url: '/signup',
                method: "POST",
                body: arg,

            }),
            invalidatesTags: ["Auth"]
        }),
        confirmCode: builder.mutation({
            query: (arg: ConfirmCodePayload) => ({
                url: '/confirm-code',
                method: "POST",
                body: arg,
                responseHandler: res => res.json()
            }),
            invalidatesTags: ["Auth"]
        })
    })
})
export const {useLoginMutation, useSignupMutation, useConfirmCodeMutation} = authApi
export const ApiStore = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware)
})
setupListeners(ApiStore.dispatch)