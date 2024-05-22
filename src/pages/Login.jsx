import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { store } from "../store";
import { loginUser, logoutUser } from "../features/auth/authSlice";
import axios from "axios";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    const loginState = useSelector((state) => state.auth.isLoggedIn);

    useEffect(() => {
        if (loginState) {
            localStorage.clear();
            store.dispatch(logoutUser());
            navigate("/login");
        }
    }, []);

    const isValidate = () => {
        let isProceed = true;

        if (username.length === 0) {
            isProceed = false;
            toast.warn("Please enter a username"); // Corrected error message
        } else if (password.length < 6) {
            isProceed = false;
            toast.warn("Password must be minimum 6 characters");
        }
        return isProceed;
    };

    const proceedLogin = async (e) => {
        e.preventDefault();
        if (isValidate()) {
            try {
                const response = await axios.post(
                    "http://localhost:8000/api/user/login/",
                    {
                        username,
                        password,
                    }
                );

                if (response.data.msg === "Not found") {
                    throw new Error(response.data.msg || "Login failed");
                }
                localStorage.setItem("user_id", response.data.data.id);
                store.dispatch(loginUser());
                navigate("/");
            } catch (err) {
                toast.error("Login failed due to: " + err.message);
            }
        }
    };

    return (
        <>
            <div className="flex flex-col justify-center sm:py-12">
                <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                    <div className="bg-dark border border-gray-600 shadow w-full rounded-lg divide-y divide-gray-200">
                        <form className="px-5 py-7" onSubmit={proceedLogin}>
                            <label className="font-semibold text-sm pb-1 block text-accent-content">
                                Username
                            </label>
                            <input
                                value={username}
                                required={true}
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                            />
                            <label className="font-semibold text-sm pb-1 block text-accent-content">
                                Password
                            </label>
                            <input
                                type="password"
                                required={true}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                            />
                            <button
                                type="submit"
                                className="transition duration-200 bg-blue-600 hover:bg-blue-500 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                            >
                                <span className="inline-block mr-2">Login</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-4 h-4 inline-block"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </button>
                        </form>
                    </div>
                    <div className="py-3 text-center">
                        <Link
                            to="/signup"
                            className="btn  bg-blue-600 hover:bg-blue-500 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full rounded-lg text-sm shadow-sm hover:shadow-md text-center"
                            onClick={() => window.scrollTo(0, 0)}
                        >
                            Don`t have an account? Please register.
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
