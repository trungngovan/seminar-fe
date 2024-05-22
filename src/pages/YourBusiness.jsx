import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [user_id, setUserId] = useState(localStorage.getItem("user_id"));
    const loginState = useSelector((state) => state.auth.isLoggedIn);
    const [businessFormData, setBusinessFormData] = useState({
        id: "",
        name: "",
        address: "",
        image_url: "",
    });
    const navigate = useNavigate();

    const getUserData = async () => {
        try {
            const response = await axios.post(
                `http://localhost:8000/api/business/get/`, // get user data
                {
                    owner_id: user_id,
                }
            );
            const data = response.data.data[0];
            console.log(data);
            setBusinessFormData({
                name: data.name,
                address: data.address,
                image_url: data.image_url,
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

            for (const key in businessFormData) {
                formData.append(key.toString(), businessFormData[key]);
            }

            const updateResponse = await axios.post(
                `http://localhost:8000/api/business/update/`,
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
                <h1 className="text-4xl">Business</h1>
            </div>
            <form
                className="max-w-6xl mx-auto text-center px-10"
                onSubmit={updateProfile}
            >
                <div className="grid grid-cols-3 max-lg:grid-cols-1 text-accent-content">
                    <div className="form-control w-full lg:max-w-xs">
                        <label className="label">
                            <span className="label-text">Name business</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full lg:max-w-xs"
                            value={businessFormData.name}
                            onChange={(e) => {
                                setBusinessFormData({
                                    ...businessFormData,
                                    name: e.target.value,
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
                            value={businessFormData.address}
                            onChange={(e) => {
                                setBusinessFormData({
                                    ...businessFormData,
                                    address: e.target.value,
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
                            src={businessFormData.image_url}
                            alt="avatar"
                            className="w-320 h-320 rounded mx-auto"
                        />
                        <input
                            type="file"
                            placeholder="Type here"
                            className="input input-bordered w-full lg:max-w-xs"
                            onChange={(e) => {
                                setBusinessFormData({
                                    ...businessFormData,
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
                    Update
                </button>
            </form>
        </>
    );
};

export default Profile;
