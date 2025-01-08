import {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";
import {getBackendUrl, handleError, handleInvalidMethod} from "@/utils/utils";

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

    const url = `${getBackendUrl()}${urlPart}`;

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
