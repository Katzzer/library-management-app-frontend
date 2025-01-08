"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { isTokenValid } from "@/utils/utils";
import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/index.scss"
import axios from "axios";
import {BackendStatus} from "@/data/types";

const Home: React.FC = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
            setIsAuthenticated(isTokenValid(token));
    }, [token]);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await axios.get<BackendStatus>("/api/backend-health-check"); // just to wake up backend that runs on Heroku
                console.log({"backend-health-check": response.data.response});
            } catch (error) {
                console.error("Error fetching backend status:", error);
            }
        };

        fetchStatus();
    }, []);


    const buttonText = isAuthenticated ? "Explore Books" : "Sign Up";
    const buttonUrl = isAuthenticated ? "/all-books" : "/signup";

    return (
        <div className="d-flex justify-content-center align-items-center index-page-container">
            <div className="card shadow-lg p-4 bg-light" style={{maxWidth: "600px"}}>
                <div className="card-body text-center">
                    <h1 className="card-title">Welcome to Future Library</h1>
                    <h4 className="text-muted mb-4">Your gateway to unlimited knowledge</h4>
                    <p className="card-text">
                        Discover a wide collection of books, manage your reading habits,
                        and stay ahead in the journey of endless learning. Visit our library and check out your favorite
                        titles today!
                    </p>
                    <hr/>
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