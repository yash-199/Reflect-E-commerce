import { createSlice } from "@reduxjs/toolkit";

const userSlice =createSlice({
    name:"user",
    initialState:{
        details:null,
    },
    reducers:{
        saveUserDetails:(state,action)=>{
            state.details = action.payload;
        },
        clearUserDetails:(state)=>{
            state.details=null;
        }
    }
})

export const {saveUserDetails,clearUserDetails} = userSlice.actions;
export default userSlice.reducer;