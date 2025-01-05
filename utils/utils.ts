import jwt from "jsonwebtoken";
import {DecodedToken} from "@/data/types";

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

export const getBackendUrl = ():string => {
    return process.env.API_ENDPOINT || "http://localhost:8080";
}