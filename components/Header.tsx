import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import { clearToken } from "@/store/authSlice"; // Import clearToken action
import "@/styles/header.scss";
import {isTokenValid} from "@/utils/utils";
import {router} from "next/client";
import {RootState} from "@/store/store";

const Header = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    useEffect(() => {
        setIsAuthenticated(isTokenValid(token));
    }, [token]);

    useEffect(() => {
        console.log("isAuthenticated:", isAuthenticated);
        if (!isAuthenticated) {
            router.push("/");
        }
    }, [isAuthenticated]);

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(clearToken());
    };

    return (
        <header className="d-flex justify-content-between align-items-center bg-dark py-3 px-4 position-sticky top-0">
            <div className="d-flex align-items-center">
                <Link href="/" className="text-white text-decoration-none fs-4 fw-bold" id="application-name">
                    Future Library
                </Link>
            </div>
            {isAuthenticated && <div>
                <button
                    className="btn btn-outline-light"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>}
        </header>
    );
};

export default Header;