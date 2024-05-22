import { Link } from "react-router-dom";
import "../styles/Hero.css";
const Hero = () => {
    return (
        <div className="hero bg-base-200 bg-blend-overlay">
            <div className="hero-content text-center">
                <div className="max-w-xl">
                    <h1 className="text-5xl font-bold max-md:text-4xl text-accent-content">
                        Best e-commerce platform of the year!
                    </h1>
                    <p className="py-6 text-2xl max-md:text-lg text-accent-content">
                        From HCMUS
                    </p>
                    <Link
                        to="/shop"
                        className="text-xl btn btn-wide bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        Shopping now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Hero;
