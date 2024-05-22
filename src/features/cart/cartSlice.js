import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cartItems:
        localStorage.getItem("cartItems") &&
        localStorage.getItem("cartItems") !== null
            ? JSON.parse(localStorage.getItem("cartItems"))
            : (() => {
                  localStorage.setItem("cartItems", "[]");
                  return [];
              })(),
    amount: localStorage.getItem("amount")
        ? JSON.parse(localStorage.getItem("amount"))
        : 0,
    total: localStorage.getItem("total")
        ? JSON.parse(localStorage.getItem("total"))
        : 0,
    isLoading: true,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
            // Save the cart items to localStorage
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        removeItem: (state, action) => {
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter(
                (item) => item.id !== itemId
            );
            cartSlice.caseReducers.calculateTotals(state);
            toast.error("Product removed from the cart!", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            // Save the cart items to localStorage
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        updateCartAmount: (state, action) => {
            const cartItem = state.cartItems.find(
                (item) => item.id === action.payload.id
            );
            cartItem.amount = Number(action.payload.amount);
            cartSlice.caseReducers.calculateTotals(state);
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.amount * item.price;
            });
            state.amount = amount;
            state.total = total;
            localStorage.setItem("amount", JSON.stringify(state.amount));
            localStorage.setItem("total", JSON.stringify(state.total));
        },
        addToCart: (state, action) => {
            const cartItem = state.cartItems.find(
                (item) => item.id === action.payload.id
            );
            if (!cartItem) {
                state.cartItems.push(action.payload);
            } else {
                cartItem.amount += action.payload.amount;
            }
            cartSlice.caseReducers.calculateTotals(state);
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

            toast.success("Product added to the cart!", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        },
    },
});

// console.log(cartSlice);
export const {
    clearCart,
    removeItem,
    updateCartAmount,
    decrease,
    calculateTotals,
    addToCart,
} = cartSlice.actions;

export default cartSlice.reducer;
