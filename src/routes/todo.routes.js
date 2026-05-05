import express from "express";
import auth from "../middlewares/auth.js"
import { createTodoHandler, updateTodoHandler, deleteTodoHandler, getTodosHandler } from "../controllers/todo.controller.js";

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

/**
 * @swagger
 * /todos:
 *  get:
 *      summary: Get all todo items with pagination
 *      tags:
 *          - Todos
 *      security:
 *          - bearerAuth: []
 *      parameters:
 *          - in: query
 *            name: page
 *            schema:
 *              type: integer
 *              default: 1
 *            description: Page number (starts at 1)
 *          - in: query
 *            name: limit
 *            schema:
 *              type: integer
 *              default: 10
 *              maximum: 100
 *            description: Items per page
 *      responses:
 *          200:
 *              description: List of todos with pagination
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              data:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          id:
 *                                              type: integer
 *                                          title:
 *                                              type: string
 *                                          description:
 *                                              type: string
 *                          page:
 *                              type: integer
 *                          limit:
 *                              type: integer
 *                          total:
 *                              type: integer
 *          401:
 *              description: Unauthorized
 */
router.get("/todos", auth, getTodosHandler);

export default router;