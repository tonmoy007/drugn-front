import {configureStore} from "@reduxjs/toolkit";
import {UserPersistedReducer} from "./user";
import {persistStore} from "redux-persist";
import logger from "redux-logger";

export const globalStore = configureStore({
    reducer: {
        user: UserPersistedReducer
    },
    middleware: [logger]
})
export const globalPersistedStore = persistStore(globalStore)
export type GlobalState = ReturnType<typeof globalStore.getState>
export type GlobalDispatch = typeof globalStore.dispatch