import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUsers, setPage } from "../redux/usersSlice.js";
import { useNavigate } from "react-router-dom";

const Users = () => {
    const dispatch = useDispatch();
    const { users, page, totalPages, loading, error } = useSelector((state) => state.users);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(fetchUsers(page));
    }, [dispatch, page]);


    const handleDelete = async (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            const re = await dispatch(deleteUser(userId)).unwrap();
            if (re == userId) {
                alert("deleted sucessfully")
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h2 className="text-3xl font-semibold text-center mb-6">User List</h2>

            {loading && <p className="text-center">Loading users...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            {/* User List Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                {users.map((user, index) => (
                    <div
                        key={user.id}
                        className={`bg-white p-4 rounded-lg shadow-md text-center w-64
                ${index >= 4 && 'lg:col-span-2 lg:justify-self-center'}
            `}
                    >
                        <img src={user.avatar} alt={user.first_name} className="w-24 h-24 rounded-full mx-auto mb-2" />
                        <h3 className="text-lg font-semibold">{user.first_name} {user.last_name}</h3>
                        <p className="text-gray-600">{user.email}</p>

                        {/* Buttons for Edit & Delete */}
                        <div className="mt-4 flex justify-center gap-4">
                            {/* Edit Button */}
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                                onClick={() => navigate(`/users/edit/${user.id}`)}
                            >
                                Edit
                            </button>

                            {/* Delete Button */}
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                                onClick={() => handleDelete(user.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>







            {/* Pagination Controls */}
            <div className="flex justify-center mt-6 space-x-4">
                <button
                    className={`px-4 py-2 rounded-lg ${page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
                    disabled={page === 1}
                    onClick={() => dispatch(setPage(page - 1))}
                >
                    Previous
                </button>
                <span className="text-lg font-semibold">{page} / {totalPages}</span>
                <button
                    className={`px-4 py-2 rounded-lg ${page === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
                    disabled={page === totalPages}
                    onClick={() => dispatch(setPage(page + 1))}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Users;
