import { createSlice } from "@reduxjs/toolkit";


const cartFromStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: cartFromStorage,
    },

    reducers: {
        // add to Bag
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.cartItems.find((i) => i.id === item.id);
            if (existingItem) {
                existingItem.quantity += 1;
                existingItem.totalPrice = existingItem.quantity * existingItem.price;
            } else {
                state.cartItems.push({
                    ...item,
                    quantity: 1,
                    totalPrice: item.price,
                })
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },

        incrementQty: (state, action) => {
            const item = state.cartItems.find((i) => i.id === action.payload);
            if (item) {
                item.quantity += 1;
                item.totalPrice = item.quantity * item.price;
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },

        decrementQty: (state, action) => {
            const item = state.cartItems.find((i) => i.id === action.payload)

            if (item && item.quantity > 1) {
                item.quantity -= 1;
                item.totalPrice = item.quantity * item.price;
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },

        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        clearCart: (state) => {
            state.cartItems = [];
        },
    }
})

export const { addToCart, incrementQty, decrementQty, removeFromCart,clearCart } = cartSlice.actions;
export default cartSlice.reducer;