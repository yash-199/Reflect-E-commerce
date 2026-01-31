import { createSlice } from "@reduxjs/toolkit";

const storedUsers = JSON.parse(localStorage.getItem("RegisterUser")) || [];
const storedCurrentUser = JSON.parse(localStorage.getItem("loginUser"));

const authSlice = createSlice({
    name:"auth",
    initialState:{
       users:storedUsers,
       user:storedCurrentUser||null,
       isAuthenticated:!!storedCurrentUser
    },
    reducers:{
        register:(state,action)=>{
           state.users.push(action.payload);
           localStorage.setItem("RegisterUser",JSON.stringify(state.users)) //for register
           state.user=action.payload;
           state.isAuthenticated=true;
           localStorage.setItem("loginUser",JSON.stringify(action.payload)) //for login
        },
        login:(state,action)=>{
            const user = state.users.find((u)=>u.email===action.payload.email && u.password===action.payload.password);
            if(user){
                state.user=user
                state.isAuthenticated=true;
                localStorage.setItem("loginUser",JSON.stringify(user));
            }else{
                alert("Invalid credentials")
            }
        },
        logout:(state)=>{
           state.user=null;
           state.isAuthenticated=false;
           localStorage.removeItem("loginUser")
        }
    }
})

export const {register,login,logout} = authSlice.actions;
export default authSlice.reducer;