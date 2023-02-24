import {AnyUser, User} from "../../types/user";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {persistReducer, persistStore} from "redux-persist";

const initialState: User = {
    loggedIn: false
}
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setNewUser: (state, action: PayloadAction<User>) => {
            state = {...state, ...action.payload, loggedIn: true}
        },
        updateUser: (state, action: PayloadAction<AnyUser>) => {
            state = {...state, ...action.payload}
        }
    }
})
export const {setNewUser, updateUser} = userSlice.actions
const UserReducer = userSlice.reducer
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}
export const UserPersistedReducer = persistReducer(persistConfig, UserReducer)