import { StatusCodes } from "http-status-codes";
import { registerUser } from "../services/auth.service.js";
import { registerSchema } from "../validators/auth.validators.js";

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