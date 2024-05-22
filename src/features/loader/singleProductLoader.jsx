import axios from "axios";

const singleProductLoader = async ({ params }) => {
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

export default singleProductLoader;
