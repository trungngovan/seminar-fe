import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [user_id, setUserId] = useState(localStorage.getItem("user_id"));
    const loginState = useSelector((state) => state.auth.isLoggedIn);
    const [userFormData, setUserFormData] = useState({
        id: "",
        first_name: "",
        last_name: "",
        email: "",
        dob: "",
        phone: "",
        address: "",
        user_image: null,
        image_url: "",
        seller: false,
    });
    const navigate = useNavigate();

    const getUserData = async () => {
        try {
            const response = await axios.post(
                `http://localhost:8000/api/user/get_users/`, // get user data
                {
                    id: user_id,
                    page: 1,
                    page_size: 1,
                }
            );
            const data = response.data.data.records[0];
            setUserFormData({
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                dob: data.dob,
                phone: data.phone,
                address: data.address,
                image_url: data.image_url,
                seller: data.is_seller,
            });
        } catch (error) {
            toast.error("Error: ", error.response);
        }
    };

    useEffect(() => {
        if (loginState) {
            getUserData();
        } else {
            toast.error("You must be logged in to access this page");
            navigate("/");
        }
    }, []);

    const updateProfile = async (e) => {
        e.preventDefault();
        try {
            let formData = new FormData();

            formData.append("id", user_id);

            for (const key in userFormData) {
                formData.append(key.toString(), userFormData[key]);
            }

            const updateResponse = await axios.post(
                `http://localhost:8000/api/user/update/`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (updateResponse.code === 1) {
                toast.error("User not found");
            }
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log(error.response);
            toast.error("Error: ", error);
        }
    };

    return (
        <>
            <div className="text-accent-base p-5 text-center text-accent-content">
                {userFormData.seller ? (
                    <h1 className="text-4xl">Seller</h1>
                ) : (
                    <h1 className="text-4xl">Buyer</h1>
                )}
            </div>
            <form
                className="max-w-6xl mx-auto text-center px-10"
                onSubmit={updateProfile}
            >
                <div className="grid grid-cols-3 max-lg:grid-cols-1 text-accent-content">
                    <div className="form-control w-full lg:max-w-xs">
                        <label className="label">
                            <span className="label-text">First name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full lg:max-w-xs"
                            value={userFormData.first_name}
                            onChange={(e) => {
                                setUserFormData({
                                    ...userFormData,
                                    first_name: e.target.value,
                                });
                            }}
                        />
                    </div>

                    <div className="form-control w-full lg:max-w-xs">
                        <label className="label">
                            <span className="label-text">Last name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full lg:max-w-xs"
                            value={userFormData.last_name}
                            onChange={(e) => {
                                setUserFormData({
                                    ...userFormData,
                                    last_name: e.target.value,
                                });
                            }}
                        />
                    </div>

                    <div className="form-control w-full lg:max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Type here"
                            className="input input-bordered w-full lg:max-w-xs"
                            value={userFormData.email}
                            onChange={(e) => {
                                setUserFormData({
                                    ...userFormData,
                                    email: e.target.value,
                                });
                            }}
                        />
                    </div>

                    <div className="form-control w-full lg:max-w-xs">
                        <label className="label">
                            <span className="label-text">Phone</span>
                        </label>
                        <input
                            type="tel"
                            placeholder="Type here"
                            className="input input-bordered w-full lg:max-w-xs"
                            value={userFormData.phone}
                            onChange={(e) => {
                                setUserFormData({
                                    ...userFormData,
                                    phone: e.target.value,
                                });
                            }}
                        />
                    </div>

                    <div className="form-control w-full lg:max-w-xs">
                        <label className="label">
                            <span className="label-text">Address</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full lg:max-w-xs"
                            value={userFormData.address}
                            onChange={(e) => {
                                setUserFormData({
                                    ...userFormData,
                                    address: e.target.value,
                                });
                            }}
                        />
                    </div>

                    <div className="form-control w-full lg:max-w-xs">
                        <label className="label">
                            <span className="label-text">Day of birth</span>
                        </label>
                        <input
                            type="date"
                            placeholder="Type here"
                            className="input input-bordered w-full lg:max-w-xs"
                            value={userFormData.dob}
                            onChange={(e) => {
                                setUserFormData({
                                    ...userFormData,
                                    dob: e.target.value,
                                });
                            }}
                        />
                    </div>

                    {/* Avatar */}
                    <div className="form-control w-full lg:max-w-xs">
                        <label className="label">
                            <span className="label-text">Avatar</span>
                        </label>
                        <img
                            src={userFormData.image_url}
                            alt="avatar"
                            className="w-320 h-320 rounded mx-auto"
                        />
                        <input
                            type="file"
                            placeholder="Type here"
                            className="input input-bordered w-full lg:max-w-xs"
                            onChange={(e) => {
                                setUserFormData({
                                    ...userFormData,
                                    user_image: e.target.files[0],
                                });
                            }}
                        />
                    </div>
                </div>
                <button
                    className="btn btn-md bg-blue-600 hover:bg-blue-500 text-white mt-5"
                    type="submit"
                >
                    Update Profile
                </button>
            </form>
        </>
    );
};

export default Profile;
