import { FaCircleArrowLeft } from "react-icons/fa6";
import { FaCircleArrowRight } from "react-icons/fa6";
import axios from "axios";

const Pagination = (data) => {
    data = data.data;
    const handlePageChange = (pageNumber) => {
        const fetchProducts = async () => {
            try {
                data.setPage(pageNumber);
                const response = await axios.post(
                    "http://localhost:8000/api/product/get/",
                    { page: data.page, page_size: 8 }
                );
                data.setProducts(response.data.data.records);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProducts();
    };

    return (
        <>
            <div className="pagination flex justify-center mt-10">
                <div className="join">
                    <button
                        className="join-item btn text-xl flex justify-center"
                        onClick={() => {
                            if (data.page === 1) {
                                return;
                            }
                            handlePageChange(data.page - 1);
                            window.scrollTo(0, 0);
                        }}
                    >
                        <FaCircleArrowLeft />
                    </button>
                    <button className="join-item btn text-xl">
                        Page {data.page}
                    </button>
                    <button
                        className="join-item btn text-xl flex justify-center"
                        onClick={() => {
                            if (data.products.length < 8) {
                                return;
                            }

                            handlePageChange(data.page + 1);
                            window.scrollTo(0, 0);
                        }}
                    >
                        <FaCircleArrowRight />
                    </button>
                </div>
            </div>
        </>
    );
};

export default Pagination;
