import {AnyUser, User} from "../../types/user";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: User  = {
    loggedIn:false
}
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setNewUser: (state, action: PayloadAction<User>) => {
            if (state) {
                state = action.payload
            }
        },
        updateUser: (state, action: PayloadAction<AnyUser>) => {
            state = {...state, ...action.payload}
        }
    }
})
export const {setNewUser, updateUser} = userSlice.actions
export const UserReducer = userSlice.reducer