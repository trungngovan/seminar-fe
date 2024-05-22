import { Filters, Pagination, ProductElement } from "../components";
import "../styles/Shop.css";
import axios from "axios";
import { useState, useEffect } from "react";

const Shop = () => {
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        name: null,
        category_id: null,
        business_id: null,
        price: null,
    });

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const response = await axios.post(
                    "http://localhost:8000/api/product/get/",
                    // Add filters to the request
                    { ...filters, page: page, page_size: 8 }
                );
                setProducts(response.data.data.records);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [page, filters]); // Run effect when `page` changes

    return (
        <>
            <div className="max-w-6xl mx-auto">
                <Filters
                    filters={{
                        filters: filters,
                        setFilters: setFilters,
                        setProducts: setProducts,
                        setPage: setPage,
                    }}
                />
                {isLoading ? (
                    <h2 className="text-4xl text-center my-6 max-md:text-4xl text-accent-content">
                        <span className="loading loading-dots loading-lg"></span>
                    </h2>
                ) : error ? (
                    <h2 className="text-4xl font-bold text-center my-6 max-md:text-4xl text-accent-content">
                        Error fetching products: {error.message}
                    </h2>
                ) : (
                    <>
                        {products.length === 0 && (
                            <h2 className="text-accent-content text-center text-4xl my-10">
                                No products found for this filter
                            </h2>
                        )}
                        <div className="selected-products-grid max-w-7xl mx-auto my-2">
                            {products.length !== 0 ? (
                                products.map((product) => (
                                    <ProductElement
                                        key={product.id}
                                        id={product.id}
                                        name={product.name}
                                        description={product.description}
                                        price={product.price}
                                        image={product.image_url}
                                        category={product.category.name}
                                        business={product.business.name}
                                        quantity={product.quantity}
                                    />
                                ))
                            ) : (
                                <h2 className="text-accent-content text-center text-4xl my-10">
                                    No products found for this filter
                                </h2>
                            )}
                        </div>
                    </>
                )}
            </div>

            <Pagination
                data={{
                    page: page,
                    setPage: setPage,
                    products: products,
                    setProducts: setProducts,
                }}
            ></Pagination>
        </>
    );
};

export default Shop;
