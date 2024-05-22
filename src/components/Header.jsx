/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AiFillShopping } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { changeMode } from "../features/auth/authSlice";
import "../styles/Header.css";

const Header = () => {
    const { amount } = useSelector((state) => state.cart);
    const { total } = useSelector((state) => state.cart);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const dispatch = useDispatch();
    const { theme } = useSelector((state) => state.auth);
    const loginState = useSelector((state) => state.auth.isLoggedIn);
    const [userData, setUserData] = useState({});

    const fetchUser = async () => {
        if (loginState) {
            try {
                const response = await axios.post(
                    `http://localhost:8000/api/user/get_users/`,
                    {
                        id: localStorage.getItem("user_id"),
                        page: 1,
                        page_size: 1,
                    }
                );

                const userObj = response.data.data.records[0];

                // Check for errors or empty response
                if (!response || !userObj) {
                    console.error("API response error or empty data:", userObj);
                    throw new Error("Failed to fetch user data");
                }
                // Set user data
                setUserData(userObj);

                // If user is seller, get business of user
                if (userObj.is_seller) {
                    const businessResponse = await axios.post(
                        "http://localhost:8000/api/business/get/",
                        {
                            owner_id: userObj.id,
                        }
                    );

                    const businessObj = businessResponse.data.data[0];

                    // Set business data
                    setUserData({ ...userObj, business: businessObj });
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
    };

    const handleTheme = () => {
        dispatch(changeMode());
    };

    useEffect(() => {
        localStorage.setItem("theme", theme);
        setIsLoggedIn(loginState);
        fetchUser();
    }, [loginState]);

    return (
        <>
            <div className="navbar bg-base-100 text-accent-content">
                <div className="navbar-start text-accent-content">
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-2 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <NavLink to="/about-us">About us</NavLink>
                            </li>
                            <li>
                                <NavLink to="/">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/shop">Shop</NavLink>
                            </li>

                            <li>
                                <NavLink to="/contact">Contact</NavLink>
                            </li>
                            {!isLoggedIn && (
                                <>
                                    <li>
                                        <NavLink to="/contact">Contact</NavLink>
                                    </li>
                                    <li>
                                        <details>
                                            <summary>Account</summary>
                                            <ul className="p-2">
                                                <li>
                                                    <NavLink
                                                        className="text-accent-content"
                                                        to="/login"
                                                    >
                                                        Login
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                        className="text-accent-content"
                                                        to="/signup"
                                                    >
                                                        Signup
                                                    </NavLink>
                                                </li>
                                            </ul>
                                        </details>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>

                    <div className="flex-1 ">
                        <NavLink
                            to="/"
                            className="btn btn-ghost normal-case text-2xl font-black text-accent-content "
                        >
                            <AiFillShopping />
                            Shopyy
                        </NavLink>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex text-accent-content">
                    <ul className="menu menu-horizontal px-1 text-xl text-accent-content">
                        <li>
                            <NavLink to="/about-us">About us</NavLink>
                        </li>
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/shop">Shop</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact">Contact</NavLink>
                        </li>
                        {isLoggedIn && userData.is_seller && (
                            <>
                                {!userData.business && (
                                    <li>
                                        <NavLink to="/business/create">
                                            Create Business
                                        </NavLink>
                                    </li>
                                )}
                                {userData.business && (
                                    <li>
                                        <NavLink
                                            to={`/business/${userData.business.id}`}
                                        >
                                            Your Business
                                        </NavLink>
                                    </li>
                                )}
                            </>
                        )}

                        {!isLoggedIn && (
                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="p-2">
                                    Account
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-x1l dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box"
                                >
                                    <li>
                                        <NavLink
                                            className="text-accent-content text-xl"
                                            to="/login"
                                        >
                                            Login
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            className="text-accent-content text-xl"
                                            to="/signup"
                                        >
                                            Signup
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </ul>
                </div>
                <div className="navbar-end hidden lg:flex text-accent-content">
                    <div className="flex-none">
                        {/* THEME */}
                        <label className="swap swap-rotate pr-2">
                            {/* this hidden checkbox controls the state */}
                            <input
                                type="checkbox"
                                onChange={handleTheme}
                                checked={theme === "fantasy" ? false : true}
                            />

                            {/* sun icon */}
                            <svg
                                className="swap-on fill-current w-6 h-6"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                            </svg>

                            {/* moon icon */}
                            <svg
                                className="swap-off fill-current w-6 h-6"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                            </svg>
                        </label>
                        {/* SEARCH */}
                        <NavLink
                            to="/search"
                            className="btn btn-ghost btn-circle text-accent-content"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </NavLink>
                        {/* CART */}
                        <div className="dropdown dropdown-end">
                            <label
                                tabIndex={0}
                                className="btn btn-ghost btn-circle"
                            >
                                <div className="indicator">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                </div>
                            </label>
                            <div
                                tabIndex={0}
                                className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
                            >
                                <div className="card-body">
                                    <span className="font-bold text-md text-accent-content">
                                        {amount} items
                                    </span>
                                    <span className="text-accent-content">
                                        Subtotal:{" "}
                                        {total.toLocaleString("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        })}
                                    </span>
                                    <div className="card-actions">
                                        <NavLink
                                            to="/cart"
                                            className="btn bg-blue-600 btn-block text-white hover:bg-blue-500"
                                        >
                                            View cart
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Avatar */}
                        {isLoggedIn && (
                            <div className="dropdown dropdown-end">
                                <label
                                    tabIndex={0}
                                    className="btn btn-ghost btn-circle avatar"
                                >
                                    <div className="w-7 rounded-full">
                                        <img src={userData.image_url} />
                                    </div>
                                </label>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-48"
                                >
                                    <li>
                                        <NavLink
                                            to="/user-profile"
                                            className="justify-between text-accent-content text-lg"
                                        >
                                            Profile
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/order-history"
                                            className="text-accent-content text-lg"
                                        >
                                            Order history
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/login"
                                            className="text-accent-content text-lg"
                                        >
                                            Logout
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
