import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import { clearToken } from "@/store/authSlice"; // Import clearToken action
import "@/styles/header.scss";
import {isTokenValid} from "@/utils/utils";
import {RootState} from "@/store/store";
import {router} from "next/client";

const Header = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const [isUSerAuthenticated, setIsUSerAuthenticated] = useState(true);

    useEffect(() => {
        setIsUSerAuthenticated(isTokenValid(token));
    }, [token]);

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(clearToken());
        router.push("/");
    };

    return (
        <header className="d-flex justify-content-between align-items-center bg-dark py-3 px-4 position-sticky top-0">
            <div className="d-flex align-items-center">
                <Link href="/" className="text-white text-decoration-none fs-4 fw-bold" id="application-name">
                    Future Library
                </Link>
            </div>
            {isUSerAuthenticated && <div>
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