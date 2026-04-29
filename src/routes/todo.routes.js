import express from "express";
import auth from "../middlewares/auth.js"
import { createTodoHandler } from "../controllers/todo.controller.js";

const router = express.Router();

/**
 * @swagger
 * /todos:
 *  post:
 *      summary: Create a new todo item
 *      tags:
 *          - Todos
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - title
 *                      properties:
 *                          title:
 *                              type: string
 *                              example: Buy groceries
 *                          description:
 *                              type: string
 *                              example: Buy milk, eggs, and bread
 *      responses:
 *          201:
 *              description: Todo created successfully
 *          401:
 *              description: Unauthorized
 */
router.post("/todos", auth, createTodoHandler);

export default router;