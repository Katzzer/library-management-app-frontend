import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {isTokenValid} from "@/utils/utils";
import {router} from "next/client";
import Link from "next/link";

interface Book {
    id: number;
    name: string;
    author: string;
    description: string;
    image_name: string;
    isbn: string;
    borrowed: boolean;
}

const AllBooks: React.FC = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const [books, setBooks] = useState<Book[]>([]);
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

    useEffect(() => {
        const fetchBooks = async () => {
            if (token) {
                try {
                    const response = await axios.post('/api/books', { token });
                    setBooks(response.data.response); // Assuming response structure matches
                } catch (error) {
                    console.error("Error fetching books:", error);
                }
            }
        };

        fetchBooks();
    }, [token]);

    return (
        <div className="container mt-4">

            <Link href="/">
                <button className="btn btn-primary btn-lg px-4">
                    Back to Home
                </button>
            </Link>

            <h1 className="text-center mb-4">List Of Books</h1>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Author</th>
                    <th>Description</th>
                    <th>ISBN</th>
                    <th>Borrowed</th>
                </tr>
                </thead>
                <tbody>
                {books.map((book) => (
                    <tr key={book.id}>
                        <td>{book.id}</td>
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