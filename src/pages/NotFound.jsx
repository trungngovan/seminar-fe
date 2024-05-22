export default function NotFound() {
    return (
        <section className="text-accent-content">
            <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
                <div className="w-full lg:w-1/2">
                    <p className="text-sm font-medium text-blue-500">
                        404 error
                    </p>
                    <h1 className="mt-3 text-2xl font-semiboldtext-accent-content md:text-3xl">
                        Page not found
                    </h1>
                    <p className="mt-4 text-accent-content">
                        Sorry, the page you are looking for doesn`t exist.Here
                        are some helpful links:
                    </p>

                    <div className="flex items-center mt-6 gap-x-3">
                        <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-accent-content transition-colors duration-200 border rounded-lg gap-x-2 sm:w-auto hover:bg-blue-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-5 h-5 rtl:rotate-180"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                                />
                            </svg>

                            <span
                                className="font-medium text-accent-content"
                                onClick={() => {
                                    console.log("Go back");
                                    window.history.back();
                                }}
                            >
                                Go back
                            </span>
                        </button>

                        <button
                            className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
                            onClick={() => {
                                window.location.href = "/";
                            }}
                        >
                            Take me home
                        </button>
                    </div>
                </div>

                <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
                    <img
                        className="w-full max-w-lg lg:mx-auto"
                        src="https://flowbite.com/application-ui/demo/images/illustrations/404.svg"
                        alt="Not found"
                    />
                </div>
            </div>
        </section>
    );
}
