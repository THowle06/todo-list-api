import { StatusCodes } from "http-status-codes";
import { loginUser, registerUser } from "../services/auth.service.js";
import { loginSchema, registerSchema } from "../validators/auth.validators.js";

export async function register(req, res, next) {
    try {
        const parsed = registerSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Validation failed",
                errors: parsed.error.flatten(),
            });
        }

        const result = await registerUser(parsed.data);

        res.status(StatusCodes.CREATED).json(result);
    } catch (error) {
        next(error);
    }
}

export async function login(req, res, next) {
    try {
        const parsed = loginSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Validation failed",
                errors: parsed.error.flatten(),
            });
        }

        const result = await loginUser(parsed.data);

        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        next(error);
    }
}