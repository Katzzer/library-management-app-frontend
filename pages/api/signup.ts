import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import {UserData} from "@/data/types";
import {getBackendUrl} from "@/utils/utils";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {
        await handlePostRequest(req, res);
    } else {
        handleInvalidMethod(req, res);
    }
}

async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
    const { email, password, isSigningUp } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Invalid input. Missing name or password.' });
    }

    console.log("Request received for:", { name: email, password });

    const userData: UserData = {
        email,
        password,
        isSigningUp
    }

    try {
        const response = await sendUserDataToAPI(userData);
        res.status(200).json({ message: "Data sent successfully!", response: response.data });
    } catch (error) {
        console.log(error)
        handleError(res, error);
    }
}

async function sendUserDataToAPI(userData: UserData) {
    console.log("Sending user data:", userData);

    const signUpOrLogin = userData.isSigningUp ? "signup" : "login";

    const url = `${getBackendUrl()}/api/v1/registration/${signUpOrLogin}`;

    return axios.post(url, userData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

function handleInvalidMethod(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}

function handleError(res: NextApiResponse, error: unknown) {
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