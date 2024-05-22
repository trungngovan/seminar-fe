import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { nanoid } from "nanoid";

const OrderHistory = () => {
    const loginState = useSelector((state) => state.auth.isLoggedIn);
    const user_id = useSelector((state) => state.auth.userId);
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    const getOrderHistory = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8000/api/order/get/",
                {
                    user_id: user_id,
                }
            );
            let data = response.data.data;

            for (let i = 0; i < data.length; i++) {
                const item = await axios.post(
                    "http://localhost:8000/api/item/get/",
                    {
                        order_id: data[i].id,
                    }
                );
                // Sort the items in the cart by the time they were added
                item.data.data.sort((a, b) => {
                    return new Date(a.created_at) - new Date(b.created_at);
                });

                data[i].cartItems = item.data.data;
            }

            setOrders([...response.data.data]);
        } catch (error) {
            toast.error(error.response);
        }
    };

    useEffect(() => {
        if (!loginState) {
            toast.error("You must be logged in to access this page");
            navigate("/");
        } else {
            getOrderHistory();
        }
    }, [loginState]);

    return (
        <>
            <div className="text-accent-content p-5 text-center">
                <h1 className="text-4xl">Order History</h1>
            </div>
            <div className="order-history-main max-w-7xl mx-auto mt-10 px-20 max-md:px-10">
                {orders?.length === 0 ? (
                    <div className="text-center">
                        <h1 className="text-4xl text-accent-content">
                            There are no orders in the order history
                        </h1>
                        <Link
                            to="/shop"
                            className="btn bg-blue-600 hover:bg-blue-500 text-white mt-10"
                        >
                            Make your first order
                        </Link>
                    </div>
                ) : (
                    orders.map((order, index) => {
                        return (
                            <div
                                key={order.id}
                                className="collapse collapse-plus bg-base-200 mb-2"
                            >
                                <input type="radio" name="my-accordion-3" />
                                <div className="collapse-title text-xl font-medium text-accent-content">
                                    {new Date(order.created_at).toLocaleString(
                                        "vi-VN"
                                    )}{" "}
                                    - Status: {order.status}
                                </div>
                                <div className="collapse-content w-full">
                                    <div className="overflow-x-auto">
                                        <table className="table max-sm:table-xs table-pin-rows table-pin-cols table-auto">
                                            {/* head */}
                                            <thead>
                                                <tr className="text-accent-content text-lg text-center">
                                                    <th>Order</th>
                                                    <th>Image</th>
                                                    <th>Name</th>
                                                    <th>Amount</th>
                                                    <th>Price</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-lg">
                                                {order.cartItems.map(
                                                    (item, counter) => (
                                                        <tr
                                                            className="text-accent-content text-center"
                                                            key={nanoid()}
                                                        >
                                                            <th>
                                                                {counter + 1}
                                                            </th>
                                                            <th>
                                                                <img
                                                                    src={
                                                                        item
                                                                            .product
                                                                            .image_url
                                                                    }
                                                                    alt=""
                                                                    className="w-40 mx-auto"
                                                                />
                                                            </th>
                                                            <td>
                                                                {
                                                                    item.product
                                                                        .name
                                                                }
                                                            </td>
                                                            <td>
                                                                {item.quantity}
                                                            </td>
                                                            <td>
                                                                {(
                                                                    item.price *
                                                                    item.quantity
                                                                ).toLocaleString(
                                                                    "vi-VN",
                                                                    {
                                                                        style: "currency",
                                                                        currency:
                                                                            "VND",
                                                                    }
                                                                )}
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                                <tr>
                                                    <td
                                                        colSpan="3"
                                                        className="text-center"
                                                    >
                                                        <h4 className="text-lg text-accent-content">
                                                            Subtotal:{" "}
                                                            {order.total_price.toLocaleString(
                                                                "vi-VN",
                                                                {
                                                                    style: "currency",
                                                                    currency:
                                                                        "VND",
                                                                }
                                                            )}
                                                        </h4>
                                                    </td>
                                                    <td
                                                        colSpan="3"
                                                        className="text-center"
                                                    >
                                                        <h3 className="text-lg text-accent-content">
                                                            Shipping Fee:{" "}
                                                            {order.shipping_fee.toLocaleString(
                                                                "vi-VN",
                                                                {
                                                                    style: "currency",
                                                                    currency:
                                                                        "VND",
                                                                }
                                                            )}
                                                        </h3>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td
                                                        colSpan="9"
                                                        className="text-center"
                                                    >
                                                        <h3 className="text-xl text-accent-content font-bold">
                                                            Order Total:{" "}
                                                            {(
                                                                order.total_price +
                                                                order.shipping_fee
                                                            ).toLocaleString(
                                                                "vi-VN",
                                                                {
                                                                    style: "currency",
                                                                    currency:
                                                                        "VND",
                                                                }
                                                            )}
                                                        </h3>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </>
    );
};

export default OrderHistory;
