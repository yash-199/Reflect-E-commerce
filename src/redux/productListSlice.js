import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchProduct = createAsyncThunk("product/fetchProduct",
    async()=>{
        const res = await fetch("https://dummyjson.com/products?limit=194");
        return res.json();
    }
)

const productSlice = createSlice({
    name:"product",
    initialState:{
        products:[],
        loading:false
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchProduct.pending,(state)=>{
            state.loading=true;
        })
        .addCase(fetchProduct.fulfilled,(state,action)=>{
            state.loading=false;
            state.products=action.payload.products
        })
        .addCase(fetchProduct.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message;
        })
    }
})

export default productSlice.reducer;