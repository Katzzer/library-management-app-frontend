import jwt from "jsonwebtoken";

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