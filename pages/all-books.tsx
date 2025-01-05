import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {getBackendUrl, isTokenValid} from "@/utils/utils";
import { useRouter } from "next/router";
import { Book } from "@/data/types";
import Image from "next/image";
import { clearToken } from "@/store/authSlice";
import "@/styles/book.scss"

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
        <div className="container mt-4">
            <h1 className="text-center mb-4">{title}</h1>

            <div className="mb-4 d-flex justify-content-center align-items-center search-title-container">
                {/* Search Bar */}
                <input
                    type="text"
                    className="form-control"
                    style={{maxWidth: "400px", marginRight: "10px"}}
                    placeholder="Search by name, author, or description"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                />

                <button
                    className="btn btn-primary"
                    onClick={() => setShowBorrowedOnly(!showBorrowedOnly)}
                    style={{width: "250px"}}
                >
                    {showBorrowedOnly ? "Show All Books" : "Show My Borrowed Books"}
                </button>
            </div>


            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                <tr>
                    <th>Details</th>
                </tr>
                </thead>
                <tbody>
                {filteredBooks.map((book) => (
                    <tr
                        key={book.id}
                        onClick={() => handleViewBook(book.id)}
                        style={{cursor: "pointer"}}
                    >
                        <td>
                            <div className="d-flex align-items-center">
                                <div style={{width: "120px"}} className="image-container">
                                    <Image
                                        src={`${getBackendUrl()}/static/images/${book.image_name}`}
                                        width={100}
                                        height={100}
                                        alt={book.name}
                                        style={{ width: "100px", height: "auto", marginRight: "15px" }}
                                    />
                                </div>

                                <div>
                                    <h5>{book.name}</h5>
                                    <p><strong>Author:</strong> {book.author}</p>
                                    <p><strong>Description:</strong> {book.description}</p>
                                    <p><strong>ISBN:</strong> {book.isbn}</p>
                                    <p><strong>Borrowed:</strong> {book.borrowed ? "Yes" : "No"}</p>
                                </div>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllBooks;