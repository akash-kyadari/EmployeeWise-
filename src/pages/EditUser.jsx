import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById, updateUser } from "../redux/usersSlice.js";

const EditUser = () => {
    const { id } = useParams();
    const userId = Number(id); // Ensure id is a number
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { selectedUser, loading, error } = useSelector((state) => state.users);

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
    });

    console.log("ID from useParams:", id); // Debugging ID

    useEffect(() => {
        if (!id) {
            console.error("No ID found in URL");
            return;
        }
        if (!selectedUser || selectedUser.id !== userId) {
            console.log(`Fetching user with ID: ${userId}`);
            dispatch(fetchUserById(userId));
        }
    }, [dispatch, userId, selectedUser]);

    useEffect(() => {
        if (selectedUser) {
            console.log("Prefilling form with:", selectedUser);
            setFormData({
                first_name: selectedUser.first_name || "",
                last_name: selectedUser.last_name || "",
                email: selectedUser.email || "",
            });
        }
    }, [selectedUser]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId) {
            console.error("User ID is undefined, cannot update.");
            return;
        }
        try {
            await dispatch(updateUser({ id: userId, data: formData })).unwrap();
            alert("User updated successfully!");
            navigate("/users");
        } catch (err) {
            console.error("Update failed:", err.message);
        }
    };

    if (loading) return <p className="text-center text-gray-600">Loading user details...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <section className="h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Edit User</h2>

                <form onSubmit={handleSubmit}>
                    {/* First Name */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">First Name</label>
                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Last Name */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Last Name</label>
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        Update User
                    </button>
                </form>
            </div>
        </section>
    );
};

export default EditUser;
