import {createApi, setupListeners} from "@reduxjs/toolkit/query/react";
import {AccountPayLoad, AccountResponse, BalancePayLoad, BalanceResponse, InitialNFTPayLoad, InitialNFTResponse} from "./types";
import {BaseQuery} from "../constants";
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";

export const accountAPI = createApi({
    reducerPath: 'accountAPI',
    baseQuery: BaseQuery,
    tagTypes: ['Account'],
    endpoints: (builder) => ({
        newAccount: builder.mutation<AccountResponse, Partial<AccountPayLoad>>({
            query: (arg: AccountPayLoad) => ({
                url: `/account/generate-symbol-account/user=${+arg.userId}`,
                method: "GET",
                responseHandler: (res) => res.json()
            }),
            invalidatesTags: ["Account"],
        }),
        initialNFT: builder.mutation<InitialNFTResponse, Partial<InitialNFTPayLoad>>({
            query: (arg: InitialNFTPayLoad) => ({
                url: `/account/initial-nft?user=${arg.user}&address=${arg.address}`,
                method: "GET",
                responseHandler: (res) => res.json()
            }),
            invalidatesTags: ["Account"],
        }),
        balance: builder.mutation<BalanceResponse, Partial<BalancePayLoad>>({
            query: (arg: BalancePayLoad) => ({
                url: `/account/amount/address=${arg.address}`,
                method: "GET",
                responseHandler: (res) => res.json()
            }),
            invalidatesTags: ["Account"],
        }),
    })
})
export const {useNewAccountMutation, useInitialNFTMutation, useBalanceMutation} = accountAPI
export const ApiStore = configureStore({
    reducer: {
        [accountAPI.reducerPath]: accountAPI.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(accountAPI.middleware)
})
setupListeners(ApiStore.dispatch)