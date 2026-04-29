import express from "express";
import { register } from "../controllers/auth.controller.js";

const router = express.Router();

/**
 * @swagger
 * /register:
 *  post:
 *      summary: Register a new user
 *      tags:
 *          - Auth
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - name
 *                          - email
 *                          - password
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: John Doe
 *                          email:
 *                              type: string
 *                              example: john@doe.com
 *                          password:
 *                              type: string
 *                              example: password
 *      responses:
 *          201:
 *              description: User registered successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              token:
 *                                  type: string
 *                                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *          400:
 *              description: Validaton failed
 *          409:
 *              description: Email already exists
 */
router.post("/register", register);

export default router;