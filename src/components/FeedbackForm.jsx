import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const FeedbackForm = ({ productId, userId }) => {
    const [rating, setRating] = useState(3);
    const [content, setContent] = useState("");
    const loginState = useSelector((state) => state.auth.isLoggedIn);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send feedback data to the backend API
            const response = await axios.post(
                `http://localhost:8000/api/product/create_feedback/`,
                {
                    product_id: productId,
                    user_id: userId,
                    rate: rating,
                    content: content,
                }
            );
            // Handle successful submission (optional)
            toast.success("Feedback submitted successfully", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            setRating(0);
            setContent("");
            return;
        } catch (error) {
            // Handle submission errors
            console.error(error);
            if (loginState) {
                toast.error("Failed to submit feedback", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-3 product-reviews max-w-7xl mt-10 mx-auto"
        >
            <div className="flex items-center gap-2 max-w-7xl mx-10">
                <label
                    htmlFor="rating"
                    className="text-md max-sm:text-3xl text-accent-content"
                >
                    Rating:
                </label>
                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((starIndex) => (
                        <button
                            key={starIndex}
                            type="button"
                            className={`w-4 h-4 text-yellow rounded-full ${
                                starIndex <= rating
                                    ? "bg-yellow-500"
                                    : "bg-gray-200"
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-yellow-400`}
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            // When hover, change color to yellow
                            onMouseEnter={() => setRating(starIndex)}
                        />
                    ))}
                </div>
            </div>
            <input
                id="feedbackText"
                type="text"
                name="feedbackText"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter your feedback..."
                rows={5}
                className="rounded-md border
                p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 max-w-7xl mx-10"
                required={true}
            />
            <button
                type="submit"
                className="btn bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-md focus:outline-none 
                focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mx-auto"
            >
                Submit Feedback
            </button>
        </form>
    );
};

export default FeedbackForm;
