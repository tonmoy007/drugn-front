import {createApi, setupListeners} from "@reduxjs/toolkit/query/react";
import {AccountPayLoad, AccountResponse, BalancePayLoad, BalanceResponse, InitialNFTPayLoad, InitialNFTResponse, UserDataPayLoad, UserDataResponse} from "./types";
import {BaseQuery} from "../constants";
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";

export const accountAPI = createApi({
    reducerPath: 'accountAPI',
    baseQuery: BaseQuery,
    tagTypes: ['Account'],
    endpoints: (builder) => ({
        newAccount: builder.query<AccountResponse, Partial<AccountPayLoad>>({
            query: (arg: AccountPayLoad) => ({
                url: `/account/generate-symbol-account/user=${arg.userId}`,
                method: "GET",
                responseHandler: (res) => res.json()
            })
        }),
        userData: builder.query<UserDataResponse, Partial<UserDataPayLoad>>({
            query: (arg: UserDataPayLoad) => ({
                url: `/account/user=${arg.userId}`,
                method: "GET",
                responseHandler: (res) => res.json()
            }),
            providesTags:['Account']
        }),
        initialNFT: builder.query<InitialNFTResponse, Partial<InitialNFTPayLoad>>({
            query: (arg: InitialNFTPayLoad) => ({
                url: `/account/initial-nft?user=${arg.user}&address=${arg.address}`,
                method: "GET",
                responseHandler: (res) => res.json()
            })
        }),
        balance: builder.query<BalanceResponse, Partial<BalancePayLoad>>({
            query: (arg: BalancePayLoad) => ({
                url: `/account/amount/address=${arg.address}`,
                method: "GET",
                responseHandler: (res) => res.json()
            }),
            providesTags:['Account']
        }),
    })
})
export const {useNewAccountQuery, useUserDataQuery, useInitialNFTQuery, useBalanceQuery} = accountAPI
export const ApiStore = configureStore({
    reducer: {
        [accountAPI.reducerPath]: accountAPI.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(accountAPI.middleware)
})
setupListeners(ApiStore.dispatch)