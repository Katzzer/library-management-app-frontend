import React, { useEffect, useState } from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import { RootState } from "@/store/store";
import { isTokenValid } from "@/utils/utils";
import { useRouter } from "next/router";
import { Book } from "@/data/types";
import Image from "next/image";
import {clearToken} from "@/store/authSlice";

const API_ENDPOINT = process.env.API_ENDPOINT || "http://localhost:8080";

const AllBooks: React.FC = () => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.auth.token);
    const [books, setBooks] = useState<Book[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query
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

    // On search query change, filter books
    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredBooks(books); // Show all books if no query
        } else {
            const lowerCaseQuery = searchQuery.toLowerCase();
            const filtered = books.filter((book) =>
                book.name.toLowerCase().includes(lowerCaseQuery) ||
                book.author.toLowerCase().includes(lowerCaseQuery) ||
                book.description.toLowerCase().includes(lowerCaseQuery)
            );
            setFilteredBooks(filtered);
        }
    }, [searchQuery, books]);

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">List Of Books</h1>

            {/* Search Bar */}
            <div className="mb-4 d-flex justify-content-center">
                <input
                    type="text"
                    className="form-control"
                    style={{ maxWidth: "400px" }}
                    placeholder="Search by name, author, or description"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                />
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
                        style={{ cursor: "pointer" }}
                    >
                        <td>
                            <div className="d-flex align-items-center">
                                <div style={{ width: "120px"}}>
                                    <Image
                                        src={`${API_ENDPOINT}/static/images/${book.image_name}`}
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