import { StatusCodes } from "http-status-codes";
import { checkDatabaseHealth } from "../services/health.service.js";

export function live(req, res) {
    res.status(StatusCodes.OK).json({
        status: "ok",
        service: "todo-list-api",
        uptimeSeconds: Math.floor(process.uptime()),
        timestamp: new Date().toISOString(),
    });
}

export async function ready(req, res) {
    try {
        await checkDatabaseHealth();

        res.status(StatusCodes.OK).json({
            status: "ready",
            database: "up",
            timestamp: new Date().toISOString(),
        });
    } catch {
        res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
            status: "not_ready",
            database: "down",
            timestamp: new Date().toISOString(),
        });
    }
}