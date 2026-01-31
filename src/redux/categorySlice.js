import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchCategories = createAsyncThunk("category/fetchCategories",
    async()=>{
        const res=await fetch("https://dummyjson.com/products/category-list");
        return res.json();
    }
)

const categorySlice = createSlice({
    name:"category",
    initialState:{
        categories:[],
        selectedCategory:[],
        loading:false,
        error:null,
    },

    reducers:{
        toggleCategory:(state,action)=>{
            const category=action.payload;
            if(state.selectedCategory.includes(category)){
                state.selectedCategory=state.selectedCategory.filter((c)=>c!==category);
            }else{
                state.selectedCategory.push(category);
            }
        },
        clearSelectedCategory:(state)=>{
            state.selectedCategory=[]
        }

    },

    extraReducers:(builder)=>{
        builder
        .addCase(fetchCategories.pending,(state)=>{
            state.loading=true;
        })
        .addCase(fetchCategories.fulfilled,(state,action)=>{
            state.loading=false;
            state.categories=action.payload;
        })
        .addCase(fetchCategories.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message;
        })
    }
})

export const { toggleCategory, clearSelectedCategory } =
  categorySlice.actions;
export default categorySlice.reducer;