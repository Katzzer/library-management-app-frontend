import React from 'react';
import "@/styles/about.scss"

const AboutUs: React.FC = () => {
    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center text-center about-container"
        >
            <h1 className="display-4 fw-bold mb-4">
                About Us
            </h1>

            <p className="fs-4 mb-4 text-container">
                Welcome to our innovative Library Management App, your ultimate solution to efficiently managing books, members, and lending services.
                Our mission is to modernize library systems and deliver seamless management experiences for librarians and readers alike.
            </p>

            <section className="mt-4 text-container-small" >
                <h2 className="h4 fw-bold">Our Story</h2>
                <p className="fs-5 mt-2">
                    Born out of a love for books and technology, our app was designed to reduce the complexities of traditional library systems.
                    By connecting books, members, and librarians in a unified platform, we empower libraries to focus on what matters most: fostering a love for reading and knowledge sharing.
                </p>
            </section>

            <section className="mt-4 text-container-small">
                <h2 className="h4 fw-bold">Why Choose Us?</h2>
                <ul className="mt-3 text-start">
                    <li>📚 Effortlessly manage library resources and inventories.</li>
                    <li>👥 Streamline member management and communication.</li>
                    <li>📆 Track lending, returns, and overdue items with ease.</li>
                    <li>🌟 Enhance operational efficiency with advanced analytics and reporting features.</li>
                </ul>
            </section>

        </div>
    );
};

export default AboutUs;