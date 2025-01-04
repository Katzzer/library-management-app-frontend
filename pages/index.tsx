"use client";
import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const SignUp: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [isSigningUp, setIsSigningUp] = useState(true); // true for Sign Up, false for Login

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const endpoint = isSigningUp ? "api/signup" : "api/login";
            const response = await axios.post(endpoint, { email, password });
            console.log("Response from server:", response.data);
        } catch (error) {
            console.error("Error during request:", error);
            if (axios.isAxiosError(error) && error.response?.status === 409) {
                setShowModal(true); // Show modal on error
            }
        }
    };

    const toggleSignMode = () => setIsSigningUp((prev) => !prev);

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "400px" }}>
                <h1 className="text-center">{isSigningUp ? "Sign Up" : "Login"}</h1>
                <form onSubmit={handleSubmit} className="mt-3">
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
                <hr className="my-4" />
                <div className="text-center">
                    <button type="button" className="btn btn-link" onClick={toggleSignMode}>
                        {isSigningUp
                            ? "Already have an account? Login"
                            : "Don't have an account? Sign Up"}
                    </button>
                </div>
            </div>
            {showModal && (
                <div
                    className="modal fade show"
                    style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
                    onClick={() => setShowModal(false)}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Error</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    aria-label="Close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>{isSigningUp ? "User already registered" : "Login failed"}</p>
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