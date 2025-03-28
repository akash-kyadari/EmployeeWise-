import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/authSlice";

const Login = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, token } = useSelector((state) => state.auth);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await dispatch(
                loginUser({
                    email: emailRef.current.value,
                    password: passwordRef.current.value
                })
            ).unwrap();

            console.log("Login successful! Token:", result);
            navigate("/users");
        } catch (error) {
            console.error("Login failed:", error.message);
        }
    };
    return (
        <section className="h-screen flex flex-col justify-center items-center bg-gray-100">
            <div className="container mx-auto p-6">
                <div className="flex flex-wrap items-center justify-around">
                    {/* Image Section */}
                    <div className="w-full md:w-1/2 lg:w-5/12 mb-6 md:mb-0">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="w-full h-auto"
                            alt="Login Illustration"
                        />
                    </div>

                    {/* Form Section */}
                    <div className="w-full md:w-1/2 lg:w-4/12 bg-white shadow-md rounded-lg p-8">
                        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
                            Log in
                        </h2>
                        {/* Error Message */}
                        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                        {/* Social Login */}
                        {/* <div className="flex justify-center gap-3 mb-4">
                            <button className="p-3 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition">
                                <i className="fab fa-facebook-f"></i>
                            </button>
                            <button className="p-3 bg-blue-400 text-white rounded-full shadow-md hover:bg-blue-500 transition">
                                <i className="fab fa-twitter"></i>
                            </button>
                            <button className="p-3 bg-blue-800 text-white rounded-full shadow-md hover:bg-blue-900 transition">
                                <i className="fab fa-linkedin-in"></i>
                            </button>
                        </div> */}

                        {/* Divider */}
                        {/* <div className="flex items-center my-4">
                            <div className="flex-1 border-t border-gray-300"></div>
                            <p className="text-center mx-3 text-gray-500 font-semibold">Or</p>
                            <div className="flex-1 border-t border-gray-300"></div>
                        </div> */}

                        {/* Email Input */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-medium">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                placeholder="Enter your email"
                                ref={emailRef}
                            />
                        </div>

                        {/* Password Input */}
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 font-medium">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                placeholder="Enter your password"
                                ref={passwordRef}
                            />
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex justify-between items-center text-sm text-gray-600">
                            {/* <label className="flex items-center space-x-2">
                                <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                                <span>Remember me</span>
                            </label> */}
                            <a href="#" className="text-blue-600 hover:underline">
                                Forgot password?
                            </a>
                        </div>

                        {/* Login Button */}
                        <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                            onClick={handleLogin}
                        >

                            {loading ? "Logging in..." : "Login"}
                        </button>

                        {/* Register Link */}
                        {/* <p className="text-sm text-gray-600 text-center mt-4">
                            Don't have an account?{" "}
                            <Link to="/register" className="text-blue-600 font-semibold hover:underline">
                                Register
                            </Link>
                        </p> */}
                    </div>
                </div>
            </div>

            {/* Footer */}
            {/* <footer className="w-full bg-blue-600 text-white text-center py-4 mt-8">
                <p>Copyright © 2024. All rights reserved.</p>
                <div className="flex justify-center space-x-4 mt-2">
                    <a href="#" className="hover:text-gray-200">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="hover:text-gray-200">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" className="hover:text-gray-200">
                        <i className="fab fa-google"></i>
                    </a>
                    <a href="#" className="hover:text-gray-200">
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                </div>
            </footer> */}
        </section>
    );
};

export default Login;
