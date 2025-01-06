import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {getBackendUrl, isTokenValid} from "@/utils/utils";
import { useRouter } from "next/router";
import { Book } from "@/data/types";
import Image from "next/image";
import { clearToken } from "@/store/authSlice";
import "@/styles/allBooks.scss"

const AllBooks: React.FC = () => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.auth.token);
    const [books, setBooks] = useState<Book[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query
    const [showBorrowedOnly, setShowBorrowedOnly] = useState(false); // Toggle state (all books or only borrowed)
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(true);
    const router = useRouter();

    useEffect(() => {
        setIsUserAuthenticated(isTokenValid(token));
    }, [token]);

    useEffect(() => {
        if (!isUserAuthenticated) {
            router.push("/");
        }
    }, [isUserAuthenticated, router]);

    useEffect(() => {
        const fetchBooks = async () => {
            if (token) {
                try {
                    const response = await axios.post("/api/books", { token });
                    setBooks(response.data.response);
                    setFilteredBooks(response.data.response);
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        if (error.response?.status === 401) {
                            dispatch(clearToken());
                        }
                    } else {
                        console.error("An unknown error occurred:", error);
                    }
                }
            }
        };

        fetchBooks();
    }, [token, dispatch]);

    const handleViewBook = (id: number) => {
        router.push(`/all-books/${id}`);
    };

    useEffect(() => {
        let filtered = books;

        if (showBorrowedOnly) {
            // Filter to show only borrowed books
            filtered = filtered.filter((book) => book.borrowed);
        }

        if (searchQuery.trim() !== "") {
            const lowerCaseQuery = searchQuery.toLowerCase();
            filtered = filtered.filter((book) =>
                book.name.toLowerCase().includes(lowerCaseQuery) ||
                book.author.toLowerCase().includes(lowerCaseQuery) ||
                book.description.toLowerCase().includes(lowerCaseQuery)
            );
        }

        setFilteredBooks(filtered);
    }, [searchQuery, showBorrowedOnly, books]);

    const title = showBorrowedOnly ? "My Borrowed Books" : "All Books";

    return (
        <div className="container all-books-container mt-4">
            <h1 className="text-center mb-4">{title}</h1>

            <div className="mb-4 d-flex justify-content-center align-items-center search-title-container">
                {/* Search Bar */}
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name, author, or description"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <button
                    className="btn btn-primary"
                    onClick={() => setShowBorrowedOnly(!showBorrowedOnly)}
                >
                    {showBorrowedOnly ? "Show All Books" : "Show My Borrowed Books"}
                </button>
            </div>

            <div>
                {filteredBooks.map((book) => (
                    <div
                        key={book.id}
                        onClick={() => handleViewBook(book.id)}
                        style={{
                            cursor: "pointer",
                            marginTop: "10px",
                            padding: "15px",
                            border: "1px solid #ddd",
                            borderRadius: "5px",
                            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                            backgroundColor: "white",
                        }}
                    >
                        <div className="d-flex align-items-center">
                            {/* Book Image */}
                            <div
                                style={{
                                    width: "120px",
                                    marginRight: "15px",
                                }}
                                className="image-container"
                            >
                                <Image
                                    src={`${getBackendUrl()}/static/images/${book.image_name}`}
                                    width={100} // Aspect ratio base width
                                    height={150} // Aspect ratio base height
                                    alt={book.name}
                                />
                            </div>

                            {/* Book Details */}
                            <div>
                                <h5>{book.name}</h5>
                                <p>
                                    <strong>Author:</strong> {book.author}
                                </p>
                                <p>
                                    <strong>Description:</strong> {book.description}
                                </p>
                                <p>
                                    <strong>ISBN:</strong> {book.isbn}
                                </p>
                                <p>
                                    <strong>Borrowed:</strong> {book.borrowed ? "Yes" : "No"}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllBooks;