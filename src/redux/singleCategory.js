import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCategoryProducts = createAsyncThunk("category/fetchCategoryProducts",
    async(categoryName)=>{
        const res = await fetch( `https://dummyjson.com/products/category/${categoryName}`);
        const data = await res.json();
        return data.products;
    }
)

const singleCategorySlice = createSlice({
    name:"singleCategory",
    initialState:{
        products:[],
        loading:false,
        error:null,
    },

    reducers:{
        clearCategoryProducts:(state)=>{
            state.products=[]
        }
    },

    extraReducers:(builder)=>{
        builder
        .addCase(fetchCategoryProducts.pending,(state)=>{
            state.loading=true;
        })
        .addCase(fetchCategoryProducts.fulfilled,(state,action)=>{
            state.loading=false;
            state.products=action.payload;
        })
        .addCase(fetchCategoryProducts.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message;
        })
    }
})

export const {clearCategoryProducts} = singleCategorySlice.actions;
export default singleCategorySlice.reducer;                                        