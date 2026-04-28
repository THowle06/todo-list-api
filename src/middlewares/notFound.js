import { StatusCodes } from "http-status-codes";

export default function notFound(req, res) {
    res.status(StatusCodes.NOT_FOUND).json({
        response: "Not Found"
    });
}