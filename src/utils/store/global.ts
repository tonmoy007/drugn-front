import {configureStore} from "@reduxjs/toolkit";
import {UserPersistedReducer} from "./user";
import {persistStore} from "redux-persist";
import logger from "redux-logger";
import {authApi} from "../../api/auth";
import { okusuriAPI } from "../../api/okusuri";
import { accountAPI } from "../../api/account";

export const globalStore = configureStore({
    reducer: {
        user: UserPersistedReducer,
        [authApi.reducerPath]: authApi.reducer,
        [okusuriAPI.reducerPath]: okusuriAPI.reducer,
        [accountAPI.reducerPath]: accountAPI.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat([authApi.middleware,okusuriAPI.middleware,logger,accountAPI.middleware,logger])
})
export const globalPersistedStore = persistStore(globalStore)
export type GlobalState = ReturnType<typeof globalStore.getState>
export type GlobalDispatch = typeof globalStore.dispatch