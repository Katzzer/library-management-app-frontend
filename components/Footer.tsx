import React, {useEffect, useState} from 'react';
import Link from "next/link";
import "@/styles/footer.scss"
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {isTokenValid} from "@/utils/utils";

const Footer: React.FC = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    useEffect(() => {
        setIsAuthenticated(isTokenValid(token));
    }, [token]);

    const currentYear = new Date().getFullYear(); // Automatically get current year

    return (
        <footer className="bg-dark text-white py-4">
            <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between">
                <div className="text-center text-md-start mb-3 mb-md-0">
                    Created by <a href="https://www.pavelkostal.com" className="text-decoration-underline text-info">Pavel Kostal</a>
                </div>

                <ul className="nav justify-content-center mb-3 mb-md-0">
                    <li className="nav-item">
                        <Link href="/about-us" className="nav-link px-2 text-light">About Us</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/contact" className="nav-link px-2 text-light">Contact</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/privacy" className="nav-link px-2 text-light">Privacy Policy</Link>
                    </li>
                    {isAuthenticated && <li className="nav-item">
                        <Link href="/all-books" className="nav-link px-2 text-light">All Books</Link>
                    </li>}
                </ul>

                <div className="text-center text-md-end">
                    © {currentYear} Pavel Kostal. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;