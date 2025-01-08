import jwt from "jsonwebtoken";
import {DecodedToken} from "@/data/types";
import {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";

export const isTokenValid = (token: string | null): boolean => {
    if (!token) {
        return false;
    }

    try {
        const decoded = jwt.decode(token) as { exp: number } | null;

        if (!decoded || !decoded.exp) {
            console.error("Invalid token");
            return false;
        }

        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        return decoded.exp > currentTime;
    } catch (error) {
        console.error("Error decoding token:", error);
        return false;
    }
};

export const decodeToken = (token: string | null): DecodedToken | null => {
    if (!token) {
        console.error("Token is undefined or null.");
        return null;
    }

    try {
        const decoded = jwt.decode(token) as DecodedToken | null;

        if (!decoded) {
            console.error("Failed to decode token. Invalid token.");
            return null;
        } else {
            return decoded;
        }
    } catch (error) {
        console.error("Error decoding token:", error);
        return null; // Handle potential exceptions by returning `null`
    }
};

export function getBackendUrl(): string {
    if (process.env.NODE_ENV === "production") {
        return "http://library-management-app-backend.pavelkostal.com";
    }
    return "http://localhost:8080"; // Local development backend
}

export function handleInvalidMethod(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}

export function handleError(res: NextApiResponse, error: unknown) {
    if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.message);

        const status = error.response?.status || 500;
        const details = error.response?.data || 'No additional details';

        res.status(status).json({
            error: 'Failed to send data',
            details,
        });
    } else {
        console.error('Unexpected error:', error);
        res.status(500).json({
            error: 'Failed to send data',
            details: 'An unexpected error occurred',
        });
    }
}