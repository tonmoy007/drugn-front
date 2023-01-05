import {configureStore} from "@reduxjs/toolkit";
import {UserReducer} from "./user";

export const globalStore = configureStore({
    reducer: {
        user: UserReducer
    }
})
export type GlobalState = ReturnType<typeof globalStore.getState>
export type GlobalDispatch = typeof globalStore.dispatch