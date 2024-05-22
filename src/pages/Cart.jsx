import { CartItemsList, CartTotals } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
    const navigate = useNavigate();
    const loginState = useSelector((state) => state.auth.isLoggedIn);
    const { cartItems } = useSelector((state) => state.cart);
    const user_id = useSelector((state) => state.auth.userId);
    const [address, setAddress] = useState("");
    const shippingFee = 50000;

    const orderHandle = () => {
        if (cartItems.length === 0) {
            toast.error("Your cart is empty");
        } else {
            // Post order to the server
            try {
                axios.post("http://localhost:8000/api/order/create/", {
                    user_id: user_id,
                    shipping_address: address,
                    shipping_fee: shippingFee,
                    items: cartItems.map((item) => {
                        return {
                            product_id: item.id,
                            quantity: item.amount,
                            price: item.price,
                        };
                    }),
                });
            } catch (err) {
                toast.error("Failed to place order");
            }

            // Show success message
            toast.success("Order placed successfully");

            // Clear cart items
            localStorage.setItem("cartItems", JSON.stringify([]));

            // Redirect to thank you page
            navigate("/thank-you");
        }
    };

    useEffect(() => {
        // Get cart items from localStorage
        const cartItems = JSON.parse(localStorage.getItem("cartItems"));

        // If cart items exist in localStorage, set them in the redux store
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <>
            <div className="h-screen text-accent-content pt-20">
                <div className="mx-auto max-w-7xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                    {/* CART ITEMS LIST */}
                    <CartItemsList />

                    <div className="mt-6 h-full rounded-lg bg-base-200 text-accent-content p-6 shadow-md md:mt-0 md:w-1/3">
                        {/* SHIPPING ADDRESS */}
                        <div className="text-lg mb-2 flex justify-between ">
                            <p>Shipping Address</p>
                        </div>

                        {/* INPUT ADDRESS */}
                        <input
                            value={address}
                            type="text"
                            placeholder="Address"
                            className="input mb-2 w-full"
                            onChange={(e) => setAddress(e.target.value)}
                        />

                        {/* SHIPPING FEE */}
                        <div className="text-lg mb-2 flex justify-between ">
                            <p>Shipping Fee</p>
                            {shippingFee.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            })}
                        </div>

                        {/* CART TOTAL */}
                        <CartTotals shippingFee={shippingFee} />
                        {loginState ? (
                            <button
                                onClick={orderHandle}
                                className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
                            >
                                Order now
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                className="btn bg-blue-600 hover:bg-blue-500 btn-block text-white mt-8"
                            >
                                Please login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
