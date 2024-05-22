import "../styles/Landing.css";
import { useState, useEffect } from "react";
import { Hero, ProductElement, Pagination } from "../components";
import axios from "axios";

const Landing = () => {
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const response = await axios.post(
                    "http://localhost:8000/api/product/get/",
                    { page: page, page_size: 8 }
                );
                setProducts(response.data.data.records);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [page]); // Run effect when `page` changes

    return (
        <main>
            <Hero />
            {isLoading ? (
                <h2 className="text-4xl text-center my-6 max-md:text-4xl text-accent-content">
                    <span className="loading loading-dots loading-lg"></span>
                </h2>
            ) : error ? (
                <h2 className="text-4xl font-bold text-center my-6 max-md:text-4xl text-accent-content">
                    Error fetching products: {error.message}
                </h2>
            ) : (
                <div className="selected-products">
                    <h2 className="text-3xl font-bold text-center my-3 max-md:text-4xl text-accent-content">
                        Recommend for you
                    </h2>
                    <div className="selected-products-grid max-w-6xl mx-auto my-3">
                        {products.map((product) => (
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
                        ))}
                    </div>
                </div>
            )}
            {/* <Pagination
                data={{
                    page: page,
                    setPage: setPage,
                    products: products,
                    setProducts: setProducts,
                }}
            ></Pagination> */}
        </main>
    );
};

export default Landing;
