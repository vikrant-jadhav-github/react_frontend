import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user : {},
    token : "",
}

const user = createSlice({
    name : "user",
    initialState,
    reducers : {
        setUser : (state, action) => {
            state.user = action.payload
        },
        setToken : (state, action) => {
            state.token = action.payload
        }
    }
})

export default user.reducer

export const { setUser, setToken } = user.actions