import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { jwtSecret } from "../config/config.js";

export default function auth(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: "Unauthorized"
        });
    }

    const token = authHeader.startsWith("Bearer ")
        ? authHeader.slice(7)
        : authHeader;

    try {
        const payload = jwt.verify(token, jwtSecret);
        req.user = payload;
        next();
    } catch {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: "Unauthorized"
        });
    }
}