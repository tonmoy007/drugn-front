import {createApi, setupListeners} from "@reduxjs/toolkit/query/react";
import {DeletePayLoad, DeleteResponse, EditPayLoad, EditResponse, FetchPayLoad, FetchResponse, GS1CodePayLoad, GS1CodeResponse, RegisterPayLoad, RegisterResponse,} from "./types";
import {BaseQuery} from "../constants";
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";

export const okusuriAPI = createApi({
    reducerPath: 'okusuriAPI',
    baseQuery: BaseQuery,
    tagTypes: ['okusuri'],
    endpoints: (builder) => ({
        gs1code: builder.mutation<GS1CodeResponse, Partial<GS1CodePayLoad>>({
            query: (arg: GS1CodePayLoad) => ({
                url: `/okusuri/gs1code=${arg.gs1code}`,
                method: "GET",
                responseHandler: (res) => res.json()
            }),
            invalidatesTags: ["okusuri"],
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
        deleteMed: builder.mutation<DeleteResponse, Partial<DeletePayLoad>>({
            query: (arg: DeletePayLoad) => ({
                url: `/okusuri/delete`,
                method: "POST",
                body: arg,
                responseHandler: (res) => res.json()
            }),
            invalidatesTags: ["okusuri"],
        }),
        fetchMeds: builder.mutation<FetchResponse, Partial<FetchPayLoad>>({
            query: (arg: FetchPayLoad) => ({
                url: `/okusuri/fetch=${arg.userId}`,
                method: "GET",
                responseHandler: (res) => res.json()
            }),
            invalidatesTags: ["okusuri"],
        }),
    })
})
export const {useGs1codeMutation, useRegisterMedsMutation, useEditMedMutation, useDeleteMedMutation, useFetchMedsMutation} = okusuriAPI
export const ApiStore = configureStore({
    reducer: {
        [okusuriAPI.reducerPath]: okusuriAPI.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(okusuriAPI.middleware)
})
setupListeners(ApiStore.dispatch)