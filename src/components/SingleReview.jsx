import { nanoid } from "nanoid";

const SingleReview = ({ reviewObj }) => {
    const rating = [
        "empty star",
        "empty star",
        "empty star",
        "empty star",
        "empty star",
    ];
    for (let i = 0; i < reviewObj?.rate; i++) {
        rating[i] = "full star";
    }

    return (
        <article className="mb-10 text-lg">
            <div className="flex items-center mb-4">
                <img
                    className="w-10 h-10 me-4 rounded-full"
                    src={
                        reviewObj?.user.image_url ||
                        "https://xsgames.co/randomusers/avatar.php?g=male"
                    }
                    alt=""
                />
                <div className="font-medium dark:text-white">
                    <p>{reviewObj.user.username}</p>
                </div>
            </div>
            <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                {rating.map((item) => {
                    if (item === "full star") {
                        return (
                            <svg
                                key={nanoid()}
                                className="w-4 h-4 text-yellow-300"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 20"
                            >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                        );
                    } else {
                        return (
                            <svg
                                key={nanoid()}
                                className="w-4 h-4 text-gray-300 dark:text-gray-500"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 20"
                            >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                        );
                    }
                })}
            </div>
            <p className="mb-3 text-accent-content">{reviewObj.content}</p>
            <p className="text-gray-400 dark:text-gray-500 mb-3">
                {new Date(reviewObj.created_at).toLocaleDateString()} - Score:{" "}
                {reviewObj.sentiment_score}
            </p>
        </article>
    );
};

export default SingleReview;
