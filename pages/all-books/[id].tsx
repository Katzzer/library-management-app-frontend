import React, { useEffect, useState } from "react";
import { useRouter } from "next/router"; // Use Next.js router to get the dynamic route's ID
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {decodeToken, isTokenValid} from "@/utils/utils";
import {Book, DecodedToken} from "@/data/types";
import {BorrowOrReturn} from "@/data/enum";

const BookDetails: React.FC = () => {
    const router = useRouter();
    const { id } = router.query; // Get the book ID from the dynamic route
    const token = useSelector((state: RootState) => state.auth.token);
    const [book, setBook] = useState<Book | null>(null);
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(true);
    const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);

    useEffect(() => {
        setIsUserAuthenticated(isTokenValid(token));
    }, [token]);

    useEffect(() => {
        if (!isUserAuthenticated) {
            router.push("/");
        }
    }, [isUserAuthenticated, router]);

    useEffect(() => {
        const fetchBook = async () => {
            if (token && id) {
                try {
                    const response = await axios.post('/api/books', { token, id });
                    console.log(response)
                    setBook(response.data.response.book);
                } catch (error) {
                    console.error("Error fetching book details:", error);
                }
            }
        };

        fetchBook();
    }, [token, id]);

    useEffect(() => {
        setDecodedToken(decodeToken(token));
    }, [token]);

    const borrowOrReturnBook = async () => {
        const action = book?.borrowed ? BorrowOrReturn.RETURN : BorrowOrReturn.BORROW;
        try {
            const response = await axios.post('/api/books', { token, id, action });
            console.log(response)
            setBook(response.data.response.book);
        } catch (error) {
            console.error("Error fetching book details:", error);
        }
    }

    if (!book) {
        return <div className="container mt-5">Loading book details...</div>;
    }

    const borrowReturnBookText = book.borrowed ? "Return Book" : "Borrow Book";
    const idCurrentUserBorrowedBook = decodedToken?.userId === book.current_borrower_id;
    const showBorrowReturnButton = !book.borrowed || idCurrentUserBorrowedBook;

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">{book.name}</h1>
            <div className="card mx-auto" style={{width: "600px"}}>
                <div className="card-body">
                    <h5 className="card-title">Author: {book.author}</h5>
                    <p className="card-text"><strong>Description:</strong> {book.description}</p>
                    <p className="card-text"><strong>ISBN:</strong> {book.isbn}</p>
                    <p className="card-text"><strong>Borrowed:</strong> {book.borrowed ? "Yes" : "No"}</p>
                    {showBorrowReturnButton && <button className="btn btn-primary" onClick={borrowOrReturnBook}>
                        {borrowReturnBookText}
                    </button>}
                </div>
            </div>
            <button className="btn btn-primary" onClick={() => router.push("/all-books")}>
                Back to All Books
            </button>
        </div>
    );
};

export default BookDetails;