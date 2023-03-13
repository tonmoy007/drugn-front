import {AnyUser, User} from "../../types/user";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {persistReducer} from "redux-persist";

const initialState: User = {
    loggedIn: false
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setNewUser: (state, action: PayloadAction<User>) => {
            return {...state, ...action.payload, loggedIn: true}
        },
        updateUser: (state, action: PayloadAction<AnyUser>) => {
            return {...state, ...action.payload, loggedIn: true}
        },
        logout: (state) => {
            return initialState
        }
    }
})
export const {setNewUser, updateUser, logout} = userSlice.actions
const UserReducer = userSlice.reducer
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    version:1
}

export const UserPersistedReducer = persistReducer(persistConfig, UserReducer)