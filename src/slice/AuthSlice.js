import { createSlice } from "@reduxjs/toolkit";

const token=localStorage.getItem('token')
const user = localStorage.getItem('user')|| null;
const authslice=createSlice({
    name:'auth',
    initialState:{
        token:token||null,
        user:user||null,
    },
    reducers:{
        setToken:(state,action)=>{
            state.token=action.payload;
            localStorage.setItem('token',action.payload);
        },
        setUser:(state,action)=>{
            state.user=action.payload;
            localStorage.setItem('user', action.payload);
        },
        logout:(state)=>{
            state.token=null;
            state.user=null;
            localStorage.removeItem('token')
        }
    }
})
export const {setToken,setUser,logout}=authslice.actions;
export default authslice.reducer;