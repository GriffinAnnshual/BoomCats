import { createSlice } from "@reduxjs/toolkit";


const playerSlice = createSlice({
    name: "player",
    initialState: {
        username: "",
        score: "",
    },
    reducers: {
        setUserName(state, action){
            const username = action.payload
            state.username = username
        },

        setScore(state, action){
            const score = action.payload
            state.score = score
        }
    }
})

const playerReducer = playerSlice.reducer

export const playerAction = playerSlice.actions

export default playerReducer