import axios from "axios";
import { useEffect, useState } from "react";
import { AmountInput, SingleProductReviews, FeedbackForm } from "../components";
import { FaCartShopping } from "react-icons/fa6";
import { useLoaderData } from "react-router-dom";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { toast } from "react-toastify";

export const singleProductLoader = async ({ params }) => {
    const { id } = params;

    const productData = await axios
        .post(`http://localhost:8000/api/product/get/`, {
            id: id,
            page: 1,
            page_size: 1,
        })
        .then((res) => {
            return res.data.data.records[0];
        });

    // get feedbacks by product id
    const feedbacks = await axios
        .post(`http://localhost:8000/api/product/feedbacks/`, {
            product_id: id,
            page: 1,
            page_size: 5,
        })
        .then((res) => {
            return res.data.data.records;
        });

    return { productData: productData, feedbacks: feedbacks };
};

const SingleProduct = () => {
    const [amount, setAmount] = useState(1);
    const { userId } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const loginState = useSelector((state) => state.auth.isLoggedIn);
    const [rating, setRating] = useState([
        "full star",
        "empty star",
        "empty star",
        "empty star",
        "empty star",
    ]);
    // const [page, setPage] = useState(1);
    // const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     // re-load when add new feedback
    //     if (loading) {
    //         window.location.reload();
    //     }
    // }, [loading]);

    const { productData, feedbacks } = useLoaderData();

    const product = {
        id: productData?.id,
        name: productData?.name,
        category: productData?.category.name,
        price: productData?.price,
        image_url: productData?.image_url,
        amount: amount,
        quantity: productData?.total_available,
    };

    rating[0] = "full star";

    for (let i = 1; i < productData?.rating; i++) {
        rating[i] = "full star";
    }

    return (
        <>
            <div className="grid grid-cols-2 max-w-7xl mx-auto mt-5 max-lg:grid-cols-1 max-lg:mx-5">
                <div className="product-images flex flex-col justify-center max-lg:justify-start">
                    <img
                        src={productData.image_url}
                        className="w-96 text-center border cursor-pointer mx-10 rounded-lg"
                        alt={productData.name}
                    />
                    {/* <div className="other-product-images mt-1 grid grid-cols-3 w-72 gap-y-1 gap-x-2 max-sm:grid-cols-2 max-sm:w-64">
                        {productData?.additionalImageUrls.map(
                            (imageObj, index) => (
                                <img
                                    src={`https://${imageObj}`}
                                    key={nanoid()}
                                    onClick={() => setCurrentImage(index)}
                                    alt={productData.name}
                                    className="w-32 border border-gray-600 cursor-pointer"
                                />
                            )
                        )}
                    </div> */}
                </div>
                <div className="single-product-content flex flex-col gap-y-5 max-lg:mt-2">
                    <h2 className="text-4xl font-bold max-sm:text-2xl text-accent-content">
                        {productData?.name}
                    </h2>
                    <p className="text-3xl text-accent-content font-semibold">
                        {productData?.price.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        })}
                    </p>
                    <div className="text-md max-sm:text-lg text-accent-content">
                        {parse(productData?.description)}
                    </div>
                    <div className="other-product-info flex flex-col gap-x-2">
                        <div
                            className={
                                productData?.total_available > 0
                                    ? "badge bg-gray-700 badge-md font-bold text-white p-3 mt-2"
                                    : "badge bg-red-700 badge-md font-bold text-white p-3 mt-2"
                            }
                        >
                            Quantity: {productData?.total_available}
                        </div>
                        <div className="badge bg-gray-700 badge-md font-bold text-white p-3 mt-2">
                            Category: {productData?.category.name}
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-1">
                            <AmountInput
                                amount={amount}
                                setAmount={setAmount}
                                quantity={productData?.total_available}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row gap-x-2 max-sm:flex-col max-sm:gap-x">
                        <button
                            className="btn bg-blue-600 hover:bg-blue-500 text-white"
                            onClick={() => {
                                if (loginState) {
                                    dispatch(addToCart(product));
                                } else {
                                    toast.error(
                                        "You must be logged in to add products to the cart"
                                    );
                                }
                            }}
                        >
                            <FaCartShopping className="text-xl mr-1" />
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>

            {loginState && (
                <FeedbackForm productId={productData?.id} userId={userId} />
            )}

            <SingleProductReviews rating={rating} feedbacks={feedbacks} />
        </>
    );
};

export default SingleProduct;
