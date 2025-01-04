"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { isTokenValid } from "@/utils/utils";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

const Home: React.FC = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
            setIsAuthenticated(isTokenValid(token));
    }, [token]);


    const buttonText = isAuthenticated ? "Explore Books" : "Login";
    const buttonUrl = isAuthenticated ? "/all-books" : "/signup";

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100 ">
            <div className="card shadow-lg p-4 bg-light" style={{ maxWidth: "600px" }}>
                <div className="card-body text-center">
                    <h1 className="card-title">Welcome to Future Library</h1>
                    <h4 className="text-muted mb-4">Your gateway to unlimited knowledge</h4>
                    <p className="card-text">
                        Discover a wide collection of books, manage your reading habits,
                        and stay ahead in the journey of endless learning. Visit our library and check out your favorite titles today!
                    </p>
                    <hr />
                    <div className="mt-4">
                        <Link href={buttonUrl}>
                            <button className="btn btn-primary btn-lg px-4">
                                {buttonText}
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;