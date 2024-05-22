import { useDispatch } from "react-redux";
import { removeItem, updateCartAmount } from "../features/cart/cartSlice";
import { toast } from "react-toastify";

const CartItem = ({ cartItem }) => {
    const { id, name, category, price, image_url, amount, quantity } = cartItem;
    const dispatch = useDispatch();

    return (
        <div className=" text-mdjustify-between mb-6 rounded-lg text-accent-content bg-base-200 p-6 shadow-md sm:flex sm:justify-start">
            <div>
                <img
                    src={image_url}
                    alt={name}
                    className="w-full h-48 rounded-lg sm:w-60 object-cover sm:object-contain sm:mr-8"
                />
            </div>
            <div className="sm:ml-8 sm:flex sm:w-full sm:justify-between">
                <div>
                    <p className="text-2xl font-bold text-accent-content">
                        {name}
                    </p>
                    <p className="text-accent-content text-md mt-1">
                        {category}
                    </p>
                    <h4 className="text-2xl font-bold text-accent-content mt-4">
                        {price.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        })}
                    </h4>
                    <div className="mt-6">
                        <button
                            type="button"
                            className="flex flex-wrap gap-2 text-xl text-[#333]"
                        >
                            <span
                                className="bg-gray-100 px-2 py-2 rounded hover:bg-blue-200"
                                onClick={() => {
                                    if (amount > 1) {
                                        dispatch(
                                            updateCartAmount({
                                                id: id,
                                                amount: amount - 1,
                                            })
                                        );
                                    }
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-3.5 fill-current "
                                    viewBox="0 0 124 124"
                                >
                                    <path
                                        d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                                        data-original="#000000"
                                    ></path>
                                </svg>
                            </span>
                            <span className="text-md mx-2 text-accent-content">
                                {amount}
                            </span>

                            <span
                                className="bg-gray-100 px-2 py-2 rounded hover:bg-blue-200"
                                onClick={() => {
                                    if (amount < quantity) {
                                        dispatch(
                                            updateCartAmount({
                                                id: id,
                                                amount: amount + 1,
                                            })
                                        );
                                    } else {
                                        toast.error("Out of stock!", {
                                            quantity,
                                        });
                                    }
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-3.5 fill-current"
                                    viewBox="0 0 42 42"
                                >
                                    <path
                                        d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                                        data-original="#000000"
                                    ></path>
                                </svg>
                            </span>
                        </button>
                    </div>
                    <div className="text-blue-500 cursor-pointer mt-4 hover:text-blue-600">
                        <a href="">See details</a>
                    </div>
                </div>
                <div>
                    <span onClick={() => dispatch(removeItem(id))}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 fill-red-400 inline cursor-pointer hover:fill-red-600 hover:scale-150"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                                data-original="#000000"
                            ></path>
                            <path
                                d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                                data-original="#000000"
                            ></path>
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
