import {createSlice} from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: "user",
    initialState: {
        data: null
    },
    reducers: {
        login: (state, action)=>{
            state.data = action.payload
        },
        logout: (state)=>{
            state.data = null
        }
    }
})

export const {login, logout} = userSlice.actions;

export const selectUser = (state) => state.user.data;

export default userSlice.reducer;