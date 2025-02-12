import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import { RootState } from "@/store/store";
import {decodeToken, getBackendUrl, isTokenValid} from "@/utils/utils";
import { Book, DecodedToken } from "@/data/types";
import { BorrowOrReturn } from "@/data/enum";
import Image from "next/image";
import {clearToken} from "@/store/authSlice";
import "@/styles/bookDetails.scss"

const BookDetails: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
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
                    const response = await axios.post("/api/books", { token, id });
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
            const response = await axios.post("/api/books", { token, id, action });
            setBook(response.data.response.book);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    dispatch(clearToken());
                }
            } else {
                console.error("An unknown error occurred:", error);
            }
        }
    };

    if (!book) {
        return <div className="container mt-5">Loading book details...</div>;
    }

    const borrowReturnBookText = book.borrowed ? "Return Book" : "Borrow Book";
    const idCurrentUserBorrowedBook = decodedToken?.userId === book.current_borrower_id;
    const showBorrowReturnButton = !book.borrowed || idCurrentUserBorrowedBook;

    return (
        <div className="container detail-book-container mt-5">

            <div className="card mx-auto p-4" style={{maxWidth: "800px"}}>
                <h1 className="text-center mb-4">{book.name}</h1>
                <div className="d-flex align-items-start image-detail-container">
                    {/* Image on the left */}
                    <div className="me-4 image-container">
                        <Image
                            src={`${getBackendUrl()}/static/images/${book.image_name}`}
                            width={200}
                            height={300}
                            alt={book.name}
                        />
                    </div>

                    {/* Book details on the right */}
                    <div className="book-details">
                        <h5><strong>Author:</strong> {book.author}</h5>
                        <p><strong>Description:</strong> {book.description}</p>
                        <p><strong>ISBN:</strong> {book.isbn}</p>
                        <p><strong>Borrowed:</strong> {book.borrowed ? "Yes" : "No"}</p>
                        {showBorrowReturnButton && (
                            <button className="btn btn-primary" onClick={borrowOrReturnBook}>
                                {borrowReturnBookText}
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center mt-4">
                <button className="btn btn-secondary mb-3" onClick={() => router.push("/all-books")}>
                    Back To All Books
                </button>
            </div>
        </div>
    );
};

export default BookDetails;