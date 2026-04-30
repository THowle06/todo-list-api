import { StatusCodes } from "http-status-codes";
import { createTodo, updateTodoForUser } from "../services/todo.service.js";
import { createTodoSchema, todoIdSchema, updateTodoSchema } from "../validators/todo.validators.js";

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

export async function updateTodoHandler(req, res, next) {
    try {
        const parsedParams = todoIdSchema.safeParse(req.params);
        if (!parsedParams.success) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Validation failed",
                errors: parsedParams.error.flatten(),
            });
        }

        const parsedBody = updateTodoSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Validation failed",
                errros: parsedBody.error.flatten(),
            });
        }

        const todoId = parsedBody.data.id;
        const userId = req.user.userId;

        const result = await updateTodoForUser(todoId, userId, parsedBody.data);

        if (result.status === "not_found") {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Not Found",
            });
        }

        if (result.status === "forbidden") {
            return res.status(StatusCodes.FORBIDDEN).json({
                message: "Forbidden",
            });
        }

        return res.status(StatusCodes.OK).json(result.data);
    } catch (error) {
        next(error);
    }
}