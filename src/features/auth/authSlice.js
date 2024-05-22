import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    userId: localStorage.getItem("user_id") || false,
    isLoggedIn: localStorage.getItem("user_id") ? true : false,
    theme: localStorage.getItem("theme")
        ? localStorage.getItem("theme")
        : "night",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginUser: (state) => {
            state.isLoggedIn = true;
            state.userId = localStorage.getItem("user_id");
            toast.success("You have successfuly login");
        },
        logoutUser: (state) => {
            state.isLoggedIn = false;
            state.userId = false;
            toast.success("You have successfuly logout");
        },
        changeMode: (state) => {
            if (state.theme === "fantasy") {
                state.theme = "dark";
                localStorage.setItem("theme", "dark");
            } else {
                state.theme = "fantasy";
                localStorage.setItem("theme", "fantasy");
            }
            document
                .querySelector("html")
                .setAttribute("data-theme", state.theme);
            // document.documentElement.classList.add(state.theme);
        },
    },
});

export const { loginUser, logoutUser, changeMode } = authSlice.actions;

export default authSlice.reducer;
