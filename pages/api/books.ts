import {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";

const API_ENDPOINT = process.env.API_ENDPOINT || "http://localhost:8080"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {
        await handlePostRequest(req, res);
    } else {
        handleInvalidMethod(req, res);
    }
}

async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
    const { token, id, action } = req.body;

    if (!token) {
        return res.status(400).json({ error: 'Invalid input. Missing token.' });
    }

    try {
        const response = await getBooks(token, id, action);
        res.status(200).json({ message: "Data sent successfully!", response: response.data });
    } catch (error) {
        console.log(error)
        handleError(res, error);
    }
}

async function getBooks(token: string, id?: string, action?: string) {

    let urlPart = '/api/v1/books/';
    if (id) {
        urlPart += id;
    }

    const url = `${API_ENDPOINT}${urlPart}`;

    if (id && action) {
        const result = await axios.post(`${url}/${action}`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });
        console.log(result);
    }

    return axios.get(url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
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