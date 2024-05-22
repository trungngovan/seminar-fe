import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Signup = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [image, setImage] = useState(null);
    const [isSeller, setIsSeller] = useState(false);

    const navigate = useNavigate();

    const isValidate = () => {
        let isProceed = true;
        let errorMessage = "";

        if (firstname.length === 0) {
            isProceed = false;
            errorMessage = "Please enter the value in firstname field";
        } else if (lastname.length === 0) {
            isProceed = false;
            errorMessage = "Please enter the value in lastname field";
        } else if (username.length < 6) {
            isProceed = false;
            errorMessage = "Please enter a username longer than 5 characters";
        } else if (password.length < 6) {
            isProceed = false;
            errorMessage = "Please enter a password longer than 5 characters";
        } else if (confirmPassword.length < 6) {
            isProceed = false;
            errorMessage =
                "Please enter a confirm password longer than 5 characters";
        } else if (email.length === 0) {
            isProceed = false;
            errorMessage = "Please enter the value in email field";
        } else if (dob.length === 0) {
            isProceed = false;
            errorMessage = "Please enter the value in dob field";
        } else if (phone.length < 10 || phone.length > 11) {
            isProceed = false;
            errorMessage = "Please enter a valid phone number";
        } else if (address.length < 4) {
            isProceed = false;
            errorMessage = "Adress must be longer than 3 characters";
        } else if (password !== confirmPassword) {
            isProceed = false;
            errorMessage = "Passwords must match";
        } else if (image === null) {
            isProceed = false;
            errorMessage = "Please upload an avatar image";
        }

        if (!isProceed) {
            toast.warn(errorMessage);
        }

        return isProceed;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let regObj = {
            first_name: firstname,
            last_name: lastname,
            username: username,
            password: password,
            email: email,
            dob: dob,
            phone: phone,
            address: address,
            user_image: image,
            is_seller: isSeller,
        };

        const formData = new FormData();

        for (const key in regObj) {
            formData.append(key.toString(), regObj[key]);
        }

        if (isValidate()) {
            // Assuming this function validates user input
            axios
                .post("http://localhost:8000/api/user/signup/", formData)
                .then((response) => {
                    if (response.data.data.error) {
                        throw new Error(
                            response.data.data.error || "Signup failed"
                        );
                    }
                    toast.success("Registration Successful");
                    navigate("/login");
                })
                .catch((error) => {
                    let errorMessage = "";
                    if (error.message.includes("user.email")) {
                        errorMessage = "Email already exists";
                    } else if (error.message.includes("user.username")) {
                        errorMessage = "Username already exists";
                    } else if (error.message.includes("user.phone")) {
                        errorMessage = "Phone number already exists";
                    }
                    toast.error(errorMessage || "Signup failed");
                });
        }
    };
    return (
        <>
            <div className="flex flex-col justify-center sm:py-12">
                <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                    <div className="bg-dark border border-gray-600 shadow w-full rounded-lg divide-y divide-gray-200">
                        <form className="px-5 py-7" onSubmit={handleSubmit}>
                            <label className="font-semibold text-sm pb-1 block text-accent-content">
                                First name
                            </label>
                            <input
                                type="text"
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                required={true}
                            />
                            <label className="font-semibold text-sm pb-1 block text-accent-content">
                                Last name
                            </label>
                            <input
                                type="text"
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                required={true}
                            />
                            <label className="font-semibold text-sm pb-1 block text-accent-content">
                                Username
                            </label>
                            <input
                                type="text"
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required={true}
                            />
                            <label className="font-semibold text-sm pb-1 block text-accent-content">
                                Password
                            </label>
                            <input
                                type="password"
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required={true}
                            />
                            <label className="font-semibold text-sm pb-1 block text-accent-content">
                                Repeat Password
                            </label>
                            <input
                                type="password"
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                required={true}
                            />
                            <label className="font-semibold text-sm pb-1 block text-accent-content">
                                E-mail
                            </label>
                            <input
                                type="email"
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required={true}
                            />
                            <label className="font-semibold text-sm pb-1 block text-accent-content">
                                Phone
                            </label>
                            <input
                                type="tel"
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required={true}
                            />
                            <label className="font-semibold text-sm pb-1 block text-accent-content">
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                                required={true}
                            />
                            <label className="font-semibold text-sm pb-1 block text-accent-content">
                                Address
                            </label>
                            <input
                                type="text"
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required={true}
                            />

                            <label className="font-semibold text-sm pb-1 block text-accent-content">
                                Profile Picture
                            </label>
                            <input
                                type="file"
                                accept="image/png, image/jpeg"
                                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                                onChange={(e) => {
                                    setImage(e.target.files[0]);
                                }}
                                required={true}
                            />
                            <label className="font-semibold text-sm pb-1 block text-accent-content">
                                Are you a seller?
                            </label>
                            <input
                                type="checkbox"
                                className="rounded-lg px-3 py-2 mt-1 mb-5 text-sm"
                                onChange={(e) => setIsSeller(e.target.checked)}
                            />
                            <button
                                type="submit"
                                className="transition duration-200 bg-blue-600 hover:bg-blue-500 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                            >
                                <span className="inline-block mr-2">
                                    Register
                                </span>
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
                    <div className="py-5 text-center">
                        <Link
                            to="/login"
                            className="btn  bg-blue-600 hover:bg-blue-500 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full rounded-lg text-sm shadow-sm hover:shadow-md text-center"
                            onClick={() => window.scrollTo(0, 0)}
                        >
                            Already have an account? Please login.
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
