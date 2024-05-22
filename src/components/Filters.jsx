import { useState, useEffect } from "react";
import FormInput from "./FormInput";
import { Form, Link } from "react-router-dom";
import FormRange from "./FormRange";
import FormSelect from "./FormSelect";
import axios from "axios";

const handleFilter = () => {};

const Filters = ({ filter }) => {
    const [selectCategoryList, setSelectCategoryList] = useState([]);
    const [selectBusinessList, setSelectBusinessList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const categories = await axios.post(
                    "http://localhost:8000/api/category/get/"
                );

                const businesses = await axios.post(
                    "http://localhost:8000/api/business/get/"
                );

                for (let i = 0; i < categories.data.data.length; i++) {
                    selectCategoryList.push({
                        value: categories.data.data[i].id,
                        label: categories.data.data[i].name,
                    });
                }

                for (let i = 0; i < businesses.data.data.length; i++) {
                    selectBusinessList.push({
                        value: businesses.data.data[i].id,
                        label: businesses.data.data[i].name,
                    });
                }

                setSelectCategoryList(selectCategoryList);
                setSelectBusinessList(selectBusinessList);
            } catch (error) {
                setError(error);
                console.error(
                    "Error fetching categories:",
                    error.response?.data || error.message
                );
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            {isLoading ? (
                <h2 className="text-4xl text-center my-6 max-md:text-4xl text-accent-content">
                    <span className="loading loading-dots loading-lg"></span>
                </h2>
            ) : error ? (
                <h2 className="text-4xl font-bold text-center my-6 max-md:text-4xl text-accent-content">
                    Error fetching products: {error.message}
                </h2>
            ) : (
                <Form className="bg-base-200 rounded-md px-4 py-2 grid gap-x-4  gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 items-center">
                    {/* NAME PRODUCT */}
                    <FormInput
                        type="search"
                        label="name product"
                        name="name product"
                        size="input-sm"
                        defaultValue=""
                    />
                    {/* CATEGORIES */}
                    <FormSelect
                        label="select category"
                        name="category"
                        list={selectCategoryList}
                        size="select-sm"
                        defaultValue="all"
                        onChange={(e) => {
                            console.log("Change");
                            console.log(e.target.value);
                            // const { name, value } = e.target;
                            // filter.setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
                        }}
                    />
                    {/* BUSINESS */}
                    <FormSelect
                        label="select store"
                        name="business"
                        list={selectBusinessList}
                        size="select-sm"
                        defaultValue="all"
                    />
                    {/* PRICE */}
                    <FormRange
                        name="price"
                        label="select price"
                        size="range-sm"
                        price={10000000}
                    />

                    {/* BUTTONS */}

                    <button
                        onClick={handleFilter}
                        className="btn bg-blue-600 hover:bg-blue-500 text-white btn-sm"
                    >
                        search
                    </button>
                    <Link
                        to="/shop"
                        className="btn bg-blue-600 hover:bg-blue-500 text-white btn-sm "
                    >
                        reset
                    </Link>
                </Form>
            )}
        </>
    );
};

export default Filters;
