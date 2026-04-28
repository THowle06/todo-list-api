import { StatusCodes } from "http-status-codes";

export default function errorHandler(err, req, res, next) {
    console.err(err);
    const status = err.status || StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(status).json({ error: err.message || "Internal Server Error" });
}