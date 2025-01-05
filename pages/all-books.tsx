import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { isTokenValid } from "@/utils/utils";
import { useRouter } from "next/router";
import { Book } from "@/data/types";
import Image from "next/image";

const API_ENDPOINT = process.env.API_ENDPOINT || "http://localhost:8080";

const AllBooks: React.FC = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const [books, setBooks] = useState<Book[]>([]);
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
                } catch (error) {
                    console.error("Error fetching books:", error);
                }
            }
        };

        fetchBooks();
    }, [token]);

    const handleViewBook = (id: number) => {
        router.push(`/all-books/${id}`); // Redirect to the dynamic route with the book ID
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">List Of Books</h1>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Author</th>
                    <th>Description</th>
                    <th>ISBN</th>
                    <th>Borrowed</th>
                </tr>
                </thead>
                <tbody>
                {books.map((book) => (
                    <tr
                        key={book.id}
                        onClick={() => handleViewBook(book.id)} // Make the row clickable
                        style={{ cursor: "pointer" }} // Add a pointer cursor for better UX
                    >
                        <td>
                            <Image
                                src={`${API_ENDPOINT}/static/images/${book.image_name}`}
                                width={100}
                                height={100}
                                alt={book.name}
                                style={{ width: "100px", height: "auto" }}
                            />
                        </td>
                        <td>{book.name}</td>
                        <td>{book.author}</td>
                        <td>{book.description}</td>
                        <td>{book.isbn}</td>
                        <td>{book.borrowed ? "Yes" : "No"}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllBooks;