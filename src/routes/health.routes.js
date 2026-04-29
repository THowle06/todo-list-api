import express from "express";
import { live, ready } from "../controllers/health.controller.js";

const router = express.Router();

/**
 * @swagger
 * /health/live:
 *  get:
 *      summary: Liveness check
 *      description: Confirms the API process is running.
 *      tags:
 *          - Health
 *      responses:
 *          200:
 *              description: API is alive
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: ok
 *                              service:
 *                                  type: string
 *                                  example: todo-list-api
 *                              uptimeSeconds:
 *                                  type: integer
 *                                  example: 123
 *                              timestamp:
 *                                  type: string
 *                                  format: date-time
 */
router.get("/live", live);

/**
 * @swagger
 * /health/ready:
 *  get:
 *      summary: Readiness check
 *      description: Confirms the API can reach required dependencies (database)
 *      tags:
 *          - Health
 *      responses:
 *          200:
 *              description: API is ready to serve traffic
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: ready
 *                              database:
 *                                  type: string
 *                                  example: up
 *                              timestamp:
 *                                  type: string
 *                                  format: date-time
 *          503:
 *              description: API is not ready
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: not_ready
 *                              database:
 *                                  type: string
 *                                  example: down
 *                              timestamp:
 *                                  type: string
 *                                  format: date-time
 */
router.get("/ready", ready);

export default router;
