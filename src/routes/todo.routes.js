import express from "express";
import auth from "../middlewares/auth.js"
import { createTodoHandler, updateTodoHandler, deleteTodoHandler } from "../controllers/todo.controller.js";

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

/**
 * @swagger
 * /todos/{id}:
 *  put:
 *      summary: Update an existing todo item
 *      tags:
 *          - Todos
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: integer
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
 *                              example: Buy milk, eggs, bread, and cheese
 *      responses:
 *          200:
 *              description: Todo updated successfully
 *          401:
 *              description: Unauthorized
 *          403:
 *              description: Forbidden
 *          404:
 *              description: Not Found
 */
router.put("/todos/:id", auth, updateTodoHandler);

/**
 * @swagger
 * /todos/{id}:
 *  delete:
 *      summary: Delete a todo item
 *      tags:
 *          - Todos
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *          204:
 *              description: Todo deleted successfully
 *          401:
 *              description: Unauthorized
 *          403:
 *              description: Forbidden
 *          404:
 *              description: Not Found
 */
router.delete("/todos/:id", auth, deleteTodoHandler);

export default router;