import express from "express";
import { StatusCodes } from "http-status-codes";

const router = express.Router();

/**
 * @swagger
 * /:
 *  get:
 *      summary: Get API welcome message
 *      tags:
 *          - Index
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              response:
 *                                  type: string
 *                                  example: Hello from Todo List API!
 */
router.get("/", (req, res) => {
    res.status(StatusCodes.OK).json({
        "response": "Hello from Todo List API!",
    });
});

export default router;