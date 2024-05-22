import React from "react";
import { useSelector } from "react-redux";

const CartTotals = ({ shippingFee }) => {
    const { total } = useSelector((state) => state.cart);
    return (
        <>
            <div className="text-lg mb-2 flex justify-between ">
                <p>Subtotal</p>
                <p>
                    {total.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    })}
                </p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
                <p className="text-xl font-bold">Total</p>
                <div>
                    <p className="mb-1 text-xl font-bold">
                        {" "}
                        {(total + shippingFee).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        })}
                    </p>
                </div>
            </div>
        </>
    );
};

export default CartTotals;
