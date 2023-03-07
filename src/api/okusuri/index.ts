import {createApi, setupListeners} from "@reduxjs/toolkit/query/react";
import {DeletePayLoad, DeleteResponse, EditPayLoad, EditResponse, FetchPayLoad, FetchResponse, GS1CodePayLoad, GS1CodeResponse, RegisterPayLoad, RegisterResponse, RewardPayLoad, RewardResponse,} from "./types";
import {BaseQuery} from "../constants";
import {configureStore} from "@reduxjs/toolkit";

export const okusuriAPI = createApi({
    reducerPath: 'okusuriAPI',
    baseQuery: BaseQuery,
    tagTypes: ['okusuri'],
    endpoints: (builder) => ({
        gs1code: builder.query<GS1CodeResponse, Partial<GS1CodePayLoad>>({
            query: (arg: GS1CodePayLoad) => ({
                url: `/okusuri/gs1code=${arg.gs1code}`,
                responseHandler: (res) => res.json()
        })
    }),
        registerMeds: builder.mutation<RegisterResponse, Partial<RegisterPayLoad>>({
            query: (arg: RegisterPayLoad) => ({
                url: `/okusuri/register`,
                method: "POST",
                body: {...arg},
                responseHandler: (res) => res.json()
            }),
            invalidatesTags: ["okusuri"],
        }),
        editMed: builder.mutation<EditResponse, Partial<EditPayLoad>>({
            query: (arg: EditPayLoad) => ({
                url: `/okusuri/edit`,
                method: "POST",
                body: {...arg},
                responseHandler: (res) => res.json()
            }),
            invalidatesTags: ["okusuri"],
        }),
        rewardUser: builder.mutation<RewardResponse, Partial<RewardPayLoad>>({
            query: (arg: RewardPayLoad) => ({
                url: `/okusuri/reward`,
                method: "POST",
                body: arg,
                responseHandler: (res) => res.json()
            }),
        }),
        deleteMed: builder.mutation<DeleteResponse, Partial<DeletePayLoad>>({
            query: (arg: DeletePayLoad) => ({
                url: `/okusuri/delete`,
                method: "POST",
                body: arg,
                responseHandler: (res) => res.json()
            }),
            invalidatesTags: ["okusuri"],
        }),
        fetchMeds: builder.query<FetchResponse, FetchPayLoad>({
            query: (arg: FetchPayLoad) => ({
                url: `/okusuri/fetch=${arg.userId}`,
                responseHandler: (res) => res.json()
            }),
            providesTags:['okusuri']
        }),
    })
})
export const {useGs1codeQuery, useRegisterMedsMutation, useEditMedMutation, useRewardUserMutation, useDeleteMedMutation, useFetchMedsQuery} = okusuriAPI
export const ApiStore = configureStore({
    reducer: {
        [okusuriAPI.reducerPath]: okusuriAPI.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(okusuriAPI.middleware)
})
setupListeners(ApiStore.dispatch)