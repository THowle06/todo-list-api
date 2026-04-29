import { StatusCodes } from "http-status-codes";
import { createTodo } from "../services/todo.service.js";
import { createTodoSchema } from "../validators/todo.validators.js";

export async function createTodoHandler(req, res, next) {
    try {
        const parsed = createTodoSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Validation failed",
                errors: parsed.error.flatten(),
            });
        }

        const userId = req.user.userId;
        const todo = await createTodo(userId, parsed.data);

        res.status(StatusCodes.CREATED).json(todo);
    } catch (error) {
        next(error);
    }
}