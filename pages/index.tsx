"use client";
import React from "react";
import Link from "next/link";

const Home: React.FC = () => {

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh", // Full viewport height
                fontFamily: "Arial, sans-serif",
                textAlign: "center",
            }}
        >
            <h1>Welcome to the Library Management App</h1>
            <p>Your one-stop solution for managing all your library needs!</p>
            <div style={{ marginTop: "20px" }}>
                <Link
                    href={"/signup/register.tsx"}
                    style={{
                        marginRight: "10px",
                        padding: "10px 20px",
                        fontSize: "16px",
                        backgroundColor: "#007BFF",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Register
                </Link>
                <Link
                    href={"/login"}
                    style={{
                        padding: "10px 20px",
                        fontSize: "16px",
                        backgroundColor: "#28A745",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Login
                </Link>
            </div>
        </div>
    );
};

export default Home;