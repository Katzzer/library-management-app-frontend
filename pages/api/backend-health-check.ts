import {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";
import {getBackendUrl, handleError, handleInvalidMethod} from "@/utils/utils";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'GET') {
        await handlePostRequest(req, res);
    } else {
        handleInvalidMethod(req, res);
    }
}

async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {

    const urlPart = `${getBackendUrl()}/api/health-check`;

    console.log(urlPart);

    try {
        const response = await axios.get(urlPart, {})
        res.status(200).json({ message: "Data sent successfully!", response: response.data });
    } catch (error) {
        console.log(error)
        handleError(res, error);
    }
}
