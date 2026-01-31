import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchRelatedProducts = createAsyncThunk(
  "related/fetchRelatedProducts",
  async (category) => {
    const res = await fetch(
      `https://dummyjson.com/products/category/${category}`
    );
    const data = await res.json();
    return data.products;
  }
);

const relatedSlice = createSlice({
  name: "related",
  initialState: {
    items: [],
    loading: false,
  },

  // ✅ FIX HERE
  reducers: {
    clearRelated: (state) => {
      state.items = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchRelatedProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRelatedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      });
  },
});

export const { clearRelated } = relatedSlice.actions;
export default relatedSlice.reducer;
