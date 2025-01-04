"use client";
import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const SignUp: React.FC = () => {
    const [email, setEmail] = useState("admin@gmail.com");
    const [password, setPassword] = useState("admin");
    const [showModal, setShowModal] = useState(false);
    const [isSigningUp, setIsSigningUp] = useState(true); // true: Sign Up, false: Login

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post("api/signup", { email, password, isSigningUp });

            console.log("Response from server:", response.data);
        } catch (error) {
            console.error("Error during request:", error);

            if (axios.isAxiosError(error) && error.response?.status === 409) {
                setShowModal(true); // Open the modal
            }
        }
    };

    const toggleSignMode = () => {
        setIsSigningUp((prev) => !prev); // Toggle between Sign Up and Login
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
                <h1 className="text-center">{isSigningUp ? "Sign Up" : "Login"}</h1>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        {isSigningUp ? "Sign Up" : "Login"}
                    </button>
                </form>
                <hr />
                <div className="text-center">
                    <button
                        type="button"
                        className="btn btn-link"
                        onClick={toggleSignMode}
                    >
                        {isSigningUp
                            ? "Already have an account? Login"
                            : "Don't have an account? Sign Up"}
                    </button>
                </div>
            </div>

            {/* Modal for Error Message */}
            {showModal && (
                <div
                    className="modal fade show"
                    style={{
                        display: "block",
                        backgroundColor: "rgba(0,0,0,0.5)",
                    }}
                    onClick={() => setShowModal(false)} // Close modal on click outside
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Error</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>{isSigningUp ? "User is already registered" : "Login failed"}</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SignUp;