/* eslint-disable react/prop-types */
import SingleReview from "./SingleReview";

const SingleProductReviews = ({ feedbacks }) => {
    return (
        <div className="product-reviews max-w-7xl mx-auto">
            <div className="product-reviews-comments mt-20 px-10">
                {feedbacks && feedbacks.length > 0 && (
                    <>
                        <h2 className="text-4xl text-accent-content text-center mb-5 max-sm:text-2xl">
                            Feedbacks
                        </h2>
                        {feedbacks.map((item) => (
                            <SingleReview key={item.id} reviewObj={item} />
                        ))}
                        {feedbacks && feedbacks.lenght > 5 && (
                            <button
                                // onClick={() => setPage(page + 1)}
                                className="btn bg-blue-600 hover:bg-blue-500 w-full text-white"
                            >
                                Load more feedbacks
                            </button>
                        )}
                    </>
                )}
                {!feedbacks || feedbacks.length === 0 ? (
                    <h2 className="text-4xl text-accent-content text-center mb-5 max-sm:text-2xl">
                        No feedbacks yet
                    </h2>
                ) : null}
            </div>
        </div>
    );
};

export default SingleProductReviews;
