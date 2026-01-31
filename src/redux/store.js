import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import categoryReducer from "./categorySlice"
import productReducer from "./productListSlice"
import singleCategoryReducer from "./singleCategory"
import cartReducer from "./cartSlice"
import wishlistReducer from "./wishlistSlice"
import searchReducer from "./searchSlice"
import relatedReducer from "./relatedProductSlice"
import userReducer from "./userSlice"
export const store=configureStore({
    reducer:{
        auth:authReducer,
        category:categoryReducer,
        product:productReducer,
        singleCategory:singleCategoryReducer,
        cart:cartReducer,
        wishlist:wishlistReducer,
        search:searchReducer,
        related:relatedReducer,
        user:userReducer,
    }
})